const questions = [
  {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["let", "var", "const", "define"],
    answer: "const"
  },
  {
    question: "What does `NaN` stand for in JavaScript?",
    options: ["Not a Number", "No assigned Name", "Negative and Null", "None at Night"],
    answer: "Not a Number"
  },
  {
    question: "Which method is used to convert a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "parse.JSON()", "stringify.JSON()"],
    answer: "JSON.parse()"
  },
  {
    question: "What is the output of `typeof null` in JavaScript?",
    options: ["null", "undefined", "object", "string"],
    answer: "object"
  },
  {
    question: "Which operator is used for strict equality comparison in JavaScript?",
    options: ["==", "===", "=", "!="],
    answer: "==="
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    answer: "//"
  },
  {
    question: "What will `Boolean('false')` return?",
    options: ["true", "false", "undefined", "null"],
    answer: "true"
  },
  {
    question: "What is the correct way to write a function in JavaScript?",
    options: [
      "function myFunction() {}",
      "def myFunction() {}",
      "func myFunction() {}",
      "create function myFunction() {}"
    ],
    answer: "function myFunction() {}"
  },
  {
    question: "Which JavaScript method can be used to select an element by its ID?",
    options: [
      "document.querySelector('#id')",
      "document.getElementById()",
      "Both of the above",
      "document.getElementByClass()"
    ],
    answer: "Both of the above"
  },
  {
    question: "What will `console.log(2 + '2')` output?",
    options: ["4", "'4'", "'22'", "NaN"],
    answer: "'22'"
  },
];


let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  nextBtn.disabled = true;
  questionContainer.innerHTML = "";

  const current = questions[currentQuestionIndex];
  const questionEl = document.createElement("h2");
  questionEl.textContent = current.question;
  questionContainer.appendChild(questionEl);

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = () => selectAnswer(button, current.answer);
    questionContainer.appendChild(button);
  });

  // Update next button text if last question
  nextBtn.textContent = (currentQuestionIndex === questions.length - 1)
    ? "Show Results"
    : "Next Question";
}

function selectAnswer(selectedButton, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn !== selectedButton && btn.textContent !== correctAnswer) {
      btn.classList.remove("correct", "incorrect");
    }
  });

  if (selectedButton.textContent !== correctAnswer) {
    selectedButton.classList.add("incorrect");
  } else {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  restartBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  showQuestion();
});

function showScore() {
  questionContainer.innerHTML = "";
  scoreContainer.classList.remove("hidden");
  scoreContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

// Start quiz
showQuestion();
