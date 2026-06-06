# Tech Fuel

A modern AI-powered developer learning platform built with Next.js 16, Tailwind CSS, and MongoDB.

## Features

- **AI Tools** — Chat, code generator, mock interviews, project ideas, career roadmaps
- **Tutorials** — MDX-based tutorial system with categories and search
- **Dashboard** — User workspace with stats and activity tracking
- **Admin Panel** — Tutorial creation and user management
- **Authentication** — JWT-based auth with NextAuth Google OAuth support

## Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Backend  | Next.js API Routes, MongoDB, Mongoose |
| AI       | OpenAI SDK (gpt-4o-mini)              |
| Auth     | JWT, bcryptjs, NextAuth (Google)      |
| Charts   | Recharts                              |
| Icons    | Lucide React                          |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── dashboard/            # User dashboard
│   ├── admin/                # Admin panel
│   ├── tutorials/            # Tutorial pages
│   ├── ai-tools/             # AI tools page
│   ├── about/                # About page
│   ├── profile/              # User profile
│   └── api/                  # API routes
├── components/
│   ├── layout/               # MainLayout, Footer
│   ├── home/                 # Hero, Tutorials, Testimonials, etc.
│   ├── dashboard/            # Dashboard components
│   ├── tutorials/            # Tutorial components
│   └── tools/                # Tool components
├── models/                   # Mongoose models
├── lib/                      # Utilities (mongodb, tutorials)
└── content/                  # MDX tutorial content
```

## API Routes

| Route                     | Method   | Description                      |
| ------------------------- | -------- | -------------------------------- |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth Google OAuth            |
| `/api/tutorials`          | GET/POST | List/create tutorials            |
| `/api/ai-chat`            | POST     | AI chat (streaming)              |
| `/api/code-generator`     | POST     | Code generation                  |
| `/api/mock-interview`     | POST     | Mock interview feedback          |
| `/api/project-generator`  | POST     | Project idea generation          |
| `/api/roadmap`            | POST     | Career roadmap generation        |
| `/api/profile`            | GET      | Get user profile (auth required) |
| `/api/test`               | GET      | Test MongoDB connection          |

## Design

- Dark theme with `#09090b` background
- Green accent color (`#22c55e`)
- Responsive with mobile menus
- Card-based layouts with subtle borders

## License

MIT
