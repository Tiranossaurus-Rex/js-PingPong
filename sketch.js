//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha e direção
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let espessuraRaqueteOponente = 10;
let alturaRaqueteOponente = 90;

//variáveis de "Minha Raquete"
let xRaquete = 5;
let yRaquete = 150;
let espessuraRaquete = 10;
let alturaRaquete = 90;
//variáveis de pontuação
let meusPontos = 0;
let pontosDoOponente = 0;
//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBorda();
  mostraRaquete();
  mostraRaqueteOponente();
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
  stroke("red");
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete() {
  rect(xRaquete, yRaquete, espessuraRaquete, alturaRaquete);
}

function mostraRaqueteOponente() {
  rect(xRaqueteOponente, yRaqueteOponente, espessuraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

/*function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - espessuraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}*/

function movimentaRaqueteOponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + espessuraRaquete &&
    yBolinha - raio < yRaquete + alturaRaquete &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteOponente(){
    if (
      xBolinha + raio > xRaqueteOponente + espessuraRaqueteOponente &&
      yBolinha - raio < yRaqueteOponente + alturaRaqueteOponente &&
      yBolinha + raio > yRaqueteOponente
    ) {
    velocidadeXBolinha *= -1;
      raquetada.play();
  }
}

function incluiPlacar() {
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255,140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}
