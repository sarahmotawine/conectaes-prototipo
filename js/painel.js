/* Painel do pedreiro: os pedidos que chegaram para ele, separados
   pelo que ele precisa fazer, e os números do perfil.
   Na demonstração, o pedreiro é sempre o Carlos Pereira (PEDREIRO_DEMO_ID). */

exigirPedreiro(); // esta tela só abre para quem entrou como pedreiro

const eu = pedreiroPorId(PEDREIRO_DEMO_ID);
const painel = document.getElementById("painel");

/* Um cartão de pedido, que leva para a tela de atender. */
function cartaoPedido(pedido) {
  const status = descreverStatusPedreiro(pedido.status);
  return '<a class="cartao" href="atender.html?id=' + pedido.id + '">' +
           '<p class="nome">' + escaparHTML(pedido.cliente || "Cliente") +
             (pedido.bairro ? ' <span class="suave">· ' + escaparHTML(pedido.bairro) + "</span>" : "") + "</p>" +
           '<p class="suave" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">' +
             escaparHTML(pedido.servico) + "</p>" +
           '<span class="status ' + status.classe + '">' + status.texto + "</span>" +
         "</a>";
}

/* Uma seção com título; some se não houver pedidos nela. */
function secao(titulo, pedidos) {
  if (pedidos.length === 0) return "";
  return "<h3>" + titulo + " (" + pedidos.length + ")</h3>" + pedidos.map(cartaoPedido).join("");
}

function mostrar() {
  const meus = carregarPedidos()
    .filter(function (p) { return p.pedreiroId === eu.id; })
    .sort(function (a, b) { return b.id - a.id; });

  const naSituacao = function (lista) {
    return meus.filter(function (p) { return lista.includes(p.status); });
  };
  const est = estatisticas(eu);

  painel.innerHTML =
    '<div class="cartao linha">' +
      '<div class="avatar">' + eu.iniciais + "</div>" +
      '<div><p class="nome">Olá, ' + eu.nome.split(" ")[0] + "!</p>" +
      '<a class="suave" href="perfil.html?id=' + eu.id + '">Ver meu perfil como o cliente vê →</a></div>' +
    "</div>" +

    '<div class="cartao numeros">' +
      '<div><strong class="nota">★ ' + formatarNota(est.nota) + "</strong>" +
        '<span class="suave">' + est.avaliacoes + " avaliações</span></div>" +
      '<div><strong class="confirmados">' + est.confirmados + "</strong>" +
        '<span class="suave">serviços registrados e confirmados</span></div>' +
    "</div>" +

    (meus.length === 0 ? '<p class="vazio">Nenhum pedido recebido ainda.</p>' : "") +
    secao("Precisam de resposta", naSituacao(["aguardando"])) +
    secao("Em andamento", naSituacao(["orcamento", "aceito", "concluido_pelo_pedreiro"])) +
    secao("Concluídos", naSituacao(["confirmado", "avaliado", "recusado"]));
}

mostrar();
montarNavegacao("painel");

/* Pedido novo feito pelo cliente em outra aba aparece na hora. */
aoMudarPedidos(mostrar);
