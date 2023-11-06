//'w' means wall
//'p' means plantable
//0 means path
let room0 = [
  ['w', 'w', 'w', 'w',  1 , 'w', 'w', 'w', 'w'],
  ['w', 'w', 'w', 'w',  0 , 'p', 'p', 'p', 'w'],
  ['w', 'w', 'w', 'w',  0 , 'p', 'p', 'p', 'w'],
  ['w', 'w', 'w', 'w',  0 , 'p', 'p', 'p', 'w'],
  [4  ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 2  ],
  ['w', 'w', 'w', 'w',  0 , 'w', 'w', 'w', 'w'],
  ['w', 'w', 'w', 'w',  0 , 'w', 'w', 'w', 'w'],
  ['w', 'w', 'w', 'w',  0 , 'w', 'w', 'w', 'w'],
  ['w', 'w', 'w', 'w',  3 , 'w', 'w', 'w', 'w'],
];

let room1 = [
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w', 'w', 'w', 'w', 'o', 'w', 'w', 'w', 'w'],
];


let room2 = [
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['o',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
];

let room3 = [
  ['w', 'w', 'w', 'w', 'o', 'w', 'w', 'w', 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
];

let room4 = [
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'o'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w',  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 , 'w'],
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
];
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

function draw() {
  resizeCanvas(visualViewport.width, visualViewport.height);
  
  //move MUST be before translate
  p.move();
  translate(visualViewport.width/2 - p.x - p.w/2, visualViewport.height/2 - p.y - p.h/2);
  
  //display the background
  curImg.resize(room0[0].length*tileSize, room0.length*tileSize);
  image(curImg, 0, 0);


  strokeWeight(1);
  stroke(0);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      fill(map[y][x] == 'w' ? [200, 200, 200, 0] : [255, 255, 255, 0]);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }  
  
    p.show();
    w.update();
    if(w.room == map){
      w.render();
      w.collision();
    }

  getTileUnderMouse();
}


class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.speedx = size/20;
    this.speedy = size/20;
    this.inventory = [[1, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];//[[isSelected, type, num]]
    this.is = size / 2;//inventory size(its a square)
  }
  
  renderInventory() {
    stroke(130, 130, 220);
    textSize(this.is / 4);
    textAlign(LEFT, TOP);
    this.inventory.forEach((slot, k) => {
      strokeWeight(8);
      fill(slot[0] !== 1 ? [170, 180, 220, 240] : [230, 180, 220, 240]);
      let slotX = this.x + this.w / 2 - this.is * 3 + k * this.is;
      let slotY = this.y + visualViewport.height / 2 - this.is / 2;
      rect(slotX, slotY, this.is, this.is);
      strokeWeight(1);
      fill(255);
      text(k + 1, slotX + 5, slotY + 5);
    });
  }
  
  selectInventory() {
    for (let i = 49; i <= 54; i++) {
      keyIsDown(i) && this.inventory.forEach((slot, j) => this.inventory[j][0] = (j === i - 49) ? 1 : 0);
    }
  }

  move() {
    let futureX = this.x + (keyIsDown(RIGHT_ARROW) || keyIsDown(68) ? this.speedx : keyIsDown(LEFT_ARROW) || keyIsDown(65) ? -this.speedx : 0);
    let futureY = this.y + (keyIsDown(DOWN_ARROW) || keyIsDown(83) ? this.speedy : keyIsDown(UP_ARROW) || keyIsDown(87) ? -this.speedy : 0);
    
    if (!this.collides(futureX, this.y)) this.x = futureX;
    if (!this.collides(this.x, futureY)) this.y = futureY;
  }

collides(x, y) {
    const tiles = [
        map[Math.floor(y / tileSize)][Math.floor(x / tileSize)],
        map[Math.floor(y / tileSize)][Math.floor((x + this.w - 1) / tileSize)],
        map[Math.floor((y + this.h - 1) / tileSize)][Math.floor(x / tileSize)],
        map[Math.floor((y + this.h - 1) / tileSize)][Math.floor((x + this.w - 1) / tileSize)]
    ];

    if (tiles.includes('w')) {
        if (tiles[0] === 'w' || tiles[1] === 'w') y = (Math.floor(y / tileSize) + 1) * tileSize;
        if (tiles[2] === 'w' || tiles[3] === 'w') y = (Math.floor((y + this.h) / tileSize) - 1) * tileSize - this.h;
        if (tiles[0] === 'w' || tiles[2] === 'w') x = (Math.floor(x / tileSize) + 1) * tileSize;
        if (tiles[1] === 'w' || tiles[3] === 'w') x = (Math.floor((x + this.w) / tileSize) - 1) * tileSize - this.w;
        return true;
    }else {
      for (let tile of tiles) {
          if (tile !== 0) { // Assuming 0 is the empty or non-special tile
            handleTeletiles(tile);// Return the special tile value (e.g., 1, 2, "asdf", etc.)
            return true;
          }
      }
  }
    return false;
  }
  show() {
    playerImg.resize(this.w*2, this.w*2);
    image(playerImg, this.x-this.w/2, this.y-this.w);
    this.renderInventory();
    this.selectInventory();
  }
}

