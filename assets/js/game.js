var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Andorid", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    //repeat and executive as long as the enemy-robot is alive. 
    while (enemyHealth > 0 && playerHealth > 0) {
    //Ask the question
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose"); 

        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            //if yes, leave the fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to quit this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }   
        } 

        /*//if player choose to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {*/
            //Subtrack the value of "playerAttack" from the value of "enemyHealth" and use that result to update the value in the "enemyHealth" variable
            enemyHealth = enemyHealth - playerAttack;

            //Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            //check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died");
                break;
            }

            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left");
            }

        //Subtract the vale of "enemyAttck" from the value of "playerHealth" and use that result to update the value in the "playerHealth" variable.
        playerHealth = playerHealth - enemyAttack;

        //Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining ");

        //check enemy's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died");
        }

        else {
            window.alert(playerName + " still has " + playerHealth + " health left");
        }
        //If player choose to skip confirm and then stop the loop
    }
};

//wrap the game logic in a startGame() function
var startGame = function() { 
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            //let the player know what round they are in
            window.alert("Welcome to Robort Gladiators! Round " + (i + 1));
    
            //pick new each enemy when the old enemy is defeted
            var pickedEnemyName = enemyNames[i];
            
            //reset enemyHealth before starting new fight
            enemyHealth = 50;
    
            //call fight funtion with enemy robot
            fight(pickedEnemyName);

            //if we 're not at the ;ast enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("The game now ended. Lets see how you did!");
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
        "Would you like to REFILL your health, upgrade your attack, or LEAVE the store? Please enter one 'REFILL'. 'UPGRADE', or 'LEAVE' to make choice."
    );

    //Using switch funtion to fillfil the shop feature
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You do not have enaugh money!");
            }
            
            break;

        case "UPGRADE":
        case "upgrade": 
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase player attach and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You do not have enaugh money");
            }
           
            
            break;

        case "LEAVE":
        case "leave": 
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

    // Start Game  
    startGame();
