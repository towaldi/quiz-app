// JSON array
let questions = [
    {
        'question': 'Who invented HTML?',
        'answer_1': 'Robbie Williams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Bieber',
        'right_answer': 3
    },
    {
        'question': 'In the HSL color scheme, which value represents the color?',
        'answer_1': 'Lightness',
        'answer_2': 'Vibrance',
        'answer_3': 'Hue',
        'answer_4': 'Saturation',
        'right_answer': 3
    },
    {
        'question': 'Which of the following HTML elements is used to declare a table data cell that represents the header content of an HTML table?',
        'answer_1': 'tfoot',
        'answer_2': 'th',
        'answer_3': 'tr',
        'answer_4': 'td',
        'right_answer': 4
    },
    {
        'question': 'What word is the HTML <div> tag short for?',
        'answer_1': 'Diverge',
        'answer_2': 'Division',
        'answer_3': 'Divulge',
        'answer_4': 'Divert',
        'right_answer': 2
    },
    {
        'question': 'What is the alt attribute used for',
        'answer_1': 'To set alternate text to display.',
        'answer_2': 'To set an alternate element to display.',
        'answer_3': 'To set an alternate imager to display.',
        'answer_4': 'To set an alternate class attribute',
        'right_answer': 1
    },
];


// Global variable (0 -> start with question 1)
let currentQuestion = 0;


// Global variable for right answered questions (0 at the beginning of the quiz)
let rightAnsweredQuestions = 0;


// Audio data -> global variable
let audioSuccess = new Audio('./audio/correct.wav');
let audioFail = new Audio('./audio/wrong.wav');

// Render onload
function init() {
    document.getElementById('full-amount-questions').innerHTML = questions.length;  // Show full amount of questions
    showCurrentQuestion();  // Execute -> current question function
}


// Show current question
function showCurrentQuestion() {
    if (gameIsOver()) {  // If all 5 questions are answered -> show end screen (because 5 >= 5)
        // End screen
        showFinalScreen();
    } else {
        updateProgressBar();
        showNextQuestion(); 
    }
}


// Click on answer button -> i = 'answer_...' (2 factors are important -> 1. answer wight/wrong + 2.which answer button was clicked)
function answer(i) {
    let question = questions[currentQuestion];  // Get current question -> element of the JSON array
    let selectedQuestionNumber = i.slice(-1);   // Get the last number of 'answer_...' -> .slice(-1)

    let idOfRightAnswer = `answer_${question['right_answer']}`; // Right answer -> for highlighting

    // If else statement
    if (selectedQuestionNumber == question['right_answer']) {
        console.log('right answer!!');  // Prints -> right answer
        document.getElementById(i).parentNode.classList.add('bg-success');  // Add CSS class to parent element
        audioSuccess.play();    // Plays audio
        rightAnsweredQuestions++;
    } else {
        console.log('wrong answer!!');  // Prints -> wrong answer
        document.getElementById(i).parentNode.classList.add('bg-danger');   // Add CSS class to parent element
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');    // Highlights also correct answer
        audioFail.play();   // Plays audio
    }

    document.getElementById('next-button').disabled = false;    // Change button state if question selected

}


// Next question
function nextQuestion() {
    currentQuestion++;  // Incease value by 1
    resetAnswerButtons();   // Reset the answer buttons -> color
    document.getElementById('next-button').disabled = true; // Reset button state
    showCurrentQuestion();  // Execute -> current question function
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');  // Remove CSS class
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}


// Restart quiz
function restartQuiz() {
    document.getElementById('questions-card').style = ''; // Show question card
    document.getElementById('final-card').style = 'display: none';  // Hide final card

    currentQuestion = 0;    // Reset global variables
    rightAnsweredQuestions = 0;
    init();
}


// ================================================================================================================================================================ //
function showFinalScreen() {
    document.getElementById('questions-card').style = 'display: none'; // Change style of card -> add 'display: none;'
    document.getElementById('final-card').style = '';   // Change style of card -> remove 'display: none;'

    document.getElementById('amount-of-questions').innerHTML = questions.length;  // Display amount of questions at the final screen
    document.getElementById('correct-answered-questions').innerHTML = rightAnsweredQuestions;   // Shows amount of right answered questions
}


function showNextQuestion() {
    let question = questions[currentQuestion];  // Get first element of the JSON array
    document.getElementById('question-text').innerHTML = question['question'];  // Get the question

    document.getElementById('answer_1').innerHTML = question['answer_1'];   // Get the answers
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];

    document.getElementById('current-question-number').innerHTML = currentQuestion + 1; // Current question number -> + 1 because array starts with 0
}


function updateProgressBar() {
    let percent = (currentQuestion +1) / questions.length;   // Percentage for progress bar (e.g. 1/5 = 0.2) / currentQuestion + 1 -> start at 1 not 0! -> endig with 100% at progress bar 
    percent = Math.round(percent * 100);    // (e.g. 0.2 * 100 = 20%) / Math.round() = numbers are rounded
    document.getElementById('progress-bar').innerHTML  = `${percent}%`;     // Prints value into progress bar
    document.getElementById('progress-bar').style = `width: ${percent}%`;   // Change width of progress bar
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}

