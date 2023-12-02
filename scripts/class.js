
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
    this.direction = 'right'
    this.isMoving = false;
    this.spriteSheet = playerSpriteSheet; // Load your sprite sheet here
    this.spriteWidth = 40; // Width of each sprite frame
    this.spriteHeight = 56; // Height of each sprite frame
    this.currentFrame = 0;
    this.frameCount = 0;
    this.animationSpeed = 5; // Adjust the speed of the animation
  }
  displayFrame(frame) {
    imageMode(CORNER)
    let frameY = frame * this.spriteHeight; // Calculate the Y position of the frame
    push(); // Save the current drawing state
    translate(this.x, this.y);
    if (this.direction === 'left') {scale(-1, 1);image(this.spriteSheet, -this.w*1.35, -this.w, this.w*1.5, this.h*2, 0, frameY, this.spriteWidth, this.spriteHeight);} 
    else {image(this.spriteSheet, -this.w/2.8, -this.w, this.w*1.5, this.h*2, 0, frameY, this.spriteWidth, this.spriteHeight);}
    pop(); // Restore the drawing state
    imageMode(CORNER)
  }
  animate() {
    // Determine direction based on key presses
    if(state==GAME_STATE){
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {this.direction = 'right';} 
      else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {this.direction = 'left';}
    }
    this.isMoving = (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(LEFT_ARROW) || keyIsDown(65) || keyIsDown(DOWN_ARROW) || keyIsDown(83) || keyIsDown(UP_ARROW) || keyIsDown(87))&&state==GAME_STATE;
    if (this.isMoving) {
      if (this.frameCount % this.animationSpeed === 0) {
        this.currentFrame = (this.currentFrame % 15) + 1; // Start from 1 instead of 0 and cycle through frames 1 to 15
      }
      this.frameCount++;
    } else {
      this.currentFrame = 0; // Set to 0 to show the standstill frame
    }

    // Display current frame
    this.displayFrame(this.currentFrame);
  }
  renderInventory() {
    stroke(130, 130, 220);
    textSize(this.is / 3);
    textAlign(LEFT, TOP);
    this.inventory.forEach((slot, k) => {
      textFont('retro');
      strokeWeight(8);
      fill(slot[0] !== 1 ? [170, 180, 220, 240] : [230, 180, 220, 240]);
      let slotX = this.x + this.w / 2 - this.is * 3 + k * this.is;
      let slotY = this.y + visualViewport.height / 2 - this.is / 2;
      rect(slotX, slotY, this.is, this.is);
      strokeWeight(1);
      fill(255);
      text(k + 1, slotX + 5, slotY + 5);
      if(slot[1]!=0&&slot[1]!=null&&slot[2]!=0){
        slot[1].resize(this.is, this.is);
        image(slot[1], slotX, slotY)
      }
      if(slot[2]>0)text(slot[2], slotX + this.is - 20, slotY + this.is - 25);
    });
  }
  
  selectInventory() {
    for (let i = 49; i <= 54; i++) {
      keyIsDown(i) && this.inventory.forEach((slot, j) => this.inventory[j][0] = (j === i - 49) ? 1 : 0);
    }
  }

  move() {
    let futureX = this.x + (keyIsDown(RIGHT_ARROW) || keyIsDown(68) ? this.speedx: keyIsDown(LEFT_ARROW) || keyIsDown(65) ? -this.speedx : 0);
    let futureY = this.y + (keyIsDown(DOWN_ARROW) || keyIsDown(83) ? this.speedy : keyIsDown(UP_ARROW) || keyIsDown(87) ? -this.speedy : 0);
    if (!this.collides(futureX, this.y)) this.x = futureX;
    if (!this.collides(this.x, futureY)) this.y = futureY;
    // let futureX = this.x + (keyIsDown(RIGHT_ARROW) || keyIsDown(68) ? deltaTime/17*this.speedx: keyIsDown(LEFT_ARROW) || keyIsDown(65) ? -this.speedx*deltaTime/17 : 0);
    // let futureY = this.y + (keyIsDown(DOWN_ARROW) || keyIsDown(83) ? deltaTime/17*this.speedy : keyIsDown(UP_ARROW) || keyIsDown(87) ? -this.speedy*deltaTime/17 : 0);
    // if (!this.collides(futureX, this.y)) this.x = futureX;
    // if (!this.collides(this.x, futureY)) this.y = futureY;
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
    this.animate();
    this.renderInventory();
    this.selectInventory();
  }
  harvest(crop) {
    if (crop.harvestable&&harvesting) {//create an animation of the crop hovering in screen and fading out when harvesting
      // Add 2 seeds (assuming type 1 represents seeds) to inventory
      this.addToInventory(crop.seedImg, 2);
      // Add 1 wheat crop (assuming type 2 represents wheat crops) to inventory
      this.addToInventory(crop.img, 1);
      // Remove the wheat from the room
      coins++;
      return true; // Return true to indicate the wheat has been harvested
    }
    return false; // Return false if the wheat is not harvestable
  }

  addToInventory(type, amount) {
    for (let slot of this.inventory) {
      // Assuming the second index (slot[1]) is the type and the third (slot[2]) is the quantity
      if (slot[1] === type) {
        slot[2] += amount;
        return;
      }
    }
    // If the type isn't found, find an empty slot (assuming 0 is empty)
    for (let slot of this.inventory) {
      if (slot[1] === 0) {
        slot[1] = type;
        slot[2] = amount;
        return;
      }
    }
  }
}

