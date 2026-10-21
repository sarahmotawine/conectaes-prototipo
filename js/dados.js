/* =========================================================
   Dados fictícios do protótipo.
   Os pedreiros e os pedidos abaixo foram inventados.
   Nada aqui vem de um banco de dados: é tudo fixo neste arquivo.
   ========================================================= */

const PEDREIROS = [
  {
    id: 1,
    nome: "José Santos",
    iniciais: "JS",
    cidade: "Vila Velha",
    especialidades: ["Azulejo", "Reboco", "Piso"],
    anos: 12,
    nota: 4.8,
    avaliacoes: 23,
    confirmados: 31, // serviços registrados e confirmados na plataforma
    sobre: "Trabalho com acabamento há 12 anos. Cuido da limpeza da obra no fim de cada dia.",
    obras: [
      { titulo: "Banheiro com azulejo", foto: "banheiro-azulejo" },
      { titulo: "Piso da cozinha", foto: "piso-cozinha" },
      { titulo: "Reboco de fachada", foto: "reboco-fachada" },
      { titulo: "Bancada da cozinha", foto: "bancada-cozinha" }
    ],
    comentarios: [
      { autor: "Mariana", nota: 5, texto: "Caprichoso e cumpriu o prazo combinado." },
      { autor: "Ricardo", nota: 5, texto: "Deixou tudo limpo. Recomendo." },
      { autor: "Fernanda", nota: 4, texto: "Bom serviço, atrasou um dia por causa da chuva." }
    ]
  },
  {
    id: 2,
    nome: "Antônio Lima",
    iniciais: "AL",
    cidade: "Vitória",
    especialidades: ["Alvenaria", "Reboco"],
    anos: 20,
    nota: 4.6,
    avaliacoes: 41,
    confirmados: 52,
    sobre: "Construção e reforma. Faço desde a fundação até o reboco.",
    obras: [
      { titulo: "Casa térrea", foto: "casa-terrea" },
      { titulo: "Ampliação de quarto", foto: "ampliacao-quarto" },
      { titulo: "Reboco de muro", foto: "reboco-muro" },
      { titulo: "Laje", foto: "laje" }
    ],
    comentarios: [
      { autor: "Paula", nota: 5, texto: "Muito experiente, explicou cada etapa." },
      { autor: "Sérgio", nota: 4, texto: "Serviço bom, valor um pouco acima dos outros." }
    ]
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    iniciais: "CP",
    cidade: "Serra",
    especialidades: ["Piso", "Azulejo"],
    anos: 7,
    nota: 4.9,
    avaliacoes: 15,
    confirmados: 18,
    sobre: "Especialista em piso porcelanato e assentamento de revestimento.",
    obras: [
      { titulo: "Porcelanato da sala", foto: "porcelanato-sala" },
      { titulo: "Banheiro social", foto: "banheiro-social" },
      { titulo: "Varanda", foto: "varanda" },
      { titulo: "Cozinha", foto: "cozinha" }
    ],
    comentarios: [
      { autor: "Luciana", nota: 5, texto: "Acabamento perfeito, nenhum desnível." }
    ]
  },
  {
    id: 4,
    nome: "Marcos Oliveira",
    iniciais: "MO",
    cidade: "Cariacica",
    especialidades: ["Telhado", "Pequenos reparos"],
    anos: 9,
    nota: 4.3,
    avaliacoes: 12,
    confirmados: 14,
    sobre: "Conserto de telhado, calha, infiltração e reparos em geral.",
    obras: [
      { titulo: "Troca de telhas", foto: "troca-telhas" },
      { titulo: "Calha nova", foto: "calha" },
      { titulo: "Telhado novo", foto: "telhado-novo" },
      { titulo: "Forro", foto: "forro" }
    ],
    comentarios: [
      { autor: "Débora", nota: 4, texto: "Resolveu a goteira que ninguém achava." }
    ]
  },
  {
    id: 5,
    nome: "Paulo Ferreira",
    iniciais: "PF",
    cidade: "Vila Velha",
    especialidades: ["Alvenaria", "Acabamento"],
    anos: 15,
    nota: 4.7,
    avaliacoes: 30,
    confirmados: 37,
    sobre: "Reformas completas. Trabalho com ajudante.",
    obras: [
      { titulo: "Reforma de cozinha", foto: "reforma-cozinha" },
      { titulo: "Parede de drywall", foto: "parede-drywall" },
      { titulo: "Escada", foto: "escada" },
      { titulo: "Acabamento de quarto", foto: "acabamento-quarto" }
    ],
    comentarios: [
      { autor: "Thiago", nota: 5, texto: "Organizado e honesto no orçamento." }
    ]
  },
  {
    id: 6,
    nome: "Roberto Almeida",
    iniciais: "RA",
    cidade: "Vitória",
    especialidades: ["Azulejo", "Acabamento"],
    anos: 4,
    nota: 4.5,
    avaliacoes: 6,
    confirmados: 6,
    sobre: "Comecei recentemente por conta própria, depois de 4 anos trabalhando para uma construtora.",
    obras: [
      { titulo: "Lavabo", foto: "lavabo" },
      { titulo: "Backsplash da cozinha", foto: "backsplash" },
      { titulo: "Banheiro", foto: "banheiro" },
      { titulo: "Rodapé", foto: "rodape" }
    ],
    comentarios: [
      { autor: "Camila", nota: 5, texto: "Novo na plataforma, mas fez um ótimo trabalho." }
    ]
  }
];

