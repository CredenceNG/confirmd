# WebSocket Implementation and Operations in ConfirmedPerson

## Overview

The ConfirmedPerson project uses **Socket.IO** for real-time bidirectional communication between the client and server. The WebSocket implementation enables real-time updates for credential operations, connection status changes, and proof verification workflows.

## Architecture

### Server-Side Implementation (`server/src/index.ts`)

```typescript
// WebSocket Server Setup
const ws = new Server(server, {
  cors: { origin: true },
  path: `${normalizedBaseRoute}/demo/socket/`,
})

// Connection Management
const socketMap = new Map() // Maps connectionId -> Socket
const connectionMap = new Map() // Maps socket.id -> connectionId
```

**Key Features:**

- **Dynamic Path Configuration**: Uses environment-based route prefixes
- **Connection Mapping**: Maintains bidirectional mapping between connections and sockets
- **CORS Enabled**: Allows cross-origin WebSocket connections

### Client-Side Implementation (`client/src/App.tsx`)

```typescript
// Socket Connection Setup
const ws = io(baseWsUrl, {
  path: socketPath,
  transports: ['websocket', 'polling'], // Fallback strategy
})

// Connection Lifecycle Management
ws.on('connect', () => {
  dispatch(setConnectionStatus('connected'))
  setSocket(ws)
})

ws.on('connect_error', (err) => {
  dispatch(setConnectionError(`Connection error: ${err.message}`))
})

ws.on('message', (data) => {
  dispatch(setMessage(data)) // Broadcast to Redux store
})
```

## WebSocket Operations

### 1. Connection Subscription

**Client subscribes to connection-specific messages:**

```typescript
// When a connection ID is available
socket.emit('subscribe', { connectionId: id })
```

**Server handles subscription:**

```typescript
socket.on('subscribe', ({ connectionId }) => {
  if (connectionId) {
    console.log(`New connection: ${connectionId}`)
    socketMap.set(connectionId, socket)
    connectionMap.set(socket.id, connectionId)
  }
})
```

### 2. Webhook-to-WebSocket Bridge

**Critical Feature**: The server acts as a bridge between external webhooks and WebSocket clients.

**Webhook Controller (`server/src/controllers/WebhookController.ts`):**

```typescript
@Post('/*')
public async handlePostWhook(@Body() params: any, @Req() req: any) {
  const socketMap: Map<string, Socket> = req.app.get('sockets')

  // Security check
  if (api_key !== process.env.WEBHOOK_SECRET) {
    return { message: 'Unauthorized', status: 401 }
  }

  const connectionId = params.connection_id
  const socket = socketMap.get(connectionId)

  if (socket) {
    socket.emit('message', params)  // Forward webhook to specific client
  }
}
```

**Webhook Flow:**

1. External systems (Traction, wallets) send webhooks to `/demo/whook/topic/*`
2. Server validates webhook secret
3. Server extracts `connection_id` from webhook payload
4. Server finds the corresponding WebSocket connection
5. Server forwards the webhook data to the specific client

### 3. Real-Time State Management

**Redux Integration (`client/src/slices/socket/`):**

```typescript
// Socket State
interface SocketState {
  message: any // Latest webhook message
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error'
  error: string | null
}

// Actions
setMessage(action) // Store incoming webhook data
setConnectionStatus(action) // Track WebSocket connection state
setConnectionError(action) // Handle connection errors
```

**Usage in Components:**

```typescript
const { message } = useSocket()

useEffect(() => {
  if (!message?.endpoint || !message?.state) return

  const { endpoint, state } = message

  // Handle different webhook types
  if (endpoint === 'connections' && state === 'active') {
    dispatch(setConnection(message)) // Update connection state
  }

  if (endpoint === 'issue_credential' && state === 'credential_issued') {
    // Handle credential issuance completion
  }

  if (endpoint === 'present_proof' && state === 'verified') {
    // Handle proof verification completion
  }
}, [message])
```

## WebSocket Use Cases

### 1. Connection Establishment

- **Purpose**: Real-time feedback when wallet connects via QR code/deep link
- **Flow**: Wallet scans QR → External system sends webhook → WebSocket notifies client → UI updates
- **Components**: `SetupConnection.tsx`, `StepConnection.tsx`

### 2. Credential Issuance

- **Purpose**: Real-time updates during credential issuance process
- **Flow**: Credential offered → Wallet accepts → Webhook sent → WebSocket updates UI
- **Components**: `AcceptCredential.tsx`

### 3. Proof Verification

- **Purpose**: Real-time verification results
- **Flow**: Proof requested → Wallet responds → Verification complete → WebSocket notifies client
- **Components**: `StepProof.tsx`

### 4. Dashboard Monitoring

- **Purpose**: Real-time updates for admin/monitoring interfaces
- **Components**: `DashboardPage.tsx`

## Configuration

### Environment Variables

**Server:**

```env
BASE_ROUTE=""                    # Base route prefix
WEBHOOK_SECRET=secret_key        # Webhook authentication
```

**Client:**

```env
REACT_APP_HOST_BACKEND=http://localhost:5511
REACT_APP_BASE_ROUTE=""
```

### URL Structure

**WebSocket Endpoint:** `ws://localhost:5511/demo/socket/`
**Webhook Endpoint:** `http://localhost:5511/demo/whook/topic/*`

## Security Features

1. **Webhook Authentication**: Validates `x-api-key` header against `WEBHOOK_SECRET`
2. **Connection Isolation**: Each connection ID gets its own WebSocket channel
3. **CORS Configuration**: Controlled cross-origin access
4. **Transport Fallback**: WebSocket with polling fallback for reliability

## Error Handling

1. **Connection Errors**: Captured and stored in Redux state
2. **Disconnection Cleanup**: Automatic cleanup of connection mappings
3. **Reconnection**: Built-in Socket.IO reconnection logic
4. **Graceful Degradation**: Application continues to work without WebSocket for most features

## Message Flow Example

```
1. User scans QR code with wallet
2. Wallet connects to Traction/Aries
3. Traction sends webhook: POST /demo/whook/topic/connections
   {
     "connection_id": "abc123",
     "state": "active",
     "endpoint": "connections"
   }
4. Server forwards to WebSocket client subscribed to "abc123"
5. Client receives message via Socket.IO
6. Redux state updated with new connection info
7. React components re-render with updated state
8. UI shows "Connection Successful" to user
```

## Performance Considerations

- **Memory Efficient**: Uses Maps for O(1) connection lookups
- **Connection Cleanup**: Automatic cleanup on disconnect prevents memory leaks
- **Selective Broadcasting**: Messages only sent to relevant clients
- **Fallback Transport**: Ensures connectivity in restricted networks

This WebSocket implementation provides the real-time capabilities essential for a smooth user experience in credential and proof workflows, where immediate feedback is crucial for user confidence and system reliability.
