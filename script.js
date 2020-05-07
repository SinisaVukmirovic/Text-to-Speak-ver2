const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');

const textInput = document.getElementById('textInput');
const speedInput = document.getElementById('speedInput');

let robotImg = document.getElementById('robotImg');

let curseWords = ['fuck', 'shit', 'pussy', 'dick', 'cock', 'tits', 'cunt', 'fucking', 'blowjob'];

// keeping track of current character so that we can know where the speech is at,
// if we change the speed rate while speaking
let currentChar;

playBtn.addEventListener('click', () => {
    speakText(textInput.value);
});

pauseBtn.addEventListener('click', pauseSpeech);

stopBtn.addEventListener('click', stopSpeech);

speedInput.addEventListener('input', () => {
    stopSpeech();

    if (speechSynthesis.speaking) return;
    // continuing speech from the character on which the speed rate was changed
    speakText(utterance.text.substring(currentChar));
});

// for speaking we will use a speach API
const utterance = new SpeechSynthesisUtterance();

// anabling text input when speach is done
utterance.addEventListener('end', () => {
    textInput.disabled = false;

    robotImg.src = 'img/robot.jpg';
});

utterance.addEventListener('boundary', e => {
    currentChar = e.charIndex;
});

function speakText(text) {
    if (curseWords.includes(text.toLowerCase())) {
        robotImg.classList.add('cursing');
        setTimeout(() => {
            robotImg.classList.remove('cursing');
        }, 1000);
        return;
    }

    // checking if speach is in progress and handling resule
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        robotImg.src = 'img/robot-talking.gif';
        // its important to return here, othervise it would start a new speach
        return speechSynthesis.resume();
    }

    // checking if speech is in progress to prevent duble playing is play btn is clicked again
    if (speechSynthesis.speaking) return;

    robotImg.src = 'img/robot-talking.gif';

    utterance.text = text;

    utterance.rate = speedInput.value || 1;

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

    robotImg.src = 'img/robot.jpg';
}

function stopSpeech() {
    // making sure that we resume first ifspeech is paused
    // before canceling it imediatelly after
    speechSynthesis.resume();
    speechSynthesis.cancel();

    robotImg.src = 'img/robot.jpg';
}











robotImg.addEventListener('click', () => {
    robotImg.classList.add('cursing');
});