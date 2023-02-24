const CHOISES = ["paper", "rock", "scissors"];

// get table
var table = document.getElementById("board");
let playerScore = 0;
let botScore = 0;
let pushAudio = new Audio("beep.mp3");
let winAudio = new Audio("win.mp3");
let loseAudio = new Audio("lose.mp3");
let tieAudio = new Audio("tie.mp3");

async function gameStart() {
    let count = 5;
    let round = 0;
    let flag = true;
    
    const trophyPopup = document.getElementById("trophy-popup");
    trophyPopup.style.display = 'none';
    const popup = document.getElementById("popup");

    for (let i = 0; i < count; i++) {
        round = i + 1;
        // insert row <tr>
        let row = table.insertRow(round);

        // insert Cell
        let cellRound = row.insertCell(0);
        let cellPlayer = row.insertCell(1);
        let cellBot = row.insertCell(2);
        let cellResult = row.insertCell(3);

        cellRound.innerHTML = round;
        
        // Player Turn
        let userInput = "none";
        while(userInput == "none"){
            userInput = await getUserInput();
            console.log("userInput: " +userInput);
        }

        cellPlayer.appendChild(getImage(userInput))
        
        popup.style.display = "none";
        let botInput = "none";
        botInput = CHOISES[Math.floor(Math.random() * CHOISES.length)];
        console.log("botInput: " + botInput);
        cellBot.appendChild(getImage(botInput))
        
        let judgment = judge(userInput, botInput);
        console.log("The winner: " + judgment);
        cellResult.appendChild(getImage(judgment))
        if(judgment === 'player'){
            let playerScoreBoard = document.getElementById("player-score")
            playerScore += 1;
            playerScoreBoard.innerHTML = playerScore;
        } else if(judgment === 'bot' ) {
            let botScoreBoard = document.getElementById("bot-score")
            botScore += 1;
            botScoreBoard.innerHTML = botScore;
        }
    } //end for

    // conclusion
    trophyPopup.style.display = 'block';
    if (playerScore > botScore){    // player win
        document.getElementById("bot").style.display = 'none';
        winAudio.volume = 0.5;
        winAudio.play();
    } else if (botScore > playerScore) { // bot win
        document.getElementById("player").style.display = 'none';
        loseAudio.play();
    } else{
        tieAudio.play();
    }
    let play_button = document.getElementById("play-btn");
    play_button.addEventListener("click", function() {
        pushAudio.play();
        location.reload();
    });
}

async function getUserInput() {
    return new Promise(resolve => {
        const paperImg = document.getElementById("paper");
        const rockImg = document.getElementById("rock");
        const scissorsImg = document.getElementById("scissors");

        paperImg.addEventListener("click", eventHandler);
        rockImg.addEventListener("click", eventHandler);
        scissorsImg.addEventListener("click", eventHandler);
        
        // show popup box
        const popup = document.getElementById("popup");
        popup.style.display = "block";

        function eventHandler(event) {
            paperImg.removeEventListener("click", eventHandler);
            rockImg.removeEventListener("click", eventHandler);
            scissorsImg.removeEventListener("click", eventHandler);
            // get the id of the clicked image
            const clickedImageId = event.target.id;
            pushAudio.play();
            // resolve promise with user input
            let userInput;
            switch (clickedImageId) {
                case "paper":
                    userInput = "paper";
                    break;
                case "rock":
                    userInput = "rock";
                    break;
                case "scissors":
                    userInput = "scissors";
                    break;
                default:
                    userInput = "invalid";
                    break;
            }

            check = confirm("Are you sure?\n\n Your choic is " + userInput)
            if(check == false){
                userInput = "none";
            }
            
            resolve(userInput);
        }

    });
}

function judge(userInput, botInput){
    const winningOptions = {
        paper: "scissors",
        rock: "paper",
        scissors: "rock",
      };
    
      // Compare the user input to the bot input to determine the winner
      if (userInput === botInput) {
        return "tie";
      } else if (winningOptions[botInput] === userInput) {
        return "player";
      } else {
        return "bot";
      }
}

function getImage(image){
    const img = document.createElement("img");
    img.src = "images/" + image + ".png"
    img.classList.add("img-icon")
    return img
}

gameStart();