function handleTeletiles(t) {
  if (t === 1) { map = room1; p.y = (room1.length - 2) * tileSize; curImg = barnImg; }
  else if (t === 'o' && map === room1) { map = room0; p.y = tileSize; curImg = homeImg; }

  if (t === 2) { map = room2; p.x = tileSize; }
  else if (t === 'o' && map === room2) { map = room0; p.x = (room0[0].length - 2) * tileSize; curImg = homeImg; }

  if (t === 3) { map = room3; p.y = tileSize; }
  else if (t === 'o' && map === room3) { map = room0; p.y = (room0.length - 2) * tileSize; curImg = homeImg; }

  if (t === 4) { map = room4; p.x = (room4[0].length - 2) * tileSize; }
  else if (t === 'o' && map === room4) { map = room0; p.x = tileSize; curImg = homeImg; }
}

function getTileUnderMouse() {
  // Calculate the position of the mouse in the world space
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  
  // Calculate the tile indices
  const tileX = Math.floor(worldX / tileSize);
  const tileY = Math.floor(worldY / tileSize);
  if(map[tileY][tileX]=='p'){
    fill(150, 255, 100, 100)
  }else{
    fill(250, 100, 100, 100)
  }

  noStroke();
  rect(tileX*tileSize, tileY*tileSize, tileSize, tileSize)

  // Return the tile coordinates
  return { tileX, tileY };
}





class Wheat{
  constructor(size, tx, ty, r){
    this.stage = 0;
    this.tileX = tx;
    this.tileY = ty;//the tile x and y on the map arraw defined in the top
    this.growthTime = 10;//600 frames until the next stage
    this.timePlanted = frameCount;
    this.timeElapsed;
    this.w = size;
    this.images = [];
    this.room = r;
    for (let i = 0; i < 3; i++) {
      this.images[i] = loadImage(`assets/crops/wheat/wheat_stage_${i}.png`); // Assuming you have images named accordingly
      this.images[i].resize(this.w, this.w);
    }
  }
  update(){
    this.timeElapsed = frameCount - this.timePlanted;
    if (this.timeElapsed/this.growthTime==1) this.stage = 0;
    if (this.timeElapsed/this.growthTime==2) this.stage = 1;
    if (this.timeElapsed/this.growthTime==3) this.stage = 2;
    
  }
  collision(){
    let mouseTile = getTileUnderMouse();
    // Check if the tile under the mouse is the same as the wheat's tile
    if (mouseTile.tileX === this.tileX && mouseTile.tileY === this.tileY) {
      
      if(mouseIsPressed){
        console.log("The mouse is over the wheat at tile " + this.tileX + ", " + this.tileY);
      }
    }
  }
  render(){
    let x = this.tileX * tileSize;
    let y = this.tileY * tileSize;
    if(this.stage>=0&&this.stage<3)
    image(this.images[this.stage], x, y, this.w, this.w);
  }
}
