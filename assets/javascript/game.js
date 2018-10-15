

var playerChar; 

function Character(attack, counter, health){
    this.attack = attack;
    this.counter = counter;
    this.health = health;
}

var player1 = new Character(100,100,100);
var player2 = new Character(50,50,50);
var player3 = new Character(25,25,25);

$(".char").on("click",function(){
    alert("test");
    $("#log").text(this.id + " selected.");
    if(this.id=="strong")
        playerChar = player1;
    else if(this.id == "medium")        
        playerChar = player2;
    else
        playerChar = player3;
        
});