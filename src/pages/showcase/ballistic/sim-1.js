import React, { useEffect, useState, useRef } from 'react';
import '../../../css/canvas.css';

const BallisticCanvas = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [t, setT] = useState(0);
  const [params, setParams] = useState({
    thetha_i: 0.3,
    v_i: 5,
    x_i: 0,
    y_i: 0,
    minX: -100,
    maxX: 100,
    minY: -100,
    maxY: 100,
  });
  const {
    thetha_i,
    v_i,
    x_i,
    y_i,
    minX,
    maxX,
    minY,
    maxY,
  } = params;
  let height;
  let width;
  function coordx(x) {
    return x;
  }
  function coordy(y) {
    return height - y;
  }
  function init() {
    if (ctx == null) {
      if (canvasRef.current) {
        const renderCtx = canvasRef.current.getContext('2d');
        setCtx(renderCtx);
        return false;
      }
    }
    height = ctx.canvas.height;
    width = ctx.canvas.width;
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.fillStyle = '#fbf3ed';
    //ctx.fillRect(0, 0, 1500, 1000);
    return true;
  }
  function reset() {
    setT(0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#fbf3ed';
    ctx.fillRect(0, 0, 1500, 1000);
  }
  function quadraticCurve(x, y, minX, maxX, minY, maxY) {
    let extraX = 0;
    let extraY = 0;
    if (minX < 0) {
      extraX = -minX;
    }
    if (minY < 0) {
      extraY = -minY;
    }
    if (maxX < 0) {
      extraX = -maxX;
    }
    if (maxY < 0) {
      extraY = -maxY;
    }
    const newX = Math.round(coordx((x + extraX) / (maxX - minX) * width));
    const newY = Math.round(coordy((y + extraY) / (maxY - minY) * height));
    return { newX, newY };
  }
  useEffect(() => {
    function drawGraph() {
      const isInitSuccess = init();
      if (!isInitSuccess) {
        return;
      }
      /*const minX = 0;
      const maxX = 20;
      const minY = 0;
      const maxY = 10;
      const x_i = 1;
      const y_i = 1;
      const v_i = 1;
      const thetha_i = 50 * (Math.PI / 180.0);*/
      const g = -9.81;
      ctx.strokeStyle = '#653815';
      ctx.lineWidth = 10;
      /*ctx.beginPath();
      ctx.moveTo(
        quadraticCurve(minX, a * (minX ** 2) + b * minX + c, minX, maxX, minY, maxY).newX,
        quadraticCurve(minX, a * (minX ** 2) + b * minX + c, minX, maxX, minY, maxY).newY,
      );
      for (let x = minX; x <= maxX; x += 0.1) {
        const { newX, newY } = quadraticCurve(x, a * (x ** 2) + b * x + c, minX, maxX, minY, maxY);
        ctx.lineTo(newX, newY);
        ctx.stroke();
      }*/
      ctx.beginPath();
      ctx.fillStyle = '#653815';
      const { newX, newY } = quadraticCurve(
        x_i + v_i * Math.cos(thetha_i) * t,
        y_i + v_i * Math.sin(thetha_i) * t + g / 2 * t ** 2, 
        minX, maxX, minY, maxY
      );
      ctx.arc(newX, newY, 10, 0, 2 * Math.PI);
      ctx.fill();
      /*
       ctx.moveTo(50, ((800 / 2) + 800 / 2 * Math.sin(((50 + -800 / 2 + t) / 190) * Math.PI) + 100));
       for (let x = 50; x <= 1450; x += 10) {
         ctx.lineTo(x, ((800 / 2) + 800 / 2 * Math.sin(((x + -800 / 2 + t) / 190) * Math.PI) + 100));
         ctx.stroke();
       }
       */
    }
    if (ctx !== undefined) {
      drawGraph();
      setTimeout(() => {
        setT(t + 0.01);
      }, 10);
    }
  }, [t]);
  return (
    <>
      <canvas id="ballistic-canvas" ref={canvasRef} className="canvas-3-2" height="1000px" width="1500px" >
        Your browser does not support the HTML canvas tag.
      </canvas>
      <form className='flex flex-col w-80 ml-auto mr-auto'>
        <input type="button" onClick={reset} id="reset" name="reset" value="Restart Simulation" className='std-button my-2' />
        <label htmlFor="angle"> Angle: {Math.round(parseFloat(params.thetha_i) / 3.14159 * 180.0)}</label>
        <input type="range" id="angle" name="angle" value={params.thetha_i} min="0" max="3.14" step="0.05" onChange={e => setParams({ ...params, thetha_i: e.target.value })} /><br />
        <label htmlFor="velocity"> Initial Velocity: {params.v_i}</label>
        <input type="range" id="velocity" name="velocity" value={params.v_i} min="0" max="50" onChange={e => setParams({ ...params, v_i: e.target.value })} /><br />
        <label htmlFor="x_i"> Initial X position: {params.x_i}</label>
        <input type="range" id="x_i" name="x_i" value={params.x_i} min="0" max="100" onChange={e => setParams({ ...params, x_i: e.target.value })} /><br />
        <label htmlFor="y_i"> Initial Y position: {params.y_i}</label>
        <input type="range" id="y_i" name="y_i" value={params.y_i} min="0" max="100" onChange={e => setParams({ ...params, y_i: e.target.value })} /><br />
        <label htmlFor="minX"> Viewport Min X: {params.minX}</label>
        <input type="range" id="minX" name="minX" value={params.minX} min="-1000" max="1000" onChange={e => setParams({ ...params, minX: e.target.value })} /><br />
        <label htmlFor="maxX"> Viewport Max X: {params.maxX}</label>
        <input type="range" id="maxX" name="maxX" value={params.maxX} min="-1000" max="1000" onChange={e => setParams({ ...params, maxX: e.target.value })} /><br />
        <label htmlFor="minY"> Viewport Min Y: {params.minY}</label>
        <input type="range" id="minY" name="minY" value={params.minY} min="-1000" max="1000" onChange={e => setParams({ ...params, minY: e.target.value })} /><br />
        <label htmlFor="maxY"> Viewport Max y: {params.maxY}</label>
        <input type="range" id="maxY" name="maxY" value={params.maxY} min="-1000" max="1000" onChange={e => setParams({ ...params, maxY: e.target.value })} /><br />
      </form>
    </>
  );
};

export default BallisticCanvas;
