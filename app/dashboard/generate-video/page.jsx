"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
const Topic = [
  "kids story",
  "animals story",
  "nature story",
  "tech breakthrough",
  "Ai innovation",
  "horror story",
  "space mystery",
  "true crime",
  "science experiment",
  "history ",
  "adventure",
  "romance",
  "fantasy",
  "mystery",
  "thriller",
  "drama",
  "action",
  "crime",
  "motivational story",
  "family story",
  "children",
];
const VoiceOption = [
  {
    name: "Achird",
    option: "en-US-Chirp3-HD-Achird",
  },
  {
    name: "Aoede",
    option: "en-US-Chirp3-HD-Aoede",
  },
  {
    name: "Charon",
    option: "en-US-Chirp3-HD-Charon",
  },
  {
    name: "Despina",
    option: "en-US-Chirp3-HD-Despina",
  },
  {
    name: "Erinome",
    option: "en-US-Chirp3-HD-Erinome",
  },
  {
    name: "Aoede",
    option: "en-US-Chirp3-HD-Aoede",
  },
  {
    name: "Fenrir",
    option: "en-US-Chirp3-HD-Fenrir",
  },
  {
    name: "Laomedeia",
    option: "en-US-Chirp3-HD-Laomedeia",
  },
];
const ImageOption = [
  {
    name: "Realistic",
    value: "realistic",
    path: "/realistic.jpeg",
  },
  {
    name: "Cinematic",
    value: "cinematic",
    path: "/cinematic.jpeg",
  },
  {
    name: "One shot",
    value: "one-shot",
    path: "/one-shot.jpeg",
  },
  {
    name: "Slow motion",
    value: "slow motion",
    path: "/slowmotion.jpeg",
  },
  {
    name: "Stylized",
    value: "stylized",
    path: "/stylized.jpeg",
  },
  {
    name: "Catton",
    value: "3D",
    path: "/catton.jpeg",
  },
  {
    name: "claymation",
    value: "claymation",
    path: "/claymation.jpeg",
  },
  {
    name: "Pixelation",
    value: "pixelation",
    path: "/pixelation.jpeg",
  },
];
const Caption = [
  {
    text: "YOUTUBE",
    style: `bg-red-600 hover:bg-red-500`,
    option: "youtube",
  },
  {
    text: "FACEBOOK",
    style: `bg-blue-600 hover:bg-blue-500`,
    option: "facebook",
  },
  {
    text: "TIKTALK",
    style: `bg-black`,
    option: "tiktalk",
  },
  {
    text: "INSTAGRAM",
    style: `bg-rose-600 hover:bg-rose-500`,
    option: "instagram",
  },
  // {
  //   text: "",
  //   style: `bg-rose-600`,
  //   option: "youtube",
  // },
];

// write a three different script of 30 seconds video on Topic:kids, remove the scen start and end, give me response in json format and follow the schema:{scripts{{content:""},},}

