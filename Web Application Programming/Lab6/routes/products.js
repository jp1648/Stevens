// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { productsData } from "../data/index.js";
import { Router } from "express";
import { isValidDate } from "../helpers.js";
import { ObjectId } from "mongodb";
const router = Router();

// import express from "express";
// const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const prodList = await productsData.getAll();
      return res.json(prodList);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //make sure there is something present in the req.body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    const {
      productName,
      productDescription,
      modelNumber,
      price,
      manufacturer,
      manufacturerWebsite,
      keywords,
      categories,
      dateReleased,
      discontinued,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !modelNumber ||
      !price ||
      !manufacturer ||
      !manufacturerWebsite ||
      !keywords ||
      !categories ||
      !dateReleased ||
      typeof discontinued === "undefined"
    ) {
      return res.status(400).json({ error: "All fields need to be supplied" });
    }
    if (
      typeof productName !== "string" ||
      productName.trim() === "" ||
      typeof productDescription !== "string" ||
      productDescription.trim() === "" ||
      typeof modelNumber !== "string" ||
      modelNumber.trim() === "" ||
      typeof manufacturer !== "string" ||
      manufacturer.trim() === "" ||
      typeof manufacturerWebsite !== "string" ||
      manufacturerWebsite.trim() === "" ||
      typeof dateReleased !== "string" ||
      dateReleased.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "All string fields need to be nonempty strings" });
    }
    if (
      typeof price !== "number" ||
      isNaN(price) ||
      price <= 0 ||
      !Number.isInteger(price * 100)
    ) {
      return res.status(400).json({ error: "Price is invalid" });
    }

    if (!manufacturerWebsite.match(/^http:\/\/www\..{5,}\.com$/)) {
      return res
        .status(400)
        .json({ error: "Website is not correctly formatted" });
    }

    if (
      !Array.isArray(keywords) ||
      !Array.isArray(categories) ||
      keywords.length === 0 ||
      categories.length === 0 ||
      !keywords.every(
        (keyword) => typeof keyword === "string" && keyword.trim() !== ""
      ) ||
      !categories.every(
        (category) => typeof category === "string" && category.trim() !== ""
      )
    ) {
      return res
        .status(400)
        .json({ error: "Arrays must be valid and of array type" });
    }

    if (!isValidDate(dateReleased)) {
      return res
        .status(400)
        .json({ error: "Date is invalid, provide valid date" });
    }
    if (typeof discontinued !== "boolean") {
      return res
        .status(400)
        .json({ error: "Discontinued field must be a boolean" });
    }
    try {
      const newProd = await productsData.create(
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued
      );
      return res.status(200).json(newProd);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });

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
      const prod = await productsData.get(prodId);
      return res.status(200).json(prod);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  })
  .delete(async (req, res) => {
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
      const deleted = productsData.remove(prodId);
      return res.status(200).json({ _id: prodId, deleted: true });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  })
  .put(async (req, res) => {
    const prodId = req.params.productId;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    if (!ObjectId.isValid(prodId)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }
    const {
      productName,
      productDescription,
      modelNumber,
      price,
      manufacturer,
      manufacturerWebsite,
      keywords,
      categories,
      dateReleased,
      discontinued,
    } = updateData;

    if (
      !productName ||
      !productDescription ||
      !modelNumber ||
      !price ||
      !manufacturer ||
      !manufacturerWebsite ||
      !keywords ||
      !categories ||
      !dateReleased ||
      typeof discontinued === "undefined"
    ) {
      return res.status(400).json({ error: "All fields need to be supplied" });
    }
    if (
      typeof productName !== "string" ||
      productName.trim() === "" ||
      typeof productDescription !== "string" ||
      productDescription.trim() === "" ||
      typeof modelNumber !== "string" ||
      modelNumber.trim() === "" ||
      typeof manufacturer !== "string" ||
      manufacturer.trim() === "" ||
      typeof manufacturerWebsite !== "string" ||
      manufacturerWebsite.trim() === "" ||
      typeof dateReleased !== "string" ||
      dateReleased.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "All string fields need to be nonempty strings" });
    }
    if (
      typeof price !== "number" ||
      isNaN(price) ||
      price <= 0 ||
      !Number.isInteger(price * 100)
    ) {
      return res.status(400).json({ error: "Price is invalid" });
    }
    if (!manufacturerWebsite.match(/^http:\/\/www\..{5,}\.com$/)) {
      return res
        .status(400)
        .json({ error: "Website is not correctly formatted" });
    }
    if (
      !Array.isArray(keywords) ||
      !Array.isArray(categories) ||
      keywords.length === 0 ||
      categories.length === 0 ||
      !keywords.every(
        (keyword) => typeof keyword === "string" && keyword.trim() !== ""
      ) ||
      !categories.every(
        (category) => typeof category === "string" && category.trim() !== ""
      )
    ) {
      return res
        .status(400)
        .json({ error: "Arrays must be valid and of array type" });
    }

    if (!isValidDate(dateReleased)) {
      return res
        .status(400)
        .json({ error: "Date is invalid, provide valid date" });
    }
    if (typeof discontinued !== "boolean") {
      return res
        .status(400)
        .json({ error: "Discontinued field must be a boolean" });
    }

    try {
      const prod = await productsData.get(prodId);
    } catch (error) {
      return res.status(404).json({ error: "Product not found" });
    }
    try {
      const updatedProd = await productsData.update(
        prodId,
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued
      );
      return res.status(200).json(updatedProd);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
