import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import anime from 'https://cdn.skypack.dev/animejs';

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const imageDisplay = document.getElementById('imageDisplay');
const valentineQuestion = document.getElementById('valentineQuestion');
const responseButtons = document.getElementById('responseButtons');

let noClickCount = 0;
let buttonHeight = 48;
let buttonWidth = 80;
let fontSize = 20;

// These are the GIFs that show when she clicks No. 
// Make sure you have image1.gif through image7.gif in your images folder!
const imagePaths = [
  './images/image1.gif',
  './images/image2.gif',
  './images/image3.gif',
  './images/image4.gif',
  './images/image5.gif',
  './images/image6.gif',
  './images/image7.gif'
];

// Sound effect for clicks
function playSound(soundPath) {
  const audio = new Audio(soundPath);
  audio.play();
}

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * (num + 1));
};

// Runaway Button Logic
const runawayButtonLogic = (button) => {
  const moveButton = function () {
    if (this.textContent.trim() === "Say yes, Clara!") {
      const top = getRandomNumber(window.innerHeight - this.offsetHeight);
      const left = getRandomNumber(window.innerWidth - this.offsetWidth);

      animateMove(this, "top", top).play();
      animateMove(this, "left", left).play();
    }
  };
  button.addEventListener("mouseover", moveButton);
  button.addEventListener("click", moveButton);
};

const animateMove = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeOutCirc",
    duration: 500,
  });

// --- NO BUTTON LOGIC ---
noButton.addEventListener("click", () => {
  playSound('./sounds/click.mp3'); // Ensure you have a click.mp3 or remove this line
  
  if (noClickCount < 4) {
    noClickCount++;
    imageDisplay.src = imagePaths[noClickCount] || "./images/image1.gif";

    // Make Yes button grow
    buttonHeight += 35;
    buttonWidth += 35;
    fontSize += 25;
    yesButton.style.height = `${buttonHeight}px`;
    yesButton.style.width = `${buttonWidth}px`;
    yesButton.style.fontSize = `${fontSize}px`;

    // --- CUSTOM MESSAGES FOR CLARA ---
    const messages = [
      "No",
      "Really, Clara?",
      "Think about the Sushi! 🍣", 
      "Don't break my heart 💔",
      "Say yes, Clara!",
    ];

    if (noClickCount === 4) {
      const newButton = document.createElement("button");
      newButton.id = "runawayButton";
      newButton.textContent = "Say yes, Clara!"; // The text on the running button
      newButton.style.position = "absolute";
      
      const yesButtonRect = yesButton.getBoundingClientRect();
      newButton.style.top = `${yesButtonRect.bottom + 10}px`;
      newButton.style.left = `${yesButtonRect.left + yesButtonRect.width / 2 + 24}px`;

      newButton.style.backgroundColor = "#ff5a5f";
      newButton.style.color = "white";
      newButton.style.padding = "12px 20px";
      newButton.style.borderRadius = "8px";
      newButton.style.cursor = "pointer";
      newButton.style.fontSize = "20
