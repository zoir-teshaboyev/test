const pomodoroBtn = document.getElementById("pomodoro")!;
const shortBreakBtn = document.getElementById("shortBreak")!;
const longBreakBtn = document.getElementById("longBreak")!;
const startPauseBtn = document.getElementById("startPause")!;
const minutesEl = document.getElementById("minutes")!;
const secondsEl = document.getElementById("seconds")!;
const body = document.body;

let time = 25 * 60;
let interval: number | null = null;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(interval!);
        startPauseBtn.textContent = "START";
    } else {
        interval = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(interval!);
                isRunning = false;
            }
        }, 1000);
        startPauseBtn.textContent = "PAUSE";
    }
    isRunning = !isRunning;
}

function setMode(newTime: number, bgColor: string) {
   
    if (interval) {
        clearInterval(interval);
        isRunning = false;
        startPauseBtn.textContent = "START";
    }

    time = newTime * 60;
    updateDisplay();
    body.style.backgroundColor = bgColor;
}

pomodoroBtn.addEventListener("click", () => setMode(25, "#d9534f"));
shortBreakBtn.addEventListener("click", () => setMode(5, "  rgb(56, 133, 138)"));
longBreakBtn.addEventListener("click", () => setMode(15, " rgb(57, 112, 151);"));
startPauseBtn.addEventListener("click", startPauseTimer);

updateDisplay();