/* Pedreiro usado na área do pedreiro (botão "Sou pedreiro" na tela de
   entrar). Os pedidos feitos a ele não recebem orçamento automático:
   quem responde é a pessoa que estiver usando a área do pedreiro. */
const PEDREIRO_DEMO_ID = 3; // Carlos Pereira

/* Pedidos que já existem quando o protótipo é aberto.
   Os do cliente servem para a tarefa de confirmar e avaliar um serviço
   concluído, sem precisar esperar dias por uma obra de verdade.
   Os que têm "cliente" são de outras pessoas: não aparecem em
   "Meus pedidos", só na área do pedreiro. */
const PEDIDOS_INICIAIS = [
  {
    id: 8,
    pedreiroId: 2,
    servico: "Reboco do muro dos fundos, mais ou menos 12 metros.",
    status: "concluido_pelo_pedreiro",
    orcamento: { descricao: "Reboco de muro, 12 metros", valor: 650, prazo: "4 dias" },
    concluidoEm: "15/10/2026",
    mensagens: [
      { de: "cliente", texto: "Preciso rebocar o muro dos fundos, mais ou menos 12 metros." },
      { de: "pedreiro", texto: "Posso fazer na semana que vem. Segue o orçamento." },
      { de: "sistema", texto: "Orçamento aceito em 08/10/2026." },
      { de: "pedreiro", texto: "Terminei o reboco hoje. Qualquer coisa me avise." }
    ]
  },
  {
    id: 5,
    pedreiroId: 4,
    servico: "Goteira no quarto.",
    status: "avaliado",
    orcamento: { descricao: "Troca de 6 telhas e vedação", valor: 280, prazo: "1 dia" },
    concluidoEm: "20/09/2026",
    avaliacao: { nota: 4, comentario: "Resolveu a goteira que ninguém achava." },
    mensagens: [
      { de: "cliente", texto: "Tenho uma goteira no quarto." },
      { de: "pedreiro", texto: "Vou dar uma olhada. Segue o orçamento." },
      { de: "sistema", texto: "Orçamento aceito em 15/09/2026." },
      { de: "pedreiro", texto: "Serviço concluído." }
    ]
  },
  {
    id: 10,
    pedreiroId: 3,
    cliente: "Mariana",
    servico: "Assentar porcelanato na sala, uns 20 m². Já comprei o piso.",
    bairro: "Laranjeiras, Serra",
    quando: "Nas próximas semanas",
    status: "aguardando",
    mensagens: [
      { de: "cliente", texto: "Assentar porcelanato na sala, uns 20 m². Já comprei o piso." }
    ]
  },
  {
    id: 6,
    pedreiroId: 3,
    cliente: "Luciana",
    servico: "Piso da varanda.",
    bairro: "Jacaraípe, Serra",
    status: "avaliado",
    orcamento: { descricao: "Assentamento de piso na varanda, 12 m²", valor: 720, prazo: "3 dias" },
    concluidoEm: "02/10/2026",
    avaliacao: { nota: 5, comentario: "Acabamento perfeito, nenhum desnível." },
    mensagens: [
      { de: "cliente", texto: "Preciso trocar o piso da varanda." },
      { de: "pedreiro", texto: "Faço sim. Segue o orçamento." },
      { de: "sistema", texto: "Orçamento aceito em 25/09/2026." },
      { de: "pedreiro", texto: "Terminei hoje." },
      { de: "sistema", texto: "Conclusão confirmada pelo cliente em 02/10/2026." }
    ]
  }
];
