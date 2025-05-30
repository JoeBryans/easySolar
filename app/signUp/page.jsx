"use client";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as FaIcons from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Container } from "@mui/material";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";

const schema = yup.object({
  name: yup.string().min(3).required({ message: "Name is required" }),
  email: yup.string().min(3).required({ message: "Email is required" }),
  phone: yup.string().min(10).required({ message: "Phone is required" }),
  role: yup.string(),
  password: yup
    .string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least  one number ")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .min(10, "Password must contain at least 10 characters"),
});
// .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//     )

const SignUp = () => {
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccuss, setIsSuccuss] = useState(false);
  const [image, setImage] = useState(null);
  const criterial = [
    { regEx: /.[10]/, message: "Password must contain at least 10 characters" },

    {
      regEx: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      regEx: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    { regEx: /[0-9]/, message: "Password must contain at least one number" },
    {
      regEx: /[@$!%*?&]/,
      message: "Password must contain at least one special character",
    },
  ];
  console.log(image);

  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datas = await res.json();
      if (!res?.ok) {
        toast.error(datas?.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.success("user created successfully");
        setIsSuccuss(true);
        const { id } = datas;
        if (id) {
          router.push(`/verify-email/${id}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Container className=" h-[100vh] flex flex-col  justify-center ">
        <div className="flex flex-col items-center justify-center w-full h-full ">
          <Card className=" max-w-[500px] w-[90%] h-max text-slate-800">
            <CardHeader className="w-full flex items-center justify-center">
              <span className="text-2xl font-semibold">Create Account</span>
            </CardHeader>
            <CardContent className=" flex flex-col items-start p-3 mx-auto ">
              <form
                className=" block mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <div className="flex w-full  px-3 gap-3 items-center justify-center mb-3 ">
                  <Button
                    type="button"
                    className=" bg-red-700 text-white  font-semibold  w-max"
                  >
                    <FaIcons.FaGoogle size={20} />
                    <span className="hidden md:block">Google</span>
                  </Button>
                  <Button
                    type="button"
                    className=" bg-black text-white  font-semibold  w-max"
                  >
                    <FaIcons.FaAmazon size={20} />
                    <span className="hidden md:block">Amazon</span>
                  </Button>
                  <Button
                    type="button"
                    className=" bg-emerald-700 text-white  font-semibold  w-max"
                  >
                    <FaIcons.FaSpotify size={20} />
                    <span className="hidden md:block">Spotify</span>
                  </Button>
                  <Button
                    type="button"
                    className=" bg-black text-white  font-semibold  w-max"
                  >
                    <FaIcons.FaGithub size={20} />
                    <span className="hidden md:block">Github</span>
                  </Button>
                </div> */}
                <Label
                  htmlFor="name"
                  className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                >
                  <span>FullName</span>
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                  />
                  {errors.name && (
                    <span className="text-rose-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </Label>
                <Label
                  htmlFor="email"
                  className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                >
                  <span>Email</span>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                  />
                  {errors.email && (
                    <span className="text-rose-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </Label>
                <Label
                  htmlFor="phone"
                  className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                >
                  <span>Phone</span>
                  <Input
                    id="phone"
                    {...register("phone")}
                    type="text"
                    className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                  />
                  {errors.phone && (
                    <span className="text-rose-500 text-xs">
                      {errors.phone.message}
                    </span>
                  )}
                </Label>

                <Label
                  htmlFor="password"
                  className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                >
                  <span>Password</span>
                  <Input
                    id="password"
                    {...register("password")}
                    type="password"
                    className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                  />
                </Label>

                <div className="flex flex-col gap-3 items-start px-3 py-1 w-full mt-2 mb-2">
                  <Button
                    disabled={isLoading && isLoading}
                    variant={"primary"}
                    className="p-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-2 font-semibold transition:all w-full px-3 cursor-pointer flex items-center gap-2 justify-center"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span>sign up</span>
                        <LoaderCircle className="animate-spin" />
                      </span>
                    ) : (
                      "sign up"
                    )}
                  </Button>
                  <span>
                    Alread have an account with Shopbite ?{" "}
                    <Link
                      href={"/signIn"}
                      className="font-semibold hover:underline text-blue-500"
                    >
                      sign in
                    </Link>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
