const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class Enemy {
  constructor(
    {
      x,
      y,
      radious,
      color,
      ctx,
      velosity,
      itemLink,
      speedScore,
      health,
      RANDOM_DIRECTION_MODE = false,
    },
    { draw, update, collisionBorderBehavior }
  ) {
    this.x = x || itemLink.area.x + itemLink.area.width / 2 - 1;
    this.y = y || itemLink.area.y + itemLink.area.height / 2 - 1;

    this.radious = radious;
    this.color = color;
    this.ctx = ctx;
    this.velosity = velosity;
    this.area = itemLink.area;
    this.speedScore = speedScore || 1;
    this.text = itemLink.name;
    this.style = itemLink.style || "bold 25px Arial";
    this.image = this._setImage(itemLink.image);
    this.neighBors = null;
    this.RANDOM_DIRECTION_MODE = RANDOM_DIRECTION_MODE;
    this.mass = radious * radious;
    this.baseHealth = 8;
    this.health = health || this.baseHealth;

    this._drawInner = draw;
    this._update = update;
    this._interval = null;
    this._healthColor = 'white';
    this._healthBorder = 'red';

    this._generateRandomStartPositionInArea();
    this._setRandomAngle();
    this._collisionBorderBehavior = collisionBorderBehavior;
  }

  _turnOnRandomDirectionalMode() {
    this.RANDOM_DIRECTION_MODE = true;
  }

  _turnOffRandomDirectionalMode() {
    this.RANDOM_DIRECTION_MODE = false;
  }

  setcollisionBorderBehavior(behaviorFunc) {
    this._collisionBorderBehavior = behaviorFunc;
  }

  _runCollisionBorderBehavior() {
    const { x, y, vxCoeff, vyCoeff } = this._collisionBorderBehavior(this, {
      xMin: this.radious,
      xMax: this.ctx.canvas.width - this.radious,
      yMin: this.radious,
      yMax: this.ctx.canvas.height - this.radious,
    });
    this.x = x;
    this.y = y;
    this._revertAngle(vxCoeff, vyCoeff);
  }

  _drawAreaField() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.area.x, this.area.y, this.area.width, this.area.height);
    this.ctx.fillRect(
      this.area.x,
      this.area.y,
      this.area.width,
      this.area.height
    );
    this.ctx.fill();
  }

  draw() {
    this.ctx.beginPath();
    if (!this.image) {
      this.ctx.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.color;
      this._addText();
    } else {
        this.drawCircleBehindImage();
        this.ctx.beginPath();
        this.ctx.drawImage(
          this.image,
          this.x - this.radious,
          this.y - this.radious,
          this.radious * 2,
          this.radious * 2
        );
    }
    this.ctx.fill();
  }

  drawCircleBehindImage() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.x,
      this.y,
      this.radious + 5,
      0,
      Math.PI * 2 * (this.health / this.baseHealth),
    );
    this.ctx.fillStyle = this._healthColor;
    // this.ctx.strokeStyle = this._healthBorder;
    // this.ctx.stroke();
    this.ctx.fill();
  }

  update() {
    if (this.RANDOM_DIRECTION_MODE) {
      this._addRandomModeBehavior();
    }
    this._update(this);
    this._runCollisionBorderBehavior();
    this.draw();
  }

  _addRandomModeBehavior() {
    if (!this._interval) {
      this._setRandomInterval();
      this._setRandomAngle();
    }
  }

  setAngle(event, startPosition) {
    const angle = Math.atan2(
      event.clientY - startPosition.y,
      event.clientX - startPosition.x
    );
    this.velosity = {
      x: this.speedScore * Math.cos(angle),
      y: this.speedScore * Math.sin(angle),
    };
  }

  _getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  _generateRandomStartPositionInArea() {
    this.x = this._getRandomInt(this.area.x, this.area.x + this.area.width);
    this.y = this._getRandomInt(this.area.y, this.area.y + this.area.height);
  }

  _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _setRandomInterval(startTime = 1200, endTime = 3000) {
    const randomTime = this._getRandomInt(startTime, endTime);
    this._interval = setInterval(() => {
      clearInterval(this._interval);
      this._interval = null;
    }, randomTime);
  }

  _setRandomAngle() {
    const angle = Math.random() * Math.PI * 2;
    this.velosity = {
      x: this.speedScore * Math.cos(angle),
      y: this.speedScore * Math.sin(angle),
    };
  }

  _revertAngle(newXdirection = 1, newYdirection = 1) {
    this.velosity = {
      x: newXdirection * this.velosity.x,
      y: newYdirection * this.velosity.y,
    };
    // TODO REFACTORE
    if (this.RANDOM_DIRECTION_MODE && this._interval) {
      clearInterval(this._interval);
      this._setRandomInterval(100, 1000);
    }
  }

  _addText() {
    this.ctx.font = this.style;
    this.ctx.fillText(
      this.text,
      this.x - this.radious,
      this.y + 1.2 * this.radious
    );
  }

  _setImage(src) {
    if (!src) {
      return null;
    }
    const tmpImage = new Image();
    tmpImage.src = src;
    return tmpImage;
  }
}
