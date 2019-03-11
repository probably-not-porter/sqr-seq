window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();
var source;
function playSound(arraybuffer) {
    context.decodeAudioData(arraybuffer, function (buf) {
        source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = buf;
        source.start(0);
    });
}

function handleFileSelect(ind) {
    var audio_input = document.getElementById("sound-"+ String(ind));
    var files = audio_input.files; // FileList object
    playFile(files[0]);
}

function playFile(file) {
    var freader = new FileReader();

    freader.onload = function (e) {
        console.log(e.target.result);
        playSound(e.target.result);
    };
    freader.readAsArrayBuffer(file);
}

function updateStep(y,x){
  target = document.getElementById("y" + String(y) + "x" + String(x));
  console.log(target);
  target.classList.toggle("active");
}


// PLAY FUNCTIONALITY

var play_pause = false;
var step_num = 0;
var current_elems = [];
var intervalId;

function playPause(){
  if (play_pause == false){
    intervalId = setInterval(play, 100);
    play_pause = true;
  }
  else{
    clearInterval(intervalId);
    for (var n = 0; n < current_elems.length; n++){
      current_elems[n].classList.remove("shadow");
    }
    current_elems = [];
    step_num = 0;
    play_pause = false;
  }
}

function play(){

  for (var n = 0; n < current_elems.length; n++){
    current_elems[n].classList.remove("shadow");
  }
  current_elems = [];
  for(var x = 0; x < 10; x++){
    var container = document.getElementById("container-" + String(x));
    container.getElementsByTagName('div')[step_num+1].classList.add("shadow");
    current_elems.push(container.getElementsByTagName('div')[step_num+1]);
    if(container.getElementsByTagName('div')[step_num+1].classList.contains("active")){
      handleFileSelect(x);
    }
  }
  step_num = step_num + 1;
  if (step_num > 15){
    step_num = 0;
  }
}
