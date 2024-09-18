/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.*/

import * as authors from "./authors.js";
import * as books from "./books.js";

//tests for getAuthorByID

try {
  let testparam = "2155574a-80b0-4389-8bb3-3240da52b770";
  let test = await authors.getAuthorById(testparam);
  console.log(test);
  console.log("getAuthorById passed successfully");
} catch (e) {
  console.error("getAuthorById failed unsuccessfully");
}

try {
  let testparam = "  ";
  let test = await authors.getAuthorById(testparam);
  console.error("getAuthorById passed unsuccessfully");
} catch (e) {
  console.log("getAuthorById failed successfully");
}

try {
  let testparam = "2155574a-80b0-4389-8bb3-3240da52b771";
  let test = await authors.getAuthorById(testparam);
  console.error("getAuthorById passed unsuccessfully");
} catch (e) {
  console.log("getAuthorById failed successfully");
}

try {
  let testparam = 123;
  let test = await authors.getAuthorById(testparam);
  console.error("getAuthorById passed unsuccessfully");
} catch (e) {
  console.log("getAuthorById failed successfully");
}

try {
  let testparam;
  let test = await authors.getAuthorById(testparam);
  console.error("getAuthorById passed unsuccessfully");
} catch (e) {
  console.log("getAuthorById failed successfully");
}

// //searchAuthorsByAge

try {
  let testparam = 20;
  let test = await authors.searchAuthorsByAge(20);
  console.log(test);
  console.log("searchAuthorsByAge passed successfully");
} catch (e) {
  console.error("searchAuthorsByAge failed unsuccessfully");
}

try {
  let testparam = 0;
  let test = await authors.searchAuthorsByAge(testparam);
  console.error("searchAuthorsByAge passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByAge failed successfully");
}

try {
  let testparam;
  let test = await authors.searchAuthorsByAge(testparam);
  console.error("searchAuthorsByAge passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByAge failed successfully");
}

try {
  let testparam = "potato";
  let test = await authors.searchAuthorsByAge(testparam);
  console.error("searchAuthorsByAge passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByAge failed successfully");
}

try {
  let testparam = 101;
  let test = await authors.searchAuthorsByAge(testparam);
  console.error("searchAuthorsByAge passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByAge failed successfully");
}

//getBooksByState

try {
  let testparam = "NJ";
  let test = await authors.getBooksByState(testparam);
  console.log(test);
  console.log("getBooksByState passed successfully");
} catch (e) {
  console.error("getBooksByState failed unsuccessfully");
}
try {
  let testparam = "WY";
  let test = await authors.getBooksByState(testparam);
  console.log(test);
  console.log("getBooksByState passed successfully");
} catch (e) {
  console.error("getBooksByState failed unsuccessfully");
}

try {
  let testparam = 0;
  let test = await authors.getBooksByState(testparam);
  console.error("getBooksByState passed unsuccessfully");
} catch (e) {
  console.log("getBooksByState failed successfully");
}

try {
  let testparam = "BY";
  let test = await authors.getBooksByState(testparam);
  console.error("getBooksByState passed unsuccessfully");
} catch (e) {
  console.log("getBooksByState failed successfully");
}

try {
  let testparam = "   ";
  let test = await authors.getBooksByState(testparam);
  console.error("getBooksByState passed unsuccessfully");
} catch (e) {
  console.log("getBooksByState failed successfully");
}

try {
  let testparam;
  let test = await authors.getBooksByState(testparam);
  console.error("getBooksByState passed unsuccessfully");
} catch (e) {
  console.log("getBooksByState failed successfully");
}

try {
  let testparam = "BXY";
  let test = await authors.getBooksByState(testparam);
  console.error("getBooksByState passed unsuccessfully");
} catch (e) {
  console.log("getBooksByState failed successfully");
}

//searchAuthorsByHometown

try {
  let testparam1 = "Trenton";
  let testparam2 = "NJ";
  let test = await authors.searchAuthorsByHometown(testparam1, testparam2);
  console.log(test);
  console.log("searchAuthorsByHometown passed successfully");
} catch (e) {
  console.error("searchAuthorsByHometown failed unsuccessfully");
}

try {
  let testparam;
  let testparam2;
  let test = await authors.searchAuthorsByHometown(testparam, testparam2);
  console.error("searchAuthorsByHometown passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByHometown failed successfully");
}

try {
  let testparam = "   ";
  let testparam2 = "NJ";
  let test = await authors.searchAuthorsByHometown(testparam, testparam2);
  console.error("searchAuthorsByHometown passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByHometown failed successfully");
}

try {
  let testparam = "Trenton";
  let testparam2 = "NJY";
  let test = await authors.searchAuthorsByHometown(testparam, testparam2);
  console.error("searchAuthorsByHometown passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByHometown failed successfully");
}

try {
  let testparam = 123;
  let testparam2 = "NJ";
  let test = await authors.searchAuthorsByHometown(testparam, testparam2);
  console.error("searchAuthorsByHometown passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByHometown failed successfully");
}

try {
  let testparam = "NJ";
  let testparam2 = 123;
  let test = await authors.searchAuthorsByHometown(testparam, testparam2);
  console.error("searchAuthorsByHometown passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByHometown failed successfully");
}

try {
  let testparam = 123;
  let testparam2 = "JN";
  let test = await authors.searchAuthorsByHometown(testparam, testparam2);
  console.error("searchAuthorsByHometown passed unsuccessfully");
} catch (e) {
  console.log("searchAuthorsByHometown failed successfully");
}

