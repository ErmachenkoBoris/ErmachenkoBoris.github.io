export class Player {
  constructor(
    { x, y, radious, color, ctx, velosity = { x: 1, y: 1 }, image, permanent = false},
    { draw, update, collisionBorderBehavior }
  ) {
    this.x = x;
    this.y = y;
    this.radious = radious;
    this.color = color;
    this.ctx = ctx;
    this.mass = Math.pow(radious, 2);
    this.velosity = velosity;
    this.permanent = permanent;
    this._drawInner = draw;
    this._collisionBorderBehavior = collisionBorderBehavior;
    this._update = update;
    this.image = this._setImage(image);
    this._rotationImageAngle = Math.PI;
  }

  _runCollisionBorderBehavior() {
    const {x, y, vxCoeff, vyCoeff} = this._collisionBorderBehavior(this, {
        xMin: this.radious,
        xMax: this.ctx.canvas.width - this.radious,
        yMin: this.radious,
        yMax: this.ctx.canvas.height - this.radious,
      });
      this.x = x;
      this.y = y;
      this._revertAngle(vxCoeff, vyCoeff);
  }

  draw() {
    if(!this.image) {
        this._drawInner({
            ctx: this.ctx,
            x: this.x,
            y: this.y,
            radious: this.radious,
            color: this.color,
          });
    } else {
        this.ctx.beginPath();
        // this.ctx.drawImage(
        //     this.image,
        //     this.x - this.radious,
        //     this.y - this.radious,
        //     this.radious * 2,
        //     this.radious * 2
        //   );
        this.ctx.save(); // save current state
        this.ctx.translate(this.x, this.y); 
        this.ctx.rotate(this._rotationImageAngle + Math.PI * 2); // rotate
        this.ctx.drawImage(
          this.image,
          -this.radious,
          -this.radious,
          this.radious * 2,
          this.radious * 2
        );
        this.ctx.restore(); // restore original states (no rotation etc)
    }
    this.ctx.fill();
  }

  update() {
    if(!this.permanent) {
        this._update(this);
        this._runCollisionBorderBehavior();
    }
    this.draw();
  }

  _revertAngle(newXdirection = 1, newYdirection = 1) {
    this.velosity = {
      x: newXdirection * this.velosity.x,
      y: newYdirection * this.velosity.y,
    };
  }

  _setImage(src) {
    if (!src) {
      return null;
    }
    const tmpImage = new Image();
    tmpImage.src = src;
    console.log(tmpImage);
    return tmpImage;
  }

  setRotateImageAngle(event) {
    const angle = Math.atan2(event.clientY - this.y,
        event.clientX - this.x);
    this._rotationImageAngle = angle;
    console.log(angle)
  }
}
