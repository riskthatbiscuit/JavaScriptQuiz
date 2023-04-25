// Have start screen with rules & button to start the quiz

// Add arrays of questions & answers
const submit = document.querySelector("#submit");
const highscores = document.querySelector("#highscores");
const description = document.querySelector("#description");
const questionText = document.querySelector("#question")
var questionList = document.querySelector("#questionList");
var timerEl = document.getElementById('timeleft');

let highScore = localStorage.getItem("highscore");
let highScoreInitial = localStorage.getItem("highscoreInit")
let timeLeft = localStorage.getItem("timerCount")
let questionRef = localStorage.getItem("questionRef")

// Set up questions
const question1 = {
    question: "What is the correct answer?",
    options: ["1a","1b","1c","1d"],
    correctOption: 0,
}

const question2 = {
    question: "What is the correct answer to question 2?",
    options: ["2a","2b","2c","2d"],
    correctOption: 3,
}

const questions = [question1, question2];

// Quiz Constraints
var startingTime = 50;
var timePenalty = 10;
var ongoing = "no"

// Set up initial page

function showStart(){
    description.style.display = "block";
    description.textContent = "Welcome to the quiz! Please press Start to begin.";
    submit.style.display = "block";
    submit.textContent = "Start";
    question.textContent = "";
    questionList.innerHTML = "";
}

// Starting Quiz

function startQuiz(){
    removeStart();
    startTimer();
    questionRef = 0;
    timeLeft = startingTime;
    ongoing = "Yes"
    renderQuestion();
}

function removeStart(){
    submit.style.display = "none";
    description.style.display = "none";
}
function renderQuestion(){
    var question = questions[questionRef]
    questionText.textContent = question.question;

    questionList.innerHTML = "";
    for (var i = 0; i <question.options.length; i++) {
        var quest = question.options[i];
        
        var li = document.createElement("li");
        li.textContent = quest;
        li.setAttribute("data-index",i);

        var button = document.createElement("button");
        button.textContent = (i+1);

        li.appendChild(button);
        questionList.appendChild(li);
    }
}

function startTimer() {
    var timeInterval = setInterval(function () {
        if (ongoing === "No") {
            clearInterval(timeInterval);
        }   else if (timeLeft > 0) {
            console.log(timeLeft)
            timerEl.textContent = timeLeft;
            timeLeft--;
        }   else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            incomplete();
        }
    },1000);
}
// Operating the Quiz
function response(input) {
    if (input == questions[questionRef].correctOption) {
    }   else {
        incorrectAnswer();
    }

    if (questionRef === questions.length-1) {
        let score = timeLeft;
        endQuiz()
    }   else {
        questionRef++;
        renderQuestion();
    }
}

function incorrectAnswer () {
    timeLeft = timeLeft-timePenalty;
}

function incomplete() {
    alert('You ran out of time!');
    endQuiz();
}

// Ending Quiz & Loading High Scores
function endQuiz() {
    addHighScore();
    showStart();
    ongoing = "No";
}

function addHighScore() {
    if (highScore === null || timeLeft > highScore) {
        const initials = prompt("Enter your initials for the new high score!");
        highScore = timeLeft;
        highScoreInitial = initials;
    }
}

function showHighScores(){
    alert("The highest score so far is " + highScore + " by " + highScoreInitial)
}

// Add Listening Events for buttons
submit.addEventListener("click", startQuiz);

highscores.addEventListener("click", showHighScores)

questionList.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    response(index)
  }
});

showStart()