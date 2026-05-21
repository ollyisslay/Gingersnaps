// ===== DRESS-UP GAME LOGIC =====

let currentOutfit = {
    head: '-',
    body: '-',
    legs: '-'
};

let savedOutfits = [];

document.addEventListener('DOMContentLoaded', function() {
    loadSavedOutfits();
    displaySavedOutfits();
});

function equipItem(category, item) {
    currentOutfit[category] = item;
    updateDisplay();
    triggerMood();
}

function updateDisplay() {
    document.getElementById('headItem').textContent = currentOutfit.head;
    document.getElementById('bodyItem').textContent = currentOutfit.body;
    document.getElementById('legsItem').textContent = currentOutfit.legs;

    // Add animation
    const display = document.querySelector('.outfit-display');
    display.style.animation = 'none';
    setTimeout(() => {
        display.style.animation = 'outfit-change 0.3s ease';
    }, 10);
}

function triggerMood() {
    const moodDisplay = document.getElementById('characterMood');
    const moods = [
        'pleased',
        'excited',
        'shy',
        'confused',
        'delighted',
        'uncertain'
    ];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    moodDisplay.textContent = randomMood.toUpperCase();

    if (Math.random() < 0.2) {
        triggerGlitch();
    }
}

function saveOutfit() {
    const name = document.getElementById('outfitName').value;
    if (!name.trim()) {
        alert('Please name your outfit!');
        return;
    }

    const outfit = {
        id: Date.now(),
        name: name,
        head: currentOutfit.head,
        body: currentOutfit.body,
        legs: currentOutfit.legs
    };

    savedOutfits.push(outfit);
    saveOutfitsToStorage();
    document.getElementById('outfitName').value = '';
    displaySavedOutfits();
}

function loadOutfit(id) {
    const outfit = savedOutfits.find(o => o.id === id);
    if (outfit) {
        currentOutfit = {
            head: outfit.head,
            body: outfit.body,
            legs: outfit.legs
        };
        updateDisplay();
        triggerMood();
    }
}

function deleteOutfit(id) {
    savedOutfits = savedOutfits.filter(o => o.id !== id);
    saveOutfitsToStorage();
    displaySavedOutfits();
}

function clearOutfit() {
    currentOutfit = { head: '-', body: '-', legs: '-' };
    updateDisplay();
}

function displaySavedOutfits() {
    const list = document.getElementById('outfitsList');
    list.innerHTML = '';

    if (savedOutfits.length === 0) {
        list.innerHTML = '<p style="color: #888;">No outfits saved yet...</p>';
        return;
    }

    savedOutfits.forEach(outfit => {
        const div = document.createElement('div');
        div.className = 'outfit-card';
        div.innerHTML = `
            <div class="outfit-preview">
                <span>${outfit.head}</span>
                <span>${outfit.body}</span>
                <span>${outfit.legs}</span>
            </div>
            <span class="outfit-name">${outfit.name}</span>
            <div class="outfit-actions">
                <button class="small-btn" onclick="loadOutfit(${outfit.id})">WEAR</button>
                <button class="small-btn delete" onclick="deleteOutfit(${outfit.id})">DELETE</button>
            </div>
        `;
        list.appendChild(div);
    });
}

function saveOutfitsToStorage() {
    saveToLocalStorage('savedOutfits', savedOutfits);
}

function loadSavedOutfits() {
    savedOutfits = loadFromLocalStorage('savedOutfits', []);
}
