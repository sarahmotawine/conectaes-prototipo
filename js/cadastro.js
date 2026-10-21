/* Tela de cadastro.
   Não há cadastro de verdade: o navegador confere se os campos foram
   preenchidos (atributo "required" no HTML) e, ao enviar, entra na conta
   e volta para onde a pessoa estava. Nenhum dado digitado é guardado. */

/* Repassa o destino para a tela de entrar, se a pessoa já tiver conta. */
if (parametro("voltar")) {
  document.getElementById("link-entrar").href =
    "entrar.html?voltar=" + encodeURIComponent(parametro("voltar"));
}

document.getElementById("form-cadastro").addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o navegador de recarregar a página
  entrarNaConta();
  window.location.href = destinoDepoisDoLogin();
});
