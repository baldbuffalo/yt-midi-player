const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function createNote(noteName) {
    let note = document.createElement("div");
    note.classList.add("note");
    note.innerText = noteName;

    // Find the key element
    let keyIndex = keys.indexOf(noteName);
    if (keyIndex === -1) return;

    let keyElements = document.querySelectorAll(".key");
    let keyElement = keyElements[keyIndex];

    // Align note to key
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
    let randomNote = keys[Math.floor(Math.random() * keys.length)];
    createNote(randomNote);
}, 1000);
