export const _checkIfInsideBodrdersAndCorrectPositionBySquare = () => {
    const BIAS = 1;
    if (this.x - this.radious <= this.area.x) {
      this.x = this.x + BIAS;
      this._revertAngle(-1);
    }
    if (this.x + this.radious >= this.area.x + this.area.width) {
      this.x = this.x - BIAS;
      this._revertAngle(-1);
    }
    if (this.y - this.radious <= this.area.y) {
      this.y = this.y + BIAS;
      this._revertAngle(1, -1);
    }
    if (this.y + this.radious >= this.area.y + this.area.height) {
      this.y = this.y - BIAS;
      this._revertAngle(1, -1);
    }
  }