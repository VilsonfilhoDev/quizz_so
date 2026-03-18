const quizData = [
    { q: "Se o computador fosse um restaurante, quem seria o Cozinheiro?", o: ["O Mouse", "O Processador (CPU)", "O Monitor"], a: 1 }, // B
    { q: "Para que serve a Memória RAM?", o: ["Bancada de trabalho para o que está aberto agora", "Guardar fotos para o ano que vem", "Conectar o Wi-Fi"], a: 0 }, // A
    { q: "Onde os arquivos ficam salvos quando você desliga o PC?", o: ["Na Memória RAM", "No Teclado", "No SSD ou HD (A Despensa)"], a: 2 }, // C
    { q: "Quem desenha os milhões de pixels na tela?", o: ["A GPU (Placa de Vídeo)", "A CPU", "O Roteador"], a: 0 }, // A
    { q: "O que acontece se o Hardware esquenta demais?", o: ["O computador fica mais rápido", "Diminui a velocidade para não queimar", "A internet cai"], a: 1 }, // B
    { q: "Qual a função principal do Sistema Operacional?", o: ["Limpar o pó das peças", "Fabricar o metal dos chips", "Ser o Gerente que organiza as tarefas"], a: 2 }, // C
    { q: "Como o SO conversa com o Hardware?", o: ["Mandando e-mails", "Traduzindo cliques para Binário (0 e 1)", "Telepatia"], a: 1 }, // B
    { q: "Por que um vídeo trava com 50 abas abertas?", o: ["O SO não sabe quem priorizar na RAM", "O monitor cansa de brilhar", "O Google fica bravo com o usuário"], a: 0 }, // A
    { q: "O Android é um exemplo de:", o: ["Hardware (Peça)", "Provedor de Internet", "Sistema Operacional"], a: 2 }, // C
    { q: "Se o Maestro (SO) entra em colapso, o que acontece?", o: ["O computador acelera sozinho", "A tela congela ou dá erro (Tela Azul)", "O mouse para de brilhar"], a: 1 }, // B
    { q: "O que são 'Pacotes de Dados'?", o: ["Pedaços minúsculos de um arquivo na rede", "Caixas de papelão do correio", "Vírus de computador"], a: 0 }, // A
    { q: "Qual a função do Roteador na sua casa?", o: ["Guardar os vídeos do YouTube", "Processar os gráficos pesados", "Saber para qual endereço (IP) mandar os dados"], a: 2 }, // C
    { q: "Por onde viaja a internet que atravessa os oceanos?", o: ["Cabos submarinos de Fibra Ótica", "Satélites de baixa órbita", "Ondas de rádio potentes"], a: 0 }, // A
    { q: "O que é a 'Largura de Banda'?", o: ["O volume do som do PC", "Capacidade da 'estrada' de passar dados", "O tamanho do roteador"], a: 1 }, // B
    { q: "Onde o vídeo do YouTube 'mora' antes do play?", o: ["No cabo de energia", "Dentro do seu mouse", "Em um Servidor remoto"], a: 2 } // C
];

let currentQ = 0;
let correctCount = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress');
const feedback = document.getElementById('quiz-feedback');
const nextBtn = document.getElementById('next-btn');

function loadQuestion() {
    feedback.innerText = "";
    nextBtn.style.display = "none";
    const currentQuiz = quizData[currentQ];
    
    progressText.innerText = `Pergunta ${currentQ + 1} de ${quizData.length}`;
    questionText.innerText = currentQuiz.q;
    
    optionsContainer.innerHTML = "";
    currentQuiz.o.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-btn');
        btn.onclick = () => checkQuizAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkQuizAnswer(selected, btn) {
    const correct = quizData[currentQ].a;
    const allBtns = document.querySelectorAll('.option-btn');
    
    allBtns.forEach(b => b.disabled = true); 

    if (selected === correct) {
        btn.classList.add('correct');
        feedback.innerText = "Sinal Estável! Resposta Correta 🎯";
        feedback.style.color = "#22c55e";
        correctCount++;
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.innerText = "Erro de Sincronia! Resposta Errada ❌";
        feedback.style.color = "#ef4444";
    }
    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentQ++;
    if (currentQ < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    const percent = Math.round((correctCount / quizData.length) * 100);
    let iaAnalysis = "";

    // Lógica da IA para gerar o diagnóstico técnico
    if (percent === 100) {
        iaAnalysis = "🚀 **ANÁLISE DA IA:** Desempenho excepcional detectado. Seu 'processador mental' está operando em overclock sem superaquecer. Você dominou a tríade Hardware-SO-Redes!";
    } else if (percent >= 75) {
        iaAnalysis = "⚡ **ANÁLISE DA IA:** Ótima largura de banda. Seu conhecimento flui bem, com pouquíssima latência. Revise os detalhes da Memória RAM para evitar futuros gargalos.";
    } else if (percent >= 50) {
        iaAnalysis = "⚠️ **ANÁLISE DA IA:** Sinal oscilante. Detectamos que seu 'Gerente' (SO) se confundiu em alguns pontos teóricos. Foque em entender como o Hardware e a Rede se comunicam.";
    } else if (percent >= 20) {
        iaAnalysis = "🐢 **ANÁLISE DA IA:** Conexão discada detectada. Muitos pacotes de dados foram perdidos no caminho. Recomenda-se reiniciar o módulo de aprendizado para estabilizar o sistema.";
    } else {
        iaAnalysis = "❌ **ANÁLISE DA IA:** Erro Crítico de Sistema! Seu aprendizado entrou em 'Loop Infinito'. Procure o suporte (Professor) para uma manutenção preventiva urgente.";
    }

    document.getElementById('question-box').innerHTML = `
        <div style="text-align: center; animation: fadeIn 1s;">
            <h2 style="color: #38bdf8; margin-bottom: 10px;">RELATÓRIO DE SISTEMA</h2>
            <hr style="border: 0.5px solid #334155; margin-bottom: 20px;">
            <p style="font-size: 1.2rem;">Sua Taxa de Acerto:</p>
            <div style="font-size: 4rem; font-weight: bold; color: #22c55e; margin: 10px 0;">${percent}%</div>
            <p style="color: #94a3b8; margin-bottom: 20px;">(${correctCount} de ${quizData.length} acertos)</p>
            
            <div style="text-align: left; background: #0f172a; padding: 20px; border-radius: 10px; border-left: 5px solid #38bdf8; font-family: monospace;">
                <p style="margin: 0; color: #38bdf8; font-size: 0.8rem; margin-bottom: 10px;">> EXECUTANDO DIAGNÓSTICO_IA.EXE...</p>
                <p style="margin: 0; line-height: 1.5; color: #e2e8f0;">${iaAnalysis}</p>
            </div>
            
            <button onclick="location.reload()" style="margin-top: 30px; padding: 12px 30px; background: #38bdf8; color: #0f172a; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
                REINICIAR SISTEMA
            </button>
        </div>
    `;
    nextBtn.style.display = "none";
    progressText.innerText = "ANÁLISE CONCLUÍDA";
}

// Captura os elementos novos
const startScreen = document.getElementById('quiz-start-screen');
const quizContent = document.getElementById('quiz-content');
const btnStart = document.getElementById('btn-quiz-start');

// Evento para o botão iniciar
btnStart.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Esconde a tela de início
    quizContent.style.display = 'block'; // Mostra o conteúdo do quiz
    loadQuestion(); // Inicia a primeira pergunta
});