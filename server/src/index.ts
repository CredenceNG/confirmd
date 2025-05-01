import 'reflect-metadata'
import type { Express } from 'express'

import { json, static as stx } from 'express'
import * as http from 'http'
import { createExpressServer } from 'routing-controllers'
import { Server } from 'socket.io'

import { tractionApiKeyUpdaterInit, tractionRequest, tractionGarbageCollection } from './utils/tractionHelper'

const baseRoute = process.env.BASE_ROUTE

const app: Express = createExpressServer({
  controllers: [__dirname + '/controllers/**/*.ts'],
  cors: true,
  routePrefix: `${baseRoute}/demo`,
})

const server = http.createServer(app)

const ws = new Server(server, {
  cors: {
    origin: true,
  },
  path: `${baseRoute}/demo/socket/`,
})

const socketMap = new Map()
const connectionMap = new Map()

ws.on('connection', (socket) => {
  socket.on('subscribe', ({ connectionId }) => {
    if (connectionId) {
      console.log(`New connection: ${connectionId}`)
      socketMap.set(connectionId, socket)
      connectionMap.set(socket.id, connectionId)
    }
  })
  socket.on('disconnect', () => {
    const connectionId = connectionMap.get(socket.id)
    connectionMap.delete(socket.id)
    if (connectionId) {
      console.log(`Connection ${connectionId} disconnected`)
      socketMap.delete(connectionId)
    }
  })
})

const run = async () => {
  try {
    console.log('Initializing traction API keys and performing garbage collection...')
    await tractionApiKeyUpdaterInit()
    await tractionGarbageCollection()
    console.log('Initialization complete.')

    app.set('sockets', socketMap)

    app.use(json())
    console.log('Using JSON middleware.')

    app.use(`${baseRoute}/public`, stx(__dirname + '/public'))
    console.log('Serving static files from /public.')

    app.get(`${baseRoute}/server/last-reset`, async (req, res) => {
      console.log('Healthcheck: Last reset endpoint called.')
      res.send(new Date())
    })

    // Redirect QR code scans for installing bc wallet to the apple or google play store
    const androidUrl = 'https://play.google.com/store/apps/details?id=ca.bc.gov.BCWallet'
    const appleUrl = 'https://apps.apple.com/us/app/bc-wallet/id1587380443'
    app.get(`${baseRoute}/qr`, async (req, res) => {
      const appleMatchers = [/iPhone/i, /iPad/i, /iPod/i]
      let url = androidUrl
      const isApple = appleMatchers.some((item) => req.get('User-Agent')?.match(item))
      if (isApple) {
        console.log('User-agent indicates Apple device, redirecting to Apple Store.')
        url = appleUrl
      } else {
        console.log('User-agent indicates non-Apple device, redirecting to Google Play Store.')
      }
      res.redirect(url)
      return res
    })

    // Respond to health checks for OpenShift
    app.get('/', async (req, res) => {
      console.log('Healthcheck: Root endpoint called.')
      res.send('ok')
      return res
    })

    // Respond to DITP health checks
    app.get(`${baseRoute}/server/ready`, async (req, res) => {
      console.log('Healthcheck: Ready endpoint called.')
      res.json({ ready: true })
      return res
    })

    // Respond to ready checks to the traction agent
    app.get(`${baseRoute}/agent/ready`, async (req, res) => {
      console.log('Healthcheck: Traction agent readiness check called.')
      const response = await tractionRequest.get(`/status/ready`)
      res.send(response.data)
      return response
    })

    // Handle shutdown gracefully
    process.on('SIGINT', () => {
      console.log('Received SIGINT, shutting down server...')
      server.close(() => {
        console.log('Server closed gracefully.')
        process.exit(0)
      })
    })

    // Handle errors related to address in use
    server
      .listen(5001, () => {
        console.log('Server started on port 5001.')
      })
      .on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port 5001 is already in use. Please free up the port or try a different one.`)
          process.exit(1)
        } else {
          console.error(`Error occurred while starting the server: ${err.message}`)
          process.exit(1)
        }
      })
  } catch (err) {
    console.error('Error during initialization:', err)
    process.exit(1)
  }
}

run()
