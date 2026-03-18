const questions = [
    // BLOCO 1: HARDWARE
    { q: "Qual o 'Cozinheiro Chefe' do computador?", a: ["processador", "cpu"], img: "img/cpu.jpg" },
    { q: "Onde os dados ficam na 'despensa'?", a: ["ssd", "hd", "disco"], img: "img/ssd.jpg" },
    { q: "Qual a 'bancada de trabalho' do processador?", a: ["ram", "memoria ram"], img: "img/ram.jpg" },
    { q: "Quem desenha os pixels na tela?", a: ["gpu", "placa de video"], img: "img/gpu.jpg" },
    { q: "O clique do mouse gera qual tipo de sinal?", a: ["eletrico", "pulso"], img: "img/sinal.jpg" },
    
    // BLOCO 2: SISTEMA OPERACIONAL
    { q: "Windows e Android são exemplos de quê?", a: ["sistema operacional", "so"], img: "img/so.jpg" },
    { q: "Quem decide qual tarefa recebe atenção agora?", a: ["gerente", "maestro", "so", "sistema operacional"], img: "img/gerente.jpg" },
    { q: "A máquina entende apenas zeros e...?", a: ["uns", "um"], img: "img/binario.jpg" },
    { q: "O SO traduz cliques para linguagem...?", a: ["binaria", "binario"], img: "img/matriz.jpg" },
    { q: "Onde o SO limpa espaço para um app novo?", a: ["ram", "memoria"], img: "img/ram2.jpg" },

    // BLOCO 3: REDES
    { q: "Como se chamam os pedaços que viajam pela rede?", a: ["pacotes", "dados"], img: "img/pacotes.jpg" },
    { q: "Qual aparelho é a 'agência de correios' da casa?", a: ["roteador", "router", "wi-fi", "wifi"], img: "img/roteador.jpg" },
    { q: "O sinal de luz viaja por fios de...?", a: ["fibra", "vidro"], img: "img/fibra.jpg" },
    { q: "Se a rede oscila, o vídeo do YouTube...?", a: ["trava", "congela", "para"], img: "img/trava.gif" },
    { q: "Onde o Google guarda a foto do gatinho?", a: ["servidor", "nuvem", "server"], img: "img/servidor.jpg" }
];

let currentLevel = 0;
let timeLeft = 20;
let timerInterval;
let score = 0;
let highScore = localStorage.getItem('highScore_Conexao') || 0;

const overlay = document.getElementById('overlay-container');
const input = document.getElementById('answer-input');
const feedback = document.getElementById('feedback');
const imgElement = document.getElementById('secret-image');

document.getElementById('high-score').innerText = highScore;

function createOverlay() {
    overlay.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        let div = document.createElement('div');
        div.className = 'pixel';
        overlay.appendChild(div);
    }
}

function startGame() {
    if (currentLevel >= questions.length) return finishGame();
    
    createOverlay();
    input.value = '';
    feedback.innerText = '';
    // Carrega a imagem ou GIF local
    imgElement.src = questions[currentLevel].img;
    document.getElementById('question-text').innerText = questions[currentLevel].q;
    
    startTimer();
}

function startTimer() {
    timeLeft = 20;
    document.getElementById('seconds').innerText = timeLeft;
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('seconds').innerText = timeLeft;
        revealRandomPixel();

        if (timeLeft <= 0) {
            applyPunishment();
        }
    }, 1000);
}

function revealRandomPixel() {
    const pixels = document.querySelectorAll('.pixel:not(.revealed)');
    if (pixels.length > 0) {
        const random = Math.floor(Math.random() * pixels.length);
        pixels[random].classList.add('revealed');
    }
}

function checkAnswer() {
    const userVal = input.value.toLowerCase().trim();
    // Verifica se o que o aluno digitou contém alguma das palavras permitidas
    const isCorrect = questions[currentLevel].a.some(res => userVal.includes(res));

    if (isCorrect) {
        clearInterval(timerInterval);
        const points = 10 + timeLeft;
        score += points;
        document.getElementById('current-score').innerText = score;
        feedback.style.color = "#2ecc71";
        feedback.innerText = `BOA! +${points} pontos.`;
        
        currentLevel++;
        setTimeout(startGame, 1200);
    } else {
        feedback.style.color = "#e74c3c";
        feedback.innerText = "Quase lá! Tente outro termo.";
    }
}

function applyPunishment() {
    clearInterval(timerInterval);
    const respostaPrincipal = questions[currentLevel].a[0].toUpperCase();
    document.body.classList.add('punishment-shake');
    feedback.style.color = "#ff4444";
    feedback.innerText = `PUNIÇÃO! A resposta era: ${respostaPrincipal}`;
    
    setTimeout(() => {
        document.body.classList.remove('punishment-shake');
        currentLevel++;
        startGame();
    }, 3000);
}

function finishGame() {
    clearInterval(timerInterval);
    document.getElementById('question-area').innerHTML = "<h2>Desafio Concluído!</h2>";
    feedback.innerText = `Pontuação Final: ${score}`;
    
    if (score > highScore) {
        localStorage.setItem('highScore_Conexao', score);
        document.getElementById('high-score').innerText = score;
        feedback.innerText += " - NOVO RECORDE! 🏆";
    }
}

// Eventos de clique e tecla Enter
document.getElementById('btn-check').addEventListener('click', checkAnswer);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkAnswer(); });


document.getElementById('btn-start-game').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none'; // Esconde a tela
    startGame(); // Inicia o jogo de verdade
});