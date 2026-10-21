/* Tela de avaliação. O pedido vem do endereço: avaliar.html?pedido=8

   Regra central da proposta: só é possível avaliar um serviço cuja
   conclusão foi confirmada pelas duas partes. */

exigirLogin(); // esta tela só abre com login (ver app.js)

const pedido = buscarPedido(parametro("pedido"));
const area = document.getElementById("avaliacao");
let notaEscolhida = 0;

if (!pedido || pedido.status !== "confirmado") {
  area.innerHTML = '<div class="aviso">Só é possível avaliar um serviço depois que a ' +
                   "conclusão for confirmada pelas duas partes.</div>";
} else {
  const pedreiro = pedreiroPorId(pedido.pedreiroId);
  document.getElementById("voltar").href = "pedido.html?id=" + pedido.id;

  /* Cinco botões, um para cada estrela. */
  let botoes = "";
  for (let n = 1; n <= 5; n++) {
    botoes += '<button type="button" data-nota="' + n + '" aria-label="' + n + ' estrela(s)">★</button>';
  }

  area.innerHTML =
    '<div class="cartao linha">' +
      '<div class="avatar">' + pedreiro.iniciais + "</div>" +
      '<div><p class="nome">' + pedreiro.nome + "</p>" +
      '<p class="suave">' + escaparHTML(pedido.orcamento.descricao) + "</p></div>" +
    "</div>" +
    '<form id="form-avaliacao">' +
      '<p style="text-align:center; font-weight:600; margin-top:20px">Como foi o serviço?</p>' +
      '<div class="estrelas" id="estrelas">' + botoes + "</div>" +
      '<label for="comentario">Comentário (opcional)</label>' +
      '<textarea id="comentario" placeholder="Conte como foi para ajudar outros clientes"></textarea>' +
      '<p class="suave erro" id="erro" style="display:none">Escolha de 1 a 5 estrelas.</p>' +
      '<button class="botao" type="submit">Enviar avaliação</button>' +
    "</form>";

  /* Acende as estrelas até a escolhida. */
  document.getElementById("estrelas").addEventListener("click", function (evento) {
    const nota = Number(evento.target.dataset.nota);
    if (!nota) return;
    notaEscolhida = nota;
    document.querySelectorAll("#estrelas button").forEach(function (botao) {
      botao.classList.toggle("acesa", Number(botao.dataset.nota) <= nota);
    });
    document.getElementById("erro").style.display = "none";
  });

  document.getElementById("form-avaliacao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (notaEscolhida === 0) {
      document.getElementById("erro").style.display = "block";
      return;
    }
    pedido.status = "avaliado";
    pedido.avaliadoNaDemo = true; // passa a contar na nota do pedreiro
    pedido.avaliacao = {
      nota: notaEscolhida,
      comentario: document.getElementById("comentario").value.trim()
    };
    pedido.mensagens.push({ de: "sistema", texto: "Avaliação enviada em " + hoje() + "." });
    atualizarPedido(pedido);
    avisarNaProximaTela("Avaliação enviada. Obrigado!");
    window.location.href = "pedido.html?id=" + pedido.id;
  });
}

montarNavegacao("pedidos");
