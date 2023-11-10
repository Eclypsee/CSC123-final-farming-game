
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

