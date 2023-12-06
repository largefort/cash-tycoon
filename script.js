let cash = parseFloat(localStorage.getItem('cash')) || 0;
let clickValue = 1;
let cps = parseFloat(localStorage.getItem('cps')) || 0;
let upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
let upgradeCost = 10;

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
const targetFPS = 60;
let lastTimestamp = 0;

function updateDisplay() {
    document.getElementById('cash').textContent = cash.toFixed(2);
    document.getElementById('cps').textContent = cps.toFixed(2);
    document.getElementById('upgrades').textContent = upgrades;
    displayLeaderboard();
}

function clickCash() {
    cash += clickValue + (0.1 * upgrades);
    updateDisplay();
    saveGameState();
}

function purchaseUpgrade() {
    if (cash >= upgradeCost) {
        cash -= upgradeCost;
        upgrades++;
        cps += 0.1 + (0.12 * upgrades);
        upgradeCost += 5 + (2 * upgrades);
        updateDisplay();
        saveGameState();
    } else {
        alert("Not enough cash to purchase the upgrade!");
    }
}

function earnPerSecond() {
    cash += cps / targetFPS;
    updateDisplay();
    saveGameState();
}

function saveGameState() {
    localStorage.setItem('cash', cash);
    localStorage.setItem('cps', cps);
    localStorage.setItem('upgrades', upgrades);
    updateLeaderboard();
}

function loadGameState() {
    cash = parseFloat(localStorage.getItem('cash')) || 0;
    cps = parseFloat(localStorage.getItem('cps')) || 0;
    upgrades = parseInt(localStorage.getItem('upgrades')) || 0;
    updateDisplay();
}

function updateLeaderboard() {
    leaderboard.push({ cash: cash, timestamp: new Date() });
    leaderboard.sort((a, b) => b.cash - a.cash);
    if (leaderboard.length > 10) {
        leaderboard = leaderboard.slice(0, 10);
    }
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');
    if (leaderboardElement) {
        leaderboardElement.innerHTML = '<ol>' + 
            leaderboard.map(entry => `<li>${entry.cash.toFixed(2)} - ${new Date(entry.timestamp).toLocaleString()}</li>`).join('') + 
            '</ol>';
    }
}

function gameLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;

    const deltaTime = timestamp - lastTimestamp;
    if (deltaTime >= 1000 / targetFPS) {
        earnPerSecond();
        lastTimestamp = timestamp;
    }
    requestAnimationFrame(gameLoop);
}

document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    document.querySelector('.button.is-success').addEventListener('click', clickCash);
    document.querySelector('.button.is-info').addEventListener('click', purchaseUpgrade);
    displayLeaderboard();
});

requestAnimationFrame(gameLoop);
