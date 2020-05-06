const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');

const textInput = document.getElementById('textInput');
const speedInput = document.getElementById('speedInput');

playBtn.addEventListener('click', () => {
    speakText(textInput.value);
});

pauseBtn.addEventListener('click', pauseSpeech);

stopBtn.addEventListener('click', stopSpeech);

function speakText(text) {
    // checking if speach is in progress and handling resule
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        // its important to return here, othervise it would start a new speach
        return speechSynthesis.resume();
    }

    // for speaking we will use a speach API
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = speedInput.value || 1;

    // anabling text input when speach is done
    utterance.addEventListener('end', () => {
        textInput.disabled = false;
    });

    // disabling text input while speaking
    textInput.disabled = true;

    speechSynthesis.speak(utterance);
}

// utterance meaning
// ut·ter·ance
// a spoken word, statement, or vocal sound
// the action of saying or expressing something aloud
// an uninterrupted chain of spoken or written language.

function pauseSpeech() {
    if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopSpeech() {
    // making sure that we resume first ifspeech is paused
    // before canceling it imediatelly after
    speechSynthesis.resume();
    speechSynthesis.cancel();
}