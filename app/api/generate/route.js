import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY });
// const Schema = `Calculation of a solar system with total power is 6kw , total energy consumption is 5000wh, 24volt battery, peak sun hours is 5, panel is 300watt `;
const sample = `Okay, let's break down the solar system calculation and estimate. Please note that this is a simplified estimation, and actual requirements may vary based on specific site conditions, equipment efficiency, and other factors. It's always best to consult with a qualified solar installer for a detailed assessment and design.

1. Battery Sizing:

Usable Battery Capacity: 12V * 200Ah * 60% (Depth of Discharge) = 1440 Wh per battery
Total Usable Battery Capacity Needed for Autonomy: 7 kWh (daily energy consumption) * 3 days = 21 kWh = 21000Wh
Number of Batteries (12V): 21000 Wh / 1440 Wh/battery = approximately 14.58 batteries. Since we need a 24V system for the inverter, let's calculate based on 24V.
Batteries in Series: To get 24V from 12V batteries, you need 2 batteries in series.
Number of Parallel Strings: Since we need approximately 14.58 batteries total. So we need 15 batteries with 2 batteries in series which equal to 7 strings. 7*2 =14 batteries so we need 8 strings, which is 16 batteries in total, each string will provide 24v. So we are taking 8 batteries to meet the autonomy requirement.
Total Batteries Required: 16 ( 8 parallel strings of 2 batteries each)
2. Solar Panel Sizing:

Total Watt-peak Required: 7 kWh (daily energy consumption) / 5 peak sun hours = 1400W
Number of 500W Panels: 1400 W / 500 W/panel = 2.8 panels. Round up to 3 panels to ensure you meet the energy demand, especially on less sunny days.
3. Inverter Sizing:

Given: 24V input voltage.
Inverter Capacity: You need an inverter with a continuous power rating of at least 10 kW (your total power requirement). It's always a good idea to add a safety margin of 20-25%. Therefore, consider an inverter with around 12kW.
4. Charge Controller Sizing:

The charge controller needs to be compatible with the solar panel array voltage and current, and the battery bank voltage (24V). Calculate the maximum current from the solar panels (Panel Wattage / Battery Voltage).
In our case, 1500W / 24V = 62.5 Amps. Therefore, the charge controller should be at least 62.5 Amps. A 80-amp or larger MPPT charge controller is recommended.
5. System Components and Estimated Costs (Example):

Solar Panels (3 x 500W): $600 - $900 (depending on brand and efficiency)
Batteries (16 x 12V 200Ah): $3200 - $6400 (depending on type - AGM, Gel, Lithium)
Inverter (12kW, 24V): $1500 - $3000 (depending on features and brand)
Charge Controller (80A MPPT): $300 - $600
Wiring, Fuses, Disconnects, Mounting Hardware: $500 - $1000
Installation Costs: $1000 - $3000 (highly variable)
Total Estimated Cost: $7100 - $14900+

Important Considerations:

Local Regulations and Permits: Check with your local authorities for any required permits or regulations for solar installations.
Professional Installation: It's highly recommended to have a qualified solar installer design and install your system to ensure safety and optimal performance.
Warranty: Check the warranty terms for all components, especially batteries and the inverter.
Grid-Tie vs. Off-Grid: This calculation assumes an off-grid system. If you are grid-tied, the battery sizing and inverter requirements might be different.
Load Profile: The 7 kWh daily energy consumption is an average. Consider your peak loads and adjust the inverter size accordingly.
Summary of Components:

Solar Panels: 3 x 500W
Batteries: 16 x 12V 200Ah (configured as 8 strings of 2 in series for 24V)
Inverter: 12kW, 24V input
Charge Controller: 80A MPPT
This provides a detailed breakdown. Remember to consult with solar professionals for a tailored system design!`;

const sample1 = `
battery:results
panel:results
inverter:results
charge controller:results
total:results
estimate:results
 

`;
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
  const prompt = `Calculation of a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}wh, battery size is ${batterySize}volt, depth of discharge is ${DOD}, peak sun hours is ${peakSunHours}, panel is ${panelWattage} watt and also give the extimate of the solar system 
  Follow the Following schema and return JSON data 
 [
      {
         battery:"",
         panel:"",
         inverter:"",
         charge controller:"",
         total:"",
         estimate:"",
      }
    ]  
  `;
  // const prompt = `Well detailed  Calculation on a solar system with total power:${totalPower} , total energy consumption is ${totalEnergy}, battery size is ${batterySize}, depth of discharge is ${DOD}, the  autonomy is ${autonomy} peak sun hours is ${peakSunHours}, panel is ${panelWattage},inverter input voltage is${inverterInput}, ensuring recommendation for the system. and also give the estimate of the solar system  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    // model: "gemini-2.5-flash-preview-04-17",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            battery: {
              type: Type.STRING,
              description: "battery size",
              nullable: false,
            },
            panel: {
              type: Type.STRING,
              description: "panel size",
              nullable: false,
            },
            inverter: {
              type: Type.STRING,
              description: "inverter size",
              nullable: false,
            },
            charge: {
              type: Type.STRING,
              description: "charge controller size",
              nullable: false,
            },
            total: {
              type: Type.STRING,
              description: "total size",
              nullable: false,
            },
            estimate: {
              type: Type.STRING,
              description: "Name of the recipe",
              nullable: false,
            },
            // content: {
            //   type: Type.STRING,
            //   description: "content",
            // },
          },
          required: [
            "battery",
            "panel",
            "inverter",
            "charge",
            "total",
            "estimate",
          ],
        },
      },
    },
  });

  const data = JSON.parse(response.text);
  console.log(data);
  return NextResponse.json(data);
}
