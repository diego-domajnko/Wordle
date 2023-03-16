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
let localizacaoLetras = [
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
const btnTeclado = document.querySelectorAll('.letra');
const palavra = escolherPalavraAleatoria().toLocaleUpperCase();
window.onload = palavra;
console.log(palavra);

function escolherPalavraAleatoria() {
  const id = Math.floor(Math.random() * palavras.length);
  const palavraAleatoria = palavras.find(palavra => palavra.id == id)
  return palavraAleatoria.palavra;
}

btnTeclado.forEach(e => {
  e.addEventListener('click', event => inserirLetra(event.target.textContent));
});

window.addEventListener('keyup', (e) => {
  let letra = e.key;
  
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    inserirLetra(letra.toLocaleUpperCase());
  } else if (e.key == 'Enter') {
    testarPalavra();
  }
});

function testarPalavra() {
  const numLinha = encontrarLinhaNaoPreenchida()-1;
  const linhaTestada = localizacaoLetras[numLinha]
  const palavraTestada = linhaTestada.colunas;
  let palavraCorreta = true;

  if (linhaTestada[linhaTestada.length] != false) {
    for (let i = 0; i < palavraTestada.length; i++) {
      if (palavraTestada[i] != palavra[i]) {
        palavraCorreta = false;
        break;
      }
    }
  
    if (palavraCorreta) {
      for (let i = 0; i < palavraTestada.length; i++) {
        posicaoDaLetra(numLinha, i+1).style.backgroundColor = "green";
      }
    } else {
      for (let i = 0; i < palavraTestada.length; i++) {
        if (palavraTestada[i] == palavra[i]) {
          posicaoDaLetra(numLinha, i+1).style.backgroundColor = "green";
        }
        else {
          posicaoDaLetra(numLinha, i+1).style.backgroundColor = "red";
        }
      }
    }
  }
  linhaTestada.linhaPreenchida = true;

  return palavraCorreta;
}

function inserirLetra(evento) {
  let local = encontrarPosicaoNaoPreenchida();
  const linha = encontrarLinhaNaoPreenchida();
  const coluna = encontrarColunaNaoPreenchida();
  
  localizacaoLetras[linha].colunas[coluna] = evento;
  local.textContent = evento;
  if (localizacaoLetras[linha].colunas[4]) {
    localizacaoLetras[linha].linhaPreenchida = true;
  }
}

function posicaoDaLetra(linha, coluna) {
  const letra = document.querySelector(`.linha__wordle-${(linha+1)}`).querySelector(`.letra${coluna}`);
  return letra;
}

function encontrarPosicaoNaoPreenchida() {
  let localizacao = '';
  for (let i = 0; i < localizacaoLetras.length; i++) {
    const elemento = localizacaoLetras[i];
    if (!elemento.linhaPreenchida) {
      for (let x = 0; x < 5; x++){
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
  while (linha < localizacaoLetras.length) {
    let elemento = localizacaoLetras[linha];
    if (!elemento.linhaPreenchida) {
      break;
    }
    linha++;
  }

  return linha;
}

function encontrarColunaNaoPreenchida() {
  let linha = localizacaoLetras[encontrarLinhaNaoPreenchida()];
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