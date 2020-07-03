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


var quizStatus = localStorage.getItem("quizStatus")

// Landing section
var startButton = $("#start");
var quizSection = $("#quiz");
var startSection = $("#landing-container")
startButton.on("click", startQuiz);



// When user clicks start quiz
var answerDiv = $("#answers");
var questionH3 = $("#question");

function startQuiz() {
    console.log("starting...");
    startSection.addClass("hide");
    quizSection.removeClass("hide");
    displayQuestion();

}

function displayQuestion() {
questions.forEach(question => {
    var title = question.title;
    questionH3.text(title);
    quizStatus = question.number;
    localStorage.setItem("quizStatus", quizStatus);
    answerDiv.html("");
    userChoice(question);
    // nextQuestion();
    
    
});
}

// userChoice(questions[0]);

// When an answer is clicked
function userChoice(currentQ) {
    // list out answers in child divs
    $.each(currentQ.choices, function (i, choice) { 
        console.log(choice);
        var aClass = 'a' + (i+1);
        answerDiv.append("<div class='box " + aClass + "'>"+ choice+ "</div>");
        
        
    });
    // listen for answer
    answerDiv.delegate(".box", "click", function() {
        var selected = $( this ).text()
        $( this ).addClass("clicked");
        console.log(selected);
        answerDiv.off();
        // Is answer correct?
        var result = "";
        if (selected === currentQ.answer) {
            result = true;
            console.log(true);
            
        } else {
            result = false;
            console.log(false);
            
        }
        var resultDiv = $("#result");
        var nextBtn = $("#next-btn");
        resultDiv.text(result);
        resultDiv.removeClass("hide");
        nextBtn.removeClass("hide");

        // Time penalty?
        if (!result) {
            
        }
        
    });
}

// after answer is selected user goes to next question
function nextQuestion() {


}

function answerSelected() {
    
}