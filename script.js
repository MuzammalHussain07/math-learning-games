javascript
let currentGame = "";
let score = 0;
let lives = 3;
let questionIndex = 0;
let timer = 30;
let timerInterval = null;
let currentCorrectAnswer = null;
let questions = [];


/* ================================
   GENERAL FUNCTIONS
================================ */

function scrollToGames() {
  document.getElementById("games").scrollIntoView({
    behavior: "smooth"
  });
}


function showHome() {

  exitGame();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function showHowItWorks() {

  document.getElementById("howModal")
    .classList.remove("hidden");

}


function closeHow() {

  document.getElementById("howModal")
    .classList.add("hidden");

}


/* ================================
   START GAME
================================ */

function startGame(game) {

  currentGame = game;

  score = 0;
  lives = 3;
  questionIndex = 0;

  clearInterval(timerInterval);

  document.getElementById("games")
    .classList.add("hidden");

  document.getElementById("skills")
    .classList.add("hidden");

  document.getElementById("about")
    .classList.add("hidden");

  document.querySelector(".hero")
    .classList.add("hidden");

  document.getElementById("gameScreen")
    .classList.remove("hidden");

  document.getElementById("resultScreen")
    .classList.add("hidden");


  questions = createQuestions(game);

  updateGameTitle();

  startTimer();

  showQuestion();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ================================
   GAME TITLES
================================ */

function updateGameTitle() {

  const titles = {

    blaster: "🚀 Math Blaster",

    ninja: "🥷 Number Ninja",

    tables: "✖️ Times Table Challenge",

    memory: "🧠 Math Memory",

    shapes: "🔷 Shape & Number Quest"

  };

  document.getElementById("gameTitle")
    .textContent = titles[currentGame];

}


/* ================================
   QUESTION CREATION
================================ */

function createQuestions(game) {

  let list = [];

  if (game === "blaster") {

    for (let i = 0; i < 10; i++) {

      const operations = ["+", "-", "×"];
      const operation =
        operations[randomNumber(0, 2)];

      let a;
      let b;
      let answer;

      if (operation === "+") {

        a = randomNumber(1, 30);
        b = randomNumber(1, 30);

        answer = a + b;

      }

      else if (operation === "-") {

        a = randomNumber(10, 40);
        b = randomNumber(1, a);

        answer = a - b;

      }

      else {

        a = randomNumber(2, 12);
        b = randomNumber(2, 12);

        answer = a * b;

      }

      list.push({

        question: `${a} ${operation} ${b} = ?`,
        answer: answer,
        type: "number"

      });

    }

  }


  if (game === "ninja") {

    for (let i = 0; i < 10; i++) {

      const number = randomNumber(1, 100);

      list.push({

        question:
          `Which number is greater than ${number - randomNumber(1, 20)}?`,

        answer: number,

        type: "multiple"

      });

    }

  }


  if (game === "tables") {

    for (let i = 0; i < 10; i++) {

      const a = randomNumber(2, 12);
      const b = randomNumber(2, 12);

      list.push({

        question: `${a} × ${b} = ?`,
        answer: a * b,
        type: "number"

      });

    }

  }


  if (game === "memory") {

    const pairs = [

      {
        question: "5 + 5",
        answer: "10"
      },

      {
        question: "6 + 4",
        answer: "10"
      },

      {
        question: "3 × 3",
        answer: "9"
      },

      {
        question: "12 - 5",
        answer: "7"
      },

      {
        question: "4 × 2",
        answer: "8"
      },

      {
        question: "20 ÷ 4",
        answer: "5"
      }

    ];

    list = pairs.map(pair => ({

      question: pair.question + " = ?",
      answer: Number(pair.answer),
      type: "number"

    }));

  }


  if (game === "shapes") {

    list = [

      {
        question: "How many sides does a triangle have?",
        answer: 3,
        type: "shape"
      },

      {
        question: "How many sides does a square have?",
        answer: 4,
        type: "shape"
      },

      {
        question: "How many sides does a pentagon have?",
        answer: 5,
        type: "shape"
      },

      {
        question: "How many sides does a hexagon have?",
        answer: 6,
        type: "shape"
      },

      {
        question: "How many sides does a rectangle have?",
        answer: 4,
        type: "shape"
      },

      {
        question: "How many corners does a triangle have?",
        answer: 3,
        type: "shape"
      },

      {
        question: "How many sides does an octagon have?",
        answer: 8,
        type: "shape"
      },

      {
        question: "How many sides does a circle have?",
        answer: 0,
        type: "shape"
      },

      {
        question: "How many sides does a quadrilateral have?",
        answer: 4,
        type: "shape"
      },

      {
        question: "How many sides does a heptagon have?",
        answer: 7,
        type: "shape"
      }

    ];

  }

  return shuffle(list);

}


/* ================================
   SHOW QUESTION
================================ */

function showQuestion() {

  if (questionIndex >= questions.length) {

    finishGame();

    return;

  }


  const current = questions[questionIndex];

  currentCorrectAnswer = current.answer;


  document.getElementById("questionNumber")
    .textContent =
    `Question ${questionIndex + 1} of ${questions.length}`;


  document.getElementById("score")
    .textContent = score;


  document.getElementById("lives")
    .textContent = lives;


  const percentage =
    (questionIndex / questions.length) * 100;

  document.getElementById("progressBar")
    .style.width = `${percentage}%`;


  const questionArea =
    document.getElementById("questionArea");


  questionArea.innerHTML = `

    <div class="question">
      ${current.question}
    </div>

    <div class="answers" id="answers"></div>

  `;


  const answersContainer =
    document.getElementById("answers");


  const answerChoices =
    generateChoices(current.answer);


  answerChoices.forEach(answer => {

    const button =
      document.createElement("button");

    button.className = "answer-btn";

    button.textContent = answer;

    button.onclick = () => {

      checkAnswer(answer, button);

    };

    answersContainer.appendChild(button);

  });

}


/* ================================
   ANSWER OPTIONS
================================ */

function generateChoices(correct) {

  const choices = new Set();

  choices.add(correct);

  while (choices.size < 4) {

    let variation;

    if (correct <= 10) {

      variation =
        correct + randomNumber(-4, 5);

    } else {

      variation =
        correct + randomNumber(-10, 10);

    }

    if (variation >= 0) {

      choices.add(variation);

    }

  }

  return shuffle([...choices]);

}


/* ================================
   CHECK ANSWER
================================ */

function checkAnswer(answer, button) {

  const allButtons =
    document.querySelectorAll(".answer-btn");

  allButtons.forEach(btn => {

    btn.disabled = true;

  });


  if (Number(answer) === Number(currentCorrectAnswer)) {

    button.classList.add("correct");

    score += 10;

    playSound(true);

  }

  else {

    button.classList.add("wrong");

    lives--;

    playSound(false);


    allButtons.forEach(btn => {

      if (
        Number(btn.textContent) ===
        Number(currentCorrectAnswer)
      ) {

        btn.classList.add("correct");

      }

    });


    if (lives <= 0) {

      setTimeout(finishGame, 800);

      return;

    }

  }


  document.getElementById("score")
    .textContent = score;

  document.getElementById("lives")
    .textContent = lives;


  questionIndex++;

  setTimeout(showQuestion, 700);

}


/* ================================
   TIMER
================================ */

function startTimer() {

  timer = 30;

  document.getElementById("timer")
    .textContent = timer;


  timerInterval =
    setInterval(() => {

      timer--;

      document.getElementById("timer")
        .textContent = timer;


      if (timer <= 0) {

        clearInterval(timerInterval);

        lives--;

        document.getElementById("lives")
          .textContent = lives;


        if (lives <= 0) {

          finishGame();

        }

        else {

          timer = 30;

          showQuestion();

          startTimer();

        }

      }

    }, 1000);

}


/* ================================
   FINISH GAME
================================ */

function finishGame() {

  clearInterval(timerInterval);


  document.getElementById("gameScreen")
    .classList.add("hidden");


  document.getElementById("resultScreen")
    .classList.remove("hidden");


  document.getElementById("finalScore")
    .textContent = score;


  let message = "";

  if (score >= 90) {

    message =
      "🌟 Amazing! Your math skills are getting stronger!";

  }

  else if (score >= 70) {

    message =
      "🎉 Great work! Keep practicing!";

  }

  else if (score >= 40) {

    message =
      "👍 Good effort! Try again and beat your score!";

  }

  else {

    message =
      "💪 Keep practicing. You can improve with every game!";

  }


  document.getElementById("resultMessage")
    .textContent = message;


  saveHighScore();

}


/* ================================
   RESTART
================================ */

function restartGame() {

  document.getElementById("resultScreen")
    .classList.add("hidden");

  startGame(currentGame);

}


/* ================================
   EXIT
================================ */

function exitGame() {

  clearInterval(timerInterval);


  document.getElementById("gameScreen")
    .classList.add("hidden");

  document.getElementById("resultScreen")
    .classList.add("hidden");


  document.querySelector(".hero")
    .classList.remove("hidden");

  document.getElementById("games")
    .classList.remove("hidden");

  document.getElementById("skills")
    .classList.remove("hidden");

  document.getElementById("about")
    .classList.remove("hidden");

}


/* ================================
   HIGH SCORE
================================ */

function saveHighScore() {

  const key =
    `mathplay_${currentGame}_highscore`;

  const oldScore =
    Number(localStorage.getItem(key) || 0);


  if (score > oldScore) {

    localStorage.setItem(key, score);

  }

}


/* ================================
   SOUND
================================ */

function playSound(correct) {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    const context =
      new AudioContext();

    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();


    oscillator.connect(gain);

    gain.connect(context.destination);


    oscillator.frequency.value =
      correct ? 700 : 180;


    gain.gain.setValueAtTime(
      0.15,
      context.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + .15
    );


    oscillator.start();

    oscillator.stop(
      context.currentTime + .15
    );

  }

  catch (error) {

    // Sound is optional.

  }

}


/* ================================
   UTILITY
================================ */

function randomNumber(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

}


function shuffle(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [
      array[i],
      array[j]
    ] =
    [
      array[j],
      array[i]
    ];

  }

  return array;

}
