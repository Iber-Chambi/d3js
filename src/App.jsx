import { useState } from 'react'
import * as d3 from "d3";
import { useRef, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0)
  // TODO INTENTO DE PASAR JS STADIUM A REACT
  let seccionesEstadio = [
    {
      nombre: "Curva Norte",
      nivelSuperior: {
        x: 80,
        y: 50,
        ancho: 200,
        alto: 300
      },
      nivelInferior: {
        x: 80,
        y: 50,
        ancho: 200,
        alto: 300
      }
    },
    {
      nombre: "Curva Sur",
      nivelSuperior: {
        x: 300,
        y: 50,
        ancho: 200,
        alto: 300
      },
      nivelInferior: {
        x: 300,
        y: 50,
        ancho: 200,
        alto: 300
      }
    },
    {
      nombre: "Recta General",
      nivelSuperior: {
        x: 182,
        y: 26,
        ancho: 215,
        alto: 95
      },
      nivelInferior: {
        x: 182,
        y: 123,
        ancho: 215,
        alto: 150
      }
    },
    {
      nombre: "Preferencia",
      nivelSuperior: {
        x: 190,
        y: 298,
        ancho: 200,
        alto: 150
      },
      nivelInferior: {
        x: 190,
        y: 327,
        ancho: 200,
        alto: 95
      }
    }
  ];

  let configStadio = {
    ancho: 585,
    alto: 450,
    margen: {
      superior: 10,
      inferior: 10,
      izquierdo: 10,
      derecho: 10
    }
  };

  var estadio = d3.select("#estadio");
  var svg = estadio.append("svg")
    .attr("width", configStadio.ancho)
    .attr("height", configStadio.alto);

  // Define la función para crear la forma de media dona
  var arcNortSup = d3.arc()
    // .padAngle(0.03)
    .innerRadius(126)
    .outerRadius(175)
    .startAngle(Math.PI * 1)
    .endAngle(Math.PI * 2);

  var arcNortInf = d3.arc()
    // .padAngle(0.05)
    .innerRadius(124)
    .outerRadius(50)
    .startAngle(Math.PI * 1)
    .endAngle(Math.PI * 2);

  var arcSurSup = d3.arc()
    // .padAngle(0.03)
    .innerRadius(126)
    .outerRadius(175)
    .startAngle(Math.PI * -1)
    .endAngle(Math.PI * -2);

  var arcSurInf = d3.arc()
    // .padAngle(0.05)
    .innerRadius(50)
    .outerRadius(124)
    .startAngle(Math.PI * -1)
    .endAngle(Math.PI * -2);

  // Crea un grupo para cada sección del estadio
  var secciones = svg.selectAll("g")
    .data(seccionesEstadio)
    .enter()
    .append("g");

  // Crea los elementos SVG para cada sección del estadio
  secciones.filter(function (d) { return d.nombre == "Curva Norte"; })
  .append("path").style("cursor", "pointer")
  .attr("d", arcNortSup)
  .attr("transform", function (d) {
      return "translate(" + (d.nivelSuperior.x + (d.nivelSuperior.ancho / 2)) + "," + (d.nivelSuperior.y + (d.nivelSuperior.alto / 2)) + ")";
  })
  .attr("id", "curvaNorteSup")
  .style("fill", "#AA0000")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en curva norte - superior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Curva Norte"; })
  .append("path").style("cursor", "pointer")
  .attr("d", arcNortInf)
  .attr("transform", function (d) {
      return "translate(" + (d.nivelInferior.x + (d.nivelInferior.ancho / 2)) + "," + (d.nivelInferior.y + (d.nivelInferior.alto / 2)) + ")";
  })
  .attr("id", "curvaNorteInf")
  .style("fill", "#FA0000")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en curva norte - inferior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Curva Sur"; })
  .append("path").style("cursor", "pointer")
  .attr("d", arcSurSup)
  .attr("transform", function (d) {
      return "translate(" + (d.nivelSuperior.x + (d.nivelSuperior.ancho / 2)) + "," + (d.nivelSuperior.y + (d.nivelSuperior.alto / 2)) + ")";
  })
  .attr("id", "curvaSurSup")
  .style("fill", "#00AA00")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en curva sur - superior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Curva Sur"; })
  .append("path").style("cursor", "pointer")
  .attr("d", arcSurInf)
  .attr("transform", function (d) {
      return "translate(" + (d.nivelInferior.x + (d.nivelInferior.ancho / 2)) + "," + (d.nivelInferior.y + (d.nivelInferior.alto / 2)) + ")";
  })
  .attr("id", "curvaSurInf")
  .style("fill", "#00FA00")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en curva sur - inferior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Recta General"; })
  .append("rect").style("cursor", "pointer")
  .attr("x", function (d) { return d.nivelSuperior.x; })
  .attr("y", function (d) { return d.nivelSuperior.y; })
  .attr("width", function (d) { return d.nivelSuperior.ancho; })
  .attr("height", function (d) { return d.nivelSuperior.alto / 2; })
  .style("fill", "#FAAA00")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en recta general - superior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Recta General"; })
  .append("rect").style("cursor", "pointer")
  .attr("x", function (d) { return d.nivelInferior.x; })
  .attr("y", function (d) { return d.nivelInferior.y - (d.nivelSuperior.alto / 2); })
  .attr("width", function (d) { return d.nivelInferior.ancho; })
  .attr("height", function (d) { return d.nivelInferior.alto / 2; })
  .style("fill", "#FAFA00")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en recta general - inferior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Preferencia"; })
  .append("rect").style("cursor", "pointer")
  .attr("x", function (d) { return d.nivelSuperior.x; })
  .attr("y", function (d) { return d.nivelSuperior.y - (d.nivelInferior.alto / 2); })
  .attr("width", function (d) { return d.nivelSuperior.ancho; })
  .attr("height", function (d) { return d.nivelSuperior.alto / 2; })
  .style("fill", "#0000FA")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en preferencia - superior");
      console.log(d);
  });

