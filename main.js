let userScore = 0;
let computerScore = 0;
let drawScore = 0;
let roundScore = 0;

// Getting all elements of the DOM
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const drawScore_span = document.getElementById("draw-score");
const roundScore_span = document.getElementById("round-score");

const result_p = document.querySelector(".result > p");

const scoreBoard_div = document.querySelector(".score-board");

const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

const machineChoice_div = document.querySelector(".machine-choice");
const machineChoice_img = document.querySelector(".machine-choice img");

const rules_button = document.querySelector(".rules-button");
const rulesModal_div = document.querySelector(".rules-game-modal");
const rulesClose_button = document.querySelector(".rules-close-btn");

const modal_div = document.querySelector(".modal");
const modal_p = document.querySelector(".modal > p");
const playAgain_button = document.querySelector(".play-again");
const playLater_button = document.querySelector(".play-later");

const playLater_div = document.querySelector(".later-modal");
const playLater_text = document.querySelector(".later-modal > p");
const laterClose_button = document.querySelector(".later-close-btn");

//3. hideNoChoices() hides no selected userChoices
function hideNoChoices(letterchoice) {
	//console.log("user is: " + letterchoice);
	switch (letterchoice) {
		case "r":
			paper_div.style.display = "none";
			scissors_div.style.display = "none";
			break;
		case "p":
			rock_div.style.display = "none";
			scissors_div.style.display = "none";
			break;
		case "s":
			rock_div.style.display = "none";
			paper_div.style.display = "none";
			break;
	}
}

//4. To get the random computer choice from 3 different choices.
function getComputerChoice() {
	const choices = ["r", "p", "s"];
	//firstly we need a function that gives us a random number for index
	const randomNumber = Math.floor(Math.random() * 3);
	//then, getComputerChoice function return a random computer choice (r, p or s)
	return choices[randomNumber];
}

//5. the computerChoice img is showed on right side
function showComputerChoice(machineChoice) {
	//console.log("machine is: " + machineChoice);
	if (machineChoice === "r") {
		machineChoice_img.src = "images/rock.png";
	}
	if (machineChoice === "p") {
		machineChoice_img.src = "images/paper.png";
	}
	if (machineChoice === "s") {
		machineChoice_img.src = "images/scissors.png";
	}
}

function convertToWord(letter) {
	if (letter === "r") return "Rock";
	if (letter === "p") return "Paper";
	return "Scissors";
}

//6.1 if the combination is for win:
function win(userChoice, computerChoice) {
	//userScore variable add +1 point.
	userScore++;
	//roundScore variable add +1 round.
	roundScore++;
	//userScore, computerScore, drawScore and roundScore are noted in scoreBoard.
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	drawScore_span.innerHTML = drawScore;
	roundScore_span.innerHTML = roundScore;
	//and result_p is updated with the winning user.
	result_p.innerHTML = `<i class="fa-solid fa-user"></i> ${convertToWord(
		userChoice
	)} beats <i class="fa-solid fa-desktop"></i> ${convertToWord(
		computerChoice
	)}. You win! ️‍🔥`;
}

//6.2 if the combination is for lose:
function lose(userChoice, computerChoice) {
	//computerScore variable add +1 point.
	computerScore++;
	//roundScore variable add +1 round.
	roundScore++;
	//userScore, computerScore, drawScore and roundScore are noted in scoreBoard.
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	drawScore_span.innerHTML = drawScore;
	roundScore_span.innerHTML = roundScore;
	//and result_p is updated with the losing user.
	result_p.innerHTML = `<i class="fa-solid fa-user"></i> ${convertToWord(
		userChoice
	)} loses vs <i class="fa-solid fa-desktop"></i> ${convertToWord(
		computerChoice
	)}. You lost... 💩`;
}

//6.3 if the combination is for draw:
function draw(userChoice, computerChoice) {
	//drawScore variable add +1 point.
	drawScore++;
	//roundScore variable add +1 round.
	roundScore++;
	//userScore, computerScore, drawScore and roundScore are noted in scoreBoard.
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	drawScore_span.innerHTML = drawScore;
	roundScore_span.innerHTML = roundScore;
	//and result_p is updated with the draw.
	result_p.innerHTML = `<i class="fa-solid fa-user"></i> ${convertToWord(
		userChoice
	)} equals <i class="fa-solid fa-desktop"></i> ${convertToWord(
		computerChoice
	)}. It's a draw.`;
}

