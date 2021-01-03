const Matter = window.Matter
const Mousetrap = window.Mousetrap

const MatterAttractors = window.MatterAttractors

function setupAttractors(options) {
  const CANVAS_WIDTH = options.canvasWidth
  const CANVAS_HEIGHT = options.canvasHeight
  let canvas = options.canvas
  
  if (!canvas) {
    throw new Error('canvas is required')
  }
  
  if (!CANVAS_WIDTH) {
    throw new Error('CANVAS_WIDTH is required')
  }
  
  if (!CANVAS_HEIGHT) {
    throw new Error('CANVAS_HEIGHT is required')
  }
  
  Matter.use(MatterAttractors)
  
  // module aliases
  let Engine = Matter.Engine,
      Events = Matter.Events,
      Composite = Matter.Composite,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      Common = Matter.Common,
      Bodies = Matter.Bodies

  // create engine
  let engine = Engine.create()

  // create renderer
  let render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      wireframes: false,
      background: '#fafafa',
      pixelRatio: 2,
      
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    }
  })

  // create runner
  let runner = Runner.create()
  
  Runner.run(runner, engine)
  Render.run(render)

  // create demo scene
  let world = engine.world
  world.gravity.scale = 0

  // function attractor(bodyA, bodyB) {
  //   return {
  //     x: Math.pow((bodyA.position.x - bodyB.position.x), 3) * 1e-8 * 1/3,
  //     y: Math.pow((bodyA.position.y - bodyB.position.y), 3) * 1e-8 * 1/3,
  //   }
  // }

  function attractor(bodyA, bodyB) {

  	// let xDistance = Math.abs(bodyA.position.x - bodyB.position.x)
  	// let yDistance = Math.abs(bodyA.position.y - bodyB.position.y)

  	// console.log(xDistance, yDistance)

    let attractionForce = {
      x: (bodyA.position.x - bodyB.position.x) * 1e-6 * 2,
      y: (bodyA.position.y - bodyB.position.y) * 1e-6 * 2,
    }

    // console.log(attractionForce)

    return attractionForce
  }

  // create a body with an attractor
  let cursorAttractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    2, 
    {
	    isStatic: true,

	    render: {
        fillStyle: '#000000',
	    },

	    // example of an attractor function that 
	    // returns a force vector that applies to bodyB
	    plugin: {
	      attractors: [
	      	attractor
	      ]
	    }
	  }
	)

	let staticAttractiveBody = Bodies.rectangle(
		options.canvasWidth / 1.5,
		options.canvasHeight / 2,
		100,
		100,
    {
	    isStatic: true,

	    render: {
        fillStyle: '#000000',
	    },

	    // example of an attractor function that 
	    // returns a force vector that applies to bodyB
	    plugin: {
	      attractors: [
	      	attractor
	      ]
	    }
	  }
	) 

  World.add(world, cursorAttractiveBody)
  // World.add(world, staticAttractiveBody)

  // add some bodies that to be attracted
  for (let i = 0; i < 300; i += 1) {
    let body = Bodies.polygon(
      Common.random(0, render.options.width), 
      Common.random(0, render.options.height),
      Common.random(1, 1),
      Common.random() > 0.9 ? Common.random(10,10) : Common.random(10, 10),

      {
        // angle: angle,
        // restitution: 1,
        render: {
          fillStyle: '#000000',
          // strokeStyle: '#0adda6',
          // lineWidth: 2,
        },
        plugin: {
		      attractors: [
		      	// MatterAttractors.Attractors.gravity,
		        // function(bodyA, bodyB) {
		        //   return {
		        //     x: (bodyA.position.x - bodyB.position.x) * 1e-6,
		        //     y: (bodyA.position.y - bodyB.position.y) * 1e-6,
		        //   }
		        // }
		      ]
		    }
      }
    )

    World.add(world, body)
  }
  
  // add mouse control
  let mouse = Mouse.create(render.canvas)



  let explosion = function(engine) {
    let bodies = Composite.allBodies(engine.world);

    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];

      // let thresholdRadius = 100
      // let xDistance = body.position.x - cursorAttractiveBody.position.x
      // let yDistance = body.position.y - cursorAttractiveBody.position.y
      // let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))

      // // console.log(distance)

      // let shouldApplyForce = distance < thresholdRadius

      if (!body.isStatic/* && thresholdRadius*/) {
        let forceMagnitude = 0.025 * body.mass;

        // Body.applyForce(body, body.position, {
        //   x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
        //   y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
        //   // y: -forceMagnitude + Common.random() * -forceMagnitude
        // });
        


        Body.applyForce(body, cursorAttractiveBody.position, {
        	x: forceMagnitude * (1 / (body.position.x - cursorAttractiveBody.position.x)),
        	y: forceMagnitude * (1 / (body.position.y - cursorAttractiveBody.position.y)),
          // x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
          // y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
          // y: -forceMagnitude + Common.random() * -forceMagnitude
        });
      } else {
      	console.log('should not apply force')
      }
    }
  };


  // let counter = 0

  Events.on(engine, 'afterUpdate', function() {
    if (!mouse.position.x) {
      return
    }

    // smoothly move the attractor body towards the mouse
    Body.translate(cursorAttractiveBody, {
      x: (mouse.position.x - cursorAttractiveBody.position.x) * 0.25,
      y: (mouse.position.y - cursorAttractiveBody.position.y) * 0.25
    })

    // counter += 1


    // // every 1.5 sec
    // if (counter >= 60 * 3) {

    //   // // flip the timescale
    //   // if (timeScaleTarget < 1) {
    //   //     timeScaleTarget = 1;
    //   // } else {
    //   //     timeScaleTarget = 0.05;
    //   // }

    //   // create some random forces
    //   explosion(engine);

    //   // reset counter
    //   counter = 0;
    // }

  })

  // return a context for MatterDemo to control
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
    },

    explosion: explosion,
  }

}



let config = {
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
  canvas: document.querySelector('canvas'),
}

let attractorApplication = setupAttractors(config)

Mousetrap.bind('space', () => {
	console.log('space')
	attractorApplication.explosion(attractorApplication.engine)
})