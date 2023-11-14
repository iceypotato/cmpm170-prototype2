title = "Not Suika Game";

description = `Color \n shapes \n combiner`;

characters = [];

options = {
    theme: "shapeDark",
};

let pp;

function init() {
   
}


function update() {

    pp = vec();
    color("green");
    pp.set(clamp(input.pos.x, 5, 95), 15);
    box(pp, 7 ,7);
    
    
    if(input.isJustPressed){
      while(pp.y < 90){
        pp.y += 10;
        console.log("After:");
        console.log(pp.y);
      }
      if(pp.y > 90){
        pp = undefined;
      }else{
        pp.set(clamp(input.pos.x, 5, 95), 15);
      }
    }
  }

addEventListener("load", onLoad);
