// Variables globales
var matrizSize;
var matrixComponent = [];

// Crear matriz incial
Iniciar.addEventListener('click', (e)=>{
  matrizSize = document.getElementById('matrizSize').value;
  if(matrizSize === ''){
    let warning = document.getElementById('Warning');
    warning.innerHTML = `<p class="warning">Favor de específicar el tamaño de la matriz</p>`;
  } else {
    let html = document.getElementById('root');
    html.innerHTML = 
    `<div class="formato-inicial" id="formato-incial">
      <h1 class="matrixTitle">Ingrese la matriz</h1>
      <div id="grid-container"></div>
      <button class="button" id="StartAlgorithm">Iniciar algoritmo</button>
    </div>`;

    html = document.getElementById('grid-container');
    CrearMatriz(matrizSize, html);

    //Ejecutar el algoritmo
    StartAlgorithm.addEventListener('click', (e)=>{
      getMatrixValues();
      ejecutarAlgoritmo();
    });
    //Fin ejecutar alogirtmo
  }
});
// Fin crear matriz incial

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

//recibir valores de los inputs
function getMatrixValues() {
  for (let i = 0; i < matrizSize; i++) {
    const row = [];
    for (let j = 0; j < matrizSize; j++) {
      const inputId = `${i}-${j}`;
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        row.push(inputElement.value);
      } else {
        row.push(null);
      }
    }
    matrixComponent.push(row);
  }
}
//fin recibir valores de los inputs

//ejecutar algoritmo
function ejecutarAlgoritmo(){
  let html = document.getElementById('root');
  html.innerHTML = `<div id="executeAlgorithm"></div>`;

  html = document.getElementById('executeAlgorithm');

  crearInterfazSuperior(html);// crea la matriz d0 asi como muestra el algoritmo
  crearInterfazInferior(html);// muestra el resto del algoritmo
}
// fin ejecutar algoritmo

//crear interfaz superior
function crearInterfazSuperior(html){

}
// fin crear interfaz superior

// crear interfaz inferior
function crearInterfazInferior(html){
  
}
// fin crear interfaz inferior