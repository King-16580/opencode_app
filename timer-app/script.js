let intervalId = null;
let startTime = 0;
let elapsedTime = 0;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (intervalId) return;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 100);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
});

// Initialize display
updateDisplay();