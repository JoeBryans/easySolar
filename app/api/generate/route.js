import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY });
// const Schema = `Calculation of a solar system with total power is 6kw , total energy consumption is 5000wh, 24volt battery, peak sun hours is 5, panel is 300watt `;

export async function POST(req) {
  const body = await req.json();
  const {
    totalPower,
    totalEnergy,
    batterySize,
    DOD,
    peakSunHours,
    panelWattage,
    inverterInput,
    autonomy,
  } = body;
  //   const prompt = `Calculation of a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}wh, battery size is ${batterySize}volt, depth of discharge is ${DOD}, peak sun hours is ${peakSunHours}, panel is ${panelWattage} watt and also give the extimate of the solar system in table format`;
  const prompt = `Calculation of a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}, battery size is ${batterySize}, depth of discharge is ${DOD}, autonomy is ${autonomy} peak sun hours is ${peakSunHours}, panel is ${panelWattage},inverter input voltage is${inverterInput}  and also give the extimate of the solar system `;

  const response = await ai.models.generateContent({
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

  const data = JSON.parse(response.text);
  console.log(data);
  return NextResponse.json(data);
}
