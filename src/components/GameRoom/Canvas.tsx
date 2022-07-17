import React, { useRef, useEffect } from "react";
// import { ICanvas } from "../../interfaces/ICanvas";

const Canvas = () => {
      const canvasRef = useRef(null);
      useEffect(() => {
                    
            const canvas: any = canvasRef.current;
            const ctx = canvas.getContext("2d");
            //Our first draw
            ctx.fillStyle = 'green';
            ctx.fillRect(10,100,500,100);
      }, []);

      return <canvas ref={canvasRef} className='border-2 w-full h-full' />;
};

export default Canvas;
