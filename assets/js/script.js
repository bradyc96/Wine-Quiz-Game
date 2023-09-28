let startButton = document.getElementById("startBtn");
let questionContainerEl = document.getElementById("questionCard");
let questionEl = document.getElementById("question");
let answerBtnsEl = document.getElementById("answerBtns");
let currentQuestion = 0;
let score = 0;
let currentScoreEl = document.getElementById("currentScoreSpan");
let endGameEl = document.querySelector(".endGame");
let viewScoresButton = document.getElementById("scoreViewer");
let submitScoreButton = document.getElementById("scoreSaver");
let firstContainerEl = document.querySelector(".container");
let formEl = document.querySelector(".inputGroup");
let playAgainBtnEl = document.getElementById("playAgainButton");
let endScoreEl = document.getElementById("endScoreSpan");
//Sound Elements
let dingEl = document.getElementById("correctAudio");
let corkEl = document.getElementById("corkAudio");
let songEl = document.getElementById("song");
let clackEl = document.getElementById("clack");

let timeLeft = 185;
let answerBtnIndividual = document.getElementById(
    "btn1",
    "btn2",
    "btn3",
    "btn4"
);

//Saving variables
let scoreName = document.getElementById("nameInput").value;
let orderedListEL = document.getElementById("highScoreList");
let scoreGroup = [];

//Start Game button function
startButton.addEventListener("click", startGame);

function startGame() {
    startButton.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    displayQuestion(currentQuestion);
    songEl.volume = 0.6;
    songEl.play();
    corkEl.play();
    let downloadTimer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished!";
            endGame();
        } else {
            document.getElementById("countdown").innerHTML =
                timeLeft + " seconds remaining";
        }
        timeLeft -= 1;
    }, 1000);
}

//Function for choosing an answer
let chosenAnswer = document.getElementById("btn1", "btn2", "btn3", "btn4");
console.log(chosenAnswer);

function chooseAnswer(event) {
    console.log(event.target);
    let correctAnswer = questions[currentQuestion].correctAnswer;
    if (event.target.textContent == correctAnswer) {
        console.log("correct!");
        score += 50;
        currentScoreEl.textContent = score;
        //play ding
        dingEl.play();
    } else {
        console.log("wrong!");
        corkEl.play();
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        endGame();
    } else {
        displayQuestion(currentQuestion);
    }
}

//Show questions
function displayQuestion(i) {
    document.getElementById("question").textContent = questions[i].question;
    document.getElementById("btn1").textContent = questions[i].answers[0];
    document.getElementById("btn2").textContent = questions[i].answers[1];
    document.getElementById("btn3").textContent = questions[i].answers[2];
    document.getElementById("btn4").textContent = questions[i].answers[3];
}

//View High Scores function
viewScoresButton.addEventListener("click", viewScores);

function viewScores() {
    endGame();
}

//End Game Function
function endGame() {
    document.querySelector(".start").style.display = "none";
    document.querySelector("#questionCard").classList.add("hide");
    questionContainerEl.classList.add("hide");
    console.log(questionContainerEl);
    firstContainerEl.classList.add("hide");
    endGameEl.classList.remove("hide");
    timeLeft = 0;
    endScoreEl.textContent = score;
    console.log("GAME OVER");
}

//Play again function

playAgainBtnEl.addEventListener("click", playAgain);

function playAgain() {
    console.log(questionContainerEl);
    // questionContainerEl.classList.remove("hide")
    document.getElementById("countdown").innerHTML = timeLeft;
    timeLeft = 185;
    firstContainerEl.classList.remove("hide");
    endGameEl.classList.add("hide");
    currentQuestion = 0;
    currentScoreEl.textContent = 0;
    score = 0;
    startGame();
    songEl.currentTime = 0;
    formEl.style.transform = "rotate(-90deg)";
    formEl.style.marginRight = "-5%";
    formEl.style.marginBottom = "-35%";
}

//Save high scores
submitScoreButton.addEventListener("click", submittedScore);
function submittedScore() {
    corkEl.play();
    let scoreName = document.getElementById("nameInput").value;
    let currentScore = currentScoreEl.innerText;
    scoreGroup.push({
        name: scoreName,
        score: currentScore,
    });
    localStorage.setItem("highScores", JSON.stringify(scoreGroup));

    let highScoreStorage = [localStorage.getItem("highScores")];
    highScoreStorage.push(JSON.stringify(scoreGroup));
    console.log(scoreGroup);
    console.log(currentScore);

    orderedListEL.innerText = JSON.stringify(scoreGroup);

    console.log(element);
    let listItem = document.createElement("li");
    listItem.innerText = element.name + " " + element.score;
    console.log(scoreName);
}

