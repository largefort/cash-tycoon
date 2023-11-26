let cash = parseFloat(localStorage.getItem('cash')) || 0;
let clickValue = 1;
let cps = parseFloat(localStorage.getItem('cps')) || 0;
let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
let upgradeCost = 10;

function updateDisplay() {
    // Get the cash element
    const cashElement = document.getElementById('cash');

    // Set up the animation
    const cashAnimation = anime({
        targets: cashElement,
        innerHTML: [cashElement.innerHTML, cash.toFixed(2)],
        round: 2, // Round to two decimal places
        easing: 'linear',
        duration: 1000 // Animation duration in milliseconds
    });

    // Update other elements without animation
    document.getElementById('cps').textContent = cps.toFixed(2);
    document.getElementById('upgrades').textContent = upgrades;
}

function clickCash() {
    cash += clickValue;
    updateDisplay();
    saveGameState();
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

// Automatically earn cash per second
setInterval(earnPerSecond, 100); // Changed from 1000 to 100 for smoother updates

// Save the game state every 5 seconds
setInterval(saveGameState, 5000);
