import React, { useState } from 'react';
import PropTypes from 'prop-types';
const GraphCanvas = ({ play, c2, c1, t2, t1, height, width }) => {
    const canvas = React.useRef();
    const [sX, setSX] = useState(null);
    const [sY, setSY] = useState(null);
    const [eX, setEX] = useState(null);
    const [eY, setEY] = useState(null);
    const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    const cancelAnimationFrame =
        window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    React.useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        let startX, startY1, startY2, xStep, yStep, duration, endX, otherReq;

        startX = (t2 / 20) * width;
        setSX(startX);
        endX = (t1 / 20) * width;
        setEX(endX);
        startY1 = Math.abs(1 - c2) * height;
        setSY(startY1);
        const endY1 = Math.abs(1 - c1) * height;
        setEY(endY1);
        startY2 = 0;
        duration = Math.abs(t1 - t2) * 1000 / 60;
        xStep = (Math.abs(t1 - t2) / 20 * width) / duration;
        yStep = (Math.abs(c2 - c1) * height) / duration;

        function step() {
            ctx.beginPath();
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.rect(0, 0, width, height);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.moveTo(sX, 0);
            ctx.lineTo(sX, height);
            ctx.moveTo(eX, 0);
            ctx.lineTo(eX, height);
            ctx.moveTo(0, sY);
            ctx.lineTo(width, sY);
            ctx.moveTo(0, eY);
            ctx.lineTo(width, eY);
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(sX, sY);
            ctx.lineTo(eX, eY);
            ctx.moveTo(sX, height);
            ctx.lineTo(eX, height - (eY - sY));
            ctx.strokeStyle = "gray";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(sX, sY);
            ctx.lineTo(startX + xStep, startY1 + yStep);
            ctx.strokeStyle = "rgba(0,0,255)";
            ctx.stroke();
            ctx.moveTo(startX + xStep, startY1 + yStep)
            ctx.arc(startX + xStep, startY1 + yStep, 15, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,0,255,0.2)"
            ctx.fill();
            ctx.beginPath();
            ctx.arc(startX + xStep, startY1 + yStep, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,0,255)"
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(sX, height);
            ctx.lineTo(startX + xStep, height - startY2 + yStep);
            ctx.moveTo(startX + xStep, height - startY2 + yStep);
            ctx.arc(startX + xStep, height - startY2 + yStep, 2, 0, Math.PI * 2);
            ctx.strokeStyle = "red";
            ctx.stroke();
            startX += xStep;
            startY1 += yStep;
            startY2 += yStep;
            if (endX > startX) {
                otherReq && requestAnimationFrame(step);
            } else cancelAnimationFrame(otherReq);
        }

        otherReq = requestAnimationFrame(step);

    }, [play, sX, sY, eX, eY])
    return (
        <canvas ref={canvas} height={height} width={width} />
    );
};
GraphCanvas.propTypes = {
    play: PropTypes.bool.isRequired,
    c2: PropTypes.number.isRequired,
    c1: PropTypes.number.isRequired,
    t2: PropTypes.number.isRequired,
    t1: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
};
export default GraphCanvas;