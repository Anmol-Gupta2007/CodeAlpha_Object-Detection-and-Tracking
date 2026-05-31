const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d");

const objectCount = document.getElementById("objectCount");
const trackCount = document.getElementById("trackCount");
const fpsDisplay = document.getElementById("fps");

const trackingList =
document.getElementById("trackingList");

let running = false;
let frameCounter = 0;
let lastTime = performance.now();

videoInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if(file){
        videoPlayer.src =
        URL.createObjectURL(file);
    }
});

function addTrackingEvent(id,label){

    const div =
    document.createElement("div");

    div.className="track-item";

    div.innerHTML=`
        <div class="track-id">
            Track ID: ${id}
        </div>
        <div>${label}</div>
    `;

    trackingList.prepend(div);

    if(trackingList.children.length>15){
        trackingList.removeChild(
            trackingList.lastChild
        );
    }
}

function renderFrame(){

    if(!running) return;

    canvas.width =
    videoPlayer.videoWidth;

    canvas.height =
    videoPlayer.videoHeight;

    ctx.drawImage(
        videoPlayer,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const detections =
    Math.floor(Math.random()*8)+1;

    objectCount.textContent =
    detections;

    trackCount.textContent =
    detections;

    for(let i=0;i<detections;i++){

        let x=Math.random()*600;
        let y=Math.random()*300;

        let w=80+Math.random()*80;
        let h=80+Math.random()*60;

        ctx.strokeStyle="#00ff88";
        ctx.lineWidth=3;

        ctx.strokeRect(x,y,w,h);

        ctx.fillStyle="#00ff88";

        ctx.font="16px Poppins";

        ctx.fillText(
        `Person #${i+1}`,
        x,
        y-10
        );

        if(Math.random()>.97){
            addTrackingEvent(
                i+1,
                "Object Updated"
            );
        }
    }

    frameCounter++;

    const now=performance.now();

    if(now-lastTime>=1000){

        fpsDisplay.textContent=
        frameCounter;

        frameCounter=0;
        lastTime=now;
    }

    requestAnimationFrame(renderFrame);
}

document
.getElementById("startBtn")
.addEventListener("click",()=>{

    running=true;
    videoPlayer.play();

    renderFrame();
});

document
.getElementById("stopBtn")
.addEventListener("click",()=>{

    running=false;
});
