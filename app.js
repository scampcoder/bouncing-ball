const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext("2d");//store our drawing on canvas
let x = canvas.width/2;
let y = canvas.height - 30; //new x and y will move ball
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();//start drawing
  ctx.arc(x, y, 10, 0, Math.PI*2)
  //arc(x coord at center, y coord at center, radius, starting angle, ending angle, counterclockwise)
  ctx.fillStyle = 'red';//give color to ball
  ctx.fill();//actually fills the ball
  ctx.closePath();//end drawing
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height) //clear canvas each frame
  drawBall();
  x += dx; //define new coords for next frame
  y += dy;
}
setInterval(draw, 10)//will run drawBall every 10 milliseconds
