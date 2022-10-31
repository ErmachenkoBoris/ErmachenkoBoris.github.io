const checkIfInsideBodrdersAndCorrectPosition = (
  gameObject,
  { xMin, xMax, yMin, yMax }
) => {
  const BIAS = 1;
  if (gameObject.x < xMin) {
    return {
      x: gameObject.x + (xMin - gameObject.x) + BIAS,
      y: gameObject.y,
      vxCoeff: -1,
      vyCoeff: 1,
    };
  }
  if (gameObject.x > xMax) {
    return {
      x: gameObject.x - (gameObject.x - xMax) - BIAS,
      y: gameObject.y,
      vxCoeff: -1,
      vyCoeff: 1,
    };
  }
  if (gameObject.y < yMin) {
    return {
      x: gameObject.x,
      y: gameObject.y + (yMin - gameObject.y) + BIAS,
      vxCoeff: 1,
      vyCoeff: -1,
    };
  }

  if (gameObject.y > yMax) {
    return {
      x: gameObject.x,
      y: gameObject.y - (gameObject.y - yMax) - BIAS,
      vxCoeff: 1,
      vyCoeff: -1,
    };
  }

  return { x: gameObject.x, y: gameObject.y, vxCoeff: 1, vyCoeff: 1 };
};

export default checkIfInsideBodrdersAndCorrectPosition;
