/* Tela de busca: filtra os pedreiros pelo texto, pela especialidade e pela cidade. */

const campoTexto = document.getElementById("texto");
const campoEspecialidade = document.getElementById("especialidade");
const campoCidade = document.getElementById("cidade");
const lista = document.getElementById("lista");

/* Tira acentos e deixa minúsculo, para "antonio" encontrar "Antônio". */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Preenche uma lista de opções (select) sem repetir valores. */
function preencherOpcoes(select, valores) {
  const unicos = [...new Set(valores)].sort();
  unicos.forEach(function (valor) {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = valor;
    select.appendChild(opcao);
  });
}

preencherOpcoes(campoEspecialidade, PEDREIROS.flatMap(function (p) { return p.especialidades; }));
preencherOpcoes(campoCidade, PEDREIROS.map(function (p) { return p.cidade; }));

/* Vindo da página inicial: busca.html?texto=reboco ou ?especialidade=Piso */
campoTexto.value = parametro("texto") || "";
campoEspecialidade.value = parametro("especialidade") || "";

function mostrarResultados() {
  const texto = normalizar(campoTexto.value);
  const especialidade = campoEspecialidade.value;
  const cidade = campoCidade.value;

  const encontrados = PEDREIROS.filter(function (p) {
    const conteudo = normalizar(p.nome + " " + p.especialidades.join(" "));
    return conteudo.includes(texto) &&
           (especialidade === "" || p.especialidades.includes(especialidade)) &&
           (cidade === "" || p.cidade === cidade);
  });

  if (encontrados.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhum pedreiro encontrado com esses filtros.</p>';
    return;
  }

  /* Quem tem mais serviços confirmados aparece primeiro. */
  encontrados.sort(function (a, b) {
    return estatisticas(b).confirmados - estatisticas(a).confirmados;
  });

  lista.innerHTML = encontrados.map(function (p) {
    const est = estatisticas(p);
    return '<a class="cartao" href="perfil.html?id=' + p.id + '">' +
             '<div class="linha">' +
               '<div class="avatar">' + p.iniciais + '</div>' +
               "<div>" +
                 '<p class="nome">' + p.nome + "</p>" +
                 '<p class="suave">' + p.especialidades.join(" · ") + "</p>" +
                 '<p class="suave"><span class="nota">★ ' + formatarNota(est.nota) + "</span>" +
                   " (" + est.avaliacoes + ") · " + p.cidade + "</p>" +
                 '<p class="confirmados">' + est.confirmados + " serviços confirmados</p>" +
               "</div>" +
             "</div>" +
           "</a>";
  }).join("");
}

campoTexto.addEventListener("input", mostrarResultados);
campoEspecialidade.addEventListener("change", mostrarResultados);
campoCidade.addEventListener("change", mostrarResultados);

mostrarResultados();
montarNavegacao("buscar");
