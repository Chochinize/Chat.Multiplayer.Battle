
import { useEffect,useState, useRef } from 'react';



export default function Canvas(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
 
  console.log('start with small',canvasRef)
const [ w , setW] = useState(320);
  useEffect(()=>{
    const context = canvasRef.current?.getContext('2d');
    console.log('context',context)
    if(context != null){
      clearBackground(context)
      drawBox(context, w, 210)
    }
  },[])

  const clearBackground = (context:CanvasRenderingContext2D)=>{
    const { width, height, } = context.canvas
    context.rect(0,0,width,height);
    context.fillStyle = 'black';
    context.fill();

  }
  const drawBox = ( 
    context: CanvasRenderingContext2D,
    xPos: number,
    yPos: number)=>{
    context.fillStyle = 'green';
    context.fillRect(xPos,yPos,150,100);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    const canvas = canvasRef.current;
    console.log('first')
    if (canvas == null) {
      return;
    }
    console.log('çord:',event)
  }
  return (
    <canvas ref={canvasRef} height={480} width={720} onKeyDown={handleKeyDown}>
    Oops! Your browser doesn't support the canvas component.
  </canvas>
  );
}