// ===== GAMES.JS - GAME LOGIC =====

// Game State
let gameState = {
    currentGame: null,
    score: 0,
    level: 1
};

document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
});

// ===== TWIST & TURNS GAME =====
function startTwistAndTurns() {
    gameState.currentGame = 'twist-turns';
    saveGameState();
}

// ===== DRESS-UP GAME =====
function startDressUp() {
    gameState.currentGame = 'dressup';
    saveGameState();
}

// ===== SAVE/LOAD GAME STATE =====
function saveGameState() {
    saveToLocalStorage('gameState', gameState);
}

function loadGameState() {
    const saved = loadFromLocalStorage('gameState', null);
    if (saved) {
        gameState = { ...gameState, ...saved };
    }
}

// ===== GAME UTILITIES =====
function updateScore(points) {
    gameState.score += points;
    saveGameState();
    const scoreDisplay = document.getElementById('score');
    if (scoreDisplay) {
        scoreDisplay.textContent = gameState.score;
    }
}

function nextLevel() {
    gameState.level += 1;
    saveGameState();
}

function gameOver(won = false) {
    if (won) {
        alert('You completed the game!');
    } else {
        alert('Game Over.');
    }
    saveGameState();
}
