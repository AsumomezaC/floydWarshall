// Variables globales
var matrizSize;
var matrixComponent = [];
var newMatrixComponent = [];

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
      <p class="warning">Si un número es infinito poner en su lugar 9999<p>
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
  html.innerHTML += `<div class="top" id="topAlg"></div>`;
  html = document.getElementById('topAlg');

  crearMatrizD0(html);
  crearTextoAlg(html);
}
// fin crear interfaz superior

// crear interfaz inferior
function crearInterfazInferior(html){
  html.innerHTML += `<div class="bottom" id="downAlg"></div>`;
  html = document.getElementById('downAlg');

  for(let k=0; k<matrizSize; k++){
    html.innerHTML += `<h3>Pasando por ${getLetter(k)} (k = ${k+1})</h3><br>`;
    for(let i=0; i<matrizSize; i++){
      let row = [];
      for(let j=0; j<matrizSize; j++){
        html.innerHTML+= `<p>
          (${getLetter(i)}-${getLetter(j)}) 
          = min (${getLetter(i)}-${getLetter(j)},
          ${getLetter(i)}-${getLetter(k)}-${getLetter(j)}) 
          = min (${matrixComponent[i][j]}, ${matrixComponent[i][k]}+${matrixComponent[k][j]})
           = ${min(matrixComponent[i][j], parseInt(matrixComponent[i][k])+parseInt(matrixComponent[k][j]))}
        </p>`;
        let tempElement = min(parseInt(matrixComponent[i][j]), parseInt(matrixComponent[i][k])+parseInt(matrixComponent[k][j]));
        row.push(tempElement);
      }
      html.innerHTML += `<br>`;
      newMatrixComponent.push(row);
    }
    html.innerHTML += `<h3>Matriz D${k+1}<h3>`;
    addMatrixToHTML(html);
    
    // establecer matriz = nueva matriz
    for(let i = 0; i <matrizSize; i++){
      for(let j=0; j<matrizSize; j++){
        matrixComponent[i][j] = newMatrixComponent[i][j];
      }
    }
    newMatrixComponent = [];
  }
}
// fin crear interfaz inferior

//funcion crear matriz
function crearMatrizD0(html){
  html.innerHTML += `<h3>D0 (Matriz inicial)</h3>`;

  const container = document.createElement('div');
  container.id = 'Matriz'; // Agregar ID al contenedor
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${matrizSize}, 1fr)`;
  container.style.gridGap = '10px';
  
  for (let i = 0; i < matrizSize; i++) {
    for (let j = 0; j < matrizSize; j++) {
      const p = document.createElement('p');
      p.textContent = matrixComponent[i][j];
      p.style.border = '1px solid black';
      p.style.padding = '10px';
      p.style.textAlign = 'center';
      container.appendChild(p);
    }
  }
  html.appendChild(container);
}
// fin función crear matriz

// funcion crear texto alg
function crearTextoAlg(html){
  html.innerHTML += `<div class="Codigo">
    <p>1 D(0) = dij</p>
    <br>
    <p>2 For k = 1 to |V|</p>
    <br>
    <p>3   For i = 1 to |V|</p>
    <br>
    <p>4     For j = 1 to |V|</p>
    <br>
    <p>5       dij(k) = min(dij(k-1) , dik (k-1) + dkj (k-1) )</p>
    <br>
    <p>6 Return D(|V|)</p>
  </div>`;
}
// fin funcion crear texto alg

//funcion obtener letra
function getLetter(num) {
  if (num < 0 || num > 25) {
    return null; // Si el número está fuera del rango 0-25, regresamos null
  }
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet.charAt(num);
}
//fin funcion obtener letra

// funcion minimo
function min(a, b){
  if (a > b)
    return b;
  else
    return a;
}
// fin funcion minimo

// agregar matrices
function addMatrixToHTML(html) {
  const container = document.createElement('div');
  container.id = 'Matriz'; // Agregar ID al contenedor
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${matrizSize}, 1fr)`;
  container.style.gridGap = '10px';
  
  for (let i = 0; i < matrizSize; i++) {
    for (let j = 0; j < matrizSize; j++) {
      const p = document.createElement('p');
      p.textContent = newMatrixComponent[i][j];
      p.style.border = '1px solid black';
      p.style.padding = '10px';
      p.style.textAlign = 'center';
      container.appendChild(p);
    }
  }

  html.appendChild(container);
}
// fin agregar matrices