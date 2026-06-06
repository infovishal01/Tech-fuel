# API Validation Guide

This project uses **Zod** for runtime type validation of API requests. This ensures that your API routes receive valid data and provides helpful error messages to clients.

## Setup

The validation utilities are in `lib/api-validation.ts` and include:

- `validateRequest(req, schema)` — Main validation function
- `errorResponse(message, status)` — Send error responses
- `successResponse(data, status)` — Send success responses
- `schemas` — Common reusable validation schemas

## Usage Example

### Basic Validation

```typescript
import {
  validateRequest,
  schemas,
  errorResponse,
  successResponse,
} from '@/lib/api-validation';
import { z } from 'zod';

export async function POST(req: Request) {
  // Define your schema
  const chatSchema = z.object({
    message: schemas.message,
    conversationId: z.string().optional(),
  });

  // Validate the request
  const validation = await validateRequest(req, chatSchema);

  if (!validation.success) {
    return errorResponse(validation.error);
  }

  const { message, conversationId } = validation.data;

  // Your logic here...
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: message }],
  });

  return successResponse({ reply: response.choices[0].message.content });
}
```

### Custom Schemas

```typescript
import { z } from 'zod';

const tutorialSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.enum(['javascript', 'typescript', 'react', 'nodejs']),
  published: z.boolean().default(false),
});

const validation = await validateRequest(req, tutorialSchema);
```

## Common Patterns

### Email Validation

```typescript
const schema = z.object({
  email: schemas.email,
  password: schemas.password,
});
```

### Array Validation

```typescript
const schema = z.object({
  tags: z.array(z.string()).min(1, 'At least one tag required'),
});
```

### Nested Objects

```typescript
const schema = z.object({
  user: z.object({
    name: z.string(),
    email: schemas.email,
  }),
  settings: z.object({
    notifications: z.boolean(),
  }),
});
```

## Benefits

✅ **Type Safety** — Full TypeScript support  
✅ **Clear Errors** — Helpful validation messages  
✅ **DRY** — Reusable schemas across routes  
✅ **Security** — Catch invalid requests early  
✅ **Consistency** — Standard response format

## Response Format

### Success Response

```json
{
  "reply": "Hello, how can I help you?"
}
```

### Error Response

```json
{
  "error": "Validation failed: message: String must contain at least 1 character(s)"
}
```

For more on Zod validation, see: https://zod.dev
