// This data file should export all functions using the ES6 standard as shown in the lecture code

import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { isValidDate } from "../helpers.js";

const exportedMethods = {
  async create(
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
  ) {
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
    )
      throw new Error("All fields need to be supplied");

    productName = productName.trim();
    productDescription = productDescription.trim();
    modelNumber = modelNumber.trim();
    manufacturer = manufacturer.trim();
    manufacturerWebsite = manufacturerWebsite.trim();
    dateReleased = dateReleased.trim();

    const strFields = [
      productName,
      productDescription,
      modelNumber,
      manufacturer,
      manufacturerWebsite,
      dateReleased,
    ];

    strFields.forEach((field) => {
      if (typeof field !== "string" || field === "") {
        throw "All string parameters must be non-empty strings";
      }
    });

    if (
      typeof price !== "number" ||
      isNaN(price) ||
      price <= 0 ||
      !Number.isInteger(price * 100)
    )
      throw "Price must be a number and must be greater than 0 with 2 decimal points";

    if (!manufacturerWebsite.match(/^http:\/\/www\..{5,}\.com$/))
      throw "Manufacturer website paramater format needs to be in proper form";

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
    )
      throw "Both the keywords and categories paramaters must be non-empty arrays and must have at least one valid string elements in each of them";

    if (!isValidDate(dateReleased))
      throw "Date Released parameter must be a valid date and must be in mm/dd/yyyy format";

    if (typeof discontinued !== "boolean")
      throw "Discontinued parameter must be a boolean value";

    const reviews = [];
    const averageRating = 0;

    const productCollection = await products();
    const newProd = {
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
      reviews,
      averageRating,
    };

    const insertInfo = await productCollection.insertOne(newProd);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add product";

    const prod = await productCollection.findOne({
      _id: insertInfo.insertedId,
    });
    return prod;
  },

  async getAll() {
    const productCollection = await products();
    let prodList = await productCollection
      .find({}, { projection: { productName: 1 } })
      .toArray();
    if (prodList.length === 0) {
      return [];
    }
    return prodList;
  },

  async get(productId) {
    if (!productId) throw "ID parameter must be provided";

    if (typeof productId !== "string" || productId.trim() === "")
      throw "ID paramater must be of string type and must not be an empty string";

    productId = productId.trim();

    if (!ObjectId.isValid(productId))
      throw "Invalid object ID. Provide valid id for paramater";

    productId = new ObjectId(productId);

    const productCollection = await products();
    const prod = await productCollection.findOne({ _id: productId });
    if (!prod) throw "No product with that id";
    return prod;
  },

  async remove(productId) {
    if (!productId) throw "ID parameter must be provided";

    if (typeof productId !== "string" || productId.trim() === "")
      throw "ID paramater must be of string type and must not be an empty string";

    productId = productId.trim();

    if (!ObjectId.isValid(productId))
      throw "Invalid object ID. Provide valid id for paramater";

    productId = new ObjectId(productId);

    const productCollection = await products();
    const prod = await productCollection.findOneAndDelete({ _id: productId });
    if (!prod) throw "No product with that id, cannot remove";
    // return `${prod.productName} has been successfully deleted!`;
  },

  async update(
    productId,
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
  ) {
    if (
      !productId ||
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
    )
      throw new Error("All fields need to be supplied");

    productId = productId.trim();
    productName = productName.trim();
    productDescription = productDescription.trim();
    modelNumber = modelNumber.trim();
    manufacturer = manufacturer.trim();
    manufacturerWebsite = manufacturerWebsite.trim();
    dateReleased = dateReleased.trim();

    const strFields = [
      productId,
      productName,
      productDescription,
      modelNumber,
      manufacturer,
      manufacturerWebsite,
      dateReleased,
    ];

    strFields.forEach((field) => {
      if (typeof field !== "string" || field === "") {
        throw "All string parameters must be non-empty strings";
      }
    });

    if (!ObjectId.isValid(productId))
      throw "Invalid object ID. Provide valid id for paramater";

    if (
      typeof price !== "number" ||
      isNaN(price) ||
      price <= 0 ||
      !Number.isInteger(price * 100)
    )
      throw "Price must be a number and must be greater than 0 with 2 decimal points";

    if (!manufacturerWebsite.match(/^http:\/\/www\..{5,}\.com$/))
      throw "Manufacturer website paramater format needs to be in proper form";

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
    )
      throw "Both the keywords and categories paramaters must be non-empty arrays and must have at least one valid string elements in each of them";

    if (!isValidDate(dateReleased))
      throw "Date Released parameter must be a valid date and must be in mm/dd/yyyy format";

    if (typeof discontinued !== "boolean")
      throw "Discontinued parameter must be a boolean value";

    productId = new ObjectId(productId);

    const productCollection = await products();
    const updatedProduct = await productCollection.findOneAndUpdate(
      { _id: productId },
      {
        $set: {
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
        },
      },
      { returnDocument: "after" }
    );
    return updatedProduct;
  },
};

export default exportedMethods;
