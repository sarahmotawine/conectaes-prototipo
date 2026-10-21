/* =========================================================
   Estado da demonstração.

   O protótipo não tem banco de dados. Para que um pedido avance
   de uma tela para outra (pedir, aceitar, confirmar, avaliar),
   o andamento fica guardado no localStorage, um pequeno espaço
   de armazenamento do próprio navegador.

   Isso significa que cada celular tem a sua cópia, e que
   "Reiniciar demonstração", na tela de entrada, volta tudo ao
   início. Use entre um participante do teste e outro.
   ========================================================= */

const CHAVE_ESTADO = "conectaes-demo-v1";

/* Devolve a lista de pedidos. Na primeira vez, copia os pedidos iniciais. */
function carregarPedidos() {
  const salvo = localStorage.getItem(CHAVE_ESTADO);
  if (salvo) {
    return JSON.parse(salvo);
  }
  const copia = JSON.parse(JSON.stringify(PEDIDOS_INICIAIS));
  salvarPedidos(copia);
  return copia;
}

function salvarPedidos(pedidos) {
  localStorage.setItem(CHAVE_ESTADO, JSON.stringify(pedidos));
}

function buscarPedido(id) {
  return carregarPedidos().find(function (p) { return p.id === Number(id); });
}

/* Troca, na lista, o pedido que tem o mesmo id pelo pedido alterado. */
function atualizarPedido(pedidoAlterado) {
  const pedidos = carregarPedidos().map(function (p) {
    return p.id === pedidoAlterado.id ? pedidoAlterado : p;
  });
  salvarPedidos(pedidos);
}

/* Cria um pedido novo de orçamento e devolve ele. */
function criarPedido(pedreiroId, servico, bairro, quando) {
  const pedidos = carregarPedidos();
  const maiorId = Math.max(11, ...pedidos.map(function (p) { return p.id; }));

  const novo = {
    id: maiorId + 1,
    pedreiroId: pedreiroId,
    servico: servico,
    bairro: bairro,
    quando: quando,
    status: "aguardando",
    criadoEm: Date.now(),
    mensagens: [{ de: "cliente", texto: servico }]
  };

  pedidos.push(novo);
  salvarPedidos(pedidos);
  return novo;
}

function reiniciarDemonstracao() {
  localStorage.removeItem(CHAVE_ESTADO);
}

/* Números do perfil do pedreiro: os fixos de dados.js mais o que
   foi confirmado e avaliado durante esta demonstração. É assim que
   o protótipo mostra o contador de serviços confirmados subindo. */
function estatisticas(pedreiro) {
  const deste = carregarPedidos().filter(function (p) { return p.pedreiroId === pedreiro.id; });

  const novosConfirmados = deste.filter(function (p) { return p.confirmadoNaDemo; }).length;
  const novasNotas = deste
    .filter(function (p) { return p.avaliadoNaDemo; })
    .map(function (p) { return p.avaliacao.nota; });

  const totalAvaliacoes = pedreiro.avaliacoes + novasNotas.length;
  const somaNotas = pedreiro.nota * pedreiro.avaliacoes +
    novasNotas.reduce(function (a, b) { return a + b; }, 0);

  return {
    confirmados: pedreiro.confirmados + novosConfirmados,
    avaliacoes: totalAvaliacoes,
    nota: somaNotas / totalAvaliacoes
  };
}
