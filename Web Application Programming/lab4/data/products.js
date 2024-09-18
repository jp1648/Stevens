// TODO: Export and implement the following functions in ES6 format

import { isValidDate } from "../helpers.js";
import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

export const create = async (
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
) => {
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
  };

  const insertInfo = await productCollection.insertOne(newProd);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add product";

  const prod = await productCollection.findOne({ _id: insertInfo.insertedId });
  prod._id = prod._id.toString();
  return prod;
};

export const getAll = async () => {
  const productCollection = await products();
  let prodList = await productCollection.find({}).toArray();
  prodList.forEach((prod) => {
    prod._id = prod._id.toString();
  });
  if (prodList.length === 0) {
    return [];
  }
  return prodList;
};

export const get = async (id) => {
  if (!id) throw "ID parameter must be provided";

  if (typeof id !== "string" || id.trim() === "")
    throw "ID paramater must be of string type and must not be an empty string";

  id = id.trim();

  if (!ObjectId.isValid(id))
    throw "Invalid object ID. Provide valid id for paramater";

  id = new ObjectId(id);

  const productCollection = await products();
  const prod = await productCollection.findOne({ _id: id });
  if (!prod) throw "No product with that id";
  prod._id = prod._id.toString();
  return prod;
};

export const remove = async (id) => {
  if (!id) throw "ID parameter must be provided";

  if (typeof id !== "string" || id.trim() === "")
    throw "ID paramater must be of string type and must not be an empty string";

  id = id.trim();

  if (!ObjectId.isValid(id))
    throw "Invalid object ID. Provide valid id for paramater";

  id = new ObjectId(id);

  const productCollection = await products();
  const prod = await productCollection.findOneAndDelete({ _id: id });
  if (!prod) throw "No product with that id, cannot remove";
  return `${prod.productName} has been successfully deleted!`;
};

export const rename = async (id, newProductName) => {
  if (!id) throw "ID parameter must be provided";
  if (typeof id !== "string" || id.trim() === "")
    throw "ID paramater must be of string type and must not be an empty string";

  id = id.trim();

  if (!ObjectId.isValid(id))
    throw "Invalid object ID. Provide valid id for paramater";

  if (!newProductName) throw "New Product Name parameter must be provided";

  if (typeof newProductName !== "string" || newProductName.trim() === "")
    throw "New Product Name paramater must be of string type and must not be an empty string";

  newProductName = newProductName.trim();

  id = new ObjectId(id);

  const productCollection = await products();

  const prod = await productCollection.findOne({ _id: id });
  if (!prod) throw "No product with that id";

  if (prod.productName === newProductName)
    throw "New product name is the same as the current product name";

  const updatedProduct = await productCollection.findOneAndUpdate(
    { _id: id },
    { $set: { productName: newProductName } },
    { returnDocument: "after" }
  );

  if (!updatedProduct) {
    throw "Could not update product successfully";
  }

  updatedProduct._id = updatedProduct._id.toString();
  return updatedProduct;
};
