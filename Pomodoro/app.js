// Fetching elements
let semiCircles = document.querySelectorAll('.semicircle')
const timer = document.querySelector('.timer')
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const hoursInput = document.getElementById('hoursInput')
const minutesInput = document.getElementById('minutesInput')
const secondsInput = document.getElementById('secondsInput')

let timeLoop;
let futureTime;
let setTime = 0; // Initialize setTime

    
    timer.innerHTML = `
        <div>00</div><div class="colon">:</div>
        <div>00</div><div class="colon">:</div>
        <div>00</div>
    `;

function getValue() {
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    setTime = (hours * 3600 + minutes * 60 + seconds) * 1000; // Convert total time to milliseconds
    futureTime = Date.now() + setTime; // Calculate future time
}

function countDownTimer() {
    let currentTime = Date.now();
    let remainingTime = futureTime - currentTime;
    let angle = (remainingTime / setTime) * 360;

    // Progress Indicator
    if(angle > 180) {
        semiCircles[0].style.visibility = `visible`
        semiCircles[1].style.visibility = `visible`
        semiCircles[2].style.display = 'none'
        semiCircles[0].style.transform = `rotate(180deg)`
        semiCircles[1].style.transform = `rotate(${angle}deg)`
    }
    else {
        semiCircles[2].style.display = 'block';
        semiCircles[0].style.transform = `rotate(${angle}deg)`
        semiCircles[1].style.transform = `rotate(${angle}deg)`
    }


    // Timer Display
    const hrs = Math.floor(remainingTime / (1000 * 60 * 60)).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime % (1000 * 60)) / 1000).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `
        <div>${hrs}</div>
        <div class="colon">:</div>
        <div>${mins}</div>
        <div class="colon">:</div>
        <div>${secs}</div>
    `;
    // 5 - sec rule (remind USER that the timer is about to end in 5 Min)
    if (remainingTime <= 6000){
        semiCircles[0].style.backgroundColor = "red";
        semiCircles[1].style.backgroundColor = "red";
        timer.style.color = "red";
    }
    // End Timer
    if (remainingTime < 0) {
        clearInterval(timeLoop)
        semiCircles[0].style.visibility = `hidden`
        semiCircles[1].style.visibility = `hidden`
        semiCircles[2].style.visibility = `visible`
        timer.innerHTML = `
            <div>00</div><div class="colon">:</div>
            <div>00</div><div class="colon">:</div>
            <div>00</div>
        `;
        timer.style.color = "lightgray"; //to show USER that the timer is stopped
    }
}

startBtn.onclick = function() {
    getValue(); // Fetch value from input
    countDownTimer(); // Initialize timer display
    timeLoop = setInterval(countDownTimer); // Start countdown
    
};

stopBtn.addEventListener("click", function stop() {
    clearInterval(timeLoop);
    //localStorage.clear();
    //semiCircles.forEach(sc => sc.style.display = 'none');
    semiCircles[0].style.visibility = `hidden`
    semiCircles[1].style.visibility = `hidden`
    semiCircles[2].style.visibility = `visible`

    timer.innerHTML = `
        <div>00</div><div class="colon">:</div>
        <div>00</div><div class="colon">:</div>
        <div>00</div>
    `;
    
}, );
