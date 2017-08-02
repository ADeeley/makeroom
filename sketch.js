class Canvas {
    constructor() {
    this.width = 400;
    this.height = 800;
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
class Gates {
    constructor() {
        this.gates = [];
    }
    addGate(thisGate) {
        this.gates.push(thisGate);
    }
}

let ball = new Ball(200, 20, 15); 
let canvas = new Canvas();

// build gates array
let gates = new Gates();
for (i = 0; i < 5; i++) {
    gates.addGate(new Gate(0, 400 + (50 * i), 30, 200));
}

function setup() {
    createCanvas(canvas.width, canvas.height);
}


function keyDown() {
    // Check for left or right keys being hit and move the gate accordingly
    for (i = 0; i < gates.gates.length; i++) {
    if (keyIsDown(65 + i)) {
        gates.gates[i].x--;
        gates.gates[i].x2--;
    }
    else if (keyIsDown(90 - i)) {
        gates.gates[i].x++;
        gates.gates[i].x2++;
    }
  }
}
function collisionEvent(gate) {
    // Returns true if the ball is within the bounds of the gate perameters 
    // specified. To be used on each gate individually
    
    // check for collisions with left gate
    /*
    if (b.x > g.x && b.x < (g.x + g.width + b.radius) && b.y > (g.y - b.radius) && b.y < (g.y + g.height + b.radius)) {
            return true;
    }
    // check for collisions with right gate
    if (b.x > g.x2 && b.x < (g.x2 + g.width + b.radius) && b.y > (g.y2 - b.radius) && b.y < (g.y2 + g.height + b.radius)) {
            return true;
        }
    */
    // check if the gate is not colliding with the ball
    if (!(ball.x + ball.radius < gate.x || ball.x - ball.radius > gate.x + gate.width 
        || ball.y + ball.radius < gate.y || ball.y - ball.radius> gate.y + gate.height )) {
        return true;   
    }
    if (!(ball.x + ball.radius < gate.x2 || ball.x - ball.radius > gate.x2 + gate.width 
        || ball.y + ball.radius< gate.y2 || ball.y - ball.radius > gate.y2 + gate.height )) {
        return true;   
    }
    // No collisions
    return false;
}

function draw() {
    // set up the background 
    noStroke();
    background(40, 20, 20);
    textSize(32);
    text("A| |Z", 10, 40);
    textSize(50);
    text("GOAL", 130, canvas.height);
    fill(250, 200, 200);
    
    keyDown();
    // create the gates for the ball to fall through
    for (i = 0; i < gates.gates.length; i++) {
        rect(gates.gates[i].x, gates.gates[i].y, gates.gates[i].width, gates.gates[i].height);
        rect(gates.gates[i].x2, gates.gates[i].y2, gates.gates[i].width, gates.gates[i].height);
    }
    
    // draw the ball and make it fall
    ellipse(ball.x, ball.y, ball.diameter, ball.diameter);
    ball.y++;
    

    //check for collisions between the ball and barriers
    for (i = 0; i < gates.gates.length; i++) {
        if (collisionEvent(gates.gates[i]))
            ball.y = 20;
  }
}
