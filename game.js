const gameScore = document.querySelector(".score");
const gameScreen = document.querySelector(".gameScreen");
const gameArea = document.querySelector(".gameArea");

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

let player = {
  speed: 5,
  score: 0
};

gameScreen.addEventListener("click", start);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  //   console.log(e.key);
  //   console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  //   console.log(e.key);
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left));
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");

  lines.forEach(function (item) {
    if (item.y >= 1100) {
      item.y -= 1100;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
    if(player.score > 1000 && player.score <=1500){
      player.speed = 7;
    }
    if(player.score > 1500 && player.score == 2000){
      player.speed = 10;
    }
  });
}

function endGame() {
  player.start = false;
  gameScreen.classList.remove("hide");
  gameScreen.innerHTML = `Game Over !! <br> You Final score is ${player.score} <br> Press here to Restart the Game.`
}

function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach(function (item) {

    if (isCollide(car, item)) {
      // console.log("Boom Hit");
      endGame();
    }

    if (item.y >= 1100) {
      item.y = -500;
      item.style.left = Math.floor(Math.random() * 350) + "px";

    }
    item.y += player.speed;
    item.style.top = item.y + "px";
    if(player.score > 1000 && player.score == 1500){
      player.speed = 7;
    }if(player.score > 1500 && player.score == 2000){
      player.speed = 10;
    }
  });
}

function gamePlay() {
  //   console.log("I am moving");
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  //   console.log(road);
  if (player.start) {

    moveLines();
    moveEnemy(car);
    if (keys.ArrowUp && player.y > road.top + 100) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 100) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 70) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    // console.log(player.score++);
    player.score++;
    let ps = player.score - 2;
    gameScore.innerText = `Score : ${ps}`;
  }
}

function start() {
  // gameArea.classList.remove("hide");
  gameScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 8; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  // console.log(`Left position - ${player.x}`);
  // console.log(`Top position - ${player.y}`);

  for (x = 0; x < 6; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = ((x + 1) * 300) * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.background = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }
}

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return '#' + c() + c() + c();
}