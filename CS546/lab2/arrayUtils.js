/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let arrayPartition = (arrayToPartition, partitionFunc) => {
  if (!arrayToPartition || !Array.isArray(arrayToPartition)) {
    throw new Error(
      "Error: First argument must be nonempty and must be an array"
    );
  }
  if (arrayToPartition.length < 2) {
    throw new Error("Error: Array must have at least 2 values");
  }

  if (!partitionFunc || typeof partitionFunc !== "function") {
    throw new Error(
      "Error: Second argument must be nonempty and must be a function"
    );
  }

  let satisfied = [];
  let not = [];

  for (const element of arrayToPartition) {
    if (partitionFunc(element)) {
      satisfied.push(element);
    } else {
      not.push(element);
    }
  }

  return [satisfied, not];
};

export let arrayShift = (arr, n) => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error(
      "Error: First argument must be nonempty and must be an array"
    );
  }
  if (arr.length < 2) {
    throw new Error("Error: Array must have at least 2 values");
  }

  if ((!n && n !== 0) || typeof n !== "number") {
    throw new Error(
      "Error: Second argument must be nonempty and must be a number"
    );
  }

  if (!Number.isInteger(n)) {
    throw new Error("Error: Second argument must be an integer");
  }

  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    let newIndex;
    if (n > 0) {
      newIndex = (i + n) % arr.length;
    } else {
      newIndex = (i + n + arr.length) % arr.length;
    }

    if (newIndex < 0) {
      newIndex += arr.length;
    }
    newArray[newIndex] = arr[i];
  }

  return newArray;
};

export let matrixOne = (matrix) => {
  if (!matrix || !Array.isArray(matrix)) {
    throw new Error("Argument must be supplied and must be an array");
  }

  for (let row of matrix) {
    if (!Array.isArray(row)) {
      throw new Error("Elements in matrix must be an array");
    }
  }

  for (let row of matrix) {
    if (row.length === 0) {
      throw new Error("Elements in matrix must be nonempty");
    }
  }

  for (let row of matrix) {
    for (let colels of row) {
      if (typeof colels !== "number") {
        throw new Error("Elements in matrix must be numbers");
      }
    }
  }

  let numCols = matrix[0].length;

  for (let row of matrix) {
    if (row.length !== numCols) {
      throw new Error("All subarrays must be of same length");
    }
  }

  let numRows = matrix.length;

  let rowOne = Array(numRows).fill(false);
  let colOne = Array(numCols).fill(false);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (matrix[i][j] === 0) {
        rowOne[i] = true;
        colOne[j] = true;
      }
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (rowOne[i] === true || colOne[j] === true) {
        matrix[i][j] = 1;
      }
    }
  }

  return matrix;
};
