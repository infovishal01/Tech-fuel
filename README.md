# Tech Fuel 🚀

> **The Ultimate Learning Platform for Developers & Computer Engineering Students**

A comprehensive **AI-powered learning platform** built with **Next.js 16**, **Tailwind CSS v4**, and **MongoDB**.

**Master AI, DSA, System Design, Core Computer Engineering, Backend Development, and Job Preparation - all in one place!**

---

## 🌟 What Makes Tech Fuel Unique?

- AI-Powered Learning with chat, code generation, mock interviews, and career roadmaps
- Structured Learning Paths for DSA, System Design, Core CS, and Backend Development
- 1000+ DSA Practice Problems with multi-language solutions
- System Design Case Studies (Twitter, Uber, Netflix, YouTube, etc.)
- Core Computer Engineering Tutorials (OS, DBMS, CN, Compiler, COA)
- Backend Code Examples with live execution
- Vlog & Blog for latest tech updates
- Job & Remote Job Preparation with resume building and interview practice

---

## 🎯 Learning Tracks

### AI & LLM Track
- Introduction to AI/ML
- LLM Fundamentals (Transformers, Attention)
- Prompt Engineering
- Fine-tuning Models
- Building AI Applications
- Ethical AI
- AI in Production

### Data Structures & Algorithms Track
**Data Structures:** Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Hash Tables, DSU, Bloom Filters, LRU Cache

**Algorithms:** Sorting, Searching, Graph Algorithms, Dynamic Programming, Greedy, Backtracking, Divide & Conquer, String Algorithms

**Practice Platform:** 1000+ Problems, Multi-language Support, Company-wise Questions, Contests, Solutions with Complexity Analysis

### System Design Track
**Fundamentals:** Scalability, Availability, CAP Theorem, Load Balancing, Caching, Database Design

**Case Studies:** TinyURL, Pastebin, Twitter, Facebook, Uber, Airbnb, Netflix, YouTube, WhatsApp, Zoom, Reddit, E-commerce, Payment Systems

**Advanced:** Microservices, Event-Driven Architecture, Serverless, Service Mesh, API Gateway, Rate Limiting, Circuit Breakers, Distributed Transactions

### Core Computer Engineering Track
- **Operating Systems:** Processes, Memory Management, File Systems, Synchronization, Deadlocks
- **Database Systems:** Relational Model, SQL, Normalization, Indexing, Transactions, Concurrency Control, NoSQL
- **Computer Networks:** OSI Model, Physical Layer, Data Link Layer, Network Layer, Transport Layer, Application Layer, Security
- **Compiler Design:** Lexical Analysis, Syntax Analysis, Semantic Analysis, Code Generation, Optimization
- **Computer Organization:** Digital Logic, Combinational Circuits, Sequential Circuits, CPU Design, Pipelining, Parallel Processing
- **Theory of Computation:** Finite Automata, Pushdown Automata, Turing Machines, Complexity Theory

### Backend Development Track
**Languages:** Node.js, Python, Java, Go, Rust

**Concepts:** REST API Design, GraphQL, gRPC, WebSockets, Authentication, Rate Limiting, API Versioning

**Code Lab:** Live Code Execution, API Testing, Debugging, Code Templates, Error Explanations

### Job & Remote Job Preparation Track
- Resume & Profile Building
- Interview Preparation (DSA, System Design, Behavioral)
- Remote Job Specifics
- Company-wise Preparation (FAANG, Top Product Companies, Startups)
- Success Stories & Vlog Updates

---

## Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, MDX, Recharts, Lucide React

**Backend:** Next.js API Routes, MongoDB, Mongoose, NextAuth.js, JWT, bcryptjs, OpenAI SDK

**AI:** OpenAI GPT-4o-mini with Streaming

**Quality:** Zod, ESLint, Prettier

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB database
- OpenAI API key

### Installation
```bash
git clone https://github.com/infovishal01/Tech-fuel.git
cd Tech-fuel
npm install
cp .env.local.example .env.local
# Edit .env.local with your values
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tech-fuel

# Auth
JWT_SECRET=your_jwt_secret_minimum_32_chars
NEXTAUTH_SECRET=your_nextauth_secret_minimum_32_chars
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI
OPENAI_API_KEY=sk-your_openai_key
AI_MODEL=gpt-4o-mini
AI_MAX_TOKENS=4096
AI_TEMPERATURE=0.7

# App
NODE_ENV=development
PORT=3000
```

---

## Project Structure

