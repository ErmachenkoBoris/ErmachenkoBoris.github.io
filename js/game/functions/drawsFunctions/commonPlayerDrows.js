const draw = ({x,y,radious, color, ctx}) => {
    ctx.beginPath();
    ctx.arc(x,y,radious,0,Math.PI*2, false);
    ctx.fillStyle = color;
    ctx.fill();
}

export default draw;