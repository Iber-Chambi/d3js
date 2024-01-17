import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";
const generateDataset = () => {
    const numPoints = 10; // Puedes ajustar el número de puntos según tus necesidades
    const maxX = 100;
    const maxY = 50;
  
    // Generar un array de puntos aleatorios
    const newDataset = Array.from({ length: numPoints }, () => [
      Math.random() * maxX,
      Math.random() * maxY,
    ]);
  
    return newDataset;
  };
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
  
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
const Circles = () => {
    const [dataset, setDataset] = useState(
        generateDataset()
    )
    useInterval(() => {
        const newDataset = generateDataset()
        setDataset(newDataset)
    }, 2000)

    

    return (
        <>
            <svg viewBox="0 0 100 50">
                {dataset.map(([x, y], i) => (
                    <circle
                        cx={x}
                        cy={y}
                        r="3"
                    />
                ))}
            </svg>
        </>
    )
}

export default Circles