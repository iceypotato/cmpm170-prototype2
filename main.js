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

/** @type {{pos: Vector, obj: Circle | Rectangle | Triangle}} */
let player;
let shapes;

const ShapeTypes = {
    CIRCLE: 0,
    TRIANGLE: 1,
    RECT: 2,
}

const Colors = {
    WHITE: "white",
    RED: "red",
    GREEN: "green",
    YELLOW: "yellow",
    BLUE: "blue",
    PURPLE: "purple",
    CYAN: "cyan",
    BLACK: "black",
    LIGHT_RED: "light_red",
    LIGHT_GREEN: "light_green",
    LIGHT_YELLOW: "light_yellow",
    LIGHT_BLUE: "light_blue",
    LIGHT_PURPLE: "light_purple",
    LIGHT_CYAN: "light_cyan",
    LIGHT_BLACK: "light_black"
}


var temp = new Triangle(20, 20, 4)

function init() {
    player = {
        pos: vec(G.W / 2, 10),
        obj: null
    }
    generateShape()
}

function update() {
    if (!ticks) {
        init()
    }
    getInput()
    player.obj.x = input.pos.x
    player.obj.update()
    
    // temp.update()
}

function generateShape() {
    var random = Math.floor(Math.random() * (3 - 0) + 0)
    switch (random) {
        case ShapeTypes.CIRCLE:
            player.obj = new Circle(input.pos.x, 10, 10)
            break
        case ShapeTypes.RECT:
            player.obj = new Rectangle(input.pos.x, 10, 12, 8)
            break
        case ShapeTypes.TRIANGLE:
            player.obj = new Triangle(input.pos.x, 10, 4)
            break
    }
}

function getInput() {
    if (input.isJustPressed) {
        console.log("Ball Dropped");
        generateShape()
    }
}



addEventListener("load", onLoad);