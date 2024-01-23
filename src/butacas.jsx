import React from 'react'
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

let seat = [
    { fila: 1, columna: "A", estado: 'disponible' },
    { fila: 1, columna: "B", estado: 'ocupado' },
    { fila: 1, columna: "C", estado: 'disponible' },
    { fila: 1, columna: "D", estado: 'disponible' },
    { fila: 1, columna: "E", estado: 'disponible' },
    { fila: 1, columna: "F", estado: 'disponible' },
    { fila: 1, columna: "G", estado: 'disponible' },
    { fila: 1, columna: "H", estado: 'disponible' },
    { fila: 1, columna: "I", estado: 'disponible' },
    { fila: 2, columna: "A", estado: 'disponible' },
    { fila: 2, columna: "B", estado: 'ocupado' },
    { fila: 2, columna: "C", estado: 'disponible' },
    { fila: 2, columna: "D", estado: 'disponible' },
    { fila: 2, columna: "E", estado: 'disponible' },
    { fila: 2, columna: "F", estado: 'disponible' },
    { fila: 2, columna: "G", estado: 'disponible' },
    { fila: 2, columna: "H", estado: 'disponible' },
    { fila: 2, columna: "I", estado: 'disponible' },
    { fila: 3, columna: "A", estado: 'ocupado' },
    { fila: 3, columna: "B", estado: 'disponible' },
    { fila: 3, columna: "C", estado: 'disponible' },
    { fila: 3, columna: "D", estado: 'disponible' },
    { fila: 3, columna: "E", estado: 'ocupado' },
    { fila: 3, columna: "F", estado: 'disponible' },
    { fila: 3, columna: "G", estado: 'disponible' },
    { fila: 3, columna: "H", estado: 'disponible' },
    { fila: 3, columna: "I", estado: 'disponible' },
    { fila: 4, columna: "A", estado: 'disponible' },
    { fila: 4, columna: "B", estado: 'disponible' },
    { fila: 4, columna: "C", estado: 'disponible' },
    { fila: 4, columna: "D", estado: 'ocupado' },
    { fila: 4, columna: "E", estado: 'disponible' },
    { fila: 4, columna: "F", estado: 'disponible' },
    { fila: 4, columna: "G", estado: 'disponible' },
    { fila: 4, columna: "H", estado: 'disponible' },
    { fila: 4, columna: "I", estado: 'disponible' },
    { fila: 5, columna: "A", estado: 'disponible' },
    { fila: 5, columna: "B", estado: 'disponible' },
    { fila: 5, columna: "C", estado: 'disponible' },
    { fila: 5, columna: "D", estado: 'disponible' },
    { fila: 5, columna: "E", estado: 'disponible' },
    { fila: 5, columna: "F", estado: 'disponible' },
    { fila: 5, columna: "G", estado: 'ocupado' },
    { fila: 5, columna: "H", estado: 'disponible' },
    { fila: 5, columna: "I", estado: 'disponible' }
];

const dimensions = {
    filas: 5,
    columnas: 9,
    ancho: 455,
    alto: 300
}
const colors = {
    disponible: () => { return '#DDD' },
    ocupado: () => { return '#F00' },
    reservado: () => { return '#8FED8F' }
};
const status = {
    disponible: 'reservado',
    ocupado: 'ocupaado',
    reservado: 'disponible'
};

