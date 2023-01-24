const neataptic = require("neataptic");
const fs = require('fs');

let width = 3600
let height = 1880
function random(a, b) {
  return Math.random() * (b - a) + a
}
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  add(a) {
    this.x += a.x
    this.y += a.y
  }
  mult(a) {
    if (typeof a == "number") {
      this.x *= a
      this.y *= a
      return
    }
    this.x *= a.x
    this.y *= a.y
  }
  sub(a) {
    this.x -= a.x
    this.y -= a.y
  }
}

function add(a, b) {
  if (typeof b == "number")
    return new Vector(a.x + b, a.y + b)
  if (typeof a == "number")
    return new Vector(a + b.x, a + b.y)
  return new Vector(a.x + b.x, a.y + b.y)
}
function sub(a, b) {
  if (typeof b == "number")
    return new Vector(a.x - b, a.y - b)
  if (typeof a == "number")
    return new Vector(a - b.x, a - b.y)
  return new Vector(a.x - b.x, a.y - b.y)
}
function mult(a, b) {
  if (typeof b == "number")
    return new Vector(a.x * b, a.y * b)
  if (typeof a == "number")
    return new Vector(a * b.x, a * b.y)
  return new Vector(a.x * b.x, a.y * b.y)
}

function dist(x, y, x2, y2) {
  return Math.sqrt((x2 - x) ** 2 + (y2 - y) ** 2)
}


function getAngle(v) {
  return Math.acos(v.x / v.mag())
}
function rotateToReal(pos, off, angle) {
  const x = pos.x + off.x;
  const y = pos.y + off.y;
  return new Vector(
    pos.x + (x - pos.x) * Math.cos(angle) - (y - pos.y) * Math.sin(angle),
    pos.y + (x - pos.x) * Math.sin(angle) + (y - pos.y) * Math.cos(angle)
  )
}

class Thruster {
  constructor() {
    this.max_power = 3500
    this.power_ratio = 0
    this.angle = 0
    this.target_angle = 0
    this.angle_var_speed = 2
    this.max_angle = 0.5 * Math.PI
    this.angle_ratio = 0
  }
  setAngle(ratio) {
    this.target_angle = this.max_angle * Math.max(-1.0, Math.min(1.0, ratio));
  }
  setPower(ratio) {
    this.power_ratio = Math.max(0.0, Math.min(1, ratio));
  }
  getPower() {
    return this.power_ratio * this.max_power;
  }
  update(dt) {
    //Calculate angle and angle_ratio;
    let speed = this.angle_var_speed;
    this.angle += speed * (this.target_angle - this.angle) * dt;
    this.angle_ratio = this.angle / this.max_angle;
  }
}

class Drone {
  constructor(x, y, nn, targets) {
    this.thruster_offset = 35
    this.radius = 35
    this.angle = 0
    this.angular_velocity = 0
    this.pos = new Vector(x, y)
    this.vel = new Vector(0, 0)
    this.left = new Thruster()
    this.right = new Thruster()
    this.score = 0
    this.targets = targets
    this.curr_target = 0
    this.inside = 0
    this.network = nn
    this.dead = false
    this.points = dist(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.pos.x, this.pos.y)
    this.time_out = 0
    this.outs = []
    this.not_move_time = 0
    this.time_alive = 0
    this.angle_avg = 0
  }
  cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  getThrust() {
    let angle_left = this.angle - this.left.angle - Math.PI / 2;
    let thrust_left = mult(new Vector(Math.cos(angle_left), Math.sin(angle_left)), this.left.getPower())
    let angle_right = this.angle + this.right.angle - Math.PI / 2;
    let thrust_right = mult(new Vector(Math.cos(angle_right), Math.sin(angle_right)), this.right.getPower())
    return add(thrust_left, thrust_right);
  }
  getTorque() {
    let inertia_coef = 0.8;
    let angle_left = - this.left.angle - Math.PI / 2;
    let left_torque = this.left.getPower() / this.thruster_offset * this.cross(new Vector(Math.cos(angle_left), Math.sin(angle_left)), new Vector(1.0, 0.0));

    let angle_right = this.right.angle - Math.PI / 2;
    let right_torque = this.right.getPower() / this.thruster_offset * this.cross(new Vector(Math.cos(angle_right), Math.sin(angle_right)), new Vector(-1.0, 0.0));
    
    return (left_torque + right_torque) * inertia_coef;
  }
  getNormalizedAngle() {
    return getAngle(new Vector(cos(this.angle), sin(this.angle))) / Math.PI;
  }
  update(dt) {
    this.brain(dt)

    this.left.update(dt);
    this.right.update(dt);
    let gravity = new Vector(0.0, 1000.0);
    // Integration
    this.vel.add(mult(add(gravity, this.getThrust()), dt));
    this.pos.add(mult(this.vel, dt));
    this.angular_velocity += this.getTorque() * dt;
    this.angle += this.angular_velocity * dt;

    let d = dist(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.pos.x, this.pos.y)
    if (d < 30) {
      this.inside+=dt
    }
    else {
      this.time_out+=dt
    }

    if (this.inside > 125 * dt) {
      this.inside = 0
      this.curr_target++
      this.score += Math.cos(this.angle) ** 4 * this.points / (1+this.time_out)
      //console.log("Points:"+this.points+","+this.angle+","+this.time_out)
      this.points = dist(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.pos.x, this.pos.y)
      this.time_out = 0
    }
    //Encourage those that are straight and punish the others
    this.score += 1/(1 + d)
    
    this.angle_avg += this.angle
    this.time_alive ++
    if (Math.abs(this.angle) > Math.PI || this.pos.x > width
      || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height) {
      this.dead = true
      if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height) {
      }
      else {
      }
      this.score--
    }
  }
  process(outputs) {
    this.left.setPower(0.5 * (1 + outputs[0]));
    this.left.setAngle(outputs[1]);
    this.right.setPower(0.5 * (1 + outputs[2]));
    this.right.setAngle(outputs[3]);
  }
  getInputs(dt) {
    let to_target = (sub(this.targets[this.curr_target], this.pos))
    to_target.mult(1 / Math.max(to_target.mag(), 700))
    let inputs = [
      to_target.x,
      to_target.y,
      // this.pos.x / width,
      // this.pos.y / height,
      Math.sin(this.angle),
      Math.cos(this.angle),
      this.vel.x * dt,
      this.vel.y * dt,
      this.angular_velocity * dt] //8
    return inputs
  }
  brain(dt) {
    this.outs = this.network.activate(this.getInputs(dt))
    // this.outs[0] = Math.atanh(this.outs[0])
    // this.outs[0] = Math.tanh(4 * this.outs[0])
    // this.outs[2] = Math.atanh(this.outs[2])
    // this.outs[2] = Math.tanh(4 * this.outs[2])
    this.process(this.outs)

  }
}


