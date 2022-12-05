
var time = document.getElementById("time"); // Targeting the timer on the browser
var btn = document.getElementById("start"); // Targeting the start button

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

// Set the timer to start decrementing at the click of the start button by calling the timeLeft function in the event listener for the button
startQuiz = btn.addEventListener ('click', function(){
    timeLeft();
});