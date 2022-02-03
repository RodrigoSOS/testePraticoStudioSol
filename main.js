const url = "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
const canvas = document.getElementById('seteSegmentos');
const ctx = canvas.getContext('2d');

seteSegmentos(0);

var valor = sortear();
var estado = "start";

function desenhaEstado(){
    if (estado=="start"){}
    if (estado=="erro"){}
    if (estado=="inGame"){}
    if (estado=="acertou"){}
}



function sortear(){
    var novaPartida = document.getElementById("nova_partida");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    let myArr = 0;
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        myArr = JSON.parse(xhttp.responseText);
        valor = myArr.value;
        console.log(valor);
        return myArr.value;
    }
    else{
        estado = "erro";
        dica.innerHTML = "<p id='dica'class='dica_erro'>ERRO</p>";
        novaPartida.hidden=false;
        seteSegmentos(-1);
    }
} 

function validar(){
    let in_text = document.getElementById("in_text");
    let aux = in_text.value.slice(-1);
    if (isNaN(aux)){
        in_text.value=in_text.value.substring(0, in_text.value.length - 1);
    }
}

function recomecar(){
    seteSegmentos(0);
    var novaPartida = document.getElementById("nova_partida");
    var in_text = document.getElementById("in_text");
    var enviar = document.getElementById("enviar");
    var dica = document.getElementById("dica");
    novaPartida.hidden=true;
    in_text.disabled=false;
    enviar.disabled=false;
    dica.innerText=" ";
    sortear();
}

function getInput(){
    var in_text = document.getElementById("in_text");
    var novaPartida = document.getElementById("nova_partida");
    var enviar = document.getElementById("enviar");
    var dica = document.getElementById("dica");

    let entrada = parseInt(in_text.value);
    in_text.value="";
    if (isNaN(entrada)){
        return 0;
    }
    seteSegmentos(entrada);
    if (entrada > valor){
        dica.innerHTML = "<p id='dica'class='dica_nao'>É menor</p>";
    }
    else if (entrada < valor){
        dica.innerHTML = "<p id='dica'class='dica_nao'>É maior</p>";
    }
    else {
        dica.innerHTML = "<p id='dica'class='dica_sim'>Você acertou!!!!</p>";
        novaPartida.hidden=false;
        in_text.disabled=true;
        enviar.disabled=true;
    }
}


function seteSegmentos(n){
    res = 1;
    //ctx.height = canvas.height*res;
    //ctx.width  = canvas.width*res;
    ctx.height = 108;
    ctx.width  = 200;
    console.log(`seteSegmentos: ${n}`);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var cor = "#262A34";
    if (n==valor){
        cor = "#32BF00";
    }
    if (n==-1){
        cor = "#CC3300"
        drawNumero(0,0,5,cor);
        drawNumero(70,0,0,cor);
        drawNumero(140,0,2,cor);
    }
    else{
        if(n<10){
            drawNumero(70,0,n,cor);
        }
        else if(n<100){
            drawNumero(35,0,Math.floor(n/10),cor);
            drawNumero(105,0,n%10,cor); 
        }
        else {
            drawNumero(0,0,Math.floor(n/100),cor);
            drawNumero(70,0,Math.floor(n/10)%10,cor);
            drawNumero(140,0,n%10,cor);
        }
    }
}

/*
 _   0
|_| 123
|_| 456
*/
function drawNumero(x,y,n,cor){
    let on = [];
    switch (n){
        case 1: on = [0,0,0,1,0,0,1]; break;
        case 2: on = [1,0,1,1,1,1,0]; break;
        case 3: on = [1,0,1,1,0,1,1]; break;
        case 4: on = [0,1,1,1,0,0,1]; break;
        case 5: on = [1,1,1,0,0,1,1]; break;
        case 6: on = [1,1,1,0,1,1,1]; break;
        case 7: on = [1,0,0,1,0,0,1]; break;
        case 8: on = [1,1,1,1,1,1,1]; break;
        case 9: on = [1,1,1,1,0,1,1]; break;
        case 0: on = [1,1,0,1,1,1,1]; break;
        default : on = [0,0,0,0,0,0,0]; break;
    }
    
    drawSegmento(x+7,y+0,false,on[0],cor);
    drawSegmento(x+0,y+7,true,on[1],cor);
    drawSegmento(x+7,y+48,false,on[2],cor);
    drawSegmento(x+48,y+7,true,on[3],cor);
    drawSegmento(x+0,y+55,true,on[4],cor);
    drawSegmento(x+7,y+96,false,on[5],cor);
    drawSegmento(x+48,y+55,true,on[6],cor);
}

function drawSegmento(x=0,y=0,vertical=false,on,cor){
    let k=[]
    ctx.fillStyle = '#DDDDDD';
    if (on) 
        ctx.fillStyle = cor;
    if (vertical){
        k=[x,y+5,11,35,5];
        ctx.beginPath();
        ctx.moveTo(k[0],k[1]);
        ctx.lineTo(k[0]+k[2]/2,k[1]-k[4]);
        ctx.lineTo(k[0]+k[2],k[1]);
        ctx.lineTo(k[0]+k[2],k[1]+k[3]);
        ctx.lineTo(k[0]+k[2]/2,k[1]+k[3]+k[4]);
        ctx.lineTo(k[0],k[1]+k[3]);
        ctx.fill();
    }
    else {
        k=[x+5,y,35,11,5];
        ctx.beginPath();
        ctx.moveTo(k[0],k[1]);
        ctx.lineTo(k[0]+k[2],k[1]);
        ctx.lineTo(k[0]+k[2]+k[4],k[1]+k[3]/2);
        ctx.lineTo(k[0]+k[2],k[1]+k[3]);
        ctx.lineTo(k[0],k[1]+k[3]);
        ctx.lineTo(k[0]-k[4],k[1]+k[3]/2);
        ctx.fill();
    }
}