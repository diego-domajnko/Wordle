const palavras = [
  {
    palavra: "sagaz",
    id: "0"
  },
  {
    palavra: "mexer",
    id: "1"
  },
  {
    palavra: "termo",
    id: "2"
  },
  {
    palavra: "nobre",
    id: "3"
  },
  {
    palavra: "senso",
    id: "4"
  },
  {
    palavra: "algoz",
    id: "5"
  },
  {
    palavra: "afeto",
    id: "6"
  },
  {
    palavra: "plena",
    id: "7"
  },
  {
    palavra: "sutil",
    id: "8"
  },
  {
    palavra: "fazer",
    id: "9"
  },
  {
    palavra: "vigor",
    id: "10"
  },
  {
    palavra: "assim",
    id: "11"
  },
  {
    palavra: "audaz",
    id: "12"
  },
  {
    palavra: "sanar",
    id: "13"
  },
  {
    palavra: "fosse",
    id: "14"
  },
  {
    palavra: "cerne",
    id: "15"
  },
  {
    palavra: "ideia",
    id: "16"
  },
  {
    palavra: "inato",
    id: "17"
  },
  {
    palavra: "poder",
    id: "18"
  },
  {
    palavra: "moral",
    id: "19"
  },
  {
    palavra: "desde",
    id: "20"
  },
  {
    palavra: "justo",
    id: "21"
  },
  {
    palavra: "sobre",
    id: "22"
  },
  {
    palavra: "muito",
    id: "23"
  },
  {
    palavra: "torpe",
    id: "24"
  },
  {
    palavra: "honra",
    id: "25"
  },
  {
    palavra: "sonho",
    id: "26"
  },
  {
    palavra: "etnia",
    id: "27"
  },
  {
    palavra: "anexo",
    id: "28"
  },
  {
    palavra: "tange",
    id: "29"
  },
  {
    palavra: "amigo",
    id: "30"
  },
  {
    palavra: "lapso",
    id: "31"
  },
  {
    palavra: "expor",
    id: "32"
  },
  {
    palavra: "haver",
    id: "33"
  },
  {
    palavra: "casal",
    id: "34"
  },
  {
    palavra: "dengo",
    id: "35"
  }
];
let letras = [
  {
    colunas: [false, false, false, false, false],
    linhaPreenchida: false,
    linha: '1'
  },
  {
    colunas: [false, false, false, false, false],
    linhaPreenchida: false,
    linha: '2'
  },
  {
    colunas: [false, false, false, false, false],
    linhaPreenchida: false,
    linha: '3'
  },
  {
    colunas: [false, false, false, false, false],
    linhaPreenchida: false,
    linha: '4'
  },
  {
    colunas: [false, false, false, false, false],
    linhaPreenchida: false,
    linha: '5'
  },
  {
    colunas: [false, false, false, false, false],
    linhaPreenchida: false,
    linha: '6'
  }
]
let contJogadas = 0;
const btnTeclado = document.querySelectorAll('.letra');
const palavra = escolherPalavraAleatoria().toUpperCase();
const msgErro = document.querySelector('.msg');
window.onload = palavra;
console.log(palavra);

function escolherPalavraAleatoria() {
  const id = Math.floor(Math.random() * palavras.length);
  const palavraAleatoria = palavras.find(palavra => palavra.id == id)
  return palavraAleatoria.palavra;
}

btnTeclado.forEach(e => {
  if (contJogadas < 6) {
    e.addEventListener('click', event => {
      if (!msgErro.classList.contains('acerto')) {
        const letraClicada = event.target.textContent;
        if (letraClicada == 'Enter') {
          testarPalavra();
        } else if (letraClicada == 'backspace') {
          apagarLetra();
        } else {
          inserirLetra(event.target.textContent);
        }
      }
    });
  }
});

window.addEventListener('keyup', (e) => {
  if (contJogadas < 6) {
    let letra = e.key;
    if (!msgErro.classList.contains('acerto')) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        inserirLetra(letra.toUpperCase());
      } else if (e.key == 'Enter') {
        testarPalavra();
      } else if (e.key == 'Backspace' || e.key == 'Delete') {
        apagarLetra();
      }
    }
  }
});

function apagarLetra() {
  limparAviso();
  const linha = encontrarLinhaNaoPreenchida();
  const coluna = encontrarColunaNaoPreenchida();
  const letraDeletada = letras[linha].colunas[coluna - 1];
  let posicao = encontrarUltimaPosicaoPreenchida();

  if (letras[linha].colunas[0] != false) {
    if (!posicao.classList.contains('linha__wordle')) {
      posicao = posicao.parentNode.querySelector(`.letra${coluna}`);
    } else {
      posicao = posicao.querySelector(`.letra${coluna}`);
    }
    
    if (letraDeletada != false) {
      posicao.textContent = "";
      letras[linha].colunas[coluna - 1] = false;
    }
  }
}

