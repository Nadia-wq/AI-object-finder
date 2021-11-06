objects=[];
status="";
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO)
    video.size=(480,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detectingObject";
    objectName=document.getElementById("objectName").value;
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function gotResult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects=results;
}
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objectsDetected";
            fill("green");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            stroke("blue");
            rect(objects[i].x+objects[i].y+objects[i].width,objects[i].height);
            if(objects[i].label==objectName){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=objectName+" found"
            }
            else{
                document.getElementById("status").innerHTML=objectName+" not found"
            }
        }
    }
}