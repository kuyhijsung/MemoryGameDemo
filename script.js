const gameContainer = document.getElementById("game");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let tries = 0;
let restart = document.querySelector('h2');
let totalTries = document.querySelector('span');
totalTries.textContent = "0";
let previousTries = document.getElementById('previousTries');
let data = localStorage.getItem('totalTries');
previousTries.textContent = data;
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    if (lockBoard) {
        return;
    }
    if (this === firstCard) {
        return;
    }

    let color = event.target.className;
    event.target.style.backgroundColor = color;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = event.target;
    } else {
        hasFlippedCard = false;
        secondCard = event.target;
        if (firstCard.className === secondCard.className) {
            tries++;
            firstCard.removeEventListener('click', handleCardClick);
            secondCard.removeEventListener('click', handleCardClick);
        } else {
            lockBoard = true;
            setTimeout(function () {
                firstCard.style.backgroundColor = "white";
                secondCard.style.backgroundColor = "white";
                lockBoard = false;
                firstCard = null;
                secondCard = null;
            }, 1500);
            tries++;
            console.log(tries);
        }
    }
    totalTries.textContent = tries;
    localStorage.setItem('totalTries', tries);
}

restart.addEventListener('click', resetGame);

function resetGame() {
    let div = document.querySelectorAll('div');
    let shuffledColors2 = shuffle(COLORS);
    for (let divs of div) {
        divs.textContent = '';
    }
    tries = 0;
    totalTries.textContent = tries;
    createDivsForColors(shuffledColors2);
}
// when the DOM loads
createDivsForColors(shuffledColors);