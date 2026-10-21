/* Lista de pedidos, do mais recente para o mais antigo. */

exigirLogin(); // esta tela só abre com login (ver app.js)

const pedidos = carregarPedidos().sort(function (a, b) { return b.id - a.id; });
const lista = document.getElementById("lista");

if (pedidos.length === 0) {
  lista.innerHTML = '<p class="vazio">Você ainda não fez nenhum pedido.</p>';
} else {
  lista.innerHTML = pedidos.map(function (pedido) {
    const pedreiro = pedreiroPorId(pedido.pedreiroId);
    const status = descreverStatus(pedido.status);
    return '<a class="cartao" href="pedido.html?id=' + pedido.id + '">' +
             '<div class="linha">' +
               '<div class="avatar">' + pedreiro.iniciais + "</div>" +
               '<div style="min-width:0">' +
                 '<p class="nome">' + pedreiro.nome + "</p>" +
                 '<p class="suave" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">' +
                   escaparHTML(pedido.servico) + "</p>" +
                 '<span class="status ' + status.classe + '">' + status.texto + "</span>" +
               "</div>" +
             "</div>" +
           "</a>";
  }).join("");
}

montarNavegacao("pedidos");
