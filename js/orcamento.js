/* Tela de pedido de orçamento. O pedreiro vem do endereço: orcamento.html?id=1 */

exigirLogin(); // esta tela só abre com login (ver app.js)

const pedreiro = pedreiroPorId(parametro("id"));

if (pedreiro) {
  document.getElementById("voltar").href = "perfil.html?id=" + pedreiro.id;
  document.getElementById("para-quem").innerHTML =
    '<div class="avatar">' + pedreiro.iniciais + "</div>" +
    '<div><p class="nome">' + pedreiro.nome + "</p>" +
    '<p class="suave">' + pedreiro.especialidades.join(" · ") + "</p></div>";
}

document.getElementById("form-orcamento").addEventListener("submit", function (evento) {
  evento.preventDefault();

  const novo = criarPedido(
    pedreiro.id,
    document.getElementById("servico").value.trim(),
    document.getElementById("bairro").value.trim(),
    document.getElementById("quando").value
  );

  /* Vai direto para o pedido recém-criado. */
  window.location.href = "pedido.html?id=" + novo.id;
});

montarNavegacao("buscar");
