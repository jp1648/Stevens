/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import { arrayPartition, arrayShift, matrixOne } from "./arrayUtils.js";
import {
  objectStats,
  nestedObjectsDiff,
  mergeAndSumValues,
} from "./objectUtils.js";
import {
  swapChars,
  longestCommonSubstring,
  palindromeOrIsogram,
} from "./stringUtils.js";

// Test cases for arrayPartition
try {
  let arrayToPartition = ["dog", "cat", "parrot", "monkey"];
  let partitionFunc = (animal) => animal.length < 6;
  let test = arrayPartition(arrayToPartition, partitionFunc);
  console.log("arrayToPartition passed successfully");
} catch (e) {
  console.error("arrayToPartition failed unsuccessfully");
}
try {
  let arrayToPartition = ["dog"];
  let partitionFunc = (animal) => animal.length < 6;
  let test = arrayPartition(arrayToPartition, partitionFunc);
  console.error("arrayToPartition passed unsuccessfully");
} catch (e) {
  console.log("arrayToPartition failed successfully");
}

// Test cases for arrayShift
try {
  let arr = [1, 2, 3, "cat", "dog", 18, 40];
  let n = 24;
  let test = arrayShift(arr, n);
  console.log("arrayShift passed successfully");
} catch (e) {
  console.error("arrayShift failed unsuccessfully");
}
try {
  let arr = [1, 2, 3, "cat", "dog", 18, 40];
  let n = "helloworld";
  let test = arrayShift(arr, n);
  console.error("arrayShift passed unsuccessfully");
} catch (e) {
  console.log("arrayShift failed successfully");
}

// Test cases for matrixOne
try {
  let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let test = matrixOne(matrix);
  console.log("matrixOne passed successfully");
} catch (e) {
  console.error("matrixOne failed unsuccessfully");
}
try {
  let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, "cat"],
  ];
  let test = matrixOne(matrix);
  console.error("matrixOne passed unsuccessfully");
} catch (e) {
  console.log("matrixOne failed successfully");
}

//test for swapChars
try {
  let str1 = "billy";
  let str2 = "joseph";
  let test = swapChars(str1, str2);
  console.log("swapChars passed successfully");
} catch (e) {
  console.error("swapChars failed unsuccessfully");
}
try {
  let str1 = "billy";
  let str2 = "Bob";
  let test = swapChars(arr, n);
  console.error("swapChars passed unsuccessfully");
} catch (e) {
  console.log("swapChars failed successfully");
}

//test for longestCommonSubstring
try {
  let str1 = "abcdefhelloworld";
  let str2 = "zyxwghelbdohelloworl";
  let test = longestCommonSubstring(str1, str2);
  console.log("longestCommonSubstring passed successfully");
} catch (e) {
  console.error("longestCommonSubstring failed unsuccessfully");
}
try {
  let str1 = "billy";
  let str2 = "      ";
  let test = longestCommonSubstring(str1, str2);
  console.error("longestCommonSubstring passed unsuccessfully");
} catch (e) {
  console.log("longestCommonSubstring failed successfully");
}

//test for palindromeOrIsogram

try {
  let arrStrings = ["wow", "pop", "ginseng", "sky"];
  let test = palindromeOrIsogram(arrStrings);
  console.log("palindromeOrIsogram passed successfully");
} catch (e) {
  console.error("palindromeOrIsogram failed unsuccessfully");
}
try {
  let arrStrings = ["wow"];
  let test = palindromeOrIsogram(arrStrings);
  console.error("palindromeOrIsogram passed unsuccessfully");
} catch (e) {
  console.log("palindromeOrIsogram failed successfully");
}

// Test cases for objectStats
try {
  const arrObjects = [
    { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 },
    { x: 5, y: 10, z: 15, l: 100, g: 250 },
    { p: -2, q: 0, r: 5, s: 3.5 },
  ];
  let test = objectStats(arrObjects);
  console.log("objectStats passed successfully");
} catch (e) {
  console.error("objectStats failed unsuccessfully");
}
try {
  const arrObjects = [
    { a: 24, b: 9, c: 1 },
    { x: -5, y: 8, z: 10.0184 },
    { d: 4, e: 4, f: 4 },
  ];

  let test = objectStats(arrObjects);
  console.error("objectStats passed unsuccessfully");
} catch (e) {
  console.log("objectStats failed successfully");
}

//Test cases for nestedObjectsDiff

try {
  let obj1 = {
    key1: "value1",
    key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3] },
  };
  let obj2 = {
    key1: "value1",
    key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4] },
    key3: "newKey",
  };
  let test = nestedObjectsDiff(obj1, obj2);
  console.log("nestedObjectsDiff passed successfully");
} catch (e) {
  console.error("nestedObjectsDiff failed unsuccessfully");
}
try {
  let obj1 = {
    key1: "value1",
    key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3] },
  };
  let obj3 = {};
  let test = objectStats(arrObjects);
  console.error("objectStats passed unsuccessfully");
} catch (e) {
  console.log("objectStats failed successfully");
}

//Test cases for mergeAndSumValues

try {
  let obj1 = { a: 3, b: 7, c: "5" };
  let obj2 = { b: 2, c: "8", d: "4" };
  let obj3 = { a: 5, c: 3, e: 6 };
  let obj4 = { a: 1, b: 2, c: 3 };
  let obj5 = { b: 3, c: 4, d: 5 };
  let obj6 = { a: 2, c: 1, e: 6 };
  let test = mergeAndSumValues(obj1, obj2, obj3, obj4, obj5, obj6);
  console.log("mergeAndSumValues passed successfully");
} catch (e) {
  console.error("mergeAndSumValues failed unsuccessfully");
}
try {
  let obj1 = { a: 3, b: 7, c: "5" };
  let obj2 = { b: 2, c: "8", d: "4" };
  let obj3 = { a: 5, c: 3, e: 6 };
  let obj4 = { a: 1, b: 2, c: 3 };
  let obj5 = { b: 3, c: "helloWorld", d: 5 };
  let obj6 = { a: 2, c: 1, e: 6 };
  let test = mergeAndSumValues(obj1, obj2, obj3, obj4, obj5, obj6);
  console.error("mergeAndSumValues passed unsuccessfully");
} catch (e) {
  console.log("mergeAndSumValues failed successfully");
}
