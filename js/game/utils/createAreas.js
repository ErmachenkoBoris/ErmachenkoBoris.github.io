function createAreas(menuItems, canvas) {
    const numberOfColumns = Math.ceil(menuItems.length / 2);
    const numberOfRows = 2;
    const xArea = Math.floor(canvas.width / numberOfColumns);
    const yArea = Math.floor(canvas.height / numberOfRows);
    for (let i = 0; i < numberOfColumns; i++) {
        menuItems[i] = {
            ...menuItems[i],
            ...{
                area: {
                    x: i * xArea,
                    y: 0,
                    width: xArea,
                    height: yArea
                }


            }
        }
        menuItems[i + numberOfColumns] = {
            ...menuItems[i + numberOfColumns],
            ...{
                area: {
                    x: i * xArea,
                    y: yArea,
                    width: xArea,
                    height: yArea
                }

            }
        }
    }
    return menuItems;
}

export default createAreas;