let neat = new neataptic.Neat(
    7,
    4,
    null,
    {
      mutation: [
        neataptic.methods.mutation.ADD_NODE,
        neataptic.methods.mutation.SUB_NODE,
        neataptic.methods.mutation.ADD_CONN,
        neataptic.methods.mutation.SUB_CONN,
        neataptic.methods.mutation.MOD_WEIGHT,
        neataptic.methods.mutation.MOD_BIAS,
        neataptic.methods.mutation.MOD_ACTIVATION,
      ],
      popsize: 800,
      mutationRate: 0.3,
      mutationAmount: 4,
      elitism: 40,
      // network: new neataptic.architect.Random(
      //   7,
      //   20,
      //   4
      // ),
    }
);

function randArr(l) {
  let arr = []
  for (let i = 0; i < l; i++) {
    arr.push(Math.random() * 2 - 1)
  }
  return arr
}



let targets = []
let population = []
let best = undefined
let killer = 1
let bestEver = -Infinity
function populate() {
  targets = []
  for (let i = 0; i < 200; i++) {
    let t = new Vector(width / 2, height / 2)
    while (dist(width / 2, height / 2, t.x, t.y) < 200)
      t = new Vector(random(100, width - 100), random(100, height - 100))
    targets.push(t)
  }
  population = []
  for (let i = 0; i < neat.population.length; i++) {
    population.push(new Drone(width / 2, height / 2, neat.population[i], targets))
  }
}
function pickRandomProperty(obj) {
  var result;
  var count = 0;
  for (var prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}
function setup() {
  populate()
}
let ticker = 0
let mode = 0
let gen_done = false
let bestNetwork
let maxNet
async function draw() {
  while (!gen_done) {
    ticker++
    let allDead = true
    let findAlive = 0
    for (let i = 0; i < population.length; i++) {
      if (!population[i].dead) {
        findAlive = i
        allDead = false
        population[i].update(0.008)
      }
    }
    if (allDead || ticker > 10000) {

      ticker = 0
      let maxScore = -Infinity
      let highestIndex = 0
      for (let i = 0; i < neat.population.length; i++) {
        neat.population[i].score = population[i].score
        if (population[i].score > maxScore) {
          maxScore = population[i].score
          maxNet = neataptic.Network.fromJSON(population[i].network.toJSON())
          highestIndex = i
        }
        if (population[i].score > bestEver) {
          bestEver = population[i].score
          bestNetwork = neataptic.Network.fromJSON(population[i].network.toJSON())
        }
      }

      console.log('Generation:', neat.generation, '- average score:', neat.getAverage(), "- Highest Score:", neat.getFittest().score);
      neat.sort()
      let newPopulation = []
      for(var i = 0; i < neat.elitism; i++){
        newPopulation.push(neat.population[i]);
      }
      for(var i = 0; i < neat.popsize - neat.elitism; i++){
        newPopulation.push(neat.getOffspring());
      }
      neat.population = newPopulation;
      neat.mutate();
      //console.log("Gen: " + neat.generation + " Score: " + maxScore + " Best Ever:" + bestEver + " Collected:"+population[highestIndex].curr_target)
      populate()
      gen_done = true
      neat.generation++
    }
  }
}

async function EVOLVE() {
  if (!fs.existsSync("networks2")){
    fs.mkdirSync("networks2");
  }
  for (let i = 0; i < 100000; i++) {
    gen_done = false
    await draw()
    if (i % 3 == 0) {
      console.log("Saving Generation: " + i)
      fs.writeFileSync('networks2/Generation_' + i + ".txt", JSON.stringify(bestNetwork.toJSON()));
    }
  }
}

setup()
EVOLVE()