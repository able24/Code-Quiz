// Targetting Various HTML Elements by ID
var time = document.getElementById('time');
var btn = document.getElementById('start');
var questionWrap = document.getElementById('questions');
var questionTitle = document.getElementById('question-title');
var choiceOutput = document.getElementById('choices');

// Set Current Question Index To First Question
var currentQuestionIndex = 0;
var quizTime = 75;
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
    }
}

// Check if chosen answer is the correct answer. If correct answer, play correct answer sound. If wrong answer, play wrong answer sound and deduct 10s from quiz time
choiceOutput.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.innerText === questions[currentQuestionIndex].answer) {
        console.log("correct")
    } else { quizTime -= 10; };


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
