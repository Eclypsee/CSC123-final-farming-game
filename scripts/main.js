////////////setup/////////////////
function setup() {
  noSmooth();
  createCanvas(visualViewport.width, visualViewport.width); // Assuming you want the height to be the same as the width

  //initialize player
  p = new Player(map[0].length*tileSize/2-tileSize/2, map.length*tileSize/2-tileSize/2, tileSize*5/6);

  //initialize crops
  wheat = new Wheat(tileSize, 6, 2, room0);
  wheats.push(wheat);
  carrot = new Carrot(tileSize, 5, 2, room0);
  carrots.push(carrot);
  potato = new Potato(tileSize, 7, 2, room0);
  potatoes.push(potato);

  //initialize NPCs
  pig = new Pig();
  bee = new Bee();
  merchant = new Merchant();
  well = new Well();
  cat = new Cat();
  sr = new lockedSign(8, 4);
  sb = new lockedSign(4, 8);
  sl = new lockedSign(0, 4);
  frameRate(60);
  textFont('retro');
}

///////////draw///////////////////
function draw() {
  resizeCanvas(visualViewport.width, visualViewport.height);
  
  //checks game state and moves camera
  checkGameState();
  
  if(state==GAME_STATE|| state==DIALOGUE_STATE){
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
  cat.collision();
  cat.render();

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
  //drawCurrencyBackground();
  drawCatHealthBar();
  drawCoinMeter();
  drawFishMeter();
  drawFertilizerMeter();
  
  //show player
  p.show();
  }
  
  //checks dialogue state and does all that
  PX = p.x+p.w/2;
  PY = p.y+p.h/2;
  

  if(!hasrunstart&&state==START_STATE){dialogueManager.startDialogue("start_dialogue", character_dialogues["start_dialogue"].start);hasrunstart=true;curImg = background}
  
  renderDialogue();

  //sets mouse clicked to false each frame for bug fixes
  mouseIsClicked = false;

}

let hasrunstart=false;