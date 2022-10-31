const update = (objectToUpdate) => {
    objectToUpdate.x = objectToUpdate.x + objectToUpdate.velosity.x;
    objectToUpdate.y = objectToUpdate.y + objectToUpdate.velosity.y;
}

export default update;