export const Butacas = () => {
    const ref = useRef()
    const [selection, setSelection] = useState(null);
    const [seating, setSeating] = useState(null);


    useEffect(() => {
      if(!selection){
        setSelection(d3.select(ref.current))
      } else {
        const group = selection
            .append('g')
        const seating = group
            .selectAll('.seat')
            .data(seat)
            .enter()
            .append('rect')
            .attr("class", "seat")
            .attr("x", function (d) { return (d.columna.charCodeAt(0) - 65) * 50 + 20; })
            .attr("y", function (d) { return (d.fila - 1) * 50 + 20; })
            .attr("width", 30)
            .attr("height", 30)
            .style("fill", function (d) { return colors[d.estado](); })
            .style("stroke", "#555")
            .style("stroke-width", 1)
            .style("cursor", "pointer")
            .on("mouseover", function (d) {
                //asi si console.log(d.target.__data__.fila) //asi no (d.explicitOriginalTarget.y.baseVal.value - 20) / 50 + 1
                //asi si console.log(d.target.__data__.columna) //asi no String.fromCharCode(((d.explicitOriginalTarget.x.baseVal.value - 20) / 50 + 65))
                seat.filter(seat => {
                    // if (seat.fila == (d.explicitOriginalTarget.y.baseVal.value - 20) / 50 + 1 && seat.columna == String.fromCharCode(((d.explicitOriginalTarget.x.baseVal.value - 20) / 50 + 65))) {
                    if (seat.fila == d.target.__data__.fila && seat.columna == d.target.__data__.columna ) {
                        if (seat.estado == 'disponible') {
                            d3.select(this)
                                .style("fill", "#FFF");
                        } else if (seat.estado == 'reservado') {
                            d3.select(this).style("fill", colors[seat.estado]());
                        } else if (seat.estado == 'ocupado') {
                            d3.select(this).style("fill", colors[seat.estado]());
                        }
                    }
                })
            })
            .on("mouseout", function (d) {
                seat.filter(butaca => butaca.estado == 'disponible').forEach(butaca => {
                    seating.filter(asiento => asiento.fila == butaca.fila && asiento.columna == butaca.columna)
                        .style("fill", colors[butaca.estado]());
                });
            })
            .on("click", function (d) {
                seat.every(butaca => {
                    if (butaca.fila == d.target.__data__.fila && butaca.columna == d.target.__data__.columna) {
                        butaca.estado = status[butaca.estado]
                        if (butaca.estado == 'disponible') {
                            d3.select(this).style("fill", colors[butaca.estado]());
                            return false;
                        } else if (butaca.estado == 'reservado') {
                            d3.select(this).style("fill", colors[butaca.estado]());
                            return false;
                        }
                    }
                    return true;
                })
            });
        setSeating(seating)
            // Linea verde de orientacion pantalla
            group.append('rect')
                .attr("x", 20)
                .attr("y", 270)
                .attr("width", 430)
                .attr("height", 25)
                .attr("fill", "#00D020")
                .attr("stroke", "#000")
            group.append("text")
                .text("pantalla")
                .attr("x", 210)
                .attr("y", 288)
                .attr("font-size", "16px")
                .attr("fill", "#FFF")
                .style("font-family", "Arial, Helvetica, sans-serif");
            
            

      }
    }, [selection])
    
    const reservarButacas = () => {

        console.log("butacas reservadas: ", seat.filter(butaca => butaca.estado == 'reservado').length);
        if (!seat.filter(butaca => butaca.estado == 'reservado').length > 0) {
            return alert("No se pueden reservar las butacas porque no hay ninguna butaca seleccionada");
        } else {
            seat.filter(butaca => butaca.estado == 'reservado').forEach(butaca => {
                butaca.estado = 'ocupado';
                seating.filter(asiento => asiento.fila == butaca.fila && asiento.columna == butaca.columna)
                    .style("fill", colors[butaca.estado]());
            });
        }
        console.log("butacas ocupadas: ", seat.filter(butaca => butaca.estado == 'reservado').length);
    };
    const cancelarReservas = () => {
        console.log("butacas reservadas: ", seat.filter(butaca => butaca.estado == 'reservado').length);
        if (!seat.filter(butaca => butaca.estado == 'reservado').length > 0) {
            return alert("No se pueden cancelar las reservas porque no hay ninguna butaca seleccionada");
        }
        seat.filter(butaca => butaca.estado == 'reservado').forEach(butaca => {
            butaca.estado = 'disponible';
            seating.filter(asiento => asiento.fila == butaca.fila && asiento.columna == butaca.columna)
                .style("fill", colors[butaca.estado]());
        });
        console.log("butacas canceladas: ", seat.filter(butaca => butaca.estado == 'reservado').length);
    };

    return (
        <>
        <h1>butacas</h1>
        <svg 
            ref={ref}
            width={dimensions.ancho}
            height={dimensions.alto}    
        />
        <br />
        <button onClick={reservarButacas}>Reservar Butacas</button>
        <button onClick={cancelarReservas}>Cancelar Reservar</button>
        </>

    )
}
