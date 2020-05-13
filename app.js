const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext("2d");//store our drawing on canvas
const ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height - 30; //new x and y will move ball
let dx = 2;
let dy = -2;
const paddleHeight = 12;
const paddleWidth = 72;
let paddleX = (canvas.width - paddleWidth)/2; //starting point for paddle on x axis (sets in the middle)
let rightPressed = false; //initialize value for player buttons
let leftPressed = false;

const brickRowCount = 4;
const brickColumnCount = 7;
const brickWidth = 80;
const brickHeight = 24;
const brickPadding = 12;
const brickOffsetTop = 32;
const brickOffsetLeft = 32;

let bricks = []; //initialize empty bricks array
for(c=0; c<brickColumnCount; c++){ //make the brick columns
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++){ //make the brick rows
    bricks[c][r] = {x: 0, y: 0}; //set each brick at (0, 0)
  }
}

document.addEventListener("keydown", keyDownHandler, false); //event listener for key press
document.addEventListener("keyup", keyUpHandler, false); //event listener for no key press/key up

function keyDownHandler(e) {
  if(e.keyCode == 39){ //if you are pressing down right arrow button (39) rightPressed is true
    rightPressed = true;
  }
  else if(e.keyCode == 37){ //if you are pressing down let arrow button (37) leftPressed is true
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){ //if you lift off the right arrow button
    rightPressed = false;
  }
  else if(e.keyCode == 37){ //if you lift off the left arrow button
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();//start drawing
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  //arc(x coord at center, y coord at center, radius, starting angle, ending angle, counterclockwise)
  ctx.fillStyle = 'red';//give color to ball
  ctx.fill();//actually fills the ball
  ctx.closePath();//end drawing
}

function drawPaddle(){
  ctx.beginPath();//start drawing
  ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
  //rect(x coord, y coord, width, height)
  ctx.fillStyle = 'blue';//give color to paddle
  ctx.fill();//actually fills the paddle
  ctx.closePath();//end drawing
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height) //clear canvas each frame
  drawBall();
  drawPaddle();
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){ //bounce off L or R sides
    dx = -dx; //go the opposite way
  }
  if(y + dy < ballRadius){
    dy = -dy; //go the opposite way
  }
  else if(y + dy > canvas.height - ballRadius){ //bounce off top
    if(x > paddleX && x < paddleX + paddleWidth){ //when ball touches paddle
      dy = -dy; //go opposite way
    }
    else {
      alert("GAME OVER");
      document.location.reload();
    }
  }
  if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7; //if rightPressed move right 7px within canvas
  }
  else if(leftPressed && paddleX > 0){
    paddleX -= 7; //if leftPressed move left 7px within canvas
  }
  x += dx; //define new coords for next frame
  y += dy;
}
setInterval(draw, 10)//will run drawBall every 10 milliseconds
