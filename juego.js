// leer teclado

document.addEventListener('keydown', function(evento){
    if (evento.keyCode == 32) {
        console.log("movimiento");  
        if (nivel.muerto == false) {
            saltar();  
        } else {
            nivel.velocidad = 9;
            nube.velocidad = 1;
            nivel.muerto = false;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;

        } 
        
    }
});

var imgconejo, imgcactus, imgsuelo;

//traemos las imagenes
function cargaImagenes(){
    imgconejo = new Image();
    imgcactus = new Image();
    imgsuelo = new Image();
    imgnube = new Image();

    imgconejo.src = 'img/tile000.png';
    imgcactus.src = 'img/cactus.png';
    imgsuelo.src = 'img/suelo.png';
    imgnube.src = 'img/nube.png';
}

//bucle principal

var fps = 50;
setInterval(function() {
    principal();
},1000/fps);

var ancho = 600, alto = 300, canvas, ctx;

function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}

function borraCanva() {
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 150;
var conejo = {y: suelo, vy: 0, gravedad: 2, salto: 30, vymax:9, saltando: false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var cactus = { x: ancho+100, y: suelo+20};
var nube = {x: 400, y: -15, velocidad: 1};
var suelog = {x:0, y: +250};

function dibujaConejo() {
    ctx.drawImage(imgconejo,0,0,200,200,100,conejo.y,200,200);
}

 function dibujaCactus(){
    ctx.drawImage(imgcactus,0,0,150,150,cactus.x,cactus.y,150,150);
 }

 function logicaCactus(){
    if (cactus.x < -100) {
        cactus.x = ancho + 100;
        nivel.marcador++;
    }else{
        cactus.x -= nivel.velocidad;
    }
}

 function dibujaNube(){
    ctx.drawImage(imgnube,0,0,150,150,nube.x,nube.y,150,150);
}

function logicaNube(){
    if (nube.x < -100) {
        nube.x = ancho + 100;
    }else{
        nube.x -= nube.velocidad;
    }
}

function dibujaSuelo(){
    ctx.drawImage(imgsuelo,suelog.x,0,696,400,0,suelog.y,696,400);
}

function logicaSuelo(){
    if (suelog.x > 100) {
        suelog.x = 0;
    }else{
        suelog.x += nivel.velocidad;
    }
}

function saltar(){
    conejo.saltando = true;
    conejo.vy = conejo.salto;
}

function gravedad(){
    if(conejo.saltando == true){
        if (conejo.y - conejo.vy - conejo.gravedad > suelo) {
            conejo.saltando = false;
            conejo.vy = 0;
            conejo.y = suelo;
        }else{
            conejo.vy -= conejo.gravedad;
            conejo.y -=conejo.vy;
        }

    }
}

function colision(){
    if (cactus.x >= 50 && cactus.x <= 200) {
        if(conejo.y >= suelo){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`,50,50);

    if (nivel.muerto == true) {
        ctx.font = "60px impact";
        ctx.fillText('GAME OVER',150,150);
    }
}


//dibujamos los elementos del juego y la logica
function principal(){
    borraCanva();
    gravedad();
    dibujaSuelo();
    logicaSuelo();
    logicaCactus();
    dibujaCactus();
    logicaNube();
    dibujaNube();
    colision();
    dibujaConejo();
    puntuacion();
}
