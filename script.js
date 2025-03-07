const keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let totalKeys = Math.floor(window.innerWidth / 60); // Adjust keys based on screen width
let octaveCount = Math.ceil(totalKeys / 12);
let fullKeySet = [];
const piano = document.querySelector(".piano");

// Generate full set of keys to fit screen
function generateKeys() {
    fullKeySet = [];
    for (let i = 0; i < octaveCount; i++) {
        fullKeySet.push(...keyNames.map(note => note + (i + 1))); // Append octave numbers
    }
    
    piano.innerHTML = ''; // Clear the previous keys
    fullKeySet.forEach((note, index) => {
        let key = document.createElement("div");

        if (note.includes("#")) {
            key.classList.add("key", "black");
        } else {
            key.classList.add("key", "white");
        }

        key.dataset.note = note;
        key.innerText = note;

        // Adjust the position of black keys
        if (note.includes("#")) {
            let previousWhiteKey = piano.children[index - 1];
            let leftOffset = previousWhiteKey.offsetLeft + previousWhiteKey.offsetWidth * 0.7;
            key.style.left = leftOffset + "px";
        }

        piano.appendChild(key);
    });
}

// Function to create falling notes
function createNote(noteName) {
    let note = document.createElement("div");
    note.classList.add("note");
    note.innerText = noteName;

    let keyElements = document.querySelectorAll(".key");
    let keyElement = [...keyElements].find(key => key.dataset.note === noteName);

    if (!keyElement) return;

    note.style.left = keyElement.offsetLeft + "px";
    note.style.top = "-20px"; // Start above screen

    document.body.appendChild(note);

    let position = -20;
    let interval = setInterval(() => {
        if (position >= window.innerHeight - 200) {
            clearInterval(interval);
            document.body.removeChild(note);
        }
        position += 5;
        note.style.top = position + "px";
    }, 30);
}

// Example: Random Notes Falling
setInterval(() => {
    let randomNote = fullKeySet[Math.floor(Math.random() * fullKeySet.length)];
    createNote(randomNote);
}, 1000);

// Handle window resizing
window.addEventListener('resize', () => {
    totalKeys = Math.floor(window.innerWidth / 60);
    octaveCount = Math.ceil(totalKeys / 12);
    generateKeys();
});

// Initial key generation
generateKeys();
