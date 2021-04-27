// CODING QUIZ PROGRAM

//--  DECLARATIONS ----

// Declare questions array and options array for each question:
var questionList = [
  "Commonly used data types DO NOT include:",
  "The condition in an if/else statement is enclosed with _____.",
  "Arrays in JavaScript can be used to store _____.",
  "String values must be enclosed within ______ when being assigned to variables.",
  "A very useful tool used during development and debugging for printing content to the debugger is:",
];

var optionsArray = [
  ["strings", "booleans", "alerts", "numbers"],
  ["quotes", "curly brackets", "parenthesis", "square brackets"],
];

console.log(optionsArray);

// Declare answers array:
var answers = ["alerts", "parenthesis"];
// Declare new array:
var questionArray = new Array();

function populate() {
  for (let i = 0; i < 2; i++) {
    console.log(i);
    questionArray.push(new Object());
    questionArray[i].question = questionList[i];
    questionArray[i].options = optionsArray[i];
    questionArray[i].answer = "TEST";
  }
}

populate();
console.log(questionArray);

// Declare function askQuestions (QA)
function askQuestions(questionArray) {}
// Declare function evaluateAnswer (QA)
function evaluateAnswer(questionArray) {}

// ----------------------- Execution ----------------------------

// Declare function startQuiz
function startQuiz() {}
// startQuiz()