function testarPalavra() {
  limparAviso();
  const numLinha = encontrarLinhaNaoPreenchida();
  const colunas = letras[numLinha].colunas;
  let todosEspacosPreenchidos = true;
  let palavraEscrita = "";
  
  for (let i = 0; i < colunas.length; i++) {
    const element = colunas[i];
    palavraEscrita += element;
    if (!element) {
      todosEspacosPreenchidos = false;
    }
  }
  
  const buscarPalavra = palavras.find(palavra => palavra.palavra.toUpperCase() == palavraEscrita);
  const palavraExiste = buscarPalavra ? true : false;
  
  if (todosEspacosPreenchidos && palavraExiste) {
    letras[numLinha].linhaPreenchida = true;
    if (palavraEscrita != palavra) {
      for (let i = 0; i < palavraEscrita.length; i++) {
        if (palavraEscrita[i] == palavra[i]) {
          document.querySelector(`.letra${palavraEscrita[i]}`).style.backgroundColor = "#538D4E";
          document.querySelector(`.linha__wordle-${encontrarLinhaNaoPreenchida()}`).querySelector(`.letra${i + 1}`).style.backgroundColor = "#538D4E";
        } else if (palavraEscrita[i] != palavra[i] && palavra.includes(palavraEscrita[i])) {
          document.querySelector(`.letra${palavraEscrita[i]}`).style.backgroundColor = "#B59F3B";
          document.querySelector(`.linha__wordle-${encontrarLinhaNaoPreenchida()}`).querySelector(`.letra${i + 1}`).style.backgroundColor = "#B59F3B";
        } else {
          document.querySelector(`.letra${palavraEscrita[i]}`).style.backgroundColor = "#585858";
        }
      }
      if (encontrarLinhaNaoPreenchida() == 6) {
        msgErro.classList.add('fim-de-jogo');
        msgErro.style.display = "block";
        msgErro.innerHTML = `Você perdeu o jogo!`;
      }
    } else {
      document.querySelector('.principal').innerHTML += `
      <button class="msg btnAcerto">Reiniciar o jogo</button>
      `;
      const btnReiniciarJogo = document.querySelector('.btnAcerto');
      btnReiniciarJogo.addEventListener('click', () => location.reload());
      msgErro.classList.add('acerto');
      msgErro.style.display = "block";
      msgErro.innerHTML = `Parabéns! Você acertou!`;
      for (let i = 0; i < palavraEscrita.length; i++) {
        document.querySelector(`.letra${palavraEscrita[i]}`).style.backgroundColor = "#538D4E";
        document.querySelector(`.linha__wordle-${encontrarLinhaNaoPreenchida()}`).querySelector(`.letra${i + 1}`).style.backgroundColor = "#538D4E";
      }
    }
    console.log(contJogadas);
    contJogadas += 1;
    console.log(contJogadas);
  } else if (!todosEspacosPreenchidos) {
    msgErro.classList.add('erro-qtd-letras');
    msgErro.style.display = "block";
    msgErro.innerHTML = `Preencha todas as letras`;
  } else if (!palavraExiste) {
    msgErro.classList.add('erro-palavra-inexistente');
    msgErro.style.display = "block";
    msgErro.innerHTML = `Palavra não está na lista`;
  }
  
}


function limparAviso() {
  msgErro.style.display = "none";
  msgErro.innerHTML = "<div class='msg'></div>";
}

function inserirLetra(evento) {
  limparAviso();
  const local = encontrarUltimaPosicaoPreenchida();
  const linha = encontrarLinhaNaoPreenchida();
  const coluna = encontrarColunaNaoPreenchida();
  let validarInsercao = false;

  if (coluna <= 4 && !letras.linhaPreenchida) {
    letras[linha].colunas[coluna] = evento;
    local.textContent = evento;

    validarInsercao = true;
  } else {
    msgErro.classList.add('erro-qtd-letras');
    msgErro.style.display = "block";
    msgErro.innerHTML = `Só pode inserir 5 letras`;
  }

  return validarInsercao;
}

function encontrarUltimaPosicaoPreenchida() {
  let localizacao = '';
  for (let i = encontrarLinhaNaoPreenchida(); i < letras.length; i++) {
    const elemento = letras[i];
    localizacao = document.querySelector(`.linha__wordle-${i + 1}`);
    if (!elemento.linhaPreenchida) {
      for (let x = 0; x < elemento.colunas.length; x++){
        if (!elemento.colunas[x]) {
          localizacao = document.querySelector(`.linha__wordle-${i + 1}`).querySelector(`.letra${x + 1}`);
          break;
        }
      }
      break;
    }
  }
  return localizacao;
}

function encontrarLinhaNaoPreenchida() {
  let linha = 0;
  while (linha < letras.length) {
    let elemento = letras[linha];
    if (!elemento.linhaPreenchida) {
      break;
    }
    linha++;
  }

  return linha;
}

function encontrarColunaNaoPreenchida() {
  let linha = letras[encontrarLinhaNaoPreenchida()];
  let coluna = 0;

  while (coluna < 5) {
    let elemento = linha.colunas[coluna];
    if (!elemento) {
      break;
    }
    coluna++;
  }

  return coluna;
}