
function handleTeletiles(t) {
    if (t === 1) { map = room1; p.y = (room1.length - 2) * tileSize; curImg = barnImg; }
    else if (t === 'o' && map === room1) { map = room0; p.y = tileSize; curImg = homeImg; }
  
    if (t === 2) { map = room2; p.x = tileSize; curImg = rightImg;}
    else if (t === 'o' && map === room2) { map = room0; p.x = (room0[0].length - 2) * tileSize; curImg = homeImg; }
  
    if (t === 3) { map = room3; p.y = tileSize; curImg = bottomImg;}
    else if (t === 'o' && map === room3) { map = room0; p.y = (room0.length - 2) * tileSize; curImg = homeImg; }
  
    if (t === 4) { map = room4; p.x = (room4[0].length - 2) * tileSize; curImg = leftImg}
    else if (t === 'o' && map === room4) { map = room0; p.x = tileSize; curImg = homeImg; }
}
  
function getTileUnderMouse(show) {
  // Calculate the position of the mouse in the world space
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  // Calculate the tile indices
  const tileX = Math.floor(worldX / tileSize);
  const tileY = Math.floor(worldY / tileSize);
  if(show&&worldX>0&&worldX<map.length*tileSize&&worldY>0&&worldY<map.length*tileSize){
    if(map[tileY][tileX]=='p'){fill(150, 255, 100, 150)}
    else{fill(255, 150, 100, 150)}
    noStroke();
    rect(tileX*tileSize, tileY*tileSize, tileSize, tileSize)
  }
  // Return the tile coordinates
  return { tileX, tileY };
}



function plantCrops(cropArray, cropSeedImg, clas){
  let mouseTile = getTileUnderMouse();
  let selectedSlot = p.inventory.find(slot => slot[0] === 1); // Assuming type 1 is the seed
  let tileHasCrop = (wheats.some(asdf => asdf.tileX === mouseTile.tileX && asdf.tileY === mouseTile.tileY)||carrots.some(asdf => asdf.tileX === mouseTile.tileX && asdf.tileY === mouseTile.tileY)||potatoes.some(asdf => asdf.tileX === mouseTile.tileX && asdf.tileY === mouseTile.tileY));
  // If there's no wheat and the selected slot has wheat seeds, plant new wheat
  if (!tileHasCrop && selectedSlot && selectedSlot[1] === cropSeedImg) {
    if (selectedSlot[2] > 0) { // Check if there are seeds available
      cropArray.push(new clas(tileSize, mouseTile.tileX, mouseTile.tileY, map));
      selectedSlot[2]--; // Use one seed from inventory
    }
  }else if(tileHasCrop&&fertilizer>0){
    for (let i = cropArray.length - 1; i >= 0; i--) {
      let crop = cropArray[i];
      // Check if the crop is on the current tile
      if (crop.tileX === mouseTile.tileX && crop.tileY === mouseTile.tileY) {
        fertilizer--;
        crop.stage = 2;
        crop.timePlanted = -999999;
        crop.harvestable = true;
        break; // Break out of the loop after removing a crop
      }
    }
  }
}

function removeCropIfShoveling(cropArray) {
  let mouseTile = getTileUnderMouse();
  // Check if the player is shoveling
  if (shoveling) {
    // Go through each crop array
      for (let i = cropArray.length - 1; i >= 0; i--) {
        let crop = cropArray[i];
        // Check if the crop is on the current tile
        if (crop.tileX === mouseTile.tileX && crop.tileY === mouseTile.tileY) {
          cropArray.splice(i, 1); // Remove the crop from the array
          break; // Break out of the loop after removing a crop
        }
      }

  }
}

function drawCatHealthBar(){
  let x = p.x-visualViewport.width/2+tileSize*1.2;
  let y = p.y-visualViewport.height/2+tileSize;
  strokeWeight(3);
  stroke(217, 213, 117);
  fill(50, 50, 50)
  rect(x, y-tileSize/3, tileSize*5, tileSize/5);
  fill(140, 35, 18)
  rect(x, y-tileSize/3, tileSize*5*(0.01*catHealth), tileSize/5);
  catHealth-=catDrain;
  catHealth = constrain(catHealth, 0, 100)
  catIconImg.resize(tileSize, tileSize)
  image(catIconImg, x-tileSize/2, y-tileSize/1.5);
  if(catHealth<=1){
    state=DEATH_STATE;
  }
}

function drawCoinMeter(){
  let x = p.x-visualViewport.width/2+tileSize*1.025;
  let y = p.y-visualViewport.height/2+tileSize*1.2;
  strokeWeight(6)
  coinImg.resize(tileSize/3, tileSize/3);
  image(coinImg, x, y)
  textAlign(LEFT, CENTER);
  textFont('retro', tileSize/4);
  fill(255);
  stroke(0);
  text(coins, x+tileSize/2.5, y+tileSize*0.175);
}

