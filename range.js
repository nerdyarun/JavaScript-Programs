// find range betwenn two integers
function range(x, y) {
    let arr = [];
    for(i= x+1; i < y; i++) {
        arr.push(i);
    }
    return arr;
}

console.log(range(10,20));

// OR this one is also correct 

function range(x, y) {
  if (x >= y) {
    return [];
  } else {
    return [x, ...range(x + 1, y)];
  }
}
console.log(range(2, 9)); // [2, 3, 4, 5, 6, 7, 8]
=================================================================================================
// Write a program in JavaScript to check if two strings are anagrams of each other or not
function areAnagrams(str1, str2) {
  // Remove non-alphanumeric characters and convert to lowercase
  str1 = str1.replace(/\W/g, '').toLowerCase();
  str2 = str2.replace(/\W/g, '').toLowerCase();

  // If lengths are not equal, they can't be anagrams
  if (str1.length !== str2.length) {
    return false;
  }

  // Sort and compare
  let sortedStr1 = str1.split('').sort().join('');
  let sortedStr2 = str2.split('').sort().join('');

  return sortedStr1 === sortedStr2;
}

// Example usage:
console.log(areAnagrams("listen", "silent"));       // true
console.log(areAnagrams("hello", "world"));         // false
console.log(areAnagrams("Dormitory", "dirty room")); // true

Explanation : How this anagram code Works:
Normalization: Convert strings to lowercase and remove spaces/punctuation using regex (/\W/g).
Sorting: Split strings into characters, sort, and join back.
Comparison: If sorted strings are identical, they're anagrams.


// OR this is also correct 
function isAnagram(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  }

  let count = {};

  for (let letter of string1) {
    count[letter] = (count[letter] || 0) + 1;
  }

  for (let item of string2) {
    if (!count[item]) {
      return false;
    }
    count[item] -= 1;
  }

  return true;
}

// Test cases
console.log(isAnagram("hello", "lleoh"));   // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("adc", "abcd"));      // false
=================================================================================================
// Letter Reverse 
function mirrorName(name) {
  let a = name.split("").reverse().join("");
  let b = a.split(" ").reverse().join(" ");
  return b;
}
console.log(mirrorName("Rahul Gupta"));       // luhaR atpuG

// Reverse String
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString("hello moto")); // "otom olleh"

// reverse string using recursion
function reverseString(str) {
  if (str === "") {
    return str;
  }
  return reverseString(str.substr(1)) + str[0];
}

console.log(reverseString("hello moto")); // "otom olleh"

// Reverse Array
// 1-using reverse (changed original array)
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// 2- manual reverse using for loop
function reverseArray(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]

// 3- swapping
function reverseInPlace(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

console.log(reverseInPlace([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]

//4- using slice
let arr = [1, 2, 3, 4, 5];
let reversed = arr.slice().reverse(); 
console.log(reversed); // [5, 4, 3, 2, 1]
console.log(arr);      // [1, 2, 3, 4, 5]

=================================================================================================
// Simple function 
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5

// created using currying function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

console.log(curriedAdd(2)(3)); // 5

// currying using arrow 
const curriedAdd = a => b => a + b;

console.log(curriedAdd(4)(6)); // 10

// currying with three param
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(2)(3)(4)); // 9

// arrow
const curriedAdd = a => b => c => a + b + c;

console.log(curriedAdd(1)(2)(3)); // 6

// Count frequency of repeated case insensitive sentences
let repeatedValue = "These these THESE Those those This";

// Step 1: Normalize to lowercase
let wordsArray = repeatedValue.toLowerCase().split(" ");

// Step 2: Count frequency using reduce
let countTheValue = wordsArray.reduce((pre, word) => {
  pre[word] = (pre[word] || 0) + 1;
  return pre;
}, {});

// Step 3: Find the most repeated word
let mostRepeated = '';
let maxCount = 0;

for (let word in countTheValue) {
  if (countTheValue[word] > maxCount) {
    maxCount = countTheValue[word];
    mostRepeated = word;
  }
}

console.log("Word Frequency:", countTheValue);
console.log("Most Repeated Word:", mostRepeated, "→", maxCount, "times");

//output
Word Frequency: { these: 3, those: 2, this: 1 }
Most Repeated Word: these → 3 times


// Find seco largest number in array 
let arrVal = [1, -5, -6, -4, -2, -3];

// Bubble sort in descending order
for (let i = 0; i < arrVal.length; i++) {
  for (let j = 0; j < arrVal.length - i - 1; j++) {
    if (arrVal[j] < arrVal[j + 1]) {
      // Swap
      let temp = arrVal[j];
      arrVal[j] = arrVal[j + 1];
      arrVal[j + 1] = temp;
    }
  }
}

console.log(arrVal);      // [1, -2, -3, -4, -5, -6]
console.log(arrVal[1]);   // -2 → second largest


// Third largest number
let arr = [1, -5, -6, -4, -2, -3];

let first = -Infinity;
let second = -Infinity;
let third = -Infinity;

for (let num of arr) {
  if (num > first) {
    third = second;
    second = first;
    first = num;
  } else if (num > second && num !== first) {
    third = second;
    second = num;
  } else if (num > third && num !== second && num !== first) {
    third = num;
  }
}

console.log("Third largest number:", third);  // Output: -3


// Formatt data 

const records = [
  { id: 1, text: "iam" },
  { id: 2, text: "arun" },
  { id: 3, text: "from Noida" },
  { id: 4, text: "ans works in qburst" }
];

// Step 1: Sort by ID (optional if already sorted)
records.sort((a, b) => a.id - b.id);

// Step 2: Combine text
let fullText = records.map(obj => obj.text).join(" ");

// Step 3: Clean and format
// Replace 'iam' → 'Iam'
// Replace 'ans' → 'and'
// Capitalize 'IN' and 'Qburst'
// Ensure proper punctuation at end

fullText = fullText
  .replace(/\biam\b/i, 'Iam')
  .replace(/\bans\b/i, 'and')
  .replace(/\bin\b/i, 'IN')
  .replace(/\bqburst\b/i, 'Qburst');

// Step 4: Add period at end if missing
if (!fullText.endsWith('.')) {
  fullText += '.';
}

console.log(fullText);

// output  "Iam arun from Noida and works IN Qburst."
