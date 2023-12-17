let player1Characters = [];
let player2Characters = [];

// Step 1: Create a dictionary of character ids and names
const characterNames = {
  "grid-ryu": "Ryu",
  "grid-honda": "E. Honda",
  "grid-blanka": "Blanka",
  "grid-guile": "Guile",
  "grid-balrog": "Balrog",
  "grid-vega": "Vega",
  "grid-ken": "Ken",
  "grid-chunli": "Chun-Li",
  "grid-zangief": "Zangief",
  "grid-dhalsim": "Dhalsim",
  "grid-sagat": "Sagat",
  "grid-bison": "M. Bison",
};

// Grab img element that display the character selected on the left
// It is going to be used to dynamically change the img.src to the character selected by the grid
const charSelected = document.getElementById("char-selected");

// Each square is one character in the grid
const squares = document.querySelectorAll(".squares");

// We need this to make thr grid move, to know where the selected square is at;
let position = 0;
let position2 = 11;

// We need this to know if we are at the top or bottom of the selection grid
let topOrBottom = "top";
let topOrBottom2 = "bottom";

// ========================================

function dynamicChange() {
  new Audio("sound/move-grid.mp3").play();
  const charSelected = document.getElementById("char-selected");
  charSelected.src = squares[position].querySelector("img").src;

  // :: CreateSelectedSquare ::
  // Creates selected "1p" square and move to the position

  const image = document.createElement("img");
  image.src = "images/selected.png";
  image.classList.add("selected");
  squares[position].appendChild(image);

  // Get the character id from image.previousSibling.id
  const characterId = image.previousSibling.id;

  // Use this character id to look up the character name in the characterNames map
  const characterName = characterNames[characterId];

  // Select the HTML element where you want to display the character name
  const characterNameElement = document.getElementById("character-name");

  // Update the text content of this element with the character name
  characterNameElement.textContent = characterName;

  // :: CreateStringForFlagClass ::
  // Create a string with the classname we need to change the flag of the selected char in the grid selection
  //grab the id name of the previous sibling of "image", which contains the name of the character, then replace the prefix "grid" by "flag"

  // In our PUG file:
  // img.characters#grid-ryu(src="images/char-grid-ryu.png")
  // img.selected(src="images/selected.png")

  // We are grabbing "grid-ryu" and transforming into "flag-ryu"
  const flagCountryString = image.previousSibling.id.replace("grid", "flag");

  // Then we add the "flag-selected" class to the element that holds the flag with the image we want
  // In our CSS all our flags received the display: none by default:

  // .flags {
  //   width: 60px;
  //   position: absolute;
  //   display: none;
  // }

  // What "flag-selected" does is to overwrite "display: none" with "display: inline"

  // .flag-selected {
  //   display: inline;
  // }

  document
    .querySelector(`.${flagCountryString}`)
    .classList.add("flag-selected");

  // :: ChangeSelectedPlayerImg ::

  // Change the character displayed left of the grid according to who we are selecting.

  // "charSelected" was declared at the beginning of the document

  // Similar to the previus section, here we are grabbing the id value from the previous sibling of element and replacing "grid" with "char", then using it to change the img.src of charSelected

  // "charSelected" is a single img element declared in our pug file under the ".row2":
  // .row2
  //   img#char-selected(src="images/char-ryu.png", alt="")

  charSelectedString = image.previousSibling.id.replace("grid", "char");
  charSelected.src = `images/${charSelectedString}.png`;
}

// ========================================
function dynamicChange2() {
  new Audio("sound/move-grid.mp3").play();
  const charSelected2 = document.getElementById("char-selected2");
  charSelected2.src = squares[position2].querySelector("img").src;

  // Create selected "2p" square and move to the position
  const image = document.createElement("img");
  image.src = "images/player-2.png"; // Use the image for player 2
  image.classList.add("selected2"); // Use a different class for player 2
  squares[position2].appendChild(image);

  // Get the character id from image.previousSibling.id
  const characterId = image.previousSibling.id;

  // Use this character id to look up the character name in the characterNames map
  const characterName = characterNames[characterId];

  // Select the HTML element where you want to display the character name
  const characterNameElement = document.getElementById("character-name2"); // Use a different id for player 2

  // Update the text content of this element with the character name
  characterNameElement.textContent = characterName;
}

// ========================================

document.addEventListener("keydown", (x) => {
  // Player 1 controls
  if (x.key == "d") {
    // Move right
    squares[position].removeChild(document.querySelector(".selected"));
    position = ((position + 1) % 6) + Math.floor(position / 6) * 6;
    dynamicChange();
  }

  if (x.key == "a") {
    // Move left
    squares[position].removeChild(document.querySelector(".selected"));
    position = ((position + 5) % 6) + Math.floor(position / 6) * 6;
    dynamicChange();
  }

  if (x.key == "s") {
    // Move down
    squares[position].removeChild(document.querySelector(".selected"));
    position = (position + 6) % 12;
    dynamicChange();
  }

  if (x.key == "w") {
    // Move up
    squares[position].removeChild(document.querySelector(".selected"));
    position = (position + 6) % 12;
    dynamicChange();
  }

  // Player 2 controls
  if (x.key == "ArrowRight") {
    // Move right
    if (position2 % 6 !== 5) {
      squares[position2].removeChild(document.querySelector(".selected2"));
      position2 += 1;
      dynamicChange2();
    }
  }

  if (x.key == "ArrowLeft") {
    // Move left
    if (position2 % 6 !== 0) {
      squares[position2].removeChild(document.querySelector(".selected2"));
      position2 -= 1;
      dynamicChange2();
    }
  }

  if (x.key == "ArrowUp") {
    // Move up
    if (position2 > 5) {
      squares[position2].removeChild(document.querySelector(".selected2"));
      position2 -= 6;
      dynamicChange2();
    }
  }

  if (x.key == "ArrowDown") {
    // Move down
    if (position2 < 6) {
      squares[position2].removeChild(document.querySelector(".selected2"));
      position2 += 6;
      dynamicChange2();
    }
  }

  // Character selection
  if (x.key == "Enter") {
    // Player 1 has selected a character
    new Audio("sound/selected_sf2.mp3").play();
  } else if (x.key == " ") {
    // Player 2 has selected a character
    new Audio("sound/selected_sf2.mp3").play();
  }
});

// ==========================
// Toggle volume button

const volumeBtn = document.getElementById("volumeBtn");
const audio = document.getElementById("audio");

volumeBtn.addEventListener("click", (x) => {
  volumeBtn.classList.toggle("fa-volume-up");
  volumeBtn.classList.toggle("fa-volume-mute");

  if (audio.muted == false) {
    audio.muted = true;
    return;
  }
  if (audio.muted == true) {
    audio.muted = false;
  }
});

// ==========================
function displaySelectedCharacters() {
  // Select the HTML elements where you want to display the selected characters
  const selectedCharactersElement1 = document.getElementById(
    "selected-characters1"
  );
  const selectedCharactersElement2 = document.getElementById(
    "selected-characters2"
  );

  // Clear the current display of selected characters
  selectedCharactersElement1.innerHTML = "";
  selectedCharactersElement2.innerHTML = "";

  // Display the selected characters for player 1
  for (const characterId of player1Characters) {
    const characterName = characterNames[characterId];
    selectedCharactersElement1.innerHTML += `<p>${characterName}</p>`;
  }

  // Display the selected characters for player 2
  for (const characterId of player2Characters) {
    const characterName = characterNames[characterId];
    selectedCharactersElement2.innerHTML += `<p>${characterName}</p>`;
  }
}