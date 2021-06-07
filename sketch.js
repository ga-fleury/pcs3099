var nSteps = 32;
var nTracks = 4;
var kit;
var cellWidth, cellHeight;
var beats = 0;
var cells = [];
var currentStep = 0;
var playButton;
var margin = 12;
var trackColors = [
    '#FBD1A2',
    '#7DCFB6',
    '#00B2CA',
    '#1d4e89'
]

var drumNames = ["hho", "hh", "snare", "kick"];
kit = new Tone.Players(
  {"hho" : "./samples/505/hho.mp3",
		"hh" : "./samples/505/hh.mp3",
    "snare" : "./samples/505/snare.mp3",
    "kick" : "./samples/505/kick.mp3"
  });

kit.toMaster();
Tone.Transport.bpm.value = 210;
Tone.Transport.scheduleRepeat(onBeat, "8n");

function setup(){
  createCanvas(1060,120);
	cellWidth = (width-margin)/nSteps;
	cellHeight = (height-margin)/nTracks;
  
  for(var track=0; track<nTracks; track++){
  	cells[track] = [];
    for(var step=0; step<nSteps; step++){
    	cells[track][step] = -1;
    }
  }  
  playButton = createButton('Play');
  // playButton.width(displayWidth/2, 300);
  playButton.mouseClicked(togglePlay);
}

function onBeat(time){
	for(var track=0; track<nTracks; track++){
  	if(cells[track][currentStep] == 1){
    	var drum = kit.get(drumNames[track]);
      drum.start(time);
    }
  }
  beats++;
  currentStep = (beats) % nSteps;

  console.log(beats, currentStep);
}

function draw(){
	background(255);
  stroke(0);
	
  for(var track=0; track<nTracks; track++){
  	for(var step=0; step<nSteps; step++){
          if(step % 4 == 0){
              fill(244);
              rect(step*cellWidth,track*cellHeight,cellWidth, cellHeight);
          }
  		if(cells[track][step] == 1){
        fill(trackColors[track]);
        rect(step*cellWidth,track*cellHeight,cellWidth, cellHeight);
      }
  	}
  }
  
  //vertical lines
  for(var i=0; i<=nSteps; i++){
  	line(i*cellWidth,0,i*cellWidth,height-margin);
  }
  
  //horizontal lines
  for(var j=0; j<=nTracks; j++){
  	line(0,j*cellHeight,width-margin,j*cellHeight);
  }
  
  highlight = (beats-1) % nSteps;
    fill('rgba(255,0,0, 0.25)')
	noStroke();
	rect(highlight*cellWidth, 0, cellWidth, height);
  
}

function mousePressed(){
	if(0<mouseX && mouseX<width && 
     0<mouseY && mouseY<height){
    
  	var i = floor(mouseX/cellWidth);
    var j = floor(mouseY/cellHeight);
    
    cells[j][i] = -cells[j][i];
  }
}

function togglePlay(){
	if(Tone.Transport.state == "started"){
  	Tone.Transport.stop();
    playButton.html('Play');
  } else {
    beats = -1;
  	Tone.Transport.start();
    playButton.html('Stop');
  }
}
