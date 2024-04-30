import React from 'react';
import PropTypes from 'prop-types';
const BeakerCanvas = ({ height, width, c2 }) => {
  const canvas = React.useRef();
  const [energyArray, setEnergyArray] = React.useState(Array(144).fill(false));

  const beaker = (ctx, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, offset) => {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width - offset, y + height, x + width - offset, y + height - radius, radius);
    ctx.lineTo(x + width - offset, y + radius);
    ctx.lineTo(x + width, y + radius);
    ctx.bezierCurveTo(width + 25, 30, width + 25, x, x + width, y);
    ctx.lineTo(x, y);
    ctx.bezierCurveTo(0, x, 0, 30, x, y + radius);
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, height);
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  const drawBeaker = (ctx) => {
    let width = 206, height = 248;
    const rightOffset = 10;
    // parent beaker
    beaker(ctx, 12, 12, width, height, 15, "lightgray", "black", 3, 0);
    ctx.clip();
    width -= rightOffset;
    height -= rightOffset;
    beaker(ctx, 12, 12, width, height, 15, "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", 0.1, 15);
    width -= rightOffset;
    height -= rightOffset;
    beaker(ctx, 12, 12, width, height, 15, "white", "white", 0.1, 20);
    ctx.beginPath();
    ctx.rect(12, 142, 220, 132);
    ctx.fillStyle = "rgba(0,0,255,0.2)";
    ctx.fill();
    ctx.beginPath();
    const delta = 15;
    const startPoint = 40;
    for (let y = startPoint; y < 140; y += delta) {
      y === startPoint + delta * 3 ? ctx.moveTo(160, y) : ctx.moveTo(175, y);
      ctx.lineTo(193, y);
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    let count = 0;
    for (let x = 17; x < 215; x += 13)
      for (let y = 150; y < 260; y += 13) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = energyArray[count] ? "rgba(0,0,255,0.5)" : "rgba(0,0,255,0.1)";
        ctx.fill();
        count++;
      }
  };

  const generateEnergyArray = (arr, count) => {
    const arrNum = []
    const res = [...arr]
    let originCount = 0
    res.forEach((item) => {
      if (item === true) {
        originCount++
      }
    })
  
    const updateCount = count - originCount
    // updatedArrIndexes: variable for debug purpose.
    const updatedArrIndexes = []
  
    if (updateCount < 0) {
      res.forEach((item, index) => {
        if (item === true) {
          arrNum.push(index)
        }
      })
  
      Array(Math.abs(updateCount)).fill(0).forEach(() => {
        if (arrNum.length <= 0) return
        // rand: array's index number to be updated.
        const rand = Math.floor(Math.random() * arrNum.length)
        const n = arrNum.splice(rand, 1)[0]
        res[n] = false
        updatedArrIndexes.push(n)
      })
    } else if (updateCount > 0) {
      res.forEach((item, index) => {
        if (item === false) {
          arrNum.push(index)
        }
      })
  
      Array(Math.abs(updateCount)).fill(0).forEach(() => {
        if (arrNum.length <= 0) return
        // rand: array's index number to be updated.
        const rand = Math.floor(Math.random() * arrNum.length)
        const n = arrNum.splice(rand, 1)[0]
        res[n] = true
        updatedArrIndexes.push(n)
      })
    }
  
    updatedArrIndexes.sort((a, b) => a - b)
    return res
  }
  React.useEffect(() => {
    const context = canvas.current.getContext('2d');
    drawBeaker(context);
  });

  React.useEffect(() => {
    setEnergyArray(energyArray => generateEnergyArray(energyArray, Math.floor(144 * c2 / 100)));
  }, [c2]);

  return (
    <canvas ref={canvas} height={height} width={width} />
  );
};
BeakerCanvas.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  c2: PropTypes.number.isRequired,
  c1: PropTypes.number.isRequired,
  t2: PropTypes.number.isRequired,
  t1: PropTypes.number.isRequired,
};
export default BeakerCanvas;