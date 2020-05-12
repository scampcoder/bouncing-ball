const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext("2d");//store our drawing on canvas

function drawBall() {
  ctx.beginPath();//start drawing
  ctx.arc(220, 140, 20, 0, Math.PI*2, false)
  //arc(x coord at center, y coord at center, radius, starting angle, ending angle, counterclockwise)
  ctx.fillStyle = 'red';//give color to ball
  ctx.fill();//actually fills the ball
  ctx.closePath();//end drawing
}
setInterval(drawBall, 10)//will run drawBall every 10 milliseconds
