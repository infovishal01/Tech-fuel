# Tech Fuel 🚀

A modern AI-powered developer learning platform built with **Next.js 16**, **Tailwind CSS**, and **MongoDB**.

![GitHub License](https://img.shields.io/badge/license-MIT-green.svg)
![Node Version](https://img.shields.io/badge/node-18%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)

> Master development with AI-powered learning tools, expert tutorials, and personalized career guidance.

## ✨ Features

- **🤖 AI Tools** — Chat, code generator, mock interviews, project ideas, career roadmaps
- **📚 Interactive Tutorials** — MDX-based tutorial system with categories and search
- **📊 Dashboard** — User workspace with stats, activity tracking, and learning progress
- **⚙️ Admin Panel** — Tutorial creation, user management, and analytics
- **🔐 Authentication** — JWT-based auth with NextAuth Google OAuth support
- **💬 Streaming Chat** — Real-time AI responses with streaming
- **📱 Responsive Design** — Mobile-first UI with Tailwind CSS v4

## 🛠️ Tech Stack

| Layer             | Technology                                           |
| ----------------- | ---------------------------------------------------- |
| **Frontend**      | Next.js 16, React 19, Tailwind CSS v4, Framer Motion |
| **Backend**       | Next.js API Routes, MongoDB, Mongoose                |
| **AI**            | OpenAI SDK (gpt-4o-mini) with streaming              |
| **Auth**          | JWT, bcryptjs, NextAuth.js (Google OAuth)            |
| **Validation**    | Zod (with API validation utilities)                  |
| **UI Components** | Lucide React, Recharts                               |
| **Code Quality**  | ESLint, Prettier, TypeScript (strict mode)           |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database
- OpenAI API key
- Google OAuth credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/infovishal01/Tech-fuel.git
cd Tech-fuel

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Fill in your environment variables
# Edit .env.local with your actual values
```

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Environment Variables

Create a `.env.local` file in the root directory. See `.env.local.example` for template:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Configuration
JWT_SECRET=your_jwt_secret_min_32_chars

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret_min_32_chars
NEXTAUTH_URL=http://localhost:3000

# OpenAI API
OPENAI_API_KEY=sk-your_openai_key

# Optional
NODE_ENV=development
```

## 📁 Project Structure

```
tech-fuel/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── dashboard/               # User dashboard
│   ├── admin/                   # Admin panel
│   ├── tutorials/               # Tutorial listing & details
│   ├── ai-tools/                # AI tools hub
│   ├── profile/                 # User profile
│   ├── about/                   # About page
│   └── api/                     # API routes
│       ├── auth/                # Auth endpoints
│       ├── tutorials/           # Tutorial CRUD
│       ├── ai-chat/             # Chat endpoint
│       ├── code-generator/      # Code gen
│       ├── mock-interview/      # Mock interview
│       ├── project-generator/   # Project ideas
│       ├── roadmap/             # Career roadmap
│       ├── profile/             # User profile endpoint
│       └── admin/               # Admin endpoints
├── components/
│   ├── layout/                  # MainLayout, Footer, Navbar
│   ├── home/                    # Hero, Features, Testimonials
│   ├── dashboard/               # Dashboard components
│   ├── tutorials/               # Tutorial display components
│   └── tools/                   # AI tool components
├── lib/
│   ├── mongodb.ts              # MongoDB connection
│   ├── api-validation.ts       # Request validation utilities
│   └── tutorials.ts            # Tutorial utilities
├── models/                      # Mongoose schemas
│   ├── User.ts
│   ├── Tutorial.ts
│   └── Session.ts
├── content/                     # MDX tutorial content
├── public/                      # Static assets
├── .github/
│   └── workflows/              # CI/CD workflows
├── .env.local.example          # Environment template
├── .prettierrc.json            # Prettier config
├── eslint.config.mjs           # ESLint config
└── tsconfig.json               # TypeScript config
```

## 🔌 API Endpoints

### Authentication

| Endpoint                  | Method   | Description                |
| ------------------------- | -------- | -------------------------- |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth Google OAuth flow |

### Tutorials

| Endpoint         | Method | Description        | Auth Required |
| ---------------- | ------ | ------------------ | ------------- |
| `/api/tutorials` | GET    | List all tutorials | ❌            |
| `/api/tutorials` | POST   | Create tutorial    | ✅ (Admin)    |

### AI Features

| Endpoint                 | Method | Description              | Auth Required |
| ------------------------ | ------ | ------------------------ | ------------- |
| `/api/ai-chat`           | POST   | Chat with AI (streaming) | ✅            |
| `/api/code-generator`    | POST   | Generate code snippets   | ✅            |
| `/api/mock-interview`    | POST   | Mock interview feedback  | ✅            |
| `/api/project-generator` | POST   | Generate project ideas   | ✅            |
| `/api/roadmap`           | POST   | Generate career roadmap  | ✅            |

### User

| Endpoint           | Method | Description           | Auth Required |
| ------------------ | ------ | --------------------- | ------------- |
| `/api/profile`     | GET    | Get user profile      | ✅            |
| `/api/admin/stats` | GET    | Admin dashboard stats | ✅ (Admin)    |

## 📝 API Request Validation

We use **Zod** for runtime type validation on all API endpoints. See `API_VALIDATION.md` for detailed documentation and examples.

### Example API Usage

```typescript
// Using validated request
import { validateRequest, schemas, errorResponse } from '@/lib/api-validation';
import { z } from 'zod';

export async function POST(req: Request) {
  const validation = await validateRequest(
    req,
    z.object({ message: schemas.message })
  );

  if (!validation.success) {
    return errorResponse(validation.error);
  }

  // validation.data is fully typed
  const { message } = validation.data;
  // ... rest of logic
}
```

## 🎨 Design System

- **Theme**: Dark mode (default)
- **Primary Color**: `#09090b` (background)
- **Accent Color**: `#22c55e` (green)
- **Typography**: Inter font family
- **Layout**: Responsive grid-based
- **Components**: Card-based with subtle borders
- **Animations**: Framer Motion for smooth transitions

## 📊 Database Schema

### User Model

```typescript
{
  _id: ObjectId,
  email: string,
  name: string,
  password: string (hashed),
  role: 'student' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Tutorial Model

```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  content: string (MDX),
  category: string,
  author: ObjectId (ref: User),
  published: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Input validation with Zod
- ✅ Environment variables for secrets
- ✅ CORS headers configured
- ✅ TypeScript strict mode enabled
- ✅ ESLint for code quality
- ✅ Rate limiting ready (can be added)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy from Vercel Dashboard
# 1. Connect your GitHub repository
# 2. Add environment variables in Vercel Settings
# 3. Deploy!
```

### Other Platforms

- Railway: See [Railway Deployment Guide](https://railway.app/docs)
- Render: See [Render Deployment Guide](https://render.com/docs)
- Heroku: See [Heroku Deployment Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## 📚 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Development setup & contribution guidelines
- **[API_VALIDATION.md](./API_VALIDATION.md)** — API validation patterns & examples
- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** — Recent improvements & changelog

## 🧪 Testing & Quality

```bash
# Run linting
npm run lint

# Check formatting
npm run format:check

# Format all files
npm run format

# Build production bundle
npm run build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

```
Error: "Please define MONGODB_URI in .env.local"
Solution: Ensure MONGODB_URI is set in .env.local and is valid
```

### OpenAI API Errors

```
Error: "Invalid API key"
Solution: Verify OPENAI_API_KEY in .env.local and has API credits
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Linting Errors

```bash
# Fix linting issues automatically
npm run lint -- --fix

# Format code
npm run format
```

## 📈 Performance

- ⚡ Next.js 16 optimizations
- 🎯 Streaming responses for AI features
- 📦 Code splitting & lazy loading
- 🗜️ Image optimization with Next.js Image
- ⚙️ Caching strategies for MongoDB queries
- 🔄 Automatic revalidation strategies

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Code of conduct
- Development setup
- Pull request process
- Commit conventions

### Quick Contribution Steps

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes and commit (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🙌 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by [OpenAI](https://openai.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Database by [MongoDB](https://www.mongodb.com/)

## 📞 Support

- 💬 [GitHub Discussions](https://github.com/infovishal01/Tech-fuel/discussions)
- 🐛 [Report Issues](https://github.com/infovishal01/Tech-fuel/issues)
- 📧 Email: support@techfuel.dev

## 🎯 Roadmap

- [ ] Unit & integration tests
- [ ] WebSocket support for real-time chat
- [ ] Video tutorials support
- [ ] Gamification features (badges, points)
- [ ] User progress tracking
- [ ] Batch processing for code analysis
- [ ] Advanced search & filtering
- [ ] Community features (forums, comments)

---

**Made with ❤️ by the Tech Fuel Team**

⭐ If you find this project helpful, please consider giving it a star!

![Tech Fuel - AI Learning Platform](https://img.shields.io/badge/Tech%20Fuel-AI%20Learning%20Platform-brightgreen?style=for-the-badge)
