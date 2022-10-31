const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const speedModes = {
    generateSlow: () => {
        return getRandomInt(1, 11) / 10
    },
    generateMiddle: () => {
        return  getRandomInt(10, 12) / 10
    },
    generateFast: () => {
        return getRandomInt(20, 40) / 10
    },
    generateSuperFast: () => {
        return getRandomInt(40, 80) / 10
    },
}

export default speedModes;
