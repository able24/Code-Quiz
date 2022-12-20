// Targetting Various HTML Elements by ID
var time = document.getElementById('time');
var btn = document.getElementById('start');
var questionWrap = document.getElementById('questions');
var questionTitle = document.getElementById('question-title');
var choiceOutput = document.getElementById('choices');
var correctAnswer = document.getElementById('correct');
var incorrectAnswer = document.getElementById('wrong');
var correctSound = new Audio("./assets/sfx/correct.wav");
var incorrectSound = new Audio("./assets/sfx/incorrect.wav");
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');


// Set Current Question Index To First Question
var currentQuestionIndex = 0;
var quizTime = 60;
// Create a function to set quiz time to decrement from 75s
function timeLeft() {

    var timer = setInterval(function () {
        time.innerText = quizTime;
        quizTime--;
        if (quizTime < 0) {
            clearTimeout(timer);
        }
    }, 1000);

    return timer;

};



// Create a function to start the quiz
function startQuiz() {
    // If statement to check if there are more questions and present them else, save the remaining time after the questions as the score
    if (currentQuestionIndex < questions.length) {

        var currentQuestion = questions[currentQuestionIndex];  //Setting the current question to the first question in the array
        questionTitle.innerText = currentQuestion.title;   //Setting the question title to the title of the current question
        var choices = currentQuestion.choices;  //Setting the choices to the choices of the current question

        choiceOutput.innerHTML = "";  //Setting the choice div to an empty string so choices can be added

        // For Loop to create a button for each choice in the current question title and choices
        for (var i = 0; i < choices.length; i++) {
            var choice = choices[i];  //Set choice to the current choice
            var correctAnswer = currentQuestion.answer === choice;  //Compare choice with correct answer to question to see if it's right

            //Creating a button for every choice in our questions array
            choiceOutput.insertAdjacentHTML('beforeend', `
            <button data-correct=${correctAnswer}>${choice}</button>
            `);

            //Once a choice is selected, the next question is loaded

        }

        //Display the question and choices when start button is clicked
        questionWrap.classList.remove('hide');
    } else {
        localStorage.setItem("Score", JSON.stringify(quizTime)); // Set score to time remaining after quiz
        questionWrap.classList.add('hide'); // hides the last question
        endScreen.classList.remove('hide'); // displays the page for test taker to enter his/her initials
        finalScore.innerHTML = JSON.parse(localStorage.getItem("Score")); // displays the score for that test and asks for the test taker's initial

    };
}


// Check if chosen answer is the correct answer. If correct answer, display correct! and play correct answer sound. If wrong answer, display wrong!, play wrong answer sound and deduct 10s from quiz time
choiceOutput.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.innerText === questions[currentQuestionIndex].answer) {
        correctSound.play(); // Plays sound to indicate correct answer
        correctAnswer.classList.remove('hide'); // if answer is correct, show notification "correct!"
        setTimeout(function () {
            correctAnswer.classList.add('hide'); // Notification for correct answer stays for 0.5s and is hidden
        }, 500);


    } else {
        incorrectAnswer.classList.remove('hide'); // if answer is wrong, show noticiation "wrong!"
        setTimeout(function () {
            incorrectSound.play(); // Plays sound to indicate wrong answer
            incorrectAnswer.classList.add('hide'); // Notification for wrong answer stays for 0.5s and then is hidden
        }, 500);
        quizTime -= 10; // 10s is deducted for wrong answers
    };

    // Go to the next question after an answer button is clicked
    currentQuestionIndex++;
    var currentQuestion = questions[currentQuestionIndex];
    //console.log(currentQuestion); 
    startQuiz();
});



// Set the timer to start decrementing at the click of the start button by calling the timeLeft function in the event listener for the button
var countDown = btn.addEventListener('click', function () {
    document.getElementById('start-screen').classList.add('hide'); //This hides the start screen to display only the questions
    timeLeft();
    startQuiz();
});
