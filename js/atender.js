/* =========================================================
   Tela de um pedido, do lado do pedreiro: atender.html?id=10

   É o espelho de pedido.js. Aqui o pedreiro faz as duas coisas
   que, para os outros pedreiros, são simuladas:
   - envia o orçamento (aguardando → orcamento);
   - marca o serviço como concluído (aceito → concluido_pelo_pedreiro).
   O cliente, em pedido.js, aceita o orçamento e confirma a conclusão.
   ========================================================= */

exigirPedreiro(); // esta tela só abre para quem entrou como pedreiro

const area = document.getElementById("pedido");
const formMensagem = document.getElementById("form-mensagem");
let pedido = buscarPedido(parametro("id"));

function adicionarMensagem(de, texto) {
  pedido.mensagens.push({ de: de, texto: texto });
}

function salvarEMostrar() {
  atualizarPedido(pedido);
  mostrar();
}

/* Quadro com o orçamento registrado: serviço, valor e prazo. */
function caixaOrcamento(titulo) {
  const o = pedido.orcamento;
  return '<div class="caixa-orcamento">' +
           '<p class="nome" style="margin-bottom:8px">' + titulo + "</p>" +
           "<dl>" +
             "<dt>Serviço</dt><dd>" + escaparHTML(o.descricao) + "</dd>" +
             "<dt>Valor</dt><dd>" + emReais(o.valor) + "</dd>" +
             "<dt>Prazo</dt><dd>" + escaparHTML(o.prazo) + "</dd>" +
           "</dl>" +
         "</div>";
}

/* Formulário do orçamento. */
function formularioOrcamento() {
  return '<form id="form-orcamento" class="cartao">' +
           '<p class="nome">Enviar orçamento</p>' +
           '<label for="descricao">Serviço</label>' +
           '<input id="descricao" required>' +
           '<div class="botoes-lado">' +
             '<div><label for="valor">Valor (R$)</label>' +
             '<input id="valor" type="number" min="1" step="1" inputmode="numeric" required></div>' +
             '<div><label for="prazo">Prazo</label>' +
             '<input id="prazo" placeholder="Ex.: 3 dias" required></div>' +
           "</div>" +
           '<button class="botao" type="submit">Enviar orçamento</button>' +
         "</form>";
}

/* O que aparece abaixo da conversa depende da situação do pedido. */
function acoes() {
  const cliente = escaparHTML(pedido.cliente || "o cliente");
  switch (pedido.status) {
    case "aguardando":
      return formularioOrcamento();

    case "orcamento":
      return caixaOrcamento("Orçamento enviado") +
             '<div class="aviso">Aguardando ' + cliente + " aceitar ou recusar.</div>";

    case "aceito":
      return caixaOrcamento("Orçamento aceito") +
             '<div class="aviso">Quando terminar o serviço, marque como concluído. ' +
               cliente + " vai confirmar, e só então o serviço conta no seu perfil." +
               '<button class="botao" data-acao="concluir">Marcar como concluído</button>' +
             "</div>";

    case "recusado":
      return '<div class="aviso">O orçamento foi recusado.</div>';

    case "concluido_pelo_pedreiro":
      return caixaOrcamento("Orçamento aceito") +
             '<div class="aviso">Você marcou como concluído em ' + pedido.concluidoEm +
               ". Aguardando " + cliente + " confirmar.</div>";

    case "confirmado":
      return caixaOrcamento("Serviço concluído") +
             '<div class="aviso">Conclusão confirmada pelas duas partes. ' +
               "Este serviço já conta no seu perfil.</div>";

    case "avaliado":
      return caixaOrcamento("Serviço concluído") +
             '<div class="cartao"><p class="nome">Avaliação recebida</p>' +
               '<p class="nota" style="font-size:1.3rem; margin:4px 0">' + estrelas(pedido.avaliacao.nota) + "</p>" +
               "<p>" + escaparHTML(pedido.avaliacao.comentario || "Sem comentário.") + "</p>" +
             "</div>";
  }
  return "";
}

function mostrar() {
  if (!pedido || pedido.pedreiroId !== PEDREIRO_DEMO_ID) {
    area.innerHTML = '<p class="vazio">Pedido não encontrado.</p>';
    formMensagem.style.display = "none";
    return;
  }

  const status = descreverStatusPedreiro(pedido.status);
  const nomeCliente = pedido.cliente || "Cliente";
  document.getElementById("titulo").textContent = "Pedido nº " + pedido.id;

  const conversa = pedido.mensagens.map(function (m) {
    if (m.de === "sistema") {
      return '<p class="suave" style="text-align:center">' + escaparHTML(m.texto) + "</p>";
    }
    /* Aqui "você" é o pedreiro: as mensagens dele ficam à direita. */
    const minha = m.de === "pedreiro";
    return '<div class="mensagem ' + (minha ? "cliente" : "pedreiro") + '">' +
             "<small>" + (minha ? "Você" : escaparHTML(nomeCliente)) + "</small>" + escaparHTML(m.texto) +
           "</div>";
  }).join("");

  area.innerHTML =
    linhaDoTempo(pedido.status) +
    '<div class="cartao">' +
      '<p class="nome">' + escaparHTML(nomeCliente) + "</p>" +
      (pedido.bairro ? '<p class="suave com-icone">' + icone("local") + escaparHTML(pedido.bairro) + "</p>" : "") +
      (pedido.quando ? '<p class="suave com-icone">' + icone("data") + escaparHTML(pedido.quando) + "</p>" : "") +
      '<span class="status ' + status.classe + '">' + status.texto + "</span>" +
    "</div>" +
    conversa +
    acoes();

  const encerrado = pedido.status === "avaliado" || pedido.status === "recusado";
  formMensagem.style.display = encerrado ? "none" : "flex";

  /* A descrição já vem com o pedido do cliente. É colocada aqui, e não
     no HTML, para aspas no texto não quebrarem o campo. */
  const form = document.getElementById("form-orcamento");
  if (form) {
    document.getElementById("descricao").value = pedido.servico;
    form.addEventListener("submit", enviarOrcamento);
  }
}

function enviarOrcamento(evento) {
  evento.preventDefault();
  pedido.status = "orcamento";
  pedido.orcamento = {
    descricao: document.getElementById("descricao").value.trim(),
    valor: Number(document.getElementById("valor").value),
    prazo: document.getElementById("prazo").value.trim()
  };
  adicionarMensagem("pedreiro", "Olá! Segue o orçamento.");
  salvarEMostrar();
}

area.addEventListener("click", function (evento) {
  if (evento.target.dataset.acao !== "concluir") return;
  if (!confirm("Marcar o serviço como concluído? O cliente vai precisar confirmar.")) return;
  pedido.status = "concluido_pelo_pedreiro";
  pedido.concluidoEm = hoje();
  adicionarMensagem("pedreiro", "Terminei o serviço. Pode conferir e confirmar no app.");
  salvarEMostrar();
});

formMensagem.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const campo = document.getElementById("mensagem");
  const texto = campo.value.trim();
  if (!texto) return;
  adicionarMensagem("pedreiro", texto);
  campo.value = "";
  salvarEMostrar();
});

mostrar();
montarNavegacao("painel");

/* Se o cliente aceitar, confirmar ou mandar mensagem em outra aba, mostra na hora. */
aoMudarPedidos(function () {
  pedido = buscarPedido(pedido.id);
  mostrar();
});
