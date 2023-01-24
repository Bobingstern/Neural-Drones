
async function graph(brain) {
  const element = document.getElementById("vis2")
  const { nodes: neurons, connections } = brain.toJSON()

  // Flattens neuron layers from `Network.toJSON` and converts it to 'vis-network'
  const nodes = new vis.DataSet(neurons.map((neuron, i) => ({
    id: neuron.index,
    title: i,
    label: i,
    color: (neuron.type === "hidden") ? "orange" : (neuron.type === "output") ? "blue" : "yellow"
  })
  ))

  // Flattens connections from `Network.toJSON` and converts it into `vis-network`
  const edges = new vis.DataSet(connections.map(connection => ({
    from: connection.from,
    to: connection.to,
    title: connection.weight,
    color: (connection.weight == 1) ? "white" : (connection.weight > 0) ? "green" : "red"
  })
  ))

  // Vis.js Network Options
  // Will have a "left-to-right" graph with "smooth" lines representing
  // connections by default
  const options = {
    autoResize: true,
    height: '250px',
    width: '100%',
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: 'arrow' }
      },
      smooth: {
        type: "cubicBezier",
        forceDirection: "horizontal"
      }
    },
    layout: {
      hierarchical: {
        direction: "LR",
        sortMethod: "directed"
      }
    },
    physics: true
  }

  let network = new vis.Network(element, { nodes, edges }, options)
}

function randArr(l) {
  let arr = []
  for (let i = 0; i < l; i++) {
    arr.push(Math.random() * 2 - 1)
  }
  return arr
}