//rotate submit form
submitScoreButton.addEventListener("mouseup", rotateForm);

function rotateForm() {
    formEl.style.transform = "rotate(28deg)";
    formEl.style.transitionDelay = "0.45s";
    formEl.style.marginRight = "5%";
    formEl.style.transitionDuration = "1.2s";
    formEl.style.marginTop = "15%";
}

//Answer button hover effect

answerBtnIndividual.addEventListener("onmouseover", playClack);
function playClack() {
    clackEl.play();
    // clackEl.volume = 4;
    console.log("clack");
}

// Question #1
let questions = [
    {
        question: "What is the volume of an average bottle of wine?",
        answers: ["500mL", "750mL", "1000mL", "1 Gallon"],
        correctAnswer: "750mL",
    },
    //Question 2
    {
        question:
            "What are the five red varietals grown in the Bordeaux region?",
        answers: [
            "Pinot Noir, Syrah, Cabernet Franc, Tempranillo, and Grenache",
            "Cabernet Sauvignon,  Cabernet Franc, Semillon, Merlot, and Sangiovese",
            "Cabernet Sauvignon, Sangiovese, Merlot, Mouvedre, and Gewürztraminer",
            "Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, and Malbec",
        ],
        correctAnswer:
            "Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, and Malbec",
    },
    //Question 3
    {
        question: "What are tannins?",
        answers: [
            "The legs found in red wine",
            "Oak used in the wine making process",
            "Chemical substances that make up alcohol",
            "Chemical compounds found in all plant matter",
        ],
        correctAnswer: "Chemical compounds found in all plant matter",
    },
    //Question 4
    {
        question: "What is the purpose of swirling a wine glass?",
        answers: [
            "Breaks down natural sugars, lowering the wine's bitterness",
            "Breaks down alcohol",
            "Oxiginates the wine, seperating aromas and enriching taste",
            "To look really cool",
        ],
        correctAnswer:
            "Oxiginates the wine, seperating aromas and enriching taste",
    },
    //Question 5
    {
        question: "What is an example of high tannin content?",
        answers: [
            "Long steeped tea",
            "The burn from strong whiskey",
            "A dry wine",
            "Sugary coating from sweets",
        ],
        correctAnswer: "Long steeped tea",
    },
    //Question 6
    {
        question: "What is a 'corked' wine?",
        answers: [
            "Wine that has been opened for too long and has gone bad",
            "Wine corks with a chemical compound called TCA that taints the bottle",
            "Overfermented wine leaving a foul aroma and taste",
            "Any wine that doesn't taste good",
        ],
        correctAnswer:
            "Wine corks with a chemical compound called TCA that taints the bottle",
    },
    //Question 7
    {
        question:
            "What is the name of the method of growing grapes that takes into account the phases of the moon and commonly includes burrying cow horns in the vinyard?",
        answers: [
            "Biodynamic farming",
            "Lunar viticulture",
            "Cosmic viticulture",
            "Khonsu Oenology",
        ],
        correctAnswer: "Biodynamic farming",
    },
    //Question 8
    {
        question: "What is sparkling wine in Spain called?",
        answers: ["Sekt", "Champagne", "Cava", "Prosecco"],
        correctAnswer: "Cava",
    },
    //Question 9
    {
        question: "How many gallons does the standard wine barrel contain?",
        answers: ["15", "30", "60", "100"],
        correctAnswer: "60",
    },
    //Question 10
    {
        question: "What is malolactic fermentation?",
        answers: [
            "Process in winemaking for converting wine into alcohol",
            "Process in winemaking for bottling",
            "Process in winemaking for siphoning wines from one tank or barrel to the next in hopes of leaving the precipitates and solids called pomace in the bottom of the tank",
            "Process in winemaking where tart malic acid from grape must is converted to softer and creamier latic acid",
        ],
        correctAnswer:
            "Process in winemaking where tart malic acid from grape must is converted to softer and creamier latic acid",
    },
    //Question 11
    {
        question: "Where is champagne made?",
        answers: ["France", "Italy", "America", "All of the above"],
        correctAnswer: "France",
    },
    //Question 12
    {
        question: "Where is prosecco made?",
        answers: ["France", "Italy", "America", "All of the above"],
        correctAnswer: "Italy",
    },
    //Question 13
    {
        question: "Malbec originated in which country?",
        answers: ["France", "Italy", "Austria", "Spain"],
        correctAnswer: "France",
    },
    //Question 14
    {
        question: "Insert question 14 (?)",
        answers: ["a", "b", "c", "d"],
        correctAnswer: "b",
    },

    {
        question: "Insert question 15 (?)",
        answers: ["a", "b", "c", "d"],
        correctAnswer: "b",
    },
];
