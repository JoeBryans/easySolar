import prisma from "@/lib/db";
import { GoogleGenAI, Type } from "@google/genai";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// const gemini = new GoogleGenerativeAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
// });
const gemini = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY });
const Schema = `Calculation of a solar system with total power is 6kw , total energy consumption is 5000wh, 24volt battery, peak sun hours is 5, panel is 300watt `;

export async function POST(request) {
  const body = await request.json();
  const {
    title,
    totalPower,
    totalEnergy,
    batterySize,
    DOD,
    peakSunHours,
    panelWattage,
  } = body;
  const prompt = `Calculation of a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}wh, battery size is ${batterySize}volt, depth of discharge is ${DOD}, peak sun hours is ${peakSunHours}, panel is ${panelWattage} watt and also give the extimate of the solar system in table format`;
  const Tprompt = `Calculation of a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}wh, battery size is ${batterySize}volt, depth of discharge is ${DOD}, peak sun hours is ${peakSunHours}, panel is ${panelWattage} watt in table format`;
  try {
    const AiModel = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: {
                type: Type.STRING,
                description: "Name of the recipe",
                nullable: false,
              },
            },
            required: ["content"],
          },
        },
      },
    });
    // const Tableresult = await gemini.models.generateContent({
    //   model: "gemini-2.0-flash",
    //   contents: Tprompt,
    //   config: {
    //     responseMimeType: "application/json",
    //     responseSchema: {
    //       type: Type.ARRAY,
    //       items: {
    //         type: Type.OBJECT,
    //         properties: {
    //           estimate: {
    //             type: Type.STRING,
    //             description: "estimate of the solar system",
    //             nullable: false,
    //           },
    //         },
    //         required: ["estimate"],
    //       },
    //     },
    //   },
    // });

    // console.log("Tableresult", Tableresult);
    console.log("AiModel", AiModel);
    const items = JSON.parse(JSON.stringify(AiModel.text));
    const extimate = await prisma.estimate.create({
      data: {
        // title: title,
        // table: "Tableresult.text",
        content: items,
      },
    });
    return NextResponse.json(extimate);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(request) {
  try {
    const extimate = await prisma.estimate.findMany();
    return NextResponse.json(extimate);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
