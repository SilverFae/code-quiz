
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameOver = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizBtn = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("highscorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscoreInitials");
var endGameBtn = document.getElementById("endGameBtn");
var submitScoreBtn = document.getElementById("submitScore");
var displayScore = document.getElementById("highscoreScore");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");

// Quiz question variable
var quizQuestions = [{
    question: "What does CSS (in programming) stand for?",
    choiceA: "Counter Strike Stream",
    choiceB: "Chicken Salad Sandwich",
    choiceC: "Casscading Style Sheet",
    choiceD: "All of the above",
    correctAnswer: "c"
},
{
    question: "What is the definition of an if else statement?",
    choiceA: "executes a block of code if a specified condition is true. If the condition is false, another block of code can be executed.",
    choiceB: "creates a loop that executes a specified statement as long as the test condition evaluates to true",
    choiceC: "Prints out a string onto a console log.",
    choiceD: "Creates a special variable, which can hold more than one value",
    correctAnswer: "a"
},
{
    question: "What line of code do we need to implement flexbox?",
    choiceA: "Display: direction",
    choiceB: "Display: flex",
    choiceC: "flex: display",
    choiceD: "direction: display",
    correctAnswer: "b"
},
{
    question: "What language is most promenently used to style a webpage?",
    choiceA: "C#",
    choiceB: "HTML",
    choiceC: "JavaScript",
    choiceD: "CSS",
    correctAnswer: "d"
},
];
// creating other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

//this function allows the code to cycle throught the array that contains the querstions so it may generate the question and answer.
function generateQuizQuestion() {
    gameOver.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.choiceA;
    btnB.innerHTML = currentQuestion.choiceB;
    btnC.innerHTML = currentQuestion.choiceC;
    btnD.innerHTML = currentQuestion.choiceD;
};

//this starts the quiz, timer, as displays the first question on the screen hiding the start button
function startQuiz() {
    gameOver.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
//the function shows the score once the quiz is over (if its fully completed or time ran out)
function showScore() {
    quizBody.style.display = "none"
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}



//added eventListener to make submit button work, this also saves high score within local storage
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameOver.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtn.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});


//generates a new highscore list
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    displayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        displayScore.appendChild(newScoreSpan);
    }
}

// displays highscore page
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameOver.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtn.style.display = "flex";

    generateHighscores();
}

// clears highscores from local storage clearing it from page
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    displayScore.textContent = "";
}

//allows us to restart the quiz!
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameOver.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
}

// checking the response to each answer
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display if the answer is correct
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display if the answer is wrong
    } else {
        showScore();
    }
}

// This button starts the quiz!
startQuizBtn.addEventListener("click", startQuiz);