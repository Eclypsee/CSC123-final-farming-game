
function draw() {
  
  resizeCanvas(visualViewport.width, visualViewport.height);
  //move MUST be before translate
  if(state == GAME_STATE){
    p.move();
  }
    translate(visualViewport.width/2 - p.x - p.w/2, visualViewport.height/2 - p.y - p.h/2);
    curImg.resize(room0[0].length*tileSize, room0.length*tileSize);
    image(curImg, 0, 0);
    drawGrid();
    if(state==GAME_STATE)getTileUnderMouse(true);
    updateWheat();
    pig.collision();
    pig.render();
    bee.collision();
    bee.render();
    planter();
    harvester();
    p.show();

    //dialogue state
    if(state == DIALOGUE_STATE){
      if(NPC_dialogue == BEE){
        renderDialogue(bee_dialogue)
      }else if(NPC_dialogue == PIG){
        renderDialogue(pig_dialogue)
      }
    }
    mouseIsClicked = false;

}

