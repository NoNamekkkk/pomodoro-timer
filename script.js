const focusTime = 25 * 60;

const breakTime = 5 * 60;


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





setInterval(()=>{


    if(!running) return;



    if(remaining > 0){


        remaining--;

        renderTime();


    }

    else {


        running = false;


        play.textContent = "▶";



        if(mode === "break"){

            setMode("focus");

        }

    }



},1000);




renderTime();