function drawFishMeter(){
  let x = p.x-visualViewport.width/2+tileSize*1.025;
  let y = p.y-visualViewport.height/2+tileSize*1.5;
  strokeWeight(6)
  fishImg.resize(tileSize/3, tileSize/3);
  image(fishImg, x, y)
  textAlign(LEFT, CENTER);
  textFont('retro', tileSize/4);
  fill(255);
  stroke(0);
  text(fish, x+tileSize/2.5, y+tileSize*0.175);
}

function drawFertilizerMeter(){
  let x = p.x-visualViewport.width/2+tileSize*1.025;
  let y = p.y-visualViewport.height/2+tileSize*1.83;
  strokeWeight(6)
  fertilizerImg.resize(tileSize/3, tileSize/3);
  image(fertilizerImg, x, y)
  textAlign(LEFT, CENTER);
  textFont('retro', tileSize/4);
  fill(255);
  stroke(0);
  text(fertilizer, x+tileSize/2.5, y+tileSize*0.175);
}

function toolIcon(toolType) {
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x + visualViewport.width / 2 - tileSize / 1.5;
  let y = p.y + (toolType === 'planter' ? -tileSize : toolType === 'harvester' ? tileSize : 0);
  let s = tileSize / 1.5;

  strokeWeight(5);
  stroke(130, 130, 220);
  fill(170, 180, 220, 240);
  circle(x + s / 2, y + s / 2, s - 10);

  let isSelected = (toolType === 'planter' && planting) || (toolType === 'harvester' && harvesting) || (toolType === 'shoveler' && shoveling);
  let selectImg = toolType === 'planter' ? planterSelectImg : toolType === 'harvester' ? harvesterSelectImg : shovelerSelectImg;
  let normalImg = toolType === 'planter' ? planterImg : toolType === 'harvester' ? harvesterImg : shovelerImg;

  if (mouseIsClicked && worldX > x && worldX < x + s && worldY > y && worldY < y + s) {
    planting = toolType === 'planter' ? !planting : false;
    harvesting = toolType === 'harvester' ? !harvesting : false;
    shoveling = toolType === 'shoveler' ? !shoveling : false;
  }

  let img = isSelected ? selectImg : normalImg;
  img.resize(s, s);
  image(img, x, y);
}

function updateCrop(crops, player) {
  for (let i = crops.length - 1; i >= 0; i--) {
    crops[i].update();
    if (crops[i].room == map) {
      crops[i].render();
      if (crops[i].collision(player)) {
        crops.splice(i, 1); // Remove harvested crop from the array
      }
    }
}
}

function checkGameState(){
  if(state!=FISH_STATE){//move MUST be before translate
  if(state == GAME_STATE){
    p.move();
  }
  translate(visualViewport.width/2 - p.x - p.w/2, visualViewport.height/2 - p.y - p.h/2);
  
  //draws background
  curImg.resize(room0[0].length*tileSize, room0.length*tileSize);
  image(curImg, 0, 0);
  strokeWeight(1);stroke(0);for(let y = 0; y < map.length; y++) {for (let x = 0; x < map[y].length; x++) {fill(map[y][x] == 'w' ? [200, 200, 200, 0] : [255, 255, 255, 0]);rect(x * tileSize, y * tileSize, tileSize, tileSize);}}

  if(state==GAME_STATE)getTileUnderMouse(true);}
}


function mouseClicked() {
  if(!song.isPlaying()){song.play()}
  if(state===DEATH_STATE){dialogueManager.startDialogue("start_dialogue", character_dialogues["start_dialogue"].death); state=START_STATE; catHealth = 100; coins = 0; map=room0; curImg = homeImg; p.x = map[0].length*tileSize/2-tileSize/2; p.y = map.length*tileSize/2-tileSize/2; p.inventory = [[1, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];}
  if ((state === DIALOGUE_STATE || state === START_STATE) && dialogueManager.currentDialogue) {
      if (dialogueManager.currentDialogue.texts) {
        if (dialogueManager.currentTextIndex < dialogueManager.currentDialogue.texts.length - 1) {
          // If not the last text, go to next text
          dialogueManager.nextText();
        } else {
          // If it's the last text, check for option selections
          checkForOptionSelection();
        }
      } else {
        // If there are no multiple texts, check for option selections
        checkForOptionSelection();
      }
  }
  console.log("click");
  mouseIsClicked = true;
  removeCropIfShoveling(wheats);
  removeCropIfShoveling(carrots);
  removeCropIfShoveling(potatoes);
  let mouseTile = getTileUnderMouse();
  
  // Check if the clicked tile is plantable ground and the player is in planting mode
  if (map[mouseTile.tileY][mouseTile.tileX] == 'p' && planting) {
    plantCrops(wheats, wheatSeedImg, Wheat)
    plantCrops(carrots, carrotSeedImg, Carrot)
    plantCrops(potatoes, potatoSeedImg, Potato)
    
  }
}