
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    let mouseTile = getTileUnderMouse(false);
    // Check if the tile under the mouse is the same as the wheat's tile
    if (mouseTile.tileX === this.tileX && mouseTile.tileY === this.tileY) {
      if(mouseIsClicked){
        console.log("The mouse is over the wheat at tile " + this.tileX + ", " + this.tileY);
        mouseIsClicked = false;
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Pig{
  constructor(size, tx, ty, r){
    this.tileX = tx;
    this.tileY = ty;//the tile x and y on the map arraw defined in the top
    this.size = size;
    this.image = pigImg;
    this.room = r;
  }
  collision(){
    if(this.room == map){
    let mouseTile = getTileUnderMouse(false);
    // Check if the tile under the mouse is the same as the wheat's tile
    if ((mouseTile.tileX === this.tileX || mouseTile.tileX === this.tileX+1)&&(mouseTile.tileY === this.tileY||mouseTile.tileY === this.tileY+1)&&state!=DIALOGUE_STATE) {
      this.image = pigSelectImg;
      if(mouseIsClicked){
        state = DIALOGUE_STATE;
        NPC_dialogue = PIG;
        mouseIsClicked = false;
      }
    }else{
    this.image = pigImg;
    } 
  }
  }
  render(){
    if(this.room == map){
    this.image.resize(this.size, this.size);
    image(this.image, this.tileX*tileSize, this.tileY*tileSize);
    }
  }
}


class Bee{
  constructor(size, tx, ty, r){
    this.tileX = tx;
    this.tileY = ty;//the tile x and y on the map arraw defined in the top
    this.size = size;
    this.image = beeImg;
    this.room = r;
    this.hoverHeight = tileSize/4; // Max hover height/depth
    this.hoverSpeed = 0.05; // Speed of the hover effect
    this.hoverAngle = 0; // Starting angle for the hover effect
  }
  collision(){
    if(this.room == map){
    let mouseTile = getTileUnderMouse(false);
    if (mouseTile.tileX === this.tileX&&mouseTile.tileY === this.tileY&&state!=DIALOGUE_STATE) {
      this.image = beeSelectImg;
      if(mouseIsClicked){
        state = DIALOGUE_STATE;
        NPC_dialogue = BEE;
        mouseIsClicked = false;
      }
    }else{
      this.image = beeImg;
    }
  }
  }
  render(){
    if (this.room == map) {
      // Calculate the hover effect
      let hoverY = this.tileY * tileSize*0.7 + sin(this.hoverAngle) * this.hoverHeight;
      this.hoverAngle += this.hoverSpeed; // Increment the angle to continue the hover effect

      // Resize the image and draw it at the 'hovering' position
      this.image.resize(this.size, this.size);
      image(this.image, this.tileX * tileSize, hoverY);

      // Optionally reset the hover angle to prevent it from increasing indefinitely
      if (this.hoverAngle > TWO_PI) {
        this.hoverAngle -= TWO_PI;
      }
    }
  }
}