//'w' means wall
//'p' means plantable
//0 means path
let mouseIsClicked = false;

let map = room0;

let tileSize = 150;
let p;
let w;
let pig;
let bee;

let homeImg;
let barnImg;
let curImg;
let playerImg;
let dialogueImg;
let pigImg;
let beeImg;

const DIALOGUE_STATE = 192836;
const GAME_STATE = 927363;
let state = GAME_STATE;

const BEE = 12903812;
const PIG = 12123987;
let NPC_dialogue;

let dialogue_index = 0;

function preload() {
  homeImg = loadImage('assets/home.png')
  barnImg = loadImage('assets/barn.png')
  playerImg = loadImage('assets/player.png')
  dialogueImg = loadImage('assets/dialogue.png')
  pigImg = loadImage('assets/NPC/pig.png')
  beeImg = loadImage('assets/NPC/bee.png')
  curImg = homeImg;
}


function setup() {
  createCanvas(visualViewport.width, visualViewport.width); // Assuming you want the height to be the same as the width
  p = new Player(map[0].length*tileSize/2-tileSize/2, map.length*tileSize/2-tileSize/2, tileSize*5/6);
  w = new Wheat(tileSize, 6, 2, room0);
  pig = new Pig(tileSize*2, 6, 6, room0);
  bee = new Bee(tileSize, 3, 1, room0);
  frameRate(60);
}
