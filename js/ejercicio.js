let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imageData = ctx.createImageData(canvas.width,canvas.height);

let botonEJ1 = document.getElementById("ejercicio1");
botonEJ1.addEventListener("click", ejercicio1);

let botonEJ2 = document.getElementById("ejercicio2");
botonEJ2.addEventListener("click", ejercicio2);

let botonEJ3 = document.getElementById("ejercicio3");
botonEJ3.addEventListener("click", ejercicio3);

let botonEJ4 = document.getElementById("ejercicio4");
botonEJ4.addEventListener("click", ejercicio4);

let botonEJ5 = document.getElementById("ejercicio5");
botonEJ5.addEventListener("click", ejercicio5);

let botonEJ6 = document.getElementById("ejercicio6");
botonEJ6.addEventListener("click", ejercicio6);



function setPixel(imageData,x , y, r, g, b, a){
let index = (x + y * imageData.width) * 4;
imageData.data[index+0] = r;
imageData.data[index+1] = g;
imageData.data[index+2] = b;
imageData.data[index+3] = a;
}



function ejercicio1(){
let matriz = [];
const filas = 100;
const columnas = 100;
let valorMaximo = 0;
let valorMaximoFilaPar = 0;
let valorMinimoFilaImpar = 100;
let numeroPromedio = 0;
let promedioSegunFila = [];

for(let i=0; i<columnas; i++) {
 matriz[i] = new Array(filas);
 for (let j = 0; j < filas; j++) {
   matriz[i][j] = Math.floor(Math.random() *100 );
 }
}

//devuelve el maximo
for(let i=0; i<filas; i++) {
 for (let j = 0; j < columnas; j++) {
    if(matriz[i][j] > valorMaximo){
      valorMaximo = matriz[i][j];
    }
 }
}
console.log("El numero mayor es " + valorMaximo);
//devulve maximo en pares, minimo en impares
for(let i=0; i<filas; i++) {
 for (let j = 0; j < columnas; j++) {
   if(i%2 == 0){
     if(matriz[i][j] > valorMaximoFilaPar){
       valorMaximoFilaPar = matriz[i][j];
     }
   }else{
     if(matriz[i][j] < valorMinimoFilaImpar){
       valorMinimoFilaImpar = matriz[i][j];
     }
   }
 }
}
console.log("El numero maximo para las filas pares es " + valorMaximoFilaPar);
console.log("El numero minimo para las filas impares es " + valorMinimoFilaImpar);
//calcular promedo de cada filas
for(let i=0; i<filas; i++) {
 for (let j = 0; j < columnas; j++) {
      numeroPromedio += matriz[i][j];
 }
 numeroPromedio = numeroPromedio/columnas
 promedioSegunFila[i] = numeroPromedio
 console.log("El numero promedio para la fila " + i + " es " + numeroPromedio);

 numeroPromedio=0;
}
}


function ejercicio2(){
  ctx.fillStyle = 'rgba(100, 12, 54, 134)';
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
}

function ejercicio3(){
for(let i = 0; i < imageData.width; i++){
  for(let j = 0; j < imageData.height; j++){
    setPixel(imageData, i, j , 13, 144, 22, 255);
    }
  }
ctx.putImageData(imageData, 0, 0);
}

function ejercicio4(){
for(let i = 0; i < imageData.width; i++){
  imageData.r = i/imageData.width * 255 ;
  imageData.g = i/imageData.width * 255 ;
  imageData.b = i/imageData.width * 255 ;
  for(let j = 0; j < imageData.height; j++){
    setPixel(imageData, i, j , imageData.r, imageData.g, imageData.b, 255);
  }
}

ctx.putImageData(imageData, 0, 0);
}


function ejercicio5(){
let variaColorR = 255;
let variaColorG = 255;

  for(let i = 0; i < imageData.width; i++){
    imageData.r = i/(imageData.width*0.5) * variaColorR ;
    imageData.g = i/(imageData.width*0.5) * variaColorG ;
    imageData.b = 0 ;
    for(let j = 0; j < imageData.height; j++){
      setPixel(imageData, i, j , imageData.r, imageData.g, imageData.b, 255);
    }
    variaColorG = verificarTamaño(i,variaColorG);
    }

ctx.putImageData(imageData, 0, 0);
}

function verificarTamaño(ancho,variaColorG){
  if(ancho >= imageData.width/2){
    variaColorG = (1-(ancho-canvas.width/2)/(canvas.width/2))*255;
    return variaColorG;
  }
  return variaColorG;
}

function ejercicio6(){
let cambioColor = 0;
let image1 = new Image();
image1.src = "images/paisaje.jpg";

image1.crossOrigin = "anonymous";
image1.onload = function(){
  canvas.height = image1.naturalHeight;
  canvas.width = image1.naturalWidth;
  ctx.drawImage(image1, 0,0);
  imageData = ctx.getImageData(0, 0, image1.width, image1.height);
  aplicarFiltro(this);
  }
}
  function getR(imageData,x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
  }

  function getG(imageData,x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
  }

  function getB(imageData,x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
  }

function aplicarFiltro(image1){

    for(let i = 0; i <imageData.width; i++){
      for(let j = 0; j < image1.height; j++){
        cambioColor = (getR(imageData,i,j) + getG(imageData,i,j) + getB(imageData,i,j))/3;
        imageData.r = cambioColor ;
        imageData.g = cambioColor ;
        imageData.b = cambioColor ;
        setPixel(imageData, i, j , imageData.r, imageData.g, imageData.b, 255);
        }
      }
  ctx.putImageData(imageData, 0 , 0);


}
