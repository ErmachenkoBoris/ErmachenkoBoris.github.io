export class Projectile {
    constructor({ x, y, radious, color, ctx, velosity, speedScore}, { draw, update }) {
      this.x = x;
      this.y = y;
      this.radious = radious;
      this.color = color;
      this.ctx = ctx;
      this._drawInner = draw;
      this.velosity = velosity;
      this._update = update;
      this.speedScore = speedScore || 1;
    }
  
    draw() {
      this._drawInner({
        ctx: this.ctx,
        x: this.x,
        y: this.y,
        radious: this.radious,
        color: this.color,
      });
    }

    update() {
        this._update(this);
        this.draw();
    }

    setAngle(event, startPosition) {
        const angle = Math.atan2(event.clientY - startPosition.y,
            event.clientX - startPosition.x);
        this.velosity = {
            x: this.speedScore*Math.cos(angle),
            y: this.speedScore*Math.sin(angle)
        }
    }
  }