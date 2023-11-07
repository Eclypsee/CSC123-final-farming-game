
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
  textFont('retro', tileSize/2.5);
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