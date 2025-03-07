function createNote(noteName) {
    let note = document.createElement("div");
    note.classList.add("note");

    let keyElement = document.getElementById(noteName);
    if (!keyElement) return;

    // Set position above screen
    note.style.left = keyElement.offsetLeft + "px";
    note.style.top = "-20px"; // Start off-screen

    document.body.appendChild(note);

    let audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play();

    let position = -20;
    let interval = setInterval(() => {
        if (position >= window.innerHeight - 200) { // Stop near keys
            clearInterval(interval);
            document.body.removeChild(note);
        }
        position += 5;
        note.style.top = position + "px";
    }, 30);
}
