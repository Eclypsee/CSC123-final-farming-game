let PX, PY;
let character_dialogues = {
    "well_dialogue":{
      start: {
        text: "Toss coin into wishing well?",
        options: [{text: "wish", nextState: "start", action:()=>{
          if (coins >= 1) {
            coins--;
            let k = Math.floor(Math.random() * 20) + 1;
            if(k==1)coins+=10;
            if(k==2)p.addToInventory(potatoImg, 2)
            if(k==3)p.addToInventory(wheatImg, 2)
            if(k==4)p.addToInventory(carrotImg, 2)
            if(k==5)fish++;
          }
        }},{ text: "leave", action: () =>dialogueManager.endDialogue}],
        },
    },
    "bee_dialogue":{
      start: {
        texts: ["welcome, honoured guest", "here are the controls", "use wasd to move", "the shovel icon digs up crops\n(beware, you lose the crop completely)", "the scythe icon harvests crops", "the hand icon allows you to plant crops\n select the crop using your inventory", "use the numbers 1-6\n to navigate inventory", "keep the cat's health above 0!", "keep exploring"],
        currentTextIndex: 0,
        options: [{ text: "leave", action: () =>dialogueManager.endDialogue}],
        },
    },
    "sign_dialogue":{
      start: {
        texts: ["Whoa, whoa, whoa! Hold yer horses, partner!", "This here’s the land of Barnabas Jack!", "The one and only, the legend,\nthe man with the golden hat!", "If you want a piece of this fine, dirt, yer’\ngon haf to talk to my merchant down south!","And lemme tell ya,\nshe ain’t no easy fella to deal with.", "She’s got a temper like a rattlesnake\nand a tongue like a whip.", "She’ll make ya sweat bullets and\ncry rivers before", "she lets ya have a single grain\nof sand from this here land!", "So you better think twice before you mess\n with Barnabas Jack and his merchant!!"],
        currentTextIndex: 0,
        options: [{ text: "leave", action: () =>dialogueManager.endDialogue}],
        },
    },
    "pig_dialogue":{
      start: {
        texts: ["This is a pig in a pig pen", "Why are you talking to a pig?", "Feed to get fertilizer?"],
        currentTextIndex: 0,
        options: [{ text: "feed", nextState: "feed"}, { text: "leave", action: () =>dialogueManager.endDialogue}],
        },
      feed:{
        text: ["Pick what crop you want to feed it. It does not care"],
        options: [
          { text: "feed carrot", nextState: "feed", action: () =>{let s = p.inventory.find(slot => slot[1] === carrotImg); if(s[2]>0)s[2]--}}, 
          { text: "feed wheat", nextState: "feed", action: () =>{let s = p.inventory.find(slot => slot[1] === wheatImg); if(s[2]>0)s[2]--}},
          { text: "feed potato", nextState: "feed", action: () =>{let s = p.inventory.find(slot => slot[1] === potatoImg); if(s[2]>0)s[2]--}},
          { text: "leave", action: () =>dialogueManager.endDialogue}],
          //have the pig give fertilizer
      }
    },
    "home_merchant_dialogue":{
        start: {
        texts: [
            "Greetings, traveler! Welcome to my humble shop.",
            "What can I do for you today?"
        ],
        currentTextIndex: 0,
        options: [
            { text: "What do you have for sale?", nextState: "buy" },
            { text: "How do I get more land?", nextState: "purchaseLand" },
            { text: "I'd like to sell some items.", nextState: "sell" },
            { text: "Tell me about yourself.", nextState: "aboutMerchant" },
            { text: "Just looking around, thanks.", nextState: "browse" },
            { text: "Goodbye.", nextState: "end" }
        ]
        },
        buy: {
        text: "Here's what I have for sale. Take your time to browse.",
        options: [
            { text: "Buy carrot", nextState: "buy", action: () => {if(coins>=3){p.addToInventory(carrotImg, 1);coins-=3}}},
            { text: "Buy potato", nextState: "buy", action: () => {if(coins>=3){p.addToInventory(potatoImg, 1);coins-=3}}},
            { text: "Buy wheat", nextState: "buy", action: () => {if(coins>=3){p.addToInventory(wheatImg, 1);coins-=3}}},
            { text: "Buy fish", nextState: "buy", action: () => {if(coins>=6){fish++;coins-=6}}},
            { text: "Goodbye", nextState: "end" }
        ]
        },
        purchaseLand: {
            text: "Here's how you unlock more land",
            options: [
                { text: "Buy east plot", nextState: "purchaseLand", action: () => {if(sr.isLocked&&coins>=10) {coins -= 10;room0[4][8] = 2;sr.isLocked = false;}}},
                { text: "Buy south plot", nextState: "purchaseLand", action: () => {if(sb.isLocked&&coins>=10) {coins -= 10;room0[8][4] = 3;sb.isLocked = false;}}},
                { text: "Buy west plot", nextState: "purchaseLand", action: () => {if(sl.isLocked&&coins>=10) {coins -= 10;room0[4][0] = 4;sl.isLocked = false;}}},                
                { text: "Goodbye", nextState: "end" }
            ]
            },
        sell: {
        text: "What would you like to sell today?",
        options: [
            { text: "Sell carrot", nextState: "sell", action: () => {p.inventory.forEach(slot => {if (slot[1] === carrotImg && slot[2]>0) {slot[2]--;coins+=1;}});} },
            { text: "Sell potato", nextState: "sell", action: () => {p.inventory.forEach(slot => {if (slot[1] === potatoImg && slot[2]>0) {slot[2]--;coins+=1;}});}},
            { text: "Sell wheat", nextState: "sell", action: () => {p.inventory.forEach(slot => {if (slot[1] === wheatImg && slot[2]>0) {slot[2]--;coins+=1;}}); }},
            { text: "Goodbye", nextState: "end" }
        ]
        },
        aboutMerchant: {
        texts: [
            "Well, I've been a merchant for over two decades, \ntraveling from one end of the kingdom to the other.",
            "I've seen many things and met many people. \nIf you need advice or just a good story, I'm your man.",
            "Is there anything else you'd like to know?"
        ],
        currentTextIndex: 0,
        options: [
          { text: "Goodbye", nextState: "end" }
        ]
        },
        browse: {
        text: "Feel free to look around. Let me know if anything catches your eye.",
        options: [{ text: "Return to previous options", nextState: "start" }]
        
        },
        end: {
        text: "Thank you for stopping by. Safe travels!",
        options: [{ text: "leave", action: () =>dialogueManager.endDialogue}],
        },
    }
};
  



