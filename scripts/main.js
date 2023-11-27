////////////setup/////////////////
function setup() {
  noSmooth();
  createCanvas(visualViewport.width, visualViewport.width); // Assuming you want the height to be the same as the width

  //initialize player
  p = new Player(map[0].length*tileSize/2-tileSize/2, map.length*tileSize/2-tileSize/2, tileSize*5/6);

  //initialize crops
  w = new Wheat(tileSize, 6, 2, room0);
  wheats.push(w);
  c = new Carrot(tileSize, 5, 2, room0);
  carrots.push(c);
  pot = new Potato(tileSize, 7, 2, room0);
  potatoes.push(pot);

  //initialize NPCs
  pig = new Pig();
  bee = new Bee();
  merchant = new Merchant();
  well = new Well();
  sr = new lockedSign(8, 4);
  sb = new lockedSign(4, 8);
  sl = new lockedSign(0, 4);
  frameRate(60);
}

///////////draw///////////////////
function draw() {
  resizeCanvas(visualViewport.width, visualViewport.height);

  //checks game state and moves camera
  checkGameState();

  //update crops
  updateCrop(wheats, p);
  updateCrop(carrots, p);
  updateCrop(potatoes, p);

  //render and collide npcs
  well.collision();
  well.render();
  pig.collision();
  pig.render();
  bee.collision();
  bee.render();
  merchant.collision();
  merchant.render();
  sr.collision();
  sr.render();
  sb.collision();
  sb.render();
  sl.collision();
  sl.render();

  //render tools
  toolIcon('planter');
  toolIcon('harvester');
  toolIcon('shoveler');

  //render health bar/ui etc
  drawCatHealthBar();
  drawCoinMeter();

  //show player
  p.show();

  //checks dialogue state and does all that
  checkDialogueState();

  //sets mouse clicked to false each frame for bug fixes
  mouseIsClicked = false;

}

