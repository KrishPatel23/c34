var ball;
var position, database;
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var node = database.ref('Ball/Position');
    node.on("value",readPos,showErr);

}
function readPos(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}
function showErr(){
    console.log('error reading from the database');
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('Ball/Position').set({
        x:position.x+x,
        y:position.y+y
    })
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
}
