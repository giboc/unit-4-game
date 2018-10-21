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
    if (name == "HK 47")
        new_char = new Character(name, 8, 15, 120);
    else if (name == "Admiral Ackbar") {
        new_char = new Character(name, 14, 5, 100);
        var audio = new Audio("assets/sounds/trap.mp3");
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
function fight(player, enemy) {
    $("#log").html("");
    $("#log").append("<br>" + player.name + " attacks for " + player.attack);
    $("#log").append("<br>" + enemy.name + " counters for " + enemy.counter);
    enemy.health -= player.attack;
    player.attack += player.baseAttack;
    $("#battlefield").find(".current_health").text(enemyChar.health);
    if (enemy.health <= 0)
        return 1;
    player.health -= enemy.counter;
    $("#char_select").find(".current_health").text(playerChar.health);
    if (player.health <= 0)
        return -1;

    return 0;

}

$(document).ready(function () {

    $("#hk47_info").html('Health: 120<br><p class="char">Base Attack: 8</p><p class="enemy">Counter: 15</p>');
    $("#ackbar_info").html('Health: 100<br><p class="char">Base Attack: 14</p><p class="enemy">Counter: 5');
    $("#dooku_info").html('Health: 150<br><p class="char">Base Attack: 8</p><p class="enemy">Counter: 20</p>');
    $("#stormtrooper_info").html('Health: 180<br><p class="char">Base Attack: 7</p><p class="enemy">Counter: 25</p>');

    $("#top_display").html("<p>Select your character!</p>");

    $(".char_wrapper").on("click", function () {
        if (playerChar == "") {
            playerChar = char_init(this.id);
            $(this).addClass("highlight");
            $(this).find("input").prop("disabled", true);
            $(this).find(".char_info").css("visibility", "hidden");
            $(this).find(".current_health").text(playerChar.health);
            $(this).find(".current_health").css("visibility", "visible");
            
            
            
            
            $(".char_wrapper").each(function () {
                if (this.id != playerChar.name)
                    $("#enemy_select").append(this);
            });

            $("#enemy_select > .char_wrapper").each(function () {
                $(this).find(".char_info").find(".enemy").css("display","inline");
                $(this).find(".char_info").find(".char").css("display","none");
            });

            $("#top_display").text("Select your opponent!");

        }

        else {
            enemyChar = char_init(this.id);
            $("#enemy_select > .char_wrapper").each(function () {
                $(this).find(".char_pic").prop("disabled", true);
                $(this).find(".char_info").css("visibility", "hidden")
            });

            // $("#enemy_select > .char_wrapper").each(function () {
            //     console.log($(this).find(".char_info"));
            // });
            $(this > ".enemy").css("display","inline");
            $(this > ".char").css("display","none");


            $(this).find(".char_info").css("visibility", "hidden");
            $(this).addClass("highlight_enemy");
            $(this).find(".current_health").text(enemyChar.health);
            $(this).find(".current_health").css("visibility", "visible");

            $("#top_display").text("Attack your opponent!");

            $("#battlefield").append(this);
        }

        
    });

    $(":button").click(function () {
        if ($("#battlefield").html() == "")
            $("#log").text("Not enough combatants.");
        else {
            switch (fight(playerChar, enemyChar)) {
                case 1:
                    $("#log").append("<br>You win!");
                    $("#battlefield").html("");
                    $("#top_display").text("Pick a new opponent");
                    if($("#enemy_select").html()=="")
                        $("#top_display").text("You have slain all your opponents!");
                    enemyChar = "";
                    $("#enemy_select > .char_wrapper").each(function () {
                        $(this).find(".char_pic").prop("disabled", false);
                        $(this).find(".char_info").css("visibility", "visible");
                    });
                    break;
                case -1:
                    $(this).prop("disabled",true);
                    $("#log").append("<br>You lose");
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