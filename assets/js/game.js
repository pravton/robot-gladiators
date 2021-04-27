var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttck = 10;
var playerMoney = 10;

//You can also log multiple values at once like this
console.log(playerName, playerAttck, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    window.alert("Welcome to Robort Gladiators")

    //Ask the question
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose"); 

    //if player choose to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //Subtrack the value of "playerAttck" from the value of "enemyHealth" and use that result to update the value in the "enemyHealth" variable
        enemyHealth = enemyHealth - playerAttck;

        //Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        //check enemy's health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has died");
        }

        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left");
        }

        //Subtract the vale of "enemyAttck" from the value of "playerHealth" and use that result to update the value in the "playerHealth" variable.
        playerHealth = playerHealth - enemyAttack;

        //Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining ");

        //check enemy's health
        if (playerHealth <=0) {
            window.alert(playerName + " has died");
        }

        else {
            window.alert(playerName + " still has " + playerHealth + " health left");
        }
        //If player choose to skip
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes, leave the fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to quit this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 2;
        }
        //if no (false), ask the question againby running the fight( again)
        else {
            fight();
        }
        window.alert(playerName + " has chosen to skip the fight!");

    } else {
        window.alert("You need to choose a valid option. Try again!")
    }

};


    
fight();