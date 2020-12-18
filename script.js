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

// ------------------------------------------------------------------------------------------------

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

console.log(updateInventory(curInv, newInv));

// ------------------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------------------

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

console.log(pairwise([1, 1, 1], 2));
