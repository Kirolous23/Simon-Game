//Array of Button ID - Array of gamePattern - Array of userClickedPattern
var buttonColors = ["green","red","blue","yellow"];
var gamePattern =[];
var userClickedPatterns = []

//Adding sounds based on ID
function playSound(ID){
    var link = "./sounds/"+ID+".mp3";
    var audio = new Audio(link);
    audio.play();
}

//Adding Animations Based on ID
function pressed(ID){
    $("#"+ID).addClass("pressed");
    setTimeout(function(){
        $("#"+ID).removeClass("pressed");
    },100)
}

//Buttons Behavior
$(".btn").click(function(){
    var ID = this.id;
    playSound(ID);
    pressed(ID);
    userClickedPatterns.push(ID);
    comparison(); //Comparing Results

});

//Random Pattern Animation & Sound Behaviour
function randomBehaviour(ID){
    $("#"+ID).fadeOut(100).fadeIn(100);
    playSound(ID);
}

//GameOver behaviour
function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    // playing Wrong Sound
    playSound("wrong")
}

//Next Sequance
function nextSequance(){
    var randomNo = Math.floor((Math.random() * 4)); // nu = 0 - 3
    var randomButton = buttonColors[randomNo]; // random Color
    randomBehaviour(randomButton); //Animation & Sound
    gamePattern.push(randomButton);
    $("h1").text("Level "+ levelNo );
    levelNo++;
}

//Starting the Game for the first time 
$(document).keydown(function(){
    nextSequance();
    $(document).unbind();
});
// Comparing userClickedPatterns to gamePatterns
var count = 0;
var levelNo = 1;
function comparison(){
    var userLength = userClickedPatterns.length;
    var gameLength = gamePattern.length;
    var userClick = userClickedPatterns[count];
    var rightAnswer = gamePattern[count];
    if((userClick === rightAnswer)&&(userLength===gameLength)){
        setTimeout(nextSequance,1000);
        userClickedPatterns=[];
        count = 0;
    }else if ((userClick === rightAnswer)){
        count++;
    } else{
        gameOver();
        count = 0;
        gamePattern=[];
        $("h1").text("Game Over Press Any Key to Restart")
        $(document).keydown(function(){
            nextSequance();
            $(document).unbind();
        });
        levelNo = 1 ;
    }
}











































 // Function of Genration of random no 1-4 in form of a string
// function random(){
// var randomNo = Math.floor((Math.random() * 4 ) + 1);
//     randomNoString = randomNo.toString();
// return randomNoString;
// } 
// // Linking the random no to the squares