// 7. Each 10 rounds, refreshRound() will refresh game board for moving again.
function refreshRound() {
	rock_div.style.display = "inline-block";
	paper_div.style.display = "inline-block";
	scissors_div.style.display = "inline-block";
	machineChoice_img.src = "images/question-mark.png";
}

// 7.1 After 10 rounds, showModal() is executed.
function showModal() {
	//it shows a modal overlay with 2 optional buttons.
	modal_div.classList.add("open");
	//also it adds the final result.
	if (userScore > computerScore) {
		modal_p.innerHTML = "You win! 🏆";
	}
	if (userScore < computerScore) {
		modal_p.innerHTML = "You lose! 👎";
	}
	if (userScore == computerScore) {
		modal_p.innerHTML = "It was a draw! 🤝";
	}
}

// restartGame() puts all variable to 0 and scoreBoard in 0.
function restartGame() {
	userScore = 0;
	computerScore = 0;
	drawScore = 0;
	roundScore = 0;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	drawScore_span.innerHTML = drawScore;
	roundScore_span.innerHTML = roundScore;
	//also restart the result paragraph.
	result_p.innerHTML = "Make your movement.";
	// and also refresh the game board.
	refreshRound();
}

//when click "Play again" button, it hides the modal overlay and restart the game.
playAgain_button.addEventListener("click", () => {
	modal_div.classList.remove("open");
	restartGame();
});

//when click "Play later" button, it asks to confirm the exit:
playLater_button.addEventListener("click", () => {
	// if yes, it shows a modal overlay with "See you soon" message.
	if (confirm("Are you sure you want to quit the game?")) {
		playLater_div.classList.add("show");
		playLater_text.innerHTML = "See you soon! 👊";

		// if not, it shows the initial modal overlay with the 2 optional buttons.
	} else {
		modal_p.innerHTML = "And the winner is...";
	}
});

//when click "rules" button, it shows a modal overlay with the game rules.
rules_button.addEventListener("click", () => {
	rulesModal_div.classList.add("visible");
});

//when click "X" button in rules screen, it closes the rules screen.
rulesClose_button.addEventListener("click", () =>
	rulesModal_div.classList.remove("visible")
);

//when click "X" button in exit screen, it closes the exit screen.
laterClose_button.addEventListener("click", () =>
	playLater_div.classList.remove("show")
);

//2. The game function is passed a parameter as a user choice.
function game(userChoice) {
	//3. hideNoChoices() hides no selected userChoices.
	hideNoChoices(userChoice);
	//4. Also we need a random computer choice. For that, getComputerChoice().
	const computerChoice = getComputerChoice();
	//5. the computerChoice img is showed on right side.
	showComputerChoice(computerChoice);
	//console.log(computerChoice);
	//Once we have both choices, we can compare 3 combination for win, lose or draw.
	switch (userChoice + computerChoice) {
		//6.1 if these combination happens, win() is executed.
		case "rs":
		case "pr":
		case "sp":
			win(userChoice, computerChoice);
			break;
		//6.2 if these combination happens, lose() is executed.
		case "rp":
		case "ps":
		case "sr":
			lose(userChoice, computerChoice);
			break;
		//6.3 if these combination happens, draw() is executed.
		case "rr":
		case "pp":
		case "ss":
			draw(userChoice, computerChoice);
			break;
	}

	// 7. Each 10 rounds, refreshRound() will refresh game board in 2seconds.
	let rounds = roundScore;
	setTimeout(() => {
		if (rounds < 2) {
			refreshRound();
		} else {
			// 7.1 After 10 rounds, it shows a modal overlay with 2 optional buttons.
			showModal();
		}
	}, 2000);
}

/*
1. To play, we assign each choice a click event that will execute the game 
function with its corresponding letter as a parameter. 
*/
function main() {
	rock_div.addEventListener("click", () => {
		game("r");
	});
	paper_div.addEventListener("click", () => {
		game("p");
	});
	scissors_div.addEventListener("click", () => {
		game("s");
	});
}

main();
