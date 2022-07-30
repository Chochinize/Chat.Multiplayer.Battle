import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getWindowDimensions from "./../../RoomActions/WindowDimension/WindoDimension";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { State } from "../../state";
import terrain from '../../assets/terrain/terrain.jpg'
import playerOne0 from '../../assets/sprites/walk/HeroKnight_Run_0.png'
import playerOne1 from '../../assets/sprites/walk/HeroKnight_Run_1.png'
import playerOne2 from '../../assets/sprites/walk/HeroKnight_Run_2.png'
import playerOne3 from '../../assets/sprites/walk/HeroKnight_Run_3.png'
import playerOne4 from '../../assets/sprites/walk/HeroKnight_Run_4.png'
import playerOne5 from '../../assets/sprites/walk/HeroKnight_Run_5.png'


export interface Point2D {
  x: number;
  y: number;
}
interface Pos2D {
  boxX: number;
  boxY: number;
}

export default function Canvas() {
   const [count, setCount] = useState(0)
   const requestRef = useRef<undefined | number>();
   const previousTimeRef = useRef();
  
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  
  
  const effectRan = useRef(false);
  const frame = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramsID = useParams();

  const client = useSelector((state: State) => state.bank);
  const dispatch = useDispatch();
  const { enemyUpdate, selfUpdate, } = bindActionCreators(actionCreators, dispatch);
  const { pressed: a } = client.enemy.keys.a;
  const { pressed: d } = client.enemy.keys.d;
  const { pressed: w } = client.enemy.keys.w;

  const { pressed: a1 } =  client.self.keys.a;
  const { pressed: d1 } =  client.self.keys.d;
  const { pressed: w1 } =  client.self.keys.w;

  
  const context = canvasRef.current?.getContext("2d");
  const clearBackground = (context: CanvasRenderingContext2D) => {
    const { width, height } = context.canvas;
    context.canvas.width = 900;
    context.canvas.height = 576; 
    var imageObj1 = new Image();
    imageObj1.src = terrain
    context.drawImage(imageObj1,0,0,width,height);
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  // const animate2 = (time:any) => {
  //   if (previousTimeRef.current != undefined) {
  //     const deltaTime = time - previousTimeRef.current;
      
  //     // Pass on a function to the setter of the state
  //     // to make sure we always have the latest state
  //     setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
  //   }
  //   previousTimeRef.current = time;
  //   requestRef.current = requestAnimationFrame(animate2);
  // }

  console.log(client.enemy.attackBox.positionX)
const drawEnemyBox = (context: CanvasRenderingContext2D, xPos: number,yPos: number) => {
    context.fillStyle = "red";
    context.fillRect(xPos, yPos, 50, client.enemy.h-20);
    context.fillStyle = "green";
    context.fillRect(client.enemy.attackBox.positionX,client.enemy.attackBox.positionY,100,50);
      
    var imageObj1 = new Image();
    imageObj1.src = playerOne0
    context.drawImage(imageObj1,xPos-70,yPos-70,200,200);
  };

  const drawSelf = (context: CanvasRenderingContext2D, xPos: number,yPos: number) => {
    context.fillStyle = "yellow";
    context.fillRect(xPos, yPos, 50, client.self.h);
  };

  
  const animate = (): void => {
    const context = canvasRef.current?.getContext("2d");
    frame.current = requestAnimationFrame(animate); 
    console.log('pos:',client.self.position.xPos)
    //    client.users.send(
    //   JSON.stringify({
    //     type: "enemySyncPosition",
    //     name: client.enemy,
    //     userID: paramsID,
    //   })
    // );
    
    // if(context != null){
    //   console.log('run multiple timesdddddddddd')
    //   clearBackground(context);
    //   drawBox(context,client.enemy.position.xPos,client.enemy.position.yPos)
    //   if (client.enemy.keys.d.pressed) {
    //     client.enemy.velocity.x = 2;
    //     client.enemy.position.xPos += client.enemy.velocity.x;        
    //   }
    //   if (client.enemy.keys.a.pressed) {
    //     client.enemy.velocity.x = 2;
    //     client.enemy.position.xPos -= client.enemy.velocity.x;
    //   }
    //   if(client.enemy.yPos + client.enemy.h + client.enemy.velocity.y >= context.canvas.height){
    //     client.enemy.velocity.y = 0
    //   } else client.enemy.velocity.y += client.enemy.gravity
    // }
    if (context != null) {  
          clearBackground(context);
          drawEnemyBox(context, client.enemy.position.xPos, client.enemy.position.yPos);
          drawSelf(context, client.self.position.xPos, client.self.position.yPos);
          
          // Enemy
          if (client.enemy.keys.d.pressed) {
            client.users.send(
              JSON.stringify({
                type: "enemySyncPosition",
                name: client.enemy,
                userID: paramsID,
              })
            );
            client.enemy.velocity.x = 2;
            client.enemy.position.xPos += client.enemy.velocity.x;
          }
          if (client.enemy.keys.a.pressed) {
            client.users.send(
              JSON.stringify({
                type: "enemySyncPosition",
                name: client.enemy,
                userID: paramsID,
              })
            );
            client.enemy.velocity.x = 4 ;
            client.enemy.position.xPos -= client.enemy.velocity.x;
          }
          if (client.enemy.keys.d.pressed) {
            client.enemy.velocity.x = 2;
            client.enemy.position.xPos += client.enemy.velocity.x;
          }
         //Self 
                 if (client.self.keys.d.pressed) {
            client.users.send(
              JSON.stringify({
                type: "selfySyncPosition",
                name: client.self,
                userID: paramsID,
              })
            );
            client.self.velocity.x = 2;
            client.self.position.xPos += client.self.velocity.x;
          }
          if (client.self.keys.a.pressed) {
            client.users.send(
              JSON.stringify({
                type: "selfySyncPosition",
                name: client.self,
                userID: paramsID,
              })
            );
            client.self.velocity.x = 4 ;
            client.self.position.xPos -= client.self.velocity.x;
          }
          if (client.self.keys.d.pressed) {
            client.self.velocity.x = 2;
            client.self.position.xPos += client.self.velocity.x;
          }


          client.enemy.position.yPos += client.enemy.velocity.y;
          client.self.position.yPos += client.self.velocity.y;
          // enemy.position.yPos += enemy.velocity.y;

          if (client.enemy.position.yPos + client.enemy.h + client.enemy.velocity.y >= context.canvas.height) {
            client.enemy.velocity.y = 0;
          } else client.enemy.velocity.y += client.enemy.gravity;

          if (client.self.position.yPos + client.self.h + client.self.velocity.y >= context.canvas.height) {
            client.self.velocity.y = 0;
          } else client.self.velocity.y += client.self.gravity;

          // if(client.self.keys.d.pressed){
          //   console.log('down key is pressed')
          //   console.log(client.self.keys.d.pressed)
          // }
          // if (client.self.keys.d.pressed) {
          //   client.self.velocity.x = 2;
          //   client.self.position.xPos += client.self.velocity.x;        
          // }
          // if (client.self.keys.a.pressed) {
          //   client.self.velocity.x = 4;
          //   client.self.position.xPos -= client.self.velocity.x;
          // }
          // if(client.self.yPos + client.self.h + client.self.velocity.y >= context.canvas.height){
          //   client.self.velocity.y = 0
          // } else client.self.velocity.y += client.self.gravity
        
        }
  };


  
  useEffect(()=>{
    const context = canvasRef.current?.getContext("2d");
    
    if(context != null){
      
      clearBackground(context)
    drawEnemyBox(context,client.enemy.position.xPos,client.enemy.position.yPos);
    drawSelf(context, client.self.position.xPos, client.self.position.yPos);
    if (client.enemy.keys.d.pressed) {
      client.enemy.velocity.x = 2;
      client.enemy.position.xPos += client.enemy.velocity.x;        
    }
    if (client.enemy.keys.a.pressed) {
      client.enemy.velocity.x = 4;
      client.enemy.position.xPos -= client.enemy.velocity.x;
    }
    if(client.enemy.yPos + client.enemy.h + client.enemy.velocity.y >= context.canvas.height){
      client.enemy.velocity.y = 0
    } else client.enemy.velocity.y += client.enemy.gravity


    if(client.self.keys.d.pressed){
      
      console.log('down key is pressed')
    }
 
    if (client.self.keys.d.pressed) {
      client.self.velocity.x = 2;
      client.self.position.xPos += client.self.velocity.x;        
    }
    if (client.self.keys.a.pressed) {
      client.self.velocity.x = 4;
      client.self.position.xPos -= client.self.velocity.x;
    }
    if(client.self.yPos + client.self.h + client.self.velocity.y >= context.canvas.height){
      client.self.velocity.y = 0
    } else client.self.velocity.y += client.self.gravity
  }
},[])

  useEffect(() => {  
  

    
    if (a || d || w) {
      frame.current = requestAnimationFrame(animate);
      // console.log('SYNC',frame.current % 1000)
      
      return () => cancelAnimationFrame(frame.current);
    }
  }, [a, d, w,]);


  
  useEffect(() => {  
  

    
    if (a1 || d1 || w1) {
      frame.current = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(frame.current);
    }
  }, [a1, d1, w1,]);









  const handlerKeyDown = (e: any) => {
    if(client.modalsInvitation.userID === paramsID.id){
      selfUpdate(e)
    }
    else  enemyUpdate(e);
  };
  
  const handlerKeyUp = (e: any) => {
    if(client.modalsInvitation.userID === paramsID.id){
      selfUpdate(e)
    } else enemyUpdate(e);

  };
  useEffect(() => {
    if (effectRan.current === false) {
      window.addEventListener("keydown", handlerKeyDown);
      window.addEventListener("keyup", handlerKeyUp);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <>
      <div className="flex gap-4">
        <div className="border-2 mt-4">
          {client.enemy.keys.a.pressed ? (
            <div className="text-red-200">A</div>
          ) : (
            <div className="text-black-200">A</div>
          )}
        </div>
        <div className="border-2 mt-2 flex items-center">
          {client.enemy.keys.w.pressed ? (
            <div className="text-red-200">W</div>
          ) : (
            <div className="text-black-200">W</div>
          )}
        </div>
        <div className="border-2 mt-4">
          {client.enemy.keys.d.pressed ? (
            <div className="text-red-200">D</div>
          ) : (
            <div className="text-black-200">D</div>
          )}
        </div>
      </div>
      <div>X position:{client.enemy.position.xPos}</div>
      <div>Y position:{client.enemy.position.yPos}</div>
      <div>W position:{client.enemy.position.wPos}</div>
      
      {/* <div>X position:{client.self.position.xPos}</div>
      <div>Y position:{client.self.position.yPos}</div>
      <div>W position:{client.self.position.wPos}</div> */}

      <canvas ref={canvasRef} width={900} height={576}>
        Oops! Your browser doesn't support the canvas component.
      </canvas>
    </>
  );
}
