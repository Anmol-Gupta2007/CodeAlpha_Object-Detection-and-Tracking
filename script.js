const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const webcamBtn = document.getElementById("webcamBtn");

const videoInput = document.getElementById("videoInput");

const fpsEl = document.getElementById("fps");
const objectEl = document.getElementById("objects");
const trackEl = document.getElementById("tracks");

const activity = document.getElementById("activity");

let stream = null;
let running = false;
let animationId = null;

let frameCount = 0;
let lastTime = performance.now();

function addLog(message){

    const div =
    document.createElement("div");

    div.className = "log";
    div.textContent = message;

    activity.prepend(div);

    while(activity.children.length > 20){
        activity.removeChild(
            activity.lastChild
        );
    }
}

videoInput.addEventListener("change", e=>{

    const file = e.target.files[0];

    if(!file) return;

    video.src =
    URL.createObjectURL(file);

    addLog("Video loaded");
});

webcamBtn.addEventListener("click", async ()=>{

    try{

        stream =
        await navigator.mediaDevices.getUserMedia({
            video:true
        });

        video.srcObject = stream;

        addLog("Webcam connected");

    }catch(err){

        addLog("Webcam access denied");
    }
});

function resizeCanvas(){

    canvas.width =
    video.videoWidth;

    canvas.height =
    video.videoHeight;
}

function drawOverlay(){

    if(!running) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const objects =
    Math.floor(Math.random()*5)+1;

    objectEl.textContent = objects;
    trackEl.textContent = objects;

    for(let i=0;i<objects;i++){

        const x =
        50 + i*120;

        const y =
        100 + i*25;

        const w = 100;
        const h = 80;

        ctx.strokeStyle="#00ff88";
        ctx.lineWidth=3;

        ctx.strokeRect(x,y,w,h);

        ctx.fillStyle="#00ff88";

        ctx.font="16px Arial";

        ctx.fillText(
            `ID ${i+1}`,
            x,
            y-8
        );
    }

    frameCount++;

    const now =
    performance.now();

    if(now-lastTime >= 1000){

        fpsEl.textContent =
        frameCount;

        frameCount = 0;
        lastTime = now;
    }

    animationId =
    requestAnimationFrame(
        drawOverlay
    );
}

startBtn.addEventListener("click", ()=>{

    if(running) return;

    running = true;

    video.play();

    resizeCanvas();

    drawOverlay();

    addLog("Tracking started");
});

stopBtn.addEventListener("click", ()=>{

    running = false;

    cancelAnimationFrame(
        animationId
    );

    addLog("Tracking stopped");
});

video.addEventListener(
    "loadedmetadata",
    resizeCanvas
);

window.addEventListener(
    "resize",
    resizeCanvas
);
