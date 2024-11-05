var timers = {};

// Carregar os timers salvos no localStorage ao carregar a página
window.onload = function() {
    var tarefas = document.querySelectorAll('li');
    tarefas.forEach(function(tarefa, index) {
        if (localStorage.getItem('timer-' + index)) {
            var savedTime = parseInt(localStorage.getItem('timer-' + index));
            timers[index] = { elapsed: savedTime, interval: null };
            document.getElementById('time-' + index).textContent = formatTime(savedTime);
        }
    });
};

function startTimer(index) {
    if (!timers[index]) {
        timers[index] = { elapsed: 0, interval: null };
    }

    if (!timers[index].interval) {
        timers[index].interval = setInterval(function() {
            timers[index].elapsed++;
            document.getElementById('time-' + index).textContent = formatTime(timers[index].elapsed);
            localStorage.setItem('timer-' + index, timers[index].elapsed);
        }, 1000);
    }
}

function stopTimer(index) {
    if (timers[index] && timers[index].interval) {
        clearInterval(timers[index].interval);
        timers[index].interval = null;
    }
}

function resetTimer(index) {
    stopTimer(index);
    timers[index].elapsed = 0;
    document.getElementById('time-' + index).textContent = "00:00:00";
    localStorage.removeItem('timer-' + index);
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
