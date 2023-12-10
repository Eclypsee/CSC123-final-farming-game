let PX, PY;
let character_dialogues = {
  "start_dialogue":{
    start: {
      texts: ["Welcome to Farm Farmland\nWe are so much better than other farming games\n",],
      currentTextIndex: 0,
      options: [
        { text: "Enter the farm", nextState: "start", action: () =>{
          state=GAME_STATE; 
          if(song.isPlaying()){song.stop(); song.play();}
          curImg = homeImg;//initialize crops
          wheat = new Wheat(tileSize, 6, 2, room0);
          wheats.push(wheat);
          carrot = new Carrot(tileSize, 5, 2, room0);
          carrots.push(carrot);
          potato = new Potato(tileSize, 7, 2, room0);
          potatoes.push(potato);}}, 
        { text: "What are the controls?", nextState: "controls"}],
    },
    controls: {
      texts: ["use wasd to move", "the shovel icon digs up crops\n(beware, you lose the crop completely)", "the scythe icon harvests crops", "the hand icon allows you to plant crops\n select the crop using your inventory", "if you have any fertilizer and select the\nhand icon on a crop, it also fertilizes it", "use the numbers 1-6\n to navigate inventory", "feed the cat.", "on death, you lose all coins and inventory", "keep exploring", "talk to the bee if you ever forget the controls"],
      currentTextIndex: 0,
      options: [
        { text: "back", nextState: "start",},]
    },
    death:{
      texts: ["", "Your cat has died and its ghost killed you", "You can choose to respawn or reload the page to reset"],
      currentTextIndex: 0,
      options: [
        { text: "respawn(all inventory and coins are lost)", nextState: "start",},]
    }
  },
  "fisherman_dialogue":{
    start: {
      texts: ["Do you wish to try your hand at fishing?",],
      currentTextIndex: 0,
      options: [
        { text: "fish(cost 1 coin)", nextState: "start", action: () =>{if(coins>0){coins--;state = FISH_STATE;}}},
        { text: "leave",  action: () =>dialogueManager.endDialogue},
        ],
    },
  },
    "cat_dialogue":{
      start: {
        texts: ["Offer fish to Gato",],
        currentTextIndex: 0,
        options: [
          { text: "feed fish", nextState: "start",  action: () =>{if(fish>0&&catHealth<85){fish--;catHealth+=15; let asdf = new animateImage(healthGainedImg)}}}, 
          { text: "talk", nextState: "talk"},
          { text: "leave", action: () =>dialogueManager.endDialogue}],
      },
      talk: {
        texts: ["hello","hello","goodbye"],
        currentTextIndex: 0,
        options: [
          { text: "leave", action: () =>dialogueManager.endDialogue}],
      },
    },
    "well_dialogue":{
      start: {
        text: "Toss coin into wishing well?",
        options: [{text: "wish", nextState: "start", action:()=>{
          if (coins >= 1) {
            coins--;
            let k = Math.floor(Math.random() * 20) + 1;
            if(k==1){coins+=10;let asdf = new animateImage(coinImg);}
            if(k==2){p.addToInventory(potatoImg, 2);let asdf = new animateImage(potatoImg)}
            if(k==3){p.addToInventory(wheatImg, 2);let asdf = new animateImage(wheatImg)}
            if(k==4){p.addToInventory(carrotImg, 2);let asdf = new animateImage(carrotImg)}
            if(k==5){fish++;let asdf = new animateImage(fishImg)}
          }
        }},{ text: "leave", action: () =>dialogueManager.endDialogue}],
        },
    },
    "bee_dialogue":{
      start: {
        texts: ["Welcome Honoured Guest", "use wasd to move", "the shovel icon digs up crops\n(beware, you lose the crop completely)", "the scythe icon harvests crops", "the hand icon allows you to plant crops\n select the crop using your inventory", "if you have any fertilizer and select the\nhand icon on a crop, it also fertilizes it", "use the numbers 1-6\n to navigate inventory", "feed the cat.", "on death, you lose all coins and inventory", "keep exploring", "talk to the bee if you ever forget the controls"],
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
          { text: "feed carrot", nextState: "feed", action: () =>{let s = p.inventory.find(slot => slot[1] === carrotImg); if(s[2]>0){s[2]--;pig.feedCount++}}}, 
          { text: "feed wheat", nextState: "feed", action: () =>{let s = p.inventory.find(slot => slot[1] === wheatImg); if(s[2]>0){s[2]--;pig.feedCount++}}},
          { text: "feed potato", nextState: "feed", action: () =>{let s = p.inventory.find(slot => slot[1] === potatoImg); if(s[2]>0){s[2]--;pig.feedCount++}}},
          { text: "get fertilizer", nextState: "feed", action: () =>{if(pig.feedCount%3==0&&pig.feedCount>=3){pig.feedCount-=3;fertilizer++; let asdf = new animateImage(fertilizerImg)}}},
          { text: "leave", action: () =>dialogueManager.endDialogue}],
          //have the pig give fertilizer
      },
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
            { text: "Buy carrot seeds for 3 coin", nextState: "buy", action: () => {if(coins>=3){p.addToInventory(carrotSeedImg, 1);coins-=3; let asdf = new animateImage(carrotSeedImg)}}},
            { text: "Buy potato seeds 3 coin", nextState: "buy", action: () => {if(coins>=3){p.addToInventory(potatoSeedImg, 1);coins-=3; let asdf = new animateImage(potatoSeedImg)}}},
            { text: "Buy wheat seeds 3 coin", nextState: "buy", action: () => {if(coins>=3){p.addToInventory(wheatSeedImg, 1);coins-=3; let asdf = new animateImage(wheatSeedImg)}}},
            { text: "Buy fish for 6 coin", nextState: "buy", action: () => {if(coins>=6){fish++;coins-=6; let asdf = new animateImage(fishImg)}}},
            { text: "Goodbye", nextState: "end" }
        ]
        },
        purchaseLand: {
            text: "Here's how you unlock more land(each plot cost 10 coin)",
            options: [
                { text: "Buy east plot", nextState: "purchaseLand", action: () => {if(sr.isLocked&&coins>=10) {coins -= 10;room0[4][8] = 2;sr.isLocked = false;let asdf = new animateImage(landBoughtImg)}}},
                { text: "Buy south plot", nextState: "purchaseLand", action: () => {if(sb.isLocked&&coins>=10) {coins -= 10;room0[8][4] = 3;sb.isLocked = false;let asdf = new animateImage(landBoughtImg)}}},
                { text: "Buy west plot", nextState: "purchaseLand", action: () => {if(sl.isLocked&&coins>=10) {coins -= 10;room0[4][0] = 4;sl.isLocked = false;let asdf = new animateImage(landBoughtImg)}}},                
                { text: "Goodbye", nextState: "end" }
            ]
            },
        sell: {
        text: "What would you like to sell today?",
        options: [
            { text: "Sell carrot to gain 1 coin", nextState: "sell", action: () => {p.inventory.forEach(slot => {if (slot[1] === carrotImg && slot[2]>0) {slot[2]--;coins+=1;}});} },
            { text: "Sell potato to gain 1 coin", nextState: "sell", action: () => {p.inventory.forEach(slot => {if (slot[1] === potatoImg && slot[2]>0) {slot[2]--;coins+=1;}});}},
            { text: "Sell wheat to gain 1 coin", nextState: "sell", action: () => {p.inventory.forEach(slot => {if (slot[1] === wheatImg && slot[2]>0) {slot[2]--;coins+=1;}}); }},
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
  if ((state === DIALOGUE_STATE || state === START_STATE) && dialogueManager.currentDialogue) {
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