let net_c =
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":-0.7468115052839448,"type":"output","squash":"TANH","mask":1,"index":7},{"bias":-2.64113841569143,"type":"output","squash":"BIPOLAR_SIGMOID","mask":1,"index":8},{"bias":-0.29870429238668045,"type":"output","squash":"SELU","mask":1,"index":9},{"bias":-2.2510340490290437,"type":"output","squash":"SOFTSIGN","mask":1,"index":10}],"connections":[{"weight":13.600794272512886,"from":6,"to":10,"gater":null},{"weight":1.1165542391806276,"from":5,"to":10,"gater":null},{"weight":12.965441570144943,"from":6,"to":9,"gater":null},{"weight":-0.05034632092118349,"from":4,"to":10,"gater":null},{"weight":1.1349924429348617,"from":5,"to":9,"gater":null},{"weight":-8.397604651336646,"from":6,"to":8,"gater":null},{"weight":1.799522403771065,"from":3,"to":10,"gater":null},{"weight":0.1541874845116184,"from":4,"to":9,"gater":null},{"weight":1.6452380564892195,"from":5,"to":8,"gater":null},{"weight":-3.465610212525536,"from":6,"to":7,"gater":null},{"weight":5.487121986864974,"from":2,"to":10,"gater":null},{"weight":-0.06838035159758418,"from":3,"to":9,"gater":null},{"weight":0.49952513215181593,"from":4,"to":8,"gater":null},{"weight":1.6452380564892195,"from":5,"to":7,"gater":null},{"weight":-2.4930737976786106,"from":1,"to":10,"gater":null},{"weight":2.532252685803626,"from":2,"to":9,"gater":null},{"weight":1.9907647602371665,"from":3,"to":8,"gater":null},{"weight":-0.12723443158529946,"from":4,"to":7,"gater":null},{"weight":3.8643179611571044,"from":0,"to":10,"gater":null},{"weight":-5.9138987490330255,"from":1,"to":9,"gater":null},{"weight":3.5076196450550468,"from":2,"to":8,"gater":null},{"weight":0.03731194064632626,"from":3,"to":7,"gater":null},{"weight":-0.024382718963686226,"from":0,"to":9,"gater":null},{"weight":-9.583169172781675,"from":1,"to":8,"gater":null},{"weight":1.3124692728685954,"from":2,"to":7,"gater":null},{"weight":-1.9787993929654006,"from":0,"to":8,"gater":null},{"weight":-10.487203595658356,"from":1,"to":7,"gater":null},{"weight":1.7084487236177928,"from":0,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
let net_b =
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":0.13576151216208532,"type":"hidden","squash":"GAUSSIAN","mask":1,"index":7},{"bias":-0.07678080411203987,"type":"hidden","squash":"ABSOLUTE","mask":1,"index":8},{"bias":0.8828910570980832,"type":"hidden","squash":"TANH","mask":1,"index":9},{"bias":-0.03430864220411067,"type":"hidden","squash":"TANH","mask":1,"index":10},{"bias":-0.6531961594680017,"type":"hidden","squash":"GAUSSIAN","mask":1,"index":11},{"bias":-0.019426748420317747,"type":"hidden","squash":"STEP","mask":1,"index":12},{"bias":-0.019426748420317747,"type":"hidden","squash":"STEP","mask":1,"index":13},{"bias":-0.03430864220411067,"type":"hidden","squash":"IDENTITY","mask":1,"index":14},{"bias":-1.6937218677402295,"type":"hidden","squash":"ABSOLUTE","mask":1,"index":15},{"bias":0.06692228176667095,"type":"hidden","squash":"IDENTITY","mask":1,"index":16},{"bias":1.1529623146400996,"type":"output","squash":"INVERSE","mask":1,"index":17},{"bias":0.09901537821636208,"type":"output","squash":"SINUSOID","mask":1,"index":18},{"bias":-1.270748586848002,"type":"output","squash":"BENT_IDENTITY","mask":1,"index":19},{"bias":-0.060341411353064346,"type":"output","squash":"INVERSE","mask":1,"index":20}],"connections":[{"weight":-0.2957727483415705,"from":14,"to":20,"gater":null},{"weight":0.07554538766821148,"from":15,"to":18,"gater":null},{"weight":-0.08851158781985667,"from":16,"to":17,"gater":null},{"weight":0.07089117144725177,"from":15,"to":17,"gater":null},{"weight":-0.05368547520504983,"from":11,"to":18,"gater":null},{"weight":-0.08906987344242752,"from":12,"to":17,"gater":null},{"weight":0.06745372659003737,"from":11,"to":17,"gater":null},{"weight":0.00009440267868621177,"from":13,"to":14,"gater":null},{"weight":2.3031525955274312,"from":6,"to":20,"gater":null},{"weight":0.3807463498427365,"from":7,"to":19,"gater":null},{"weight":-0.029170958411276038,"from":5,"to":20,"gater":null},{"weight":0.054342318622409236,"from":8,"to":17,"gater":null},{"weight":0.09658000426766425,"from":12,"to":13,"gater":null},{"weight":0.29107075083274636,"from":4,"to":20,"gater":null},{"weight":0.16383794104446375,"from":5,"to":19,"gater":null},{"weight":0.3807463498427365,"from":7,"to":17,"gater":null},{"weight":0.8702799053738435,"from":3,"to":20,"gater":null},{"weight":2.2428321031185945,"from":2,"to":20,"gater":null},{"weight":0.026914887597238257,"from":3,"to":19,"gater":null},{"weight":-0.6859913901724549,"from":5,"to":17,"gater":null},{"weight":0.060906952772282225,"from":6,"to":16,"gater":null},{"weight":-0.005413110029880916,"from":8,"to":14,"gater":null},{"weight":2.2428321031185945,"from":2,"to":19,"gater":null},{"weight":0.08692531610040341,"from":9,"to":12,"gater":null},{"weight":0.08624729368550055,"from":10,"to":11,"gater":null},{"weight":-1.4477806899796508,"from":1,"to":19,"gater":null},{"weight":0.08979691664916054,"from":8,"to":12,"gater":null},{"weight":-0.06273275013460688,"from":0,"to":19,"gater":null},{"weight":2.7685317098171356,"from":2,"to":17,"gater":null},{"weight":-0.040578856417675495,"from":6,"to":13,"gater":null},{"weight":-0.02404953680181135,"from":9,"to":10,"gater":null},{"weight":5.109412405508154,"from":1,"to":17,"gater":null},{"weight":0.062183880851598206,"from":7,"to":11,"gater":null},{"weight":-0.09793832048781406,"from":5,"to":12,"gater":null},{"weight":-0.009022683027006512,"from":1,"to":15,"gater":null},{"weight":-0.02897209266527105,"from":4,"to":12,"gater":null},{"weight":-0.009022683027006512,"from":1,"to":14,"gater":null},{"weight":-0.019618994527610262,"from":5,"to":10,"gater":null},{"weight":4.516763180792587,"from":0,"to":14,"gater":null},{"weight":0.3120010476871343,"from":3,"to":11,"gater":null},{"weight":1.0413111541930484,"from":6,"to":8,"gater":null},{"weight":5.279803280282411,"from":0,"to":11,"gater":null},{"weight":-0.06277467585928172,"from":3,"to":8,"gater":null},{"weight":-0.04154490885826903,"from":4,"to":7,"gater":null},{"weight":0.039328637098405006,"from":3,"to":7,"gater":null},{"weight":-0.3295970894613913,"from":0,"to":9,"gater":null},{"weight":0.06121264702385454,"from":1,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
let net_a = 
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":-0.012869799052508929,"type":"hidden","squash":"BIPOLAR","mask":1,"index":7},{"bias":-0.41619650503697336,"type":"hidden","squash":"BIPOLAR","mask":1,"index":8},{"bias":-0.41619650503697336,"type":"hidden","squash":"BIPOLAR","mask":1,"index":9},{"bias":-0.5385877333357346,"type":"output","squash":"BIPOLAR_SIGMOID","mask":1,"index":10},{"bias":0.03387917122015338,"type":"output","squash":"SINUSOID","mask":1,"index":11},{"bias":-0.33730752399914543,"type":"output","squash":"SELU","mask":1,"index":12},{"bias":0.10551928192634907,"type":"output","squash":"SOFTSIGN","mask":1,"index":13}],"connections":[{"weight":0.0996392155787508,"from":9,"to":13,"gater":null},{"weight":0.040491668614730886,"from":8,"to":13,"gater":null},{"weight":0.0996392155787508,"from":9,"to":12,"gater":null},{"weight":0.0996392155787508,"from":7,"to":13,"gater":null},{"weight":0.0996392155787508,"from":8,"to":12,"gater":null},{"weight":-0.0320587787760251,"from":9,"to":11,"gater":null},{"weight":22.768061290234833,"from":6,"to":13,"gater":null},{"weight":0.0996392155787508,"from":7,"to":12,"gater":null},{"weight":0.09820686609670015,"from":8,"to":11,"gater":null},{"weight":0.09820686609670015,"from":9,"to":10,"gater":null},{"weight":0.21118824777745213,"from":5,"to":13,"gater":null},{"weight":21.847917369605753,"from":6,"to":12,"gater":null},{"weight":-0.04629813617341108,"from":7,"to":11,"gater":null},{"weight":0.09820686609670015,"from":8,"to":10,"gater":null},{"weight":-0.05219380687690909,"from":4,"to":13,"gater":null},{"weight":1.277673251768206,"from":5,"to":12,"gater":null},{"weight":-12.845965029701034,"from":6,"to":11,"gater":null},{"weight":0.0028640788364989456,"from":7,"to":10,"gater":null},{"weight":-0.42523663144824897,"from":8,"to":9,"gater":null},{"weight":-0.05592435285182456,"from":3,"to":13,"gater":null},{"weight":-0.010494718209101223,"from":4,"to":12,"gater":null},{"weight":0.8358027363799682,"from":5,"to":11,"gater":null},{"weight":-18.134988468252804,"from":6,"to":10,"gater":null},{"weight":0.025912889153292762,"from":7,"to":9,"gater":null},{"weight":2.8272050486776803,"from":2,"to":13,"gater":null},{"weight":0.6331330375699767,"from":3,"to":12,"gater":null},{"weight":0.05535960544789162,"from":4,"to":11,"gater":null},{"weight":2.686514368288001,"from":5,"to":10,"gater":null},{"weight":0.025912889153292762,"from":7,"to":8,"gater":null},{"weight":1.5850083765296632,"from":1,"to":13,"gater":null},{"weight":3.390381800442,"from":2,"to":12,"gater":null},{"weight":-0.0025448616502655452,"from":3,"to":11,"gater":null},{"weight":-0.5994400952955651,"from":4,"to":10,"gater":null},{"weight":0.08371086734264499,"from":5,"to":9,"gater":null},{"weight":-15.466003595814968,"from":6,"to":8,"gater":null},{"weight":0.5660430169165339,"from":0,"to":13,"gater":null},{"weight":-2.6939546591410126,"from":1,"to":12,"gater":null},{"weight":2.6208510771297004,"from":2,"to":11,"gater":null},{"weight":-0.05592435285182456,"from":3,"to":10,"gater":null},{"weight":0.13480140750450867,"from":4,"to":9,"gater":null},{"weight":-0.05958470394037745,"from":5,"to":8,"gater":null},{"weight":2.0323586040630843,"from":6,"to":7,"gater":null},{"weight":-0.5120765822716112,"from":0,"to":12,"gater":null},{"weight":-2.21620188553102,"from":1,"to":11,"gater":null},{"weight":3.3941843144623456,"from":2,"to":10,"gater":null},{"weight":-0.6342260722822375,"from":3,"to":9,"gater":null},{"weight":0.13480140750450867,"from":4,"to":8,"gater":null},{"weight":-0.4277108337369636,"from":0,"to":11,"gater":null},{"weight":-8.813053386124794,"from":1,"to":10,"gater":null},{"weight":0.25578366595639584,"from":2,"to":9,"gater":null},{"weight":0.026550805824357926,"from":3,"to":8,"gater":null},{"weight":-0.033305443617437286,"from":4,"to":7,"gater":null},{"weight":2.680025155304666,"from":0,"to":10,"gater":null},{"weight":-0.3046064670372608,"from":1,"to":9,"gater":null},{"weight":0.25578366595639584,"from":2,"to":8,"gater":null},{"weight":2.680025155304666,"from":0,"to":9,"gater":null},{"weight":-1.6977612588967133,"from":1,"to":8,"gater":null},{"weight":-0.007970667679553761,"from":0,"to":8,"gater":null},{"weight":0.21329631573943175,"from":1,"to":7,"gater":null},{"weight":-0.007970667679553761,"from":0,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
let network = net_a

