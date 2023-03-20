import { useState } from 'react';
import './App.css';
import html2canvas from 'html2canvas'
function App() {
  const [linea1,setLinea1] = useState('');
  const [linea2,setLinea2] = useState('');
  const [img,setImg] = useState('');

  const onChangeLinea1 = function(valor){
     setLinea1(valor.target.value)
  }
  const onChangeLinea2 = function(valor){
    setLinea2(valor.target.value)
 }
  const onChangeImg = function(valor){
  setImg(valor.target.value)
}
  const onClickExportar =function(evento){
    
    html2canvas(document.querySelector("#meme")).then(canvas=>{
     // document.body.appendChild(canvas)
     var img = canvas.toDataURL("image/png");

     var link = document.createElement('a');
     link.download = "meme.png";
     link.href = img  
     link.click();
    });
  }
  /*////////sd///////////
   PARA MOVIMIENTO DE SPANS
  /////////////////////*/

        // esto modifica el font size:
        const [fontSize, setFontSize] = useState(16); // Valor inicial de font size es 16
        const handleFontSizeChange = (event) => {
          setFontSize(parseInt(event.target.value)); // Actualiza el estado con el nuevo valor de font size
        };
 // Creamos el estado inicial de la posición del span
 const [position, setPosition] = useState({ x: 900, y: 300 });
 // Este es el manejador de eventos que se llama cuando se hace clic en el div
 const handleMouseDown = (event) => {
   // Evitamos que el navegador seleccione el div al hacer clic en él
   event.preventDefault();
   // Guardamos la posición actual del mouse en el estado
   setPosition({
     x: event.clientX,
     y: event.clientY,
   });
   // Agregamos los manejadores de eventos para el movimiento del mouse y el soltar el clic
   document.addEventListener('mousemove', handleMouseMove);
   document.addEventListener('mouseup', handleMouseUp);
 };
 // Este es el manejador de eventos que se llama cuando se suelta el clic del mouse
 const handleMouseUp = () => {
   // Quitamos los manejadores de eventos para el movimiento del mouse y el soltar el clic
   document.removeEventListener('mousemove', handleMouseMove);
   document.removeEventListener('mouseup', handleMouseUp);
 };
 // Este es el manejador de eventos que se llama cuando se mueve el mouse
 const handleMouseMove = (event) => {
   // Calculamos la diferencia entre la posición actual del mouse y la posición anterior del mouse
   const dx = event.clientX - position.x;
   const dy = event.clientY - position.y;
   // Actualizamos la posición del div en el estado
   setPosition({
     x: position.x + dx,
     y: position.y + dy,
   });
 };

 // Creamos un objeto de estilo para el span que incluye la posición actual del div y un cursor de "mover"
 const spanStyle = {
  position: 'absolute',
  left: position.x,
  top: position.y,
  cursor: 'move',
  fontSize: `${fontSize}px`, 
 };
 //creamos la función para el otro span
 const [position2, setPosition2] = useState({ x: 900, y: 600 });
 const handleMouseDown2 = (event) => {
  event.preventDefault();
  setPosition2({
    x: event.clientX,
    y: event.clientY,
  });
  document.addEventListener('mousemove', handleMouseMove2);
  document.addEventListener('mouseup', handleMouseUp2);
};

const handleMouseUp2 = () => {
  document.removeEventListener('mousemove', handleMouseMove2);
  document.removeEventListener('mouseup', handleMouseUp2);
};

const handleMouseMove2 = (event) => {
  const dx = event.clientX - position2.x;
  const dy = event.clientY - position2.y;
  setPosition2({
    x: position2.x + dx,
     y: position2.y + dy,
  });
};
const spanStyle2 = {
  position: 'absolute',
  left: position2.x,
  top: position2.y,
  cursor: 'move',
  fontSize: `${fontSize}px`, 
};
 

 // Renderizamos el div con los manejadores de eventos y el objeto de estilo
  return (
    <div className="App">
      <p>Generador de memes! Por favor, seleccione la plantilla (sitio diseñado solo para pc)</p>

      <br></br>
      <div className="header">
        <div className="formulario">
          <select onChange={onChangeImg}>
            <option value="1">calamardo</option>
            <option value="2">drake</option>
            <option value="3">spiderman</option>
          </select>
          <input onChange={onChangeLinea1} type="text" value={linea1} placeholder="escribe la linea 1"/>
          <br></br>
          <input onChange={onChangeLinea2} type="text" value={linea2} placeholder="escribe la linea 2"/>
          <br></br>
          <button onClick={onClickExportar}>Exportar</button>
        </div>
        <div className="edicion">
          <h1>edición:</h1>
          <h2>Tamaño de fuente:</h2>
          <input className="fontsize" type="number" min="1" max="100" value={fontSize} onChange={handleFontSizeChange} />
          </div>
      </div>
      <div className="meme" id="meme">
        <span 
        className="letra" 
        style={spanStyle}
        onMouseDown={handleMouseDown}>
          {linea1}
        </span>
        <span 
        className="letra"
        style={spanStyle2}
        onMouseDown={handleMouseDown2}>
          {linea2}
        </span>
        <img src={"/img/"+img+".jpg"} />
      </div>
    </div>
  );
}

export default App;
