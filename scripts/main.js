
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

