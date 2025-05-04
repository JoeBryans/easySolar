"use client";
import Container from "@/components/Container";
import Power from "@/components/dasboard/Power";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

const page = () => {
  const [formData, setFormData] = React.useState("");
  const [contents, setContent] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Datas = JSON.stringify(formData);
      console.log(Datas);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);

      const data = await res.json();
      const json = JSON.parse(data);
      const { content } = json;
      // const estimate=content.replace(/<\/?p>/g, "");

      setContent(json);
      if (res.ok) {
        try {
          const respond = await fetch("/api/estimate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: contents, title }),
          });
          const data = await respond.json();
          // if (respond.ok) {
          //   // router.push("/dashboard");
          // }
          console.log(data);
        } catch (error) {
          console.log(error);
          alert("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full mb-20">
      <Container>
        <div className="w-[40rem] mx-auto mt-5 flex flex-col items-center  gap-5 ">
          <div className="w-full  flex flex-col items-center justify-center">
            <h1 className="text-center my-2 text-xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
              Let's Generate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 ">
                Solar calculations
              </span>
            </h1>
          </div>
          <form className="w-max flex flex-col  gap-5 ">
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Enter your title"
                className="w-full"
                name="title "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="w-full flex items-center gap-2 ">
                The title should be the total power to be generated
              </div>
            </Label>
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Enter your total power"
                className="w-full"
                name="totalPower"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the total power consumption
                {/* or <Power /> to make calculation of various component{" "} */}
              </div>
            </Label>
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Enter your total energy consumption"
                className="w-full"
                name="totalEnergy"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the total power consumption
                {/* or <Power /> to make  calculation of various component{" "} */}
              </div>
            </Label>
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Battery Voltage"
                className="w-full"
                name="batterySize"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the Battery Voltage of your choice
              </div>
            </Label>
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Depth of Discharge of the battery"
                className="w-full"
                name="DOD"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the Depth of Discharge of the battery. lowest 50%
              </div>
            </Label>
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Peak Sun Hours"
                className="w-full"
                name="peakSunHours"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the Peak Sun Hours in your region{" "}
              </div>
            </Label>
            <Label className={"w-full flex flex-col gap-3 "}>
              <Input
                placeholder="Panel Wattage"
                className="w-full"
                name="panelWattage"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the Panel Wattage of your choice
              </div>
            </Label>

            <Button
              variant={"primary"}
              className="w-full text-center cursor-pointer text-white hover:text-muted bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 "
              onClick={handleSubmit}
            >
              Generate
            </Button>
          </form>
          <div className="w-full flex flex-col items-center justify-center">
            {contents?.map((item, index) => {
              return (
                <div key={index}>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
