const sentences = [
  "Typing speed improves with regular practice.",
  "Artificial intelligence is the future of technology.",
  "Data structures and algorithms build strong foundations.",
  "Consistency matters more than intensity while learning.",
  "Debugging is an essential skill for every developer.",
  "Clean code is better than clever code.",
  "Practice makes a programmer more confident.",
  "Learning never stops in the tech industry.",
  "Focus and discipline improve coding performance.",
  "Problem solving is the heart of computer science.",
  "Web development combines logic and creativity.",
  "Efficient code saves time and resources.",
  "User experience defines software success.",
  "Testing helps prevent unexpected failures.",
  "Technology evolves faster than ever before."
];

const sentenceDiv = document.getElementById("sentence");
const input = document.getElementById("input");
const timerDiv = document.getElementById("timer");
const wpmDiv = document.getElementById("wpm");
const accuracyDiv = document.getElementById("accuracy");
const checkBtn = document.getElementById("check");
const resetBtn = document.getElementById("reset");
const message = document.getElementById("message");

let sentence = "";
let startTime = null;
let timer = null;
let timeLeft = 60;
let running = false;

// Load sentence
function loadSentence() {
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceDiv.innerHTML = sentence.split("").map(c => `<span>${c}</span>`).join("");
}

loadSentence();

// Disable paste (anti-cheating)
input.addEventListener("paste", e => e.preventDefault());

// Start timer on first keypress
input.addEventListener("input", () => {
    if (!running) {
        running = true;
        startTime = Date.now();
        startTimer();
    }
    highlightText();
});

// Live countdown
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `⏱ Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = true;
            calculateSpeed();
        }
    }, 1000);
}

// Highlight correct & wrong characters
function highlightText() {
    const typed = input.value;
    const chars = sentenceDiv.querySelectorAll("span");

    let correct = 0;

    chars.forEach((char, index) => {
        if (typed[index] == null) {
            char.className = "";
        } else if (typed[index] === char.textContent) {
            char.className = "correct";
            correct++;
        } else {
            char.className = "wrong";
        }
    });

    let accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 0;
    accuracyDiv.textContent = `Accuracy: ${accuracy}%`;
}

// Calculate WPM
function calculateSpeed() {
    if (!startTime) {
        message.textContent = "Start typing first!";
        return;
    }

    clearInterval(timer);
    let elapsed = (Date.now() - startTime) / 60000;
    let words = input.value.trim().split(/\s+/).length;
    let wpm = Math.round(words / elapsed);

    wpmDiv.textContent = `WPM: ${wpm}`;
}

// Check button
checkBtn.addEventListener("click", () => {
    if (!running) {
        message.textContent = "Start typing first!";
        return;
    }
    calculateSpeed();
    input.disabled = true;
});

// Reset
resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    input.value = "";
    input.disabled = false;
    startTime = null;
    running = false;
    timeLeft = 60;
    timerDiv.textContent = "⏱ Time Left: 60s";
    wpmDiv.textContent = "WPM: 0";
    accuracyDiv.textContent = "Accuracy: 0%";
    message.textContent = "";
    loadSentence();
});
