  class Circulo {
    constructor(x, y, radio, r, g, b) {
      this.x = x;
      this.y = y;
      this.radio = radio;
      this.r = r;
      this.g = g;
      this.b = b;

    }
    cambiarpos(x, y) {
      this.x = x;
      this.y = y;
    }

    getR() {
      return this.r;
    }

    getG() {
      return this.g;
    }

    getB() {
      return this.b;
    }

    setR(rNuevo) {
      this.r = rNuevo;
    }

    setG(gNuevo) {
      this.g = gNuevo;
    }

    setB(bNuevo) {
      this.b = bNuevo;
    }

    dibujar(ctx) {
      let stringR = this.r.toString().concat(",");
      let stringG = this.g.toString().concat(",");
      let stringB = this.b.toString();
      this.color = "rgb(" + (stringR.concat(stringG)).concat(stringB) + ")";
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
      ctx.stroke();
    }

    getRadio() {
      return this.radio;
    }
    mover(x, y) {
      this.x += x;
      this.y += y;
    }

    getcoordenadaX() {
      return this.x;
    }
    getcoordenadaY() {
      return this.y;
    }
  }
