const questions = [
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["unshift()", "push()", "pop()", "shift()"],
    answer: "push()"
  },
  {
    question: "How do you write a conditional statement in JavaScript?",
    options: ["if i = 5 then", "if (i === 5)", "if i == 5 then", "if i === 5"],
    answer: "if (i === 5)"
  },
  {
    question: "Which loop will execute at least once, even if the condition is false?",
    options: ["for", "while", "do while", "if"],
    answer: "do while"
  },
  {
    question: "How do you create an array in JavaScript?",
    options: ["let arr = []", "arr = object", "let arr = ()", "let arr = {}"],
    answer: "let arr = []"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["string", "boolean", "float", "undefined"],
    answer: "float"
  }
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
