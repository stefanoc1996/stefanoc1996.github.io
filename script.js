document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');

    // Gestione dei pulsanti di navigazione
    const buttonLogi = document.getElementById('button_logi');
    if (buttonLogi) {
        buttonLogi.addEventListener('click', () => {
            window.location.href = 'logica.html';
        });
    }

    const buttonAtt = document.getElementById('button_att');
    if (buttonAtt) {
        buttonAtt.addEventListener('click', () => {
            window.location.href = 'attualità.html';
        });
    }

    const buttonMusi = document.getElementById('button_musi');
    if (buttonMusi) {
        buttonMusi.addEventListener('click', () => {
            window.location.href = 'musica.html';
        });
    }

    const buttonSport = document.getElementById('button_sport');
    if (buttonSport) {
        buttonSport.addEventListener('click', () => {
            window.location.href = 'sport.html';
        });
    }

    const buttonInfo = document.getElementById('button_info');
    if (buttonInfo) {
        buttonInfo.addEventListener('click', () => {
            window.location.href = 'informatica.html';
        });
    }

    const buttonCultgen = document.getElementById('button_cultgen');
    if (buttonCultgen) {
        buttonCultgen.addEventListener('click', () => {
            window.location.href = 'culturaGenerale.html';
        });
    }
    // Funzione per tornare alla home
    const homeButton = document.getElementById("homeButton");
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    // Gestione del quiz logica
    const form = document.getElementById('quizlogi');
    const feedback = document.getElementById('feedback');
    const nextQuizButton = document.getElementById('nextQuiz');
    const completionImage = document.getElementById('completionImage');
    const questions = [
        { id: "question1", correctAnswer: "2/21", name: "probabilita1" },
        { id: "question2", correctAnswer: "3,60 m", name: "altezza_vasca" },
        { id: "question3", correctAnswer: "(A ∩ B)/(A ∩ B ∩ C) ∪ [(A ∩ (C/B)) / (A ∩ C ∩ D)]", name: "insiemi" },
        { id: "question4", correctAnswer: "x = 9, y = 125", name: "serie_numerica" },
        { id: "question5", correctAnswer: "Nessun corridore è superbo", name: "corridori" },
        { id: "question6", correctAnswer: "407", name: "cavalieri" },
        { id: "question7", correctAnswer: "6", name: "pullman" },
        { id: "question8", correctAnswer: "Tra 2000 e 3000", name: "pagine" },
        { id: "question9", correctAnswer: "Silvia abita più vicino alla chiesa che al panificio", name: "silvia" },
        { id: "question10", correctAnswer: "60 cm", name: "raggio" }
    ];

    let currentQuestionIndex = 0;  // Indice della domanda corrente

    // Funzione per nascondere tutte le domande e mostrare solo la domanda corrente
    function showQuestion() {
        // Nascondi tutte le domande
        questions.forEach((question) => {
            const questionElement = document.getElementById(question.id);
            if (questionElement) {
                questionElement.style.display = 'none';
            }
        });

        // Mostra solo la domanda corrente
        const currentQuestion = questions[currentQuestionIndex];
        const currentQuestionElement = document.getElementById(currentQuestion.id);
        if (currentQuestionElement) {
            currentQuestionElement.style.display = 'block';
        }

        // Resetta il feedback e il pulsante
        feedback.textContent = '';
        nextQuizButton.style.display = 'none';  // Nascondi il pulsante "Next Quiz" fino a quando non è necessario
    }

    if (form && feedback && nextQuizButton) {
        // Event listener per il cambiamento delle risposte
        form.addEventListener('change', (event) => {
            const currentQuestion = questions[currentQuestionIndex];
            if (event.target.name === currentQuestion.name) {
                if (event.target.value === currentQuestion.correctAnswer) {
                    feedback.textContent = 'Corretto!';
                    feedback.style.color = 'green';
                    nextQuizButton.style.display = 'block'; // Mostra il pulsante "Next Quiz"
                } else {
                    feedback.textContent = 'Sbagliato. Riprova!';
                    feedback.style.color = 'red';
                    nextQuizButton.style.display = 'none'; // Nasconde il pulsante "Next Quiz"
                }
            }
        });

        // Event listener per il clic sul pulsante "Next Quiz"
        nextQuizButton.addEventListener('click', (event) => {
            event.preventDefault(); // Previene il comportamento predefinito del pulsante

            currentQuestionIndex++;  // Passa alla domanda successiva

            if (currentQuestionIndex < questions.length) {
                showQuestion();  // Mostra la domanda successiva
            } else {
                feedback.textContent = 'Hai completato il quiz!';
                form.style.display = 'none'; // Nasconde il form del quiz
                nextQuizButton.style.display = 'none'; // Nasconde il pulsante "Next Quiz"
                completionImage.style.display = 'block'; // Mostra l'immagine di completamento
            }
        });

        // Inizializza la visualizzazione della prima domanda
        showQuestion();
    }
});