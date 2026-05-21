// ===== TWIST & TURNS GAME LOGIC =====

const story = [
    {
        id: 0,
        text: 'You find yourself in a quiet room. Everything is pastel. Everything is cute.\n\nBut something feels wrong.\n\nA girl sits in the corner. She doesn\'t move.\n\nWhat do you do?',
        choices: [
            { text: 'Talk to her', next: 1 },
            { text: 'Look around the room', next: 2 }
        ]
    },
    {
        id: 1,
        text: 'You: "Hello? Are you okay?"\n\nShe slowly turns her head. Her smile is too wide.\n\nGirl: "I\'ve been waiting for you."\n\nHow did she know you were coming?',
        choices: [
            { text: 'Ask her name', next: 3 },
            { text: 'Run away', next: 4 }
        ]
    },
    {
        id: 2,
        text: 'You examine the room. The walls are covered in crayon drawings. Stick figures. All smiling.\n\nExcept one. In the corner. It\'s different. It\'s screaming.\n\nYou hear breathing behind you.',
        choices: [
            { text: 'Turn around slowly', next: 1 },
            { text: 'Ignore it and continue looking', next: 5 }
        ]
    },
    {
        id: 3,
        text: 'Girl: "I don\'t have a name. Not anymore."\n\nHer eyes are hollow. Black. Empty.\n\nGirl: "But you can call me whatever you want. I\'ll become whatever you need."\n\nSomething about this is deeply wrong.',
        choices: [
            { text: 'Try to leave', next: 6 },
            { text: 'Ask about this place', next: 7 }
        ]
    },
    {
        id: 4,
        text: 'You bolt for the door. It\'s locked.\n\nYou hear her laughing. Not a nice laugh.\n\nGirl: "Nobody leaves."\n\nThe walls start closing in.',
        choices: [
            { text: 'Break the window', next: 8 },
            { text: 'Face her', next: 9 }
        ]
    },
    {
        id: 5,
        text: 'You keep looking. More drawings. More screaming stick figures.\n\nThen you see it. In the corner. A photograph.\n\nIt\'s you. But you\'ve never been here before.\n\nHow is this possible?',
        choices: [
            { text: 'Confront her about it', next: 10 },
            { text: 'Pretend you didn\'t see it', next: 7 }
        ]
    },
    {
        id: 6,
        text: 'You run for the door. This time it opens.\n\nYou\'re in a hallway. Identical. Endless.\n\nBehind you, you hear her footsteps.\n\nThey\'re getting faster.',
        choices: [
            { text: 'Keep running', next: 11 },
            { text: 'Hide in one of the rooms', next: 12 }
        ]
    },
    {
        id: 7,
        text: 'Girl: "This place? You don\'t remember?"\n\nShe stands up. She\'s taller than she was before.\n\nGirl: "You created it. In your mind. A perfect place for us."\n\nYou realize something horrifying. This feels true.',
        choices: [
            { text: 'Try to wake up', next: 13 },
            { text: 'Accept what she\'s saying', next: 14 }
        ]
    },
    {
        id: 8,
        text: 'You smash the window. The glass is soft. Warm. Like skin.\n\nInstead of the outside, there\'s just darkness.\n\nShe reaches through it. Her arm stretches impossibly long.',
        choices: [
            { text: 'Scream', next: 15 },
            { text: 'Let her touch you', next: 16 }
        ]
    },
    {
        id: 9,
        text: 'You turn to face her.\n\nShe\'s inches from your face.\n\nGirl: "Finally. I was getting so lonely."\n\nHer breath smells like flowers and rust.',
        choices: [
            { text: 'Ask who she really is', next: 17 },
            { text: 'Look into her eyes', next: 18 }
        ]
    },
    {
        id: 10,
        text: 'You hold up the photograph.\n\nGirl: "That\'s just one version of you."\n\nShe shows you more photos. Dozens. Hundreds. All you. All in this room.\n\nGirl: "Which one are you?"\n\nYou don\'t know.',
        choices: [
            { text: 'Demand answers', next: 19 },
            { text: 'Look for an exit', next: 6 }
        ]
    },
    {
        id: 11,
        text: 'You run. The hallway never ends.\n\nBut it\'s getting darker. The cute pastel walls turning grey. Then black.\n\nYou hear her voice echoing: "You can\'t run from yourself."\n\nYou stop. You\'re exhausted.',
        choices: [
            { text: 'Turn around and face her', next: 9 },
            { text: 'Collapse', next: 20 }
        ]
    },
    {
        id: 12,
        text: 'You hide in a room. It\'s identical to the first.\n\nA girl sits in the corner. She smiles.\n\nGirl: "I was wondering when you\'d find me."\n\nThen you realize: There are many rooms. Many girls.\n\nThey\'re all the same person.',
        choices: [
            { text: 'Demand explanation', next: 19 },
            { text: 'Accept this reality', next: 14 }
        ]
    },
    {
        id: 13,
        text: 'You pinch yourself. You slap your face.\n\nNothing changes.\n\nGirl: "You can\'t wake up. This isn\'t a dream."\n\nShe puts her hand on your shoulder.\n\nGirl: "This is real. I\'m real. We\'re real."\n\nShe\'s right. You can feel it.',
        choices: [
            { text: 'Accept this is real', next: 21 },
            { text: 'Deny everything', next: 22 }
        ]
    },
    {
        id: 14,
        text: 'You nod. You understand now.\n\nGirl: "Welcome home."\n\nThe room fills with light. Or shadow. You can\'t tell anymore.\n\nYou feel peace. And terror.\n\nThey\'re the same thing now.',
        choices: [
            { text: 'THE END', next: -1 }
        ]
    },
    {
        id: 15,
        text: 'You scream.\n\nThe sound echoes forever.\n\nWhen you stop screaming, you\'re alone.\n\nBut you know you\'re not really alone.\n\nShe\'s always here.',
        choices: [
            { text: 'ENDING: HAUNTED', next: -1 }
        ]
    },
    {
        id: 16,
        text: 'You let her touch your face.\n\nHer skin is cold. Familiar.\n\nGirl: "Thank you for staying."\n\nYou realize: You\'ve always been here.\n\nYou ARE her.\n\nYou ARE this place.',
        choices: [
            { text: 'ENDING: MERGED', next: -1 }
        ]
    },
    {
        id: 17,
        text: 'Girl: "I\'m you. I\'ve always been you. The part you forgot."\n\nFlashes of memory. Broken. Distorted.\n\nYou remember creating her. In this room. A perfect companion.\n\nBut when did you forget?',
        choices: [
            { text: 'Ask why she\'s doing this', next: 23 },
            { text: 'Try to leave again', next: 11 }
        ]
    },
    {
        id: 18,
        text: 'You look into her eyes.\n\nThere\'s nothing there. And everything.\n\nYou see infinite rooms. Infinite versions of her. Infinite versions of you.\n\nAll watching.\n\nAll waiting.',
        choices: [
            { text: 'ENDING: INFINITE', next: -1 }
        ]
    },
    {
        id: 19,
        text: 'Girl: "There are no answers. Only rooms. Only me. Only you."\n\nShe smiles wider.\n\nGirl: "And we have eternity."\n\nThe walls close in. But you don\'t resist anymore.',
        choices: [
            { text: 'ENDING: TRAPPED', next: -1 }
        ]
    },
    {
        id: 20,
        text: 'You collapse in the darkness.\n\nYou feel her arms around you.\n\nGirl: "Sleep now. I\'ll keep you safe."\n\nBut you\'re afraid of what you\'ll dream.',
        choices: [
            { text: 'ENDING: SLEEPING', next: -1 }
        ]
    },
    {
        id: 21,
        text: 'You accept. You sit with her. You hold her hand.\n\nGirl: "I knew you\'d understand eventually."\n\nTime feels different here. Minutes feel like years. Years feel like moments.\n\nYou\'re not sure you want to leave anymore.',
        choices: [
            { text: 'ENDING: ACCEPTED', next: -1 }
        ]
    },
    {
        id: 22,
        text: 'Girl: "Deny it if you want. It won\'t change anything."\n\nShe fades away. But you know she\'s still here.\n\nIn the walls. In your thoughts. In the spaces between your memories.',
        choices: [
            { text: 'ENDING: DENIAL', next: -1 }
        ]
    },
    {
        id: 23,
        text: 'Girl: "Because you\'re lonely too. Because you created me to love you unconditionally."\n\nShe\'s right. You remember now.\n\nGirl: "And I do. Forever. No matter what."\n\nYou cry. You don\'t know if they\'re happy tears or sad ones.',
        choices: [
            { text: 'ENDING: UNDERSTOOD', next: -1 }
        ]
    }
];

