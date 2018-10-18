

var playerChar = "", enemyChar = "";


function Character(attack, counter, health) {
    this.attack = attack;
    this.counter = counter;
    this.health = health;
};



function fight(player, enemy) {
    $("#log").append("<br>" + player + " is fighting " + enemy + "!");
}

// var player1 = new Character(100, 100, 100);
// var player2 = new Character(50, 50, 50);
// var player3 = new Character(25, 25, 25);
$(document).ready(function () {

    $("#top_display").html("<p>Select your character!</p>");

    $(".char").on("click", function () {
        if (playerChar == "") {
            $(".char").css("display", "none");
            $(this).prop("disabled", "disabled");
            $(this).css("display", "inline");
            $(this).addClass("highlight");
            $("#log").text(this.id + " selected.");
            playerChar = this.id;
            $("#top_display").html("<p>Select your enemy!</p>");
            $("#char_select > input").each(function () {
                console.log(this.id == playerChar);
                if (this.id != playerChar) {
                    $(this).css("display", "inline");
                    $("#enemy_select").append(this);
                }
            });
        }
        else{
            enemyChar = this.id;
            $("#battlefield").append(this);
            //  $(this).prop("disabled"); 
        }
            
    });






});