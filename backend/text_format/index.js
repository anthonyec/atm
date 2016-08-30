'use strict';

import wrap from 'wordwrapjs';

const text = 'Edit the Expression & Text to see matches. Roll over matches or the expression for details. Undo mistakes with cmd-z. Save Favorites & Share expressions with friends or the Community. Explore your results with Tools. A full Reference & Help is available in the Library, or watch the video Tutorial.';
console.log(wrap(text));

// const charsPerLine = 20;

// // console.log(text.split(' '));

// function getArrayCharLength(arr) {
//   return arr.reduce((count, word) => {
//     return count + word.length;
//   }, 0);
// };

// const words = text.split(' ');

// let paragraph = [];
// let line = [];
// let tooBigWord = '';

// words.forEach((word, index) => {
//   const currentLineLength = getArrayCharLength(line);
//   const wordLength = word.length;
//   const potentialLineLength = currentLineLength + wordLength;

//   if (wordLength > charsPerLine) {
//     // console.log('split!', word);
//     console.log(index);
//   }

//   if (potentialLineLength < charsPerLine) {
//     line.push(word);
//   } else {
//     paragraph.push(line);
//     line = [];
//     line.push(word);
//   }
// });

// paragraph.push(line);
// console.log(paragraph);

// console.log(lines);

/*

for each word

  check what wordLength added to curentLineLength is

  if check < charsPerLine
    add word to line array
    add wordLength onto currentLineLength
  else
    push line array to paragraph array
    reset currentLineLength counter

*/

