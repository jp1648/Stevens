// This data file should export all functions using the ES6 standard as shown in the lecture code
import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { isValidRating } from "../helpers.js";
import moment from "moment";

const exportedMethods = {
  async createReview(productId, title, reviewerName, review, rating) {
    if (!productId || !title || !reviewerName || !review || !rating)
      throw "All fields need to be supplied";

    const strFields = [productId, title, reviewerName, review];

    strFields.forEach((field) => {
      if (typeof field !== "string" || field.trim() === "") {
        throw "All string parameters must be non-empty strings";
      }
    });

    productId = productId.trim();
    title = title.trim();
    reviewerName = reviewerName.trim();
    review = review.trim();

    if (!ObjectId.isValid(productId))
      throw "Invalid object ID. Provide valid id for paramater";

    const productCollection = await products();
    productId = new ObjectId(productId);

    const prod = await productCollection.findOne({ _id: productId });
    if (!prod) throw "No product with that id";

    if (!isValidRating(rating)) throw "Rating must be a valid value";

    const newReview = {
      _id: new ObjectId(),
      title: title,
      reviewDate: moment().format("MM/DD/YYYY"),
      reviewerName: reviewerName,
      review: review,
      rating: rating,
    };

    let newRating;

    if (prod.reviews.length > 0) {
      const reviewLength = prod.reviews.length;
      newRating =
        (prod.averageRating * reviewLength + rating) / (reviewLength + 1);
    } else {
      newRating = rating;
    }
    const returnProd = await productCollection.findOneAndUpdate(
      { _id: productId },
      {
        $push: { reviews: newReview },
        $set: { averageRating: newRating },
      },
      { returnDocument: "after" }
    );
    return returnProd;
  },

  async getAllReviews(productId) {
    if (!productId) throw "ProductID needs to be supplied";

    if (typeof productId !== "string" || productId.trim() === "")
      throw "ProductID must be nonempty string";

    if (!ObjectId.isValid(productId))
      throw "Invalid object ID. Provide valid id for paramater";

    const productCollection = await products();
    productId = productId.trim();
    productId = new ObjectId(productId);

    const prod = await productCollection.findOne({ _id: productId });
    if (!prod) throw "No product with that id";

    if (prod.reviews.length < 1) {
      throw "No products found";
    } else return prod.reviews;
  },

  async getReview(reviewId) {
    if (!reviewId) throw "reviewId needs to be supplied";

    if (typeof reviewId !== "string" || reviewId.trim() === "")
      throw "reviewId must be nonempty string";

    if (!ObjectId.isValid(reviewId))
      throw "Invalid object ID. Provide valid id for paramater";

    const productCollection = await products();
    reviewId = reviewId.trim();
    reviewId = new ObjectId(reviewId);

    const rev = await productCollection.findOne({ "reviews._id": reviewId });
    if (!rev) throw "No review with that id";

    const review = await productCollection.findOne(
      { "reviews._id": reviewId },
      { projection: { _id: 0, "reviews.$": 1 } }
    );

    return review.reviews[0];
  },

  async updateReview(reviewId, updateObject) {
    if (!reviewId) throw "reviewId needs to be supplied";
    if (typeof reviewId !== "string" || reviewId.trim() === "")
      throw "reviewId must be nonempty string";
    if (!ObjectId.isValid(reviewId))
      throw "Invalid object ID. Provide valid id for paramater";

    const productCollection = await products();
    reviewId = reviewId.trim();
    reviewId = new ObjectId(reviewId);

    let prod = await productCollection.findOne({ "reviews._id": reviewId });
    if (!prod) throw "No review with that id";

    const oldReview = prod.reviews.find((review) =>
      review._id.equals(reviewId)
    );

    const oldRating = oldReview.rating;

    if (updateObject.title) {
      if (
        typeof updateObject.title !== "string" ||
        updateObject.title.trim() === ""
      ) {
        throw "Updated object title must be a nonempty string";
      }

      prod = await productCollection.findOneAndUpdate(
        { _id: prod._id, "reviews._id": reviewId },
        {
          $set: { "reviews.$.title": updateObject.title.trim() },
        },
        { returnDocument: "after" }
      );
    }

    if (updateObject.reviewerName) {
      if (
        typeof updateObject.reviewerName !== "string" ||
        updateObject.reviewerName.trim() === ""
      ) {
        throw "Updated object reviewer name must be a nonempty string";
      }

      prod = await productCollection.findOneAndUpdate(
        { _id: prod._id, "reviews._id": reviewId },
        {
          $set: { "reviews.$.reviewerName": updateObject.reviewerName.trim() },
        },
        { returnDocument: "after" }
      );
    }

    if (updateObject.review) {
      if (
        typeof updateObject.review !== "string" ||
        updateObject.review.trim() === ""
      ) {
        throw "Updated review must be a nonempty string";
      }

      prod = await productCollection.findOneAndUpdate(
        { _id: prod._id, "reviews._id": reviewId },
        {
          $set: { "reviews.$.review": updateObject.review.trim() },
        },
        { returnDocument: "after" }
      );
    }

    let newAvgRating = oldRating;

    if (updateObject.rating) {
      if (!isValidRating(updateObject.rating)) {
        throw "Rating must be a valid value";
      }

      prod = await productCollection.findOneAndUpdate(
        { _id: prod._id, "reviews._id": reviewId },
        {
          $set: { "reviews.$.rating": updateObject.rating },
        },
        { returnDocument: "after" }
      );

      if (prod.reviews.length > 0) {
        const reviewLength = prod.reviews.length;
        newAvgRating =
          (prod.averageRating * reviewLength -
            oldRating +
            updateObject.rating) /
          reviewLength;
      } else {
        newAvgRating = updateObject.rating;
      }
    }

    prod = await productCollection.findOneAndUpdate(
      { _id: prod._id, "reviews._id": reviewId },
      {
        $set: { "reviews.$.reviewDate": moment().format("MM/DD/YYYY") },
      },
      { returnDocument: "after" }
    );

    prod = await productCollection.findOneAndUpdate(
      { _id: prod._id },
      {
        $set: { averageRating: newAvgRating },
      },
      { returnDocument: "after" }
    );

    return prod;
  },

  async removeReview(reviewId) {
    if (!reviewId) throw "reviewId needs to be supplied";

    if (typeof reviewId !== "string" || reviewId.trim() === "")
      throw "reviewId must be nonempty string";

    if (!ObjectId.isValid(reviewId))
      throw "Invalid object ID. Provide valid id for paramater";

    const productCollection = await products();
    reviewId = reviewId.trim();
    reviewId = new ObjectId(reviewId);

    let prod = await productCollection.findOne({ "reviews._id": reviewId });
    if (!prod) throw "No review with that id";
    const oldReview = prod.reviews.find((review) =>
      review._id.equals(reviewId)
    );
    const oldRating = oldReview.rating;

    prod = await productCollection.findOneAndUpdate(
      { _id: prod._id },
      { $pull: { reviews: { _id: reviewId } } },
      { returnDocument: "after" }
    );

    const reviewLength = prod.reviews.length;
    let newAvgRating;

    if (reviewLength > 0) {
      newAvgRating =
        (prod.averageRating * reviewLength - oldRating) / (reviewLength - 1);
    } else {
      newAvgRating = 0;
    }

    prod = await productCollection.findOneAndUpdate(
      { _id: prod._id },
      { $set: { averageRating: newAvgRating } },
      { returnDocument: "after" }
    );

    return prod;
  },
};

export default exportedMethods;
