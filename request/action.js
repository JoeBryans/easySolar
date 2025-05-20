import prisma from "@/lib/db";

export const Action = {
  getProjects: async ({ projectId }) => {
    try {
      const project = await prisma.estimates.findUnique({
        where: {
          id: projectId,
        },
        select: {
          id: true,
          title: true,
          userId: true,
          estimate: true,
          battery: true,
          panel: true,
          inverter: true,
          charge: true,
          total: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return project;
    } catch (error) {
      console.log(error);
    }
  },
};
