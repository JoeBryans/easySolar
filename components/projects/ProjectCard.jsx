import { Action } from "@/request/action";
import React from "react";

const ProjectCard = async ({ projectId }) => {
  const item = await Action.getProjects({ projectId });
  return (
    <div
      className={`shadow-lg drop-shadow-2xl px-5  py-3 rounded-2xl my-24 mx-auto max-w-[600px] w-[95%] min-h-[100vh] flex flex-col items-start justify-center`}
    >
      <div className="w-[90%] flex flex-col items-start justify-start gap-4">
        <div className="text-zinc-800 flex flex-col gap-4">
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
    </div>
  );
};

export default ProjectCard;
