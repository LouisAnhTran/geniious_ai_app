import { auth } from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

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
      messages,
      model: "gpt-3.5-turbo",
    });

    console.log("completion: ",completion)

    return NextResponse.json(completion.choices[0].message);

  } catch (error) {
    console.log("Conversation error ",error)
    return new NextResponse("Internal error: ",{status:500})
  }
};
