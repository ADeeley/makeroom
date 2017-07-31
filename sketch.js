class Canvas {
    constructor() {
    this.width = 400;
    this.height = 400;
    }
}

class Ball {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.radius = diameter / 2;
    }
}

class Gate {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.x2 = x + width + 50;
        this.y2 = y;
        this.height = height;
        this.width = width;
    }
}

let ball = new Ball(200, 20, 15); 
let canvas = new Canvas();
let gateAZ = new Gate(0, 300, 50, 200);


function setup() {
    createCanvas(canvas.width, canvas.height);

}
function keyDown() {
    // Check for left or right keys being hit and move the gate accordingly
    if (keyIsDown(LEFT_ARROW)) {
        gateAZ.x--;
        gateAZ.x2--;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        gateAZ.x++;
        gateAZ.x2++;
    }
}

function draw() {
    // set up the background 
    noStroke();
    background(40, 20, 20);
    fill(250, 200, 200);

    keyDown();
    // create the gate for the ball to fall through
    rect(gateAZ.x, gateAZ.y, gateAZ.width, gateAZ.height);
    rect(gateAZ.x2, gateAZ.y2, gateAZ.width, gateAZ.height);
    
    // draw the ball and make it fall
    ellipse(ball.x, ball.y, ball.diameter, ball.diameter);
    ball.y++;

  
}
