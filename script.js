let cash = parseFloat(localStorage.getItem('cash')) || 0;
let clickValue = 1;
let cps = parseFloat(localStorage.getItem('cps')) || 0;
let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
let upgradeCost = 10;

function updateDisplay() {
    // Set up the animation for dollar sign
    animateText('dollar-sign', '$');

    // Set up the animation for cash
    animateNumber('cash', cash.toFixed(2));

    // Update other elements without animation
    document.getElementById('cps').textContent = cps.toFixed(2);
    document.getElementById('upgrades').textContent = upgrades;
}

function clickCash() {
    cash += clickValue;
    updateDisplay();
    saveGameState();
    showPopupText(clickValue); // Show the pop-up with the earned amount
}

function purchaseUpgrade() {
    if (cash >= upgradeCost) {
        cash -= upgradeCost;
        upgrades++;
        cps += 0.1; // Increase cash per second by 0.1 for each upgrade
        upgradeCost *= 2; // Double the upgrade cost for the next upgrade
        updateDisplay();
        saveGameState();
    } else {
        alert("Not enough cash to purchase the upgrade!");
    }
}

function earnPerSecond() {
    cash += cps / 10; // Update every 100 milliseconds (0.1 seconds)
    updateDisplay();
    saveGameState();
}

function saveGameState() {
    localStorage.setItem('cash', cash);
    localStorage.setItem('cps', cps);
    localStorage.setItem('upgrades', upgrades);
}

// Function to animate text
function animateText(elementId, newText) {
    const element = document.getElementById(elementId);

    // Set up the animation
    const animation = anime({
        targets: element,
        innerHTML: [element.innerHTML, newText],
        easing: 'linear',
        duration: 1000 // Animation duration in milliseconds
    });
}

// Function to animate numbers using Anime.js
function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);

    // Set up the animation
    const animation = anime({
        targets: element,
        innerHTML: [element.innerHTML, newValue],
        round: 2, // Round to two decimal places
        easing: 'linear',
        duration: 1000 // Animation duration in milliseconds
    });
}

// Function to show pop-up text
function showPopupText(amount) {
    const popupText = document.getElementById('popup-text');
    popupText.textContent = `+${amount.toFixed(2)}`;
    popupText.classList.add('show');

    // Hide the pop-up after a delay (e.g., 2 seconds)
    setTimeout(() => {
        popupText.classList.remove('show');
    }, 2000);
}

// Automatically earn cash per second
setInterval(earnPerSecond, 1000); // Updated to 1000 milliseconds (1 second)

// Save the game state every 5 seconds
setInterval(saveGameState, 5000);
