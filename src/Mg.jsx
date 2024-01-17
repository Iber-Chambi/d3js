import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";

const Margen = () => {

    const ref = useRef()
    
    useEffect(() => {
        const svgElement = d3.select(ref.current)
            .append("svg")
            .attr("width",500)
            .attr("height",500)
        const datos = [100,200,150,50,80]    
        svgElement.selectAll("rect")
        .data(datos)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return i * 60
        })
        .attr("y","20")
        .attr("width",50)
        .attr("height",function(d){return d})
        return () => {
            // Elimina el elemento SVG del DOM cuando el componente se desmonta
            svgElement.remove();
        };
    }, [])
    return (
        <>
            <div
                ref={ref}
            />
        </>
    )
}

export default Margen