```
tech-fuel/
├── app/
│   ├── (auth)/              # Login, Signup
│   ├── (main)/              # All main pages
│   │   ├── dashboard/       # User dashboard
│   │   │   └── learning/    # All learning modules
│   │   │       ├── dsa/
│   │   │       ├── system-design/
│   │   │       ├── core-cs/
│   │   │       └── backend-dev/
│   │   ├── ai-tools/        # AI tools
│   │   ├── tutorials/       # Tutorials
│   │   ├── vlog/           # Vlog & Blog
│   │   ├── job-prep/        # Job preparation
│   │   └── admin/          # Admin panel
│   └── api/                # All API routes
│       ├── auth/
│       ├── ai-chat/
│       ├── code-generator/
│       ├── mock-interview/
│       ├── project-generator/
│       ├── roadmap/
│       ├── dsa/            # NEW: DSA APIs
│       ├── system-design/  # NEW: System Design APIs
│       ├── core-cs/        # NEW: Core CS APIs
│       ├── backend-examples/ # NEW: Backend APIs
│       ├── vlog/           # NEW: Vlog APIs
│       └── job-prep/        # NEW: Job Prep APIs
├── components/
│   ├── learning/            # Learning components
│   │   ├── DSA/
│   │   ├── SystemDesign/
│   │   ├── CoreCS/
│   │   ├── BackendDev/
│   │   └── AITools/
│   └── vlog/
│       ├── VlogPost.tsx
│       └── CommentSection.tsx
├── models/                  # MongoDB Models
│   ├── User.ts
│   ├── Tutorial.ts
│   ├── DSAProblem.ts       # NEW
│   ├── SystemDesignCase.ts  # NEW
│   ├── CoreCSConcept.ts    # NEW
│   ├── BackendExample.ts   # NEW
│   ├── VlogPost.ts         # NEW
│   └── JobPrepResource.ts  # NEW
├── content/                 # All learning content
│   ├── tutorials/
│   ├── dsa/                # NEW: DSA problems
│   ├── system-design/      # NEW: Case studies
│   ├── core-cs/            # NEW: CS concepts
│   ├── backend-examples/   # NEW: Code examples
│   └── vlog/               # NEW: Vlog posts
├── lib/                    # Utilities
│   ├── ai/
│   │   ├── openai.ts
│   │   └── prompts.ts
│   └── learning/
│       ├── dsa.ts
│       ├── system-design.ts
│       ├── core-cs.ts
│       └── backend-examples.ts
├── types/                  # TypeScript types
│   ├── learning.ts
│   ├── ai.ts
│   └── vlog.ts
└── public/                 # Static assets
```

---

## API Endpoints

### AI Features (Existing)
- POST `/api/ai-chat` - Chat with AI
- POST `/api/code-generator` - Generate code
- POST `/api/mock-interview` - Mock interview
- POST `/api/project-generator` - Generate projects
- POST `/api/roadmap` - Career roadmap

### DSA Practice (NEW)
- GET `/api/dsa/problems` - List problems
- GET `/api/dsa/problems/[id]` - Get problem
- POST `/api/dsa/solutions` - Submit solution
- GET `/api/dsa/submissions` - Get submissions

### System Design (NEW)
- GET `/api/system-design/case-studies` - List case studies
- GET `/api/system-design/case-studies/[id]` - Get case study

### Core CS (NEW)
- GET `/api/core-cs/concepts` - List concepts
- GET `/api/core-cs/quizzes` - List quizzes

### Backend Examples (NEW)
- GET `/api/backend-examples` - List examples
- POST `/api/backend-examples/[id]/run` - Run code

### Vlog/Blog (NEW)
- GET `/api/vlog/posts` - List posts
- POST `/api/vlog/posts` - Create post
- POST `/api/vlog/posts/[id]/comments` - Add comment

### Job Preparation (NEW)
- GET `/api/job-prep/resume-templates` - List templates
- GET `/api/job-prep/interview-questions` - List questions
- GET `/api/job-prep/remote-tips` - List tips

---

## Learning Paths

### Full Stack Developer (6 months)
1. Core CS Fundamentals (2 weeks)
2. Programming Languages (4 weeks)
3. Data Structures & Algorithms (6 weeks)
4. Backend Development (6 weeks)
5. Frontend Development (4 weeks)
6. System Design (4 weeks)
7. AI & LLM Integration (2 weeks)
8. Job Preparation (2 weeks)

### AI/ML Engineer (6 months)
1. Mathematics for AI (4 weeks)
2. Programming for AI (4 weeks)
3. Machine Learning (6 weeks)
4. Deep Learning (6 weeks)
5. LLM Specialization (6 weeks)
6. AI in Production (4 weeks)

### Backend Engineer (6 months)
1. Core CS (3 weeks)
2. Programming (6 weeks)
3. Databases (4 weeks)
4. API Design (4 weeks)
5. System Design (8 weeks)
6. DevOps (4 weeks)

### Frontend Engineer (6 months)
1. Core CS & Web (4 weeks)
2. HTML/CSS (3 weeks)
3. JavaScript & TypeScript (4 weeks)
4. React Ecosystem (6 weeks)
5. UI/UX (4 weeks)
6. Performance (3 weeks)
7. Advanced Topics (3 weeks)

---

## Deployment

### Vercel (Recommended)
```bash
git push origin main
# Deploy from Vercel Dashboard
```

### Docker
```bash
docker build -t tech-fuel .
docker run -d -p 3000:3000 --env-file .env.local tech-fuel
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
```

---

## Features Coming Soon

- DSA Practice Platform with 1000+ problems
- System Design Case Studies
- Core CS Tutorials
- Backend Code Examples with live execution
- Vlog/Blog System
- Job Preparation Resources
- Gamification (Badges, Leaderboards)
- Community Features (Forums, Q&A)

---

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit your changes
4. Push to branch
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with by Tech Fuel Team**

If you find this project helpful, please give it a star! ⭐

[![GitHub Stars](https://img.shields.io/github/stars/infovishal01/Tech-fuel.svg?style=social)](https://github.com/infovishal01/Tech-fuel/stargazers)
