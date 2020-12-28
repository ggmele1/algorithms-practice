/* 
QUESTION: Create a function that takes two or more arrays and returns an array of their symmetric difference.
The returned array must contain only unique values (no duplicates). 

EX: sym([1, 2, 5], [2, 3, 5], [3, 4, 5]) ---> [1, 4, 5]
*/

function sym(args) {
  let compare = [...arguments[0]];
  for (var i = 1; i < arguments.length; i++) {
    const arr1 = [...new Set(arguments[i].filter((x) => !compare.includes(x)))];
    const arr2 = [...new Set(compare.filter((x) => !arguments[i].includes(x)))];
    compare = arr1.concat(arr2);
  }
  return compare;
}

sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);

// -------------

/* QUESTION: 
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery.
Update the current existing inventory item quantities (in arr1). If an item cannot be found,
add the new item and quantity into the inventory array. The returned inventory array
should be in alphabetical order by item.

EX: 
updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], 
[5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], 
[7, "Toothpaste"]]) 
---> [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]]
*/

function updateInventory(arr1, arr2) {
  // create copy of array
  let array = [...arr1];

  // checks if item exists
  let isNew = (item) => (array.flat().indexOf(item) === -1 ? true : false);

  // if item exists, adds quantities
  let addQuantity = (addItem) =>
    array.map((item1) => {
      addItem[1] === item1[1] ? (item1[0] += addItem[0]) : null;
    });

  arr2.forEach((item2) => {
    isNew(item2[1]) ? array.push(item2) : addQuantity(item2);
  });

  return array.sort((a, b) => (a[1] < b[1] ? -1 : 1)); // returns array ands sorts alphabetically
}

// Example inventory lists
var curInv = [
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"],
];

var newInv = [
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"],
];

updateInventory(curInv, newInv);

// -------------

/* Permutation Algorithm*/

let heapAlgorithm = (arr) => {
  let permutations = [];

  let swap = (idx1, idx2) => {
    let tmp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = tmp;
  };

  let generate = (int) => {
    if (int === 1) {
      permutations.push(arr.join(""));
    } else {
      for (var i = 0; i != int; i++) {
        generate(int - 1);
        swap(int % 2 ? 0 : i, int - 1);
      }
    }
  };

  generate(arr.length);
  return permutations;
};

heapAlgorithm(["1", "2", "3"]);

// -------------

/* Given an array arr, find element pairs whose sum equal the second argument arg and return
the sum of their indices. 

EX: pairwise([7, 9, 11, 13, 15], 20) ---> 6 */
let pairwise = (arr, arg) => {
  // Array of pair indices.
  let pairs = [];

  // loop through each pair combination
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == arg) {
        pairs.push(i, j);
        // change val to not be used twice
        arr[i] = undefined;
        arr[j] = undefined;
      }
    }
  }
  // sum of pairs
  return pairs.reduce((acc, pair) => acc + pair, 0);
};

pairwise([1, 1, 1], 2);

// -------------

// Roman Numeral Converter
let convertToRoman = (num) => {
  let symbols = [
    [1, "I"],
    [4, "IV"],
    [5, "V"],
    [9, "IX"],
    [10, "X"],
    [40, "XL"],
    [50, "L"],
    [90, "XC"],
    [100, "C"],
    [400, "CD"],
    [500, "D"],
    [900, "CM"],
    [1000, "M"],
  ];
  let roman = "";
  var remainder = num;

  // returns the set with largest number that fits into param
  let largest = (remainder) => {
    let filtered = symbols.filter((item) => item[0] <= remainder);
    return filtered[filtered.length - 1];
  };

  // subtracts largest from remainder and adds corresponding roman symbol to string
  while (remainder !== 0) {
    roman += largest(remainder)[1];
    remainder = remainder - largest(remainder)[0];
  }

  return roman;
};
console.log(convertToRoman(1999)); // ---> MCMXCIX

// ------------------------------------------------------------------------------------------------
/* SORTING ALGORITHMS: Sort from least to greatest without .sort() method  */
// ------------------------------------------------------------------------------------------------

/* Bubble Sort: Starts at the beginning of an unsorted array and 'bubbles up' unsorted values
towards the end, iterating through the array until it is completely sorted.  */

function bubbleSort(array) {
  // swaps adjacent integers
  let swap = (a, b, arr) => {
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  };

  for (var i = 0; i < array.length; i++) {
    // Sorts largest integers. Only loops over non sorted integers (array.length - 1 - i)
    for (var j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(j, j + 1, array);
      }
    }
  }
  return array;
}

bubbleSort([
  5,
  4,
  2,
  8,
  345,
  123,
  43,
  32,
  5643,
  63,
  123,
  43,
  2,
  55,
  1,
  234,
  92,
]);

// -------------

/* Selection Sort: Works by selecting the minimum value in a list and swapping it with the
first value (i) in the list. */
function selectionSort(array) {
  // pushes < value to position i
  let swap = (arr, pos1, pos2) => {
    let tmp = arr[pos2];
    let newArr = [...arr];

    delete newArr[pos2];
    newArr = newArr.filter((n) => n);

    newArr.splice(pos1, 0, tmp);
    array = newArr;
  };

  for (var i = 0; i < array.length; i++) {
    for (var j = 1 + i; j < array.length; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j);
      }
    }
  }
  return array;
}

selectionSort([
  3,
  4,
  2,
  8,
  345,
  123,
  43,
  32,
  5643,
  63,
  123,
  43,
  2,
  55,
  1,
  234,
  92,
]);

// -------------

function Node(value) {
  this.value = value;
  this.next = null;
}

let head = new Node(10);
head.next = new Node(25);
head.next.next = new Node(46);
console.log(head);

const reverseList = (head) => {
  let prev = null;
  let next = null;

  while (head !== null) {
    next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};

console.log(reverseList(head));

// ------------------------------------------------------------------------------------------------
/* Recursive Functions   */
// ------------------------------------------------------------------------------------------------

// Parse integers in multidimensional array
const contains = (arr) => {
  if (arr.length === 0) return 0;

  let total = 0;
  let first = arr.shift();

  if (Array.isArray(first)) {
    total += contains(first);
  } else if (Number.isInteger(first)) {
    total += 1;
  }
  return total + contains(arr);
};

console.log(contains([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]])); // ---> 7

// -------------

// Sum the squares of numbers in nested array
const sumSquares = (arr) => {
  if (arr.length === 0) return 0;

  let total = 0;

  for (var i in arr) {
    if (Array.isArray(arr[i])) {
      total += sumSquares(arr[i]);
    } else {
      total += arr[i] ** 2;
    }
  }
  return total;
};

console.log(sumSquares([10, [[10], 10], [10]])); // ---> 400

// -------------

//
const replicate = (amount, num) => {
  if (amount <= 0) return [];

  return [num].concat(replicate(amount - 1, num));
};
console.log(replicate(3, 5)); // ---> [5,5,5]
