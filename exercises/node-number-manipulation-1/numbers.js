const numbers = [
  406, 646, 199, 996, 989, 47, 55, 614, 293, 407, 287, 605, -56, 960, 832, 25,
  596, 541, -577, 56, 878, 483, 681, 17, 73, 428, -757, 923, 748, 619, 117, 588,
  -661, -267, 571, 95, 923, 386, 507, 243, -868, -797, 344, 660, 34, 945, -424,
  -169, 344, 601, 277, 478, 562, 863, 887, 172, 23, 995, 999, 2, 12, 476, 755,
  617, 155, 698, 91, 1, 481, 971, 371, 164, 220, 854, 590, 364, 446, 254, 980,
  469, 738, 866, 297, 410, 407, 576, 893, 319, 866, 501, 939, 536, 380, 331,
  438, 76, 423, 951, 459, 425,
];

const sum = numbers.reduce((prev, curr) => prev + curr);
const postitiveSum = numbers
  .filter((num) => num > 0)
  .reduce((prev, curr) => prev + curr);
const evenSum = numbers.reduce(
  (prev, curr) => prev + (curr % 2 == 0 ? curr : 0)
);
const sumOver400 = numbers.reduce(
  (prev, curr) => prev + (curr > 400 ? curr : 0)
);

// Predicate param of filter() means boolean to be returned
const sumOver300 = numbers
  .filter((num) => num > 300)
  .reduce((prev, curr) => prev + curr);
const sumInBetween = numbers.slice(20, 41).reduce((prev, curr) => prev + curr);

// This will give the wrong answer if the initial value of 0 is not specified
// If no initial value is given, array element at index 0 is used
// This means intial value must be given when dealing with certain index ranges
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
const sumInBetween2 = numbers.reduce((prev, curr, index) => {
  if (index >= 20 && index <= 40) {
    return prev + curr;
  } else {
    return prev;
  }
}, 0);

console.log(`Sum = ${sum}`);
console.log(`Positive Sum = ${postitiveSum}`);
console.log(`Even Sum = ${evenSum}`);
console.log(`Sum of numbers over 400 = ${sumOver400}`);
console.log(`Sum of numbers over 300 = ${sumOver300}`);
console.log(
  `Sum of numbers between indexes 20 and 40 inclusively = ${sumInBetween}`
);
console.log(
  `Sum of numbers between indexes 20 and 40 inclusively = ${sumInBetween2}`
);
