

var playerChar = "", enemyChar = "";


function Character(name, attack, counter, health) {
    this.name = name;
    this.attack = attack;
    this.baseAttack = attack;
    this.counter = counter;
    this.health = health;
};

function char_init(name) {
    var new_char;
    if (name == "hk47")
        new_char = new Character(name, 8, 15, 120);
    else if (name == "ackbar")
        new_char = new Character(name, 14, 5, 100);
    else if (name == "dooku")
        new_char = new Character(name, 8, 20, 150);
    else if (name == "stormtrooper")
        new_char = new Character(name, 7, 25, 180);
    else {
        new_char = new Character(name, 0, 0, 0);
        console.log("Error: invalid character selection: " + name);
    }
    return new_char;
}
function fight(player, enemy) {
    
    $("#log").append("<br>" + player.name + " is fighting " + enemy.name + "!");
    $("#log").append("<br>" + player.name + "'s attack: " + player.attack);
    $("#log").append("<br>" + enemy.name + "'s counter" + enemy.counter);
    enemy.health -= player.attack;
    player.attack += player.baseAttack;
    $("#log").append("<br>" + enemy.name + "'s remaining health: " + enemy.health);
    if (enemy.health <= 0)
        return 1;
    player.health -= enemy.counter;
    if (player.health <= 0)
        return -1;
    $("#log").append("<br>" + player.name + "'s remaining health: " + player.health);
    return 0;
    
}

// var player1 = new Character(100, 100, 100);
// var player2 = new Character(50, 50, 50);
// var player3 = new Character(25, 25, 25);
$(document).ready(function () {
    // $(".char").hover(function(){
    //     alert("test");
    // })
    // $("#hk47_info").html("Health: 120<br>Base Attack: 8");
    // $("#ackbar_info").html("Health: 100<br>Base Attack: 14");
    // $("#dooku_info").html("Health: 150<br>Base Attack: 8");
    // $("#stormtrooper_info").html("Health: 180<br>Base Attack: 7");

    $("#top_display").html("<p>Select your character!</p>");

    $(".char").on("click", function () {
        if (playerChar == "") {
            playerChar = char_init(this.id);
            $(this).addClass("highlight");
            $(this).prop("disabled", true);
            $("#char_select > input").each(function () {
                if (this.id != playerChar.name)
                    $("#enemy_select").append(this);
            });
            $("#top_display").text("Select your opponent!");

        }

        // if (playerChar == "") {
        //     $(".char").css("display", "none");
        //     $(this).prop("disabled", "disabled");
        //     $(this).css("display", "inline");
        //     $(this).addClass("highlight");
        //     $("#log").text(this.id + " selected.");
        //     playerChar = this.id;
        //     $("#top_display").html("<p>Select your enemy!</p>");
        //     $("#char_select > input").each(function () {
        //         console.log(this.id == playerChar);
        //         if (this.id != playerChar) {
        //             $(this).css("display", "inline");
        //             $("#enemy_select").append(this);
        //         }
        //     });
        // }
        else if (enemyChar == "") {
            enemyChar = char_init(this.id);
            $("#battlefield").append(this);
            $("#enemy_select > input").each(function () {
                $(this).prop("disabled", true);
            })
            $("#top_display").text("Time to battle!");
            //  $(this).prop("disabled"); 
        }
        else{
            switch (fight(playerChar, enemyChar)){
                case 1:
                    alert("you win!");
                    $("#battlefield").html("");
                    enemyChar = "";
                    $("#enemy_select > input").each(function(){
                        $(this).prop("disabled",false);
                    });
                    break;
                case -1:
                    alert("you lose");
                    break;
                case 0:
                    //nothing happens;
                    break;
                default:
                    console.log("switch statement error!");
            }
        }
    });






});