import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    console.log("body: ", body);
    console.log("prompt: ", prompt);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const input = {
      prompt: prompt,
      duration: 5,
      output_format: "mp3",
    };

    const output = await replicate.run(
      "sepal/audiogen:154b3e5141493cb1b8cec976d9aa90f2b691137e39ad906d2421b74c2a8c52b8",
      { input }
    );

    console.log("output: ",output);

    return NextResponse.json(output);
    
  } catch (error) {
    console.log("Music error ", error);
    return new NextResponse("Internal error: ", { status: 500 });
  }
}
