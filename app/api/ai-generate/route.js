// pages/api/generate-json.js
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// with the respons  in this format:${sample1}
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
  const prompt = ` Calculation of a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}, battery size is ${batterySize}, depth of discharge is ${DOD}, the  autonomy is ${autonomy} peak sun hours is ${peakSunHours}, panel is ${panelWattage},inverter input voltage is${inverterInput}and also give the estimate of the solar system  `;
  const models = await openai.models.list();
  console.log("models :", models);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "Return the response only as a valid JSON object.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;

    // Attempt to parse the JSON if it's returned as text
    try {
      const jsonResponse = JSON.parse(responseText);
      console.log(jsonResponse);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      res.status(200).json({
        raw: responseText,
        warning: "Failed to parse JSON, returning raw response.",
      });
    }
    //   return NextResponse.json(responseText);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "Failed to generate response" });
  }
}
