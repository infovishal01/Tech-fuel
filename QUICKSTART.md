# 🚀 Tech Fuel - Quick Start Guide

## Prerequisites

### 1. MongoDB Setup (Required for database)
**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongo --eval "db.version()"
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Copy connection string
4. Add to `.env.local`: `MONGODB_URI=<your-connection-string>`

### 2. Environment Variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

## Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# Visit: http://localhost:3000
```

## Common Issues & Fixes

### ❌ "MongoDB connection failed"
**Solution:** Make sure MongoDB is running and MONGODB_URI is set in .env.local

### ❌ "JWT_SECRET is missing"
**Solution:** Add JWT_SECRET to .env.local (any 32+ char string)

### ❌ "Port 3000 already in use"
**Solution:** The app will use port 3001 or change in package.json

### ❌ "OPENAI_API_KEY missing"
**Solution:** AI features are optional. Only needed for AI Chat, Code Generator, etc.

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code quality check
npm run format       # Auto-format code
```

## Required Environment Variables

Copy `.env.local.example` to `.env.local` and update:
- `MONGODB_URI` — Your MongoDB connection string
- `JWT_SECRET` — Random secret (min 32 chars)
- `NEXTAUTH_SECRET` — Random secret (min 32 chars)
- `NEXTAUTH_URL` — http://localhost:3000

Optional:
- `OPENAI_API_KEY` — For AI features
- `GOOGLE_CLIENT_ID` — For OAuth login
- `GOOGLE_CLIENT_SECRET` — For OAuth login

---

**Setup steps:**
1. Install Node 18+
2. Run `npm install`
3. Copy `.env.local.example` to `.env.local`
4. Update environment variables
5. Ensure MongoDB is running
6. Run `npm run dev`
7. Open http://localhost:3000

**Need help?** See README.md and CONTRIBUTING.md
