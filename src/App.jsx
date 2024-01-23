import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0)
 
// Datos de las butacas
var butacas = [
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
// Configuración del mapa
var config = {
  filas: 5,
  columnas: 9,
  ancho: 455,
  alto: 300
};
// hash para cambiar el color de la butaca
const colores = {
  disponible: () => { return '#DDD' },
  ocupado: () => { return '#F00' },
  reservado: () => { return '#8FED8F' }
};
// hash para cambiar el estado de la butaca
const estados = {
  disponible: 'reservado',
  ocupado: 'ocupaado',
  reservado: 'disponible'
};



// Creación del mapa
var svg = d3.select("#mapa")
  .append("svg")
  .attr("width", config.ancho)
  .attr("height", config.alto);

var btcs = svg.append("g");

// Creación de las butacas
var asientos = btcs.selectAll(".seat")
  .data(butacas)
  .enter()
  .append("rect")
  .attr("class", "seat")
  .attr("x", function (d) { return (d.columna.charCodeAt(0) - 65) * 50 + 20; })
  .attr("y", function (d) { return (d.fila - 1) * 50 + 20; })
  .attr("width", 30)
  .attr("height", 30)
  .style("fill", function (d) { return colores[d.estado](); })
  .style("stroke", "#555")
  .style("stroke-width", 1)
  .style("cursor", "pointer")
  .on("mouseover", function (d) {
      // Cambiar el color de la butaca al pasar el ratón por encima
      // console.log("columna:" + d.explicitOriginalTarget.x.baseVal.value)
      // console.log("fila:" + d.explicitOriginalTarget.y.baseVal.value)
      // console.log(String.fromCharCode(((d.explicitOriginalTarget.x.baseVal.value - 20) / 50 + 65)))
      // console.log((d.explicitOriginalTarget.y.baseVal.value - 20) / 50 + 1)
      butacas.filter(butaca => {
          if (butaca.fila == (d.explicitOriginalTarget.y.baseVal.value - 20) / 50 + 1 && butaca.columna == String.fromCharCode(((d.explicitOriginalTarget.x.baseVal.value - 20) / 50 + 65))) {
              if (butaca.estado == 'disponible') {
                  d3.select(this)
                      .style("fill", "#FFF");
              } else if (butaca.estado == 'reservado') {
                  d3.select(this).style("fill", colores[butaca.estado]());
              } else if (butaca.estado == 'ocupado') {
                  d3.select(this).style("fill", colores[butaca.estado]());
              }
          }
      })
  })
  .on("mouseout", function (d) {
      // Restaurar el color de la butaca al quitar el ratón de encima
      // console.log("columna:" + d.explicitOriginalTarget.x.baseVal.value)
      // console.log("fila:" + d.explicitOriginalTarget.y.baseVal.value)
      // console.log(String.fromCharCode(((d.explicitOriginalTarget.x.baseVal.value - 20) / 50 + 65)))
      // console.log((d.explicitOriginalTarget.y.baseVal.value - 20) / 50 + 1)
      butacas.filter(butaca => butaca.estado == 'disponible').forEach(butaca => {
          asientos.filter(asiento => asiento.fila == butaca.fila && asiento.columna == butaca.columna)
              .style("fill", colores[butaca.estado]());
      });
  })
  .on("click", function (d) {
      // Cambiar el color de la butaca al hacer clic en ella
      butacas.every(butaca => {
          if (butaca.fila == (d.explicitOriginalTarget.y.baseVal.value - 20) / 50 + 1 && butaca.columna == String.fromCharCode(((d.explicitOriginalTarget.x.baseVal.value - 20) / 50 + 65))) {
              butaca.estado = estados[butaca.estado]
              if (butaca.estado == 'disponible') {
                  d3.select(this).style("fill", colores[butaca.estado]());
                  return false;
              } else if (butaca.estado == 'reservado') {
                  d3.select(this).style("fill", colores[butaca.estado]());
                  return false;
              }
          }
          return true;
      })

  });

// Orientación de las butacas
btcs.append("rect")
  .attr("x", 20)
  .attr("y", 270)
  .attr("width", 430)
  .attr("height", 25)
  .attr("fill", "#00D020")
  .attr("stroke", "#000");

btcs.append("text")
  .text("cancha")
  .attr("x", 210)
  .attr("y", 288)
  .attr("font-size", "16px")
  .attr("fill", "#FFF")
  .style("font-family", "Arial, Helvetica, sans-serif");
  
  return (
    <>
      {/* <div ref={esta}>a</div> */}
      {/* Aquí se inyecta el SVG del estadio */}
      <div>2</div>
      {/*  aquí se inyecta el SVG del site map */}
      <div id="mapa">a</div>
      
    </>
  )
}

export default App
