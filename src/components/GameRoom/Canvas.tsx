import { useEffect, useState, useRef,useLayoutEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import getWindowDimensions from "./../../RoomActions/WindowDimension/WindoDimension";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { State } from "../../state";

export interface Point2D {
  x: number;
  y: number;
}
interface Pos2D {
  boxX: number;
  boxY: number;
}

export default function Canvas() {
  // console.log('what')
  const effectRan = useRef(false)
  const frame = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramsID = useParams();



 const client = useSelector((state: State) => state.bank);
  const dispatch = useDispatch();
  const {  enemyUpdate } = bindActionCreators(actionCreators, dispatch);
  const { pressed:a } = client.enemy.keys.a
  const { pressed:d } = client.enemy.keys.d
  const { pressed:w } = client.enemy.keys.w
// console.log('SHOW WHAT YOU HAVE',pressed)
// console.log(client?.modalsInvitation?.userID,)
  const animate = () => {
    frame.current = requestAnimationFrame(animate);
    const start = Date.now()
    // console.log(start)
    
    
      client.users.send(JSON.stringify({
        type:'enemySyncPosition',
        name:client.enemy,
        userID:paramsID,
      }))
    // }
    
    if (client.enemy.keys.d.pressed) {
            client.enemy.velocity.x = 2;
            client.enemy.position.xPos += client.enemy.velocity.x;
    }
    if (client.enemy.keys.a.pressed) {
      client.enemy.velocity.x = 2;
      client.enemy.position.xPos -= client.enemy.velocity.x;
    }

    // console.log(start % 1000)
    // animationHandler();
    // console.log('what are the frames')
    // console.log('frames')
    // console.log(start%1000)
    // update ref to new animation frame ID
    
    
  };
  


  useEffect(() => {
  if(a || d || w){
    // console.log('how much')
    // console.log('canvasRef',canvasRef)
    frame.current = requestAnimationFrame(animate);
   
    // kill animation cycle on component unmount
    return () => cancelAnimationFrame(frame.current);
  }
 

  // start animation on first render
}, [a,d,w]);

// console.log(frame)
// console.log(paramsID)
// console.log(client)
const handlerKeyDown = (e:any)=>{

  // console.log(client)
  enemyUpdate(e)
}

const  handlerKeyUp = (e:any)=>{
  enemyUpdate(e)
}

useEffect(()=>{
  if(effectRan.current === false){

    window.addEventListener('keydown',handlerKeyDown)
    window.addEventListener('keyup',handlerKeyUp)
  }
  return ()=> {
    effectRan.current = true
    // window.removeEventListener('keydown',handlerKeyDown)
    // window.removeEventListener('keydup',handlerKeyUp)
  }
},[])


  // useEffect(()=>{
  //   if(effectRan.current === false){
  //     console.log(effectRan)
  //     window.addEventListener("keydown", (e)=>{console.log(e.key)});

  //   }
  //    return () => {
  //     window.removeEventListener('keydown',()=>{})
  //     effectRan.current = true
  //   }
    
  // },[])
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const client = useSelector((state: State) => state.bank);
  // const dispatch = useDispatch();
  // const { playersJoinned, playerChat, userSetName, setUser, InvitationModal } =
  //   bindActionCreators(actionCreators, dispatch);

  // const [counter, setCounter] = useState(0);
  // const { width, height } = getWindowDimensions();
  // const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  // const [box, setBox] = useState({
  //   position: {
  //     xPos: 0,
  //     yPos: 0,
  //   },
  //   velocity: {
  //     x: 0,
  //     y: 0,
  //   },
  //   h: 150,
  //   gravity: 0.2,
  //   keys: {
  //     a: {
  //       pressed: false,
  //     },
  //     d: {
  //       pressed: false,
  //     },
  //     w: {
  //       pressed: false,
  //     },
  //     s: {
  //       pressed: false,
  //     },
  //   },
  // });
  // const [enemy, setEnemy] = useState({
  //   position: {
  //     xPos: 0,
  //     yPos: 0,
  //   },
  //   velocity: {
  //     x: 0,
  //     y: 0,
  //   },
  //   h: 150,
  //   gravity: 0.2,
  //   keys: {
  //     a: {
  //       pressed: false,
  //     },
  //     d: {
  //       pressed: false,
  //     },
  //     w: {
  //       pressed: false,
  //     },
  //     s: {
  //       pressed: false,
  //     },
  //   },
  // });
  // useEffect(() => {
  //   const aniFrameId = requestAnimationFrame(renderFrame);
  //   window.addEventListener("keydown", handlePressKeyDown);
  //   window.addEventListener("keyup", handlePressKeyUp);
  //   // console.log("ENEMY:");
  //   // console.log(client)
  // // setInterval(()=>{
  // //     client.users?.send(JSON.stringify({
  // //     type:'enemySyncPosition',
  // //     enemy:box,
  // //     id:paramsID,
  // //   }))
  // // },3000)
  //   console.log('first')
  //   return () => {
  //     window.removeEventListener("keydown", handlePressKeyDown);
  //     window.removeEventListener("keyup", handlePressKeyUp);
  //     window.cancelAnimationFrame(aniFrameId);
  //   };
  // }, [counter]);

  // function renderFrame(): void {
  //   const context = canvasRef.current?.getContext("2d");
  //   if (context != null) {
  //     clearBackground(context);
  //     drawBox(context, box.position.xPos, box.position.yPos);
  //     drawEnemyBox(context, box.position.xPos, box.position.yPos); 
  //     if (enemy.keys.d.pressed) {
  //       box.velocity.x = 2;
  //       box.position.xPos += box.velocity.x;
  //     }
  //     if (enemy.keys.a.pressed) {
  //       box.velocity.x = 2;
  //       box.position.xPos -= box.velocity.x;
  //     }
  //     // Enemy
  //     if (box.keys.d.pressed) {
  //       box.velocity.x = 2;
  //       box.position.xPos += box.velocity.x;
  //     }
  //     if (box.keys.a.pressed) {
  //       box.velocity.x = 2;
  //       box.position.xPos -= box.velocity.x;
  //     }
  //     box.position.yPos += box.velocity.y;
  //     enemy.position.yPos += enemy.velocity.y;
  //     update();
  //     if (box.position.yPos + box.h + box.velocity.y >= context.canvas.height) {
  //       box.velocity.y = 0;
  //     } else box.velocity.y += box.gravity;
  //     if (
  //       enemy.position.yPos + enemy.h + enemy.velocity.y >=
  //       context.canvas.height
  //     ) {
  //       enemy.velocity.y = 0;
  //     } else enemy.velocity.y += enemy.gravity;
  //   }
  // }
  // const update = () => {
  //   // setInterval(()=>{
  //     setCounter((c) => c + 1);

  //   // },1000)
  // };
  // const clearBackground = (context: CanvasRenderingContext2D) => {
  //   const { width, height } = context.canvas;
  //   context.canvas.width = 1024;
  //   context.canvas.height = 576;

  //   context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  // };
  // const drawBox = (
  //   context: CanvasRenderingContext2D,
  //   xPos: number,
  //   yPos: number
  // ) => {
  //   // context.fillStyle = "green";
  //   // context.fillRect(xPos, yPos, 150, 100);
  //   context.fillStyle = "red";
  //   context.fillRect(xPos, yPos, 50, box.h);
  // };
  // const drawEnemyBox = (
  //   context: CanvasRenderingContext2D,
  //   xPos: number,
  //   yPos: number
  // ) => {
  //   // context.fillStyle = "green";
  //   // context.fillRect(xPos, yPos, 150, 100);
  //   context.fillStyle = "yellow";
  //   context.fillRect(xPos + 400, yPos, 50, box.h);
  // };

  // const handlePressKeyDown = (event: any) => {
  //   const { key } = event;
  //   switch (key) {
  //     case "d":
  //       console.log(key);
  //       console.log(box);

  //       setBox((prevState: any) => ({
  //         position: {
  //           ...prevState.position,
  //           xPos: prevState.position.xPos + 1,
  //         },
  //         velocity: {
  //           ...prevState.velocity,
  //           x: prevState.velocity.x + 10,
  //         },
  //         h: 150,
  //         gravity: 0.2,
  //         keys: {
  //           a: {
  //             pressed: false,
  //           },
  //           d: {
  //             pressed: true,
  //           },
  //           w: {
  //             pressed: false,
  //           },
  //           s: {
  //             pressed: false,
  //           },
  //         },
  //       }));
  //       break;
  //     case "a":
  //       console.log(client);
  //       console.log("event", box.keys);
  //       setBox((prevState: any) => ({
  //         position: {
  //           ...prevState.position,
  //           xPos: prevState.position.xPos - 1,
  //         },
  //         velocity: {
  //           ...prevState.velocity,
  //           x: prevState.velocity.x + 10,
  //         },
  //         h: 150,
  //         gravity: 0.2,
  //         keys: {
  //           a: {
  //             pressed: true,
  //           },
  //           d: {
  //             pressed: false,
  //           },
  //           w: {
  //             pressed: false,
  //           },
  //           s: {
  //             pressed: false,
  //           },
  //         },
  //       }));
  //       break;
  //     case "w":
  //       console.log("click w");
  //       console.log(box);
  //       setBox((prevState: any) => ({
  //         position: {
  //           ...prevState.position,
  //           xPos: prevState.position.xPos,
  //         },
  //         velocity: {
  //           ...prevState.velocity,
  //           y: prevState.velocity.y - 10,
  //         },
  //         h: 150,
  //         gravity: 0.2,
  //         keys: {
  //           ...prevState.keys,
  //           w: {
  //             pressed: true,
  //           },
  //         },
  //       }));
  //       console.log(box);
  //       break;
  //   }
  // };

  // const handlePressKeyUp = (event: any) => {
  //   switch (event.key) {
  //     case "d":
  //       console.log("event", box.keys);

  //       setBox((prevState: any) => ({
  //         position: {
  //           ...prevState.position,
  //           xPos: prevState.position.xPos,
  //         },
  //         velocity: {
  //           ...prevState.velocity,
  //           x: prevState.velocity.x + 10,
  //         },
  //         h: 150,
  //         gravity: 0.2,
  //         keys: {
  //           ...prevState.keys,
  //           d: (prevState.keys.d.pressed = false),
  //         },
  //       }));
  //       break;
  //     case "a":
  //       console.log("event", box.keys);

  //       setBox((prevState: any) => ({
  //         position: {
  //           ...prevState.position,
  //           xPos: prevState.position.xPos,
  //         },
  //         velocity: {
  //           ...prevState.velocity,
  //           x: prevState.velocity.x,
  //         },
  //         h: 150,
  //         gravity: 0.2,
  //         keys: {
  //           ...prevState.keys,
  //           a: (prevState.keys.a.pressed = false),
  //         },
  //       }));
  //       break;
  //     case "w":
  //       console.log("event on key UP", event.key);
  //       setBox((prevState: any) => ({
  //         position: {
  //           ...prevState.position,
  //           xPos: prevState.position.xPos,
  //         },
  //         velocity: {
  //           ...prevState.velocity,
  //           x: prevState.velocity.x,
  //         },
  //         h: 150,
  //         gravity: 0.2,
  //         keys: {
  //           ...prevState.keys,
  //           w: {
  //             pressed: false,
  //           },
  //         },
  //       }));
  //       console.log("W", box);
  //       break;
  //   }
  // };
  return (
    <>
    <div className="flex gap-4">

    <div className="border-2 mt-4">{client.enemy.keys.a.pressed ? <div className="text-red-200">A</div>:<div className="text-black-200">A</div> }</div>
    <div className="border-2 mt-2 flex items-center">{client.enemy.keys.w.pressed ? <div className="text-red-200">W</div>:<div className="text-black-200">W</div> }</div>
    <div className="border-2 mt-4">{client.enemy.keys.d.pressed ? <div className="text-red-200">D</div>:<div className="text-black-200">D</div> }</div>
    </div>
    <div>X position:{client.enemy.position.xPos}</div>
    <div>Y position:{client.enemy.position.yPos}</div>
    {/* <div>W position:{client.enemy.position.xPos}</div> */}
    <canvas ref={canvasRef}>
      
      Oops! Your browser doesn't support the canvas component.
    </canvas>
    </>
  );
}
