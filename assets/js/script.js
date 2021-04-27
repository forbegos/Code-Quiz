// CODING QUIZ PROGRAM

//--  DECLARATIONS ----

// Declare document elements
var mTitle = document.querySelector("#main-title");
var mText = document.querySelector("#main-text");
var choiceBlock = document.querySelector("#choice-block");
var sButton = document.querySelector("#start-button");
var index = 0;
var timer = 90;

// Declare questions array and options array for each question:
var questionList = [
  "Commonly used data types DO NOT include:",
  "The condition in an if/else statement is enclosed with _____.",
  "Arrays in JavaScript can be used to store _____.",
  "String values must be enclosed within ______ when being assigned to variables.",
  "A very useful tool used during development and debugging for printing content to the debugger is:",
];

// Declare options list for each question in an array
var optionsArray = [
  ["strings", "booleans", "alerts", "numbers"],
  ["quotes", "curly brackets", "parenthesis", "square brackets"],
  ["numbers and strings", "other arrays", "booleans", "all of the above"],
  ["commas", "curly brackets", "quotes", "parenthesis"],
  ["Javascript", "Terminal/bash", "For loops", "Console.log"],
];

// Declare answers array:
var answers = [
  "alerts",
  "parenthesis",
  "all of the above",
  "quotes",
  "Console.log",
];

// Declare object array:
var questionArray = new Array();

// function to populate object array
function populate() {
  for (let i = 0; i < questionList.length; i++) {
    // console.log(i);
    questionArray.push(new Object());
    questionArray[i].question = questionList[i];
    questionArray[i].options = optionsArray[i];
    questionArray[i].answer = answers[i];
  }
}

// Declare function askQuestions
function askQuestions() {
  index = Math.floor(Math.random() * questionArray.length);
  // Think about adding a checker here to avoid the same question again?-----------------------
  console.log("Index: " + index);
  mTitle.textContent = "";
  sButton.setAttribute("style", "display:none;");
  choiceBlock.setAttribute("style", "display:all");
  mText.textContent = questionArray[index].question;
  // Use a for loop to populate the respective multiple choice buttons
  for (let i = 0; i < questionArray[index].options.length; i++) {
    choiceBlock.children[i].textContent = questionArray[index].options[i];
  }
}

// Declare function evaluateAnswer
function evaluateAnswer(event) {
  event.preventDefault();
  console.log("Index no. at evaluate: " + index);
  console.log(event.target.innerHTML);
  console.log(questionArray[index].answer);
  if (event.target.innerHTML === questionArray[index].answer) {
    console.log("Correct Answer!");
  } else {
    // Subtract time from the clock
    console.log("Wrong!!!");
  }
  index = 0;
  // IF timer !=== 0 then do
  askQuestions();
  // -------------------------
}

// Declare function to run program "startQuiz"
function startQuiz() {
  choiceBlock.setAttribute("style", "display:none;");
  populate();
  console.log(questionArray);
  // start timer here?
  sButton.setAttribute("style", "opacity: 1.0");
  sButton.addEventListener("click", askQuestions);
  choiceBlock.addEventListener("click", evaluateAnswer);
  // timer ends here?
}

// Program EXECUTION
startQuiz();
