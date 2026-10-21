/* =========================================================
   Tela de um pedido. O pedido vem do endereço: pedido.html?id=12

   Um pedido passa por estas situações (status):

     aguardando → orcamento → aceito → concluido_pelo_pedreiro → confirmado → avaliado
                            ↘ recusado

   Esta é a tela do cliente. O lado do pedreiro só existe, de verdade,
   para o Carlos Pereira (área do pedreiro, atender.html). Para os
   outros pedreiros, duas coisas são simuladas:
   - o orçamento chega sozinho alguns segundos depois do pedido;
   - o pedido de exemplo nº 8 já vem marcado como concluído.
   ========================================================= */

exigirLogin(); // esta tela só abre com login (ver app.js)

const SEGUNDOS_PARA_ORCAMENTO = 4;

const area = document.getElementById("pedido");
const formMensagem = document.getElementById("form-mensagem");
let pedido = buscarPedido(parametro("id"));

function adicionarMensagem(de, texto) {
  pedido.mensagens.push({ de: de, texto: texto });
}

/* Guarda a alteração e redesenha a tela. */
function salvarEMostrar() {
  atualizarPedido(pedido);
  mostrar();
  if (window.atualizarBolinha) window.atualizarBolinha();
}

/* Quadro com o orçamento registrado: serviço, valor e prazo. */
function caixaOrcamento(titulo) {
  const o = pedido.orcamento;
  return '<div class="caixa-orcamento">' +
           '<p class="nome" style="margin-bottom:8px">' + titulo + "</p>" +
           "<dl>" +
             "<dt>Serviço</dt><dd>" + escaparHTML(o.descricao) + "</dd>" +
             "<dt>Valor</dt><dd>" + emReais(o.valor) + "</dd>" +
             "<dt>Prazo</dt><dd>" + o.prazo + "</dd>" +
           "</dl>" +
         "</div>";
}

/* O que aparece abaixo da conversa depende da situação do pedido.
   Os botões têm um "data-acao", tratado lá embaixo. */
function acoes(pedreiro) {
  switch (pedido.status) {
    case "aguardando":
      return '<div class="aviso">Pedido enviado. Aguardando o orçamento de ' + pedreiro.nome + "…</div>";

    case "orcamento":
      return caixaOrcamento("Orçamento recebido") +
             '<div class="botoes-lado">' +
               '<button class="botao secundario" data-acao="recusar">Recusar</button>' +
               '<button class="botao" data-acao="aceitar">Aceitar</button>' +
             "</div>";

    case "aceito":
      return caixaOrcamento("Orçamento aceito") +
             '<div class="aviso">Serviço em andamento. Quando ' + pedreiro.nome +
             " marcar o serviço como concluído, você poderá confirmar e avaliar.</div>";

    case "recusado":
      return '<div class="aviso">Você recusou este orçamento.</div>';

    case "concluido_pelo_pedreiro":
      return caixaOrcamento("Orçamento aceito") +
             '<div class="aviso"><strong>' + pedreiro.nome + "</strong> informou que concluiu o serviço em " +
               pedido.concluidoEm + ". Você confirma?" +
               '<div class="botoes-lado">' +
                 '<button class="botao secundario" data-acao="nao-concluido">Ainda não</button>' +
                 '<button class="botao" data-acao="confirmar">Confirmar</button>' +
               "</div>" +
             "</div>";

    case "confirmado":
      return caixaOrcamento("Serviço concluído") +
             '<div class="aviso">Conclusão confirmada pelas duas partes. Agora você pode avaliar.' +
               '<a class="botao" href="avaliar.html?pedido=' + pedido.id + '">Avaliar o serviço</a>' +
             "</div>";

    case "avaliado":
      return caixaOrcamento("Serviço concluído") +
             '<div class="cartao"><p class="nome">Sua avaliação</p>' +
               '<p class="nota" style="font-size:1.3rem; margin:4px 0">' + estrelas(pedido.avaliacao.nota) + "</p>" +
               "<p>" + escaparHTML(pedido.avaliacao.comentario || "Sem comentário.") + "</p>" +
             "</div>";
  }
  return "";
}

