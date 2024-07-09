const questions = [
    { question: "What is the capital of France?", choices: ["a. Berlin", "b. Madrid", "c. Paris", "d. Rome"], answer: 2 },
    { question: "What is 2 + 2?", choices: ["a. 3", "b. 4", "c. 5", "d. 6"], answer: 1 },
    { question: "Who wrote 'To Kill a Mockingbird'?", choices: ["a. Harper Lee", "b. J.K. Rowling", "c. Ernest Hemingway", "d. Mark Twain"], answer: 0 },
    { question: "What is the largest planet in our Solar System?", choices: ["a. Earth", "b. Mars", "c. Jupiter", "d. Saturn"], answer: 2 },
    { question: "What year did the Titanic sink?", choices: ["a. 1905", "b. 1912", "c. 1923", "d. 1898"], answer: 1 },
    { question: "What is the chemical symbol for water?", choices: ["a. H2O", "b. O2", "c. CO2", "d. NaCl"], answer: 0 },
    { question: "Who painted the Mona Lisa?", choices: ["a. Vincent Van Gogh", "b. Pablo Picasso", "c. Leonardo da Vinci", "d. Michelangelo"], answer: 2 },
    { question: "What is the smallest country in the world?", choices: ["a. Monaco", "b. Vatican City", "c. San Marino", "d. Liechtenstein"], answer: 1 },
    { question: "What is the longest river in the world?", choices: ["a. Amazon River", "b. Nile River", "c. Yangtze River", "d. Mississippi River"], answer: 1 },
    { question: "What is the hardest natural substance on Earth?", choices: ["a. Gold", "b. Iron", "c. Diamond", "d. Graphite"], answer: 2 }
];

let selectedQuestions = [];
let currentQuestion = 0;
let selectedAnswers = [];

function getRandomQuestions() {
    let indices = Array.from({ length: questions.length }, (_, i) => i);
    indices.sort(() => Math.random() - Math.random());
    selectedQuestions = indices.slice(0, 5).map(index => questions[index]);
}

function showQuestion(index) {
    const questionElement = document.getElementById('question');
    const choices = document.getElementsByClassName('choice');
    const questionCountElement = document.getElementById('question-count');
    questionCountElement.textContent = `Question ${index + 1}/5`;
    questionElement.textContent = `${index + 1}. ${selectedQuestions[index].question}`;
    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = selectedQuestions[index].choices[i];
        choices[i].classList.remove('selected');
        if (selectedAnswers[index] === i) {
            choices[i].classList.add('selected');
        }
    }
}

function selectAnswer(choice) {
    selectedAnswers[currentQuestion] = choice;
    const choices = document.getElementsByClassName('choice');
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove('selected');
    }
    choices[choice].classList.add('selected');
}

function nextQuestion() {
    if (currentQuestion < selectedQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResult() {
    const quizElement = document.getElementById('quiz');
    const resultElement = document.getElementById('result');
    quizElement.classList.add('hide');
    resultElement.classList.remove('hide');

    let correctAnswers = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
        if (selectedAnswers[i] === selectedQuestions[i].answer) {
            correctAnswers++;
        }
    }

    const resultMessageElement = document.getElementById('result-message');
    if (correctAnswers >= 4) {
        resultMessageElement.textContent = "Congratulations! You passed the quiz.";
    } else {
        resultMessageElement.textContent = "You didn't pass the quiz. Try again!";
    }

    document.getElementById('score').textContent = correctAnswers;
}

function restartQuiz() {
    currentQuestion = 0;
    selectedAnswers = [];
    getRandomQuestions();
    document.getElementById('quiz').classList.remove('hide');
    document.getElementById('result').classList.add('hide');
    showQuestion(currentQuestion);
}

function toggleParagraph(paragraphId) {
    const paragraph = document.getElementById(`paragraph-${paragraphId}`);
    if (paragraph.style.display === "none" || paragraph.style.display === "") {
        paragraph.style.display = "block";
    } else {
        paragraph.style.display = "none";
    }
}

// Initialize the quiz
getRandomQuestions();
showQuestion(currentQuestion);