//getAuthorBooks

try {
  let testparam = "69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd";
  let test = await authors.getAuthorBooks(testparam);
  console.log(test);
  console.log("getAuthorBooks passed successfully");
} catch (e) {
  console.error("getAuthorBooks failed unsuccessfully");
}

try {
  let testparam;
  let test = await authors.getAuthorBooks(testparam);
  console.error("getAuthorBooks passed unsuccessfully");
} catch (e) {
  console.log("getAuthorBooks failed successfully");
}

try {
  let testparam = " ";
  let test = await authors.getAuthorBooks(testparam);
  console.error("getAuthorBooks passed unsuccessfully");
} catch (e) {
  console.log("getAuthorBooks failed successfully");
}

try {
  let testparam = 230;
  let test = await authors.getAuthorBooks(testparam);
  console.error("getAuthorBooks passed unsuccessfully");
} catch (e) {
  console.log("getAuthorBooks failed successfully");
}

try {
  let testparam = "2155574a-v0b0-4389-8bb3-3240da52b770";
  let test = await authors.getAuthorBooks(testparam);
  console.error("getAuthorBooks passed unsuccessfully");
} catch (e) {
  console.log("getAuthorBooks failed successfully");
}

//getBookById

try {
  let testparam = "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e";
  let test = await books.getBookById(testparam);
  console.log(test);
  console.log("getBookById passed successfully");
} catch (e) {
  console.error("getBookById failed unsuccessfully");
}

try {
  let testparam;
  let test = await books.getBookById(testparam);
  console.error("getBookById passed unsuccessfully");
} catch (e) {
  console.log("getBookById failed successfully");
}

try {
  let testparam = 123;
  let test = await books.getBookById(testparam);
  console.error("getBookById passed unsuccessfully");
} catch (e) {
  console.log("getBookById failed successfully");
}

try {
  let testparam = "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb8z";
  let test = await books.getBookById(testparam);
  console.error("getBookById passed unsuccessfully");
} catch (e) {
  console.log("getBookById failed successfully");
}

try {
  let testparam = "   ";
  let test = await books.getBookById(testparam);
  console.error("getBookById passed unsuccessfully");
} catch (e) {
  console.log("getBookById failed successfully");
}

//booksByPageCount

try {
  let testparam1 = 0;
  let testparam2 = 110;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.log(test);
  console.log("booksByPageCount passed successfully");
} catch (e) {
  console.error("booksByPageCount failed unsuccessfully");
}

try {
  let testparam1 = 0;
  let testparam2;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

try {
  let testparam1;
  let testparam2 = 100;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

try {
  let testparam1 = 0;
  let testparam2 = "abc";
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

try {
  let testparam1 = "abc";
  let testparam2 = 0;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

try {
  let testparam1 = -10;
  let testparam2 = 100;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

try {
  let testparam1 = 5;
  let testparam2 = 1;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

try {
  let testparam1 = 5;
  let testparam2 = 0;
  let test = await books.booksByPageCount(testparam1, testparam2);
  console.error("booksByPageCount passed unsuccessfully");
} catch (e) {
  console.log("booksByPageCount failed successfully");
}

//sameYear

try {
  let testparam1 = 2000;
  let test = await books.sameYear(testparam1);
  console.log(test);
  console.log("sameYear passed successfully");
} catch (e) {
  console.error("sameYear failed unsuccessfully");
}

try {
  let testparam1;
  let test = await books.sameYear(testparam1);
  console.error("sameYear passed unsuccessfully");
} catch (e) {
  console.log("sameYear failed successfully");
}

try {
  let testparam1 = 1420;
  let test = await books.sameYear(testparam1);
  console.error("sameYear passed unsuccessfully");
} catch (e) {
  console.log("sameYear failed successfully");
}

try {
  let testparam1 = -100;
  let test = await books.sameYear(testparam1);
  console.error("sameYear passed unsuccessfully");
} catch (e) {
  console.log("sameYear failed successfully");
}

//minMaxPrice

try {
  let test = await books.minMaxPrice();
  console.log(test);
  console.log("sameYear passed successfully");
} catch (e) {
  console.error("sameYear failed unsuccessfully");
}

//searchBooksByPublisher

try {
  let testparam1 = "Skilith";
  let test = await books.searchBooksByPublisher(testparam1);
  console.log(test);
  console.log("searchBooksByPublisher passed successfully");
} catch (e) {
  console.error("searchBooksByPublisher failed unsuccessfully");
}

try {
  let testparam1;
  let test = await books.searchBooksByPublisher(testparam1);
  console.error("searchBooksByPublisher passed unsuccessfully");
} catch (e) {
  console.log("searchBooksByPublisher failed successfully");
}

try {
  let testparam1 = "   ";
  let test = await books.searchBooksByPublisher(testparam1);
  console.error("searchBooksByPublisher passed unsuccessfully");
} catch (e) {
  console.log("searchBooksByPublisher failed successfully");
}

try {
  let testparam1 = 123;
  let test = await books.searchBooksByPublisher(testparam1);
  console.error("searchBooksByPublisher passed unsuccessfully");
} catch (e) {
  console.log("searchBooksByPublisher failed successfully");
}

try {
  let testparam1 = "Fake Pub";
  let test = await books.searchBooksByPublisher(testparam1);
  console.error("searchBooksByPublisher passed unsuccessfully");
} catch (e) {
  console.log("searchBooksByPublisher failed successfully");
}
