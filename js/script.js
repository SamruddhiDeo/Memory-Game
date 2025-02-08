let startGameBtn = document.querySelector("#startGameBtn")
console.log(startGameBtn)

startGameBtn.addEventListener("click", () => {
  let cardVal = document.querySelector('input[name="cardVal"]:checked')?.value
  console.log(cardVal)
  if (cardVal) {
    window.location.href = `memory-game.html?card=${encodeURIComponent(cardVal)}`;
  } else {
    alert('Please select number of cards');
  }
})