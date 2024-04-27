// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import { ObjectId } from "mongodb";

export let isValidDate = (dateString) => {
  const [month, day, year] = dateString.split("/").map(Number);

  if (
    year < 100 ||
    year > 2024 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false;
  }

  const currentDate = new Date();
  const date = new Date(year, month - 1, day);

  if (date > currentDate) {
    return false; // Date is in the future -- fix from lab 4
  }

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const isValidRating = (rating) => {
  if (typeof rating !== "number" || isNaN(rating)) {
    return false;
  }

  if (rating < 1 || rating > 5) {
    return false;
  }

  if (!Number.isInteger(rating * 10)) {
    return false;
  }

  return true;
};
