function createNote(noteName) {
    let note = document.createElement("div");
    note.classList.add("note");

    let keyElement = document.getElementById(noteName);
    if (!keyElement) return;

    note.style.left = keyElement.offsetLeft + "px";
    note.style.top = "-20px"; // Start above screen

    document.body.appendChild(note);

    let audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play();

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

// Example: Trigger some notes
setInterval(() => {
    let notes = ["C", "D", "E", "F", "G", "A", "B", "C#", "D#", "F#", "G#", "A#"];
    let randomNote = notes[Math.floor(Math.random() * notes.length)];
    createNote(randomNote);
}, 1000);
