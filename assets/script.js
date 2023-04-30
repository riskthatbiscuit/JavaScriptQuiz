// Have start screen with rules & button to start the quiz

// Add arrays of questions & answers
const submit = document.querySelector("#submit");
const highscores = document.querySelector("#highscores");
const description = document.querySelector("#description");
const questionText = document.querySelector("#question")
var questionList = document.querySelector("#questionList");
var timerEl = document.getElementById('timeleft');
var responseMsg = document.querySelector("#response");


let highScore = localStorage.getItem("highscore");
let highScoreInitial = localStorage.getItem("highscoreInit");
let timeLeft = localStorage.getItem("timerCount");
let questionRef = localStorage.getItem("questionRef");


// Set up questions
const question1 = {
  question: "What is the output of the following code snippet?\nconsole.log(typeof null);",
  options: ["A) 'object'", "B) 'null'", "C) 'undefined'", "D) 'number'"],
  correctOption: 0,
}

const question2 = {
  question: "Which of the following is a higher-order function in Javascript?",
  options: ["A) Array.map()", "B) Array.join()", "C) Array.filter()", "D) Array.reduce()"],
  correctOption: 3,
}

const question3 = {
  question: "What does the 'this' keyword refer to in Javascript?",
  options: ["A) The function in which it is used", "B) The global object", "C) The object that the function is a method of", "D) The first argument passed to a function"],
  correctOption: 2,
}

const question4 = {
  question: "Which of the following is not a valid way to create a new object in Javascript?",
  options: ["A) Object.create()", "B) new Object()", "C) {} (Object literal)", "D) Object.make()"],
  correctOption: 3,
}

const questions = [question1, question2, question3, question4];

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
    timerEl.style.display = "none";
    responseMsg.textContent = "";
    question.textContent = "";
    questionList.innerHTML = "";
}

// Starting Quiz

function startQuiz(){
    removeStart();
    startTimer();
    questionRef = 0;
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

function startTimer(timeLeft = startingTime) {
    timerEl.textContent = "Time Left: " + timeLeft;
    timerEl.style.display = "block";
    var timeInterval = setInterval(function () {
        if (ongoing === "No") {
            clearInterval(timeInterval);
        }   else if (timeLeft > 0) {
            timerEl.textContent = "Time Left: " + timeLeft;
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
        responseMsg.textContent = "Last question was Correct!";
    }   else {
        responseMsg.textContent = "Last question was Incorrect!";
        timeLeft = timeLeft-timePenalty;
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
    timerEl.style.display = "none";
    showStart();
    addHighScore();
    ongoing = "No";
}

function addHighScore() {
    if (highScore === null || timeLeft > highScore) {
        const initials = prompt("Enter your initials for the new high score!");
        highScore = timeLeft;
        highScoreInitial = initials;
    } else {
        alert("You didn't get the new high score, better luck next time!")
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