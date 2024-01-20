import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";

/* const data = [
    { width: 200, height: 150, color: 'orange' }
] */

const data = [
    {
        units: 150,
        color: 'purple'
    },
    {
        units: 100,
        color: 'red'
    },
    {
        units: 50,
        color: 'blue'
    },
    {
        units: 70,
        color: 'teal'
    },
    {
        units: 120,
        color: 'orange'
    }
]


const Mgv2 = () => {

    const ref = useRef()
    const [selection, setSelection] = useState(null);

    /* useEffect(() => {
        if (!selection) {
            setSelection(d3.select(ref.current))
        } else {
            selection.append('rect')
                .attr('height', 100)
                .attr('width', 200)
                .attr('fill', 'purple')
        }
    }, [selection]) */

    /* useEffect(() => {
        if (!selection) {
            setSelection(d3.select(ref.current))
        } else {
            selection.data(data)
            .append('rect')
            .attr('width',d=>d.width)
            .attr('height',d=>d.height)
            .attr('fill',d=>d.color)
        }
    }, [selection]) */
    useEffect(() => {
        if (!selection) {
            setSelection(d3.select(ref.current))
        } else {
            const rects = selection.selectAll('rect')
                .data(data)
                .attr('width',100)
                .attr('height',d=>d.units)
                .attr('fill',d=>d.color)
                .attr('x', (_,i) =>  i*100  )

            rects.enter()
                .append('rect')
                .attr('width',100)
                .attr('height',d=>d.units)
                .attr('fill',d=>d.color)
                .attr('x', (_,i) =>  i*100  )

        }
    }, [selection])

    return (
        <>
            <div>
                <svg ref={ref} width={500}>
                    <rect />
                    <rect />
                    <rect />
                </svg>
            </div>
        </>
    )
}

export default Mgv2