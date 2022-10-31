export class CollisionHepler {
    constructor() {
        this.bias = 2;
    }

    rotate(x, y, sin, cos, reverse) {
        return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
        };
    }

    checkCollisionAndFix(allMassObjects,) {
        for(let i = 0; i<allMassObjects.length-1; i++) {
            for(let j = i+1; j<allMassObjects.length; j++) {
                this.checkCollision(allMassObjects[i], allMassObjects[j]);
            } 
        }
    }

    fixCollision(dx, dy, ball0, ball1, diff) {

        if(ball0.permanent || ball1.permanent) {
            this._withPermanentHandler(dx, dy, ball0, ball1, diff);
            return;
        }

        let angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),

            //rotate ball0's position
            pos0 = { x: 0, y: 0 }, //point

            //rotate ball1's position
            pos1 = this.rotate(dx, dy, sin, cos, true),

            //rotate ball0's velocity
            vel0 = this.rotate(ball0.velosity.x, ball0.velosity.y, sin, cos, true),

            //rotate ball1's velocity
            vel1 = this.rotate(ball1.velosity.x, ball1.velosity.y, sin, cos, true),


            //collision reaction
            vxTotal = vel0.x - vel1.x;
        vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
            (ball0.mass + ball1.mass);
        vel1.x = vxTotal + vel0.x;

        //FIX OVERLAP
        if(pos0.y> pos1.y) {
            pos0.y = pos0.y + Math.abs(diff)/2 + this.bias;
            pos1.y = pos1.y - Math.abs(diff)/2 - this.bias;
        } else {
            pos0.y = pos0.y - Math.abs(diff)/2 - this.bias;
            pos1.y = pos1.y + Math.abs(diff)/2 + this.bias;
        }

        if(pos0.x> pos1.x) {
            pos0.x = pos0.x + Math.abs(diff)/2 + this.bias;
            pos1.x = pos1.x - Math.abs(diff)/2 + this.bias;
        } else {
            pos0.x = pos0.x - Math.abs(diff)/2 + this.bias;
            pos1.x = pos1.x + Math.abs(diff)/2 + this.bias;
        }
        
        //update position
        pos0.x += vel0.x;
        pos1.x += vel1.x;

        //rotate positions back
        let pos0F = this.rotate(pos0.x, pos0.y, sin, cos, false),
            pos1F = this.rotate(pos1.x, pos1.y, sin, cos, false);

        //adjust positions to actual screen positions
        ball1.x = ball0.x + pos1F.x;
        ball1.y = ball0.y + pos1F.y;
        ball0.x = ball0.x + pos0F.x;
        ball0.y = ball0.y + pos0F.y;

        //rotate velocities back
        let vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false),
            vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);
        ball0.velosity.x = vel0F.x;
        ball0.velosity.y = vel0F.y;
        ball1.velosity.x = vel1F.x;
        ball1.velosity.y = vel1F.y;
    }

    checkCollision(ball0, ball1) {
        let dx = ball1.x - ball0.x;
        let dy = ball1.y - ball0.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        //collision handling code here
        if (dist < ball0.radious + ball1.radious) {
            const diff = ball0.radious + ball1.radious - dist;
            this.fixCollision(dx, dy, ball0, ball1, diff)
        }
    }

    _withPermanentHandler(dx, dy, ball0, ball1, diff) {
        let angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),

            //rotate ball0's position
            pos0 = { x: 0, y: 0 }, //point

            //rotate ball1's position
            pos1 = this.rotate(dx, dy, sin, cos, true),

            //rotate ball0's velocity
            vel0 = this.rotate(ball0.velosity.x, ball0.velosity.y, sin, cos, true),

            //rotate ball1's velocity
            vel1 = this.rotate(ball1.velosity.x, ball1.velosity.y, sin, cos, true);
            //collision reaction

            vel0.x = -vel0.x;
            vel1.x = -vel1.x;

        //FIX OVERLAP
        if(pos0.y > pos1.y) {
            pos0.y = pos0.y + Math.abs(diff) + 2 * this.bias;
            pos1.y = pos1.y - Math.abs(diff) - 2 * this.bias;
        } else {
            pos0.y = pos0.y - Math.abs(diff) - 2 * this.bias;
            pos1.y = pos1.y + Math.abs(diff) + 2 * this.bias;
        }

        if(pos0.x > pos1.x) {
            pos0.x = pos0.x + Math.abs(diff) + 2 * this.bias;
            pos1.x = pos1.x - Math.abs(diff) - 2 * this.bias;
        } else {
            pos0.x = pos0.x - Math.abs(diff) - 2 * this.bias;
            pos1.x = pos1.x + Math.abs(diff) + 2 * this.bias;
        }

        //update position
        pos0.x += vel0.x;
        pos1.x += vel1.x;

        //rotate positions back
        let pos0F = this.rotate(pos0.x, pos0.y, sin, cos, false),
            pos1F = this.rotate(pos1.x, pos1.y, sin, cos, false);

        //adjust positions to actual screen positions
        if(!ball1.permanent) {
            ball1.x = ball0.x + pos1F.x;
            ball1.y = ball0.y + pos1F.y;
        }

        if(!ball0.permanent) {
            ball0.x = ball0.x + pos0F.x;
            ball0.y = ball0.y + pos0F.y;
        }

        //rotate velocities back
        let vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false),
            vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);

        if(!ball1.permanent) {
            ball1.velosity.x = vel1F.x;
            ball1.velosity.y = vel1F.y;
        } else {
            ball1.velosity.x = 1;
            ball1.velosity.y = 1;
        }

        if(!ball0.permanent) {
            ball0.velosity.x = vel0F.x;
            ball0.velosity.y = vel0F.y;
        } else {
            ball0.velosity.x = 1;
            ball0.velosity.y = 1;  
        }
    }
}