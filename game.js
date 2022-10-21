var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["green","red","yellow","blue"];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
nextSequence();
started = true;
    }
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
    var randomNumber= Math.floor(Math.random()*4)
    var randomChosenColor =buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Nivelul " + level);
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
 if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
           nextSequence();
        }, 1000);
    }
 }else {
    playSound("wrong");
    $(".btn").addClass("game-over");
    $("h1").html("Ai pierdut, FUGI! <br> sau apasa orice tasta.");
    $("body").addClass("animation");
    setTimeout(function(){
        $("body").removeClass("animation");
    },1000);
    setTimeout(function(){
      $(".btn").removeClass("game-over")
    }, 2000);
    startOver();
 }
}

function startOver() {
level = 0;
gamePattern = [];
started=false;
}
 








