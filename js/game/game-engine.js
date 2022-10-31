import { Player } from "./classes/Player.js";
import { Projectile } from "./classes/Projectile.js";
import { Enemy } from "./classes/Enemy.js";
import { CollisionHepler } from "./classes/CollisionHelper.js";
import drowFunc from "./functions/drawsFunctions/commonPlayerDrows.js";
import updateFunc from "./functions/updateFunctions/commonUpdate.js";
import menuItems from "./consts/menuItems.js";
import createAreas from "./utils/createAreas.js";
import checkIfInsideBodrdersAndCorrectPosition from "./functions/collisionBordersHandler/collisionBordersHandler.js"
import speedModes from "./consts/speedMods.js"
import radiousModes from "./consts/radiousSizeMode.js"
import { CollisionBulletHepler } from "./classes/CollisionBulletHelper.js"
import { GameObjectHandler } from "./classes/GameObjectsHandler.js";

const FPS = 120;
const MAX_PROJECTILE_LENGTH = 50;
const CLEAR_PROJECTILE_TIMER = 5000;
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");
const drawFunc = drowFunc;
const xStart = canvas.width / 2;
const yStart = canvas.height / 2;
const player = new Player(
    { x: xStart, y: yStart, radious: 30, color: "blue", ctx: ctx, permanent: true, image: 'assets/img/blaster.png'},
    { draw: drawFunc, update: updateFunc, collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition }
);

let projectilesArr = [];
let allMassObjects = [];
const enemiesArr = [];

const collisionHelper = new CollisionHepler();
const collisionBulletHepler = new CollisionBulletHepler();
const gameObjectHandler = new GameObjectHandler();

function spawnEnemies() {
    let itemsLocal = menuItems;
    itemsLocal = createAreas(menuItems, canvas);
    itemsLocal.forEach(item => {
        enemiesArr.push(
            new Enemy(
                {
                    radious: radiousModes.generateBig(),
                    color: item.color,
                    ctx: ctx,
                    velosity: {
                        x: 1,
                        y: 1,
                    },
                    itemLink: item,
                    speedScore: speedModes.generateSlow(),
                },
                { draw: drawFunc, update: updateFunc, collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition }
            )
        )
    });
}

spawnEnemies();

setInterval(() => {
    if(projectilesArr.length > MAX_PROJECTILE_LENGTH) {
        projectilesArr = projectilesArr.slice(projectilesArr.length-MAX_PROJECTILE_LENGTH, projectilesArr.length);
    }
}, CLEAR_PROJECTILE_TIMER);

let timeOutId;
window.addEventListener("mousemove", (event) => {
    player.setRotateImageAngle(event);
    if (timeOutId) {
        clearTimeout(timeOutId);
    }
    const updateProjectileAndPlayer = () => {
        const projectile = new Projectile(
            {
                x: player.x,
                y: player.y,
                radious: 5,
                color: "white",
                ctx: ctx,
                velosity: {
                    x: 1,
                    y: 1,
                },
                speedScore: 3
            },
            { draw: drawFunc, update: updateFunc }
        );
        projectile.setAngle(event, { x: player.x, y: player.y });
        projectilesArr.push(projectile);
        clearTimeout(timeOutId);
        timeOutId = setTimeout(updateProjectileAndPlayer, 600)
    }
    timeOutId = setTimeout(updateProjectileAndPlayer, 100);

});


function animate() {
    setTimeout(() => {
        allMassObjects = [...enemiesArr, player];
        requestAnimationFrame(animate);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        collisionBulletHepler.checkCollisionAndFix(enemiesArr, projectilesArr);

        collisionHelper.checkCollisionAndFix(allMassObjects);

        gameObjectHandler.update(projectilesArr);

        gameObjectHandler.update(enemiesArr);

        gameObjectHandler.update([player]);
    }, 1000 / FPS);


}

animate();
