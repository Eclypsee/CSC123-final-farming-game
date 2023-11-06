//'w' means wall
//'p' means plantable
//0 means path
let mouseIsClicked = false;

let map = room0;

let tileSize = 150;
let p;

let homeImg;
let barnImg;
let curImg;
let playerImg;

function preload() {
  homeImg = loadImage('assets/home.png')
  barnImg = loadImage('assets/barn.png')
  playerImg = loadImage('assets/player.png')
  curImg = homeImg;
}


function setup() {
  createCanvas(visualViewport.width, visualViewport.width); // Assuming you want the height to be the same as the width
  p = new Player(map[0].length*tileSize/2-tileSize/2, map.length*tileSize/2-tileSize/2, tileSize*5/6);
  w = new Wheat(tileSize, 6, 2, room0);
  frameRate(60);
}
