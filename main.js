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
    isPlayingBgm: true,
    isReplayEnabled: true,
    seed: 2
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
    };

    if (input.isJustPressed) {
        
        console.log("Ball Dropped");
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



function getCircleIntersections(a, b) {
    function calcDistance(point1, point2) {
        return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
    }

    const distance = calcDistance(a.getCenter(), b.getCenter());
    // if (distance > a.getRadius() + b.getRadius()) throw new Error("Circles out of range.");
    const dx = b.getCenter().x - a.getCenter().x;
    const dy = b.getCenter().y - a.getCenter().y;
    const unitdx = dx / distance;
    const unitdy = dy / distance;
    const baseDist1 = ((a.getRadius() * a.getRadius()) - (b.getRadius() * b.getRadius()) + (distance * distance)) / (2 * distance);
    const px = a.getCenter().x + baseDist1 * unitdx;
    const py = a.getCenter().y + baseDist1 * unitdy;
    const h = Math.sqrt(a.getRadius() * a.getRadius() - baseDist1 * baseDist1);

    return [
        { x: px + h * unitdy, y: py - h * unitdx },
        { x: px - h * unitdy, y: py + h * unitdx }
    ];
}
