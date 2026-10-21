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
      { autor: "Fernanda", nota: 4, texto: "Bom serviço, atrasou um dia por causa da chuva." },
      { autor: "Bruno", nota: 5, texto: "Assentou o porcelanato da cozinha sem nenhuma peça torta." },
      { autor: "Simone", nota: 5, texto: "Passou o orçamento certinho e não cobrou nada a mais." }
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
      { autor: "Sérgio", nota: 4, texto: "Serviço bom, valor um pouco acima dos outros." },
      { autor: "Rogério", nota: 5, texto: "Levantou o muro em três dias, como combinou." },
      { autor: "Aline", nota: 4, texto: "Trabalho firme. Só demorou um pouco para responder." },
      { autor: "Marcelo", nota: 5, texto: "Já é a segunda obra que faço com ele." }
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
      { autor: "Luciana", nota: 5, texto: "Acabamento perfeito, nenhum desnível." },
      { autor: "Patrícia", nota: 5, texto: "Muito cuidadoso com o rejunte. O banheiro ficou lindo." },
      { autor: "Gustavo", nota: 5, texto: "Pontual e educado. Recomendo de olhos fechados." }
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
      { autor: "Débora", nota: 4, texto: "Resolveu a goteira que ninguém achava." },
      { autor: "Vinícius", nota: 4, texto: "Trocou as telhas quebradas rápido, antes da chuva." },
      { autor: "Eliane", nota: 5, texto: "Limpou a calha e ainda arrumou o forro do banheiro." }
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
      { autor: "Thiago", nota: 5, texto: "Organizado e honesto no orçamento." },
      { autor: "Renata", nota: 5, texto: "Fez a escada e o acabamento da sala. Ficou impecável." },
      { autor: "Leandro", nota: 4, texto: "Bom serviço. Precisei lembrar de um detalhe no fim." }
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
      { titulo: "Parede revestida", foto: "parede-revestida" }
    ],
    comentarios: [
      { autor: "Camila", nota: 5, texto: "Novo na plataforma, mas fez um ótimo trabalho." },
      { autor: "Jorge", nota: 4, texto: "Caprichou no lavabo. Atrasou meio dia." }
    ]
  },
  {
    id: 7,
    nome: "Fábio Nascimento",
    iniciais: "FN",
    cidade: "Viana",
    especialidades: ["Alvenaria", "Reboco"],
    anos: 15,
    nota: 4.6,
    avaliacoes: 17,
    confirmados: 22,
    sobre: "Construo do alicerce ao reboco. Trabalho com dois ajudantes em obras maiores.",
    obras: [
      { titulo: "Casas geminadas", foto: "casas-geminadas" },
      { titulo: "Laje da garagem", foto: "laje" }
    ],
    comentarios: [
      { autor: "Cláudia", nota: 5, texto: "Construiu a casa dos fundos inteira. Tudo no prumo." },
      { autor: "Anderson", nota: 4, texto: "Bom pedreiro, mas a obra atrasou uma semana." },
      { autor: "Rita", nota: 5, texto: "Explicou o material que eu precisava comprar. Economizei." }
    ]
  },
  {
    id: 8,
    nome: "Ricardo Souza",
    iniciais: "RS",
    cidade: "Guarapari",
    especialidades: ["Azulejo", "Piso"],
    anos: 9,
    nota: 4.7,
    avaliacoes: 11,
    confirmados: 14,
    sobre: "Assento piso, azulejo e porcelanato. Atendo Guarapari e região.",
    obras: [
      { titulo: "Piso do quarto", foto: "piso-quarto" },
      { titulo: "Cozinha revestida", foto: "cozinha-revestida" }
    ],
    comentarios: [
      { autor: "Juliana", nota: 5, texto: "O piso do quarto ficou perfeito, sem nenhum desnível." },
      { autor: "Márcio", nota: 4, texto: "Trabalho bom, só achei o preço um pouco alto." }
    ]
  },
  {
    id: 9,
    nome: "Edson Rocha",
    iniciais: "ER",
    cidade: "Fundão",
    especialidades: ["Telhado", "Pequenos reparos"],
    anos: 18,
    nota: 4.4,
    avaliacoes: 9,
    confirmados: 12,
    sobre: "Telhado novo, troca de telhas e consertos em geral. Vou até a obra para orçar.",
    obras: [
      { titulo: "Telhado de cerâmica", foto: "telhado-ceramica" },
      { titulo: "Calha e rufo", foto: "calha" }
    ],
    comentarios: [
      { autor: "Sandra", nota: 5, texto: "Acabou com as goteiras da casa toda." },
      { autor: "Paulo", nota: 4, texto: "Serviço bom, mas precisei ligar para confirmar o dia." }
    ]
  },
  {
    id: 10,
    nome: "Wagner Lima",
    iniciais: "WL",
    cidade: "Cariacica",
    especialidades: ["Acabamento", "Pequenos reparos"],
    anos: 6,
    nota: 4.8,
    avaliacoes: 8,
    confirmados: 9,
    sobre: "Pintura, massa corrida, gesso e pequenos consertos.",
    obras: [
      { titulo: "Pintura de quarto", foto: "pintura-quarto" },
      { titulo: "Forro de gesso", foto: "forro" }
    ],
    comentarios: [
      { autor: "Larissa", nota: 5, texto: "Pintou o quarto do meu filho em um dia e deixou tudo limpo." },
      { autor: "Fernando", nota: 5, texto: "Consertou a porta e a pia na mesma visita." }
    ]
  },
  {
    id: 11,
    nome: "Diego Martins",
    iniciais: "DM",
    cidade: "Vitória",
    especialidades: ["Piso", "Acabamento"],
    anos: 4,
    nota: 5.0,
    avaliacoes: 3,
    confirmados: 3,
    sobre: "Comecei há pouco na plataforma. Faço piso laminado, vinílico e porcelanato.",
    obras: [
      { titulo: "Piso da sala de jantar", foto: "piso-sala-jantar" },
      { titulo: "Acabamento de quarto", foto: "acabamento-quarto" }
    ],
    comentarios: [
      { autor: "Beatriz", nota: 5, texto: "Jovem, mas muito caprichoso. Gostei bastante." }
    ]
  },
  {
    id: 12,
    nome: "Sebastião Costa",
    iniciais: "SC",
    cidade: "Serra",
    especialidades: ["Alvenaria", "Telhado"],
    anos: 25,
    nota: 4.7,
    avaliacoes: 48,
    confirmados: 61,
    sobre: "25 anos de obra. Faço ampliação, telhado e reforma completa.",
    obras: [
      { titulo: "Quarto construído", foto: "quarto-construido" },
      { titulo: "Telhado novo", foto: "telhado-novo" }
    ],
    comentarios: [
      { autor: "Edna", nota: 5, texto: "Fez o quarto e o telhado novo. Trabalho de primeira." },
      { autor: "Cristiano", nota: 5, texto: "O mais experiente que já contratei." },
      { autor: "Mônica", nota: 4, texto: "Ótimo serviço. É bom marcar com antecedência." }
    ]
  }
];

/* Pedreiro usado na área do pedreiro (botão "Entrar como pedreiro" na tela de
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
