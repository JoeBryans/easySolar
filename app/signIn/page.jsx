"use client";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as FaIcons from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import Container from "@/components/Container";
const schema = yup.object({
  email: yup.string().min(3).required({ message: "Email is required" }),
  password: yup.string().min(10).required({ message: "Password is required" }),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(res);

      // console.log(datas);
      if (!res?.ok) {
        setIsLoading(false);
        toast.error("wrong email or password !");
      } else {
        setIsLoading(false);
        toast.success("user signed in ");
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
  // const Google = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await signIn("google");
  //     console.log(res);
  //     if (!res?.ok) {
  //       setIsLoading(false);
  //       toast.error(res?.message);
  //     } else {
  //       setIsLoading(false);
  //       toast.success("user signed in ");
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error?.message);
  //   }
  // };

  return (
    <div>
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
        <div className=" flex flex-col items-center justify-center w-full h-full ">
          <Card className=" max-w-[500px] w-[90%] h-max">
            <CardContent className=" flex flex-col items-start p-3 mx-auto ">
              <form
                className="max-w-[450px] w-[95%]  block mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <div className="flex w-full  px-3 gap-3 items-center justify-center mb-3 ">
                  <Button
                    type="button"
                    className=" cursor-pointer bg-red-700 text-white  font-semibold  w-max"
                    onClick={Google}
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
                  htmlFor="password"
                  className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                >
                  <span>Password</span>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                  />
                  {errors.password && (
                    <span className="text-rose-500 text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </Label>

                <div className="flex flex-col gap-3 px-3 py-1 w-full mt-2 mb-2">
                  <Button
                    disabled={isLoading && isLoading}
                    variant={"primary"}
                    className="p-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-2 font-semibold transition:all w-full px-3 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span>sign in</span>
                        <LoaderCircle className="animate-spin" />
                      </span>
                    ) : (
                      "sign in"
                    )}
                  </Button>

                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <span>
                      New to Shopbite{" "}
                      <Link
                        href={"/signUp"}
                        className="font-semibold hover:underline text-blue-500"
                      >
                        create account
                      </Link>
                    </span>
                    <Link
                      href={""}
                      className="font-semibold hover:underline text-blue-500"
                    >
                      forgotte password{" "}
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>{" "}
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
