document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');

    // Gestione dei pulsanti di navigazione
    const buttonMate = document.getElementById('button_mate');
    if (buttonMate) {
        buttonMate.addEventListener('click', () => {
            window.location.href = 'matematica.html';
        });
    }

    const buttonGeo = document.getElementById('button_geo');
    if (buttonGeo) {
        buttonGeo.addEventListener('click', () => {
            window.location.href = 'geografia.html';
        });
    }

    // Gestione del quiz
    const form = document.getElementById('quizForm');
    const feedback = document.getElementById('feedback');
    const nextQuizButton = document.getElementById('nextQuiz');
    const completionImage = document.getElementById('completionImage');
    const questions = [
        { id: 'question1', correctAnswer: 'Roma', name: 'capitale' },
        { id: 'question2', correctAnswer: 'Portoghese', name: 'lingua' },
        // Aggiungi altre domande qui
        { id: 'question10', correctAnswer: 'Parigi', name: 'capitale_francia' }
    ];
    let currentQuestionIndex = 0;

    if (form && feedback && nextQuizButton) {
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

        nextQuizButton.addEventListener('click', (event) => {
            event.preventDefault(); // Previene il comportamento predefinito del pulsante
            const currentQuestion = questions[currentQuestionIndex];
            document.getElementById(currentQuestion.id).style.display = 'none'; // Nasconde la domanda corrente
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                const nextQuestion = questions[currentQuestionIndex];
                document.getElementById(nextQuestion.id).style.display = 'block'; // Mostra la prossima domanda
                nextQuizButton.style.display = 'none'; // Nasconde il pulsante "Next Quiz"
                feedback.textContent = ''; // Resetta il feedback
            } else {
                feedback.textContent = 'Hai completato il quiz!';
                form.style.display = 'none';
                nextQuizButton.style.display = 'none'; // Nasconde il pulsante "Next Quiz"
                completionImage.style.display = 'block'; // Mostra l'immagine di completamento
            }
        });
    }
});