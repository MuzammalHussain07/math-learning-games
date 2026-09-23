/* =========================================================
   MATHPLAY - WORKING GAME ENGINE
========================================================= */

window.MathPlay = {
    game: "",
    score: 0,
    lives: 3,
    question: 0,
    timer: 30,
    timerInterval: null,
    correctAnswer: null,
    questions: []
};


/* =========================================================
   START GAME
========================================================= */

window.startGame = function(gameName) {

    window.MathPlay.game = gameName;
    window.MathPlay.score = 0;
    window.MathPlay.lives = 3;
    window.MathPlay.question = 0;
    window.MathPlay.timer = 30;

    clearInterval(window.MathPlay.timerInterval);

    window.MathPlay.questions =
        createQuestions(gameName);

    hideWebsite();

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
    showQuestion();
    startTimer();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


/* =========================================================
   HIDE NORMAL WEBSITE
========================================================= */

function hideWebsite() {

    const hero =
        document.querySelector(".hero");

    const games =
        document.getElementById("games");

    const skills =
        document.getElementById("skills");

    const about =
        document.getElementById("about");

    if (hero) hero.classList.add("hidden");
    if (games) games.classList.add("hidden");
    if (skills) skills.classList.add("hidden");
    if (about) about.classList.add("hidden");
}


/* =========================================================
   SHOW NORMAL WEBSITE
========================================================= */

window.exitGame = function() {

    clearInterval(window.MathPlay.timerInterval);

    const gameScreen =
        document.getElementById("gameScreen");

    const resultScreen =
        document.getElementById("resultScreen");

    if (gameScreen) {
        gameScreen.classList.add("hidden");
    }

    if (resultScreen) {
        resultScreen.classList.add("hidden");
    }

    const hero =
        document.querySelector(".hero");

    const games =
        document.getElementById("games");

    const skills =
        document.getElementById("skills");

    const about =
        document.getElementById("about");

    if (hero) hero.classList.remove("hidden");
    if (games) games.classList.remove("hidden");
    if (skills) skills.classList.remove("hidden");
    if (about) about.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


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
            titles[window.MathPlay.game] ||
            "Math Game";

    }
}


/* =========================================================
   CREATE QUESTIONS
========================================================= */

function createQuestions(game) {

    let list = [];


    /* =====================================================
       MATH BLASTER
    ===================================================== */

    if (game === "blaster") {

        for (let i = 0; i < 10; i++) {

            const type =
                randomNumber(1, 3);

            let a;
            let b;
            let answer;
            let symbol;


            if (type === 1) {

                a = randomNumber(1, 30);
                b = randomNumber(1, 30);

                answer = a + b;
                symbol = "+";

            }


            else if (type === 2) {

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

                question:
                    `${a} ${symbol} ${b} = ?`,

                answer: answer

            });

        }

    }


    /* =====================================================
       NUMBER NINJA
    ===================================================== */

    if (game === "ninja") {

        for (let i = 0; i < 10; i++) {

            const a =
                randomNumber(1, 100);

            const b =
                randomNumber(1, 100);

            const answer =
                Math.max(a, b);

            list.push({

                question:
                    `Which number is greater: ${a} or ${b}?`,

                answer: answer

            });

        }

    }


    /* =====================================================
       TIMES TABLES
    ===================================================== */

    if (game === "tables") {

        for (let i = 0; i < 10; i++) {

            const a =
                randomNumber(2, 12);

            const b =
                randomNumber(2, 12);

            list.push({

                question:
                    `${a} × ${b} = ?`,

                answer:
                    a * b

            });

        }

    }


    /* =====================================================
       MATH MEMORY
    ===================================================== */

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


    /* =====================================================
       SHAPE QUEST
    ===================================================== */

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

    const state =
        window.MathPlay;


    if (
        state.question >=
        state.questions.length
    ) {

        finishGame();

        return;
    }


    const current =
        state.questions[state.question];


    state.correctAnswer =
        current.answer;


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    if (questionNumber) {

        questionNumber.textContent =
            `Question ${state.question + 1} of ${state.questions.length}`;

    }


    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (progressBar) {

        const progress =
            (state.question /
                state.questions.length) *
            100;

        progressBar.style.width =
            `${progress}%`;

    }


    const questionArea =
        document.getElementById(
            "questionArea"
        );


    if (!questionArea) {
        return;
    }


    questionArea.innerHTML = `

        <div class="question">
            ${current.question}
        </div>

        <div
            class="answers"
            id="answers">
        </div>

    `;


    const answers =
        document.getElementById(
            "answers"
        );


    if (!answers) {
        return;
    }


    const choices =
        generateChoices(
            current.answer
        );


    choices.forEach(function(answer) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


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
   ANSWER OPTIONS
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
                randomNumber(-4, 4);

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

function checkAnswer(
    answer,
    clickedButton
) {

    const state =
        window.MathPlay;


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(function(button) {

        button.disabled = true;

    });


    const correct =
        Number(answer) ===
        Number(state.correctAnswer);


    if (correct) {

        clickedButton.classList.add(
            "correct"
        );

        state.score += 10;

        playSound(true);

    }

    else {

        clickedButton.classList.add(
            "wrong"
        );

        state.lives--;

        playSound(false);


        buttons.forEach(function(button) {

            if (
                Number(button.textContent) ===
                Number(state.correctAnswer)
            ) {

                button.classList.add(
                    "correct"
                );

            }

        });

    }


    updateStats();


    if (state.lives <= 0) {

        setTimeout(
            finishGame,
            800
        );

        return;
    }


    state.question++;


    clearInterval(
        state.timerInterval
    );


    setTimeout(
        function() {

            state.timer = 30;

            showQuestion();

            startTimer();

        },
        700
    );
}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    const state =
        window.MathPlay;


    clearInterval(
        state.timerInterval
    );


    state.timer = 30;

    updateTimer();


    state.timerInterval =
        setInterval(function() {

            state.timer--;

            updateTimer();


            if (state.timer <= 0) {

                clearInterval(
                    state.timerInterval
                );


                state.lives--;

                state.question++;


                updateStats();


                if (state.lives <= 0) {

                    finishGame();

                    return;
                }


                state.timer = 30;

                showQuestion();

                startTimer();

            }

        }, 1000);
}


