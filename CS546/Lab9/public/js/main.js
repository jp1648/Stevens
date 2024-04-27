//Here is where you will do all of the logic and processing for the palindrome and prime checking.

document
  .getElementById("palindromeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const existingError = document.querySelector(".error");
    if (existingError) {
      existingError.remove();
    }

    if (!document.getElementById("palindrome_input").value.trim()) {
      const errorP = document.createElement("p");
      errorP.className = "error";
      errorP.innerHTML = "Error: Please enter a valid value";
      document.getElementById("palindromeForm").appendChild(errorP);
    } else {
      let input = document.getElementById("palindrome_input").value.split(",");
      input = input.filter((element) => element.trim() !== "");
      input = input.map((word) => word.toLowerCase().replace(/[^a-z0-9]/g, ""));
      const booleanArray = input.map((word) => isPalindrome(word));
      const boolColor = isPrime(booleanArray.length);

      const ol = document.getElementById("palindromes");
      const li = document.createElement("li");
      li.innerHTML = "[" + booleanArray.join(", ") + "]";
      li.className = boolColor ? "prime" : "not-prime";
      ol.appendChild(li);
    }
  });

const isPalindrome = (input) => {
  return input === input.split("").reverse().join("");
};

const isPrime = (input) => {
  if (input <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(input); i++) {
    if (input % i === 0) {
      return false;
    }
  }
  return true;
};
