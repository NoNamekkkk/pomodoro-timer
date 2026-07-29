const focusTime = 25 * 60;

const breakTime = 5 * 60;

let soundEnabled = true;

let mode = "focus";

let remaining = focusTime;

let running = false;



const time = document.getElementById("time");

const play = document.getElementById("play");

const focusTab = document.getElementById("focusTab");

const breakTab = document.getElementById("breakTab");



function renderTime(){

    const minutes = Math.floor(remaining / 60);

    const seconds = remaining % 60;


    time.textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}




function setMode(newMode){


    mode = newMode;


    remaining =
    mode === "focus"
    ? focusTime
    : breakTime;



    running = false;


    play.textContent = "▶";



    focusTab.classList.toggle(
        "active",
        mode === "focus"
    );



    breakTab.classList.toggle(
        "active",
        mode === "break"
    );



    renderTime();

}




focusTab.onclick = () => {

    setMode("focus");

};



breakTab.onclick = () => {

    setMode("break");

};





play.onclick = () => {


    running = !running;


    play.textContent =
    running
    ? "⏸"
    : "▶";

};





document.getElementById("reset").onclick = () => {


    remaining =
    mode === "focus"
    ? focusTime
    : breakTime;


    running = false;


    play.textContent = "▶";


    renderTime();


};


function playBell(){

const ctx =
new (window.AudioContext || window.webkitAudioContext)();


const now = ctx.currentTime;


function bell(freq, volume, delay, decay){


    const osc = ctx.createOscillator();

    const gain = ctx.createGain();



    osc.type = "sine";


    osc.frequency.setValueAtTime(
        freq,
        now + delay
    );



    gain.gain.setValueAtTime(
        0.0001,
        now + delay
    );


    gain.gain.exponentialRampToValueAtTime(
        volume,
        now + delay + 0.05
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + delay + decay
    );



    osc.connect(gain);

    gain.connect(ctx.destination);



    osc.start(
        now + delay
    );


    osc.stop(
        now + delay + decay
    );

}


bell(392, 0.07, 0, 1.8);

bell(588, 0.018, 0.05, 1.4);

bell(784, 0.008, 0.12, 1);

}


setInterval(() => {


if(running){


    remaining--;


    if(remaining <= 0){


        playBell();


        if(mode === "focus"){

            setMode("break");

        } else {

            setMode("focus");

        }


    }


    renderTime();


}


},1000);
