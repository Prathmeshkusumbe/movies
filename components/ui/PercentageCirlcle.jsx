import React, { useEffect, useRef } from 'react'

function PercentageCirlcle({per}) {

  const canvasRef = useRef(null);
  let color1Percentage = per;
  let color2Percentage = 100 - per

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 15;
    const lineWidth = 2;

    const totalAngle = 2 * Math.PI;
    const color1Angle = (totalAngle * color1Percentage) / 100;
    const color2Angle = (totalAngle * color2Percentage) / 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -color1Angle / 2, color1Angle / 2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color1Percentage > 60 ? 'green' : 'yellow';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, color1Angle / 2, color1Angle / 2 + color2Angle);
    ctx.strokeStyle = 'red';
    ctx.stroke();
  },[])
  return <canvas ref={canvasRef} width="34" height="34"></canvas>
}

export default PercentageCirlcle;

function drawCircleWithCustomBorder(color1Percentage, color2Percentage, canvasRef) {



}