secciones.filter(function (d) { return d.nombre == "Preferencia"; })
  .append("rect").style("cursor", "pointer")
  .attr("x", function (d) { return d.nivelInferior.x; })
  .attr("y", function (d) { return d.nivelInferior.y; })
  .attr("width", function (d) { return d.nivelInferior.ancho; })
  .attr("height", function (d) { return d.nivelInferior.alto / 2; })
  .style("fill", "#0000AA")
  .style("stroke", "#000000")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en preferencia - inferior");
      console.log(d);
  });
/* asta aca parece funcionar */
// Define las propiedades del palcos
const palcos = {
  x: 215,
  y: 377,
  baseInf: 150,
  baseSup: 200,
  altura: 50
};

// Crea un array con los puntos del palcos
const points = [
  [palcos.x, palcos.y],
  [palcos.x + palcos.baseInf, palcos.y],
  [palcos.x + palcos.baseSup + (palcos.baseInf - palcos.baseSup) / 2, palcos.y + palcos.altura],
  [palcos.x + (palcos.baseInf - palcos.baseSup) / 2, palcos.y + palcos.altura],
  [palcos.x, palcos.y]
];

// Crea una función que genere un camino SVG
const lines = d3.line();

// Agrega el palcos a los sectores
svg.append("g")
  .append("path")
  .attr("d", lines(points))
  .attr("fill", "#00AFFF")
  .style("cursor", "pointer")
  .on("click", function (d) {
      console.log("click en palcos vip");
      console.log(d);
  });


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
var svg = d3.select("#mapa").append("svg")
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
      {/* Aquí se inyecta el SVG del estadio */}
      <div id="estadio">123</div>
      {/*  aquí se inyecta el SVG del site map */}
      <div id="mapa"></div>

    </>
  )
}

export default App