let targets = []
let bestNet = neataptic.Network.fromJSON(JSON.parse(network))
let drone
let selection;
let smokeOn;
let ticksper

function setup() {
  createCanvas(window.innerWidth-100, window.innerHeight-100)
  smoke.resize(50, 50)
  frameRate(144)
  targets = []
  for (let i = 0; i < 200; i++) {
    let t = createVector(width / 2, height / 2)
    while (dist(width / 2, height / 2, t.x, t.y) < 200)
      t = createVector(random(100, width - 100), random(100, height - 100))
    targets.push(t)
  }
  targets[0] = createVector(width / 2, height / 2)
  drone = new Drone(width / 2, height / 2, bestNet, targets)
  //Graph
  let g = document.createElement('div');
  g.setAttribute("id", "vis2");
  document.body.appendChild(g)
  graph(bestNet)
  selection = createSelect()
  smokeOn = createSelect()
  ticksper = createSelect()
  smokeOn.position(150, height+10)
  ticksper.position(290, height+10)
  ticksper.option("1 tick per frame")
  ticksper.option("2 ticks per frame")
  ticksper.option("5 ticks per frame")
  ticksper.option("10 ticks per frame")
  ticksper.option("50 ticks per frame")
  
  smokeOn.option("Smoke On")
  smokeOn.option("Smoke Off")
  smokeOn.changed(function(){
    
  })
  selection.position(10, height+10)
  selection.option("Network 1")
  selection.option("Network 2")
  selection.option("Network 3")

  selection.changed(function(){
    if (selection.value() == "Network 1")
      network = net_a
    if (selection.value() == "Network 2")
      network = net_b
    if (selection.value() == "Network 3")
      network = net_c
    bestNet = neataptic.Network.fromJSON(JSON.parse(network))
    graph(bestNet)
    drone = new Drone(width / 2, height / 2, bestNet, targets)
  })
}
let ticker = 1
let dt = 0.008
let angle = 0

