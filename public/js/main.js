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
