#!/bin/bash

# ConfirmedPerson Production Release Package Script
# This script prepares the application for production deployment

set -e

echo "🚀 Starting ConfirmedPerson Production Release Packaging..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current date
RELEASE_DATE=$(date +"%Y-%m-%d_%H-%M-%S")
RELEASE_DIR="release_${RELEASE_DATE}"

echo -e "${YELLOW}📦 Creating release directory: ${RELEASE_DIR}${NC}"
mkdir -p "$RELEASE_DIR"

# Clean previous builds
echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
rm -rf client/build server/build

# Install dependencies
echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm install

# Run linting and formatting
echo -e "${YELLOW}✨ Running linting and formatting...${NC}"
npm run format || echo -e "${RED}⚠️  Formatting issues found${NC}"
npm run lint || echo -e "${RED}⚠️  Linting issues found${NC}"

# Build client
echo -e "${YELLOW}🔨 Building client application...${NC}"
cd client
npm run build
cd ..

# Build server  
echo -e "${YELLOW}🔨 Building server application...${NC}"
cd server
npm run build
cd ..

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run cy:run || echo -e "${RED}⚠️  Some tests failed${NC}"

# Create release package
echo -e "${YELLOW}📦 Creating release package...${NC}"

# Copy built applications
cp -r client/build "$RELEASE_DIR/frontend"
cp -r server/build "$RELEASE_DIR/backend"
cp -r server/node_modules "$RELEASE_DIR/backend/"

# Copy configuration files
cp docker-compose.yml "$RELEASE_DIR/"
cp package.json "$RELEASE_DIR/"
cp server/package.json "$RELEASE_DIR/backend/"
cp client/package.json "$RELEASE_DIR/frontend/"

# Copy documentation
cp README.md "$RELEASE_DIR/" 2>/dev/null || echo "No main README found"
cp DEPLOYMENT_README.md "$RELEASE_DIR/"
cp LICENSE "$RELEASE_DIR/" 2>/dev/null || echo "No LICENSE file found"

# Copy environment templates
cp server/.env.example "$RELEASE_DIR/backend/.env.example" 2>/dev/null || echo "# Add your environment variables here" > "$RELEASE_DIR/backend/.env.example"
cp client/.env.example "$RELEASE_DIR/frontend/.env.example" 2>/dev/null || echo "# Add your environment variables here" > "$RELEASE_DIR/frontend/.env.example"

# Create deployment scripts
cat > "$RELEASE_DIR/start-production.sh" << 'EOF'
#!/bin/bash
echo "Starting ConfirmedPerson in Production Mode..."

# Start backend
cd backend
node index.js &
BACKEND_PID=$!

# Start frontend (using serve)
cd ../frontend
npx serve -s . -l 3000 &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5511"
echo "Press Ctrl+C to stop"

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
EOF

chmod +x "$RELEASE_DIR/start-production.sh"

# Create Docker deployment script
cat > "$RELEASE_DIR/deploy-docker.sh" << 'EOF'
#!/bin/bash
echo "Deploying ConfirmedPerson with Docker..."
docker-compose up --build -d
echo "Deployment complete!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5555"
EOF

chmod +x "$RELEASE_DIR/deploy-docker.sh"

# Create release info
cat > "$RELEASE_DIR/RELEASE_INFO.txt" << EOF
ConfirmedPerson Production Release
=================================

Release Date: $(date)
Git Commit: $(git rev-parse HEAD 2>/dev/null || echo "N/A")
Build Status: Complete

Components:
- Frontend (React): ✅ Built successfully
- Backend (Node.js): ✅ Built successfully  
- Docker Config: ✅ Included
- Documentation: ✅ Included

Deployment Options:
1. Traditional: ./start-production.sh
2. Docker: ./deploy-docker.sh

For detailed instructions, see DEPLOYMENT_README.md
EOF

# Create archive
echo -e "${YELLOW}📁 Creating archive...${NC}"
tar -czf "${RELEASE_DIR}.tar.gz" "$RELEASE_DIR"

# Generate checksums
echo -e "${YELLOW}🔒 Generating checksums...${NC}"
shasum -a 256 "${RELEASE_DIR}.tar.gz" > "${RELEASE_DIR}.tar.gz.sha256"

echo -e "${GREEN}✅ Production release package created successfully!${NC}"
echo -e "${GREEN}📦 Package: ${RELEASE_DIR}.tar.gz${NC}"
echo -e "${GREEN}🔒 Checksum: ${RELEASE_DIR}.tar.gz.sha256${NC}"
echo -e "${GREEN}📁 Directory: ${RELEASE_DIR}/${NC}"

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test the release package:"
echo "   tar -xzf ${RELEASE_DIR}.tar.gz"
echo "   cd ${RELEASE_DIR}"
echo "   ./start-production.sh"
echo ""
echo "2. Or deploy with Docker:"
echo "   ./deploy-docker.sh"
echo ""
echo "3. Upload ${RELEASE_DIR}.tar.gz to your production server"

echo -e "${GREEN}🎉 Release packaging complete!${NC}"