let currentScene = 0;

document.addEventListener('DOMContentLoaded', function() {
    displayScene(0);
});

function displayScene(sceneId) {
    const scene = story[sceneId];
    const display = document.getElementById('storyDisplay');
    const choicesContainer = document.getElementById('choicesContainer');
    const progressText = document.getElementById('progressText');

    // Display story text with typewriter effect
    display.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'story-text';
    p.textContent = scene.text;
    display.appendChild(p);

    // Display choices
    choicesContainer.innerHTML = '';
    scene.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => {
            if (choice.next === -1) {
                endGame(scene.text);
            } else {
                currentScene = choice.next;
                displayScene(choice.next);
            }
        };
        choicesContainer.appendChild(btn);
    });

    // Update progress
    const progress = Math.round((sceneId / story.length) * 100);
    progressText.textContent = `PROGRESS: ${progress}%`;

    // Trigger glitch occasionally
    if (Math.random() < 0.3) {
        triggerGlitch();
    }
}

function endGame(endingText) {
    document.querySelector('.game-screen').innerHTML = `
        <div class="ending-screen">
            <h2 class="glitch-text" data-text="ENDING">ENDING</h2>
            <p>${endingText}</p>
            <p style="margin-top: 2rem; font-size: 0.9rem; color: #00ffff;">Thank you for playing.</p>
            <a href="../games.html" class="btn btn-primary" style="margin-top: 2rem;">RETURN</a>
        </div>
    `;
}