///////////////////////////////////////////////////  CROPS /////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Crop {
  constructor(type, size, tx, ty, r, img, seedimg, growthTime) {
    this.img = loadImage(`assets/crops/${type}/${type}.png`);
    this.seedImg = loadImage(`assets/crops/${type}/${type}_seed.png`);
    this.stage = 0;
    this.tileX = tx;
    this.tileY = ty;
    this.growthTime = 10; // Adjust as needed for each crop type
    this.timePlanted = frameCount;
    this.w = size;
    this.images = [];
    this.room = r;
    this.harvestable = false;
    this.img = img;
    this.seedImg = seedimg;
    this.growthTime = growthTime; // Example: 600 frames until the next stage
    for (let i = 0; i < 3; i++) {
      this.images[i] = loadImage(`assets/crops/`+type+`/`+type+`_stage_${i}.png`);
      this.images[i].resize(this.w, this.w);
    }
    for (let i = 0; i < 3; i++) {
      this.images[i] = loadImage(`assets/crops/${type}/${type}_stage_${i}.png`);
      this.images[i].resize(this.w, this.w);
    }
  }
  update() {
    this.timeElapsed = frameCount - this.timePlanted;
    if (this.timeElapsed / this.growthTime == 1) this.stage = 0;
    if (this.timeElapsed / this.growthTime == 2) this.stage = 1;
    if (this.timeElapsed / this.growthTime == 3) {
      this.stage = 2;
      this.harvestable = true;
    }
  }
  collision(player) {
    let mouseTile = getTileUnderMouse();
    if (mouseTile.tileX === this.tileX && mouseTile.tileY === this.tileY) {
      if (mouseIsPressed && this.harvestable) {
        if (player.harvest(this)) {
          return true;
        }
      }
    }
    return false;
  }
  render() {
    let x = this.tileX * tileSize;
    let y = this.tileY * tileSize;
    if (this.stage >= 0 && this.stage < 3)
      image(this.images[this.stage], x, y, this.w, this.w);
  }
}
class Wheat extends Crop {constructor(size, tx, ty, r) {super("wheat", size, tx, ty, r, wheatImg, wheatSeedImg, 10);}}
class Carrot extends Crop {constructor(size, tx, ty, r) {super("carrot", size, tx, ty, r, carrotImg, carrotSeedImg, 10);}} 
class Potato extends Crop {constructor(size, tx, ty, r) {super("potato", size, tx, ty, r, potatoImg, potatoSeedImg, 10);}}

