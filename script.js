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

    if(!soundEnabled) return;


    const ctx =
    new (window.AudioContext || window.webkitAudioContext)();


    const now = ctx.currentTime;



    function bellTone(freq, volume, decay){


        const osc = ctx.createOscillator();

        const gain = ctx.createGain();



        osc.type = "sine";


        osc.frequency.setValueAtTime(
            freq,
            now
        );



        gain.gain.setValueAtTime(
            0.001,
            now
        );


        gain.gain.exponentialRampToValueAtTime(
            volume,
            now + 0.03
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + decay
        );



        osc.connect(gain);

        gain.connect(ctx.destination);



        osc.start(now);

        osc.stop(now + decay);

    }



    bellTone(440, 0.12, 3.5);


    setTimeout(()=>{

        bellTone(880, 0.035, 2.5);

    },80);



    setTimeout(()=>{

        bellTone(1320, 0.015, 2);

    },120);


}


setInterval(()=>{


    if(!running) return;



    if(remaining > 0){


        remaining--;

        renderTime();


    }

    
else {

    running = false;

    play.textContent = "▶";


    playBell();


    if(mode === "break"){

        setMode("focus");

    }

}


},1000);




renderTime();
