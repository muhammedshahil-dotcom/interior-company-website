import express from "express";
import Review from "../models/Review.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }).lean();
  res.json(reviews);
});

router.post("/", authRequired, async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required." });
  }
  const cappedRating = Math.max(1, Math.min(5, Number(rating)));
  const review = await Review.create({
    userId: req.user.id,
    name: req.user.name,
    rating: cappedRating,
    comment,
  });
  res.status(201).json(review);
});

export default router;
