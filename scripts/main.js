////////////setup/////////////////
function setup() {
  noSmooth();
  createCanvas(visualViewport.width, visualViewport.width); // Assuming you want the height to be the same as the width

  //initialize player
  p = new Player(map[0].length*tileSize/2-tileSize/2, map.length*tileSize/2-tileSize/2, tileSize*5/6);

  

  //initialize NPCs
  pig = new Pig();
  bee = new Bee();
  merchant = new Merchant();
  fisherman = new Fisherman();

  horsemen1 = new NPC(tileSize*3, 0, 0, room4, horsemenImg, horsemenSelectImg, "horsemen_dialogue");
  horsemen2 = new NPC(tileSize*3, 5, 0, room4, horsemenImg, horsemenSelectImg, "horsemen_dialogue");
  horsemen3 = new NPC(tileSize*3, 1, 5, room4, horsemenImg, horsemenSelectImg, "horsemen_dialogue");
  horsemen4 = new NPC(tileSize*3, 5, 5, room4, horsemenImg, horsemenSelectImg, "horsemen_dialogue");

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

  if(state==GAME_STATE||state==DIALOGUE_STATE){
    //update crops
    updateCrop(wheats, p);
    updateCrop(carrots, p);
    updateCrop(potatoes, p);

    if(state!=DIALOGUE_STATE){
    //render and collide npcs
      well.collision();
      pig.collision();
      bee.collision();
      merchant.collision();
      cat.collision();
      fisherman.collision();
      sr.collision();
      sb.collision();
      sl.collision();
      horsemen1.collision();
      horsemen2.collision();
      horsemen3.collision();
      horsemen4.collision();
    }
    horsemen1.render();
    horsemen2.render();
    horsemen3.render();
    horsemen4.render();
    well.render();
    pig.render();
    bee.render();
    merchant.render();
    cat.render();
    fisherman.render();
    sl.render();
    sb.render();
    sr.render();

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
  }else if(state==FISH_STATE){

  }else if(state==DEATH_STATE){
    fill(0,0,0, 220)
    rect(PX-visualViewport.width/2, PY-visualViewport.height/2, visualViewport.width, visualViewport.height);
    image(youDiedImg, PX-visualViewport.width/2, PY-visualViewport.height/2, visualViewport.width, visualViewport.height);
  }
  
  //checks dialogue state and does all that
  PX = p.x+p.w/2;
  PY = p.y+p.h/2;
  

  if(!hasrunstart&&state==START_STATE){dialogueManager.startDialogue("start_dialogue", character_dialogues["start_dialogue"].start);hasrunstart=true;curImg = background}
  
  renderDialogue();

  for(let i=0;i<animatedImages.length;i++){
    animatedImages[i].render();
  }

  //sets mouse clicked to false each frame for bug fixes
  mouseIsClicked = false;
  if(!song.isPlaying()){song.play()}

}

let hasrunstart=false;