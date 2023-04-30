// Have start screen with rules & button to start the quiz

// Add arrays of questions & answers
const submit = document.querySelector("#submit");
const highscores = document.querySelector("#highscores");
const description = document.querySelector("#description");
const questionText = document.querySelector("#question")
var questionList = document.querySelector("#questionList");
var timerEl = document.getElementById('timeleft');
var responseMsg = document.querySelector("#response");

// Set variables to be stored locally
let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
let timeLeft = localStorage.getItem("timerCount");
let questionRef = localStorage.getItem("questionRef");

// Quiz Constraints
var startingTime = 50;
var timePenalty = 10;
var ongoing = "no"

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

// Set up initial page
function showStart(){
    description.style.display = "block";
    description.innerHTML = "Welcome to JS Quiz! <br><br>This is a game where you have to answer as many JavaScript questions as you can before the time runs out. Each question will have four possible answers, and you have to choose the correct one.<br><br>For each incorrect answer, " + timePenalty + " seconds will be deducted from the remaining time. The game ends when all questions are answered or the timer reaches zero.<br><br>You will start with " + startingTime + " seconds. Your final score is number of seconds remaining on the timer.<br><br>Your score will be displayed on the screen at the end of the game, and if you achieve one of the top 5 high scores, your name and score will be added to the leaderboard.<br><br>Good luck, and have fun!";
    submit.style.display = "block";
    submit.textContent = "Start";
    timerEl.style.display = "none";
    responseMsg.textContent = "";
    question.textContent = "";
    questionList.innerHTML = "";
}

// ---- Starting Quiz ----
// StartQuiz removes initial text, starts timer and posts the first question
function startQuiz(){
    removeStart();
    timeLeft = startingTime;
    startTimer();
    questionRef = 0;
    ongoing = "Yes"
    renderQuestion();
}
// removes the initial text
function removeStart(){
    submit.style.display = "none";
    description.style.display = "none";
}
// Posts the first question
function renderQuestion(){
    var question = questions[questionRef]
    questionText.textContent = question.question;
    questionList.innerHTML = "";
    // Loop through each of the questions in questions array
    for (var i = 0; i <question.options.length; i++) {
        var quest = question.options[i];
        // Create list for answers under quesiton
        var li = document.createElement("li");
        li.textContent = quest;
        li.setAttribute("data-index",i);
        // Create buttons for each answer
        var button = document.createElement("button");
        button.textContent = (i+1);
        
        li.appendChild(button);
        questionList.appendChild(li);
    }
}
// Starts the timer
function startTimer() {
    // Show timer in top right
    timerEl.textContent = "Time Left: " + timeLeft;
    timerEl.style.display = "block";
    // Start countdown & set rules for when to break
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
// ---- Operating the Quiz----
// Recieving a response
function response(input) {
    // Determining and printing outcome as well as reducing time left if incorrect score
    if (input == questions[questionRef].correctOption) {
        responseMsg.textContent = "Last question was Correct!";
    }   else {
        responseMsg.textContent = "Last question was Incorrect!";
        timeLeft = timeLeft-timePenalty;
    }
    // Determining if end of quiz or moving to next question
    if (questionRef === questions.length-1) {
        endQuiz()
    }   else {
        questionRef++;
        renderQuestion();
    }
}
// Setting rules if timer runs out
function incomplete() {
    alert('You ran out of time!');
    endQuiz();
}

// ---- Ending Quiz & Loading High Scores ----
// At the end of the quiz, the questions are no longer shown, landing page re-shown, highscore added.
function endQuiz() {
    timerEl.style.display = "none";
    showStart();
    addHighScore();
    ongoing = "No";
}
// Adding a new high score to the locally stored array of HighScores
function addHighScore() {
    const score = timeLeft;
    const initials = prompt("Enter your initials for the new high score of " + score + "!");
    const newScore = { initials, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
    localStorage.setItem("highscores", JSON.stringify(highScores));
}

// Adding funciton to show HighScores if button pressed
function showHighScores(){
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    let message = "Top 5 High Scores:\n";
    highScores.forEach((score, index) => {
        message += `${index + 1}. ${score.initials}: ${score.score}\n`;
    });
    alert(message);
}

// ---- Add Listening Events for buttons ----
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