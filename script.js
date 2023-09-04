let boxes = document.querySelectorAll(".box");
let gameStatus = document.querySelector(".game-info");
let main = document.querySelector(".main");
let btn = document.querySelector(".new-game");
let flag = true;
let cnt = 0;
let currentPlayer = "X";
let grid;

const wc = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];
function tied(cnt) {
  if (cnt == 9) {
    gameStatus.innerText = "Match Tied";
    main.classList.add("select");
  }
}
function freshGame() {
  gameStatus.innerText = `Current Player-${currentPlayer}`;
  grid = ["", "", "", "", "", "", "", "", ""];
  main.setAttribute('disabled',false);
  boxes.forEach((box, index) => {
    box.innerText = "";
    if(boxes[index].classList.contains('green')){
      boxes[index].classList.remove("green");
    }
  });
  btn.classList.add("not-active");
  flag = true;
}
freshGame();
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if(btn.classList.contains('not-active')){
      performAction(index);
      
    }
  });
});
function performAction(index) {
  if (grid[index] == "") {
    boxes[index].innerText = currentPlayer;
    grid[index] = currentPlayer;
    cnt++;
    swapTurn();
    gameTie();
    gameOver();
    

  }
}

function swapTurn() {
  if(currentPlayer=="X"){
    currentPlayer="0";
  }
  else{
    currentPlayer="X";
  }
  gameStatus.innerText = `Current Player-${currentPlayer}`;
}

function gameTie(){
  if(cnt==9){
    gameStatus.innerText = "Game Tied!";
    btn.classList.remove("not-active");
    cnt=0;
  }
}
function gameOver() {
  for (let i = 0; i < 8; i++) {
    let firstPos = wc[i][0];
    let secondPos = wc[i][1];
    let thirdPos = wc[i][2];
    if (
      grid[firstPos] != "" &&
      (grid[firstPos] == grid[secondPos] &&
      grid[firstPos] == grid[thirdPos])
    ) {
      swapTurn();
      gameStatus.innerText = `${currentPlayer} won`;
      btn.classList.remove("not-active");
      boxes[firstPos].classList.add("green");
      boxes[secondPos].classList.add("green");
      boxes[thirdPos].classList.add("green");
      cnt=0;
    }
  }
}
btn.addEventListener("click", freshGame());
