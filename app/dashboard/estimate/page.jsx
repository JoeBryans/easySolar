"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (UserCredit === 0) {
      alert("Credit not enough, please add credit");
      return router.push("/payment");
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
  console.log(contents);

  return (
    <div className="w-full mb-20 ">
      <div className="w-full min-h-[100vh] flex flex-wrap-reverse mx-auto justify-start items-start gap-5 px-4 ">
        <div className="w-[40rem]  mx-auto mt-5 flex flex-col items-start  gap-5 ">
          <div className="w-full  flex flex-col items-center justify-center">
            <h1 className="text-center my-2 text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
              Let's Generate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 ">
                Solar calculations
              </span>
            </h1>
          </div>
          <form className="max-w-full w-[95%] p-4 shadow-xl rounded-2xl drop-shadow-xl flex  flex-col  gap-5 ">
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
                enter the total energy consumption
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
                placeholder="eg 1hr, 3hr or 3hr*3days"
                className="w-full"
                name="autonomy"
                onChange={handleChange}
              />
              <div className="w-full flex items-center gap-2 ">
                enter the days of autonomy
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
        </div>{" "}
        <div
          className={`${contents.length > 0 ? "shadow-lg drop-shadow-2xl px-5" : "flex"}  py-3 rounded-2xl my-24 mx-auto max-w-[600px] w-[95%] flex flex-col items-start justify-center`}
        >
          {contents?.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[90%] flex flex-col items-start justify-start gap-4"
              >
                {/* <ReactMarkdown>{item.content}</ReactMarkdown> */}
                {/* <h1>{item.title}</h1> */}
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold ">Battery :</h1>
                  <span>{item.battery}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold ">Panel :</h1>
                  <span>{item.panel}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold ">Inverter :</h1>
                  <span>{item.inverter}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold ">Charge Controller :</h1>
                  <span>{item.charge}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold ">Total :</h1>
                  <span>{item.total}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold ">Estimate :</h1>
                  <span>{item.estimate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