let dialogueManager = {
  currentDialogue: null,
  currentNPC: null,
  currentTextIndex: 0,

  startDialogue: function(npc, dialogue) {
    console.log("Starting dialogue:", npc, dialogue); // Debugging
    this.currentNPC = npc;
    this.currentDialogue = dialogue;
    this.currentTextIndex = 0;
  },
  
  selectOption: function(option) {
    console.log("Option selected:", option.text); // Debugging
    // Call action functions based on option
    if (option.action) {
        const actionResult = option.action();
        // You can use actionResult to show a message to the player, etc.
    }

    // Transition to next part of dialogue or end dialogue
    if (option.nextState) {
        this.startDialogue(this.currentNPC, character_dialogues[this.currentNPC][option.nextState]);
    } else {
        this.endDialogue();
    }
  },

  endDialogue: function() {
    console.log("ended dialogue")
    this.currentDialogue = null;
    this.currentNPC = null;
    this.currentTextIndex = 0;
    state = GAME_STATE;
  },

  getCurrentText: function() {
    if (this.currentDialogue.texts) {
        // If texts is an array, return the current text from it
        return this.currentDialogue.texts[this.currentTextIndex];
    } else if (this.currentDialogue.text) {
        // If there is only a single text string, return it
        return this.currentDialogue.text;
    }
    // If neither, return a default or empty string
    return "No text available.";
},
  nextText: function() {
    if (this.currentTextIndex < this.currentDialogue.texts.length - 1) {
      this.currentTextIndex++;
    } else {
      this.endDialogue();
    }
  },

  isDialogueComplete: function() {
    return this.currentDialogue === null;
  },
};

