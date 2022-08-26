/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 6;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
    "frutas":["banana","maçã","goiaba"],
    "times":["flamengo","palmeiras","vasco"],
    "profissoes":["desenvolvedor", "desenvolvedor-backend","padeiro","policial"],
    "estados":["ceara", "pernambuco","sao-paulo"]
}

function escolhePalavra(){
    palavraProposta='';
    palavraInterface.innerHTML='';
    let categoriasArray = Object.keys(categorias)
    let catego = categoriasArray[Math.round(Math.random()*(categoriasArray.length-1))];
    categoria.innerHTML = catego;
    categoriaObj = categorias[catego];
    palavraProposta = categoriaObj[Math.round(Math.random()*(categoriaObj.length-1))];
    montraTracejado(palavraProposta);
}

function tentativa(key){
    let achou = false;
        for(let i=0;i<palavraProposta.length;i++){
            if(palavraProposta[i]==key){
                document.getElementById(i).innerHTML=key;
                achou = true;
            }
        }
        if(!achou){
            letrasErradas.innerHTML +=" "+key;
            desenhaBoneco();
        }
}

function montraTracejado(palavra){
    for(let i=0;i<palavra.length;i++){
        let div = document.createElement('div');
        div.setAttribute('id', i);
        div.setAttribute('class', 'tracejado');
        if(palavra[i]=="-"){
            div.innerHTML = "-";
        }else{
            div.innerHTML = '_';
        }
        palavraInterface.appendChild(div);
    }
}


/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){
    if(indiceBoneco>=numTentativas){
        desenhaOlhos()
    }else{
        tentativa(e.key);
    }
    
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
    escolhePalavra()
}

window.addEventListener("load", iniciaJogo);
