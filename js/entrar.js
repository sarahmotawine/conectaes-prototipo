/* Tela de entrada.
   Não há login de verdade: ao enviar o formulário, vai direto para a busca. */

document.getElementById("form-entrar").addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o navegador de recarregar a página
  window.location.href = "busca.html";
});

/* Volta os pedidos ao estado inicial. Usar entre um participante e outro. */
document.getElementById("reiniciar").addEventListener("click", function (evento) {
  evento.preventDefault();
  if (confirm("Apagar tudo o que foi feito e voltar ao início da demonstração?")) {
    reiniciarDemonstracao();
    alert("Demonstração reiniciada.");
  }
});
