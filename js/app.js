/* =========================================================
   Funções usadas por várias telas.
   ========================================================= */

/* Registra o service worker, o arquivo que permite instalar o app
   na tela inicial e abri-lo sem internet. Ver sw.js. */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js");
  });
}

/* Lê um valor do endereço da página. Em "perfil.html?id=3",
   parametro("id") devolve "3". */
function parametro(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

function pedreiroPorId(id) {
  return PEDREIROS.find(function (p) { return p.id === Number(id); });
}

/* 480 vira "R$ 480,00" */
function emReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* 4.8 vira "4,8" */
function formatarNota(nota) {
  return nota.toFixed(1).replace(".", ",");
}

/* 4 vira "★★★★☆" */
function estrelas(nota) {
  const cheias = Math.round(nota);
  return "★".repeat(cheias) + "☆".repeat(5 - cheias);
}

function hoje() {
  return new Date().toLocaleDateString("pt-BR");
}

/* Impede que um texto digitado pela pessoa seja interpretado como
   código HTML quando colocado na tela. */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* Texto e cor da etiqueta de cada situação do pedido. */
function descreverStatus(status) {
  const tabela = {
    aguardando:              { texto: "Aguardando orçamento", classe: "" },
    orcamento:               { texto: "Orçamento recebido",   classe: "atencao" },
    aceito:                  { texto: "Em andamento",         classe: "" },
    recusado:                { texto: "Orçamento recusado",   classe: "" },
    concluido_pelo_pedreiro: { texto: "Confirme a conclusão", classe: "atencao" },
    confirmado:              { texto: "Avalie o serviço",     classe: "atencao" },
    avaliado:                { texto: "Concluído",            classe: "ok" }
  };
  return tabela[status];
}

/* Coloca a barra de navegação no fim da página e destaca a tela atual. */
function montarNavegacao(ativa) {
  const itens = [
    { chave: "inicio",  href: "busca.html",   icone: "🔍", texto: "Início" },
    { chave: "pedidos", href: "pedidos.html", icone: "📋", texto: "Pedidos" },
    { chave: "sair",    href: "index.html",   icone: "↩",  texto: "Sair" }
  ];

  const nav = document.createElement("nav");
  nav.className = "navegacao";
  nav.innerHTML = itens.map(function (item) {
    const classe = item.chave === ativa ? "ativo" : "";
    return '<a class="' + classe + '" href="' + item.href + '">' +
             "<div><span>" + item.icone + "</span>" + item.texto + "</div></a>";
  }).join("");

  document.body.appendChild(nav);
}
