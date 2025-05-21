"use client";
import { useState } from "react";

import PricingSection from "./Plan";

const Pay = () => {
  const [selectPlan, setSelectPlan] = useState([]);
  console.log(selectPlan);

  return (
    <div className="w-max-[500px] w-[90%] p-3 mx-auto  flex  flex-col  gap-5 ">
      <PricingSection selectPlan={selectPlan} setSelectPlan={setSelectPlan} />
    </div>
  );
};

export default Pay;
