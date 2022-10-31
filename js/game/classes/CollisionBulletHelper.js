export class CollisionBulletHepler {

  fixCollision(enemy, enemies, projectile, enemyIndex, projectileIndex) {
    projectile.splice(projectileIndex, 1);
    enemy.health--;
    if (enemy.health <= 0) {
      enemies.splice(enemyIndex, 1);
    }
  }

  checkCollisionAndFix(enemies, projectiles) {
    enemies.forEach((enemy, enemyIndex) => {
        projectiles.forEach((projectile, projectileIndex) => {
            this.checkCollision(enemies, projectiles, enemy, enemyIndex, projectile, projectileIndex)
        });
    });
  }

  checkCollision(enemies, projectiles, enemy, enemyIndex, projectile, projectileIndex) {
        const dist = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
        if (dist <= enemy.radious + projectile.radious) {
          this.fixCollision(enemy, enemies, projectiles, enemyIndex, projectileIndex);
        }

  }



}
