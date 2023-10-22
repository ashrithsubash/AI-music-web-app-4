song1="";
song2="";

function preload()
{
    song = loadSound("song1.mp3");
    song = loadSound("song2.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
	stroke("#FF0000");


    
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20);
        song2.stop();
    }

    if(song1_status == false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Whatever It Takes";
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(LeftWristX, LeftWristY,20);
        song1.stop();
    }

    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song").innerHTML = "Playing - I Ain't Worried";
    }
}

function gotPoses(results)
 {
if(results.length > 0)
{
console.log(results);
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX = " + leftWristX +"leftWristY" + leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("rightWristX = " + rightWristX +"rightWristY" + rightWristY);
}
 }

 function play()
 {
    song.play();
    song.setVolume(1);
    song.rate(1);
 }