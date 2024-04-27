//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import { getAuthors } from "./helpers.js";
import { getBooks } from "./helpers.js";

export const getAuthorById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("ID parameter must be provided and must be of string type");
  }
  id = id.trim();
  if (id === "") {
    throw new Error("ID parameter cannot be an empty string. Provide id");
  }
  const authorsArray = await getAuthors();
  const author = authorsArray.find((author) => author.id === id);
  if (!author) {
    throw new Error("Author not found");
  }
  return author;
};

export const searchAuthorsByAge = async (age) => {
  if (!age) {
    throw new Error("Must input age parameter");
  }
  if (typeof age !== "number" || isNaN(age)) {
    throw new Error("Age parameter must be of number type");
  }
  if (!Number.isInteger(age) || age < 1 || age > 100) {
    throw new Error("Age parameter must be a whole number between 1 and 100");
  }

  const authorsArray = await getAuthors();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const olderThanArray = [];
  authorsArray.forEach((author) => {
    const authorDOB = new Date(author.date_of_birth);
    const authorDOBYear = authorDOB.getFullYear();
    const authorDOBMonth = authorDOB.getMonth() + 1;
    const authorDOBDay = authorDOB.getDate();
    let calcAge = currentYear - authorDOBYear;
    if (
      currentMonth < authorDOBMonth ||
      (currentMonth === authorDOBMonth && currentDay < authorDOBDay)
    ) {
      calcAge--;
    }

    if (calcAge >= age) {
      olderThanArray.push(`${author.first_name} ${author.last_name}`);
    }
  });
  return olderThanArray;
};

export const getBooksByState = async (state) => {
  if (!state) {
    throw new Error("State parameter must be provided");
  }
  if (typeof state !== "string") {
    throw new Error("Parameter must be of string type");
  }

  state = state.trim().toUpperCase();

  if (state === "") {
    throw new Error("Paramater cannot be empty string");
  }

  if (state.length !== 2) {
    throw new Error(
      "State paramater must be in its abbreviated form of two letters. Example: Texas must be TX"
    );
  }

  const authorsArray = await getAuthors();

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  if (!states.includes(state)) {
    throw new Error(
      `State argument must be a valid state abbreviation. ${state} is not a valid state abbreviation`
    );
  }
  const booksArray = await getBooks();
  const booksFromStateIDs = [];
  authorsArray.forEach((author) => {
    if (author.HometownState.toUpperCase() === state) {
      booksFromStateIDs.push(...author.books);
    }
  });

  const bookNames = booksArray
    .filter((book) => booksFromStateIDs.includes(book.id))
    .map((book) => book.title);

  return bookNames;
};

export const searchAuthorsByHometown = async (town, state) => {
  if (!town || !state) {
    throw new Error("Both paramaters, town and state, must be provided");
  }
  if (typeof state !== "string" || typeof town !== "string")
    throw new Error("Both paramaters, town and state, must be string type");

  town = town.trim().toLowerCase();
  state = state.trim().toUpperCase();

  if (state === "" || town === "") {
    throw new Error("Paramaters cannot be an empty strings");
  }

  if (state.length !== 2) {
    throw new Error("State length must be two letters");
  }
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  if (!states.includes(state)) {
    throw new Error(
      `State argument must be a valid state abbreviation. ${state} is not a valid state abbreviation`
    );
  }

  const authorsArray = await getAuthors();
  const authorsFromHometown = [];
  const authorsFromCityState = authorsArray.forEach((author) => {
    if (
      author.HometownCity.toLowerCase() === town &&
      author.HometownState.toUpperCase() === state
    ) {
      authorsFromHometown.push(`${author.first_name} ${author.last_name}`);
    }
  });
  return authorsFromHometown;
};

export const getAuthorBooks = async (authorid) => {
  if (!authorid) {
    throw new Error("Must provide authorid argument");
  }
  if (typeof authorid !== "string") {
    throw new Error("Argument must be of string type");
  }

  authorid = authorid.trim();

  if (authorid === "") {
    throw new Error("Argument cannot be an empty string");
  }

  const authorsArray = await getAuthors();
  const aut = authorsArray.find((author) => author.id === authorid);
  if (!aut) {
    throw new Error("Author not found");
  }
  const booksArray = await getBooks();
  const booksByAID = [];

  authorsArray.forEach((author) => {
    if (author.id === authorid) {
      booksByAID.push(...author.books);
    }
  });

  const bookNames = booksArray
    .filter((book) => booksByAID.includes(book.id))
    .map((book) => book.title);

  return bookNames;
};
