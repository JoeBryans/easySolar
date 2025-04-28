import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import connectDB from "@/lib/dataBase";
import { estimateModel } from "@/lib/models/modes";

const gemini = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY });
const Schema = `Calculation of a solar system with total power is 6kw , total energy consumption is 5000wh, 24volt battery, peak sun hours is 5, panel is 300watt `;

export async function POST(request) {
  const body = await request.json();
  const { title, content } = body;
  const estim = content.map((item) => {
    return item.content;
  });
  console.log("body", body);
  console.log("estim", estim);

  try {
    const extimate = await estimateModel.create({
      title: title,
      content: estim,
    });
    console.log("extimate", extimate);

    return NextResponse.json(extimate);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error);
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const extimate = await estimateModel.find();
    return NextResponse.json(extimate);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
