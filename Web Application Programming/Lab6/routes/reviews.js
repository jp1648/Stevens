// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { productsData, reviewsData } from "../data/index.js";
import { isValidRating } from "../helpers.js";
import { Router } from "express";
import { ObjectId } from "mongodb";
const router = Router();

// import express from "express";
// const router = express.Router();

router
  .route("/:productId")
  .get(async (req, res) => {
    const prodId = req.params.productId;
    if (!ObjectId.isValid(prodId)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    try {
      const prod = await productsData.get(prodId);
    } catch (error) {
      return res.status(404).json({ error: "Product not found" });
    }

    try {
      const reviews = await reviewsData.getAllReviews(prodId);
    } catch (error) {
      return res.status(404).json({ error: "Reviews not found" });
    }
    try {
      const reviews = await reviewsData.getAllReviews(prodId);
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  })
  .post(async (req, res) => {
    const prodId = req.params.productId;
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    const { title, reviewerName, review, rating } = req.body;

    if (!title || !reviewerName || !review || !rating) {
      return res.status(400).json({ error: "Must provide all args" });
    }

    const strFields = [title, reviewerName, review];
    strFields.forEach((field) => {
      if (typeof field !== "string" || field.trim() === "") {
        return res
          .status(400)
          .json({ error: "All string parameters must be non-empty strings" });
      }
    });

    if (!ObjectId.isValid(prodId)) {
      return res
        .status(400)
        .json({ error: "Invalid object ID. Provide valid id for paramater" });
    }

    if (!isValidRating(rating)) {
      return res.status(400).json({ error: "Invalid rating" });
    }

    try {
      const prod = await productsData.get(prodId);
    } catch (error) {
      return res.status(404).json({ error: "Product not found" });
    }

    try {
      const reviewIn = await reviewsData.createReview(
        prodId,
        title,
        reviewerName,
        review,
        rating
      );
      return res.status(200).json(reviewIn);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    const revId = req.params.reviewId;
    if (!ObjectId.isValid(revId)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    try {
      const rev = await reviewsData.getReview(revId);
    } catch (error) {
      return res.status(404).json({ error: "No reviews found" });
    }
    try {
      const rev = await reviewsData.getReview(revId);
      return res.status(200).json(rev);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  })
  .patch(async (req, res) => {
    const revId = req.params.reviewId;
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    let { title, reviewerName, review, rating } = updateData;
    const hold = {};

    if (!title && !reviewerName && !review && !rating) {
      return res.status(400).json({ error: "NO paramaters provided" });
    }
    if (title) {
      if (typeof title !== "string" || title.trim() === "") {
        return res
          .status(400)
          .json({ error: "All titles parameters must be non-empty strings" });
      }
      title = title.trim();
      hold.title = title;
    }
    if (reviewerName) {
      if (typeof reviewerName !== "string" || reviewerName.trim() === "") {
        return res.status(400).json({
          error: "All reviewernames parameters must be non-empty strings",
        });
      }
      reviewerName = reviewerName.trim();
      hold.reviewerName = reviewerName;
    }
    if (review) {
      if (typeof review !== "string" || review.trim() === "") {
        return res
          .status(400)
          .json({ error: "All reviews parameters must be non-empty strings" });
      }
      review = review.trim();
      hold.review = review;
    }
    if (!ObjectId.isValid(revId)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    if (rating) {
      if (!isValidRating(rating)) {
        return res.status(400).json({ error: "Invalid rating" });
      }
      hold.rating = rating;
    }

    try {
      const rev = await reviewsData.getReview(revId);
    } catch (error) {
      return res.status(404).json({ error: "No reviews found" });
    }
    try {
      const updatedRev = await reviewsData.updateReview(revId, hold);
      return res.status(200).json(updatedRev);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  })
  .delete(async (req, res) => {
    const revId = req.params.reviewId;
    if (!ObjectId.isValid(revId)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    try {
      const prod = await reviewsData.getReview(revId);
    } catch (error) {
      return res.status(404).json({ error: "Product not found" });
    }
    try {
      const deleted = await reviewsData.removeReview(revId);
      return res.status(200).json(deleted);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
export default router;
