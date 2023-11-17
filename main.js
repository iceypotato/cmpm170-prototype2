title = "Popping Boba";

description = `[Tap] to Drop`;

characters = [];

options = {
  theme: "shapeDark",
  isShowingScore: true,
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 3,
};

/**
 * @type {{
* pos: Vector, vel: Vector, radius: number, targetRadius: number,
* }[]}
*/
let shapes;

function getRandomColor() {
  const colors = ["blue", "red", "green", "yellow", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function init() {
  shapes = [];
}

function update() {
  // Initialize on the first frame
  if (!ticks) {
    shapes = [];
  }

  // Create a new shape when the input is just pressed
  if (input.isJustPressed) {
    const newShape = {
      pos: vec(input.pos.x, 15),
      vel: vec(0, 0.5),
      radius: 0,
      targetRadius: Math.random() * 10 + 2,
      color: getRandomColor(), // Generate color here
    };
    shapes.push(newShape);
  }

  // Update and draw the shapes
  remove(shapes, (shape) => {
    shape.radius += (shape.targetRadius - shape.radius) * 0.02;
    shape.vel.y += 0.05;

    shape.pos.add(shape.vel);

    shapes.forEach((otherShape, index) => {
      if (shape !== otherShape) {
        const d = shape.pos.distanceTo(otherShape.pos) - shape.radius - otherShape.radius;
        if (d < 0) {
          const angle = otherShape.pos.angleTo(shape.pos);
          const overlap = shape.radius + otherShape.radius - shape.pos.distanceTo(otherShape.pos);

          // Adjust positions so that the shapes don't overlap
          const moveBy = overlap / 2;
          shape.pos.addWithAngle(angle, moveBy);
          otherShape.pos.addWithAngle(angle + PI, moveBy);

          // Adjust velocities to bounce off each other
          const averageBounce = (shape.vel.y + otherShape.vel.y) / 2;
          shape.vel.y = averageBounce;
          otherShape.vel.y = averageBounce;

          // Check if shapes have the same color
          if (shape.color === otherShape.color) {
            // Combine shapes by adding radii
            shape.targetRadius += otherShape.radius;
            console.log(`Circles of ${shape.color} and ${otherShape.color} are touching. Combined radius: ${shape.targetRadius}`);
           
            //increase score based on size of shape created
            addScore(shape.targetRadius, shape.pos);

            // Remove the other shape
            shapes.splice(index, 1);
          }
        }
      }
    });

    // Draw the shape with the pre-generated color
    color(shape.color);
    arc(shape.pos, shape.radius, 2);

    // Stop shape from going off the sides
    if (shape.pos.x - shape.radius < 0 || shape.pos.x + shape.radius > 99) {
      shape.vel.x = 0;
      shape.pos.x = clamp(shape.pos.x, shape.radius, 99 - shape.radius);
    }

    // Stop shape when it hits the bottom
    if (shape.pos.y + shape.radius >= 99) {
      shape.vel.y = 0;
      shape.pos.y = 99 - shape.radius;
    }

    // Remove when it reaches the target radius
    return shape.radius >= shape.targetRadius;
  });
}
