import React, { useEffect } from 'react';
import '../../../css/canvas.css';

const EquationOfTime = () => {
  useEffect(() => {
    const ctx = document
      .getElementById('equation-of-time-canvas')
      .getContext('2d');
    function init() {
      ctx.fillStyle = '#fbf3ed';
      ctx.fillRect(0, 0, 1500, 1000);
    }
    function drawGraph() {
      ctx.strokeStyle = '#653815';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(
        50,
        800 / 2 + (800 / 2) * Math.sin(((50 + -800 / 2) / 190) * Math.PI) + 100
      );
      for (let x = 50; x <= 1450; x += 1) {
        ctx.lineTo(
          x,
          800 / 2 + (800 / 2) * Math.sin(((x + -800 / 2) / 190) * Math.PI) + 100
        );
        ctx.stroke();
      }
    }
    init();
    drawGraph();
  }, []);
  return (
    <canvas
      id="equation-of-time-canvas"
      className="canvas-3-2"
      height="1000px"
      width="1500px"
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
  );
};

export default EquationOfTime;
