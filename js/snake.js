"use strict";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// ====================================== VARIABLES DECLARATION

const boxSize = 32;
const gameScreenWidth = cvs.height / boxSize;
const gameScreenHeight = cvs.height / boxSize;
var score = 0;
var snakeDirection;

const snakeHeadColor = "#7fff00";
const snakeTailColor = "#6fde00"
const foodColor = "crimson"

var snake = [];
snake[0] = {
  x : 9 * boxSize,
  y : 10 * boxSize
};

var food = {
  x : Math.floor(Math.random()*gameScreenWidth) * boxSize,
  y : Math.floor(Math.random()*gameScreenHeight) * boxSize
};

// ==================================== / VARIABLES DECLARATION


// ==================================== FUNCTIONS

document.addEventListener("keydown", directionSet);
function directionSet(event) {
  var key = event.keyCode;
  if(key == 37 && snakeDirection!= "RIGHT") {
    snakeDirection= "LEFT";
  } else if(key == 38 && snakeDirection!= "DOWN") {
    snakeDirection= "UP";
  } else if(key == 39 && snakeDirection!= "LEFT") {
    snakeDirection= "RIGHT";
  } else if(key == 40 && snakeDirection!= "UP") {
    snakeDirection= "DOWN";
  }
}

// check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x &&
      head.y == array[i].y
    ) {
      return true;
    }
  }
  return false;
}

function drawScore(score) {
  ctx.fillStyle = "white";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText("score: " + score, 10, gameScreenHeight);
}

// ==================================== / FUNCTIONS


// draw everything to the canvas
function draw() {

  // updates screen every setInterval
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  // drawing a snake
  for( let i = 0; i < snake.length; i++ ) {
    ctx.fillStyle = (i == 0)? snakeHeadColor: snakeTailColor;
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize)
  }

  // drawing food
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // setting of snake's movement direction
  switch(snakeDirection) {
    case "LEFT": snakeX -= boxSize; break;
    case "UP": snakeY -= boxSize; break;
    case "RIGHT": snakeX += boxSize; break;
    case "DOWN": snakeY += boxSize; break;
    default: break;
  }

   // if the snake eats the food
  if(snakeX == food.x &&
     snakeY == food.y
    ) {

    score++;
    food = {
      x : Math.floor(Math.random()*17+1) * boxSize,
      y : Math.floor(Math.random()*15+3) * boxSize
    }
    // we don"t remove the tail
  } else {
      // else we remove the tail
      snake.pop();
  }

  // add new head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over rules
  if (snakeX < 0 ||
    snakeX > cvs.width - boxSize ||
    snakeY < 0 ||
    snakeY > cvs.height - boxSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    setTimeout(alert, 100, "Game over");
  }

  // moving head
  snake.unshift(newHead);
  drawScore(score);
}

let game = setInterval(draw, 100);