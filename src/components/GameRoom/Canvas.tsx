import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import useWindowDimensions from './../../hooks/WindoDimension'
// import { ICanvas } from "../../interfaces/ICanvas";

const Canvas = () => {
      const canvasRef = useRef(null);
      const { height, width } = useWindowDimensions()
      const effectRan = useRef(false)
      console.log('height:',height, 'width:',width)
      useEffect(() => {
                    if (effectRan.current === false) {
                                        
                                        const canvas: any = canvasRef.current;
                                        const ctx = canvas.getContext("2d");
                                        if( !canvas ) return;
                                        //Our first draw
                                        const image = new Image();
                                        
                                        ctx.fillStyle = "green";
                                        ctx.fillRect(0, 100, width, 50);
                    
                    }
                    return ()=>{
                                        effectRan.current= true
                    }
      }, []);

      return <canvas ref={canvasRef} className='w-full h-1/2'   />;
};

export default Canvas;
