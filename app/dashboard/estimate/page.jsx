"use client";
import Container from "@/components/Container";
// import Power from "@/components/dasboard/Power";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { DialogCloseButton } from "@/components/dasboard/SubCard";
const page = () => {
  const [formData, setFormData] = React.useState("");
  const [contents, setContent] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const UserCredit = useSelector((state) => state.user.credit);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const Datas = JSON.stringify(formData);
  //     const res = await axios.post("/api/generate", {
  //       ...Datas,
  //     });
  //     console.log(res.data);

  //     // const data = await res.json();
  //     // const json = JSON.parse(data);
  //     // const estimate=content.replace(/<\/?p>/g, "");

  //     // setContent(json);
  //     // if (res.status === 200) {
  //     //   try {
  //     //     const respond = await fetch("/api/estimate", {
  //     //       method: "POST",
  //     //       headers: {
  //     //         "Content-Type": "application/json",
  //     //       },
  //     //       body: JSON.stringify({ content: contents, title }),
  //     //     });
  //     //     const data = await respond.json();

  //     //     console.log(data);
  //     //     setLoading(false);
  //     //   } catch (error) {
  //     //     console.log(error);
  //     //     setLoading(false);

  //     //     alert("Something went wrong");
  //     //   }
  //     // }
  //   } catch (error) {
  //     setLoading(false);

  //     console.log(error);
  //     alert("Something went wrong");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (UserCredit === 0) {
      // alert("Credit not enough, please add credit");
      // return router.push("/dashboard");
      return <DialogCloseButton />;
    }
    setLoading(true);
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
      // const estimate=content.replace(/<\/?p>/g, "");

      setContent(data);
      if (res.ok) {
        try {
          const respond = await fetch("/api/estimate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: data, title }),
          });
          const res = await respond.json();
          // if (respond.ok) {
          //   // router.push("/dashboard");
          // }
          console.log(res);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);

          alert("Something went wrong");
        }
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
          <form className="max-w-[500px] w-[95%] p-4 shadow-xl rounded-2xl drop-shadow-xl flex  flex-col  gap-5 ">
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
                placeholder="Enter your inverter input voltage"
                className="w-full"
                name="inverterInput"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the inverter input voltage
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
              disabled={loading}
              className="w-full text-center cursor-pointer text-white hover:text-muted bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 "
              onClick={handleSubmit}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  Generate <LoaderCircle className="animate-spin " />
                </span>
              ) : (
                <span>Generate</span>
              )}
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
