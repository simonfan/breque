require('pathseg')
const $ = require('jquery')

const Matter = require('matter-js')
const Mousetrap = require('mousetrap')

const MatterAttractors = require('matter-attractors')

const RAW_RETANGULOS_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333.07 135.06">
<title>Ativo 8</title>
<path d="M113.5,106.19h19.64v28.87H113.5Z" fill="#c1b0a1"/>
<path d="M113.5,77.33h19.64v28.87H113.5Z" fill="#6e1d1d"/>
<path d="M30.34,58.08H50V96.57H30.34Z" fill="#28285b"/>
<path d="M30.34,96.57H50v38.49H30.34Zm0-38.49H50V19.6H30.34Z" fill="#cf8f7c"/>
<path d="M58.49,116.82H78.13v18.24H58.49Z" fill="#033121"/>
<path d="M58.49,58.08H78.13v58.74H58.49Z" fill="#dd9945"/>
<path d="M85.32,72.82H105v62.24H85.32Z" fill="#28285b"/>
<path d="M85.32,100.34H105v7.2H85.32Z" fill="#dd9945"/>
<path d="M0,0H19.64V58.08H0Z" fill="#033121"/>
<path d="M0,58.08H19.64v77H0Z" fill="#88493d"/>
<path d="M143.12,96.57h19.64v38.49H143.12Z" fill="#88493d"/>
<path d="M169.66,116.82h19.64v18.24H169.66Z" fill="#6e1d1d"/>
<path d="M196.66,116.82h19.64v18.24H196.66Z" fill="#28285b"/>
<path d="M226.16,116.82h19.64v18.24H226.16Z" fill="#dd9945"/>
<path d="M255.66,116.82h19.64v18.24H255.66Z" fill="#cf8f7c"/>
<path d="M285.43,116.82h19.64v18.24H285.43Z" fill="#033121"/>
<path d="M313.43,116.82h19.64v18.24H313.43Z" fill="#c1b0a1"/>
</svg>`

const RAW_LOSANGOS_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 856.71 415.03">
<title>Ativo 7</title>
<path d="M46.58,37.28H0L21.6,1.5H68.19Z" fill="#b51917"/>
<path d="M111.8,40.4H71.29L92.9,1.5H133.4Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M177,40.4H136.51l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,139.28H0L21.6,103.5H68.19Z" fill="#577935"/>
<path d="M111.8,142.4H71.29l21.6-38.9H133.4Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M177,142.4H136.51l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,88.28H0L21.6,52.5H68.19Z" fill="#b51917"/>
<path d="M111.8,91.4H71.29L92.9,52.5H133.4Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M177,91.4H136.51l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,190.28H0L21.6,154.5H68.19Z" fill="#577935"/>
<path d="M111.8,193.4H71.29l21.6-38.9H133.4Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M177,193.4H136.51l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,257.41H0l21.6-35.78H68.19Z" fill="#b51917"/>
<path d="M111.8,260.53H71.29l21.6-38.9H133.4Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M177,260.53H136.51l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,359.41H0l21.6-35.78H68.19Z" fill="#577935"/>
<path d="M111.8,362.53H71.29l21.6-38.9H133.4Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M177,362.53H136.51l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,308.41H0l21.6-35.78H68.19Z" fill="#b51917"/>
<path d="M111.8,311.53H71.29l21.6-38.9H133.4Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M177,311.53H136.51l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M46.58,410.41H0l21.6-35.78H68.19Z" fill="#577935"/>
<path d="M111.8,413.53H71.29l21.6-38.9H133.4Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M177,413.53H136.51l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,37.28H220.49L242.09,1.5h46.58Z" fill="#b51917"/>
<path d="M332.29,40.4H291.78l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M397.5,40.4H357L378.6,1.5h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,139.28H220.49l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M332.29,142.4H291.78l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M397.5,142.4H357l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,88.28H220.49l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M332.29,91.4H291.78l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M397.5,91.4H357l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,190.28H220.49l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M332.29,193.4H291.78l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M397.5,193.4H357l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,257.41H220.49l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M332.29,260.53H291.78l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M397.5,260.53H357l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,359.41H220.49l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M332.29,362.53H291.78l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M397.5,362.53H357l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,308.41H220.49l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M332.29,311.53H291.78l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M397.5,311.53H357l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M267.07,410.41H220.49l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M332.29,413.53H291.78l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M397.5,413.53H357l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,37.28H435L456.58,1.5h46.58Z" fill="#b51917"/>
<path d="M546.78,40.4H506.27l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M612,40.4H571.49l21.6-38.9H633.6Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,139.28H435l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M546.78,142.4H506.27l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M612,142.4H571.49l21.6-38.9H633.6Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,88.28H435l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M546.78,91.4H506.27l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M612,91.4H571.49l21.6-38.9H633.6Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,190.28H435l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M546.78,193.4H506.27l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M612,193.4H571.49l21.6-38.9H633.6Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,257.41H435l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M546.78,260.53H506.27l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M612,260.53H571.49l21.6-38.9H633.6Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,359.41H435l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M546.78,362.53H506.27l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M612,362.53H571.49l21.6-38.9H633.6Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,308.41H435l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M546.78,311.53H506.27l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M612,311.53H571.49l21.6-38.9H633.6Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M481.56,410.41H435l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M546.78,413.53H506.27l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M612,413.53H571.49l21.6-38.9H633.6Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,37.28H655.54L677.15,1.5h46.58Z" fill="#b51917"/>
<path d="M767.34,40.4H726.84l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M832.56,40.4H792.05l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,139.28H655.54l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M767.34,142.4H726.84l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M832.56,142.4H792.05l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,88.28H655.54l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M767.34,91.4H726.84l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M832.56,91.4H792.05l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,190.28H655.54l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M767.34,193.4H726.84l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M832.56,193.4H792.05l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,257.41H655.54l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M767.34,260.53H726.84l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M832.56,260.53H792.05l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,359.41H655.54l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M767.34,362.53H726.84l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M832.56,362.53H792.05l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,308.41H655.54l21.6-35.78h46.58Z" fill="#b51917"/>
<path d="M767.34,311.53H726.84l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10"/>
<path d="M832.56,311.53H792.05l21.6-38.9h40.51Z" fill="none" stroke="#b51917" stroke-miterlimit="10" stroke-width="3"/>
<path d="M702.13,410.41H655.54l21.6-35.78h46.58Z" fill="#577935"/>
<path d="M767.34,413.53H726.84l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10"/>
<path d="M832.56,413.53H792.05l21.6-38.9h40.51Z" fill="none" stroke="#577935" stroke-miterlimit="10" stroke-width="3"/>
</svg>
`

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
      Bodies = Matter.Bodies,
      Svg = Matter.Svg,
      Vertices = Matter.Vertices

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
      x: (bodyA.position.x - bodyB.position.x) * 1e-6,
      y: (bodyA.position.y - bodyB.position.y) * 1e-6,
    }

    // console.log(attractionForce)

    return attractionForce
  }

  // create a body with an attractor
  // let cursorAttractiveBody = Bodies.rectangle(
  //   options.canvasWidth / 1.5,
  //   options.canvasHeight / 2,
  //   20,
  //   20,
  //   {
  //     isStatic: true,

  //     render: {
  //       fillStyle: '#28285b',
  //     },

  //     // example of an attractor function that 
  //     // returns a force vector that applies to bodyB
  //     plugin: {
  //       attractors: [
  //         attractor
  //       ]
  //     }
  //   }
  // )

  let cursorAttractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    1, 
    {
      isStatic: true,

      render: {
        fillStyle: '#28285b',
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
  // for (let i = 0; i < 300; i += 1) {
  //   let body = Bodies.polygon(
  //     Common.random(0, render.options.width), 
  //     Common.random(0, render.options.height),
  //     Common.random(1, 1),
  //     Common.random() > 0.9 ? Common.random(10,10) : Common.random(10, 10),

  //     {
  //       // angle: angle,
  //       // restitution: 1,
  //       render: {
  //         fillStyle: '#000000',
  //         // strokeStyle: '#0adda6',
  //         // lineWidth: 2,
  //       },
  //       plugin: {
  //         attractors: [
  //           // MatterAttractors.Attractors.gravity,
  //           // function(bodyA, bodyB) {
  //           //   return {
  //           //     x: (bodyA.position.x - bodyB.position.x) * 1e-6,
  //           //     y: (bodyA.position.y - bodyB.position.y) * 1e-6,
  //           //   }
  //           // }
  //         ]
  //       }
  //     }
  //   )

  //   World.add(world, body)
  // }
  Array.from($(RAW_LOSANGOS_SVG).find('path')).forEach((path, i) => {
    let vertexSet = Svg.pathToVertices(path, 30)
    vertexSet = Vertices.scale(vertexSet, 0.4, 0.4)

    let fill = $(path).attr('fill')
    let stroke = $(path).attr('stroke')
    let strokeWidth = $(path).attr('stroke-width') || 1

    var renderOptions = {}

    if (fill) {
      renderOptions.fillStyle = fill === 'none' ?
        '#FFFFFF' : fill
    }

    if (stroke) {
      renderOptions.strokeStyle = stroke
      renderOptions.lineWidth = strokeWidth
    }



    World.add(
      world,
      Bodies.fromVertices(
        Common.random(0, render.options.width),
        Common.random(0, render.options.height),
        vertexSet,
        {
          render: renderOptions
        }
      )
    )

    World.add(
      world,
      Bodies.fromVertices(
        Common.random(0, render.options.width),
        Common.random(0, render.options.height),
        vertexSet,
        {
          render: renderOptions
        }
      )
    )

    World.add(
      world,
      Bodies.fromVertices(
        Common.random(0, render.options.width),
        Common.random(0, render.options.height),
        vertexSet,
        {
          render: renderOptions
        }
      )
    )

    // World.add(
    //   world,
    //   Bodies.fromVertices(
    //     Common.random(0, render.options.width),
    //     Common.random(0, render.options.height),
    //     vertexSet,
    //     {
    //       render: renderOptions
    //     }
    //   )
    // )

    // World.add(
    //   world,
    //   Bodies.fromVertices(
    //     Common.random(0, render.options.width),
    //     Common.random(0, render.options.height),
    //     vertexSet,
    //     {
    //       render: renderOptions
    //     }
    //   )
    // )

    // World.add(
    //   world,
    //   Bodies.fromVertices(
    //     Common.random(0, render.options.width),
    //     Common.random(0, render.options.height),
    //     vertexSet,
    //     {
    //       render: renderOptions
    //     }
    //   )
    // )

    // World.add(
    //   world,
    //   Bodies.fromVertices(
    //     Common.random(0, render.options.width),
    //     Common.random(0, render.options.height),
    //     vertexSet,
    //     {
    //       render: renderOptions
    //     }
    //   )
    // )

    // World.add(
    //   world,
    //   Bodies.fromVertices(
    //     Common.random(0, render.options.width),
    //     Common.random(0, render.options.height),
    //     vertexSet,
    //     {
    //       render: renderOptions
    //     }
    //   )
    // )

    // World.add(
    //   world,
    //   Bodies.fromVertices(
    //     Common.random(0, render.options.width),
    //     Common.random(0, render.options.height),
    //     vertexSet,
    //     {
    //       render: renderOptions
    //     }
    //   )
    // )

    // console.log('qweq')
  })

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
          
          x: forceMagnitude * ((body.position.x - cursorAttractiveBody.position.x)/150),
          y: forceMagnitude * ((body.position.y - cursorAttractiveBody.position.y)/150),
          // x: forceMagnitude * (1 / (body.position.x - cursorAttractiveBody.position.x)),
          // y: forceMagnitude * (1 / (body.position.y - cursorAttractiveBody.position.y)),
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