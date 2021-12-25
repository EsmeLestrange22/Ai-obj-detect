objects = [];
status_new = "";
ip= document.getElementById("ip").value;
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();


function preload() {
   
}
function go(){
    objectDetect= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Model Loading in Progress"
    objectDetect.detect(video, gotResults)
}
function setup() {
    canvas = createCanvas(600, 450)
    canvas.position(420, 290)

    video= createCapture(VIDEO);
    video.size(600, 450)
    video.hide();
}



function modelLoaded() {
    document.getElementById("status").innerHTML = "Status: Model Loaded";
    console.log("Model Loaded");
    status_new = true;
   
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 600, 450)
    if (status_new != "") {
        objectDetect.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            

            oL = objects[i].label
            oC = floor(objects[i].confidence * 100)
            oW = objects[i].width
            oH = objects[i].height
            oX = objects[i].x
            oY = objects[i].y

            fill("red")
            stroke("yellow")
            textSize(20)
            text(oL+" "+oC+"%", oX+100, oY+100)
            noFill()
            rect(oX,oY, oW, oH)

            if(document.getElementById("ip").value=objects[i].label){
                document.getElementById("ip").value= " ";
               speak()
                function speak() {
                    var synth = window.speechSynthesis;
                    speak_data = objects[0].label+" found!"
                    var utter_this = new SpeechSynthesisUtterance(speak_data);
                    synth.speak(utter_this);
        }
        
    }
   
    }
}
}