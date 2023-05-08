// Variables globales
var matrizSize;

// Crear matriz incial
Iniciar.addEventListener('click', (e)=>{
  matrizSize = document.getElementById('matrizSize').value;
  if(matrizSize === ''){
    let warning = document.getElementById('Warning');
    warning.innerHTML = `<p class="warning">Favor de específicar el tamaño de la matriz</p>`;
  } else {
    let html = document.getElementById('root');
    html.innerHTML = `<h1>Ingrese la matriz</h1>`;
    html.innerHTML = `<div id="grid-container"></div>`;
    html = document.getElementById('grid-container');
    CrearMatriz(matrizSize, html);
  }
});
// Fin crear matriz incial

//crear matriz


// Funciones extra
// Crear matriz inical y aniadirla al html
function CrearMatriz (matrizSize, html){

  // Crea la cuadrícula
  html.style.display = "grid";
  html.style.gridTemplateColumns = `repeat(${matrizSize}, 1fr)`;
  html.style.gridTemplateRows = `repeat(${matrizSize}, 1fr)`;

  // Agrega elementos input a cada celda de la cuadrícula
  for (let i = 0; i < matrizSize; i++) {
    for (let j = 0; j < matrizSize; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("input-matrix");
      input.id = `${i}-${j}`;
      input.required = true;

      // Agrega el elemento input a la celda correspondiente
      html.appendChild(input);
      html.style.gridRow = `${i + 1}`;
      html.style.gridColumn = `${j + 1}`;
    }
  }
}

//recibir matriz
