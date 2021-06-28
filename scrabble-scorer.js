// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble!\n\nEnter a word to score: ");
}

function simpleScore(word) {
  return word.replace(/[^a-zA-Z]+/g, "").length;
}

function vowelBonusScore(word) {
  let vowels = word.replace(/[^aeiouAEIOU]+/g, "").length;
  let consonants = word.replace(/[^a-zA-Z]+/g, "").replace(/[aeiouAEIOU]+/g, "").length;
  return (vowels * 3) + consonants;
}

function scrabbleScore(word) {
  word = word.replace(/[^a-zA-Z]+/g, "").toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
    letter = word[i];
    letterPoints += Number(newPointStructure[letter]);
  }
  return letterPoints;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "Each letter is worth 1 point.",
    scorerFunction: scrabbleScore
  }
];

function scorerPrompt(word) {
  let userScoring;
  console.log(`Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system`);

  do {
    userScoring = input.question(`Enter 0, 1, or 2: `);
    userScoring = Math.floor(Number(userScoring));
    if (userScoring === 0 || userScoring === 1 || userScoring === 2) { break; }
  } while (true);

  console.log(`Score for '${word}': ${scoringAlgorithms[userScoring].scorerFunction(word)}`);
  return scoringAlgorithms[userScoring];
}

let newPointStructure = transform(oldPointStructure);

function transform(obj) {
  let newArray = [];
  for (scoreArray in obj) {
    for (letter of obj[scoreArray]) {
      newArray[letter.toLowerCase()] = scoreArray;
    }
  }
  return newArray;
}

function runProgram() {
  let userWord = initialPrompt();
  scorerPrompt(userWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

