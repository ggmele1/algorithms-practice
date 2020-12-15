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
