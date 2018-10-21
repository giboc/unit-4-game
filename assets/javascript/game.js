//variables used to store player and enemy characters.
var playerChar = "", enemyChar = "";

//Constructor for all character objects.
function Character(name, attack, counter, health) {
    this.name = name;
    this.attack = attack;
    this.baseAttack = attack;
    this.counter = counter;
    this.health = health;
};

//Takes user input and initializes characters.
function char_init(name) {
    var new_char;
    if (name == "HK 47")
        new_char = new Character(name, 8, 15, 120);
    else if (name == "Admiral Ackbar") {
        new_char = new Character(name, 14, 5, 100);
        var audio = new Audio("assets/sounds/trap.mp3"); //IT'S A TRAP
        audio.play();
    }
    else if (name == "Count Dooku")
        new_char = new Character(name, 8, 20, 150);
    else if (name == "Stormtroopers")
        new_char = new Character(name, 7, 25, 180);
    else {
        new_char = new Character(name, 0, 0, 0);
        console.log("Error: invalid character selection: " + name);
    }
    return new_char;
}

//The battling function.
//The function keeps track of the various changes in the stats (health, etc).
//The function also returns 3 values: 1 if the player is victorious
//                                   -1 if the player loses
//                                    0 if neither character has dropped to 0 or lower.
function fight(player, enemy) {
    $("#log").html(""); //clear the log
    //display the attacks in the log.
    $("#log").append("<br>" + player.name + " attacks for " + player.attack);
    $("#log").append("<br>" + enemy.name + " counters for " + enemy.counter);
    enemy.health -= player.attack; //update enemy health
    player.attack += player.baseAttack; //update player attack
    $("#battlefield").find(".current_health").text(enemyChar.health); //check to see if enemy is defeated first
    if (enemy.health <= 0)
        return 1;
    player.health -= enemy.counter; //update player health
    $("#char_select").find(".current_health").text(playerChar.health); //check to see if you lost
    if (player.health <= 0)
        return -1;

    return 0;

}

$(document).ready(function () {
    //Display the tooltip information for characters.
    //Base attack is shown at the start, and counter attack values are hidden.
    $("#hk47_info").html('Health: 120<br><p class="char">Base Attack: 8</p><p class="enemy">Counter: 15</p>');
    $("#ackbar_info").html('Health: 100<br><p class="char">Base Attack: 14</p><p class="enemy">Counter: 5');
    $("#dooku_info").html('Health: 150<br><p class="char">Base Attack: 8</p><p class="enemy">Counter: 20</p>');
    $("#stormtrooper_info").html('Health: 180<br><p class="char">Base Attack: 7</p><p class="enemy">Counter: 25</p>');

    $("#top_display").html("<p>Select your character!</p>");

    //Character selection occurs here: 
    //The game prompts the user to pick their character first
    $(".char_wrapper").on("click", function () {
        //if playerChar is blank, the game will assign the player character.
        if (playerChar == "") {
            playerChar = char_init(this.id); //initialize the character
            $(this).addClass("highlight"); //adds a pretty border to selection.
            $(this).find("input").prop("disabled", true); //disables the ability to "click" the character
            $(this).find(".char_info").css("visibility", "hidden"); //Hide tooltip
            $(this).find(".current_health").text(playerChar.health);
            $(this).find(".current_health").css("visibility", "visible"); //Display the health.

            //After player character has been chosen, send all the other characters to enemy select.
            $(".char_wrapper").each(function () {
                if (this.id != playerChar.name)
                    $("#enemy_select").append(this);
            });
            //Update the tooltip to show enemy counter attack instead of base attack.
            $("#enemy_select > .char_wrapper").each(function () {
                $(this).find(".char_info").find(".enemy").css("display", "inline");
                $(this).find(".char_info").find(".char").css("display", "none");
            });

            $("#top_display").text("Select your opponent!");

        }
        //if playerChar has been assigned, the game will assume the player is selecting enemies.
        else {
            enemyChar = char_init(this.id);
            $("#enemy_select > .char_wrapper").each(function () {
                $(this).find(".char_pic").prop("disabled", true); //disable character selection after choice is made.
                $(this).find(".char_info").css("visibility", "hidden") //hide tooltip
            });

            $(this > ".enemy").css("display", "inline");
            $(this > ".char").css("display", "none");


            $(this).find(".char_info").css("visibility", "hidden");
            $(this).addClass("highlight_enemy");
            $(this).find(".current_health").text(enemyChar.health);
            $(this).find(".current_health").css("visibility", "visible"); //Update the image to display health

            $("#top_display").text("Attack your opponent!");

            $("#battlefield").append(this); //Send the selected enemy to the battlefield.
        }


    });
    //The attack button.
    $(":button").click(function () {
        if ($("#battlefield").html() == "")
            $("#log").text("Not enough combatants."); //error checking when attacking.
        else {
            switch (fight(playerChar, enemyChar)) {
                case 1:
                    $("#log").append("<br>You win!");
                    $("#battlefield").html("");
                    $("#top_display").text("Pick a new opponent");
                    if ($("#enemy_select").html() == "")
                        $("#top_display").text("You have slain all your opponents!"); //You are the ultimate winner!
                    enemyChar = "";
                    $("#enemy_select > .char_wrapper").each(function () {
                        $(this).find(".char_pic").prop("disabled", false);
                        $(this).find(".char_info").css("visibility", "visible");
                    });
                    break;
                case -1:
                    $(this).prop("disabled", true);
                    $("#log").append("<br>You lose");
                    //Create a restart button to play again. This just reloads the page.
                    $("#log").append("<br><input type='button' value='Restart' onclick=location.reload()>");

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