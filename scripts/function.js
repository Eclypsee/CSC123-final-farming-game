
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
  
  function mouseClicked() {
    console.log("click")
    mouseIsClicked = true;
  }