// Getting score from localStorage
var highScore = JSON.parse(localStorage.getItem("Score"))

//Targetting highscore element and setting displaying score from localStorage to highscore
document.getElementById("highscores").innerHTML= highScore