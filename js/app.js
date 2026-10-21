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

/* Linha do tempo do pedido, mostrada no topo do pedido (cliente e pedreiro).
   Cada situação diz quantas etapas já terminaram; a seguinte é a atual.
   "Confirmação" só termina quando o cliente confirma o que o pedreiro
   marcou como concluído: é o diferencial da proposta. */
function linhaDoTempo(status) {
  const etapas = ["Pedido", "Orçamento", "Em obra", "Confirmação", "Avaliação"];
  const feitas = {
    aguardando: 1, orcamento: 1, recusado: 1, aceito: 2,
    concluido_pelo_pedreiro: 3, confirmado: 4, avaliado: 5
  }[status];

  return '<ol class="linha-tempo">' + etapas.map(function (nome, i) {
    let classe = "";
    if (i < feitas) classe = "feita";
    else if (i === feitas) classe = status === "recusado" ? "recusada" : "atual";
    const marca = classe === "feita" ? icone("ok") : classe === "recusada" ? icone("fechar") : i + 1;
    return '<li class="' + classe + '"><span>' + marca + "</span>" + nome + "</li>";
  }).join("") + "</ol>";
}

/* O mesmo, do ponto de vista do pedreiro (área do pedreiro). */
function descreverStatusPedreiro(status) {
  const tabela = {
    aguardando:              { texto: "Enviar orçamento",              classe: "atencao" },
    orcamento:               { texto: "Aguardando o cliente",          classe: "" },
    aceito:                  { texto: "Em andamento",                  classe: "atencao" },
    recusado:                { texto: "Orçamento recusado",            classe: "" },
    concluido_pelo_pedreiro: { texto: "Aguardando confirmação",        classe: "" },
    confirmado:              { texto: "Confirmado pelo cliente",       classe: "ok" },
    avaliado:                { texto: "Concluído e avaliado",          classe: "ok" }
  };
  return tabela[status];
}

/* Usada no começo das telas do cliente que exigem login (orçamento,
   pedidos, avaliação). Sem login, manda para a tela de entrar, levando
   no endereço a página onde a pessoa estava, para voltar depois.
   Quem entrou como pedreiro vai para o painel dele. */
function exigirLogin() {
  if (souPedreiro()) {
    window.location.replace("painel-pedreiro.html");
  } else if (!estaLogado()) {
    const aqui = window.location.pathname.split("/").pop() + window.location.search;
    window.location.replace("entrar.html?voltar=" + encodeURIComponent(aqui));
  }
}

/* O mesmo, para as telas da área do pedreiro. */
function exigirPedreiro() {
  if (!souPedreiro()) {
    window.location.replace("entrar.html?tipo=pedreiro");
  }
}

/* Para onde ir depois de entrar ou cadastrar: a página guardada em
   "voltar", ou a inicial. Só aceita páginas do próprio app. */
function destinoDepoisDoLogin() {
  const voltar = parametro("voltar");
  return voltar && /^[a-z-]+\.html(\?[\w=&]*)?$/.test(voltar) ? voltar : "index.html";
}

/* Chama "funcao" quando os pedidos forem alterados em OUTRA aba.
   É o que faz a tela do cliente mostrar na hora o orçamento que o
   pedreiro mandou na outra aba, e vice-versa. */
function aoMudarPedidos(funcao) {
  window.addEventListener("storage", function (evento) {
    if (evento.key === CHAVE_ESTADO) funcao();
  });
}

/* Põe o ícone de seta nos botões de voltar dos cabeçalhos. */
document.querySelectorAll(".cabecalho .voltar").forEach(function (link) {
  link.innerHTML = icone("voltar");
});

/* Coloca a barra de navegação no fim da página e destaca a tela atual.
   Os itens dependem de quem entrou: visitante, cliente ou pedreiro. */
function montarNavegacao(ativa) {
  let itens;
  if (souPedreiro()) {
    itens = [
      { chave: "painel", href: "painel-pedreiro.html",                texto: "Painel" },
      { chave: "perfil", href: "perfil.html?id=" + PEDREIRO_DEMO_ID, texto: "Meu perfil" },
      { chave: "sair",   href: "#",                                   texto: "Sair" }
    ];
  } else {
    itens = [
      { chave: "inicio",  href: "index.html",   texto: "Início" },
      { chave: "buscar",  href: "busca.html",   texto: "Buscar" },
      { chave: "pedidos", href: "pedidos.html", texto: "Pedidos" },
      estaLogado()
        ? { chave: "sair",   href: "#",           texto: "Sair" }
        : { chave: "entrar", href: "entrar.html", texto: "Entrar" }
    ];
  }

  const nav = document.createElement("nav");
  nav.className = "navegacao";
  nav.style.gridTemplateColumns = "repeat(" + itens.length + ", 1fr)";
  nav.innerHTML = itens.map(function (item) {
    const classe = item.chave === ativa ? "ativo" : "";
    return '<a class="' + classe + '" href="' + item.href + '" data-chave="' + item.chave + '">' +
             "<div><span>" + icone(item.chave) + "</span>" + item.texto + "</div></a>";
  }).join("");

  /* Sair: apaga o sinal de login e volta para a página inicial. */
  const sair = nav.querySelector('[data-chave="sair"]');
  if (sair) {
    sair.addEventListener("click", function (evento) {
      evento.preventDefault();
      sairDaConta();
      window.location.href = "index.html";
    });
  }

  document.body.appendChild(nav);
}
