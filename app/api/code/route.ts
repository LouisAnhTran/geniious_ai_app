import { auth } from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI();

const instructionMessage: ChatCompletionMessageParam={
  role: "system",
  content: "You are a code generator. Along the explaination in text, You must also provide the code in markdown code snippets. Use code comments for explainations"
}

export async function POST ( req: NextRequest ) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    console.log("what is message: ",messages);

    const completion = await openai.chat.completions.create({
      messages: [instructionMessage,...messages],
      model: "gpt-3.5-turbo",
    });

    console.log("completion: ",completion)

    return NextResponse.json(completion.choices[0].message);

  } catch (error) {
    console.log("Code error ",error)
    return new NextResponse("Internal error: ",{status:500})
  }
};
