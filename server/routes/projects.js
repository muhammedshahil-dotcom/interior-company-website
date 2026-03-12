import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  const filter = category
    ? { category: { $regex: `^${category}$`, $options: "i" } }
    : {};
  const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();
  res.json(projects);
});

export default router;
