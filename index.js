let inputs = document.querySelectorAll(".row-1 input");
let inputs2 = document.querySelectorAll(".row-2 input");
let inputs3 = document.querySelectorAll(".row-3 input");
let inputs4 = document.querySelectorAll(".row-4 input");
let inputs5 = document.querySelectorAll(".row-5 input");
let inputs6 = document.querySelectorAll(".row-6 input");
let container = document.querySelector(".container");
let form = document.querySelector("form");
let teclado = document.querySelectorAll(".teclado_linha");
let linhaSelecionada = document.getElementsByClassName("selecionado");
let modalGanhou = document.querySelector(".modal_ganhou");
let modalPerdeu = document.querySelector(".modal_perdeu");
let modalTutorial = document.querySelector(".modal-tutorial");
let buttonModal = document.querySelector(".button_modal");
let buttonHelp = document.querySelector(".icon-help");
let buttonModalPerdeu = document.querySelector(".button_modalPerdeu");
let btn = "";
let button = "";
let arrayInputs = [inputs, inputs2, inputs3, inputs4, inputs5, inputs6];
let palavra = "";
let linhaPerdeu = 0;

// Adiciona dinamicamente a palavra que o usuario precisa advinhar
function palavraOculta(palavraOculta) {
  palavra = palavraOculta;
  let arrayPalavra = palavraOculta.toLowerCase().split("");

  for (let i = 0; i < arrayInputs.length; i++) {
    for (let y = 0; y < arrayInputs[i].length; y++) {
      arrayInputs[i][y].dataset.resposta = btoa(arrayPalavra[y]);
    }
  }
  return palavra;
}

function tecladoVirtual() {
  let tecladoLinha1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  let tecladoLinha2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  let tecladoLinha3 = ["z", "x", "c", "v", "b", "n", "m"];

  tecladoLinha1.forEach((letra) => {
    teclado[0].innerHTML += `<button class="teclado__letra" value="${letra}">${letra}</button>`;
  });

  tecladoLinha2.forEach((letra) => {
    teclado[1].innerHTML += `<button class="teclado__letra"  value="${letra}">${letra}</button>`;
  });
  teclado[1].innerHTML += `<button style="margin-left:6px; width: 60px;" value="" id="apagar" class="material-icons teclado__letra">backspace</button>`;

  tecladoLinha3.forEach((letra) => {
    teclado[2].innerHTML += `<button class="teclado__letra" value="${letra}">${letra}</button>`;
  });
  teclado[2].innerHTML += `<button type="submit" style="margin-left:6px; width: 110px;" class="teclado__letra" id="enter">Enter</button>`;

  btn = document.getElementById("enter");

  teclado[1].style.marginLeft = "30px";
  teclado[2].style.marginLeft = "50px";

  let apagar = document.getElementById("apagar");

  button = document.querySelectorAll(".teclado__letra");

  // for (let i = 0; i < arrayInputs.length; i++) {
  //   for (let y = 0; y < arrayInputs[i].length; y++) {
  //     arrayInputs[i][y].addEventListener("focus", () => {
  //       button.forEach((btn) => {
  //           btn.addEventListener("click", () => {
  //               if (y < 4) {
  //                 arrayInputs[i][y].value = btn.value;
  //                 arrayInputs[i][y + 1].focus();
  //               } else {
  //                 arrayInputs[i][y].value = btn.value;
  //                 arrayInputs[i][y].focus();
  //               }
  //               y = y+1
  //           });
  //       });
  //     })
  //   }
  // }
}

// Avança ou recua o foco do input
function focoInput() {
  for (let i = 0; i < arrayInputs.length; i++) {
    for (let y = 0; y < arrayInputs[i].length; y++) {
      arrayInputs[0][0].focus();
      arrayInputs[0][y].style.backgroundColor = "transparent";

      arrayInputs[i][y].addEventListener("keyup", (e) => {
        if (e.target.value !== "") {
          if (y != 4) {
            arrayInputs[i][y + 1].focus();
          } else {
            arrayInputs[i][y].focus();
          }
        }
        arrayInputs[i][y].addEventListener("keydown", (e) => {
          if (e.code == "Backspace") {
            arrayInputs[i][y].value = "";
            arrayInputs[i][y - 1].focus();
          }
        });
      });
    }
  }
}

// Validação para aceitar apenas letras nos inputs
function validacaoInput() {
  for (let i = 0; i < arrayInputs.length; i++) {
    for (let y = 0; y < arrayInputs[i].length; y++) {
      arrayInputs[i][y].addEventListener("keypress", (e) => {
        let keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode >= 97 && keyCode < 123) {
          arrayInputs[i][y].value = e.target.value;
        } else {
          e.preventDefault();
        }
      });
    }
  }
}

