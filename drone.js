let flame
let smoke
let SCALE = 2

function preload() {
  flame = loadImage("res/flame.png")
  smoke = loadImage("res/smoke.png")

}

function getAngle(v) {
  return Math.acos(v.x / v.mag())
}
function rotateToReal(pos, off, angle) {
  const x = pos.x + off.x;
  const y = pos.y + off.y;
  return new p5.Vector(
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
    this.target_angle = this.max_angle * max(-1.0, min(1.0, ratio));
  }
  setPower(ratio) {
    this.power_ratio = max(0.0, min(1, ratio));
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
  constructor(x, y, nn, targets, col) {
    this.thruster_offset = 35
    this.radius = 20
    this.angle = 0
    this.angular_velocity = 0
    this.pos = new p5.Vector(x, y)
    this.vel = new p5.Vector(0, 0)
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
    this.smoke_system = new ParticleSystem(0, new p5.Vector(x, y), smoke)
    this.left_flame = 0
    this.right_flame = 0
    this.COLOR = col == undefined ? color(100, 100, 100) : col
    this.smoke_mode = 0
  }
  setTarget(p) {
    this.target = p.copy()
  }
  cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  getThrust() {
    let angle_left = this.angle - this.left.angle - Math.PI / 2;
    let thrust_left = p5.Vector.mult(new p5.Vector(Math.cos(angle_left), Math.sin(angle_left)), this.left.getPower())
    let angle_right = this.angle + this.right.angle - Math.PI / 2;
    let thrust_right = p5.Vector.mult(new p5.Vector(Math.cos(angle_right), Math.sin(angle_right)), this.right.getPower())

    return p5.Vector.add(thrust_left, thrust_right);
  }
  getThrustEach() {
    let angle_left = this.angle - this.left.angle - Math.PI / 2;
    let thrust_left = p5.Vector.mult(new p5.Vector(Math.cos(angle_left), Math.sin(angle_left)), this.left.getPower())
    let angle_right = this.angle + this.right.angle - Math.PI / 2;
    let thrust_right = p5.Vector.mult(new p5.Vector(Math.cos(angle_right), Math.sin(angle_right)), this.right.getPower())

    return [thrust_left.mag(), thrust_right.mag()];
  }
  getTorque() {
    let inertia_coef = 0.8;
    let angle_left = - this.left.angle - Math.PI / 2;
    let left_torque = this.left.getPower() / this.thruster_offset * this.cross(new p5.Vector(Math.cos(angle_left), Math.sin(angle_left)), new p5.Vector(1.0, 0.0));

    let angle_right = this.right.angle - Math.PI / 2;
    let right_torque = this.right.getPower() / this.thruster_offset * this.cross(new p5.Vector(Math.cos(angle_right), Math.sin(angle_right)), new p5.Vector(-1.0, 0.0));
    return (left_torque + right_torque) * inertia_coef;
  }
  getNormalizedAngle() {
    return getAngle(new p5.Vector(cos(this.angle), sin(this.angle))) / Math.PI;
  }
  update(dt) {
    this.brain(dt)

    this.left.update(dt);
    this.right.update(dt);
    let gravity = new p5.Vector(0.0, 1000.0);
    // Integration
    this.vel.add(p5.Vector.mult(p5.Vector.add(gravity, this.getThrust()), dt));
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.angular_velocity += this.getTorque() * dt;
    this.angle += this.angular_velocity * dt;

    let d = dist(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.pos.x, this.pos.y)
    if (d < this.radius) {
      this.inside += dt
    }
    else {
      this.time_out += dt
    }

    if (this.inside > 125 * dt) {
      this.inside = 0
      //this.curr_target++
      this.score += this.points * Math.cos(this.angle) ** 2 * (1 / this.time_out)
      this.points = dist(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.pos.x, this.pos.y)
      this.time_out = 0
    }
    //if (d < 250)
    //if (d > 100)
    this.score += 1 / (1 + d) //* Math.cos(getAngle(this.vel) - getAngle(p5.Vector.sub(this.targets[this.curr_target], this.pos)))
    //this.score += 0.01
    if (Math.abs(this.angle) > Math.PI || this.pos.x > width
      || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height
      || this.not_move_time > 600) {
      this.dead = true
      if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height) {
      }
      else {
      }
      this.score--
    }
  }
  update2(dt) {
    this.left.update(dt);
    this.right.update(dt);
    let gravity = new p5.Vector(0.0, 1000.0);
    // Integration
    this.vel.add(p5.Vector.mult(p5.Vector.add(gravity, this.getThrust()), dt));
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.angular_velocity += this.getTorque() * dt;
    this.angle += this.angular_velocity * dt;

    let d = dist(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.pos.x, this.pos.y)
    if (d < this.radius) {
      this.inside += dt
    }
    else {
      this.time_out += dt
    }

    if (this.inside > 125 * dt) {
      this.inside = 0
      this.curr_target++
      this.score += 10000 * Math.cos(this.angle) ** 2 * (100 / this.time_out)
      this.points = d
      this.time_out = 0
    }
    //if (d < 250)
    //if (d > 100)
    this.score += 1 / (1 + d) //* Math.cos(getAngle(this.vel) - getAngle(p5.Vector.sub(this.targets[this.curr_target], this.pos)))
    //this.score += 0.01
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
    let to_target = (p5.Vector.sub(this.targets[this.curr_target], this.pos))
    to_target.mult(1 / Math.max(to_target.mag(), 700))
    let inputs = [
      to_target.x,
      to_target.y,
      // this.pos.x / width,
      // this.pos.y / height,
      Math.sin(this.angle),
      Math.cos(this.angle),
      //this.angle / Math.PI,
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
  drawThruster(which) {
    let thruster = which == 1 ? this.right : this.left
    let real_pos = rotateToReal(this.pos, new p5.Vector(which * this.thruster_offset * SCALE, 0), this.angle)
    let thruster_height = 22 * SCALE
    let thruster_width = 8 * SCALE

    let thruster_bottom_pos = rotateToReal(real_pos, new p5.Vector(0, thruster_height - thruster_height / 6), this.angle + thruster.angle * which)
    this.smoke_system.origin = thruster_bottom_pos.copy()
    let dx = p5.Vector.sub(thruster_bottom_pos, real_pos).div(7)

    
    this.smoke_system.applyForce(dx)
    if (this.smoke_mode == 0){
    this.smoke_system.run()
      if (Math.random() < thruster.power_ratio) {
        for (let i = 0; i < 3; i++)
          this.smoke_system.addParticle(dx)
      }
    }

    push()
    translate(real_pos.x, real_pos.y)
    rectMode(CENTER)
    rotate(this.angle + thruster.angle * which)
    fill(120)
    rect(0, 0, thruster_width, thruster_height)

    let thrust = Math.min(this.getThrustEach()[which == -1 ? 0 : 1], 1000)
    let flame_height = Math.max(1, 0.2 * (thrust))
    let flame_width = Math.max(1, 0.1 * (thrust))
    if (Math.random() < 0.5)
      scale(-1, 1)
    image(flame, -flame_width / 2, thruster_height / (which == -1 ? 4 : 4), flame_width, flame_height)
    pop()



  }
  show() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    let bar_height = 3 * SCALE
    let bar_width = this.thruster_offset * SCALE
    fill(100)
    rectMode(CENTER)
    rect(-this.thruster_offset / 2 * SCALE, 0, bar_width, bar_height)
    rect(this.thruster_offset / 2 * SCALE, 0, bar_width, bar_height)

    rect(-this.thruster_offset / 2 * SCALE, bar_height * 2, bar_width, bar_height)
    rect(this.thruster_offset / 2 * SCALE, bar_height * 2, bar_width, bar_height)

    rotate(Math.PI / 16)
    rect(this.thruster_offset / 2 * SCALE, -8 * SCALE, bar_width, bar_height)
    rotate(-Math.PI / 8)
    rect(-this.thruster_offset / 2 * SCALE, -8 * SCALE, bar_width, bar_height)
    pop()

    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    fill(60, 60, 60)
    circle(0, 0, this.radius * SCALE)
    fill(this.COLOR)
    arc(0, 0, this.radius * 1.5 * SCALE, this.radius * 1.5 * SCALE, Math.PI, 0)
    fill(Math.sin(this.angle) ** 2 * 255, Math.cos(this.angle) ** 2 * 255, 0)
    circle(0, 0, this.radius / 2 * SCALE)
    pop()
    this.drawThruster(1); this.drawThruster(-1)

    push()
    fill(255, 255, 0)
    circle(this.targets[this.curr_target].x, this.targets[this.curr_target].y, this.radius)
    pop()
  }
}