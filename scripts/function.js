
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
  if(show){
    fill(150, 255, 100, 100)
    noStroke();
    rect(tileX*tileSize, tileY*tileSize, tileSize, tileSize)
  }

  // Return the tile coordinates
  return { tileX, tileY };
}

function mouseClicked() {
  console.log("click")
  mouseIsClicked = true;
  let mouseTile = getTileUnderMouse();
  let selectedSlot = p.inventory.find(slot => slot[0] === 1);
  if (selectedSlot && selectedSlot[1] === wheatSeedImg && map[mouseTile.tileY][mouseTile.tileX] == 'p') { // Assuming type 1 is the seed
    if (selectedSlot[2] > 0) {
      wheats.push(new Wheat(tileSize, mouseTile.tileX, mouseTile.tileY, map));
      selectedSlot[2]--; // Use one seed from inventory
    }
  }
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
  dialogueImg.resize(room0.length*tileSize*3/5, room0.length*tileSize*1/5);
  image(dialogueImg, p.x-room0[0].length*tileSize*3/10+p.w/2, p.y+1.2*tileSize);
  textAlign(CENTER, CENTER);
  textFont('retro', tileSize/4);
  fill(0);
  stroke(255);
  text(dialogue[dialogue_index], p.x+p.w/2, p.y+1.2*tileSize*1.65);
  if(mouseIsClicked){
    dialogue_index++;
    mouseIsClicked = false;
  }
  if(dialogue_index==dialogue.length){
    state = GAME_STATE;
    dialogue_index = 0;
  }
}

function updateWheat(){
  w.update();
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

function planter(){
  const worldX = mouseX - visualViewport.width / 2 + p.x + p.w / 2;
  const worldY = mouseY - visualViewport.height / 2 + p.y + p.h / 2;
  let x = p.x+visualViewport.width/2-tileSize/1.5;
  let y = p.y-tileSize/2.5;
  let s = tileSize/1.5;
  strokeWeight(5);
  stroke(130, 130, 220);
  fill(170, 180, 220, 240)
  circle(x+s/2, y+s/2, s-10);
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
  let y = p.y+tileSize/2.5;
  let s = tileSize/1.5;
  strokeWeight(5);
  stroke(130, 130, 220);
  fill(170, 180, 220, 240)
  circle(x+s/2, y+s/2, s-10);
  if(worldX>x&&worldX<x+s&&worldY>y&&worldY<y+s||harvesting){
    harvesterSelectImg.resize(s, s);
    image(harvesterSelectImg, x, y);
  }else{
    harvesterImg.resize(s, s);
    image(harvesterImg, x, y);
  }
}