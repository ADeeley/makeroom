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
        this.leftGateX = x;
        this.leftGateY = y;
        this.rightGateX = x + width + 50;
        this.rightGateY = y;
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

// instansiate the objects
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
        gates.gates[i].leftGateX--;
        gates.gates[i].rightGateX--;
    }
    else if (keyIsDown(90 - i)) {
        gates.gates[i].leftGateX++;
        gates.gates[i].rightGateX++;
    }
  }
}

function collisionEvent(gate) {
    // Returns true if the ball is within the bounds of the gate perameters 
    // specified. To be used on each gate individually

    // check if the gate is not colliding with the ball
    if (!(ball.x + ball.radius < gate.leftGateX 
        || ball.x - ball.radius > gate.leftGateX + gate.width 
        || ball.y + ball.radius < gate.leftGateY 
        || ball.y - ball.radius> gate.leftGateY + gate.height )) {
        return true;   
    }
    if (!(ball.x + ball.radius < gate.rightGateX 
        || ball.x - ball.radius > gate.rightGateX + gate.width 
        || ball.y + ball.radius< gate.rightGateY 
        || ball.y - ball.radius > gate.rightGateY + gate.height )) {
        return true;   
    }
    // No collisions
    return false;
}

function draw() {
    // set up the background 
    noStroke();
    background(40, 20, 20);

    // Draw the title and goal text
    textSize(32);
    text("A| |Z", 10, 40);
    textSize(50);
    text("GOAL", 130, canvas.height);

    // create the gates for the ball to fall through
    fill(250, 200, 200);
    for (i = 0; i < gates.gates.length; i++) {
        rect(gates.gates[i].leftGateX, gates.gates[i].leftGateY, 
             gates.gates[i].width, gates.gates[i].height);
        rect(gates.gates[i].rightGateX, gates.gates[i].rightGateY, 
             gates.gates[i].width, gates.gates[i].height);
    }
    
    // Check for key presses
    keyDown();

    // draw the ball and make it fall
    ellipse(ball.x, ball.y, ball.diameter, ball.diameter);
    ball.y++;

    //check for collisions between the ball and barriers
    for (i = 0; i < gates.gates.length; i++) {
        if (collisionEvent(gates.gates[i]))
            ball.y = 20;
  }
}
