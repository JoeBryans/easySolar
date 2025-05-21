"use client";
import Container from "@/components/Container";
import SelectedItem from "@/components/subscription/SelectedPlan";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const Selected = useSelector((state) => state.user.plan);
  useEffect(() => {
    if (Selected === null) {
      router.push("/plan");
    }
  }, [Selected]);
  return (
    <div className="w-full  min-h-full flex flex-col relative">
      <Container>
        <div className="w-full  min-h-full flex flex-col justify-center items-center">
          <div>
            {/* <Pay /> */}
            {Selected === null ? (
              <div className="w-full fixed top-0 left-0 h-[100vh] bg-black opacity-70 flex flex-col justify-center items-center">
                <span className="text-white text-2xl font-bold flex items-center gap-2">
                  Loading
                  <span className="animate-spin">
                    <LoaderCircleIcon />
                  </span>
                </span>
              </div>
            ) : (
              <SelectedItem />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
