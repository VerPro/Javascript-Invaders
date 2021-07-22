const grid = document.querySelector('.grid');
const buttonAgain = document.querySelector('#buttonAgain');
const score = document.querySelector('h2');
let currentRocketIndex = 884;
let width = 30;
let direction = 1;
let dotsId;
let goingRight = true;
let removedDots = [];
let scoreCounter = 0;

//making the grid
for (let i = 0; i < 900; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const dots = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

function drawDots() {
  for (let i = 0; i < dots.length; i++) {
    if (!removedDots.includes(i)) {
      squares[dots[i]].classList.add('dots');
    }
  }
}

drawDots();

function dissapearDots() {
  for (let i = 0; i < dots.length; i++) {
    squares[dots[i]].classList.remove('dots');
  }
}

squares[currentRocketIndex].classList.add('rocket');

function moveRocket(e) {
  squares[currentRocketIndex].classList.remove('rocket');
  switch (e.key) {
    //if hits the left edge, dont move
    case 'ArrowLeft':
      if (currentRocketIndex % width !== 0) currentRocketIndex -= 1;
      break;
    //if hits the right edge, dont move
    case 'ArrowRight':
      if (currentRocketIndex % width < width - 1) currentRocketIndex += 1;
      break;
  }
  squares[currentRocketIndex].classList.add('rocket');
}

document.addEventListener('keydown', moveRocket);

function moveDots() {
  const lEdge = dots[0] % width === 0;
  const rEdge = dots[dots.length - 1] % width === width - 1;
  dissapearDots();

  //collision with right edge => to the lower row, moving oppoite direction
  if (rEdge && goingRight) {
    for (let i = 0; i < dots.length; i++) {
      dots[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  //collision with left edge => to the lower row, moving oppoite direction
  if (lEdge && !goingRight) {
    for (let i = 0; i < dots.length; i++) {
      dots[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  //moving right = default move
  for (let i = 0; i < dots.length; i++) {
    dots[i] += direction;
  }

  drawDots();

  //collisions resulting in game over
  if (squares[currentRocketIndex].classList.contains('dots', 'rocket')) {
    alert('GAME OVER 😥');
    clearInterval(dotsId);
  }

  for (let i = 0; i < dots.length; i++) {
    if (dots[i] > squares.length) {
      alert('GAME OVER 😥');
      clearInterval(dotsId);
    }
  }

  //all dots cleared
  if (removedDots.length === dots.length) {
    alert('YOU HAVE WON 🤩');
    clearInterval(dotsId);
  }
}

dotsId = setInterval(moveDots, 100);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentRocketIndex;
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add('laser');

    //collision with dot = hit
    if (squares[currentLaserIndex].classList.contains('dots')) {
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.remove('dots');
      squares[currentLaserIndex].classList.add('boom');

      setTimeout(
        () => squares[currentLaserIndex].classList.remove('boom'),
        300,
      );
      clearInterval(laserId);

      //removing hitted dot
      const removeDot = dots.indexOf(currentLaserIndex);
      removedDots.push(removeDot);
      scoreCounter++;
      score.innerHTML = `SCORE: ${scoreCounter}`;
    }
  }
  //shooting with spacebar
  switch (e.key) {
    case ' ':
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener('keydown', shoot);
