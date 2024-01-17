import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Circles from './Circles.jsx'
import Margen from './Mg.jsx'
import LinePlot from './LinePlot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Circles /> */}
    <Margen />
    <LinePlot />
  </React.StrictMode>,
)
