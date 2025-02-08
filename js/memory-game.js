//Initializations
let urlParams = new URLSearchParams(window.location.search);
let cardVal = Number(urlParams.get('card'));
let gridContainer = document.querySelector(".gridContainer");
let gameOverContainer = document.querySelector(".gameOverContainer");
let gameOver = document.querySelector(".gameOver");
let turns = document.querySelector(".turns").lastElementChild;
let matches = document.querySelector(".matches").lastElementChild;
let reset = document.querySelector(".reset");
let noOfCardsOpen = 0;
let noOfTurns = 0;
let noOfMatches = 0;
let isListenerAdded = false;
let openCardsArr = [];
let matchedCardsArr = [];
let screenWidth = window.innerWidth;
let cardIndex = 0;
let timeout1;
let timeout2;
let cardHtml = `<div class="card"> </div>`
let arr16 = ["../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png"];

let arr20 = ["../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card9.png", "../assets/card10.png", "../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card9.png", "../assets/card10.png"];

let arr24 = ["../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card9.png", "../assets/card10.png", "../assets/card11.png", "../assets/card12.png", "../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card9.png", "../assets/card10.png", "../assets/card11.png", "../assets/card12.png"];

let arr30 = ["../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card9.png", "../assets/card10.png", "../assets/card11.png", "../assets/card12.png", "../assets/card13.png", "../assets/card14.png", "../assets/card15.png", "../assets/card1.png", "../assets/card2.png", "../assets/card3.png", "../assets/card4.png", "../assets/card5.png", "../assets/card6.png", "../assets/card7.png", "../assets/card8.png", "../assets/card9.png", "../assets/card10.png", "../assets/card11.png", "../assets/card12.png", "../assets/card13.png", "../assets/card14.png", "../assets/card15.png"];

let cardArrays = {
    arr16: arr16,
    arr20: arr20,
    arr24: arr24,
    arr30: arr30,
};

let arrKey = `arr${cardVal}`

shuffleArray(cardArrays[arrKey]);

console.log(cardArrays[arrKey])

addCards();

//Add cards based on the number user selected
function addCards() {
    for (let i = 0; i < cardVal; i++) {
        gridContainer.innerHTML += cardHtml
        gridContainer.lastElementChild.id = `${i + 1}`;
    }
}

let cards = document.querySelectorAll(".card")

//Change grid size according to number of cards and screenWidth to make it responsive
if (screenWidth > 450) {
    if (cardVal == 16) {
        gridContainer.style.gridTemplateColumns = 'repeat(4, 60px)';
    } else if (cardVal == 20) {
        gridContainer.style.gridTemplateColumns = 'repeat(5, 60px)';
    } else if (cardVal == 24) {
        gridContainer.style.gridTemplateColumns = 'repeat(6, 60px)';
    } else if (cardVal == 30) {
        gridContainer.style.gridTemplateColumns = 'repeat(6, 60px)';
    }
} else {
    if (cardVal == 16) {
        gridContainer.style.gridTemplateColumns = 'repeat(4, 60px)';
    } else if (cardVal == 20) {
        gridContainer.style.gridTemplateColumns = 'repeat(4, 60px)';
    } else if (cardVal == 24) {
        gridContainer.style.gridTemplateColumns = 'repeat(4, 60px)';
    } else if (cardVal == 30) {
        gridContainer.style.gridTemplateColumns = 'repeat(5, 40px)';
        Array.from(cards).forEach(e => {
            e.style.width = "40px"
            e.style.height = "50px"
        })
    }
}

//Reset button listener
reset.addEventListener("click", function () {
    resetGame();
})

//Handle click on cards
const handleCardClick = (event) => {
    //Opening Cards
    let card = event.target;
    cardIndex = card.id;
    let cardImg = cardArrays[arrKey][cardIndex - 1];
    card.classList.toggle('flipped');
    setTimeout(() => {
        card.style.backgroundImage = `url(${cardImg})`;

        noOfCardsOpen++;
        openCardsArr.push(card);
        openCardsArr[0].removeEventListener("click", handleCardClick);

        if (noOfCardsOpen == 2) {
            //increase no of turns
            noOfTurns++;
            turns.innerHTML = noOfTurns;

            //remove listener
            toggleCardEventLister();
            //If cards matches
            if (openCardsArr[0].style.backgroundImage == openCardsArr[1].style.backgroundImage) {

                //to transition of cards upwards
                setTimeout(() => {
                    openCardsArr[0].classList.add("hideCard");
                    openCardsArr[1].classList.add("hideCard");
                }, 600);
                //After a second bringing the cards back to their original position by removing class hideCard
                timeout1 = setTimeout(() => {
                    //remove image from background
                    openCardsArr[0].style.backgroundImage = "none"
                    openCardsArr[1].style.backgroundImage = "none"
                    openCardsArr[0].style.border = "none"
                    openCardsArr[1].style.border = "none"
                    //remove hideCard class
                    openCardsArr[0].classList.remove("hideCard");
                    openCardsArr[1].classList.remove("hideCard");
                    matchedCardsArr.push(openCardsArr[0], openCardsArr[1])

                    //add listener
                    toggleCardEventLister();

                    noOfCardsOpen = 0;
                    openCardsArr = [];

                    //increase no of matches
                    noOfMatches++;
                    matches.innerHTML = noOfMatches;

                    //check if game finished
                    if (noOfMatches == (cardVal / 2)) {
                        gameFinished();
                    }

                }, 1000);

                //if cards dont match
            } else {
                timeout2 = setTimeout(() => {
                    //close cards
                    for (const openCard of openCardsArr) {
                        setTimeout(() => {
                            openCard.style.backgroundImage = "linear-gradient(to top right, #804102, #b08b65)";
                        }, 200);
                        openCard.classList.toggle('flipped');
                    }

                    //add listener
                    toggleCardEventLister();

                    noOfCardsOpen = 0;
                    openCardsArr = [];
                }, 1500);

            }
        }
    }, 200);
}

//To by default addEventListeners
toggleCardEventLister();

//Toggle addEventListener and removeEventListener on cards
function toggleCardEventLister() {
    if (isListenerAdded) {
        Array.from(cards).forEach(e => {
            e.removeEventListener("click", handleCardClick);
        });
        isListenerAdded = false;
    } else {
        Array.from(cards).forEach(e => {
            if (!(matchedCardsArr.includes(e))) {
                e.addEventListener("click", handleCardClick);
            }
        });
        isListenerAdded = true;
    }
}

function shuffleArray(arr) {
    let randomIndex;
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = Math.floor(Math.random() * (arr.length - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
}

function resetGame() {
    clearTimeout(timeout1)
    clearTimeout(timeout2)
    noOfCardsOpen = 0;
    noOfTurns = 0;
    turns.innerHTML = noOfTurns;
    noOfMatches = 0;
    matches.innerHTML = noOfMatches;
    openCardsArr = [];
    matchedCardsArr = [];
    isListenerAdded = false;
    toggleCardEventLister()
    shuffleArray(cardArrays[arrKey]);
    Array.from(cards).forEach(e => {
        e.style.backgroundImage = "linear-gradient(to top right, #804102, #b08b65)";
        e.style.border = "1px solid #320105"
    });
}

function gameFinished() {
    gameOverContainer.style.display = "block"
    gameOver.querySelector(".totalTurnsTaken").innerHTML = `Turns Taken : ${noOfTurns}`
    gameOver.querySelector("button").addEventListener("click", function () {
        gameOverContainer.style.display = "none"
        resetGame();
    })
}