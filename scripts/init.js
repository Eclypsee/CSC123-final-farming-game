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
let wheats = [];
let carrots = [];
let potatoes = [];

let catHealth = 100;//in percent
let catIconImg;

let coins = 0;

let planting = false;
let harvesting = false;
let shoveling = false;

let homeImg;
let barnImg;
let curImg;
let playerImg;
let dialogueImg;
let pigImg;
let pigSelectImg;
let beeImg;
let beeSelectImg;

let wheatImg;
let wheatSeedImg;
let carrotImg;
let carrotSeedImg;
let potatoImg;
let potatoSeedImg;

let harvesterImg;
let harvesterSelectImg;
let planterImg;
let planterSelectImg;
let shovelerImg;
let shovelerSelectImg;

let coinImg;

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
  beeSelectImg = loadImage('assets/NPC/bee_select.png')
  pigSelectImg = loadImage('assets/NPC/pig_select.png')

  wheatImg = loadImage('assets/crops/wheat/wheat.png')
  wheatSeedImg = loadImage('assets/crops/wheat/wheat_seed.png')
  carrotImg = loadImage('assets/crops/carrot/carrot.png')
  carrotSeedImg = loadImage('assets/crops/carrot/carrot_seed.png')
  potatoImg = loadImage('assets/crops/potato/potato.png')
  potatoSeedImg = loadImage('assets/crops/potato/potato_seed.png')

  harvesterImg = loadImage('assets/sickle.png')
  harvesterSelectImg = loadImage('assets/sickle_select.png')
  planterImg = loadImage('assets/planter.png')
  planterSelectImg = loadImage('assets/planter_select.png')
  shovelerImg = loadImage('assets/shovel.png')
  shovelerSelectImg = loadImage('assets/shovel_select.png')

  coinImg = loadImage('assets/coin.png')

  catIconImg = loadImage('assets/NPC/catIcon.png')

  curImg = homeImg;
}


function setup() {
  createCanvas(visualViewport.width, visualViewport.width); // Assuming you want the height to be the same as the width
  p = new Player(map[0].length*tileSize/2-tileSize/2, map.length*tileSize/2-tileSize/2, tileSize*5/6);

  w = new Wheat(tileSize, 6, 2, room0);
  wheats.push(w);
  c = new Carrot(tileSize, 5, 2, room0);
  carrots.push(c);
  pot = new Potato(tileSize, 7, 2, room0);
  potatoes.push(pot);

  pig = new Pig(tileSize*2, 6, 6, room0);
  bee = new Bee(tileSize, 3, 1, room0);
  frameRate(60);
}
