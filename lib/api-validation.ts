import { z } from 'zod';

/**
 * API validation utility for request bodies
 * Usage: const data = await validateRequest(req, schema);
 */
export async function validateRequest<T>(
  req: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      return {
        success: false,
        error: `Validation failed: ${errors}`,
      };
    }

    return {
      success: true,
      data: validation.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof SyntaxError
          ? 'Invalid JSON in request body'
          : 'Failed to parse request',
    };
  }
}

/**
 * Common validation schemas
 */
export const schemas = {
  message: z.string().min(1, 'Message is required').max(10000),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userId: z.string().min(1, 'User ID is required'),
};

/**
 * Error response helper
 */
export function errorResponse(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
