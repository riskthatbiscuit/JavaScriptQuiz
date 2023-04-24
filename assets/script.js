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

// Set up questions
const question1 = {
    question: "What is the correct answer?",
    options: ["a","b","c","d"],
    correctOption: 0,
}

const question2 = {
    question: "What is the correct answer to question 2?",
    options: ["a","b","c","d"],
    correctOption: 1,
}

const questions = [question1, question2];

function askQuestion(input){
    question.textContent = input.question;
    a1.textContent = input.options[0];
    a2.textContent = input.options[1];
    a3.textContent = input.options[2];
    a4.textContent = input.options[3];
}

function response(input) {
    if (input === input.correctOption) {
        alert("Well done!")
    }   else {
        alert("Too Bad")
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


function startQuiz(){
    removeStart();
    for (let i=0; i<questions.length;i++){
        askQuestion(questions[i])
    }
    alert("Quiz complete! Thanks for playing.")
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