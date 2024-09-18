/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let swapChars = (string1, string2) => {
  if (!string1 || !string2) {
    throw new Error("2 arguments need to be supplied");
  }

  if (typeof string1 !== "string" || typeof string2 !== "string") {
    throw new Error("Both paramaters need to be strings");
  }
  string1 = string1.trim();
  string2 = string2.trim();

  if (string1.length < 4 || string2.length < 4) {
    throw new Error("Both strings need to be 4 or more characters long");
  }

  let newS1 = string2.slice(0, 4) + string1.slice(4);
  let newS2 = string1.slice(0, 4) + string2.slice(4);

  return newS1 + " " + newS2;
};

export let longestCommonSubstring = (str1, str2) => {
  if (!str1 || !str2) {
    throw new Error("Both parameters must be provided");
  }

  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new Error("Both parameters must be strings");
  }

  if (str1.length < 5 || str2.length < 5) {
    throw new Error(
      "Both string parameters must be at least 5 characters long"
    );
  }

  str1 = str1.trim();
  str2 = str2.trim();

  if (str1.length === 0 || str2.length === 0) {
    throw new Error(
      "Both string parameters cannot be empty and cannot have just spaces"
    );
  }

  let maxLen = 0;
  let start = -1;

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      let x = 0;
      while (
        i + x < str1.length &&
        j + x < str2.length &&
        str1[i + x] === str2[j + x]
      ) {
        x++;
      }
      if (x > maxLen) {
        maxLen = x;
        start = i;
      }
    }
  }

  return str1.substring(start, start + maxLen);
};

export let palindromeOrIsogram = (arrStrings) => {
  if (!arrStrings || !Array.isArray(arrStrings)) {
    throw new Error("Argument must be supplied and must be an array");
  }

  if (arrStrings.some((elem) => typeof elem !== "string")) {
    throw new Error("Argument must be supplied and must be an array");
  }

  if (arrStrings.length < 2) {
    throw new Error("Must be at least 2 string elements in argument array");
  }

  if (arrStrings.some((elem) => elem.trim() === "")) {
    throw new Error(
      "The strings in array must not be empty or contain just spaces"
    );
  }

  arrStrings = arrStrings.map((str) => str.trim());
  let res = {};

  for (let str of arrStrings) {
    let str2 = str.replace(/[^a-zA-Z]/g, "").toLowerCase();
    let palindrome = str2.split("").reverse().join("");
    let isPalindrome = str2 === palindrome;
    let isogram = new Set(str2);
    let isIsogram = str2.length === isogram.size;

    if (isIsogram && isPalindrome) {
      res[str] = "Both";
    } else if (isIsogram && !isPalindrome) {
      res[str] = "Isogram";
    } else if (!isIsogram && isPalindrome) {
      res[str] = "Palindrome";
    } else {
      res[str] = "Neither";
    }
  }
  return res;
};
