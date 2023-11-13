title = "Not Suika Game";

description = `Color \n shapes \n combiner`;

characters = [];

options = {
    theme: "shapeDark",
    isPlayingBgm: true,
    isReplayEnabled: true,
    seed: 2
};

let player;
let shapes;


function update() {
    if (!ticks) {
        init()
        mergeShape()
    };

    if (input.isJustPressed) {
        
        console.log("Ball Dropped");
    }
    color("cyan")
    box(player.pos, 10)
}


function mergeShape() {
    const defaults = { color: 'red', size: 'medium' };
    const userSettings = { color: 'blue' };

    const combinedSettings = Object.assign({}, defaults, userSettings);
    console.log(combinedSettings);
}

function init() {
    player = {pos: vec(50, 10), vel: vec()};
    shapes = [];
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
