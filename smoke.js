let ParticleSystem = function(num, v, img_) {

  this.particles = [];
  this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident
  this.img = img_
  for (let i = 0; i < num; ++i) {
    this.particles.push(new Particle(this.origin, this.img));
  }
};

/**
 * This function runs the entire particle system.
 */
ParticleSystem.prototype.run = function() {

  // cache length of the array we're going to loop into a variable
  // You may see <variable>.length in a for loop, from time to time but
  // we cache it here because otherwise the length is re-calculated for each iteration of a loop
  let len = this.particles.length;

  //loop through and run particles
  for (let i = len - 1; i >= 0; i--) {
    let particle = this.particles[i];
    particle.run();

    // if the particle is dead, we remove it.
    // javascript arrays don't have a "remove" function but "splice" works just as well.
    // we feed it an index to start at, then how many numbers from that point to remove.
    if (particle.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}

/**
 * Method to add a force vector to all particles currently in the system
 * @param dir a p5.Vector describing the direction of the force.
 */
ParticleSystem.prototype.applyForce = function(dir) {
  let len = this.particles.length;
  for (let i = 0; i < len; ++i) {
    //this.particles[i].applyForce(dir);
  }
}

/**
 * Adds a new particle to the system at the origin of the system and with
 * the originally set texture.
 */
ParticleSystem.prototype.addParticle = function(dir) {
  this.particles.push(new Particle(this.origin, dir, this.img));
}

//========= PARTICLE  ===========
/**
 *  A simple Particle class, renders the particle as an image
 */
let Particle = function(pos, dir, img_) {
  this.loc = pos.copy();

  let vx = randomGaussian() * 0.3;
  let vy = randomGaussian() * 0.3 - 1.0;

  this.vel = createVector(vx, vy);
  this.acc = createVector(dir.x, dir.y);
  this.total_life = 200
  this.lifespan = this.total_life;
  this.texture = img_;
}

/**
 *  Simulataneously updates and displays a particle.
 */
Particle.prototype.run = function() {
  this.update();
  this.render();
}

/**
 *  A function to display a particle
 */
Particle.prototype.render = function() {
  push()
  imageMode(CENTER);
  tint(255, this.lifespan*0.25);
  let sc = 7/this.total_life * (this.total_life - (this.lifespan+1))
  scale(sc)
  image(this.texture, this.loc.x/sc, this.loc.y/sc);
  pop()
}

/**
 *  A method to apply a force vector to a particle.
 */
Particle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

/**
 *  This method checks to see if the particle has reached the end of it's lifespan,
 *  if it has, return true, otherwise return false.
 */
Particle.prototype.isDead = function() {
  if (this.lifespan <= 0.0) {
    return true;
  } else {
    return false;
  }
}

/**
 *  This method updates the position of the particle.
 */
Particle.prototype.update = function() {
  this.acc.add(new p5.Vector(randomGaussian() * 0.1, -0.01))
  this.vel.add(this.acc);
  this.vel.mult(0.999)
  this.loc.add(this.vel);
  this.lifespan -= 1.5;
  this.acc.mult(0);
}