///////////////////////////////////////////////////  NPC   /////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class NPC {
  constructor(size, tx, ty, r, image, selectimage, npcdialogue){
    this.tileX = tx;
    this.tileY = ty;//the tile x and y on the map arraw defined in the top
    this.size = size;
    this.image = image;
    this.nonselectimage = image
    this.selectimage = selectimage;
    this.room = r;
    this.d = npcdialogue;
  }
  collision(){
    if(this.room == map){
      let mouseTile = getTileUnderMouse(false);
      // Check if the tile under the mouse is the same as the wheat's tile
      if (mouseTile.tileX >= this.tileX&&mouseTile.tileX < this.tileX+this.size/tileSize&&mouseTile.tileY >= this.tileY&&mouseTile.tileY < this.tileY+this.size/tileSize&&state!=DIALOGUE_STATE) {
        this.image = this.selectimage;
        if(mouseIsClicked&&state!=DIALOGUE_STATE){
          state = DIALOGUE_STATE;
          dialogueManager.startDialogue(this.d, character_dialogues[this.d].start);
          mouseIsClicked = false;
        }
      }else{
      this.image = this.nonselectimage;
      } 
    }
  }
  render(){if(this.room == map){this.image.resize(this.size, this.size);image(this.image, this.tileX*tileSize, this.tileY*tileSize);}}
}
class Pig extends NPC {constructor() {super(2*tileSize, 6, 6, room0, pigImg, pigSelectImg, "pig_dialogue");}}
class Merchant extends NPC {constructor() {super(3*tileSize, 1, 5, room0, merchantImg, merchantSelectImg, "home_merchant_dialogue");}}
class Well extends NPC {
  constructor() {
    super(3*tileSize, 1, 1, room0, wellImg, wellSelectImg, null);
  }
  collision(){
    if(this.room == map){
      let mouseTile = getTileUnderMouse(false);
      // Check if the tile under the mouse is the same as the wheat's tile
      if (mouseTile.tileX >= this.tileX&&mouseTile.tileX < this.tileX-1+this.size/tileSize&&mouseTile.tileY >= this.tileY&&mouseTile.tileY < this.tileY+this.size/tileSize&&state!=DIALOGUE_STATE) {
        this.image = this.selectimage;
        if(mouseIsClicked){
          state = DIALOGUE_STATE;
          dialogueManager.startDialogue("well_dialogue", character_dialogues["well_dialogue"].start);
          mouseIsClicked = false;
        }
      }else{
      this.image = this.nonselectimage;
      } 
    }
  }
}
class Bee extends NPC{
  constructor() {
    super(tileSize, 3, 1, room0, beeImg, beeSelectImg, "bee_dialogue");
    this.hoverHeight = tileSize/4; // Max hover height/depth
    this.hoverSpeed = 0.05; // Speed of the hover effect
    this.hoverAngle = 0; // Starting angle for the hover effect
  }
  render(){
  if (this.room == map) {
    let hoverY = this.tileY * tileSize*0.7 + sin(this.hoverAngle) * this.hoverHeight;
    this.hoverAngle += this.hoverSpeed; // Increment the angle to continue the hover effect
    this.image.resize(this.size, this.size);
    image(this.image, this.tileX * tileSize, hoverY);
    if (this.hoverAngle > TWO_PI) {this.hoverAngle -= TWO_PI;}
  }
 }
}
class lockedSign extends NPC {
  constructor(tx, ty) {
    super(tileSize, tx, ty, room0, signImg, signSelectImg, "sign_dialogue");
    this.isLocked = true;
  }
  collision(){
    if(this.room == map&&this.isLocked){
    let mouseTile = getTileUnderMouse(false);
    if (mouseTile.tileX === this.tileX&&mouseTile.tileY === this.tileY&&state!=DIALOGUE_STATE) {
      this.image = signSelectImg;
      if(mouseIsClicked&&state!=DIALOGUE_STATE){
        state = DIALOGUE_STATE;
        dialogueManager.startDialogue(this.d, character_dialogues[this.d].start);
        mouseIsClicked = false;
      }
    }else{this.image = signImg;}
    }
  }
  render(){if(this.room==map&&this.isLocked){this.image.resize(this.size, this.size);image(this.image, this.tileX * tileSize,this.tileY*tileSize-tileSize*0.);}}
}
