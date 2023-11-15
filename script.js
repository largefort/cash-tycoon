let cash = parseFloat(localStorage.getItem('cash')) || 0;
let clickValue = 1;
let cps = parseFloat(localStorage.getItem('cps')) || 0;
let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
let upgradeCost = 10;
let lastUpdateTime = new Date().getTime(); // Initialize last update time

function updateDisplay() {
    document.getElementById('cash').textContent = cash.toFixed(2);
    document.getElementById('cps').textContent = cps.toFixed(2);
    document.getElementById('upgrades').textContent = upgrades;
    document.getElementById('upgradeCost').textContent = upgradeCost.toFixed(2);
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
        upgradeCost *= 1.5; // Increase the upgrade cost for the next upgrade
        updateDisplay();
        saveGameState();
    } else {
        alert("Not enough cash to purchase the upgrade!");
    }
}

function earnPerSecond() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - lastUpdateTime) / 1000; // Calculate elapsed time in seconds
    lastUpdateTime = currentTime;

    cash += cps * elapsedTime; // Accumulate cash over time
    updateDisplay();
    saveGameState();
}

function saveGameState() {
    localStorage.setItem('cash', cash);
    localStorage.setItem('cps', cps);
    localStorage.setItem('upgrades', upgrades);
}

function loadGameState() {
    dbPromise.then(db => {
        const tx = db.transaction('gameState', 'readonly');
        const store = tx.objectStore('gameState');
        return store.get(1);
    }).then(gameState => {
        if (gameState) {
            cash = gameState.cash;
            clickValue = gameState.clickValue;
            cps = gameState.cps;
            upgrades = gameState.upgrades;
            upgradeCost = gameState.upgradeCost;
            updateDisplay();
        }
    });
}

// Load the game state on page load
document.addEventListener('DOMContentLoaded', loadGameState);

// Automatically earn cash per second
setInterval(earnPerSecond, 1000);
