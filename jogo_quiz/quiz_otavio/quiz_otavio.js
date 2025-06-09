const questions = {
    hard: [
      {
        question: "1. Quantos tipos de Pneus existem nas corridas de F1?",
        options: ["a) 3 - macio, médio e duro", "b) 2 - macio e duro ", "c) 1 - macio", "d) 1 - apenas um tipo para todos"],
        answer: 0
      },
      {
        question: "2. Quantos pilotos existem por equipes?",
       
        options: ["a) 1 ", "b) 2 ", "c) 3 ", "d) 4 "],
        answer: 1
      },
      {
        question: "3. Qual o piloto com o maior número de vitórias?",
        
        options: ["a)Max Verstappen ", "b) Lewis Hamilton ", "c) Michael Schumacher", "d) Ayrton Senna "],
        answer: 1
      },
      {
        question: "4. Qual o piloto mais novo a obter uma vitória em um Grand Prix de F1?",
        
        options: ["a) Kimi Antonelli ", "b) Gabriel Bortoleto ", "c) Max Verstappen ", "d) Charles Leclerc "],
        answer: 2
      },
      {
        question: "5. Somente dois pilotos detém o recorde de mais títulos mundiais. Quais são eles?",
       
        options: ["a) Verstappen e Senna ", "b) Prost e Fangio ", "c) Vettel e Verstappen ", "d) Hamilton e Schumacher "],
        answer: 3
      },
      {
        question: "6. Qual circuito é considerado pelos pilotos a corrida mais difícil do calendário? ",
        
        options: ["a) Mônaco ", "b) Bahrein ", "c) São Paulo ", "d) Bélgica "],
        answer: 0
      },
      {
        question: "7. Quantos cavalos um carro de fórmula 1 possui? ",
       
        options: ["a) 1000cv ", "b) 500cv + 100cv(elétrico) ", "c) 900cv + 110cv(elétrico) ", "d) 1cv"],
        answer: 2
      },
      {
        question: "8. Quantas voltas tem o GP de São Paulo? ",
       
        options: ["a) 71 voltas ", "b) 50 voltas ", "c) 61 voltas ", "d) 10 voltas "],
        answer: 0
      },
      {
        question: "9. Qual o nome do primeiro campeão mundial de fórmula 1? ",
        
        options: ["a) Giuseppe Farina", "b) Juan Manuel Fangio ", "c) Niki Lauda ", "d) Clay Regazzoni "],
        answer: 0
      },
      {
        question: "10. O que é uma Pole Position? ",
        
        options: ["a) Quando um piloto ganha uma corrida ", "b) Quando o piloto abandona a corrida ", "c) Quando um piloto toma uma punição ", "d) Quando o piloto faz a volta mais rapida na Classificação "],
        answer: 3
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

     //Transição entre as perguntas
     const quizBox = document.getElementById("quiz-container");
     quizBox.classList.remove("fade-in");
     quizBox.classList.add("fade-out");
     setTimeout(() => {

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

    //Transição entre as perguntas
    quizBox.classList.remove("fade-out");
    quizBox.classList.add("fade-in");
    }, 500);}
  
  
  // Seleciona a resposta e verifica se está certa
  function selectAnswer(selected) {
    if (answered) return;
    answered = true;
  
    clearInterval(timer);
  
    const level = localStorage.getItem('selectedLevel');
    const currentQ = questions[level][currentQuestion];
    const correct = currentQ.answer;
  
  
    if (selected === correct) {
      score++;
    }
  
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) {
        btn.style.backgroundColor = "#4CAF50"; // verde
        btn.style.color = "#fff";
      } else if (i === selected) {
        btn.style.backgroundColor = "#f44336"; // vermelho
        btn.style.color = "#fff";
      } else {
        btn.style.opacity = 0.6;
      }
    });
  
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
    document.getElementById("final-score").textContent = `Sua pontuação foi ${score} de 10`;
  
    updateRanking(name, score);
    displayRanking();
  }

  function stopQuiz() {
    const confirmar = confirm("Tem certeza de que deseja encerrar o quiz agora?");
    if (confirmar) {
      clearInterval(timer); // Para o timer
      endQuiz(); // Vai para a tela de resultado
    }
    }
  
  // Reinicia o quiz
  function restartQuiz() {
    window.location.href = "quiz_otavio.html";
  }
  
  function goToMenu() {
    window.location.href = "../../quiz_comunidade/comunidade.html";
  }
  
  // (Opcional) Seleção manual de dificuldade
  function selectLevel(level) {
    localStorage.setItem('selectedLevel', level);
    window.location.href = "quiz_otavio.html";
  }
  