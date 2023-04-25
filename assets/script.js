// Have start screen with rules & button to start the quiz

// Add arrays of questions & answers
const submit = document.querySelector("#submit");
const highscores = document.querySelector("#highscores");
const description = document.querySelector("#description");
const question = document.querySelector("#question")
const a1 = document.querySelector("#a1");
const a2 = document.querySelector("#a2");
const a3 = document.querySelector("#a3");
const a4 = document.querySelector("#a4");
var timerEl = document.getElementById('timeleft');

let highScore = localStorage.getItem("highscore");
let timeLeft = localStorage.getItem("timerCount")

// Set up questions
const question1 = {
    question: "What is the correct answer?",
    options: ["1a","1b","1c","1d"],
    correctOption: 0,
}

const question2 = {
    question: "What is the correct answer to question 2?",
    options: ["2a","2b","2c","2d"],
    correctOption: 1,
}

const questions = [question1, question2];

function renderQuestion(input){
    question.textContent = input.question;
    a1.textContent = input.options[0];
    a2.textContent = input.options[1];
    a3.textContent = input.options[2];
    a4.textContent = input.options[3];
}

function response(input) {
    if (input === question1.correctOption) {
        alert("Well done!")
    }   else {
        alert("Too Bad")
        incorrectAnswer()

    }
}

function showStart(){
    description.textContent = "Welcome to the quiz! Please press Start to begin.";
    submit.textContent = "Start";
}

function removeStart(){
    description.textContent = "";
    submit.textContent = "";
}

function startTimer() {
    timeLeft = 40;

    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }   else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            incomplete();
        }
    },1000);
}

function incorrectAnswer () {
    timeLeft = timeLeft-5;
}

function incomplete() {
    alert('You ran out of time!')
}

function startQuiz(){
    removeStart();
    startTimer();
    renderQuestion(question1);
    // for (let i=0; i<questions.length;i++){
    //     renderQuestion(questions[i])
    //     setTimeout(function() { wonderfulFunction(i) }, 2000);
    // }
    // alert("Quiz complete! Thanks for playing.")
}

// function showhighscores(){
//     alert("Show me the high scores!")
// }

submit.addEventListener("click", startQuiz);
a1.addEventListener("click", function() { response(0) });
a2.addEventListener("click", function() { response(1) });
a3.addEventListener("click", function() { response(2) });
a4.addEventListener("click", function() { response(3) }); 
// highscores.addEventListener("click", showhighscores);