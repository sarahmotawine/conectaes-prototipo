/* Página inicial: busca rápida, categorias e pedreiros em destaque.
   Tudo aqui é aberto; não precisa de login. */

/* Ícones da busca e das setas do carrossel (ver icones.js). */
document.querySelector(".busca-rapida button").innerHTML = icone("buscar");
document.getElementById("anterior").innerHTML = icone("anterior");
document.getElementById("proximo").innerHTML = icone("proximo");

/* Botão do topo: "Entrar" ou, para quem já entrou, o atalho da conta. */
const conta = document.getElementById("conta");
if (souPedreiro()) {
  conta.textContent = "Meu painel";
  conta.href = "painel-pedreiro.html";
} else if (estaLogado()) {
  conta.textContent = "Meus pedidos";
  conta.href = "pedidos.html";
}

/* Busca rápida: leva o texto para a tela de busca. */
document.getElementById("form-busca").addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = document.getElementById("texto").value.trim();
  window.location.href = "busca.html" + (texto ? "?texto=" + encodeURIComponent(texto) : "");
});

/* Categorias: uma para cada especialidade que aparece nos pedreiros.
   O ícone de cada especialidade fica em icones.js, com o mesmo nome. */
const especialidades = [...new Set(PEDREIROS.flatMap(function (p) { return p.especialidades; }))];
document.getElementById("categorias").innerHTML = especialidades.map(function (e) {
  return '<a class="categoria" href="busca.html?especialidade=' + encodeURIComponent(e) + '">' +
           "<span>" + icone(e) + "</span>" + e +
         "</a>";
}).join("") +
  '<a class="categoria" href="busca.html"><span>' + icone("todos") + "</span>Ver todos</a>";

/* Destaques: os quatro de nota mais alta, com a foto da primeira obra. */
const destaques = PEDREIROS.slice().sort(function (a, b) {
  return estatisticas(b).nota - estatisticas(a).nota;
}).slice(0, 4);

document.getElementById("destaques").innerHTML = destaques.map(function (p) {
  const est = estatisticas(p);
  return '<a class="destaque" href="perfil.html?id=' + p.id + '">' +
           '<img src="img/obras/' + p.obras[0].foto + '.jpg" alt="" loading="lazy">' +
           '<div class="destaque-texto">' +
             '<p class="nome">' + p.nome + "</p>" +
             '<p class="suave">' + p.especialidades[0] + " · " + p.cidade + "</p>" +
             '<p class="suave"><span class="nota">★ ' + formatarNota(est.nota) + "</span>" +
               " · " + est.confirmados + " confirmados</p>" +
           "</div>" +
         "</a>";
}).join("");

/* Como funciona: banners que passam sozinhos a cada 5 segundos.
   A pessoa também pode arrastar com o dedo ou tocar nos tracinhos;
   depois que ela mexe, a troca automática para. */
const slides = document.getElementById("slides");
const pontos = document.getElementById("pontos");
const totalSlides = slides.children.length;
let atual = 0;

for (let i = 0; i < totalSlides; i++) {
  const ponto = document.createElement("button");
  ponto.type = "button";
  ponto.setAttribute("aria-label", "Passo " + (i + 1));
  ponto.addEventListener("click", function () { pararAutomatico(); irPara(i); });
  pontos.appendChild(ponto);
}

function irPara(indice) {
  atual = (indice + totalSlides) % totalSlides; // dá a volta: depois do último, o primeiro
  slides.scrollTo({ left: atual * slides.clientWidth });
}

/* Acende o tracinho do banner que está na tela, inclusive ao arrastar. */
function marcarPonto() {
  atual = Math.round(slides.scrollLeft / slides.clientWidth);
  [...pontos.children].forEach(function (ponto, i) {
    ponto.classList.toggle("ativo", i === atual);
  });
}
slides.addEventListener("scroll", marcarPonto);
marcarPonto();

let automatico = setInterval(function () { irPara(atual + 1); }, 5000);
function pararAutomatico() { clearInterval(automatico); }
slides.addEventListener("touchstart", pararAutomatico, { passive: true });

document.getElementById("anterior").addEventListener("click", function () { pararAutomatico(); irPara(atual - 1); });
document.getElementById("proximo").addEventListener("click", function () { pararAutomatico(); irPara(atual + 1); });

/* Volta os pedidos ao estado inicial e sai da conta.
   Usar entre um participante do teste e outro. */
document.getElementById("reiniciar").addEventListener("click", function (evento) {
  evento.preventDefault();
  if (confirm("Apagar tudo o que foi feito e voltar ao início da demonstração?")) {
    reiniciarDemonstracao();
    window.location.reload();
  }
});

montarNavegacao("inicio");
