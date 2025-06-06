document.addEventListener("DOMContentLoaded", function () {
    // Botões
    let startBtn = document.querySelector(".start-button");
    let loginBtn = document.querySelector(".login-button");
    let cadastreSeBtn = document.querySelector(".cadastro-button");
    let cadastrarBtn = document.querySelector(".fim-cadastro-button");
    let perfilBtn = document.querySelector(".perfil-button");


    if (perfilBtn) {
        perfilBtn.addEventListener("click", function () {
            window.location.href = "../tela_perfil/editarperfil.html";
        });
    }

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "../tela_login/index.html";
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            processarLoginOuCadastro("../tela_menu/menu.html");
        });
    }

    if (cadastrarBtn) {
        cadastrarBtn.addEventListener("click", function (event) {
            event.preventDefault();
            processarLoginOuCadastro("../tela_perfil/editarperfil.html"); 
        });
    }

    if (cadastreSeBtn) {
        cadastreSeBtn.addEventListener("click", function () {
            window.location.href = "../tela_cadastro/cadastro.html";
        });
    }

    function processarLoginOuCadastro(destino) {
        let usuarioInput = document.querySelector("input[type='text']");
        let senhaInput = document.querySelector("input[type='password']");

        if (!usuarioInput || !senhaInput) return;

        let usuario = usuarioInput.value.trim();
        let senha = senhaInput.value.trim();
        let valid = true;

        resetError(usuarioInput);
        resetError(senhaInput);

        if (usuario === "") {
            showError(usuarioInput);
            valid = false;
        }

        if (senha === "") {
            showError(senhaInput);
            valid = false;
        }

        if (valid) {
            localStorage.setItem("nomeUsuario", usuario);
            window.location.href = destino;
        }
    }

    function showError(inputElement) {
        if (!inputElement) return;
        inputElement.style.border = "2px solid red";
        inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
        inputElement.placeholder = "Preenchimento Necessário";
        inputElement.classList.add("error-placeholder");
    }

    function resetError(inputElement) {
        if (!inputElement) return;
        inputElement.style.border = "";
        inputElement.style.backgroundColor = "";
        inputElement.placeholder = inputElement.getAttribute("data-placeholder") || "";
        inputElement.classList.remove("error-placeholder");
    }

    document.querySelectorAll("input").forEach(input => {
        input.setAttribute("data-placeholder", input.placeholder);
        input.addEventListener("input", () => resetError(input));
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Quiz card no explorer.html
    const quizCard = document.getElementById("quiz-card");
    if (quizCard) {
        console.log("Quiz card encontrado");
        quizCard.addEventListener("click", function () {
            window.location.href = "../jogo_quiz/dificuldade.html";
        });
    }

    // Quiz card em outra tela (se existir)
    const quizCardAlt = document.getElementById("quiz");
    if (quizCardAlt) {
        quizCardAlt.addEventListener("click", function () {
            window.location.href = "../tela_quiz/explorer.html";
        });
    }

    // Digitação Card / tela principal
    const digitacaoAlt = document.getElementById("digitacao");
    if (digitacaoAlt) {
        digitacaoAlt.addEventListener("click", function () {
            window.location.href = "../jogo_digitacao/index.html";
        });
    }

    // Hamburguer menu
    const logoBtn = document.getElementById('logo-btn');
    const menu = document.getElementById('hamburger-menu');
    const closeBtn = document.getElementById('close-btn');

    if (logoBtn && menu) {
        logoBtn.addEventListener('click', () => {
            menu.style.display = 'block';
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === menu) {
            menu.style.display = 'none';
        }
    });
});


