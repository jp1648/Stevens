/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { isArrayEqual } from "./helpers.js";

export let objectStats = (arrObjects) => {
  if (!arrObjects || !Array.isArray(arrObjects)) {
    throw new Error("Argument must be supplied and must be an array");
  }

  if (
    arrObjects.some(
      (obj) => typeof obj !== "object" || obj === null || Array.isArray(obj)
    )
  ) {
    throw new Error("Each element in the array must be an object");
  }
  if (arrObjects.some((obj) => Object.keys(obj).length === 0)) {
    throw new Error(
      "Each object in the array must be nonempty and have at least 1 key/value pair"
    );
  }

  for (let obj of arrObjects) {
    for (let val of Object.values(obj)) {
      if (typeof val !== "number" || isNaN(val)) {
        throw new Error("Each object value for each key must be a number");
      }
      if (Number.isInteger(val)) {
        continue;
      } else {
        let roundedVal = Math.round(val * 1000) / 1000;
        if (roundedVal !== val) {
          throw new Error(
            "Decimal numbers should be rounded to a maximum of three decimal places"
          );
        }
      }
    }
  }

  let sorted = [];
  for (let objs of arrObjects) {
    for (let vals of Object.values(objs)) {
      sorted.push(vals);
    }
  }
  sorted.sort((a, b) => a - b);

  let count = sorted.length;
  let sum = sorted.reduce((acc, num) => acc + num, 0);
  let mean = Number((sum / sorted.length).toFixed(3));
  let min = sorted[0];
  let max = sorted[sorted.length - 1];

  let midIndex = Math.floor(sorted.length / 2);
  let median;
  if (sorted.length % 2 === 0) {
    median = (sorted[midIndex - 1] + sorted[midIndex]) / 2;
  } else {
    median = sorted[midIndex];
  }

  let range = max - min;
  let modeMap = {};

  sorted.forEach((num) => {
    if (modeMap[num]) {
      modeMap[num]++;
    } else {
      modeMap[num] = 1;
    }
  });

  let mode;
  let modes = [];
  let modeFreq = 0;

  for (let [num, freq] of Object.entries(modeMap)) {
    if (freq === modeFreq) {
      modes.push(num);
    }
    if (freq > modeFreq) {
      modeFreq = freq;
      modes = [num];
    }
  }

  if (modes.length === 1) {
    mode = Number(modes[0]);
  } else if (modes.length > 1) {
    mode = modes.map((str) => Number(str));
  }

  if (modes.length === Object.keys(modeMap).length) {
    mode = 0;
  }

  let out = {
    mean: mean,
    median: median,
    mode: mode,
    range: range,
    minimum: min,
    maximum: max,
    count: count,
    sum: sum,
  };
  return out;
};

export let nestedObjectsDiff = (obj1, obj2) => {
  if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object") {
    throw new Error(
      "Both arguments must be supplied and both arguments must be object types"
    );
  }
  if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) {
    throw new Error("Both objects must have at least 1 keys/value pair");
  }

  let diff = {};

  for (let keys in obj2) {
    if (!obj1.hasOwnProperty(keys)) {
      diff[keys] = obj2[keys];
    } else if (
      typeof obj1[keys] === "object" &&
      typeof obj2[keys] === "object"
    ) {
      if (Array.isArray(obj1[keys]) && Array.isArray(obj2[keys])) {
        if (!isArrayEqual(obj1[keys], obj2[keys])) {
          diff[keys] = obj2[keys];
        }
      } else {
        let nDiff = nestedObjectsDiff(obj1[keys], obj2[keys]);
        if (Object.keys(nDiff).length >= 1) {
          diff[keys] = nDiff;
        }
      }
    } else if (obj1[keys] !== obj2[keys]) {
      diff[keys] = obj2[keys];
    }
  }
  for (let keys in obj1) {
    if (!obj2.hasOwnProperty(keys)) {
      diff[keys] = undefined;
    }
  }

  return diff;
};

export let mergeAndSumValues = (...args) => {
  args.forEach((arg) => {
    if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
      throw new Error("Each argument must be an object");
    }

    if (Object.keys(arg).length === 0) {
      throw new Error("Every object must have at least one key/val pair");
    }

    for (let keys in arg) {
      if (typeof arg[keys] !== "number" && isNaN(Number(arg[keys]))) {
        throw new Error(
          "Each value for each key for each object must be a number or number in string"
        );
      }
    }
  });

  let newObj = {};

  for (let objs of args) {
    for (let [keys, vals] of Object.entries(objs)) {
      let conVals = typeof vals === "number" ? vals : Number(vals);
      if (newObj[keys]) {
        newObj[keys] += conVals;
      } else {
        newObj[keys] = conVals;
      }
    }
  }

  return newObj;
};
