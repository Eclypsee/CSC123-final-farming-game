let bobber;
let bobberImage;
let fish2;
let fishImage;
let button;
let character;
let characterImage;
let gameBackground;
let isBobberThrown;
let isFishCaught;
let isButtonClicked;
let fishSpeed;
let fishDirection;
let timer;
let isGameOver;
let isCongratulationScreen;
let playAgainButton;
let playAgainClickedTime;
let backToGameButton;

function setupFishGame() {
  resizeCanvas(visualViewport.width, visualViewport.height);
bobber = createVector(width / 2, height / 2);
fish2 = createVector(width/2, height/2);
button = createButton('Click to catch!');
button.mousePressed(buttonClicked);
button.hide();
character = createVector(width / 2, height - 50);
isBobberThrown = false;
isFishCaught = false;
isButtonClicked = false;
fishSpeed = 1.5;
fishDirection = p5.Vector.random2D().mult(fishSpeed);
timer = millis();
isGameOver = false;
isCongratulationScreen = false;
backToGameButton = createButton("Back to Game");
backToGameButton.mousePressed(backToGame);
}

function fishGame(){
  resizeCanvas(visualViewport.width, visualViewport.height);
  drawBackground();
  backToGameButton.position(width - 110, height - 50);
  
  if (isCongratulationScreen) {
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Nice Catch!", width / 2, height / 2);
  playAgainButton.position(width / 2 - playAgainButton.width / 2, height / 2 + 50);
  playAgainButton.show();
  fish++;
  let asf = animateImage(fishImage);
  } else {
  if (isGameOver) {
  button.position(bobber.x - button.width / 2, bobber.y - button.height / 2);
  button.show();
  } else {
  if (isBobberThrown) {
  drawBobber();
  }
  
  
    if (!isBobberThrown) {
      fish2.add(fishDirection);
  
      if (fish2.x < 0 || fish2.x > width) {
        fishDirection.x *= -1;
      }
      if (fish2.y < 0 || fish2.y > height-150) {
        fishDirection.y *= -1;
      }
    } else {
      moveFishTowardBobber();
  
      if (checkCollision(fish2, bobber) && !isFishCaught) {
        isFishCaught = true;
        button.position(bobber.x - button.width / 2, bobber.y - button.height / 2);
        button.show();
        timer = millis();
      }
    }
    drawFish();
    drawCharacter();
  
    if (isFishCaught && !isButtonClicked) {
      handleFishCaught();
    }
    character.x = mouseX;
  }
  }
}

function drawFish() {
fishImage.resize(60, 60);
image(fishImage, fish2.x-30, fish2.y-30);
}

function drawCharacter() {
characterImage.resize(100,100);
image(characterImage, character.x-50, PY+75);
}

function drawBobber() {
bobberImage.resize(60, 60);
image(bobberImage, bobber.x-30, bobber.y-30);
}

function moveFishTowardBobber() {
let angle = atan2(bobber.y - fish2.y, bobber.x - fish2.x);
fish2.x += cos(angle) * fishSpeed;
fish2.y += sin(angle) * fishSpeed;
}

function handleFishCaught() {
if (button.elt.offsetWidth > 0) {
let d = dist(mouseX, mouseY, button.position().x + button.width / 2, button.position().y + button.height / 2);
if (mouseIsPressed && d < button.width / 2 && d < button.height / 2) {
buttonClicked();
}
}

let elapsed = millis() - timer;
if (elapsed > 1000) {
isBobberThrown = false;
isFishCaught = false;
button.hide();
}
}

function checkCollision(obj1, obj2) {
let distance = dist(obj1.x, obj1.y, obj2.x, obj2.y);
return distance < 15;
}

function buttonClicked() {
isButtonClicked = true;
button.hide();
isCongratulationScreen = true;
}

function playAgain() {
isCongratulationScreen = false;
playAgainButton.hide();
playAgainClickedTime = millis();
resetGame();
}

function backToGame(){
isCongratulationScreen = false;
state=GAME_STATE;
}

function resetGame() {
isGameOver = false;
isBobberThrown = false;
isFishCaught = false;
isButtonClicked = false;
button.hide();
fish2 = createVector(width/2, height/2);
fishDirection = p5.Vector.random2D().mult(fishSpeed);
}

function drawBackground() {
if (gameBackground) {
gameBackground.resize(width, height);
image(gameBackground, 0,0);
}
}