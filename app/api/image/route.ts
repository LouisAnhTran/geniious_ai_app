import { auth } from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST ( req: NextRequest ) {
  try {
    const { userId } = auth();
    const body = await req.json();
    
    console.log("body: ",body);

    const { prompt, amount, resolution } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }


    const response = await openai.images.generate({
      prompt,
      n:  parseInt(amount),
      size: resolution,
    });

    const image_url = response.data[0].url;

    console.log("completion: ",response.data)

    return NextResponse.json(response.data);

  } catch (error) {
    console.log("Conversation error ",error)
    return new NextResponse("Internal error: ",{status:500})
  }
};
