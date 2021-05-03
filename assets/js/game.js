/* GAME LOGIC START */

//create a funtion to generate random number for enemy health.
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var fightOrSkip = function() {
    //Ask the question
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose"); 

    //If the "promtFight" is not a valid value, than execute the following statements
    if (!promptFight) {
        window.alert("You need to provide a valid response! Please try again.")
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes, leave the fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to quit this fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            // return if player wants to leave.
            return true;
        }
    }

}


var fight = function(enemy) {
    //keep track of who goes firts
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    //promt the fight or skip the fight.
    //repeat and executive as long as the enemy-robot is alive. 
    while (enemy.health > 0 && playerInfo.health > 0) {
        //If is the player's turn
        if (isPlayerTurn) {
            //Ask the question
            if (fightOrSkip()) {
            //if true leave fight by breaking the loop.
            break;
            }

            /*//if player choose to fight, then fight
            if (promptFight === "fight" || promptFight === "FIGHT") {*/
            //Subtrack the value of "playerInfo.attack" from the value of "enemy.health" and use that result to update the value in the "enemy.health" variable
            var damage = randomNumber((playerInfo.attack - 3), playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            
            //Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            window.alert(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died");
                break;
            }

            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left");
            }

        } 
        else {
            //Subtract the vale of "enemyAttck" from the value of "playerInfo.health" and use that result to update the value in the "playerInfo.health" variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage); 

            //Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining ");
            window.alert(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining ");

            //check enemy's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died");
                break;
            }       
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left");
            }
            //If player choose to skip confirm and then stop the loop
        }

        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }     
};

//wrap the game logic in a startGame() function
var startGame = function() { 
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let the player know what round they are in
            window.alert("Welcome to Robort Gladiators! Round " + (i + 1));
    
            //pick new each enemy when the old enemy is defeted
            var pickedEnemyOnj = enemyInfo[i];
            
            //reset enemy.health before starting new fight
            pickedEnemyOnj.health = randomNumber(40, 60);
    
            //call fight funtion with enemy robot
            fight(pickedEnemyOnj);

            //if we 're not at the ;ast enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask the player if they want to use the shop before going to the next roung
                var storeConfirm = window.confirm("The fight is over, visit the shop before the next round?")

                //if yes, confirm with the store
                if (storeConfirm) {
                    shop();
                }
                
            }
            // if player isn't alive, stop the game
        } else {
            window.alert("You have lost your robot in battle! GAME OVER!");
            break;
        }
       
    }

    //play again
    endGame();
};

//function to end the entire game
var endGame = function () {
    if (playerInfo.health > 0) {
        window.alert("The game now ended. Lets see how you did!");
        
        //log the highscore to local storage
        var highScore = localStorage.getItem("HighScore", playerInfo.money);

        if (highScore === null) {
            highScore = 0;
        }
        
        //if the highcore is highier than the local score 
        if (playerInfo.money > highScore) {
            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);

            alert(playerInfo.name + " now has the highier score of " + highScore + " !");
        }
        else {
            alert(playerInfo.name + " did not beat the highier score of " + playerInfo.money + " ! Better luck next time!");
        }

    }
    else {
        window.alert("You've lost your robot in battle");
    }
    
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else{
        window.alert("Thank you for playing Robort Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, upgrade your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make choice."
    );

    //chnage the strings to Int
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //Using switch funtion to fillfil the shop feature
    debugger;
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2: 
            playerInfo.upgradeAttack();
            break;

        case 3: 
            window.alert("Leaving the store.");
            //do nothing, so the funtion will end
            break;

        default: 
            window.alert("You did not pick a valid option. Try again.");
            //call shop( again to force player to pick a valid option)
            shop();
            break;
    }
};

//Funtion to set a player name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name);
    return name;
}; 

/* GAME LOGIC END */

/* GAME INFORMATION / VARIABLES */

// Player information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 100;
        this.attack = 50;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack ny 6 for 7 dollars")
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enaough money for the upgrade")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enaough money for the upgrade")
        }      
    }
};

//You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(playerInfo);
console.log(enemyInfo);

    // Start Game  
    startGame();
