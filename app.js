var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
    number: 1,
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
    number: 2,
  },
  {
    title: "Which of the following is truthy?",
    choices: ["'0'", "null", "-0", "NaN"],
    answer: "'0'",
    number: 3,
  },
  {
    title:
      "What is the correct way to call the random method on the Math global object?",
    choices: [
      "random.Math()",
      "math(random)",
      "Math.random()",
      "math.Random()",
    ],
    answer: "Math.random()",
    number: 4,
  },
  {
    title: "What are variables used for in JavaScript?",
    choices: [
      "For changing browser language settings",
      "For holding data",
      "For changing a value's data type",
    ],
    answer: "For holding data",
    number: 5,
  },
  {
    title: "A ternary is an array method.",
    choices: ["True", "False"],
    answer: "False",
    number: 6,
  },
  {
    title:
      "The correct way to create a single line comment in JavaScript is ____.",
    choices: [
      "// my comment",
      "-- my comment --",
      "/* My Comment */",
      "-comment: my comment",
    ],
    answer: "// my comment",
    number: 7,
  },
  {
    title: "Which will return the length of an array?",
    choices: [
      "length(array)",
      "array.length()",
      "'array'.length()",
      "array.length",
    ],
    answer: "array.length",
    number: 8,
  },
  {
    title: "console.log() is helpful for ___.",
    choices: [
      "Sending messages to the user",
      "Debugging your code",
      "Sending commands to the browser",
      "storing data in localStorage",
    ],
    answer: "Debugging your code",
    number: 9,
  },
  {
    title: "What is string concatenation?",
    choices: [
      "When you assign a string to a variable",
      "When you join strings together",
      "When you change a variable's value",
      "When you print a string to the console",
    ],
    answer: "When you join strings together",
    number: 10,
  },
];

var quizStatus = localStorage.getItem("quizStatus");
var highscoresList = localStorage.getItem("highscoresList");
// console.log(highscoresList);

if (highscoresList === null) {
    // console.log("equal null");
    
    highscoresList = [
        {
          user: "My name is Josh",
          score: 126,
        },
        {
          user: "Luke Skywalker",
          score: 98,
        },
      ];
    localStorage.setItem("highscoresList", JSON.stringify(highscoresList));
} 

var newHighscores = JSON.parse(localStorage.getItem("highscoresList"));
// console.log(newHighscores);



// put within jquery ready
// $( document ).ready(function() {  
// Handler for .ready() called.});

// Landing section
var timerContainer = $("#timer-container");
var startSection = $("#landing-container");
var startButton = $("#start");
var highscoresButton = $("#lp-scores");
// Quiz container
var quizSection = $("#quiz");

var answerDiv = $("#answers");
var questionH3 = $("#question");
var timer = 60;
var userScore = 0;

var resultDiv = $("#result");
var nextBtn = $("#next-btn");
var qIndex, username;

var highscores = $("#highscores");
var scoreList = $("#score-list");
var restartButton = $("#restart");
var backButton = $("#back");

startButton.on("click", startQuiz);
highscoresButton.on("click", showScores);
restartButton.on("click", restart);
backButton.on("click", goBack);

function shuffle() {
  questions.sort(() => Math.random() - 0.5);
  for (var i = 0; i < questions.length; i++) {
    questions[i]["choices"].sort(() => Math.random() - 0.5);
  }
}

function goBack() {
  highscores.addClass("hide");
  startSection.removeClass("hide");
  timerContainer.removeClass("hide");
  // If user has already completed quiz
  timer = 60;
  document.getElementById("timer-container").innerHTML =
    '<span id="timer">60</span> seconds remaining';
}

function restart() {
  timerContainer.removeClass("hide");
  timer = 60;
  document.getElementById("timer-container").innerHTML =
    '<span id="timer">60</span> seconds remaining';
  timerContainer.removeClass("hide");
  qIndex = 0;
  startQuiz();
}

function startQuiz() {
  shuffle();
  //   reset score from previous round
  userScore = 0;
  username = prompt("enter username");
  username ? username : (username = "User");
//   console.log(username);

  function quizTimer() {
    document.getElementById("timer").innerHTML = timer;
    timer--;
    if (timer < 0) {
      document.getElementById("timer-container").innerHTML = "Time's up!";
    } else {
      setTimeout(quizTimer, 1000);
    }
  }
  quizTimer();
  console.log("starting...");
  startSection.addClass("hide");
  highscores.addClass("hide");
  quizSection.removeClass("hide");
  qIndex = 0;
//   console.log(qIndex);
  displayQuestion(qIndex);
}

function displayQuestion(qIndex) {
  console.log(typeof qIndex);

  var title = questions[qIndex]["title"];
  questionH3.text(title);
  quizStatus = questions[qIndex]["number"];
  localStorage.setItem("quizStatus", quizStatus);
  // list out answers in child divs
  $.each(questions[qIndex].choices, function (i, choice) {
    // console.log(choice);
    var aClass = "a" + (i + 1);
    answerDiv.append("<div class='box " + aClass + "'>" + choice + "</div>");
  });
  checkAnswer(questions[qIndex]);
}

// When an answer is clicked
function checkAnswer(question) {
  // listen for answer
  answerDiv.delegate(".box", "click", function () {
    var selected = $(this).text();
    // $( this ).addClass("clicked");
    // console.log(selected);
    answerDiv.off();
    // Is answer correct?
    var result = "";
    if (selected === question.answer) {
      result = "Correct!";
      timer += 5;
      userScore += 4;

      $(this).addClass("correct");

    //   console.log(true);
    } else {
      result = "Incorrect.";
      timer -= 15;
      $(this).addClass("wrong");
    //   console.log(false);
    }

    resultDiv.text(result);
    resultDiv.removeClass("hide");
    nextBtn.removeClass("hide");
  });
}

nextBtn.on("click", nextQuestion);

function nextQuestion() {
  answerDiv.html("");

  qIndex++;
  if (timer < 1) {
    newScore();
  } else if (qIndex > questions.length - 1) {
    timerContainer.addClass("hide");
    newScore();
  } else {
    displayQuestion(qIndex);
  }
  nextBtn.addClass("hide");
  resultDiv.addClass("hide");
}

function newScore() {
//   console.log(newHighscores);
  if (username && userScore) {
    if (timer < 1) {
      userScore = userScore + 3 * 2 * 3;
    } else {
      userScore = userScore + timer * 2 * 3;
    }
    var userObject = {
      user: username,
      score: userScore,
    };
    newHighscores.push(userObject);

    // console.log(newHighscores);
    newHighscores.forEach((score) => {
      scoreList.append(
        "<tr><td>" + score.user + "</td><td>" + score.score + "</td></tr>"
      );
    });
  }
  localStorage.setItem("highscoresList", JSON.stringify(newHighscores));
  showScores();

}

function showScores() {
  scoreList.html("<tr><th>Name</th><th>Score</th></tr>");
  startSection.addClass("hide");
  quizSection.addClass("hide");
  highscores.removeClass("hide");
  currentStatus = localStorage.getItem("quizStatus");

  if (currentStatus < 2) {
    restartButton.text("Take the quiz!");
  } else {
    restartButton.text("Try again!");
  }

  function scoreSort(a, b) {
    var scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = -1;
    } else if (scoreA < scoreB) {
      comparison = 1;
    }
    return comparison;
  }
//   console.log(newHighscores);
  newHighscores.sort(scoreSort);

  newHighscores.forEach((score) => {
    scoreList.append(
      "<tr><td>" + score.user + "</td><td>" + score.score + "</td></tr>"
    );
  });
}
