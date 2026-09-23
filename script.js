javascript
/* =========================================================
   MATHPLAY - COMPLETE WORKING GAME ENGINE
   5 Games for Young Math Learners
========================================================= */

let currentGame = "";
let score = 0;
let lives = 3;
let questionIndex = 0;
let timer = 30;
let timerInterval = null;
let currentCorrectAnswer = null;
let questions = [];


/* =========================================================
   BASIC PAGE FUNCTIONS
========================================================= */

function scrollToGames() {
    const games = document.getElementById("games");

    if (games) {
        games.scrollIntoView({
            behavior: "smooth"
        });
    }
}


function showHome() {
    exitGame();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showHowItWorks() {
    const modal = document.getElementById("howModal");

    if (modal) {
        modal.classList.remove("hidden");
    }
}


function closeHow() {
    const modal = document.getElementById("howModal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


/* =========================================================
   START GAME
========================================================= */

function startGame(game) {

    currentGame = game;

    score = 0;
    lives = 3;
    questionIndex = 0;
    timer = 30;

    clearInterval(timerInterval);

    questions = createQuestions(game);

    /* Hide website sections */

    const hero = document.querySelector(".hero");
    const games = document.getElementById("games");
    const skills = document.getElementById("skills");
    const about = document.getElementById("about");

    if (hero) hero.classList.add("hidden");
    if (games) games.classList.add("hidden");
    if (skills) skills.classList.add("hidden");
    if (about) about.classList.add("hidden");


    /* Show game */

    const gameScreen =
        document.getElementById("gameScreen");

    const resultScreen =
        document.getElementById("resultScreen");

    if (gameScreen) {
        gameScreen.classList.remove("hidden");
    }

    if (resultScreen) {
        resultScreen.classList.add("hidden");
    }


    updateGameTitle();
    updateStats();
    showQuestion();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    startTimer();
}


/* =========================================================
   GAME TITLES
========================================================= */

function updateGameTitle() {

    const titles = {
        blaster: "🚀 Math Blaster",
        ninja: "🥷 Number Ninja",
        tables: "✖️ Times Table Challenge",
        memory: "🧠 Math Memory",
        shapes: "🔷 Shape & Number Quest"
    };

    const title =
        document.getElementById("gameTitle");

    if (title) {
        title.textContent =
            titles[currentGame] || "Math Game";
    }
}


/* =========================================================
   CREATE QUESTIONS
========================================================= */

function createQuestions(game) {

    let list = [];


    /* -----------------------------------------------------
       GAME 1 - MATH BLASTER
    ----------------------------------------------------- */

    if (game === "blaster") {

        for (let i = 0; i < 10; i++) {

            const operationNumber =
                randomNumber(1, 3);

            let a;
            let b;
            let answer;
            let symbol;


            if (operationNumber === 1) {

                a = randomNumber(1, 30);
                b = randomNumber(1, 30);

                answer = a + b;
                symbol = "+";

            }

            else if (operationNumber === 2) {

                a = randomNumber(10, 40);
                b = randomNumber(1, a);

                answer = a - b;
                symbol = "−";

            }

            else {

                a = randomNumber(2, 12);
                b = randomNumber(2, 12);

                answer = a * b;
                symbol = "×";

            }


            list.push({
                question: `${a} ${symbol} ${b} = ?`,
                answer: answer
            });

        }
    }


    /* -----------------------------------------------------
       GAME 2 - NUMBER NINJA
    ----------------------------------------------------- */

    if (game === "ninja") {

        for (let i = 0; i < 10; i++) {

            const correct =
                randomNumber(1, 100);

            list.push({
                question:
                    `Which number is ${correct}?`,
                answer: correct
            });

        }
    }


    /* -----------------------------------------------------
       GAME 3 - TIMES TABLE CHALLENGE
    ----------------------------------------------------- */

    if (game === "tables") {

        for (let i = 0; i < 10; i++) {

            const a = randomNumber(2, 12);
            const b = randomNumber(2, 12);

            list.push({
                question: `${a} × ${b} = ?`,
                answer: a * b
            });

        }
    }


    /* -----------------------------------------------------
       GAME 4 - MATH MEMORY
    ----------------------------------------------------- */

    if (game === "memory") {

        list = [

            {
                question: "5 + 5 = ?",
                answer: 10
            },

            {
                question: "6 + 4 = ?",
                answer: 10
            },

            {
                question: "3 × 3 = ?",
                answer: 9
            },

            {
                question: "12 − 5 = ?",
                answer: 7
            },

            {
                question: "4 × 2 = ?",
                answer: 8
            },

            {
                question: "20 ÷ 4 = ?",
                answer: 5
            },

            {
                question: "7 + 8 = ?",
                answer: 15
            },

            {
                question: "10 − 3 = ?",
                answer: 7
            },

            {
                question: "5 × 2 = ?",
                answer: 10
            },

            {
                question: "18 ÷ 3 = ?",
                answer: 6
            }

        ];
    }


    /* -----------------------------------------------------
       GAME 5 - SHAPE & NUMBER QUEST
    ----------------------------------------------------- */

    if (game === "shapes") {

        list = [

            {
                question:
                    "How many sides does a triangle have?",
                answer: 3
            },

            {
                question:
                    "How many sides does a square have?",
                answer: 4
            },

            {
                question:
                    "How many sides does a pentagon have?",
                answer: 5
            },

            {
                question:
                    "How many sides does a hexagon have?",
                answer: 6
            },

            {
                question:
                    "How many sides does a rectangle have?",
                answer: 4
            },

            {
                question:
                    "How many corners does a triangle have?",
                answer: 3
            },

            {
                question:
                    "How many sides does an octagon have?",
                answer: 8
            },

            {
                question:
                    "How many sides does a circle have?",
                answer: 0
            },

            {
                question:
                    "How many sides does a quadrilateral have?",
                answer: 4
            },

            {
                question:
                    "How many sides does a heptagon have?",
                answer: 7
            }

        ];
    }


    return shuffle(list);
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    /* If all questions are finished */

    if (questionIndex >= questions.length) {

        finishGame();

        return;
    }


    const current =
        questions[questionIndex];

    currentCorrectAnswer =
        current.answer;


    /* Question number */

    const questionNumber =
        document.getElementById("questionNumber");

    if (questionNumber) {

        questionNumber.textContent =
            `Question ${questionIndex + 1} of ${questions.length}`;

    }


    /* Progress */

    const progressBar =
        document.getElementById("progressBar");

    if (progressBar) {

        const progress =
            (questionIndex / questions.length) * 100;

        progressBar.style.width =
            `${progress}%`;
    }


    /* Question area */

    const questionArea =
        document.getElementById("questionArea");

    if (!questionArea) {
        return;
    }


    questionArea.innerHTML = `

        <div class="question">
            ${current.question}
        </div>

        <div class="answers" id="answers"></div>

    `;


    const answers =
        document.getElementById("answers");

    if (!answers) {
        return;
    }


    /* Create answer choices */

    const choices =
        generateChoices(current.answer);


    choices.forEach(function(answer) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "answer-btn";

        button.textContent =
            answer;


        button.addEventListener(
            "click",
            function() {

                checkAnswer(
                    answer,
                    button
                );

            }
        );


        answers.appendChild(button);

    });


    updateStats();
}


/* =========================================================
   CREATE FOUR ANSWERS
========================================================= */

function generateChoices(correct) {

    const choices =
        new Set();

    choices.add(correct);


    while (choices.size < 4) {

        let variation;


        if (correct <= 10) {

            variation =
                correct +
                randomNumber(-4, 5);

        }

        else {

            variation =
                correct +
                randomNumber(-10, 10);

        }


        if (variation >= 0) {

            choices.add(variation);

        }

    }


    return shuffle(
        Array.from(choices)
    );
}


/* =========================================================
   CHECK ANSWER
========================================================= */

function checkAnswer(answer, clickedButton) {

    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    /* Prevent multiple clicks */

    buttons.forEach(function(button) {

        button.disabled = true;

    });


    const isCorrect =
        Number(answer) ===
        Number(currentCorrectAnswer);


    if (isCorrect) {

        clickedButton.classList.add(
            "correct"
        );

        score += 10;

        playSound(true);

    }

    else {

        clickedButton.classList.add(
            "wrong"
        );

        lives--;

        playSound(false);


        /* Show correct answer */

        buttons.forEach(function(button) {

            if (
                Number(button.textContent) ===
                Number(currentCorrectAnswer)
            ) {

                button.classList.add(
                    "correct"
                );

            }

        });


        if (lives <= 0) {

            updateStats();

            setTimeout(
                finishGame,
                900
            );

            return;
        }

    }


    updateStats();


    /* Move to next question */

    questionIndex++;


    setTimeout(
        showQuestion,
        750
    );
}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    clearInterval(timerInterval);

    timer = 30;

    updateTimer();


    timerInterval =
        setInterval(function() {

            timer--;

            updateTimer();


            if (timer <= 0) {

                clearInterval(
                    timerInterval
                );


                lives--;

                updateStats();


                if (lives <= 0) {

                    finishGame();

                    return;
                }


                /* Move to next question */

                questionIndex++;

                timer = 30;

                showQuestion();

                startTimer();

            }

        }, 1000);
}


function updateTimer() {

    const timerElement =
        document.getElementById("timer");

    if (timerElement) {

        timerElement.textContent =
            timer;
    }
}


/* =========================================================
   UPDATE SCORE / LIVES
========================================================= */

function updateStats() {

    const scoreElement =
        document.getElementById("score");

    const livesElement =
        document.getElementById("lives");


    if (scoreElement) {

        scoreElement.textContent =
            score;
    }


    if (livesElement) {

        livesElement.textContent =
            lives;
    }


    updateTimer();
}


/* =========================================================
   FINISH GAME
========================================================= */

function finishGame() {

    clearInterval(timerInterval);


    const gameScreen =
        document.getElementById("gameScreen");

    const resultScreen =
        document.getElementById("resultScreen");


    if (gameScreen) {

        gameScreen.classList.add(
            "hidden"
        );

    }


    if (resultScreen) {

        resultScreen.classList.remove(
            "hidden"
        );

    }


    const finalScore =
        document.getElementById("finalScore");


    if (finalScore) {

        finalScore.textContent =
            score;

    }


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    if (resultMessage) {

        if (score >= 90) {

            resultMessage.textContent =
                "🌟 Amazing! Your math skills are getting stronger!";

        }

        else if (score >= 70) {

            resultMessage.textContent =
                "🎉 Great work! Keep practicing!";

        }

        else if (score >= 40) {

            resultMessage.textContent =
                "👍 Good effort! Try again and beat your score!";

        }

        else {

            resultMessage.textContent =
                "💪 Keep practicing. You can improve every time you play!";

        }

    }


    saveHighScore();
}


/* =========================================================
   RESTART GAME
========================================================= */

function restartGame() {

    const resultScreen =
        document.getElementById("resultScreen");

    if (resultScreen) {

        resultScreen.classList.add(
            "hidden"
        );

    }


    startGame(currentGame);
}


/* =========================================================
   EXIT GAME
========================================================= */

function exitGame() {

    clearInterval(timerInterval);


    const gameScreen =
        document.getElementById("gameScreen");

    const resultScreen =
        document.getElementById("resultScreen");


    if (gameScreen) {

        gameScreen.classList.add(
            "hidden"
        );

    }


    if (resultScreen) {

        resultScreen.classList.add(
            "hidden"
        );

    }


    /* Bring normal website back */

    const hero =
        document.querySelector(".hero");

    const games =
        document.getElementById("games");

    const skills =
        document.getElementById("skills");

    const about =
        document.getElementById("about");


    if (hero) {
        hero.classList.remove("hidden");
    }

    if (games) {
        games.classList.remove("hidden");
    }

    if (skills) {
        skills.classList.remove("hidden");
    }

    if (about) {
        about.classList.remove("hidden");
    }
}


/* =========================================================
   HIGH SCORE
========================================================= */

function saveHighScore() {

    try {

        const key =
            `mathplay_${currentGame}_highscore`;

        const oldScore =
            Number(
                localStorage.getItem(key) || 0
            );


        if (score > oldScore) {

            localStorage.setItem(
                key,
                score
            );

        }

    }

    catch (error) {

        /* Local storage may be unavailable.
           The game still works. */

    }
}


/* =========================================================
   SOUND EFFECT
========================================================= */

function playSound(correct) {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        const context =
            new AudioContext();


        const oscillator =
            context.createOscillator();


        const gain =
            context.createGain();


        oscillator.connect(gain);

        gain.connect(
            context.destination
        );


        oscillator.frequency.value =
            correct ? 700 : 180;


        gain.gain.setValueAtTime(
            0.12,
            context.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.15
        );


        oscillator.start();


        oscillator.stop(
            context.currentTime + 0.15
        );

    }

    catch (error) {

        /* Sound is optional. */

    }
}


/* =========================================================
   RANDOM NUMBER
========================================================= */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const result =
        [...array];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }


    return result;
}


/* =========================================================
   SAFETY CHECK
========================================================= */

console.log(
    "🧮 MathPlay game engine loaded successfully!"
);
