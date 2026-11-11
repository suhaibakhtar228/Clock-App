function updateClock() {
    const date = new Date();
    document.getElementById("currentdate").textContent = date.toLocaleDateString();
    document.getElementById("currenttime").textContent = date.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);

let stopwatchSeconds = 0;
let stopwatchTimer = null;
let alarmTimer = null;

function showStopwatch() {
    const hours = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(stopwatchSeconds % 60).padStart(2, "0");
    document.getElementById("stopwatchTime").textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    if (stopwatchTimer === null) {
        stopwatchTimer = setInterval(function () {
            stopwatchSeconds++;
            showStopwatch();
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchTimer);
    stopwatchTimer = null;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    showStopwatch();
}

function setAlarm() {
    const alarmTime = document.getElementById("alarmInput").value;
    const alarmStatus = document.getElementById("alarmStatus");
    const alarmSound = document.getElementById("alarmSound");

    if (alarmTime === "") {
        return;
    }

    clearInterval(alarmTimer);
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmStatus.textContent = "Alarm is set for " + alarmTime + ".";

    alarmTimer = setInterval(function () {
        const now = new Date();
        const currentTime = String(now.getHours()).padStart(2, "0") + ":" +
            String(now.getMinutes()).padStart(2, "0");

        if (currentTime === alarmTime) {
            clearInterval(alarmTimer);
            alarmTimer = null;
            alarmStatus.textContent = "Alarm is ringing!";
            alarmSound.play().catch(function () {
                alarmStatus.textContent = "Alarm is ringing, but the sound could not play.";
            });
        }
    }, 1000);
}

function stopAlarm() {
    clearInterval(alarmTimer);
    alarmTimer = null;
    const alarmSound = document.getElementById("alarmSound");
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById("alarmStatus").textContent = "Alarm stopped.";
}