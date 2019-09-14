class Figura {

  constructor() {
    this.circulos = [];
    this.centro = null;
  }

  agregarCirculo(circulo) {
    this.circulos.push(circulo);
  }

  getCirculo(i) {
    return this.circulos[i];
  }


  dibujarLinea(ctx, circuloOrigen, circuloDestino, r = null, g = null) {
    if (r == null && g == null) {
      r = 255;
      g = 255;
    }
    if ((r > 0 && r <= 255) && (g > 0 && g <= 255)) {
      let stringR = r.toString().concat(",");
      let stringG = g.toString().concat(",");
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(" + (stringR.concat(stringG)) + "0)";
      ctx.beginPath();
      ctx.moveTo(circuloDestino.getcoordenadaX(), circuloDestino.getcoordenadaY());
      ctx.lineTo(circuloOrigen.getcoordenadaX(), circuloOrigen.getcoordenadaY());
      ctx.stroke();
    }
  }

  crearLinea(ctx) {
    if (this.circulos.length > 1) {
      let circuloOrigen = this.circulos[this.circulos.length - 1];
      let circuloDestino = this.circulos[this.circulos.length - 2];
      this.dibujarLinea(ctx, circuloOrigen, circuloDestino);
    }
  }


  cerrarFigura(ctx) {
    let circuloOrigen = this.circulos[this.circulos.length - 1];
    let circuloDestino = this.circulos[0];
    this.dibujarLinea(ctx, circuloOrigen, circuloDestino);
    this.crearCentro(ctx);
  }


  crearCentro(ctx) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    let promedioX = 0;
    let promedioY = 0;
    for (let i = 0; i < this.circulos.length; i++) {
      promedioX += this.circulos[i].getcoordenadaX();
      promedioY += this.circulos[i].getcoordenadaY();
    }
    promedioX = promedioX / this.circulos.length;
    promedioY = promedioY / this.circulos.length;
    let circulo = new Circulo(promedioX, promedioY, 20, 0, 222, 20)
    this.centro = circulo;
    circulo.dibujar(ctx);
  }

  clickCirculo(evento) {
    let indiceCirculo = this.clickCirculoRojo(evento);
    if (indiceCirculo != null) {
      return indiceCirculo;
    } else if (this.clickCentro(evento)) {
      return this.centro;
    }
    return null;
  }

  clickCentro(evento) {
    let distancia = Math.sqrt(Math.pow(evento.layerX - this.centro.getcoordenadaX(), 2) + Math.pow(evento.layerY - this.centro.getcoordenadaY(), 2))
    if (distancia < this.centro.getRadio()) {

      return true;
    } else {
      return false;
    }
  }

  clickCirculoRojo(e) {
    for (let i = 0; i < this.circulos.length; i++) {
      let distancia = Math.sqrt(Math.pow(e.layerX - this.circulos[i].getcoordenadaX(), 2) + Math.pow(e.layerY - this.circulos[i].getcoordenadaY(), 2))
      if (distancia < this.circulos[i].getRadio()) {
        return i;
      }
    }
    return null;
  }

  moverCirculoRojo(circulo, e) {
    circulo.mover(e.layerX - circulo.getcoordenadaX(), e.layerY - circulo.getcoordenadaY())
    for (let i = 0; i < this.circulos.length; i++) {
      this.circulos[i].dibujar(ctx);
    }
    this.dibujarTodasLineas(ctx);
    this.crearCentro();
  }


  mover(e, ctx) {
    if (this.centro != null) {
      for (let i = 0; i < this.circulos.length; i++) {
        this.circulos[i].mover(e.layerX - this.centro.getcoordenadaX(), e.layerY - this.centro.getcoordenadaY())
        this.circulos[i].dibujar(ctx);

      }
      this.dibujarTodasLineas(ctx);
      this.crearCentro();
    }

  }

  dibujarTodasLineas(ctx, r = null, g = null) {
    for (let i = 0; i < this.circulos.length - 1; i++) {
      this.dibujarLinea(ctx, this.circulos[i], this.circulos[i + 1], r, g)
    }
    this.dibujarLinea(ctx, this.circulos[this.circulos.length - 1], this.circulos[0], r, g);

  }


  cambiarColorFigura(valor, ctx, colorLineas) {
    let cantidad = 0;
    let brillo = valor;
    for (let i = 0; i < this.circulos.length; i++) {
      cantidad = this.circulos[i].getR() + valor;
      if (cantidad > 0 && cantidad < 256) {
        this.circulos[i].setR(cantidad);
        this.circulos[i].dibujar(ctx);
      }
    }
    cantidad = this.centro.getG() + valor;
    if (cantidad > 0 && cantidad < 256) {
      this.centro.setG(cantidad);
      this.centro.dibujar(ctx);
    }

    cantidad = this.centro.getG() + valor;
    if (cantidad > 0 && cantidad < 256) {
      this.centro.setG(cantidad);
      this.centro.dibujar(ctx);
    }

    this.dibujarTodasLineas(ctx, colorLineas, colorLineas);
    this.centro.dibujar(ctx);
  }


  eliminarCirculo(ciruciloClickeado, event, ctx) {
    this.circulos.splice(ciruciloClickeado, 1);
    for (let i = 0; i < this.circulos.length; i++) {
      this.circulos[i].dibujar(ctx);
    }
    this.dibujarTodasLineas(ctx);
    this.crearCentro();
    this.centro.dibujar(ctx);



  }






}
