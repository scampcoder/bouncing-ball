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

const brickRowCount = 6;
const brickColumnCount = 6;
const brickWidth = 80;
const brickHeight = 24;
const brickPadding = 12;
const brickOffsetTop = 32;
const brickOffsetLeft = 32;
let bricks = []; //initialize empty bricks array
let score = 0; //initialize score to 0

for(c=0; c<brickColumnCount; c++){ //make the brick columns
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++){ //make the brick rows
    bricks[c][r] = {x: 0, y: 0, status: 1}; //set each brick at (0, 0) set created brick status to 1
  }
}

document.addEventListener("keydown", keyDownHandler, false); //event listener for key press
document.addEventListener("keyup", keyUpHandler, false); //event listener for no key press/key up
document.addEventListener("mousemove", mouseMoveHandler, false);//event listener for mouse movement

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

function mouseMoveHandler(e){ //anchor paddle to mouse movement
  let relativeX = e.clientX - canvas.offsetLeft; //distance between canvas on left side of edge and mouse pointer
    if(relativeX > 0 && relativeX < canvas.width){//if mouse is within canvas boundaries
      paddleX = relativeX - paddleWidth/2; //move paddle on x-axis to position of mouse
    }
}

function drawBall() {
  ctx.beginPath();//start drawing
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
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

function drawBricks(){
  for(c=0; c<brickColumnCount; c++){ //for each column up to set columns
    for(r=0; r<brickRowCount; r++){ //for each row up to set rows
      if(bricks[c][r].status == 1) {
      let brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft; //x position = column num * (bw + bp) + space on left
      let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop; //y position = row num * (bh + bp) + space on top
      bricks[c][r].x = brickX; //new x coord
      bricks[c][r].y = brickY; //new y coord
      ctx.beginPath(); //start drawing
      ctx.rect(brickX, brickY, brickWidth, brickHeight); //build shape of brick
      ctx.fillStyle = "#6600cc"; //color for brick
      ctx.fill(); //fill brick with set color
      ctx.closePath(); //stop drawing
      }
    }
  }
}

function drawScore(){
  ctx.font = "18px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("score: " + score, 8, 20);//display "score" text at (8, 20)
}

function collisionDetection(){
  for(c=0; c<brickColumnCount; c++){
    for(r=0; r<brickRowCount; r++){
      let b = bricks[c][r]; //store each brick object
      if(b.status == 1){//brick is present
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){ //if you hit the brick
          dy = -dy; //go opposite way
          b.status = 0; //clear brick (is not drawn next frame)
          score++; //increase score by 1
          if(score == brickRowCount*brickColumnCount){
            alert("Congratualtions!! You won!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas each frame
  drawBricks()
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

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
setInterval(draw, 10);//will run draw every 10 milliseconds
