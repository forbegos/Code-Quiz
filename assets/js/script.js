// CODING QUIZ PROGRAM

//--  DECLARATIONS ----

// Declare document elements
var mTitle = document.querySelector("#main-title");
var mText = document.querySelector("#main-text");
var choiceBlock = document.querySelector("#choice-block");
var sButton = document.querySelector("#start-button");
var headEl = document.querySelector("header");
var resultEl = document.querySelector("#result");
var formElement = $("form");
var InitialsEl = $('input[id="form-input"]');
var highScoresElement = document.querySelector("#high-scores");
var index = 0;
var timer = 60;
var questionCounter = 0;
var timeInterval;
var correctAnswer = true;
var askedQuestions = [];

// Declare user object
var user = {
  score: 0,
  initials: "",
};

var userArray = [user];
localStorage.setItem("userArray", JSON.stringify(userArray));

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

// Declare function startTimer to start the countdown
function startTimer() {
  askQuestions();
  timeInterval = setInterval(function () {
    timer--;
    headEl.textContent = "Time: " + timer;
    if (timer === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}

// Display high scores
function displayHighScores() {
  formElement.css("display", "none");
  mTitle.setAttribute("style", "display: flex; justify-content:center");
  mTitle.textContent = "High Scores";
  userArray = JSON.parse(localStorage.getItem("userArray"));
  console.log(userArray);
  for (let i = 1; i < userArray.length; i++) {
    var newElement = document.createElement("p");
    newElement.textContent =
      "Initials: " + userArray[i].initials + "--->" + userArray[i].score;
    highScoresElement.appendChild(newElement);
  }
}
// Log initials into user object and generate array of users to store in local storage
function logInitials(event) {
  event.preventDefault();
  userArray = JSON.parse(localStorage.getItem("userArray"));
  user.initials = InitialsEl.val();
  console.log(InitialsEl.val());
  console.log(user);
  userArray.push(user);
  console.log(userArray);
  localStorage.setItem("userArray", JSON.stringify(userArray));
  displayHighScores();
}

// Declare function endGame
function endGame() {
  clearInterval(timeInterval);
  choiceBlock.setAttribute("style", "display:none;");
  mText.setAttribute("style", "display:none;");
  formElement.css("display", "flex");
  if (timer === 0) {
    user.score = 0;
  } else if ((questionCounter = questionArray.length) && !correctAnswer) {
    user.score = timer + 10;
  } else {
    user.score = timer;
  }
  formElement.on("submit", logInitials);
}

// Declare function askQuestions
function askQuestions() {
  index = Math.floor(Math.random() * questionArray.length);
  console.log(askedQuestions);
  console.log("Index: " + index);
  // Checks to make sure question is not asked twice per session
  if (!askedQuestions.includes(index)) {
    mTitle.textContent = "";
    sButton.setAttribute("style", "display:none;");
    choiceBlock.setAttribute("style", "display:all");
    mText.setAttribute("style", "font-size: 150%");
    mText.textContent =
      "Question No. " +
      (questionCounter + 1) +
      ":  " +
      questionArray[index].question;
    // Use a for loop to populate the respective multiple choice buttons
    console.log(questionArray[index].options);
    questionArray[index].options.sort(function (a, b) {
      return 0.5 - Math.random();
    });

    for (let i = 0; i < questionArray[index].options.length; i++) {
      choiceBlock.children[i].textContent = questionArray[index].options[i];
    }
    questionCounter++;
    askedQuestions.push(index);
  } else {
    askQuestions();
  }
}

// Declare function evaluateAnswer
function evaluateAnswer(event) {
  event.preventDefault();
  console.log("Index no. at evaluate: " + index);
  console.log(event.target.innerHTML);
  console.log(questionArray[index].answer);
  if (event.target.textContent === questionArray[index].answer) {
    correctAnswer = true;
    resultEl.textContent = "Correct!";
    // Adding a short timeout to display result
    setTimeout(function pause() {
      resultEl.textContent = "";
    }, 500);
  } else {
    correctAnswer = false;
    resultEl.textContent = "Wrong answer!";
    // Adding a short timeout to display result
    setTimeout(function pause() {
      resultEl.textContent = "";
    }, 500);
    timer = timer - 10;
  }
  console.log(timer);
  if (questionCounter)
    if (questionCounter < questionArray.length) {
      // Check if there are questions remaining

      askQuestions();
    } else {
      endGame();
    }
}

// Declare function to run program "startQuiz"
function startQuiz() {
  choiceBlock.setAttribute("style", "display:none;");
  formElement.css("display", "none");
  populate();
  sButton.setAttribute("style", "opacity: 1.0");
  sButton.addEventListener("click", startTimer);
  choiceBlock.addEventListener("click", evaluateAnswer);
}

// Program EXECUTION
startQuiz();
