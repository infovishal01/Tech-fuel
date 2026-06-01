import OpenAI from "openai";

import { NextResponse }
from "next/server";

const openai = new OpenAI({

  apiKey:
    process.env
      .OPENAI_API_KEY,
});

export async function POST(
  req: Request
) {

  try {

    const { career } =
      await req.json();

    const completion =
      await openai.chat.completions.create({

        model:
          "gpt-4o-mini",

        messages: [

          {
            role: "system",

            content:
              `
              You are an AI career roadmap generator.

              Generate:
              - Learning roadmap
              - Technologies
              - Timeline
              - Projects
              - Career guidance
              - Resources
              `,
          },

          {
            role: "user",

            content:
              `
              Create a complete roadmap for:
              ${career}
              `,
          },
        ],
      });

    return NextResponse.json({

      success: true,

      roadmap:
        completion
          .choices[0]
          .message.content,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      message:
        "Roadmap Error",
    });
  }
}