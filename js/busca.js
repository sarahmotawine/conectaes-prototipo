/* Tela de busca: filtra os pedreiros pelo texto, pela especialidade e pela cidade.
   Os filtros são "chips": botões de tocar. Tocar de novo no escolhido desfaz. */

const campoTexto = document.getElementById("texto");
const lista = document.getElementById("lista");
const filtro = { especialidade: "", cidade: "" };

document.getElementById("icone-busca").innerHTML = icone("buscar");

/* Tira acentos e deixa minúsculo, para "antonio" encontrar "Antônio". */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/* Monta uma fileira de chips, sem repetir valores. */
function montarChips(idDaFileira, chave, valores) {
  const unicos = [...new Set(valores)].sort();
  const fileira = document.getElementById(idDaFileira);
  fileira.innerHTML = unicos.map(function (valor) {
    return '<button type="button" class="chip" data-valor="' + valor + '">' + valor + "</button>";
  }).join("");

  fileira.addEventListener("click", function (evento) {
    const chip = evento.target.closest(".chip");
    if (!chip) return;
    filtro[chave] = filtro[chave] === chip.dataset.valor ? "" : chip.dataset.valor;
    mostrarResultados();
  });
}

montarChips("chips-especialidade", "especialidade", PEDREIROS.flatMap(function (p) { return p.especialidades; }));
montarChips("chips-cidade", "cidade", PEDREIROS.map(function (p) { return p.cidade; }));

/* Vindo da página inicial: busca.html?texto=reboco ou ?especialidade=Piso */
campoTexto.value = parametro("texto") || "";
filtro.especialidade = parametro("especialidade") || "";

function mostrarResultados() {
  /* Acende os chips escolhidos. */
  document.querySelectorAll("#chips-especialidade .chip").forEach(function (c) {
    c.classList.toggle("ativo", c.dataset.valor === filtro.especialidade);
  });
  document.querySelectorAll("#chips-cidade .chip").forEach(function (c) {
    c.classList.toggle("ativo", c.dataset.valor === filtro.cidade);
  });

  const texto = normalizar(campoTexto.value);
  const encontrados = PEDREIROS.filter(function (p) {
    const conteudo = normalizar(p.nome + " " + p.especialidades.join(" "));
    return conteudo.includes(texto) &&
           (filtro.especialidade === "" || p.especialidades.includes(filtro.especialidade)) &&
           (filtro.cidade === "" || p.cidade === filtro.cidade);
  });

  document.getElementById("contagem").textContent =
    encontrados.length === 1 ? "1 pedreiro encontrado" : encontrados.length + " pedreiros encontrados";

  if (encontrados.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhum pedreiro encontrado com esses filtros.</p>';
    return;
  }

  /* Quem tem mais serviços confirmados aparece primeiro. */
  encontrados.sort(function (a, b) {
    return estatisticas(b).confirmados - estatisticas(a).confirmados;
  });

  /* Cartão com a foto da primeira obra e a bolinha do pedreiro por cima. */
  lista.innerHTML = encontrados.map(function (p) {
    const est = estatisticas(p);
    return '<a class="cartao-pedreiro" href="perfil.html?id=' + p.id + '">' +
             '<img src="img/obras/' + p.obras[0].foto + '.jpg" alt="" loading="lazy">' +
             '<div class="cartao-pedreiro-texto">' +
               '<div class="avatar">' + p.iniciais + "</div>" +
               '<p class="nome">' + p.nome + "</p>" +
               '<p class="suave">' + p.especialidades.join(" · ") + "</p>" +
               '<p class="suave"><span class="nota">★ ' + formatarNota(est.nota) + "</span>" +
                 " (" + est.avaliacoes + ") · " + p.cidade + "</p>" +
               '<p class="confirmados">' + est.confirmados + " serviços confirmados</p>" +
             "</div>" +
           "</a>";
  }).join("");
}

campoTexto.addEventListener("input", mostrarResultados);

mostrarResultados();
montarNavegacao("buscar");
