import { useState, useLayoutEffect } from 'react';
import getWindowDimensions from '../RoomActions/WindowDimension/WindoDimension';
export default function useWindowDimensions() {
                    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
                  
                    useLayoutEffect(() => {
                      function handleResize() {
                        setWindowDimensions(getWindowDimensions());
                      }
                  
                      window.addEventListener('resize', handleResize);
                      return () => window.removeEventListener('resize', handleResize);
                    }, []);
                  
                    return windowDimensions;
                  }