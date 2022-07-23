import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  const { width, height } = getWindowDimensions();
  // console.log('what')
  const effectRan = useRef(false);
  const frame = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramsID = useParams();
  // const context = canvasRef.current?.getContext("2d");
  const client = useSelector((state: State) => state.bank);
  const dispatch = useDispatch();
  const { enemyUpdate } = bindActionCreators(actionCreators, dispatch);
  const { pressed: a } = client.enemy.keys.a;
  const { pressed: d } = client.enemy.keys.d;
  const { pressed: w } = client.enemy.keys.w;


  const animate = (): void => {
    frame.current = requestAnimationFrame(animate);
    client.users.send(
      JSON.stringify({
        type: "enemySyncPosition",
        name: client.enemy,
        userID: paramsID,
      })
    );
    console.log(frame)
    if (client.enemy.keys.d.pressed) {
      client.enemy.velocity.x = 2;
      client.enemy.position.xPos += client.enemy.velocity.x;
    }
    if (client.enemy.keys.a.pressed) {
      client.enemy.velocity.x = 2;
      client.enemy.position.xPos -= client.enemy.velocity.x;
    }
  };



  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    
    if(context != null){
      context.fillStyle = 'black' 
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    if (a || d || w) {
      
      frame.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame.current);
    }
  }, [a, d, w]);


















  const handlerKeyDown = (e: any) => {
    enemyUpdate(e);
  };

  const handlerKeyUp = (e: any) => {
    enemyUpdate(e);
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
      <canvas ref={canvasRef} width={900} height={576}>
        Oops! Your browser doesn't support the canvas component.
      </canvas>
    </>
  );
}
