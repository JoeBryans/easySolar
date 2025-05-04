"use client";
import Container from "@/components/Container";
import Logo from "@/components/header/Logo";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";

const page = () => {
  const [Content, setContent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/estimate");
      const data = await res.json();
      setContent(data);
    };
    fetchData();
  }, []);
  console.log("Content", Content);
  // const mapContent = Content.map((item, index) => {
  //   return (
  //     <div key={index}>
  //       {/* <ReactMarkdown>{item.content}</ReactMarkdown> */}
  //       <Markdown>{item.content}</Markdown>
  //     </div>
  //   );
  // });
  // const Cont = JSON.parse(Content[0]);
  // console.log("Cont", Cont);

  const text = `
    # Welcome to Solar AI

    Solar AI is a powerful AI that can help you generate solar panels, solar chargers, solar panels and solar chargers. Solar AI is a powerful AI that can help you generate solar panels, solar chargers, solar panels and solar chargers. Solar AI is a powerful AI that can help you generate solar panels, solar chargers, solar panels and solar chargers. Solar AI is a powerful AI that can help you generate solar panels, solar chargers, solar panels and solar chargers.

    ## Features

    - Generate solar panels
    - Generate solar chargers
    - Generate solar panels and solar chargers
    - Generate solar panels and solar chargers  
  `;
  const res = `Based on your input, here's a calculation for a solar system:\\n\\n*   **Total Power:** 6kW\\n*   **Total Energy Consumption:** 5000Wh (5 kWh)\\n*   **Battery Voltage:** 24V\\n*   **Peak Sun Hours:** 5\\n*   **Panel Wattage:** 300W\\n\\n**1. Battery Bank Sizing:**\\n\\n*   **Daily Depth of Discharge (DoD):** Assuming a DoD of 50% for battery longevity, you need to account for double the energy consumption: 5000Wh * 2 = 10000Wh\\n*   **Battery Capacity (Ah):** Battery Capacity (Ah) = Total Watt-hours / Battery Voltage = 10000Wh / 24V = 416.67Ah.  Therefore, a 24V battery bank with approximately 417Ah capacity is needed. You would likely achieve this using multiple batteries in parallel and/or series configurations, as individual batteries rarely offer this exact capacity. For example, you could use two 12V 200Ah batteries in series to make it 24 volt 200ah then combine 2 of those set ups in parallel to reach 24v 400ah.\\n\\n**2. Solar Panel Sizing:**\\n\\n*   **Total Wattage Needed:** Total Wattage = Daily Energy Consumption / Peak Sun Hours = 5000Wh / 5 hours = 1000W\\n*   **Number of Panels:** Number of Panels = Total Wattage Needed / Panel Wattage = 1000W / 300W = 3.33.  Round up to 4 panels to ensure sufficient energy generation.\\n\\n**3. Inverter Sizing:**\\n\\n*   You specified a total power of 6kW. This means you need an inverter that can handle a continuous load of 6000W. Consider also surge power requirements, as some appliances require higher wattage when starting. An inverter with a surge capacity higher than your peak load would be recommended. Match the inverter voltage to your battery bank voltage (24V).\\n\\n**Summary:**\\n\\n*   **Battery Bank:** 24V, approximately 417Ah capacity (achieved through multiple batteries).\\n*   **Solar Panels:** 4 x 300W panels (Total 1200W).\\n*   **Inverter:** 6kW, 24V DC input, with suitable surge capacity.\\n\\n**Important Considerations:**\\n\\n*   **Wiring and Protection:** Use appropriately sized wiring, fuses, and circuit breakers for safety and to prevent damage to your system.\\n*   **Charge Controller:** A charge controller is essential to regulate the voltage and current from the solar panels to the batteries, preventing overcharging and extending battery life. Choose a charge controller compatible with your battery voltage (24V) and the solar panel array's voltage and current.\\n*   **Location and Shading:** The placement of your solar panels is critical. Ensure they are placed in a location that receives maximum sunlight throughout the day, with minimal shading.\\n*   **Energy Consumption Monitoring:** It's beneficial to monitor your energy consumption patterns to optimize your solar system's performance.\\n*   **Professional Installation:** It is highly recommended to consult with a qualified solar installer for system design and installation. They can provide tailored advice based on your specific location, energy needs, and local regulations. `;
  return (
    <div className="w-full  min-h-full flex flex-col">
      {/* banner */}
      <div className="flex flex-col items-center justify-center h-64  bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer rounded-lg  text-background w-full px-5">
        <div className="font-bold text-2xl  w-max text-center">
          <span className="text-white">Welcome To easySolar </span>
          <br />
          <span className="text-white">
            making your solar calculations and estimate easy and fast
          </span>
          <div className="flex gap-3 items-center justify-center  mt-5 ">
            <Input
              className="w-[400px]  text-white text-xl py-1 placeholder:text-white"
              placeholder="...Search"
            />
            <Search className=" text-white " size={35} />
          </div>
        </div>
      </div>
      <Container>
        <div>
          {Content?.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  {item.content.map((item, index) => {
                    return (
                      <div key={index}>
                        <ReactMarkdown>{item}</ReactMarkdown>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>{" "}
      </Container>
    </div>
  );
};

export default page;
