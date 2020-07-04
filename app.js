var questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
        number: 1

    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 2
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 3
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 4
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 5
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 6
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 7
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 8
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 9
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['QUOTES', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
        number: 10
    }
]


var quizStatus = localStorage.getItem("quizStatus");
var highscoresList = localStorage.getItem("highscoreList");

highscoresList = [
    {
        user: "Josh",
        score: 120
    },
    {
        user: "Josh",
        score: 120
    }
]
localStorage.setItem("highscoresList", JSON.stringify(highscoresList));

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



startButton.on("click", startQuiz);
highscoresButton.on("click", highscoreSection);
restartButton.on("click", restart);

function restart() {
    timer = 60;
    document.getElementById("timer-container").innerHTML = '<span id="timer">60</span> seconds remaining';
    timerContainer.removeClass("hide");
    qIndex = 0;
    startQuiz();
}

function startQuiz() {
    username = prompt("enter username");

    function quizTimer() {
        document.getElementById('timer').innerHTML = timer;
        timer--;
        if (timer < 0) {
          document.getElementById("timer-container").innerHTML = "Time's up!";
        }
        else {
          setTimeout(quizTimer, 1000);
        }
      }
    quizTimer()
    console.log("starting...");
    startSection.addClass("hide");
    highscores.addClass("hide");
    quizSection.removeClass("hide");
    qIndex = 0;
    console.log(qIndex);
    displayQuestion(qIndex);
    

}

function displayQuestion(qIndex) {
    console.log(typeof qIndex)
    
    var title = questions[qIndex]['title'];
    questionH3.text(title);
    quizStatus = questions[qIndex]['number'];
    localStorage.setItem("quizStatus", quizStatus);
    // list out answers in child divs
    $.each(questions[qIndex].choices, function (i, choice) { 
        // console.log(choice);
        var aClass = 'a' + (i+1);
        answerDiv.append("<div class='box " + aClass + "'>"+ choice+ "</div>");
    });
    checkAnswer(questions[qIndex]);
}


// When an answer is clicked
function checkAnswer(question) {

    // listen for answer
    answerDiv.delegate(".box", "click", function() {
        var selected = $( this ).text()
        // $( this ).addClass("clicked");
        console.log(selected);
        answerDiv.off();
        // Is answer correct?
        var result = "";
        if (selected === question.answer) {
            result = "Correct!";
            timer += 5;
            userScore += 4

            $( this ).addClass("correct");

            console.log(true);
            
        } else {
            result = "Incorrect.";
            timer -= 15;
            $( this ).addClass("wrong");
            console.log(false);
            
        }
        
        resultDiv.text(result);
        resultDiv.removeClass("hide");
        nextBtn.removeClass("hide");

        // Time penalty?
        if (!result) {
            
        }
        
    });
}

// after answer is selected user goes to next question
nextBtn.on("click", nextQuestion);

function nextQuestion() {
    answerDiv.html("");
    
    qIndex++;
    if (timer < 1) {
        highscoreSection();
    } else if (qIndex > questions.length - 1) {
        timerContainer.addClass("hide");
        highscoreSection();
    } else {
        displayQuestion(qIndex);
    }
    nextBtn.addClass("hide");
    resultDiv.addClass("hide");


}

function highscoreSection() {
    scoreList.html("<h3>High Scores</h3><tr><th>Name</th><th>Score</th></tr>")
    
    currentStatus = localStorage.getItem("quizStatus");
    

    startSection.addClass("hide");
    console.log("finished");
    quizSection.addClass("hide");
    highscores.removeClass("hide");
    var list = JSON.parse(localStorage.getItem("highscoresList"));
    console.log(list);
    if (username && userScore) {
        if (timer < 1) {
            userScore = userScore + (1 * 2) * 3
        } else {
            userScore = userScore + (timer * 2) * 3
        }
        var userObject = {
            user: username,
            score: userScore
        }
        list.push(userObject);

        // sorting high scores with new score
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
        list = list.sort(scoreSort)
        console.log(list);
        list.forEach(score => {
            scoreList.append(
            "<tr><td>" + score.user + "</td><td>" + score.score + "</td></tr>")
        });
    } else {
        list.forEach(score => {
            scoreList.append(
            "<tr><td>" + score.user + "</td><td>" + score.score + "</td></tr>")
        });
    }
    
    if (currentStatus < 2) {
        restartButton.text("Take the quiz!");

    } else {
        restartButton.text("Try again!");
    }


    localStorage.setItem("highscoresList", JSON.stringify(list));

}