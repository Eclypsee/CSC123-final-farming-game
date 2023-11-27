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
  m = new Merchant();
  well = new Well();
  sr = new lockedSign(8, 4);
  sb = new lockedSign(4, 8);
  sl = new lockedSign(0, 4);
  frameRate(60);
}

///////////draw///////////////////
function draw() {
  resizeCanvas(visualViewport.width, visualViewport.height);
  checkGameState();
  updateCrops();
  renderNPCs();
  drawToolIcons();
  drawUI();
  p.show();
  checkDialogueState();
  mouseIsClicked = false;

}

