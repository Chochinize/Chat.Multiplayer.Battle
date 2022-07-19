import { useEffect, useState, useRef } from "react";
import getWindowDimensions from "./../../RoomActions/WindowDimension/WindoDimension";
export interface Point2D {
  x: number;
  y: number;
}
interface Pos2D {
  boxX: number;
  boxY: number;
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [counter, setCounter] = useState(0);
  const { width, height } = getWindowDimensions();
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  const [box, setBox] = useState({
    position: {
      xPos: 0,
      yPos: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    h: 150,
    gravity: 0.2,
    keys: {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      w:{
        pressed:false,
      },
      s:{
        pressed:false
      }
    },
  });

  useEffect(() => {
    requestAnimationFrame(renderFrame);
    window.addEventListener("keydown", handlePressKeyDown);
    window.addEventListener("keyup", handlePressKeyUp);
    return () => {
      window.removeEventListener("keydown", handlePressKeyDown);
      window.removeEventListener("keyup", handlePressKeyUp);
    };
  }, [counter]);

  function renderFrame(): void {
    const context = canvasRef.current?.getContext("2d");
    if (context != null) {
      clearBackground(context);
      drawBox(context, box.position.xPos, box.position.yPos);
      // setBox((prevState: any) => ({
      //   position: {
      //     ...prevState.position,
      //     xPos: prevState.position.xPos,
      //   },
      //   velocity: {
      //     ...prevState.velocity,
      //     x: prevState.velocity.x + 10,
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
      //     w:{
      //       pressed:false
      //     },
      //     s:{
      //       pressed:false
      //     }
      //   },
      // }));

      if(box.keys.d.pressed){
        box.velocity.x = 2;
        box.position.xPos += box.velocity.x
      }
      if(box.keys.a.pressed){
        box.velocity.x = 2;
        box.position.xPos -= box.velocity.x
      }
      box.position.yPos += box.velocity.y;
      update();
      if (box.position.yPos + box.h + box.velocity.y >= context.canvas.height) {
        box.velocity.y = 0;
      } else box.velocity.y += box.gravity;
    }
  }
  const update = () => {
    setCounter((c) => c + 1);
  };
  const clearBackground = (context: CanvasRenderingContext2D) => {
    const { width, height } = context.canvas;
    context.canvas.width = 1024;
    context.canvas.height = 576;

    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };
  const drawBox = (
    context: CanvasRenderingContext2D,
    xPos: number,
    yPos: number
  ) => {
    // context.fillStyle = "green";
    // context.fillRect(xPos, yPos, 150, 100);
    context.fillStyle = "red";
    context.fillRect(xPos, yPos, 50, box.h);
  };

  const handlePressKeyDown = (event: any) => {
    const { key } = event;
    switch (key) {
      case "d":
        console.log(key);
        console.log(box);

        
        setBox((prevState: any) => ({
          position: {
            ...prevState.position,
            xPos: prevState.position.xPos+1,
          },
          velocity: {
            ...prevState.velocity,
            x: prevState.velocity.x + 10,
          },
          h: 150,
          gravity: 0.2,
          keys: {
            a: {
              pressed: false,
            },
            d: {
              pressed: true,
            },
            w:{
              pressed:false
            },
            s:{
              pressed:false
            }
          }
        }));
        break;
        case 'a':
          console.log("event",box.keys);
          setBox((prevState: any) => ({
            position: {
              ...prevState.position,
              xPos: prevState.position.xPos-1,
            },
            velocity: {
              ...prevState.velocity,
              x: prevState.velocity.x + 10,
            },
            h: 150,
            gravity: 0.2,
            keys: {
              a: {
                pressed: true,
              },
              d: {
                pressed: false,
              },
              w:{
                pressed:false
              },
              s:{
                pressed:false
              }
            }
          }));
        break;
        case 'w':
        console.log('click w')
        console.log(box)
        setBox((prevState: any) => ({
          position: {
            ...prevState.position,
            xPos: prevState.position.xPos,
          },
          velocity: {
            ...prevState.velocity,
            y: prevState.velocity.y - 10,
          },
          h: 150,
          gravity: 0.2,
          keys: {
            ...prevState.keys,
            w:{
              pressed:true
            }
          },
        }));
        console.log(box)
        break;
    }
  };

  const handlePressKeyUp = (event: any) => {
    switch (event.key) {
      case "d":
        console.log("event",box.keys);
        
        setBox((prevState: any) => ({
          position: {
            ...prevState.position,
            xPos: prevState.position.xPos,
          },
          velocity: {
            ...prevState.velocity,
            x: prevState.velocity.x + 10,
          },
          h: 150,
          gravity: 0.2,
          keys: {
            ...prevState.keys,
            d:prevState.keys.d.pressed = false
          },
        }));
        break;
        case "a":
          console.log("event",box.keys);
          
          setBox((prevState: any) => ({
            position: {
              ...prevState.position,
              xPos: prevState.position.xPos,
            },
            velocity: {
              ...prevState.velocity,
              x: prevState.velocity.x,
            },
            h: 150,
            gravity: 0.2,
            keys: {
              ...prevState.keys,
              a:prevState.keys.a.pressed = false
            },
          }));
          break;
        case "w":

        console.log('event on key UP', event.key)
          setBox((prevState: any) => ({
            position: {
              ...prevState.position,
              xPos: prevState.position.xPos,
            },
            velocity: {
              ...prevState.velocity,
              x: prevState.velocity.x,
            },
            h: 150,
            gravity: 0.2,
            keys: {
              ...prevState.keys,
              w:{
                pressed:false
              }
            },
          }));
          console.log('W', box)
          break;
       
    }
  };
  return (
    <canvas ref={canvasRef}>
      Oops! Your browser doesn't support the canvas component.
    </canvas>
  );
}
