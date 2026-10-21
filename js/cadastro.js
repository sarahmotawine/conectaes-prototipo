/* Tela de cadastro.
   Não há cadastro de verdade: o navegador confere se os campos foram
   preenchidos (atributo "required" no HTML) e, ao enviar, vai para a busca.
   Nenhum dado digitado é guardado. */

document.getElementById("form-cadastro").addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o navegador de recarregar a página
  window.location.href = "busca.html";
});
