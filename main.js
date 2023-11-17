title = "Shape Game";

description = `Color \n Shapes \n Combiner`;

characters = [];

options = {
  theme: "shapeDark",
  isShowingScore: true,
};

/**
 * @type {{
* pos: Vector, vel: Vector, radius: number, targetRadius: number,
* }[]}
*/

let shapes;
let pos;
let radius;
let targetRadius;

function init() { 
  // Initialize your variables here if needed
}

function getRandomColor() {
  const colors = ["blue", "red", "green"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function update() {
  if (!ticks) {
    shapes = [];
    pos = vec();
    radius = undefined;
  }

  if (input.isJustPressed) {
    const newShape = {
      pos: vec(input.pos.x, input.pos.y),
      vel: vec(0, 0.5), // Add velocity to make it fall
      radius: 0,
      targetRadius: Math.random() * 10 + 2,
      
    };
    shapes.push(newShape);
  }

  // Update and draw the shapes
  remove(shapes, (shape) => {
    shape.radius += (shape.targetRadius - shape.radius) * 0.05;
    shape.vel.y += 0.05; // Apply gravity

    shape.pos.add(shape.vel);

    shapes.forEach((otherShape) => {
      if (shape !== otherShape) {
        const d = shape.pos.distanceTo(otherShape.pos) - shape.radius - otherShape.radius;
        if (d < 0) {
          const angle = otherShape.pos.angleTo(shape.pos);
          const overlap = shape.radius + otherShape.radius - shape.pos.distanceTo(otherShape.pos);
          
          // Adjust the position to prevent sticking
          const moveBy = overlap / 2;
          shape.pos.addWithAngle(angle, moveBy);
          otherShape.pos.addWithAngle(angle + PI, moveBy);
          
          // Adjust the velocity for bounce effect
          const averageBounce = (shape.vel.y + otherShape.vel.y) / 2;
          shape.vel.y = averageBounce;
          otherShape.vel.y = averageBounce;
        }
      }
    });
  

    // Draw the shape, can call generateShape() here for the real branch
    const randomColor = getRandomColor();
    color('red');
    arc(shape.pos, shape.radius, 2);
    

    // Stop shape from rolling off the sides of the screen
    if (shape.pos.x - shape.radius < 0){
      shape.vel.x = 0;
      shape.pos.x = shape.radius;
    }
    else if (shape.pos.x + shape.radius > 99){
      shape.vel.x = 0;
      shape.pos.x = 99 - shape.radius;
    }

    // Stop shape when it hits the bot of the screen
    if (shape.pos.y + shape.radius >= 99) {
      shape.vel.y = 0; // Stop the vertical velocity
      shape.pos.y = 99 - shape.radius; // Adjust the position to be just above the bottom
    }

    return shape.radius >= shape.targetRadius; // Remove when it reaches the target radius
  });
}