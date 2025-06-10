const questions = {
  hard: [
    {
      question: "1. O que será impresso no console?\n\nlet a = [1, 2, 3];\nlet b = a;\nb.push(4);\nconsole.log(a);",
      options: ["a) [1, 2, 3]", "b) [1, 2, 3, 4]", "c) Erro", "d) undefined"],
      answer: 1
    },
    {
      question: "2. Qual é a saída do seguinte código?\n\nconsole.log([] + []);",
      options: ["a) '' ", "b) []", "c) undefined", "d) NaN"],
      answer: 0
    },
    {
      question: "3. Qual é o tipo de NaN em JavaScript?\n\nconsole.log(typeof NaN);",
      options: ["a) NaN", "b) number", "c) undefined", "d) object"],
      answer: 1
    },
    {
      question: "4. O que será exibido?\n\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');",
      options: ["a) 1 2 3", "b) 2 1 3", "c) 1 3 2", "d) 3 1 2"],
      answer: 2
    },
    {
      question: "5. Qual o resultado da expressão?\n\nlet x = (1, 2, 3);\nconsole.log(x);",
      options: ["a) 1", "b) 2", "c) 3", "d) undefined"],
      answer: 2
    },
    {
      question: "6. O que typeof undefined retorna?",
      options: ["a) undefined", "b) null", "c) object", "d) string"],
      answer: 0
    },
    {
      question: "7. O que acontece ao usar const para declarar um objeto?\n\nconst obj = {}; obj.prop = 42;",
      options: ["a) Erro", "b) Permite adicionar propriedades", "c) Transforma em imutável", "d) Converte para string"],
      answer: 1
    },
    {
      question: "8. Qual é a saída de:\n\nconsole.log(2 + '2');",
      options: ["a) 4", "b) 22", "c) '4'", "d) NaN"],
      answer: 1
    },
    {
      question: "9. Qual dessas instruções remove o último elemento de um array?",
      options: ["a) pop()", "b) shift()", "c) delete arr[arr.length - 1]", "d) removeLast()"],
      answer: 0
    },
    {
      question: "10. Qual dessas palavras-chave impede reatribuição de uma variável?",
      options: ["a) var", "b) let", "c) const", "d) static"],
      answer: 2
    }
  ]
};

// Variáveis de controle
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let answered = false;

// Início do quiz
function startQuiz() {
  // Garante que existe uma dificuldade válida
  let level = localStorage.getItem('selectedLevel');
  if (!level || !questions[level]) {
    level = "hard";
    localStorage.setItem('selectedLevel', level);
  }

  document.getElementById('name-screen').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');

  currentQuestion = 0;
  score = 0;
  showQuestion();
  startTimer();
}

// Mostra a pergunta atual
function showQuestion() {
  answered = false;
  const level = localStorage.getItem('selectedLevel');
  const currentQ = questions[level][currentQuestion];

  document.getElementById("question").textContent = currentQ.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  currentQ.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(button);
  });

  const totalQuestions = questions[level].length;
  const counterText = `Questão ${currentQuestion + 1} de ${totalQuestions}`;
  document.getElementById("question-counter").textContent = counterText;

  resetTimer();
}

// Seleciona a resposta e verifica se está certa
function selectAnswer(selected) {
  if (answered) return;
  answered = true;

  clearInterval(timer);

  const level = localStorage.getItem('selectedLevel');
  const currentQ = questions[level][currentQuestion];
  const correct = currentQ.answer;

  const feedback = document.getElementById("feedback");
  feedback.classList.remove("hidden");
  feedback.textContent = selected === correct ? "✅ ACERTOU!" : "❌ ERROU!";
  feedback.style.color = selected === correct ? "green" : "red";

  if (selected === correct) {
    score++;
  }

  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    feedback.classList.add("hidden");
    nextQuestion();
  }, 1500);
}

// Vai para a próxima pergunta ou finaliza
function nextQuestion() {
  const level = localStorage.getItem('selectedLevel');
  currentQuestion++;

  if (currentQuestion < questions[level].length) {
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

// Timer
function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;

  const timerText = document.getElementById("timer");
  const timeFill = document.getElementById("time-fill");

  timerText.textContent = `Tempo: ${timeLeft}s`;
  timeFill.style.transition = "none";
  timeFill.style.width = "100%";
  void timeFill.offsetWidth;
  timeFill.style.transition = "width 15s linear";
  timeFill.style.width = "0%";

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Tempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeFill.style.width = "0%";
      selectAnswer(-1);
    }
  }, 1000);
}

// Finaliza o quiz e mostra resultados
function endQuiz() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const name = localStorage.getItem('playerName') || "Anônimo";
  document.getElementById("final-score").textContent = `Sua pontuação foi ${score}`;

  updateRanking(name, score);
  displayRanking();
}

// Atualiza o ranking no localStorage
function updateRanking(name, score) {
  const level = localStorage.getItem('selectedLevel');
  const rankingKey = `quizRanking_${level}`;
  let ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];

  const existing = ranking.find(p => p.name === name);
  if (!existing || score > existing.score) {
    ranking = ranking.filter(p => p.name !== name);
    ranking.push({ name, score });
  }

  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem(rankingKey, JSON.stringify(ranking.slice(0, 5)));
}

// Mostra o ranking na tela
function displayRanking() {
  const level = localStorage.getItem('selectedLevel');
  const rankingKey = `quizRanking_${level}`;
  const rankingList = document.getElementById("ranking-list");
  const ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];

  rankingList.innerHTML = "";
  ranking.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${player.name}: ${player.score}`;
    rankingList.appendChild(li);
  });
}

// Reinicia o quiz
function restartQuiz() {
  window.location.href = "quiz_igor.html";
}

function goToMenu() {
  window.location.href = "../../quiz_comunidade/comunidade.html";
}

// (Opcional) Seleção manual de dificuldade
function selectLevel(level) {
  localStorage.setItem('selectedLevel', level);
  window.location.href = "quiz_igor.html";
}
