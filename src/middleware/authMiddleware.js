// authMiddleware.js
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
  
  const isOwner = async (req, res, next) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const userId = req.user.id;
  
    if (projectId) {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });
  
      if (!project || project.userId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
    }
  
    if (taskId) {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
  
      if (!task || task.userId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }
    }
  
    next();
  };
  
  module.exports = { isAdmin, isOwner };