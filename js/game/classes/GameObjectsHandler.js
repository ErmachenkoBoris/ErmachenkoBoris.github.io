export class GameObjectHandler {
    update(gameObjects) {
        for (let gameObject of gameObjects) {
            gameObject.update();
        }
    }
}