// Indica se acertou ou errou a letra da palavra
function validarPalavraStyle() {
  let acertou = true;

  for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
    if (
      linhaSelecionada[0].children[y].value !=
      atob(linhaSelecionada[0].children[y].dataset.resposta)
    ) {
      if (linhaSelecionada[0].children[y].value != "") {
        if (palavra.includes(linhaSelecionada[0].children[y].value)) {
          linhaSelecionada[0].children[y].classList.add("outra");
          linhaSelecionada[0].children[y].style.backgroundColor = "#d3ad69";
        } else {
          linhaSelecionada[0].children[y].classList.add("naoTem");
          linhaSelecionada[0].children[y].style.backgroundColor = "#312a2c";
        }
      }
      acertou = false;
    } else {
      linhaSelecionada[0].children[y].classList.add("tem");
      linhaSelecionada[0].children[y].style.backgroundColor = "#3aa394";
    }
  }
  return acertou;
}

// Finaliza o jogo se a palavra estiver correta ou avança para a proxima linha se não estiver
function ValidarPalavra() {
  // validação pelo click
  btn.addEventListener("click", () => {
    if (validarPalavraStyle()) {
      for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
        linhaSelecionada[0].children[y].setAttribute("disabled", "disabled");
      }
    } else {
      for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
        linhaSelecionada[0].children[y].setAttribute("disabled", "disabled");
      }

      linhaSelecionada[0].nextElementSibling.classList.add("selecionado");
      linhaSelecionada[0].classList.remove("selecionado");
      for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
        linhaSelecionada[0].children[y].style.backgroundColor = "transparent";
        linhaSelecionada[0].children[y].removeAttribute("disabled");
      }
      linhaSelecionada[0].children[0].focus();
    }
  });

  // validação pelo keyup
  for (let i = 0; i < arrayInputs.length; i++) {
    for (let y = 0; y < arrayInputs[i].length; y++) {
      arrayInputs[i][y].addEventListener("keyup", (e) => {
        if (arrayInputs[i][y].value != "") {
          if (e.code == "Enter") {
            if (validarPalavraStyle()) {
              for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
                linhaSelecionada[0].children[y].setAttribute(
                  "disabled",
                  "disabled"
                );
              }
              setTimeout(() => {
                modalGanhou.style.display = "block";
              }, 500);

              buttonModal.addEventListener("click", () => {
                modalGanhou.style.display = "none";
                jogarNovamente = true;
                console.log(jogarNovamente);
              });
            } else {
              for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
                linhaSelecionada[0].children[y].setAttribute(
                  "disabled",
                  "disabled"
                );
              }
              linhaPerdeu = linhaPerdeu + 1;

              if (linhaPerdeu == 6) {
                setTimeout(() => {
                  modalPerdeu.style.display = "block";
                }, 500);
              }
              buttonModalPerdeu.addEventListener("click", () => {
                console.log(arrayInputs[0][0].value);
                modalPerdeu.style.display = "none";
                jogarNovamente = true;
                if (jogarNovamente) {
                  console.log("ola");
                  novoJogo.innerHTML = `<button class="novoJogo">Jogar novamente</button>`;
                }
              });
              linhaSelecionada[0].nextElementSibling.classList.add(
                "selecionado"
              );
              linhaSelecionada[0].classList.remove("selecionado");
              for (let y = 0; y < linhaSelecionada[0].childElementCount; y++) {
                linhaSelecionada[0].children[y].style.backgroundColor =
                  "transparent";
                linhaSelecionada[0].children[y].removeAttribute("disabled");
              }
              linhaSelecionada[0].children[0].focus();
            }
          }
        }
      });
    }
  }
}

function ganhou() {
  btn.addEventListener("click", () => {
    if (!validarPalavraStyle()) {
      linhaPerdeu = linhaPerdeu + 1;
      if (linhaPerdeu == 6) {
        setTimeout(() => {
          modalPerdeu.style.display = "block";
        }, 500);
      }
    } else {
      setTimeout(() => {
        modalGanhou.style.display = "block";
      }, 500);
    }
  });
}

function ajuda() {
  buttonHelp.addEventListener("click", () => {
    if (modalTutorial.style.display == "none") {
      modalTutorial.style.display = "block";
    } else {
      modalTutorial.style.display = "none";
    }
  });
}

palavraOculta("radio");
tecladoVirtual();
focoInput();
validacaoInput();
ValidarPalavra();
ganhou();
ajuda();
