let cash = parseFloat(localStorage.getItem('cash')) || 0;
let clickValue = 1;
let cps = parseFloat(localStorage.getItem('cps')) || 0;
let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
let upgradeCost = 10;

let lastTimestamp = 0;
const targetFPS = 60; // Set the target frame rate

function updateDisplay() {
    document.getElementById('cash').textContent = cash.toFixed(2);
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
        cps += 0.1;
        upgradeCost *= 2;
        updateDisplay();
        saveGameState();
    } else {
        alert("Not enough cash to purchase the upgrade!");
    }
}

function earnPerSecond() {
    cash += cps / targetFPS; // Adjusted for the target frame rate
    updateDisplay();
    saveGameState();
}

function saveGameState() {
    localStorage.setItem('cash', cash);
    localStorage.setItem('cps', cps);
    localStorage.setItem('upgrades', upgrades);
}

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTimestamp;

    // Check if enough time has passed to update at the target FPS
    if (deltaTime >= 1000 / targetFPS) {
        earnPerSecond();
        lastTimestamp = timestamp;
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Handle clicks
document.getElementById('clickButton').addEventListener('click', clickCash);
document.getElementById('upgradeButton').addEventListener('click', purchaseUpgrade);
