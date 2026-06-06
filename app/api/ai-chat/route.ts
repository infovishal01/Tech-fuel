import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  // Stream
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',

    stream: true,

    messages: [
      {
        role: 'system',

        content: `
            You are Tech Fuel AI Assistant.
            Help with coding, AI, cloud,
            DevOps, and careers.
            `,
      },

      {
        role: 'user',

        content: message,
      },
    ],
  });

  // Create Stream
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';

        controller.enqueue(encoder.encode(text));
      }

      controller.close();
    },
  });

  return new Response(readable);
}