function softmax(arr) {
  return arr.map(function(value, index) {
    return Math.exp(value) / arr.map(function(y /*value*/) { return Math.exp(y) }).reduce(function(a, b) { return a + b })
  })
}

function draw() {
  background(0)
  if (ticksper.value() == "1 tick per frame")
    ticker = 1
  if (ticksper.value() == "2 ticks per frame")
    ticker = 2
  if (ticksper.value() == "5 ticks per frame")
    ticker = 5
  if (ticksper.value() == "10 ticks per frame")
    ticker = 10
  if (ticksper.value() == "20 ticks per frame")
    ticker = 20
  
  if (smokeOn.value() == "Smoke On")
      drone.smoke_mode = 0
  else
    drone.smoke_mode = 1
  if (Math.abs(drone.angle) > Math.PI)
    drone = new Drone(width / 2, height / 2, bestNet, targets)
  for (let i = 0; i < ticker; i++) {
    //drone.targets[0] = createVector(Math.cos(angle)*300+width/2, Math.sin(angle)*300+height/2)
    drone.targets[0] = createVector(mouseX, mouseY)
    drone.update(dt)
    angle += 0.005
  }


  // drone2.update2(dt)
  // drone2.show()
  let inputs = drone.getInputs(dt)
  let inputs_weightage = [1, 1, 1, 1, 3, 3, 0.5]
  let texts = ["To Target X",
    "To Target Y",
    "sin of angle",
    "cos of angle",
    "velocity x",
    "velocity y",
    "angular velocity"]
  for (let i = 0; i < 7; i++) {
    push()
    let val = map(inputs[i], -
      inputs_weightage[i],
      inputs_weightage[i],
      0, 255)
    fill(255 - val,
      val,
      0)
    circle(200, height - 7 * 40 + i * 40, 20)
    fill(255)
    text(texts[i] + ":" + Math.round(inputs[i] * 100) / 100, 50, height - 7 * 40 + i * 40)
    pop()
  }
  let output_weightage = [1, Math.PI/2, 1, Math.PI/2]
  let texts_outs = [
    "Left Thruster Power",
    "Left Thruster Angle",
    "Right Thruster Power",
    "Right Thruster Angle",]
    for (let i = 0; i < 4; i++) {
    push()
    let val = map(drone.outs[i], -
      output_weightage[i],
      output_weightage[i],
      0, 255)
    fill(255 - val,
      val,
      0)
    circle(300, height - 5.5 * 40 + i * 40, 20)
    fill(255)
    text(texts_outs[i] + ":" + Math.round(drone.outs[i] * 100) / 100, 350, height - 5.5 * 40 + i * 40)
    pop()
  }
  drone.show()
}