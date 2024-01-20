import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";

const data = [
    {
        name: 'foo',
        number: 9000
    },
    {
        name: 'bar',
        number: 2340
    },
    {
        name: 'baz',
        number: 3463
    },
    {
        name: 'hoge',
        number: 7654
    },
    {
        name: 'piyo',
        number: 8746
    },
]

const dimensions = {
    width: 800,
    height: 500,
    chartWidth: 700,
    chartHeight: 400,
    marginLeft: 100
}

const Mgv3 = () => {

    const ref = useRef()
    const [selection, setSelection] = useState(null);

    const maxValue = d3.max(data, d=>d.number)

    const y = d3.scaleLinear()
        .domain([0,maxValue])
        .range([0,dimensions.chartHeight])

    const x = d3.scaleBand()
        .domain(data.map(d=>d.name))
        .range([0,dimensions.chartWidth])
        .paddingInner(0.05)
        // .paddingOuter(0.7)

    const yAxis = d3.axisLeft(y)
    const xAxis = d3.axisBottom(x)

    useEffect(()=>{
        if(!selection){
            setSelection(d3.select(ref.current))
        } else {
            const xAxisGroup = selection
                .append('g')
                .attr('transform',`translate(${dimensions.marginLeft},${dimensions.chartHeight})`)
                .call(xAxis)
            
            const yAxisGroup = selection
                .append('g')
                .attr('transform',`translate(${dimensions.marginLeft},0)`)
                .call(yAxis)

            // selection
            //     .append('rect')
            //     .attr('width',dimensions.width)
            //     .attr('height',dimensions.height)
            //     .attr('fill','blue')

            selection
                .append('g')
                .attr('transform',`translate(${dimensions.marginLeft},0)`)
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width',x.bandwidth)
                // .attr('x',(_,i) => i*100)
                .attr('x', d => x(d.name) )
                .attr('fill','orange')
                .attr('height',d => y(d.number))
        }
    },[selection])

    return (
        <>
            <div>
                <svg ref={ref} width={dimensions.width} height={dimensions.height}>
                    
                </svg>
            </div>
        </>
    )
}

export default Mgv3