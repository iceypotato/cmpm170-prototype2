title = "Not Suika Game";

description = `Color \n shapes \n combiner`;

characters = [];

options = {
    theme: "shapeDark",
};

let player;
let shapes;

function update() {
    if (!ticks) {
        init()
    };

    if (input.isJustPressed) {
        
        console.log("Ball Dropped");
    }
    color("cyan")
    box(player.pos, 4)

    //shapes.push({ pos: vec(50 - x, y)});
    //color("light_cyan");
    //rect(5, 0, 90, 5);
}

function generateShape() {
    
}

function init() {
    player = {pos: vec(50, 10), vel: vec()};
    shapes = [];
}

addEventListener("load", onLoad);