const boxes = document.querySelectorAll(".box");
const gameStatus = document.querySelector(".game-info");
const main = document.querySelector(".main");
const btn = document.querySelector(".new-game");
let flag = true;
let cnt = 0;

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boxes[a].innerText === player &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      combination.forEach((index) => boxes[index].classList.add("green"));
      gameStatus.innerText = `${player} WON`;
      btn.classList.remove("not-active");
      return true;
    }
  }

  return false;
}

function tied() {
  if (cnt === 9) {
    gameStatus.innerText = "Match Tied";
    main.classList.add("select");
  }
}

function handleBoxClick(index) {
  if (!boxes[index].innerText) {
    const currentPlayer = flag ? "X" : "0";
    boxes[index].innerText = currentPlayer;
    flag = !flag;
    gameStatus.innerText = `Current Player-${flag ? "X" : "0"}`;
    cnt++;

    if (!checkWin(currentPlayer)) {
      tied();
    }
  }
}

function freshGame() {
  for (const box of boxes) {
    box.innerText = "";
    box.classList.remove("green");
  }
  gameStatus.innerText = "Current Player-X";
  flag = true;
  cnt = 0;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleBoxClick(index);
  });
});

btn.addEventListener("click", freshGame);