function mostrar() {
  if (!pedido) {
    area.innerHTML = '<p class="vazio">Pedido não encontrado.</p>';
    formMensagem.style.display = "none";
    return;
  }

  const pedreiro = pedreiroPorId(pedido.pedreiroId);
  const status = descreverStatus(pedido.status);
  document.getElementById("titulo").textContent = "Pedido nº " + pedido.id;

  const conversa = pedido.mensagens.map(function (m) {
    if (m.de === "sistema") {
      return '<p class="suave" style="text-align:center">' + escaparHTML(m.texto) + "</p>";
    }
    const quem = m.de === "cliente" ? "Você" : pedreiro.nome;
    return '<div class="mensagem ' + m.de + '"><small>' + quem + "</small>" + escaparHTML(m.texto) + "</div>";
  }).join("");

  area.innerHTML =
    linhaDoTempo(pedido.status) +
    '<a class="cartao linha" href="perfil.html?id=' + pedreiro.id + '">' +
      '<div class="avatar">' + pedreiro.iniciais + "</div>" +
      '<div><p class="nome">' + pedreiro.nome + "</p>" +
      '<span class="status ' + status.classe + '">' + status.texto + "</span></div>" +
    "</a>" +
    conversa +
    acoes(pedreiro);

  /* Depois de avaliado ou recusado, não faz mais sentido mandar mensagem. */
  const encerrado = pedido.status === "avaliado" || pedido.status === "recusado";
  formMensagem.style.display = encerrado ? "none" : "flex";
}

/* Simulação: o pedreiro responde com um orçamento. */
function simularOrcamento() {
  pedido = buscarPedido(pedido.id); // relê, caso algo tenha mudado
  if (pedido.status !== "aguardando") return;

  pedido.status = "orcamento";
  pedido.orcamento = {
    descricao: pedido.servico.length > 60 ? pedido.servico.slice(0, 60) + "…" : pedido.servico,
    valor: 480,
    prazo: "3 dias"
  };
  adicionarMensagem("pedreiro", "Olá! Posso fazer esse serviço. Segue o orçamento.");
  salvarEMostrar();
}

/* Um único "ouvinte" de cliques para todos os botões da tela. */
area.addEventListener("click", function (evento) {
  const acao = evento.target.dataset.acao;
  if (!acao) return;

  if (acao === "aceitar") {
    pedido.status = "aceito";
    adicionarMensagem("sistema", "Orçamento aceito em " + hoje() + ".");
    avisar("Orçamento aceito");
  }

  if (acao === "recusar") {
    if (!confirm("Recusar este orçamento?")) return;
    pedido.status = "recusado";
    adicionarMensagem("sistema", "Orçamento recusado em " + hoje() + ".");
    avisar("Orçamento recusado");
  }

  if (acao === "confirmar") {
    pedido.status = "confirmado";
    pedido.confirmadoNaDemo = true; // passa a contar no perfil do pedreiro
    adicionarMensagem("sistema", "Conclusão confirmada pelo cliente em " + hoje() + ".");
    avisar("Conclusão confirmada");
  }

  if (acao === "nao-concluido") {
    pedido.status = "aceito";
    adicionarMensagem("sistema", "O cliente informou que o serviço ainda não foi concluído.");
  }

  salvarEMostrar();
});

formMensagem.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const campo = document.getElementById("mensagem");
  const texto = campo.value.trim();
  if (!texto) return;
  adicionarMensagem("cliente", texto);
  campo.value = "";
  salvarEMostrar();
});

mostrar();
montarNavegacao("pedidos");

/* Se o pedreiro responder em outra aba, mostra na hora. */
aoMudarPedidos(function () {
  pedido = buscarPedido(pedido.id);
  mostrar();
});

/* Se o pedido ainda espera orçamento, agenda a resposta simulada.
   Menos para o Carlos, que responde pela área do pedreiro. */
if (pedido && pedido.status === "aguardando" && pedido.pedreiroId !== PEDREIRO_DEMO_ID) {
  const passou = Date.now() - pedido.criadoEm;
  const falta = Math.max(0, SEGUNDOS_PARA_ORCAMENTO * 1000 - passou);
  setTimeout(simularOrcamento, falta);
}
