//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import { getBooks } from "./helpers.js";

export const getBookById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("ID parameter must be provided and must be of string type");
  }
  id = id.trim();
  if (id === "") {
    throw new Error("ID parameter cannot be an empty string. Provide id");
  }
  const booksArray = await getBooks();

  const book = booksArray.find((book) => book.id === id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

export const booksByPageCount = async (min, max) => {
  if (!min & (min !== 0) || !max) {
    throw new Error("Both parameters, min and max, must be inputted");
  }
  if (
    typeof min !== "number" ||
    isNaN(min) ||
    typeof max !== "number" ||
    isNaN(max)
  ) {
    throw new Error("Both parameters, min and max, must be a number");
  }
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < 0) {
    throw new Error(
      "Both parameters, min and max, must be a number and must be a positive whole number"
    );
  }

  if (min > max) {
    throw new Error("Max parameter must be larger than min parameter");
  }

  if (max === 0) {
    throw new Error("Max parameter must be greater than 0");
  }

  const booksArray = await getBooks();
  const bookIDs = [];
  booksArray.forEach((book) => {
    if (book.pageCount <= max && book.pageCount >= min) {
      bookIDs.push(book.id);
    }
  });
  return bookIDs;
};

export const sameYear = async (year) => {
  if (!year) {
    throw new Error("Year parameter must be included");
  }
  if (!Number.isInteger(year) || year <= 0) {
    throw new Error(
      "Year parameter must be of number type and a positive whole number"
    );
  }

  if (year <= 1435 || year > 2024) {
    //instructions in spec not clear --- used creation of printing press as min bounds
    throw new Error("Year parameter must be a valid year");
  }
  year = year.toString();
  const booksArray = await getBooks();
  const objsYear = [];
  booksArray.forEach((book) => {
    let bookYear = book.publicationDate.split("/")[2];
    if (bookYear === year) {
      objsYear.push(book);
    }
  });
  return objsYear;
};

export const minMaxPrice = async () => {
  let min = Infinity;
  let max = -Infinity;
  let cheapIDs = [];
  let expensiveIDs = [];
  const booksArray = await getBooks();
  booksArray.forEach((book) => {
    if (book.price < min) {
      min = book.price;
      cheapIDs = [book.id];
    } else if (book.price === min) {
      cheapIDs.push(book.id);
    }
    if (book.price > max) {
      max = book.price;
      expensiveIDs = [book.id];
    } else if (book.price === max) {
      expensiveIDs.push(book.id);
    }
  });
  const res = { cheapest: cheapIDs, mostExpensive: expensiveIDs };
  return res;
};

export const searchBooksByPublisher = async (publisher) => {
  if (!publisher) {
    throw new Error("Publisher parameter must be included");
  }
  if (typeof publisher !== "string") {
    throw new Error("Publisher parameter must be of string type");
  }

  publisher = publisher.trim().toLowerCase();

  if (publisher === "") {
    throw new Error("Paramater cannot be empty string");
  }
  const booksArray = await getBooks();
  const isPub = booksArray.find(
    (book) => book.publisher.toLowerCase() === publisher
  );
  if (!isPub) {
    throw new Error("Publisher not found");
  }
  const bookIDs = [];
  booksArray.forEach((book) => {
    if (book.publisher.toLowerCase() === publisher) {
      bookIDs.push(book.id);
    }
  });
  return bookIDs;
};
