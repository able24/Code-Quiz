// Getting score from localStorage
var highScore = JSON.parse(localStorage.getItem("Score"));
var initial = JSON.parse(localStorage.getItem("Initials"));

//Targetting the clear highscore button
var clearHighScore = document.getElementById('clear');


// Displaying the score when you click view highscore
document.getElementById('highscores').innerHTML = `${initial}: ${highScore}`;

// Clearing out scores displayed once the clear highscore button is pressed
clearHighScore.addEventListener ('click', function() {
    document.getElementById('highscores').classList.add('hide');
});