function renderDialogue() {
  if (state === DIALOGUE_STATE && dialogueManager.currentDialogue) {
    rectMode(CENTER)
    fill(240)
    stroke(0)
    strokeWeight(4)
    rect(PX, PY, visualViewport.width*.65, visualViewport.height*.5)
    rectMode(CORNER)
    strokeWeight(1)
    fill(0)
    let currentText;
    let totalTextLines = 1;
    let mainTextSize = 30;
    let optionTextSize = 27;
    let spaceBetweenTextAndOptions = 40;
    let lineHeight = 30;
    let hoverColor = color(200, 150, 0); // Color when hovering over an option

    if (dialogueManager.currentDialogue.texts) {
      currentText = dialogueManager.currentDialogue.texts[dialogueManager.currentTextIndex];
    } else {
      currentText = dialogueManager.getCurrentText();
    }

    let options = dialogueManager.currentDialogue.options;
    if (!dialogueManager.currentDialogue.texts || dialogueManager.currentTextIndex === dialogueManager.currentDialogue.texts.length - 1) {
      totalTextLines += options.length;
    }

    let totalHeight = totalTextLines * lineHeight + spaceBetweenTextAndOptions;
    let startYPosition = PY - totalHeight / 2;

    textSize(mainTextSize);
    textAlign(CENTER, CENTER);
    text(currentText, PX, startYPosition);

    textSize(optionTextSize);
    let optionsStartYPosition = startYPosition + lineHeight + spaceBetweenTextAndOptions;
    
    for (let i = 0; i < options.length; i++) {
      let optionY = optionsStartYPosition + lineHeight * i;
      // let optionX = PX - textWidth(options[i].text) / 2;
      // let optionWidth = textWidth(options[i].text);
      let optionHeight = lineHeight;

      // Check if mouse is over an option
      if (mouseY+PY-visualViewport.height/2 > optionY - optionHeight / 2 && mouseY+PY-visualViewport.height/2 < optionY + optionHeight / 2) {
        fill(hoverColor); // Change color when hovering
      } else {
        fill(0); // Default color
      }
      

      if (!dialogueManager.currentDialogue.texts || dialogueManager.currentTextIndex === dialogueManager.currentDialogue.texts.length - 1) {
        text(options[i].text, PX, optionY);
      }
    }
  }
}
function checkForOptionSelection() {
  let lineHeight = 30;
  let optionHeight = lineHeight;
  let spaceBetweenTextAndOptions = 40;
  let startYPosition = PY - (dialogueManager.currentDialogue.options.length * lineHeight + spaceBetweenTextAndOptions) / 2;
  let optionsStartYPosition = startYPosition + lineHeight + spaceBetweenTextAndOptions;

  let options = dialogueManager.currentDialogue.options;
  for (let i = 0; i < options.length; i++) {
    let optionY = optionsStartYPosition + lineHeight * i;
    if (mouseY+PY-visualViewport.height/2 > optionY - optionHeight && mouseY+PY-visualViewport.height/2 < optionY) {
      dialogueManager.selectOption(options[i]);
      break;
    }
  }
}



function mouseClicked() {
  if (state === DIALOGUE_STATE && dialogueManager.currentDialogue) {
      if (dialogueManager.currentDialogue.texts) {
        if (dialogueManager.currentTextIndex < dialogueManager.currentDialogue.texts.length - 1) {
          // If not the last text, go to next text
          dialogueManager.nextText();
        } else {
          // If it's the last text, check for option selections
          checkForOptionSelection();
        }
      } else {
        // If there are no multiple texts, check for option selections
        checkForOptionSelection();
      }
  }
  console.log("click");
  mouseIsClicked = true;
  removeCropIfShoveling(wheats);
  removeCropIfShoveling(carrots);
  removeCropIfShoveling(potatoes);
  let mouseTile = getTileUnderMouse();
  
  // Check if the clicked tile is plantable ground and the player is in planting mode
  if (map[mouseTile.tileY][mouseTile.tileX] == 'p' && planting) {
    plantCrops(wheats, wheatSeedImg, Wheat)
    plantCrops(carrots, carrotSeedImg, Carrot)
    plantCrops(potatoes, potatoSeedImg, Potato)
    
  }
}
