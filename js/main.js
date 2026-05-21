// ===== MAIN.JS - GLOBAL UTILITIES =====

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initGlitchText();
    initRandomGlitches();
    setupEasterEggs();
});

// ===== GLITCH TEXT ANIMATION =====
function initGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
    });
}

// ===== RANDOM GLITCH EFFECTS =====
function initRandomGlitches() {
    setInterval(() => {
        if (Math.random() < 0.1) {
            triggerGlitch();
        }
    }, 5000);
}

function triggerGlitch() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
        glitchOverlay.style.animation = 'none';
        setTimeout(() => {
            glitchOverlay.style.animation = 'glitch-flicker 0.15s infinite';
        }, 10);
    }

    // Random screen distortion
    const body = document.body;
    const originalFilter = body.style.filter;
    body.style.filter = 'hue-rotate(180deg) brightness(0.8)';
    setTimeout(() => {
        body.style.filter = originalFilter;
    }, 100);
}

// ===== EASTER EGGS =====
function setupEasterEggs() {
    let keySequence = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        keySequence = keySequence.slice(-8);

        if (keySequence.join(',') === secretCode.join(',')) {
            activateSecretMode();
        }

        // Secret dev console message
        if (e.ctrlKey && e.key === 'shift' && e.code === 'KeyK') {
            console.log('%c🖤 WELCOME TO GINGERSNAPS 👻', 'color: #ff00ff; font-size: 20px; text-shadow: 0 0 10px #00ffff;');
            console.log('%cShe is always watching...', 'color: #00ffff; font-size: 14px;');
            console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← →', 'color: #ffb6d9;');
        }
    });
}

function activateSecretMode() {
    alert('🖤 YOU FOUND IT... 👻\n\nShe knows you\'re here now.\n\nThe games have changed.');
    
    // Add glitch class to body
    document.body.classList.add('secret-mode');
    document.body.style.filter = 'hue-rotate(270deg)';
    
    // Intense glitching
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            triggerGlitch();
        }, i * 200);
    }
}

// ===== UTILITY FUNCTIONS =====
function log(message) {
    const logContainer = document.getElementById('logContainer');
    if (logContainer) {
        const p = document.createElement('p');
        p.textContent = message;
        logContainer.appendChild(p);
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}

function playSound(type) {
    // Placeholder for sound effects
    console.log(`Sound: ${type}`);
}

// ===== SAVE/LOAD SYSTEM =====
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(`gingersnaps_${key}`, JSON.stringify(value));
    } catch (e) {
        console.error('Save failed:', e);
    }
}

function loadFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(`gingersnaps_${key}`);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Load failed:', e);
        return defaultValue;
    }
}

// ===== ANIMATION HELPERS =====
function animateElement(element, animation) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = animation;
    }, 10);
}

// ===== PAGE TRANSITIONS =====
function transitionToPage(url) {
    document.body.style.opacity = '0.5';
    triggerGlitch();
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}
