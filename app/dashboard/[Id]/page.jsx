import ProjectCard from "@/components/projects/ProjectCard";
import React from "react";

const page = async ({ params }) => {
  const param = await params;
  const projecyId = param.Id;
  return (
    <div className="w-full  min-h-full flex flex-col">
      <h1 className="text-xl font-bold text-zinc-800">
        Project No: {projecyId}
      </h1>
      <div className="w-full mx-auto min-h-[100vh] flex flex-col">
        <ProjectCard projectId={projecyId} />
      </div>
    </div>
  );
};

export default page;
