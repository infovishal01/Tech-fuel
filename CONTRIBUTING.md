# Contributing to Tech Fuel

Thank you for your interest in contributing to Tech Fuel! Here's how to get started.

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/infovishal01/Tech-fuel.git
   cd Tech-fuel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Code Style
- We use **ESLint** for linting and **Prettier** for formatting
- Format your code before committing:
  ```bash
  npm run format
  ```

### Running Linting
```bash
npm run lint
```

### Branch Naming
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Chores: `chore/description`

## Making Changes

1. Create a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit with clear messages
   ```bash
   git commit -m "feat: add new AI tool"
   ```

3. Push to your fork and create a Pull Request

## Commit Message Convention

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, missing semicolons, etc
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding/updating tests
- `chore:` - Dependency updates, config changes

Example:
```bash
git commit -m "feat: add project idea generator API"
git commit -m "fix: resolve MongoDB connection timeout"
```

## Pull Request Process

1. Update the README.md with details of new features
2. Ensure all changes pass linting (`npm run lint`)
3. Write clear PR descriptions explaining your changes
4. Link related issues in your PR
5. Wait for review and address feedback

## Testing

Before submitting a PR:
```bash
npm run lint
npm run build
```

## Report Issues

Found a bug? Please create an issue with:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## Questions?

Open an issue or start a discussion. We're here to help!

---

Happy coding! 🚀
