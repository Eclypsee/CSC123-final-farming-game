

// - - - - - - - - - - - - - - Forward - - - - - - - - - - - - - -
/* Details:
"This code is pretty independent, except for designs of crops. Let me know if you have a function to draw a tile or crop that you want to use." ~Thomas
*/

// - - - - - - - - - - - - - - Relevant Code Below - - - - - - - - - - - - -

// - - - - Preloading Images (Unused) - - - -
/*
let carrotState0;
let carrotState1;
let carrotState2;

let wheatState0;
let wheatState1;
let wheatState2; // etc...

// The below function loads all of the png's of the crops
function preload() {
  carrotState0 = loadImage('0thCarrotState.png')
  //carrotState1 = loadImage('1stCarrotState.png')
  //carrotState2 = loadImage('2ndCarrotState.png')
}
*/
class Wheat{
  constructor(size, tx, ty){
    this.stage = 0;
    this.TileX = tx;
    this.TileY = ty;//the tile x and y on the map arraw defined in the top
    this.growthTime = 600;//600 frames until the next stage
    this.timePlanted = frameCount;
    this.w = size;
    this.images = [];
    // for (let i = 0; i < 4; i++) {
    //   this.images[i] = loadImage(`assets/crops/wheat_stage_${i}.png`); // Assuming you have images named accordingly
    // }
  }
  update(){
    let timeElapsed = frameCount - this.timePlanted;
    if (timeElapsed/this.growthTime==1) this.stage = 1;
    if (timeElapsed/this.growthTime==2) this.stage = 2;
    if (timeElapsed/this.growthTime==3) this.stage = 3;
    if (timeElapsed/this.growthTime==4) this.stage = 4;//rot stage
  }
  collision(){
    if(getTileUnderMouse()==(this.tileX, this.tileY)){
      console.log("asdf");
    }
  }
  render(){
    let x = this.tileX * tileSize;
    let y = this.tileY * tileSize;
    image(this.images[this.stage], x, y, this.w, this.w);
  }
}
// - - - - Global Variables - - - -

let cropTiles = [];  // cropTiles[] holds crop tile details, referred to using the constants below
const tileX1 = 0;  // cropTiles[i][0]  ->  cropTiles[i][tileX1]
const tileY1 = 1;  // cropTiles[i][1]  ->  cropTiles[i][tileY1]
const tileX2 = 2;  // cropTiles[i][2]  ->  cropTiles[i][tileX2]
const tileY2 = 3;  // cropTiles[i][3]  ->  cropTiles[i][tileY2]
const tileIsOccupied = 4;  // cropTiles[i][4]  ->  etc...
const tileGrowthState = 5;  // cropTiles[i][5]
const tileTime = 6;  // cropTiles[i][6]
const tileCropType = 7;  // cropTiles[i][7]

const cropTileSize = 150 // Side-length of a crop tile in pixels
const cropStates = 3  // Number of crop states (for all crops)
// Note: The EXPIRED state is 'cropStates + 1'

let cropTypes = []  // cropTypes[] holds details about crops, referred to using the constants below
const cropGrowthTime = 0  // cropTypes[i][0]  ->  cropTypes[i][cropGrowthTime]
/* Note about cropGrowthTime: Values at cropTypes[i][cropGrowthTime] how many seconds pass between growth states (in seconds)
(ex. 4 means change growth states once every 4 seconds) */
const cropExpireTime = 1  // cropTypes[i][1]  ->  cropTypes[i][cropExpireTime]
/* Note about cropExpireTime: Values at cropTypes[i][cropExpireTime] will be how long it takes for a crop to expire once fully grown (in seconds)
(ex. 8 means that once the crop is fully grown for 8 seconds, it will expire) */

// Constants point to an array in cropTypes for crop details (See below)

const cropCarrot = 0  // cropTypes[0]  ->  cropTypes[cropCarrot]
cropTypes[cropCarrot] = []

//let cropWheat = 1
//cropTypes[cropWheat] = [wheatState0, wheatState1, wheatState2]


// - - - - Functions - - - -

//  - - Below is called in setup() - -
function makeCropTile(x, y) {  // makeCropTile() acts like rect(), where the top left corner is the origin of the tile
  cropTiles.push([x, y, x+cropTileSize, y+cropTileSize, false, 0, 0]);
  // 'x' and 'y' represent the top left corner of the tile
  // 'x+cropTileSize' and its 'y'-equivalent represent the bottom right corner
  // index[4]: 0 means the tile is unoccupied
  // index[5]: 0 means the growth state is 0 (not in-progess)
  // index[6]: Will store how long a crop has been growing
  // index[7]: Not filled now, but will store the crop type if needed
  
  // [CALL A FUNCTION HERE TO DRAW A TILE AT 'x, y' IF YOU WANT]
  rect(x, y, cropTileSize);
}

// - - Below is called in tileMaintanence() - -
function cropTileCollision(index) {  //
  if (mouseIsPressed && occupied == false) {
    if (mouseX > cropTiles[i][X1] && mouseX < cropTiles[i][X2] && mouseY > cropTiles[i][Y1] && mouseY < cropTiles[i][Y2]) {
        cropTiles[i][tileIsOccupied] = true;
    }
  }
}

// - - Below is called in tileMaintanence() - -

// - - Below is called in draw() - -
function tileMaintanence () {
  for (let i = 0 ; i < cropTiles.length; i++) {
    cropTileCollision (i); // ##############################################################
    if (cropTiles[i][tileIsOccupied] == true) {  
      // If the tile is occupied...
      cropTiles[i][tileTime] += deltaTime/1000  // ...adds time since last frame (in seconds) to the tile's personal timer and...
      
      if (cropTiles[i][tileGrowthState] < cropStates && cropTiles[i][tileTime] >= 4) {
        // ...if the growth state is less than the maximum and the tile's timer exceeds its crop's growth time...
        cropTiles[i][tileGrowthState] += 1  // ...progress the tile's growth state and...
        cropTile[i][tileTime] = 0  // ...reset the tile's timer.
      } else if (cropTiles[i][tileGrowthState] >= cropStates && cropTiles[i][tileTime] >= 10) {
        // If the growth state is at or above the maximum...
        cropTile[i][tileGrowthState] = cropStates + 1  // Sets the growth state to the EXPIRED state (which is the maximum growth states plus 1)
      }
    }
    drawCropTile(i);
  }
}



// - - Below is called in tileMaintance() in draw() - -
/*function drawCrop(x, y, cropType) {
  image(cropTypes[cropType], x, y)
}*/




