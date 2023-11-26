
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

function drawGrid(){
  strokeWeight(1);
  stroke(0);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      fill(map[y][x] == 'w' ? [200, 200, 200, 0] : [255, 255, 255, 0]);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
} 

function renderDialogue(dialogue){
    if (dialogue == merchant_dialogue && coins >= 10) {
      if (keyIsDown(49)&&sl.isLocked) {//west
        coins -= 10;
        room0[4][0] = 4;
        sl.isLocked = false;
      }
      if (keyIsDown(50)&&sb.isLocked) {//east
        coins -= 10;
        room0[4][8] = 2;
        sb.isLocked = false;
      }
      if (keyIsDown(51)&&sr.isLocked) {//south
        coins -= 10;
        room0[8][4] = 3;
        sr.isLocked = false;
      }
    }
    dialogueImg.resize(visualViewport.width/2, visualViewport.height/4);
    image(dialogueImg, p.x+p.w/2-visualViewport.width/4, p.y+visualViewport.height/2.8);
    textAlign(CENTER, CENTER);
    textFont('retro', tileSize/4);
    fill(0);
    stroke(255);
    text(dialogue[dialogue_index], p.x+p.w/2, p.y+visualViewport.height/2.15);
    if(mouseIsClicked){
      dialogue_index++;
      mouseIsClicked = false;
    }
    if(dialogue_index==dialogue.length){
      state = GAME_STATE;
      dialogue_index = 0;
    }
}

function checkDialogueState(){
  if(state == DIALOGUE_STATE){
    if(NPC_dialogue == BEE){
      renderDialogue(bee_dialogue)
    }else if(NPC_dialogue == PIG){
      renderDialogue(pig_dialogue)
    }else if(NPC_dialogue == SIGN){
      renderDialogue(sign_dialogue)
    }else if(NPC_dialogue == MERCHANT){
      renderDialogue(merchant_dialogue);
    }
  }
}


function updateWheat(){
  for (let i = wheats.length - 1; i >= 0; i--) {
    wheats[i].update();
    if(wheats[i].room == map){
      wheats[i].render();
      if(wheats[i].collision(p)){
        wheats.splice(i, 1); // Remove harvested wheat from the array
      }
    }
  }
}
function updateCarrot(){
  for (let i = carrots.length - 1; i >= 0; i--) {
    carrots[i].update();
    if(carrots[i].room == map){
      carrots[i].render();
      if(carrots[i].collision(p)){
        carrots.splice(i, 1); 
      }
    }
  }
}
function updatePotato(){
  for (let i = potatoes.length - 1; i >= 0; i--) {
    potatoes[i].update();
    if(potatoes[i].room == map){
      potatoes[i].render();
      if(potatoes[i].collision(p)){
        potatoes.splice(i, 1); 
      }
    }
  }
}

function planter(){
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x+visualViewport.width/2-tileSize/1.5;
  let y = p.y-tileSize;
  let s = tileSize/1.5;
  strokeWeight(5);
  stroke(130, 130, 220);
  fill(170, 180, 220, 240)
  circle(x+s/2, y+s/2, s-10);
  if(mouseIsClicked&&worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s){planting = !planting;harvesting=false;shoveling=false;}
  if(worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s||planting){
    planterSelectImg.resize(s, s);
    image(planterSelectImg, x, y);
  }else{
    planterImg.resize(s, s);
    image(planterImg, x, y);
  }
}

function harvester(){
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x+visualViewport.width/2-tileSize/1.5;
  let y = p.y+tileSize;
  let s = tileSize/1.5;
  strokeWeight(5);
  stroke(130, 130, 220);
  fill(170, 180, 220, 240)
  circle(x+s/2, y+s/2, s-10);
  if(mouseIsClicked&&worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s){harvesting = !harvesting;planting=false;shoveling=false;}
  if(worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s||harvesting){
    harvesterSelectImg.resize(s, s);
    image(harvesterSelectImg, x, y);
  }else{
    harvesterImg.resize(s, s);
    image(harvesterImg, x, y);
  }
}

function shoveler(){
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x+visualViewport.width/2-tileSize/1.5;
  let y = p.y;
  let s = tileSize/1.5;
  strokeWeight(5);
  stroke(130, 130, 220);
  fill(170, 180, 220, 240)
  circle(x+s/2, y+s/2, s-10);
  if(mouseIsClicked&&worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s){shoveling = !shoveling;planting=false;harvesting=false;}
  if(worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s||shoveling){
    shovelerSelectImg.resize(s, s);
    image(shovelerSelectImg, x, y);
  }else{
    shovelerImg.resize(s, s);
    image(shovelerImg, x, y);
  }
}


function mouseClicked() {
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
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x-visualViewport.width/2+tileSize*1.2;
  let y = p.y-visualViewport.height/2+tileSize;
  let s = tileSize;
  strokeWeight(3);
  stroke(217, 213, 117);
  fill(50, 50, 50)
  rect(x, y-s/3, s*5, s/5);

  fill(140, 35, 18)
  rect(x, y-s/3, s*5*(0.01*catHealth), s/5);

  catHealth-=0.009;
  catHealth = constrain(catHealth, 0, 100)
  catIconImg.resize(tileSize, tileSize)
  image(catIconImg, x-s/2, y-s/1.5);
}

function drawCoinMeter(){
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x-visualViewport.width/2+tileSize*1.025;
  let y = p.y-visualViewport.height/2+tileSize*1.2;
  let s = tileSize/3;

  coinImg.resize(s, s);
  image(coinImg, x, y)

  textAlign(LEFT, CENTER);
  textFont('retro', tileSize/4);
  fill(255);
  stroke(0);
  text(coins, x+tileSize/2.5, y+tileSize*0.175);
}

function renderNPCs(){
    well.collision();
    well.render();
    pig.collision();
    pig.render();
    bee.collision();
    bee.render();
    m.collision();
    m.render();
    sr.collision();
    sr.render();
    sb.collision();
    sb.render();
    sl.collision();
    sl.render();
}

function drawToolIcons(){
    planter();
    harvester();
    shoveler();

}

function updateCrops(){
    updateWheat();
    updateCarrot();
    updatePotato();
}

function drawUI(){
    drawCatHealthBar();
    drawCoinMeter();
}

function drawMapBackground(){
    curImg.resize(room0[0].length*tileSize, room0.length*tileSize);
    image(curImg, 0, 0);
    drawGrid();
}

function checkGameState(){
  //move MUST be before translate
  if(state == GAME_STATE){
    p.move();
  }
  translate(visualViewport.width/2 - p.x - p.w/2, visualViewport.height/2 - p.y - p.h/2);
  drawMapBackground();
  if(state==GAME_STATE)getTileUnderMouse(true);
}