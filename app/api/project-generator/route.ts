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

    const { idea } =
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
              You are an AI Project Architect.

              Generate:
              - Project overview
              - Features
              - Tech stack
              - Folder structure
              - Database design
              - Deployment guide
              - Roadmap
              `,
          },

          {
            role: "user",

            content:
              `
              Generate a project for:
              ${idea}
              `,
          },
        ],
      });

    return NextResponse.json({

      success: true,

      project:
        completion
          .choices[0]
          .message.content,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      message:
        "Project Generator Error",
    });
  }
}