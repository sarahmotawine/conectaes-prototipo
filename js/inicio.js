/* Página inicial: busca rápida, categorias e pedreiros em destaque.
   Tudo aqui é aberto; não precisa de login. */

/* Ícone de cada especialidade. Uma especialidade nova em dados.js
   aparece com o ícone 🛠️ até ganhar um aqui. */
const ICONES = {
  "Alvenaria": "🧱",
  "Reboco": "🪣",
  "Azulejo": "🚿",
  "Piso": "🔲",
  "Telhado": "🏠",
  "Acabamento": "🖌️",
  "Pequenos reparos": "🔧"
};

/* Botão do topo: "Entrar" ou, para quem já entrou, "Meus pedidos". */
if (estaLogado()) {
  const conta = document.getElementById("conta");
  conta.textContent = "Meus pedidos";
  conta.href = "pedidos.html";
}

/* Busca rápida: leva o texto para a tela de busca. */
document.getElementById("form-busca").addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = document.getElementById("texto").value.trim();
  window.location.href = "busca.html" + (texto ? "?texto=" + encodeURIComponent(texto) : "");
});

/* Categorias: uma para cada especialidade que aparece nos pedreiros. */
const especialidades = [...new Set(PEDREIROS.flatMap(function (p) { return p.especialidades; }))];
document.getElementById("categorias").innerHTML = especialidades.map(function (e) {
  return '<a class="categoria" href="busca.html?especialidade=' + encodeURIComponent(e) + '">' +
           "<span>" + (ICONES[e] || "🛠️") + "</span>" + e +
         "</a>";
}).join("") +
  '<a class="categoria" href="busca.html"><span>➕</span>Ver todos</a>';

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
