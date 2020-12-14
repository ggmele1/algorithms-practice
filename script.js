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
