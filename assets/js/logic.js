// Targetting Various HTML Elements by ID
var time = document.getElementById('time');
var btn = document.getElementById('start');
var questionWrap = document.getElementById('questions');
var questionTitle = document.getElementById('question-title');
var choiceOutput = document.getElementById('choices');

// Set Current Question Index To First Question
var currentQuestionIndex = 0;

// Create a function to set quiz time to decrement from 75s
function timeLeft() {
    var quizTime = 75;

    var timer = setInterval(function() {
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
    var currentQuestion = questions[currentQuestionIndex];  //Setting the current question to the first question in the array
    questionTitle.innerText = currentQuestion.title;   //Setting the question title to the title of the current question
    var choices = currentQuestion.choices;  //Setting the choices to the choices of the current question

    choiceOutput.innerHTML = "";  //Setting the choice div to an empty string so choices can be added

    /*function nextQuestion() {
        for (var item of questions) {
            currentQuestion = item;
            item++;
        }

        return currentQuestion;
*/
    // For Loop to create a button for each choice in the current question title and choices
    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];  //Set choice to the current choice
        var correctAnswer = currentQuestion.answer === choice;  //Compare choice with correct answer to question to see if it's right

        //Creating a button for every choice in our questions array
        choiceOutput.insertAdjacentHTML('beforeend', `
        <button data-correct=${correctAnswer}>${choice}</button>
        `);

        //Once a choice is selected, the next question is loaded
        choiceOutput.addEventListener('click', function() {
                currentQuestionIndex++;    
                currentQuestion = questions[currentQuestionIndex];
                console.log(currentQuestion);          
        });
        
            
    } 

    //Display the question and choices when start button is clicked
    questionWrap.classList.remove('hide');
}



// Set the timer to start decrementing at the click of the start button by calling the timeLeft function in the event listener for the button
var countDown = btn.addEventListener ('click', function(){
    document.getElementById('start-screen').classList.add('hide'); //This hides the start screen to display only the questions
    timeLeft();
    startQuiz();
});