/* =========================================================
   UPDATE TIMER
========================================================= */

function updateTimer() {

    const timer =
        document.getElementById(
            "timer"
        );


    if (timer) {

        timer.textContent =
            window.MathPlay.timer;

    }
}


/* =========================================================
   UPDATE SCORE / LIVES
========================================================= */

function updateStats() {

    const state =
        window.MathPlay;


    const score =
        document.getElementById(
            "score"
        );


    const lives =
        document.getElementById(
            "lives"
        );


    if (score) {

        score.textContent =
            state.score;

    }


    if (lives) {

        lives.textContent =
            state.lives;

    }


    updateTimer();
}


/* =========================================================
   FINISH GAME
========================================================= */

function finishGame() {

    const state =
        window.MathPlay;


    clearInterval(
        state.timerInterval
    );


    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    const resultScreen =
        document.getElementById(
            "resultScreen"
        );


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
        document.getElementById(
            "finalScore"
        );


    if (finalScore) {

        finalScore.textContent =
            state.score;

    }


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    if (resultMessage) {

        if (state.score >= 90) {

            resultMessage.textContent =
                "🌟 Amazing! Your math skills are getting stronger!";

        }

        else if (state.score >= 70) {

            resultMessage.textContent =
                "🎉 Great work! Keep practicing!";

        }

        else if (state.score >= 40) {

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
   RESTART
========================================================= */

window.restartGame = function() {

    startGame(
        window.MathPlay.game
    );
};


/* =========================================================
   HOME
========================================================= */

window.showHome = function() {

    window.exitGame();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};


/* =========================================================
   HOW IT WORKS
========================================================= */

window.showHowItWorks = function() {

    const modal =
        document.getElementById(
            "howModal"
        );

    if (modal) {

        modal.classList.remove(
            "hidden"
        );

    }
};


window.closeHow = function() {

    const modal =
        document.getElementById(
            "howModal"
        );

    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }
};


/* =========================================================
   HIGH SCORE
========================================================= */

function saveHighScore() {

    try {

        const key =
            "mathplay_" +
            window.MathPlay.game +
            "_highscore";


        const oldScore =
            Number(
                localStorage.getItem(key) || 0
            );


        if (
            window.MathPlay.score >
            oldScore
        ) {

            localStorage.setItem(
                key,
                window.MathPlay.score
            );

        }

    }

    catch (error) {

        console.log(
            "High score storage unavailable."
        );

    }
}


/* =========================================================
   SOUND
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

        console.log(
            "Sound unavailable."
        );

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
   CONFIRM JAVASCRIPT LOADED
========================================================= */

console.log(
    "✅ MathPlay JavaScript loaded successfully!"
);
