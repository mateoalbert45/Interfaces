let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let figuras = [];
let indice = 0;
figuras[indice] = new Figura();
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(58, 109, 63, 1)";
ctx.fill();
ctx.closePath();

let click = false;
let valor = 0;
let cerrado = false;
let colorLineas = 255;
let presionoC = false;



canvas.addEventListener('click', crearCirculo);

function crearCirculo(evento) {
  let mousePos = getCoordenadas(evento);
  let coordenadas = 'X' + mousePos.x + ', Y ' + mousePos.y;
  let circulo = new Circulo(mousePos.x, mousePos.y, 50, 245, 0, 0);
  circulo.dibujar(ctx);
  figuras[indice].agregarCirculo(circulo);
  figuras[indice].crearLinea(ctx);


}

canvas.addEventListener('dblclick', function(event) {
  let circuloClickeado = figuras[indice].clickCirculoRojo(event, ctx);
  if (circuloClickeado != null) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(58, 109, 63, 1)";
    ctx.fill();
    ctx.closePath();
    figuras[indice].eliminarCirculo(circuloClickeado, event, ctx);
  }
})



canvas.addEventListener("mousedown", function() {
  click = true;
});


canvas.addEventListener("mouseup", function() {
  click = false;
})



canvas.addEventListener("mousemove", function(event) {
  if (cerrado === true && click === true) {
    let circuloClickeado = figuras[indice].clickCirculo(event);
    if (circuloClickeado != null) {
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(58, 109, 63, 1)";
      ctx.fill();
      ctx.closePath();
      if (circuloClickeado >= 0) {
        circuloRojo = figuras[indice].getCirculo(circuloClickeado);
        figuras[indice].moverCirculoRojo(circuloRojo, event);
      } else {
        figuras[indice].mover(event, ctx);
      }
    }
  }
})


let botonCerrar = document.getElementById("cerrar").addEventListener('click', function() {
  cerrado = true;
  click = false;
  figuras[indice].cerrarFigura(ctx);
  canvas.removeEventListener("click", crearCirculo);

});


function keyC(event) {
  var x = event.keyCode;
  if (x == 67) {
    presionoC = true;
    return true;
  }
}
document.addEventListener("keyup", function(e) {
  cPresionada = false;
})
document.addEventListener("keydown", keyC);

window.addEventListener('wheel', function(evento) {
  if (presionoC) {
    if (evento.deltaY < 0) {
      valor = 10;
      colorLineas += valor
      figuras[indice].cambiarColorFigura(valor, ctx, colorLineas);

    } else if (evento.deltaY > 0) {
      valor = -10;
      colorLineas += valor
      figuras[indice].cambiarColorFigura(valor, ctx, colorLineas);
    }
  }

});

function getCoordenadas(evento) {
  return {
    x: evento.layerX,
    y: evento.layerY
  };
}