const page = () => {
  const [script, setScript] = useState("");
  const [videoStyle, setVideoStyle] = useState("");
  const [image, setImage] = useState("");
  const [topic, setTopic] = useState("");
  const [voice, setVoice] = useState("");
  console.log("voice", voice);
  console.log("script", script);
  console.log("videoStyle", videoStyle);

  // const [selectTopic, setSelectTopic] = useState(false);
  const [selectScript, setSelectScript] = useState(null);
  const [formData, setFormData] = useState({
    topic: "",
  });
  console.log("selectScript", selectScript);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState([]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });
      const data = await response.json();
      // setResponse(data);
      setResponse(JSON.parse(data));
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleVoice = async (option) => {
    setVoice(option);
    const res = await fetch("/api/textToSpeach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voice: option,
        script: script,
      }),
    });
    const data = await res.json();
    console.log("data", data);
  };
  // const res1 = res[1];
  console.log("topic", topic);

  return (
    <div className="w-full mb-20">
      <Container>
        <div className="w-full flex gap-10 items-center mx-auto mt-5 ">
          <div className="w-[50rem] mx-auto mt-5 flex flex-col gap-5 ">
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-center my-2 text-xl sm:text-3xl lg:text-5xl font-bold flex items-center gap-2">
                Let's Generate Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 ">
                  AI Video
                </span>
              </h1>
              <h2 className="text-center my-2 text-bold text-2xl">
                first craft your script video or video ideals
              </h2>
            </div>
            <form className="w-full flex flex-col gap-5 ">
              <Input placeholder="Enter your video title" className="w-full" />

              {/* <Input placeholder="Enter your video tags" className="w-full" /> */}
              {/* slect video type */}
              <div className="">
                <Tabs defaultValue="suggestion" className="w-full">
                  <span>
                    Select your video topic from the list or enter your own{" "}
                  </span>
                  <TabsList className="flex items-center gap-5">
                    <TabsTrigger value="suggestion" className="cursor-pointer">
                      Suggestion
                    </TabsTrigger>
                    <TabsTrigger value="topic" className="cursor-pointer">
                      Topic
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="suggestion">
                    <div className="w-full flex flex-wrap items-center gap-5">
                      {Topic.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 ">
                          <Button
                            variant={"outline"}
                            // disabled={selectTopic === item}
                            className={`${
                              item === topic
                                ? "cursor-pointer border-2 bg-gray-200 "
                                : "cursor-pointer"
                            }`}
                            type="button"
                            onClick={() => {
                              setTopic(item);
                            }}
                          >
                            {item}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="topic">
                    <Input
                      placeholder="Enter   your video topic"
                      className="w-full"
                      name="topic"
                      value=""
                      // onChange={(e) => setTopic(e.target.value)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              {/* <div className="grid grid-cols-2 gap-5">{response && response}</div> */}
              <div className={`${"grid grid-cols-2 gap-5"}`}>
                {response.map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      selectScript === i
                        ? "bg-gray-200 border-2"
                        : " bg-background"
                    }"flex items-center gap-2 cursor-pointer  "`}
                    onClick={() => {
                      setSelectScript(i);
                      setScript(item.content);
                    }}
                  >
                    <div className="w-full h-36 p-3 rounded-lg border-2 overflow-y-auto">
                      <ReactMarkdown>{item.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
              {response.length === 0 ? (
                <Button
                  className={`${
                    selectScript
                      ? "hidden"
                      : "w-max flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer  "
                  }`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <span>Generate Script</span>
                  {loading ? (
                    <LoaderCircleIcon
                      size={30}
                      color="white"
                      className="animate-spin"
                    />
                  ) : null}
                </Button>
              ) : null}

              {/* <LoaderCircleIcon /> */}

              {/* <div
             
              className="w-mx  px-2 bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer rounded-lg py-2 border-2"
            >
              <Button className="bg-gradient-to-r from-blue-500 to-purple-400 via-purple-600 text-xl font-bold cursor-pointer  ">
                <Link href="/dashboard">Generator Ai Video</Link>
              </Button>
            </div> */}
            </form>
            {/* Images */}
            <div className="mt-8 w-full border-2 p-3 rounded-lg">
              <span className="text-center">
                Select the type of vidoe style you are to make
              </span>

              <div className="w-full relative flex flex-wrap   gap-5 items-center mt-5 ">
                {ImageOption.map((option, i) => (
                  <div
                    key={i}
                    className={`${
                      option.value === videoStyle
                        ? "border-5 border-gray-500 rounded-2xl"
                        : "border-0"
                    }relative w-36 md:w-44 lg:w-52 cursor-pointer`}
                  >
                    <div className="w-full relative ">
                      <Image
                        src={option.path}
                        alt="photo"
                        width={500}
                        height={500}
                        className="w-[100%] h-44 md:h-60 object-cover"
                        onClick={() => {
                          setVideoStyle(option.value);
                          setImage(option.path);
                        }}
                      />{" "}
                      <span className="font-bold text-xl text-white absolute bottom-2 left-5">
                        {option.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* voice type */}
            <div className="mt-5 relative">
              <span className="">Select the audio sound of your choice</span>

              <div className="grid grid-cols-4 mt-4 gap-5">
                {VoiceOption.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 ">
                    <Button
                      variant={"outline"}
                      // disabled={selectTopic === item}
                      className={`${
                        item.option === voice
                          ? "cursor-pointer border-2 bg-gray-200 "
                          : "cursor-pointer"
                      }`}
                      type="button"
                      onClick={() => handleVoice(item.option)}
                    >
                      {item.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            {/* Caption */}
            <div className="relative mt-5">
              <span className="">Select the Caption of your choice</span>

              <div className="w-full flex items-center gap-4 mt-5">
                {Caption.map((item, i) => (
                  <Button key={i} className={`${item.style} cursor-pointer`}>
                    {item.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className=" relative flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">Preview of options </h2>
            <div className="relative border-4 rounded-lg w-70 h-96 overflow-hidden mt-4">
              {image ? (
                <Image
                  src={image}
                  alt="video"
                  height={500}
                  width={500}
                  className="w-[100%] h-96 object-cover"
                />
              ) : null}{" "}
            </div>{" "}
            <span className="absolute bottom-4 capitalize z-30 text-white font-semibold text-xl">
              {videoStyle}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
