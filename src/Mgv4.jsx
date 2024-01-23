import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";
// import randomstring from 'randomstring';

let initialData = [
    {
        name: 'foo',
        units: 32,
    },
    {
        name: 'bar',
        units: 67,
    },
    {
        name: 'baz',
        units: 81,
    },
    {
        name: 'hoge',
        units: 38,
    },
    {
        name: 'piyo',
        units: 28,
    },
    {
        name: 'hogera',
        units: 59,
    }
]

const dimensions = {
    width: 900,
    height: 600
}

const Mgv4 = () => {

    const ref = useRef()
    const [selection, setSelection] = useState(null);
    const [data, setData] = useState(initialData);


    let y = d3.scaleLinear()
        .domain([0,d3.max(data, d=>d.units)])
        .range([dimensions.height,0])

    let x = d3.scaleBand()
        .domain(data.map(d=>d.name))
        .range([0,dimensions.width])
        .paddingInner(0.05)

    useEffect(()=>{
        if(!selection){
            setSelection(d3.select(ref.current))
        } else {
             selection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width',x.bandwidth)
                .attr('height',0)
                .attr('fill','orange')
                .attr('x',d=>x(d.name))
                .attr('height',0)
                .attr('y',dimensions.height)
                .transition()
                .duration(500)
                .delay((_,i)=>i*100)
                .ease(d3.easeElastic)
                .attr('height',d=>dimensions.height - y(d.units))
                .attr('y',d=>y(d.units))

                
        }
    },[selection])

    useEffect(()=>{
        if(selection){
            y = d3.scaleLinear()
                .domain([0,d3.max(data, d=>d.units)])
                .range([dimensions.height,0])

            x = d3.scaleBand()
                .domain(data.map(d=>d.name))
                .range([0,dimensions.width])
                .paddingInner(0.05)
            
            const rects = selection.selectAll('rect').data(data)
                rects
                    .exit()
                    .transition()
                    .duration(300)
                    .attr('y',dimensions.height)
                    .attr('height',0)
                    .remove()
                rects
                    .transition()
                    .duration(300)
                    .delay(100)
                    .attr('width',x.bandwidth)
                    .attr('height',d=>dimensions.height - y(d.units))
                    .attr('x',d=>x(d.name))
                    .attr('y',d=>y(d.units))
                    .attr('fill','orange')
                rects
                    .enter()
                    .append('rect')
                    .attr('width',x.bandwidth)
                    .attr('height',0)
                    .attr('fill','orange')
                    .attr('x',d=>x(d.name))
                    .attr('y',dimensions.height)
                    .attr('height',0)
                    .transition()
                    .duration(500)
                    .delay(250)
                    .ease(d3.easeElastic)
                    .attr('y',d=>y(d.units))
                    .attr('height',d=>dimensions.height - y(d.units))


        }
    },[data])

    const addRandom = () => {
        console.log('random: ',`1desdks${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)
        const dataToBeAdded = {
            // name: randomstring.generate(10),
            name: `1desdks${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
            units: Math.floor(Math.random()*(80) + 20)
        }
        setData([...data,dataToBeAdded])
    }

    const removeLast = () => {
        if(data.length === 0){
            return
        }
        const slicedData = data.slice(0,data.length - 1)
        setData(slicedData)
    }

    return (
        <>
            <div>
                <svg 
                    ref={ref}
                    width={dimensions.width}
                    height={dimensions.height}
                />
                <button onClick={addRandom}>Add Random</button>
                <button onClick={removeLast}>Remove Last</button>
            </div>
        </>
    )
}

export default Mgv4