// ===== PET.JS - VIRTUAL PET SYSTEM =====

// Pet State
let pet = {
    name: 'She',
    hunger: 80,
    happiness: 70,
    energy: 60,
    affection: 50,
    age: 0,
    lastAction: 'appears silently',
    mood: 'neutral'
};

// Initialize Pet
document.addEventListener('DOMContentLoaded', function() {
    loadPetData();
    renderPet();
    startPetCycle();
    setupPetInputs();
});

// ===== PET RENDERING =====
function renderPet() {
    // Update stats
    updateStat('hunger', pet.hunger);
    updateStat('happiness', pet.happiness);
    updateStat('energy', pet.energy);
    updateStat('affection', pet.affection);

    // Update mood
    updateMood();

    // Update name
    const nameDisplay = document.getElementById('petName');
    if (nameDisplay) {
        nameDisplay.value = pet.name;
    }

    // Check if pet is dying
    if (pet.hunger < 20 || pet.happiness < 20 || pet.energy < 20 || pet.affection < 20) {
        triggerBadEnding();
    }
}

function updateStat(statName, value) {
    const bar = document.getElementById(`${statName}Bar`);
    const valueDisplay = document.getElementById(`${statName}Value`);
    
    if (bar) bar.style.width = value + '%';
    if (valueDisplay) valueDisplay.textContent = Math.max(0, Math.min(100, value));
}

function updateMood() {
    const character = document.getElementById('petCharacter');
    const emotionDisplay = document.getElementById('petEmotion');
    
    if (!character) return;

    let newMood = 'neutral';
    
    if (pet.happiness > 80) {
        newMood = 'happy';
        character.classList.remove('sad');
        character.classList.add('happy');
    } else if (pet.happiness < 30) {
        newMood = 'sad';
        character.classList.remove('happy');
        character.classList.add('sad');
    } else {
        character.classList.remove('happy', 'sad');
    }

    pet.mood = newMood;
    if (emotionDisplay) {
        emotionDisplay.textContent = newMood.toUpperCase();
    }
}

// ===== PET ACTIONS =====
function petAction(action) {
    const character = document.getElementById('petCharacter');
    
    switch(action) {
        case 'feed':
            pet.hunger = Math.min(100, pet.hunger + 30);
            pet.happiness = Math.max(0, pet.happiness - 5);
            pet.affection = Math.min(100, pet.affection + 5);
            log('You feed her. She eats quietly, without emotion.');
            playSound('eat');
            break;

        case 'play':
            if (pet.energy < 20) {
                log('She\'s too tired. She can\'t move.');
                playSound('tired');
            } else {
                pet.happiness = Math.min(100, pet.happiness + 25);
                pet.energy = Math.max(0, pet.energy - 30);
                pet.hunger = Math.max(0, pet.hunger - 15);
                pet.affection = Math.min(100, pet.affection + 10);
                log('You play with her. She almost smiles.');
                playSound('play');
            }
            break;

        case 'rest':
            pet.energy = Math.min(100, pet.energy + 40);
            pet.hunger = Math.max(0, pet.hunger - 20);
            pet.happiness = Math.max(0, pet.happiness - 10);
            log('She rests. You watch her breathe in the darkness.');
            playSound('rest');
            break;

        case 'love':
            pet.affection = Math.min(100, pet.affection + 35);
            pet.happiness = Math.min(100, pet.happiness + 20);
            pet.energy = Math.max(0, pet.energy - 10);
            log('You show her affection. She feels it.');
            playSound('love');
            break;
    }

    pet.lastAction = action;
    renderPet();
    savePetData();
}

// ===== PET NAME =====
function setPetName() {
    const nameInput = document.getElementById('petName');
    if (nameInput && nameInput.value.trim()) {
        pet.name = nameInput.value.trim();
        log(`Her name is now: ${pet.name}`);
        savePetData();
    }
}

function setupPetInputs() {
    const nameInput = document.getElementById('petName');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                setPetName();
            }
        });
    }
}

// ===== PET CYCLE (Stats decrease over time) =====
function startPetCycle() {
    setInterval(() => {
        // Stats naturally decrease
        pet.hunger = Math.max(0, pet.hunger - 3);
        pet.happiness = Math.max(0, pet.happiness - 2);
        pet.energy = Math.max(0, pet.energy - 1);
        pet.affection = Math.max(0, pet.affection - 1);

        // Random events
        if (Math.random() < 0.2) {
            triggerRandomEvent();
        }

        renderPet();
        savePetData();
    }, 5000); // Every 5 seconds
}

// ===== RANDOM EVENTS =====
function triggerRandomEvent() {
    const events = [
        { text: 'She looks at you. The look lingers.', hunger: 5 },
        { text: 'You hear something. Or maybe you don\'t.', happiness: -10 },
        { text: 'She hums a song you don\'t recognize.', happiness: 5 },
        { text: 'The screen flickers. Was she always there?', happiness: -15 },
        { text: 'She reaches out. You pull away.', affection: -10 },
        { text: 'A moment of connection. It fades quickly.', affection: 5 }
    ];

    const event = events[Math.floor(Math.random() * events.length)];
    log(event.text);

    if (event.hunger !== undefined) pet.hunger = Math.max(0, pet.hunger - event.hunger);
    if (event.happiness !== undefined) pet.happiness = Math.max(0, Math.min(100, pet.happiness + event.happiness));
    if (event.affection !== undefined) pet.affection = Math.max(0, Math.min(100, pet.affection + event.affection));
}

// ===== BAD ENDING =====
function triggerBadEnding() {
    document.body.innerHTML = `
        <div style="background: #000; color: #ff00ff; font-family: 'Courier Prime', monospace; padding: 2rem; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 style="font-size: 2rem; margin-bottom: 2rem; text-shadow: 0 0 20px #ff00ff;">ERROR_PET_LOST.EXE</h1>
            <p style="font-size: 1.2rem; margin: 1rem 0; max-width: 500px;">She's gone.</p>
            <p style="font-size: 1.2rem; margin: 1rem 0; max-width: 500px;">You didn't care for her.</p>
            <p style="font-size: 1.2rem; margin: 1rem 0; max-width: 500px;">Now she's forgotten.</p>
            <p style="font-size: 1.2rem; margin: 1rem 0; max-width: 500px;">Try again?</p>
            <button onclick="location.reload()" style="margin-top: 2rem; padding: 1rem 2rem; background: #ff00ff; color: #000; border: 2px solid #00ffff; font-size: 1rem; cursor: pointer; font-family: 'Press Start 2P', cursive;">RESET</button>
        </div>
    `;
    localStorage.removeItem('gingersnaps_pet');
}

// ===== SAVE/LOAD SYSTEM =====
function savePetData() {
    saveToLocalStorage('pet', pet);
}

function loadPetData() {
    const saved = loadFromLocalStorage('pet', null);
    if (saved) {
        pet = { ...pet, ...saved };
    }
}
