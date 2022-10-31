const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const radiousModes = {
    generateSmall: () => {
        return getRandomInt(20, 40);
    },
    generateNormal: () => {
        return  getRandomInt(40, 60);
    },
    generateBig: () => {
        return getRandomInt(60, 80);
    },
}

export default radiousModes;
