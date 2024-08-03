// ❓ You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

// Examples
// [7, 1]  =>  [1, 7]
// [5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]

// ✅ Solution:

function sortArray(array) {
  const oddNumbers = array.filter((num) => num % 2 !== 0).sort((a, b) => a - b);
  return array.map((num) => (num % 2 === 0 ? num : oddNumbers.shift()));
}

// ❓ Snail Sort
// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]
// For better understanding, please follow the numbers of the next array consecutively:

// array = [[1,2,3],
//          [8,9,4],
//          [7,6,5]]
// snail(array) #=> [1,2,3,4,5,6,7,8,9]
// This image will illustrate things more clearly:

// NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

// NOTE 2: The 0x0 (empty matrix) is represented as en empty array inside an array [[]]

// ✅ Solution:

snail = function (array) {
  if (array.length === 0) return [];

  const result = [];
  let top = 0;
  let bottom = array.length - 1;
  let left = 0;
  let right = array[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      result.push(array[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result.push(array[i][right]);
    }
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(array[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(array[i][left]);
      }
      left++;
    }
  }

  return result;
};

// ❓ Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.

// The keypad has the following layout:

// ┌───┬───┬───┐
// │ 1 │ 2 │ 3 │
// ├───┼───┼───┤
// │ 4 │ 5 │ 6 │
// ├───┼───┼───┤
// │ 7 │ 8 │ 9 │
// └───┼───┼───┘
//     │ 0 │
//     └───┘
// He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

// He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

// * possible in sense of: the observed PIN itself and all variations considering the adjacent digits

// Can you help us to find all those variations? It would be nice to have a function, that returns an array (or a list in Java/Kotlin and C#) of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python, GetPINs in C#). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.

// Detective, we are counting on you!

// ✅ Solution:

function getPINs(observed) {
  const adjacent = {
    0: ["0", "8"],
    1: ["1", "2", "4"],
    2: ["1", "2", "3", "5"],
    3: ["2", "3", "6"],
    4: ["1", "4", "5", "7"],
    5: ["2", "4", "5", "6", "8"],
    6: ["3", "5", "6", "9"],
    7: ["4", "7", "8"],
    8: ["5", "7", "8", "9", "0"],
    9: ["6", "8", "9"],
  };

  function generateVariations(prefix, remaining) {
    if (remaining.length === 0) {
      return [prefix];
    }

    const currentDigit = remaining[0];
    const nextDigits = remaining.slice(1);
    const variations = [];

    for (const adjacentDigit of adjacent[currentDigit]) {
      variations.push(
        ...generateVariations(prefix + adjacentDigit, nextDigits)
      );
    }

    return variations;
  }

  return generateVariations("", observed);
}

// My friend John and I are members of the "Fat to Fit Club (FFC)". John is worried because each month a list with the weights of members is published and each month he is the last on the list which means he is the heaviest.

// I am the one who establishes the list so I told him: "Don't worry any more, I will modify the order of the list". It was decided to attribute a "weight" to numbers. The weight of a number will be from now on the sum of its digits.

// For example 99 will have "weight" 18, 100 will have "weight" 1 so in the list 100 will come before 99.

// Given a string with the weights of FFC members in normal order can you give this string ordered by "weights" of these numbers?

// Example:
// "56 65 74 100 99 68 86 180 90" ordered by numbers weights becomes:

// "100 180 90 56 65 74 68 86 99"
// When two numbers have the same "weight", let us class them as if they were strings (alphabetical ordering) and not numbers:

// 180 is before 90 since, having the same "weight" (9), it comes before as a string.

// All numbers in the list are positive numbers and the list can be empty.

// Notes
// it may happen that the input string have leading, trailing whitespaces and more than a unique whitespace between two consecutive numbers
// For C: The result is freed.

// ✅ Solution:

function orderWeight(strng) {
  return strng
    .split(" ")
    .sort((a, b) => {
      const sumA = a.split("").reduce((acc, num) => acc + parseInt(num), 0);
      const sumB = b.split("").reduce((acc, num) => acc + parseInt(num), 0);

      if (sumA === sumB) {
        return a.localeCompare(b);
      }

      return sumA - sumB;
    })
    .join(" ");
}
