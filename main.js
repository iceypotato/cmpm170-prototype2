title = "Not Suika Game";

description = `Color \n shapes \n combiner`;

characters = [
`
  cc    
 cccc
cccccc
`
];

const G = {
    W: 100,
    H: 100
}

// default viewsize is 100x100
options = {
    theme: "shapeDark",
};

let player;
let shapes;

function update() {
    if (!ticks) {
        init()
    }
    getInput()
    color("cyan")
    player.pos = vec(input.pos.x, player.pos.y)
    renderShape("circle")
}

function renderShape(shape) {
    switch (shape) {
        case "circle":
            box(player.pos, 1)
            break
        case "square":
            box(player.pos, 30)
            break
    }
}

function getInput() {
    if (input.isJustPressed) {
        console.log("Ball Dropped");
        generateShape()
    }
}

function generateShape() {
    var shape = box(player.pos, 10)
    return shape
}

function init() {
    player = {
        pos: vec(G.W / 2, 10),
        obj: null
    }
    player.obj = generateShape()
    shapes = [];
}

addEventListener("load", onLoad);