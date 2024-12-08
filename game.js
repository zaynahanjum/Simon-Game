var userClickedPattern =[];
var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

function playSound(name) {
    var colourAudio = new Audio ('./sounds/' + name + ".mp3")
    colourAudio.play();

}

function nextSequence(){ 
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour); 
    checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(currentLevel === gamePattern[userClickedPattern.length - 1]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence ,(1000));
            userClickedPattern = [];
        } 
    } else {
        console.log("wrong");
        var wrongAudio = new Audio('./sounds/wrong.mp3');
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");  
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


