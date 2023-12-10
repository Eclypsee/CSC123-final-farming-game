const BEE = 12903812;
const PIG = 12123987;
const SIGN = 1238973;
const MERCHANT = 1231312;
const WELL = 444444;
const DIALOGUE_STATE = 192836;
const GAME_STATE = 927363;
const START_STATE = 1928747182;
const DEATH_STATE = 7812761253;

let state = START_STATE;

let song;

let mouseIsClicked = false;
let planting = false;
let harvesting = false;
let shoveling = false;

let map = room0;
let tileSize = 150;
let catHealth = 100;//in percent
let catDrain = 0.005;
let coins = 10;
let fish = 3;
let fertilizer = 0;

let NPC_dialogue;

let dialogue_index = 0;

let pig;
let bee;
let sr;//sign on the right
let sb;
let sl;
let merchant;//merchant
let well;
let wheats = [];
let carrots = [];
let potatoes = [];
let animatedImages = [];

function preload() {
  song = loadSound('assets/music.mp3');
  const assets = {
    'background':'assets/background.png',
    'homeImg': 'assets/home.png',
    'barnImg': 'assets/barn.png',
    'playerImg': 'assets/player.png',
    'dialogueImg': 'assets/dialogue.png',
    'coinImg': 'assets/coin.png',
    'fertilizerImg': 'assets/fertilizer.png',
    'fishImg': 'assets/fish.png',
    'playerSpriteSheet': 'assets/playersprite.png',
    'wellImg': 'assets/NPC/well.png',
    'wellSelectImg': 'assets/NPC/well_select.png',
    'harvesterImg': 'assets/sickle.png',
    'harvesterSelectImg': 'assets/sickle_select.png',
    'planterImg': 'assets/planter.png',
    'planterSelectImg': 'assets/planter_select.png',
    'shovelerImg': 'assets/shovel.png',
    'shovelerSelectImg': 'assets/shovel_select.png',
    'catIconImg': 'assets/catIcon.png',
    'healthGainedImg': 'assets/catFed.png',
    'landBoughtImg': 'assets/landbought.png',
    'youDiedImg': 'assets/dead.png'
  };
  const NPCAssets = [
    'bee', 'pig', 'merchant', 'well', 'sign', 'cat'
  ];
  const cropAssets = [
    'wheat', 'carrot', 'potato'
  ];
  // Load general assets
  for (let key in assets) {
    window[key] = loadImage(assets[key]);
  }
  // Load NPC assets
  NPCAssets.forEach(npc => {
    window[npc + 'Img'] = loadImage(`assets/NPC/${npc}.png`);
    window[npc + 'SelectImg'] = loadImage(`assets/NPC/${npc}_select.png`);
  });
  // Load crop assets
  cropAssets.forEach(crop => {
    window[crop + 'Img'] = loadImage(`assets/crops/${crop}/${crop}.png`);
    window[crop + 'SeedImg'] = loadImage(`assets/crops/${crop}/${crop}_seed.png`);
  });
  curImg = homeImg;
}
