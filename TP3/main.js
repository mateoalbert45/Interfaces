let valor_conejo = 2500;
let valor_rey = 2500;
let movimiento = 0;
let accion = false;
let golpes = 0;
let termino_juego = true;
let resusitando = false;
let max_golpes = 3;
let personaje = document.getElementById("personaje");
let obstaculo = document.getElementById("obstaculo");
let enemigo = document.getElementById("enemigo");
let piso = document.getElementById("piso");
let mensaje_fin = document.getElementById("mensaje_fin");
let gano = false;
let puntaje_golpes = document.getElementById("puntaje");
let boton_play = document.getElementById("play");
 document.addEventListener('keydown', keyCode);
boton_play.addEventListener('click', comenzar_juego);


function keyCode(event) {
  var x = event.keyCode;
  if (x == 87 && accion == false && termino_juego == false) {
  accion = true;
  personaje.className = " finn_salto";

  setTimeout(function(){ personaje.className = " finn";
  accion = false;

}, 1200);
    return true;
}
}

function colision(){
  var posicion_obstaculo = obstaculo.getBoundingClientRect();
  var posicion_personaje = personaje.getBoundingClientRect();
  let valor2 = posicion_personaje.right - posicion_obstaculo.right;
  let valor3 = posicion_personaje.top - posicion_obstaculo.top;
    if((valor2>-50 && valor2<50) && (valor3>-50 && valor3<50)){
      muerte_finn();
      setTimeout(function(){ fin_juego();
      ;
    }, 1300);
      ;
    }
}


function colision_enemigo(){
  let posicion_enemigo = enemigo.getBoundingClientRect();
  let posicion_personaje = personaje.getBoundingClientRect();
  let valor2 = posicion_personaje.right - posicion_enemigo.right;
  let valor3 = posicion_personaje.top - posicion_enemigo.top;
    if((valor2>-50 && valor2<50) && (valor3>-50 && valor3<50)){
          if(resusitando == false){
              muerte_rey();
              contador();
          }
    }
}

function movimiento_personajes(valor, velocidad){
  valor -= velocidad;
  if(valor < 0){
    valor = 2500;
  }
return valor
}

function contador(){
  puntaje_golpes.innerHTML =  "Golpes : " + golpes;
}
contador();

function movimiento_conejo(){
    valor_conejo = movimiento_personajes(valor_conejo,8);
    movimiento = valor_conejo.toString().concat("px");
    obstaculo.style.left = movimiento;
}

function movimiento_rey(){
    valor_rey = movimiento_personajes(valor_rey,10);
    movimiento = valor_rey.toString().concat("px");
    enemigo.style.left = movimiento;
}

function muerte_finn(){
  accion = true;
  personaje.className = " finn_muerte";
  setTimeout(function(){ personaje.className = " finn_muerte_2";
  ;
}, 1300);
}

function muerte_rey(){
  golpes++;
  resusitando = true;
  enemigo.className = " rey_muerte";
  setTimeout(function(){
    if(golpes < max_golpes){
  enemigo.className = " rey_hielo";
  resusitando = false;
  }
 }, 1200);
}



function play(){
  if(golpes == max_golpes){
      gano=true;
      fin_juego();
  }
  colision();
  colision_enemigo();
  movimiento_conejo();
  movimiento_rey();




  if(termino_juego == false){
    requestAnimationFrame(play);
  }
}


function fin_juego(){
  setTimeout(function(){

    personaje.className = " ";
    obstaculo.className = " ";
    enemigo.className = " ";
    mensaje_fin.className = "container jumbotron mensaje_fin";
    if(gano == true){
    mensaje_fin.innerHTML = "<h1>Felicidades Derrotaste al Rey Helado</h1>";
    gano = false;
    }else {
    mensaje_fin.innerHTML = "<h1>Te Adverti del conejo....</h1>";
    }
    boton_play.addEventListener('click', comenzar_juego);
  }, 1000);
    termino_juego = true;

}


function comenzar_juego(){
    golpes = 0;
    contador();
    accion = false;
    resusitando = false;
    termino_juego = false;
    valor_conejo = 2500;
    valor_rey = 2500;
    enemigo.style.left = valor_rey;
    obstaculo.style.left = valor_conejo;
    mensaje_fin.className= " invisible";
    personaje.className = " finn";
    obstaculo.className = " conejo";
    enemigo.className = " rey_hielo";
    piso.className = " piso";
    boton_play.removeEventListener('click', comenzar_juego);

requestAnimationFrame(play);
}






// document.addEventListener("keyup",function(e){
//   cPresionada = false;
// })
