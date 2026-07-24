import React, { useState, useEffect, useMemo, useCallback } from "react";

// ============ IDENTIDADE RESIFRIENDS ============
const C = {
  preto: "#2E1D12", preto2: "#3A2517", cardBg: "#412A19", marrom: "#4A2F1B",
  marromClaro: "#6B4526", dourado: "#C9A227", douradoClaro: "#E3C765",
  creme: "#FBF8F3", cinza: "#b9a894", verde: "#2E7D4F", vermelho: "#B23A2E",
  cardBg2: "#4E3320", linha: "#5a3d26",
};

const SENHA_PROFESSORA = "FATIMA-ADMIN"; // você troca isso

// Logomarca oficial — o arquivo logo_resifriends.png deve ficar na mesma
// pasta do site (junto do index) quando publicar no GitHub Pages.
const LOGO = "logo_resifriends.png";

// ============ TURMA 2026 — ALUNAS E SENHAS ============
// Cada aluna entra escolhendo o próprio nome na lista e digitando a senha.
// A senha é individual. Para trocar a senha de alguém, é só editar aqui.
const TURMA_2026 = [
  { nome: "Carolina Sandy da Silva Gomes de Sena", codigo: "CAROLINA-SANDY", senha: "Carolina2951" },
  { nome: "Larissa Maria Rabelo dos Anjos",         codigo: "LARISSA-MARIA",  senha: "Larissa6234" },
  { nome: "Ivania Maria dos Santos",                codigo: "IVANIA-MARIA",   senha: "Ivania9233" },
  { nome: "Camila Eduarda Nascimento Silvestre",    codigo: "CAMILA-EDUARDA", senha: "Camila9385" },
  { nome: "Cledivalda Milena Rodrigues de Arruda",  codigo: "CLEDIVALDA",     senha: "Cledivalda2681" },
  { nome: "Rafaelli Eloisa da Hora",                codigo: "RAFAELLI",       senha: "Rafaelli4658" },
  { nome: "Dayane Cybelle Araujo de Andrade Silva", codigo: "DAYANE-CYBELLE", senha: "Dayane7891" },
  { nome: "Eduarda Gayosso",                        codigo: "EDUARDA-GAYOSSO", senha: "Eduarda9975" },
  { nome: "Ana Carolina Cristóvão",              codigo: "ANA-CAROLINA",   senha: "Ana9042" },
  { nome: "Sandreane Brasil",                       codigo: "SANDREANE",      senha: "Sandreane8226" },
];

// ============ CONTEÚDO: EIXOS, SUB-EIXOS E QUESTÕES ============
const EIXOS = [
  { id: "etica", nome: "Bioética e Legislação", curto: "Bioética", peso: "alto", aulas: 5, subs: [
    "Bioética", "Legislação em enfermagem",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Etica.pdf", titulo: "Ética e Exercício Profissional", pag: 15,
      desc: "Lei 7.498/86, Código de Ética (COFEN 564/2017) e Processo de Enfermagem pela Resolução 736/2024 — a norma nova, que retirou o termo SAE." },
  ]},
  { id: "semio", nome: "Semiologia e SAE", curto: "Semiologia", peso: "alto", aulas: 8, subs: [
    "Anamnese", "Diagnóstico e prognóstico", "Exame clínico", "Exames complementares",
    "Plano de trabalho", "Protocolos de acolhimento", "Sistematização da assistência (SAE)",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Fundamentos.pdf", titulo: "Fundamentos de Enfermagem", pag: 32,
      desc: "Exame clínico, sinais vitais, medicação e cálculo, sondagens, oxigenoterapia, feridas, Processo de Enfermagem (Res. 736/2024), registro e prontuário." },
  ]},
  { id: "sistemas", nome: "Assistência por Sistemas", curto: "Sistemas", peso: "alto", aulas: 10, subs: [
    "Sistema nervoso", "Sistema respiratório", "Sistema cardiovascular", "Sistema urinário",
    "Sistema digestório", "Sistema músculo-esquelético", "Sistema endócrino",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Sistemas.pdf", titulo: "Assistência por Sistemas", pag: 34,
      desc: "Os 7 sistemas. Inclui a Diretriz de Hipertensão 2025 (12 por 8 já é pré-hipertensão) e as insulinas análogas no SUS para DM2." },
  ]},
  { id: "doencas", nome: "Doenças e Agravos", curto: "Doenças", peso: "medio", aulas: 8, subs: [
    "Infectoparasitárias", "IST e infecção pelo HIV", "Crônicas não transmissíveis",
    "Doenças neoplásicas", "Dermatológicas", "Cuidados paliativos", "Nutrição e dietética",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Doencas.pdf", titulo: "Doenças e Agravos", pag: 29,
      desc: "Dengue (6ª ed.), tuberculose e ILTB com o esquema 3HP, hanseníase, sífilis, PEP/PrEP, neoplasias, paliativos e nutrição." },
  ]},
  { id: "urg", nome: "Urgência, Emergência e Trauma", curto: "Urgência", peso: "alto", aulas: 8, subs: [
    "Urgência e emergência", "Atendimento pré-hospitalar", "Politraumatizado",
    "Transporte do paciente de risco", "Suporte básico de vida",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Urgencia.pdf", titulo: "Urgência, Emergência e UTI", pag: 19,
      desc: "PCR e RCP pela AHA 2025, ritmos, drogas, Manchester e choque. Inclui o novo algoritmo do engasgo (OVACE)." },
    { arq: "Resifriends_Eixo_Trauma.pdf", titulo: "Pré-Hospitalar, Trauma e Transporte", pag: 21,
      desc: "SAMU e tipos de ambulância, XABCDE do ATLS 11ª edição (o X vem antes do A), torniquete, queimados e transporte do paciente de risco." },
  ]},
  { id: "seg", nome: "Segurança do Paciente e Biossegurança", curto: "Segurança", peso: "alto", aulas: 8, subs: [
    "Segurança do paciente", "Assepsia e antissepsia", "Biossegurança",
    "Controle de infecção hospitalar", "Limpeza, desinfecção e esterilização",
    "Programa Nacional de Imunização",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Seguranca.pdf", titulo: "Segurança do Paciente", pag: 17,
      desc: "As 6 metas do PNSP, higiene das mãos pelo Manual ANVISA 2026, precauções e resíduos (RDC 222/2018)." },
    { arq: "Resifriends_Eixo_Imunizacao.pdf", titulo: "Imunização e PNI", pag: 15,
      desc: "Calendário 2026 completo — meningo ACWY aos 12 meses, HPV dose única, dengue, VSR na gestante. Rede de frio e contraindicações." },
    { arq: "Resifriends_Eixo_Perioperatoria.pdf", titulo: "Assistência Perioperatória", pag: 24,
      desc: "Centro cirúrgico, cirurgia segura (checklist da OMS), RPA e escala de Aldrete, CME e classificação de Spaulding." },
  ]},
  { id: "ciclos", nome: "Ciclos de Vida", curto: "Ciclos de Vida", peso: "alto", aulas: 10, subs: [
    "Saúde da criança", "Saúde do adolescente", "Saúde do adulto", "Saúde da mulher",
    "Saúde do idoso", "Aleitamento materno", "Pré-natal", "Planejamento familiar", "Aborto legal",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Ciclos.pdf", titulo: "Ciclos de Vida", pag: 27,
      desc: "Pré-natal, parto e puerpério, aleitamento, planejamento familiar e aborto legal. Calendário vacinal 2026 da criança e da gestante." },
  ]},
  { id: "admin", nome: "Administração em Enfermagem", curto: "Administração", peso: "medio", aulas: 6, subs: [
    "Teorias da administração", "Liderança e trabalho em equipe", "Gestão de pessoas e escalas",
    "Dimensionamento de pessoal", "Avaliação de desempenho", "Gestão da qualidade e indicadores",
    "Organização dos serviços de enfermagem",
  ], ebooks: [
    { arq: "Resifriends_Eixo_Administracao.pdf", titulo: "Administração em Enfermagem", pag: 22,
      desc: "Teorias da administração (Fayol, Mayo, McGregor), liderança, dimensionamento com a revogação da 543/2017, escalas, avaliação de desempenho e qualidade (Donabedian, PDCA)." },
  ] },
  { id: "mental", nome: "Saúde Mental e Populações Específicas", curto: "Saúde Mental", peso: "medio", aulas: 6, subs: [
    "Saúde mental", "Pessoa com deficiência", "Situação de risco e violência", "Assistência domiciliar",
  ], ebooks: [
    { arq: "Resifriends_Eixo_SaudeMental.pdf", titulo: "Saúde Mental e Populações Específicas", pag: 21,
      desc: "Lei 10.216, RAPS e CAPS, LBI, notificação de violência (Lei 13.931/2019) e atenção domiciliar." },
  ]},
  { id: "bonus", nome: "Epidemiologia e Educação em Saúde", curto: "★ Bônus", peso: "bonus", aulas: 0, bonus: true, subs: [
    "Noções de epidemiologia", "Indicadores de saúde coletiva", "Educação em saúde",
  ], ebooks: [
    { arq: "Resifriends_Bonus_Epidemiologia.pdf", titulo: "Bônus · Epidemiologia e Educação em Saúde", pag: 19,
      desc: "Indicadores, notificação compulsória atualizada pela Portaria 11.211/2026 (caxumba e Oropouche entraram) e educação em saúde." },
  ]},
];

const DISCURSIVAS = [

  // ─────────── SAÚDE MENTAL ───────────
  {
    id: "disc-mental-01", eixo: "mental", sub: "Saúde mental", nivel: "media",
    tempoEstimado: "15 min", linhas: 20,
    enunciado: "Um homem de 34 anos é trazido por familiares à emergência de um hospital geral. Está agitado, refere ouvir vozes que o ameaçam e recusa qualquer medicação. A família pede a internação. O paciente, questionado, diz que não está doente e quer ir embora.\n\nCom base na Lei nº 10.216/2001, responda:\n\na) Qual a modalidade de internação aplicável ao caso e qual o fundamento legal dessa classificação?\nb) Qual a providência obrigatória do serviço após essa internação, a quem se dirige e em que prazo?\nc) Explique POR QUE a lei criou essa exigência — qual problema histórico ela busca evitar?",
    roteiro: [
      "Identificar a modalidade: INVOLUNTÁRIA (sem consentimento do paciente, a pedido de terceiro).",
      "Diferenciar das outras duas: voluntária (consentimento do próprio) e compulsória (ordem judicial).",
      "Apontar a providência: comunicação ao MINISTÉRIO PÚBLICO em até 72 HORAS — e também na alta.",
      "Explicar o racional histórico: salvaguarda contra internação como instrumento de exclusão social.",
      "Mencionar que a internação é o ÚLTIMO recurso (quando os meios extra-hospitalares se mostrarem insuficientes).",
    ],
    espelho: "**a) Modalidade: INTERNAÇÃO INVOLUNTÁRIA.**\n\nO critério de classificação na Lei 10.216/2001 é a **origem do pedido e o consentimento**:\n• **Voluntária** → com o consentimento do usuário (ele assina declaração na admissão)\n• **Involuntária** → **SEM** o consentimento do usuário e **a pedido de terceiro**\n• **Compulsória** → determinada pela **Justiça**\n\nNo caso, o paciente **recusa** e quem solicita é a **família** — logo, involuntária. Não é compulsória porque **não há ordem judicial**; o pedido é da família, não do juiz.\n\n**b) Providência: comunicação ao MINISTÉRIO PÚBLICO em até 72 HORAS.**\n\nA comunicação é feita pelo responsável técnico do estabelecimento, ao MP Estadual, no prazo de 72 horas. **A alta também deve ser comunicada.**\n\n**c) O porquê — e aqui está o coração da resposta:**\n\nA exigência é uma **salvaguarda contra o abuso**. Historicamente, a internação psiquiátrica 'a pedido da família' foi usada como **instrumento de exclusão social**: bastava um parente incômodo — a mulher que contrariava, o filho que envergonhava, o herdeiro inconveniente — para que alguém fosse internado por anos, sem doença e sem defesa.\n\nAo exigir que o **Ministério Público** — órgão externo, independente do hospital e da família — tome conhecimento de **toda** internação sem consentimento, a lei coloca **um fiscal entre a vontade de terceiros e a liberdade da pessoa**. O MP pode verificar se a internação se justifica.\n\nÉ por isso, também, que a lei estabelece que a internação só é indicada quando os **recursos extra-hospitalares se mostrarem insuficientes** — ela é o **último recurso**, não o primeiro. E é **vedada** a internação em instituições com características asilares.",
    pegadinha: "**Como a banca arma a armadilha neste tema:**\n\n1️⃣ **Troca o MP pelo JUIZ.** É a pegadinha nº 1. Involuntária → **Ministério Público**. Quem envolve juiz é a **compulsória** (e aí o juiz *determina*, não *recebe comunicação*).\n\n2️⃣ **Troca as 72h por 24h ou 48h.** Decore: **72 HORAS**.\n\n3️⃣ **Chama de compulsória** porque o paciente 'representa risco'. Não! O que define compulsória é a **ordem judicial** — não o grau de risco. Risco justifica a internação; não define a modalidade.\n\n4️⃣ **Chama de voluntária** dizendo que 'a família consentiu por ele'. Consentimento é **pessoal e intransferível**. Se quem consente é outro, é involuntária.\n\n5️⃣ **Trata a internação como conduta inicial padrão.** A lei é explícita: é o **último recurso**.\n\n💡 **A régua**: pergunte SEMPRE — *quem pediu?* Paciente = voluntária · Terceiro = involuntária · Juiz = compulsória.",
  },

  // ─────────── URGÊNCIA ───────────
  {
    id: "disc-urg-01", eixo: "urg", sub: "Politraumatizado", nivel: "dificil",
    tempoEstimado: "20 min", linhas: 25,
    enunciado: "Duas vítimas chegam simultaneamente ao pronto-socorro após acidente com serra elétrica:\n\n• **Vítima 1** — amputação traumática de coxa, sangramento arterial em jato, consciente, orientada, falando frases completas.\n• **Vítima 2** — trauma de face, roncos audíveis, rebaixamento de consciência, sem sangramento externo visível.\n\nResponda:\n\na) Segundo a 11ª edição do ATLS, qual vítima deve ser abordada primeiro e por quê?\nb) Justifique a mudança do ABCDE para o XABCDE do ponto de vista fisiopatológico.\nc) A hemorragia interna (por exemplo, fratura de pelve) entra no 'X'? Justifique.",
    roteiro: [
      "Identificar que a Vítima 1 tem hemorragia exsanguinante externa — o 'X' precede o 'A'.",
      "Reconhecer que a Vítima 1 tem via aérea pérvia (fala frases completas = A garantido no momento).",
      "Explicar o racional: a ordem segue a VELOCIDADE com que cada problema mata.",
      "Justificar: hemorragia exsanguinante mata em segundos; obstrução de via aérea, em minutos.",
      "Mencionar a unificação com o PHTLS (que já usava XABCDE).",
      "Diferenciar: X é hemorragia EXTERNA COMPRESSÍVEL; interna permanece no C.",
    ],
    espelho: "**a) A VÍTIMA 1 deve ser abordada primeiro.**\n\nEla apresenta **hemorragia exsanguinante externa** — o **X** do XABCDE, que **precede** a via aérea.\n\nRepare no detalhe que o enunciado entrega: a Vítima 1 **fala frases completas**. Isso significa que sua **via aérea está pérvia** naquele momento — o 'A' dela está, temporariamente, garantido. Já o sangramento em jato de uma artéria femoral pode exsanguinar em **poucos minutos**.\n\nA Vítima 2 tem via aérea ameaçada (roncos = obstrução parcial por queda de língua) — é grave, mas mata em **minutos**, não em segundos. Ela é a segunda.\n\n**b) O racional fisiopatológico:**\n\nA ordem do ABCDE **nunca foi arbitrária**. Ela sempre seguiu a **velocidade com que cada problema mata**. Obstrução de via aérea leva à hipóxia e à morte em poucos minutos — por isso vinha primeiro.\n\nO que mudou não foi a lógica, mas o **reconhecimento de que existe algo mais rápido**: a experiência acumulada em trauma de guerra e urbano demonstrou que a **hemorragia exsanguinante mata mais rápido que a via aérea**. Um paciente com amputação de coxa jorrando sangue está falando, consciente, com via aérea perfeita — e morre em **segundos** se você for cuidar do 'A' primeiro.\n\nHá ainda um segundo motivo, de **padronização**: o pré-hospitalar (PHTLS) já usava XABCDE há anos, enquanto o hospitalar usava ABCDE. Essa diferença gerava confusão na passagem do caso entre as equipes. A 11ª edição (2025) **unificou** os dois cenários.\n\n**c) NÃO. A hemorragia interna NÃO entra no 'X'.**\n\nO **X** é restrito à hemorragia **externa, visível e COMPRESSÍVEL** — aquela que se resolve com compressão direta, packing ou torniquete: amputação, sangramento em jato, laceração profusa de couro cabeludo.\n\nA hemorragia **interna** (fratura de pelve, hemotórax, laceração hepática ou esplênica) **permanece no C** — pela razão mais simples possível: **ela não se resolve com compressão**. Não adianta apertar o abdome de quem sangra o baço. O tratamento dela é volume, sangue e, sobretudo, **controle cirúrgico**.\n\nO 'X' existe porque há uma ação **imediata e eficaz** disponível. Onde não há, o problema volta para o seu lugar no algoritmo.",
    pegadinha: "**Como a banca arma a armadilha neste tema:**\n\n1️⃣ **Responder ABCDE quando a questão pede o protocolo vigente.** Se o enunciado citar 'ATLS' ou '11ª edição' ou 'diretrizes atuais', é **XABCDE**. Material de 2 anos atrás já está velho aqui.\n\n2️⃣ **Chamar hemorragia interna de 'X'.** A banca descreve fratura de pelve com instabilidade e pergunta a primeira medida — quem decorou 'X = hemorragia' marca errado. **X = externa compressível.**\n\n3️⃣ **A pista escondida do enunciado.** Quando a banca escreve 'paciente **falando frases completas**' ou '**consciente e orientado**', ela está te dizendo: *o A está OK, não é aqui*. Esse detalhe nunca está lá por acaso.\n\n4️⃣ **Oferecer 'intubar por Glasgow baixo' ou 'infundir cristaloide' como primeira conduta** num caso de amputação. As duas estão **certas** — mas **depois** do X. A banca testa a **ordem**, não o conhecimento isolado.\n\n5️⃣ **A tríade letal.** Se a questão falar em 'E — Exposure', lembre: expor é necessário, **deixar esfriar é erro**. Hipotermia + acidose + coagulopatia = **tríade letal do trauma**.\n\n💡 **A régua**: no trauma, a ordem não é decoreba — é a **lista do que mata mais rápido**.",
  },

  // ─────────── DOENÇAS E AGRAVOS ───────────
  {
    id: "disc-doencas-01", eixo: "doencas", sub: "Infectoparasitárias", nivel: "media",
    tempoEstimado: "15 min", linhas: 20,
    enunciado: "Um paciente em tratamento de tuberculose pulmonar (esquema básico, 2º mês) procura a unidade de saúde muito assustado. Relata que sua urina está alaranjada e que, por isso, **interrompeu a medicação há cinco dias** por conta própria. Diz que 'o remédio estava fazendo mal ao rim'.\n\nResponda:\n\na) Qual a explicação para a coloração da urina e qual fármaco a produz?\nb) Qual a conduta da enfermeira e por que ela NÃO deve suspender o medicamento?\nc) Explique a relação entre esse episódio e o surgimento de tuberculose resistente.",
    roteiro: [
      "Identificar a RIFAMPICINA como causa da coloração alaranjada.",
      "Esclarecer que é efeito ESPERADO e INOFENSIVO — atinge urina, suor e lágrimas.",
      "Conduta: orientar, acolher o medo, reforçar a adesão e RETOMAR o esquema.",
      "NÃO suspender: não há nefrotoxicidade nem reação adversa maior.",
      "Explicar a cadeia: abandono → seleção de bacilos resistentes → TB multirresistente.",
      "Mencionar o TDO como estratégia de adesão.",
    ],
    espelho: "**a) A coloração é causada pela RIFAMPICINA.**\n\nÉ efeito **esperado e inofensivo**, decorrente da excreção do fármaco e de seus metabólitos. Atinge não só a urina, mas também o **suor e as lágrimas** (pode manchar lentes de contato gelatinosas). **Não indica lesão renal nem reação adversa maior.**\n\n**b) Conduta: ORIENTAR e RETOMAR o tratamento — nunca suspender.**\n\nA enfermeira deve:\n• **Acolher o medo** — o paciente não abandonou por descuido; abandonou por susto. Ridicularizar ou repreender fecha a porta.\n• **Explicar** que a cor é esperada, que não faz mal ao rim, e que é sinal de que o remédio está no organismo.\n• **Retomar** o esquema conforme avaliação da equipe.\n• **Reforçar** os demais efeitos possíveis e o que fazer diante deles.\n• **Vincular** ao TDO (Tratamento Diretamente Observado).\n\n**c) A relação com a resistência — e é aqui que a resposta se torna clínica:**\n\nO tratamento da TB tem duas fases por uma razão biológica: os dois primeiros meses (RIPE) atacam a população bacilar em **multiplicação rápida** — é a fase que corta a transmissão e faz o paciente **se sentir curado**. Os quatro meses seguintes (RI) eliminam os **bacilos persistentes**, de metabolismo lento.\n\nQuando o paciente interrompe, ele não elimina os persistentes. Pior: a exposição **irregular e subterapêutica** ao fármaco funciona como uma **pressão seletiva** — os bacilos sensíveis morrem, os que têm mutação de resistência **sobrevivem e se multiplicam sem concorrência**.\n\nO resultado é a **TB multirresistente (TB-MDR)** — que exige esquemas de segunda linha, mais longos, mais tóxicos, mais caros e menos eficazes. E que ele passa a **transmitir já resistente** para quem convive com ele.\n\n👉 Ou seja: **uma orientação de 30 segundos na primeira consulta evita meses de tratamento perdido e um problema de saúde pública.** Orientar não é gentileza — é **intervenção clínica**.",
    pegadinha: "**Como a banca arma a armadilha neste tema:**\n\n1️⃣ **Oferecer 'suspender a rifampicina' ou 'investigar função renal'** como conduta. As duas parecem prudentes — e as duas estão **erradas**. A cor laranja é esperada. Suspender é o erro.\n\n2️⃣ **Trocar os efeitos entre as drogas.** Decore o RIPE:\n• **R**ifampicina → urina **LARANJA** (esperado, não suspende!)\n• **I**soniazida → **NEUROPATIA** periférica (previne com piridoxina/B6)\n• **P**irazinamida → **ÁCIDO ÚRICO** (artralgia, gota)\n• **E**tambutol → **OLHO** (neurite óptica, visão de cores)\n💡 'Etambutol = **E**nxerga mal' · 'Isoniazida = form**I**ga no pé'\n\n3️⃣ **Confundir ILTB com TB ativa.** ILTB **não transmite**, não tem sintoma e **não usa RIPE** — usa TPT (3HP preferencial: rifapentina + isoniazida, 1x/semana, 12 semanas).\n\n4️⃣ **Errar o esquema.** É **2RIPE/4RI** = 6 meses. TB **óssea e meníngea** = **12 meses**.\n\n5️⃣ **Errar o sintomático respiratório**: tosse por **3 SEMANAS ou mais** (não 2, não 4).\n\n💡 **A régua**: em TB, efeito adverso **menor** (cor, prurido leve) → orienta e mantém. Efeito **maior** (hepatotoxicidade, neurite óptica) → avalia e ajusta. A cor laranja é o exemplo clássico de menor.",
  },

  // ─────────── SEGURANÇA DO PACIENTE ───────────
  {
    id: "disc-seg-01", eixo: "seg", sub: "Segurança do paciente", nivel: "media",
    tempoEstimado: "15 min", linhas: 20,
    enunciado: "Em uma unidade de internação, a enfermeira prepara a administração de um antibiótico endovenoso. A paciente está no leito 12. Ao chegar ao leito, a enfermeira confere: 'A senhora é a dona Maria do leito 12?' A paciente confirma com a cabeça. A medicação é administrada.\n\nHoras depois, descobre-se que a medicação era destinada a outra paciente — também chamada Maria — que havia sido **transferida** do leito 12 para o leito 15 naquela manhã.\n\nResponda:\n\na) Qual meta internacional de segurança do paciente foi descumprida e qual o erro cometido?\nb) Explique POR QUE o número do leito não é identificador válido.\nc) Por que a confirmação da própria paciente ('confirmou com a cabeça') não foi suficiente?",
    roteiro: [
      "Identificar a Meta 1 — Identificar corretamente o paciente.",
      "Apontar os dois erros: uso do leito como identificador e uso de apenas um identificador válido (nome incompleto).",
      "Explicar que o leito é atributo do LUGAR, não da pessoa.",
      "Apontar que se exigem DOIS identificadores: nome COMPLETO e data de nascimento.",
      "Discutir a pergunta indutiva (fechada) vs. a pergunta aberta.",
      "Mencionar que a checagem deve ser ativa e conferida contra a prescrição/pulseira.",
    ],
    espelho: "**a) META 1 — Identificar corretamente o paciente** (PNSP, Portaria GM/MS nº 529/2013).\n\nHouve **dois erros encadeados**:\n1. Uso do **número do leito** como identificador\n2. Uso de **apenas um** elemento de identificação — e ainda por cima o **primeiro nome**, que é ambíguo (havia duas Marias)\n\nA meta exige **DOIS identificadores**, como **nome completo** e **data de nascimento**, conferidos contra a **prescrição** e a **pulseira**.\n\n**b) Por que o leito não identifica:**\n\nPorque ele é um **atributo do LUGAR, não da pessoa**. O paciente muda de leito, o leito troca de paciente — e a etiqueta continua ali. Foi exatamente isso que aconteceu: a Maria do leito 12 pela manhã não era a Maria do leito 12 à tarde.\n\nJá o **nome completo** e a **data de nascimento** **viajam com a pessoa**: ela muda de setor, de maca, de hospital — e continuam sendo dela.\n\n👉 Identificador tem que ser **do paciente**, não do **mobiliário**.\n\n**c) Por que a confirmação da paciente não bastou — e este é o ponto mais fino:**\n\nA pergunta foi **fechada e indutiva**: *'A senhora é a dona Maria do leito 12?'* — ela já entrega a resposta esperada. Basta um aceno.\n\nPacientes confirmam por **educação, por confusão, por sedação, por déficit auditivo, por não querer contrariar o profissional**, ou simplesmente porque **também se chamam Maria**. Um idoso sonolento diz 'sim' para qualquer nome dito com convicção.\n\nA técnica correta é a **pergunta ABERTA**: *'A senhora pode me dizer seu nome completo e sua data de nascimento?'* — e então **conferir** o que ela disse contra a pulseira e a prescrição.\n\n👉 A diferença entre as duas perguntas é a diferença entre **checar** e **fingir que checou**.",
    pegadinha: "**Como a banca arma a armadilha neste tema:**\n\n1️⃣ **Coloca o número do leito entre os identificadores** — às vezes **combinado com um válido** ('nome completo e número do leito'), para parecer certo. **Basta UM item inválido para a alternativa cair.**\n\n2️⃣ **Oferece 'número do quarto', 'nome do acompanhante', 'diagnóstico' ou 'nome do médico'** como identificador. Nenhum serve.\n\n3️⃣ **Diz 'ao menos um identificador'.** São **DOIS**.\n\n4️⃣ **Descreve a pergunta fechada como conduta correta.** Se a alternativa traz 'perguntou se era o Sr. Fulano', desconfie — o correto é pedir que **ele diga** o nome.\n\n5️⃣ **Confunde as metas.** Decore a ordem do PNSP:\n**1** identificação · **2** comunicação efetiva · **3** medicamentos · **4** cirurgia segura · **5** higiene das mãos · **6** quedas e LPP\n\n💡 **A régua**: o identificador tem que ser **da pessoa** e **viajar com ela**. Tudo que fica no quarto quando ela sai — leito, número, prontuário na porta — **não identifica ninguém**.",
  },

  // ─────────── SISTEMAS ───────────
  {
    id: "disc-sistemas-01", eixo: "sistemas", sub: "Sistema endócrino", nivel: "dificil",
    tempoEstimado: "20 min", linhas: 25,
    enunciado: "Uma paciente diabética tipo 1, de 19 anos, é levada à emergência por familiares. Está sonolenta, com respiração ampla, rápida e ruidosa. Refere-se hálito adocicado. Glicemia capilar: 480 mg/dL. Relata que 'parou a insulina há três dias porque estava sem apetite e não estava comendo'.\n\nResponda:\n\na) Qual o diagnóstico provável e como se explica, fisiopatologicamente, o padrão respiratório apresentado?\nb) Explique o erro de raciocínio da paciente ao suspender a insulina por não estar comendo.\nc) Qual a prioridade terapêutica inicial e por que a insulina NÃO é a primeira medida?",
    roteiro: [
      "Diagnóstico: cetoacidose diabética (CAD).",
      "Explicar a respiração de KUSSMAUL como compensação respiratória da acidose metabólica.",
      "Explicar a cascata: falta de insulina → lipólise → corpos cetônicos → acidose.",
      "Desfazer o erro: a insulina basal é necessária mesmo em jejum (o fígado produz glicose).",
      "Prioridade: HIDRATAÇÃO (reposição volêmica) antes da insulina.",
      "Alertar para o POTÁSSIO — a insulina joga K+ para dentro da célula.",
    ],
    espelho: "**a) Diagnóstico: CETOACIDOSE DIABÉTICA (CAD).**\n\nO enunciado entrega a tríade: **hiperglicemia** (480), **cetose** (hálito cetônico) e **acidose** (respiração de Kussmaul), num DM1 que suspendeu insulina.\n\n**O padrão respiratório é a RESPIRAÇÃO DE KUSSMAUL** — ampla, rápida, profunda e ruidosa. E ela tem uma explicação elegante:\n\nSem insulina, a glicose não entra na célula. O organismo, 'achando' que está em jejum, quebra **gordura** para gerar energia (lipólise). Esse metabolismo produz **corpos cetônicos**, que são **ácidos**. O pH cai → instala-se **acidose metabólica**.\n\nO pulmão então **compensa**: hiperventila para eliminar **CO₂** (um ácido volátil) e tentar corrigir o pH. Kussmaul **não é sintoma respiratório** — é o **pulmão trabalhando** para salvar o pH. E o **hálito adocicado** vem da **acetona** exalada.\n\n👉 Cada sinal é consequência direta da via metabólica. Entendeu a cascata, deduziu o quadro inteiro.\n\n**b) O erro de raciocínio — e ele é comuníssimo:**\n\nA paciente pensou: *'não estou comendo, logo não preciso de insulina'*. O raciocínio associa insulina exclusivamente à **comida**.\n\nMas o **fígado produz glicose continuamente** (gliconeogênese e glicogenólise), mesmo em jejum — é o que mantém a glicemia de quem dorme oito horas sem comer. A **insulina basal** existe justamente para conter essa produção hepática.\n\nNo **DM1 não há produção endógena de insulina nenhuma**. Suspendê-la em jejum é retirar o único freio da produção hepática de glicose **e** liberar a lipólise. Resultado: a glicemia sobe **mesmo sem comer** — e vem a cetoacidose.\n\n👉 Regra de ouro para orientar: **o DM1 NUNCA suspende a insulina basal**, nem em jejum, nem doente. O que se ajusta é a dose.\n\n**c) Prioridade: HIDRATAÇÃO (reposição volêmica) — antes da insulina.**\n\nO paciente em CAD está **profundamente desidratado**: a hiperglicemia causa diurese osmótica (a glicose 'puxa' água para a urina). A perda pode chegar a vários litros.\n\nPor que hidratar primeiro:\n• A **volemia** é o que sustenta a perfusão. Sem volume, não há circulação — e nem a insulina chega aos tecidos.\n• A **própria hidratação já reduz a glicemia** por diluição e por melhora da filtração renal.\n• Aplicar insulina em paciente hipovolêmico desloca líquido para o intracelular e pode **precipitar colapso circulatório**.\n\n⚠️ **E o POTÁSSIO — o ponto que mais mata**: o paciente em CAD tem potássio corporal total **BAIXO** (perdeu na diurese), mas o potássio **sérico** pode estar normal ou até alto, porque a acidose empurra o K+ para fora da célula.\n\nQuando você dá insulina, ela **joga o potássio de volta para dentro da célula** — e o potássio sérico **despenca**, podendo causar **arritmia fatal**. Por isso: **checa-se o potássio antes**; se estiver abaixo de 3,3 mEq/L, **repõe-se potássio ANTES de iniciar a insulina**.\n\n👉 A sequência é: **volume → potássio → insulina**.",
    pegadinha: "**Como a banca arma a armadilha neste tema:**\n\n1️⃣ **Oferece 'insulina em bolus imediato' como primeira conduta.** É a resposta intuitiva — glicemia alta, dá insulina. **Errado.** Primeiro **volume**.\n\n2️⃣ **Troca Kussmaul por Cheyne-Stokes.** Decore as três:\n• **KUSSMAUL** → ampla, rápida, profunda → **cetoacidose diabética** (acidose metabólica)\n• **CHEYNE-STOKES** → ciclos crescendo-decrescendo com apneia → **IC, AVC**\n• **BIOT** → irregular, atáxica → **lesão neurológica grave**\n\n3️⃣ **Não menciona o potássio.** A questão que ignora o K+ está incompleta — e a alternativa que 'esquece' dele costuma ser a distratora.\n\n4️⃣ **Confunde CAD com Estado Hiperglicêmico Hiperosmolar (EHH):**\n• **CAD** → mais típica do **DM1** · com cetose e acidose · glicemia geralmente 250–600 · instalação em **horas/dias**\n• **EHH** → mais típico do **DM2 e do idoso** · **sem cetose significativa** · glicemia muito mais alta (>600) · desidratação profunda · instalação em **dias/semanas**\n\n5️⃣ **Na hipoglicemia, oferece líquido açucarado a paciente inconsciente.** **NUNCA** — risco de broncoaspiração. Inconsciente = **glicose EV**.\n\n💡 **A régua**: em emergência glicêmica, pergunte sempre — *o que falta primeiro?* Na CAD falta **água**, não insulina. A insulina resolve a causa; o volume mantém o paciente vivo até lá.",
  },

  // ─────────── BIOÉTICA ───────────
  {
    id: "disc-etica-01", eixo: "etica", sub: "Legislação em enfermagem", nivel: "media",
    tempoEstimado: "15 min", linhas: 20,
    enunciado: "Em uma unidade de terapia intensiva, o enfermeiro plantonista, sobrecarregado, delega a um técnico de enfermagem experiente a passagem de sonda vesical de demora em um paciente grave, orientando-o verbalmente e permanecendo em outro leito. O procedimento transcorre sem intercorrências.\n\nResponda:\n\na) A conduta está correta? Fundamente com base na legislação do exercício profissional.\nb) Explique o critério que define uma atividade como privativa do enfermeiro.\nc) O fato de 'ter dado certo' e de o técnico ser 'experiente' altera a responsabilidade? Justifique.",
    roteiro: [
      "Identificar que a conduta é INCORRETA.",
      "Fundamentar: a execução da sondagem vesical é PRIVATIVA do enfermeiro (Res. COFEN 450/2013, alterada pela 0680/2021).",
      "Apontar o art. 11 da Lei 7.498/86: cuidados de maior complexidade + decisão imediata + paciente grave.",
      "Explicar o critério unificador das privativas.",
      "Discutir que resultado não valida conduta — a responsabilidade é do ato, não do desfecho.",
      "Mencionar que experiência não transfere competência legal.",
    ],
    espelho: "**a) A conduta está INCORRETA.**\n\nA **execução** do cateterismo vesical é **privativa do enfermeiro**, conforme a **Resolução COFEN nº 450/2013**, alterada pela **Resolução nº 0680/2021**. O técnico de enfermagem **auxilia** — prepara material, posiciona o paciente, apoia — mas **não executa**.\n\nA base legal está na **Lei nº 7.498/86, art. 11, inciso I**, que reserva ao enfermeiro os **cuidados de maior complexidade técnica** que exijam conhecimento científico e capacidade de **tomar decisões imediatas**, e os **cuidados diretos a pacientes graves com risco de vida**. O caso reúne os dois.\n\nHá ainda uma segunda falha: o enfermeiro **não estava presente** — permaneceu em outro leito. O art. 15 estabelece que técnicos e auxiliares atuam **sob orientação e supervisão** do enfermeiro. Orientação verbal à distância não é supervisão.\n\n**b) O critério que define as privativas:**\n\nNão é uma lista aleatória para decorar. O que unifica todas as atividades privativas é: **MAIOR COMPLEXIDADE TÉCNICA + NECESSIDADE DE DECISÃO IMEDIATA**.\n\nÉ por isso que são privativas:\n• **Direção** do órgão de enfermagem e **chefia** de serviço/unidade\n• **Consulta** de enfermagem\n• **Prescrição** da assistência de enfermagem\n• **Cuidados diretos** a paciente **grave com risco de vida**\n• Cuidados de **maior complexidade** com decisão imediata\n\n👉 A régua para qualquer questão: pergunte — *isso exige julgamento clínico e decisão na hora?* Se sim, é do enfermeiro.\n\n**c) NÃO. O resultado não altera a responsabilidade — e a experiência tampouco.**\n\n**Sobre 'ter dado certo':** a responsabilidade profissional recai sobre o **ATO**, não sobre o **desfecho**. Um ato irregular que não gerou dano continua sendo irregular — apenas teve **sorte**. Julgar conduta pelo resultado é o raciocínio inverso da segurança do paciente: se aceitássemos isso, só reconheceríamos o erro quando alguém já tivesse se machucado.\n\nAlém disso, o Código de Ética classifica as infrações pelo **potencial de dano** — não apenas pelo dano consumado. E se houvesse trauma uretral, falso trajeto ou infecção, a responsabilidade seria do **enfermeiro que delegou indevidamente**, e não apenas do técnico.\n\n**Sobre 'ser experiente':** experiência **não transfere competência legal**. A privatividade decorre da **habilitação profissional** definida em lei — não da destreza individual. Um técnico com 20 anos de casa pode ter mais habilidade manual que um enfermeiro recém-formado; isso **não muda** quem a lei autoriza a executar. Se bastasse experiência, a regulamentação profissional não faria sentido.\n\n👉 E há um detalhe importante: quem **delega indevidamente** também responde. A sobrecarga do plantão explica o contexto, mas **não justifica** a conduta — e o caminho correto seria comunicar formalmente o dimensionamento inadequado.",
    pegadinha: "**Como a banca arma a armadilha neste tema:**\n\n1️⃣ **Atribui atividade privativa ao técnico.** É o erro nº 1 do eixo. **Leia o SUJEITO da frase antes do verbo** — muitas vezes a atividade descrita está certa, mas quem a executa está errado.\n\n2️⃣ **'Libera' o técnico da supervisão.** Qualquer alternativa que diga 'sem necessidade de supervisão', 'de forma autônoma' ou 'com supervisão à distância' para técnico/auxiliar está errada (art. 15).\n\n3️⃣ **Confunde os incisos da Lei 7.498.** Cuidado: várias atividades estão na lei, mas no **inciso II** (o enfermeiro faz **como integrante da equipe** — outros também fazem), não no **inciso I** (privativas). Ex.: 'participação no planejamento da programação de saúde' está na lei, mas **não é privativa**.\n\n4️⃣ **Troca 'prescrição da assistência de enfermagem' por 'prescrição de medicamentos'.** O enfermeiro prescreve **medicamentos** apenas em programas de saúde pública e rotinas aprovadas pela instituição.\n\n5️⃣ **Usa o bom resultado para validar a conduta.** 'O procedimento transcorreu sem intercorrências, portanto...' — não. Ato irregular com bom desfecho continua irregular.\n\n💡 **A régua**: maior complexidade + decisão imediata = **enfermeiro**. E lembre da sondagem vesical: **executar é privativo** (COFEN 450/2013, alt. 0680/2021).",
  },

];

const BANCO = [
// ─────────── BÔNUS: SUS ───────────
  {
    id: "fgv25-41", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "O Sistema Único de Saúde (SUS) é estruturado para garantir o direito à saúde a toda a população brasileira, sendo orientado por princípios e diretrizes que norteiam sua organização e funcionamento. Considerando esses aspectos, analise as afirmativas a seguir e assinale V para a verdadeira e F para a falsa.\n\n( ) A descentralização prevê que os serviços devem ser organizados em níveis crescentes de complexidade, circunscritos a uma determinada área geográfica.\n( ) A equidade consiste em oferecer recursos de forma igualitária a todos os municípios, independentemente das diferenças epidemiológicas, socioeconômicas ou de vulnerabilidade populacional.\n( ) A integralidade orienta o cuidado ao considerar o conjunto de necessidades de saúde do indivíduo, promovendo ações coordenadas entre diferentes níveis de atenção e entre promoção, prevenção, tratamento e reabilitação.\n\nAs afirmativas são, respectivamente,",
    alts: ["F – F – V", "V – F – V", "F – V – F", "F – F – F", "V – V – V"],
    correta: 0,
    coment: "Gabarito oficial: A (F – F – V).\n\n1ª FALSA: a descrição de \"níveis crescentes de complexidade em área geográfica\" é de REGIONALIZAÇÃO E HIERARQUIZAÇÃO, não de descentralização. Descentralização = distribuir poder e responsabilidade entre as esferas (União, estados, municípios), com direção única em cada uma.\n\n2ª FALSA: aqui está a pegadinha de ouro do SUS. EQUIDADE é o OPOSTO de \"igualitário para todos independentemente das diferenças\" — equidade é tratar desigualmente os desiguais, investindo MAIS onde a necessidade é maior. O que a alternativa descreveu foi IGUALDADE.\n\n3ª VERDADEIRA: integralidade = conjunto articulado de ações de promoção, prevenção, tratamento e reabilitação, em todos os níveis.\n\n💡 BIZU: sempre que ler \"equidade\" seguido de \"igualitária/da mesma forma para todos\", está errado. Equidade dá mais a quem precisa mais.",
  },

  // ─────────── SAÚDE MENTAL E POPULAÇÕES ESPECÍFICAS ───────────
  {
    id: "fgv25-42", eixo: "mental", sub: "Pessoa com deficiência",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "A Política Nacional de Atenção à Saúde da Pessoa com Deficiência (PNSPCD) busca garantir cuidado integral, acessível e contínuo a indivíduos com diferentes tipos de deficiência, cujas ações estão organizadas em eixos de atuação. Assinale a opção que apresenta uma ou mais ações estratégicas do eixo \"organização das ações e serviços de saúde sob a lógica das Redes de Atenção à Saúde\".",
    alts: [
      "O estímulo à autonomia e à co-responsabilidade.",
      "A articulação e a integração dos diferentes pontos de atenção.",
      "O fortalecimento das ações de educação permanente nos serviços de saúde.",
      "A tradução, a divulgação e a comunicação das informações em saúde.",
      "A promoção da saúde, a qualidade de vida e a prevenção de agravos.",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. A palavra-chave do eixo é REDES DE ATENÇÃO — e rede se faz de PONTOS ARTICULADOS E INTEGRADOS. A alternativa B é a única que fala em organização da rede propriamente dita.\n\nAs demais pertencem a outros eixos: autonomia e corresponsabilidade → eixo do cuidado; educação permanente → eixo de formação; comunicação da informação → eixo de informação; promoção e prevenção → eixo de promoção.\n\n💡 BIZU DE PROVA: quando a questão nomeia o eixo, procure na alternativa a palavra que ECOA o nome do eixo. Eixo de \"Redes de Atenção\" → resposta com \"pontos de atenção\", \"articulação\", \"integração\". Essa técnica resolve muita questão de política pública sem decorar a política inteira.",
  },

  // ─────────── SEGURANÇA DO PACIENTE ───────────
  {
    id: "fgv25-43", eixo: "seg", sub: "Segurança do paciente",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "facil",
    enunciado: "Durante a admissão de um paciente idoso na clínica médica, a enfermeira aplicou a Escala de Morse para avaliar o risco de queda. O paciente apresenta histórico de queda recente, usa medicação sedativa, necessita de auxílio para deambular e levanta-se frequentemente sem pedir ajuda. Considerando a interpretação dessa escala, o paciente deve receber a seguinte classificação:",
    alts: [
      "ausência de risco de queda, pois a deambulação é mantida com mínima assistência.",
      "risco leve de queda, sem necessidade de medidas específicas de precaução ambiental.",
      "risco baixo de queda, exigindo apenas observação periódica e registro diário de Enfermagem.",
      "risco moderado de queda, devendo ser reavaliado semanalmente pela equipe de Enfermagem.",
      "risco alto de queda, necessitando implementação imediata de medidas preventivas intensivas.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. O enunciado empilha QUATRO fatores de risco: histórico de queda recente, sedativo, auxílio para deambular e levantar-se sem pedir ajuda. Isso é risco ALTO — exige medidas preventivas imediatas e intensivas.\n\n💡 A ESCALA DE MORSE avalia 6 itens: (1) histórico de queda; (2) diagnóstico secundário; (3) auxílio na deambulação; (4) terapia endovenosa/heparina; (5) marcha; (6) estado mental. Classificação usual: 0–24 baixo · 25–44 moderado · ≥45 alto.\n\n💡 BIZU DE INTERPRETAÇÃO: quando o enunciado LISTA vários fatores de risco de uma vez, a resposta tende ao extremo (risco alto). A banca não empilha quatro fatores para a resposta ser \"risco leve\". Conte os fatores antes de marcar.\n\n⚠️ Reavaliação SEMANAL (alternativa D) também é armadilha: paciente de risco é reavaliado a cada mudança de estado, transferência ou queda — não por calendário fixo.",
  },

  // ─────────── DOENÇAS E AGRAVOS ───────────
  {
    id: "fgv25-44", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Durante uma ação de vigilância, a equipe de saúde realizou o acompanhamento dos contatos domiciliares de um paciente recentemente diagnosticado com hanseníase multibacilar. Os familiares relatam que conviviam com o paciente diariamente antes da confirmação da doença. Com base nas recomendações do Ministério da Saúde acerca da imunoprofilaxia e do monitoramento dessas pessoas, é correto afirmar que",
    alts: [
      "o exame clínico é restrito aos contatos que apresentem lesões aparentes ou diminuição da sensibilidade, sendo dispensável para os assintomáticos.",
      "recomenda-se aplicar a vacina BCG apenas nas crianças menores de 5 anos, independentemente do histórico vacinal anterior, e monitorar os demais.",
      "o acompanhamento dos contatos deve ocorrer apenas após o término do tratamento do caso índice, para evitar resultados falso-positivos.",
      "a vacina BCG deve ser administrada a todos os contatos, inclusive os que já receberam duas doses documentadas anteriormente.",
      "recomenda-se ofertar imunoprofilaxia aos contatos maiores de um ano de idade, não vacinados ou que receberam apenas uma dose da vacina BCG.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. A regra do MS para contato de hanseníase: ofertar BCG conforme a CICATRIZ/HISTÓRICO VACINAL — sem cicatriz ou com apenas uma dose → aplicar; com duas doses documentadas → NÃO aplicar.\n\n💡 A LÓGICA que elimina as erradas:\n• A → exame clínico de TODOS os contatos é obrigatório, sintomáticos ou não. É a busca ativa que quebra a cadeia.\n• B → não é \"apenas menores de 5 anos\", e nunca \"independentemente do histórico\".\n• C → esperar o fim do tratamento do caso índice é perder a janela. Avalia-se JÁ.\n• D → quem já tem DUAS doses não recebe mais.\n\n⚠️ PEGADINHA: as alternativas A, B, C e D contêm \"apenas\", \"independentemente\" ou \"todos\" — os marcadores clássicos de erro. A correta (E) é a única com condicionantes.\n\n💡 Lembre: na hanseníase, a BCG para contato NÃO é vacina contra hanseníase — é imunoprofilaxia que confere proteção parcial.",
  },

  // ─────────── ADMINISTRAÇÃO EM ENFERMAGEM ───────────
  {
    id: "fgv25-45", eixo: "admin", sub: "Teorias da administração",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "O planejamento estratégico e o planejamento normativo são instrumentos de gestão que orientam a formulação de políticas e ações organizacionais. Considerando as características desses dois tipos de planejamento, é correto afirmar que:",
    alts: [
      "o planejamento estratégico é essencialmente prescritivo, voltado à definição de normas e padrões de conduta.",
      "o planejamento normativo busca traduzir metas políticas em planos operacionais flexíveis, priorizando a adaptação ao ambiente externo.",
      "o planejamento estratégico orienta a organização para o futuro com base em diagnósticos e cenários.",
      "tanto o planejamento estratégico quanto o normativo são prospectivos e dinâmicos, com caráter estritamente técnico.",
      "o planejamento normativo e o estratégico são equivalentes, pois ambos se concentram na execução operacional e no controle dos resultados organizacionais.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. O planejamento ESTRATÉGICO olha para FRENTE: parte de diagnóstico da realidade, constrói cenários e define caminhos, considerando o ambiente e os atores. O planejamento NORMATIVO é prescritivo: define a norma, o padrão, o \"deve ser\", tratando a realidade como estável e controlável.\n\n💡 BIZU: NORMAtivo = NORMA (rígido, prescritivo, \"o que deve ser\"). ESTRATÉGICO = ESTRATÉGIA (flexível, situacional, cenários, futuro).\n\n⚠️ As alternativas A e B fazem a TROCA CLÁSSICA: dão ao estratégico a característica do normativo (prescritivo) e ao normativo a do estratégico (flexível/adaptável). D e E erram ao igualar os dois.\n\nEsse par cai muito em gestão em saúde — e a inversão é sempre a armadilha.",
  },
  {
    id: "fgv25-46", eixo: "admin", sub: "Organização dos serviços de enfermagem",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "O hospital-dia é uma modalidade assistencial inserida na Rede de Atenção à Saúde que visa otimizar o cuidado e o uso de recursos hospitalares. Considerando suas características, é correto afirmar que o hospital-dia",
    alts: [
      "destina-se a internações que durem até 24 horas, voltadas à reabilitação intensiva de pacientes com doenças crônicas.",
      "oferece cuidados intermediários entre a internação integral e o atendimento ambulatorial, com permanência máxima de 12 horas diárias.",
      "é voltado para a pacientes psiquiátricos, funcionando como substitutivo das internações hospitalares prolongadas.",
      "é voltado para procedimentos cirúrgicos de média complexidade, com necessidade de acompanhamento multiprofissional contínuo.",
      "é um serviço de pronto atendimento destinado a casos de urgência e emergência que não demandam internação prolongada.",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. O hospital-dia é exatamente o MEIO-TERMO: mais que ambulatório, menos que internação. Permanência de até 12 HORAS diárias — o paciente vem, recebe o cuidado e VAI PARA CASA DORMIR.\n\n💡 A LÓGICA DO NOME resolve a questão: hospital-DIA = só de DIA. Se dormisse lá, seria internação. Guarde: 12 horas, não 24.\n\n⚠️ A alternativa C é a armadilha mais sofisticada: existe SIM hospital-dia psiquiátrico, mas o hospital-dia como MODALIDADE não é exclusivo da saúde mental — atende oncologia, cirurgia ambulatorial, HIV, geriatria. \"É voltado PARA pacientes psiquiátricos\" restringe indevidamente.\n\n💡 Alternativa A morre no \"24 horas\"; E confunde com UPA.",
  },

  // ─────────── DOENÇAS E AGRAVOS ───────────
  {
    id: "fgv25-47", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "De acordo com dados do Ministério da Saúde, o Brasil voltou a registrar um preocupante aumento nos casos de hepatite A, após dez anos de queda, principalmente nas faixas etárias acima de 20 anos. Com relação a essa doença, é correto afirmar que",
    alts: [
      "costuma evoluir de forma benigna, mas pode apresentar formas graves em adultos e indivíduos com comorbidades.",
      "é transmitida por contato sexual desprotegido, apresentando alta taxa de cronicidade.",
      "é mais grave em adultos, podendo ocasionar sintomas intensos, como icterícia, fadiga e mal-estar geral.",
      "é uma infecção viral de transmissão fecal-oral, geralmente autolimitada e prevenível por meio de vacinação.",
      "a infecção ocorre principalmente por transfusão de sangue contaminado e pelo consumo de alimentos contaminados.",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. Reúne os TRÊS pilares da hepatite A: transmissão FECAL-ORAL, curso AUTOLIMITADO e prevenção por VACINA (disponível no SUS aos 15 meses).\n\n⚠️ ATENÇÃO — questão difícil de descarte: as alternativas A e C também trazem informações verdadeiras (a hepatite A PODE ser mais grave no adulto). Mas a D é a mais COMPLETA e caracteriza a doença; A e C são recortes parciais.\n\n💡 REGRA DE OURO DA FGV: quando duas ou mais alternativas parecem certas, marque a que MELHOR e mais COMPLETAMENTE responde ao comando. Aqui, o comando é \"com relação a essa doença\" — pede a caracterização, não um detalhe.\n\n• B erra feio: hepatite A NÃO cronifica (quem cronifica são B e C).\n• E erra: transfusão é via de B e C, não de A.\n\n💡 BIZU: hepatite A e E = fecal-oral (\"A de Água, E de Esgoto\"). B, C e D = sangue/sexo.",
  },

  // ─────────── CICLOS DE VIDA ───────────
  {
    id: "fgv25-48", eixo: "ciclos", sub: "Pré-natal",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Com base nos protocolos do Ministério da Saúde, conforme tratamento profilático da deficiência de ferro em gestantes (com Hb > 11 g/dL e ferritina ≥ 30 ng/mL), é correto afirmar que",
    alts: [
      "a dose diária não deve ultrapassar 200 µg de ácido fólico, devendo ser suspensa após o parto.",
      "a suplementação deve ser mantida por até 2 meses após o parto, apenas para mulheres que tiveram parto normal.",
      "a dose diária no pós-parto deve ser de 60 a 100 mg de ferro elementar + 400 µg de ácido fólico.",
      "a suplementação deve ser iniciada a partir da 30ª semana de gestação, independentemente do estado nutricional.",
      "a dose diária deve ser de 100 a 200 mg de ferro elementar durante toda a gestação.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. Atenção ao enunciado: a gestante tem Hb > 11 e ferritina ≥ 30 — ou seja, SEM anemia. É PROFILAXIA, não tratamento. A dose profilática no pós-parto: 60 a 100 mg de ferro elementar + 400 µg de ácido fólico.\n\n💡 POR QUE AS OUTRAS ERRAM:\n• A → confunde a dose e manda suspender após o parto (a suplementação CONTINUA no puerpério).\n• B → restringir ao \"parto normal\" é absurdo — a cesárea perde MAIS sangue.\n• D → a profilaxia começa cedo (por volta da 20ª semana), não na 30ª. E nunca \"independentemente do estado nutricional\".\n• E → 100–200 mg é dose de TRATAMENTO de anemia, não de profilaxia.\n\n💡 BIZU: ÁCIDO FÓLICO = pré-concepcional e 1º trimestre (fecha o tubo neural na 4ª semana). FERRO = a partir da 20ª semana e mantido no pós-parto. Doses: profilaxia 60 mg · tratamento 100–200 mg.",
  },

  // ─────────── ASSISTÊNCIA POR SISTEMAS ───────────
  {
    id: "fgv25-49", eixo: "sistemas", sub: "Sistema endócrino",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "facil",
    enunciado: "Em pacientes com diabetes, o controle glicêmico deve ser individualizado de acordo com a situação clínica. Nesse sentido, para um paciente com Diabetes Mellitus tipo 2, a meta para glicemia em jejum é",
    alts: ["< 80 mg/dL.", "entre 70-99mg/dL.", "entre 80-130mg/dL.", "entre 90-150mg/dL.", "entre 99-140mg/dL."],
    correta: 2,
    coment: "Gabarito oficial: C. Meta de glicemia em JEJUM/PRÉ-PRANDIAL no DM2: 80 a 130 mg/dL.\n\n⚠️ NÃO CONFUNDA os três blocos de números do diabetes — a banca vive misturando:\n\n📌 DIAGNÓSTICO: jejum ≥ 126 · HbA1c ≥ 6,5% · TTGO 2h ≥ 200 · ao acaso ≥ 200 com sintomas.\n📌 REFERÊNCIA NORMAL (quem não tem DM): jejum 70–99.\n📌 META do DIABÉTICO TRATADO: jejum 80–130 · pós-prandial < 180 · HbA1c < 7% · TIR > 70%.\n\n💡 A ALTERNATIVA B (70–99) é a armadilha: esse é o valor NORMAL de quem NÃO tem diabetes. A meta de quem TEM diabetes é mais frouxa (80–130) — porque apertar demais aumenta o risco de HIPOGLICEMIA, que mata mais rápido que a hiperglicemia crônica.\n\n💡 É por isso que a meta \"individualiza\": idoso frágil tem meta ainda mais folgada.",
  },
  {
    id: "fgv25-50", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Durante o tratamento da Tuberculose Pulmonar, o paciente deve ser orientado a respeito das reações adversas relacionadas aos fármacos do esquema básico. Nesse caso, assinale a opção que corresponde ao fármaco associado à ocorrência prurido e exantema leve:",
    alts: ["isoniazida.", "etambutol.", "terizidona.", "pirazinamida.", "levofloxacino."],
    correta: 0,
    coment: "Gabarito oficial: A. Prurido e exantema (rash) leve são reações adversas MENORES associadas classicamente à ISONIAZIDA — e também à rifampicina. A conduta é sintomática (anti-histamínico); NÃO se suspende o esquema.\n\n⚠️ ATENÇÃO À PEGADINHA DO ENUNCIADO: ele diz \"fármacos do ESQUEMA BÁSICO\". O esquema básico é o RIPE: Rifampicina, Isoniazida, Pirazinamida, Etambutol. As alternativas C (terizidona) e E (levofloxacino) são de esquemas para TB RESISTENTE — já saem de cara.\n\n💡 EFEITOS ADVERSOS DO RIPE — a colinha:\n• RIFAMPICINA → urina/suor/lágrima LARANJA (esperado, NÃO suspende!) · rash · hepatotoxicidade.\n• ISONIAZIDA → NEUROPATIA periférica (previne com piridoxina/B6) · rash · prurido · hepatotoxicidade.\n• PIRAZINAMIDA → aumenta ÁCIDO ÚRICO (artralgia/gota) · hepatotoxicidade.\n• ETAMBUTOL → OLHO (neurite óptica, altera visão de cores).\n\n💡 BIZU: \"Etambutol = Enxerga mal\". \"Isoniazida = formIga no pé (neuropatia)\". \"Pirazinamida = ácido úrico\".",
  },

  // ─────────── SEGURANÇA / PNI ───────────
  {
    id: "fgv25-51", eixo: "seg", sub: "Programa Nacional de Imunização",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Uma criança de 4 anos, com todas as vacinas em dia, foi levada à unidade de saúde para atualização vacinal rotineira. De acordo com o Calendário Nacional de Vacinação, as doses recomendadas nessa faixa etária incluem",
    alts: [
      "tríplice bacteriana - DTP (2º reforço), febre amarela (reforço) e varicela (2ª dose).",
      "tríplice viral (1ª dose), meningocócica C (reforço) e hepatite B (3ª dose).",
      "pneumocócica 10-valente (reforço), rotavírus (2ª dose) e influenza sazonal.",
      "hepatite A (1ª dose), influenza (reforço) e HPV quadrivalente (1ª dose).",
      "febre amarela (1ª dose), tríplice viral (2ª dose) e varicela (1ª dose).",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. Aos 4 ANOS: DTP (2º reforço), Febre amarela (reforço) e Varicela.\n\n💡 POR QUE AS OUTRAS ERRAM — todas colocam vacina de OUTRA idade:\n• B → tríplice viral 1ª dose e hepatite B 3ª dose são MUITO antes (12 meses e 6 meses).\n• C → pneumo 10 reforço é aos 12 meses; ROTAVÍRUS tem janela rígida e não passa dos 7 meses e 29 dias!\n• D → hepatite A é aos 15 meses; HPV é de 9 a 14 anos.\n• E → febre amarela 1ª dose é aos 9 meses (aos 4 anos é REFORÇO).\n\n⚠️ A palavra-chave do enunciado é \"com todas as vacinas EM DIA\" — ou seja, ela já tomou tudo que era das idades anteriores. Se a alternativa traz 1ª dose de algo que já deveria ter sido feito, está errada.\n\n💡 ATENÇÃO ÀS ATUALIZAÇÕES DO CALENDÁRIO: hoje aos 12 meses é MENINGO ACWY (não mais meningo C reforço), o HPV é DOSE ÚNICA (9–14 anos), entrou DENGUE (10–14 anos) e a influenza é TRIVALENTE. Material antigo erra isso.",
  },
  {
    id: "fgv25-52", eixo: "semio", sub: "Diagnóstico e prognóstico",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "A Classificação Internacional para a Prática de Enfermagem (CIPE) organiza seus conceitos em eixos que permitem a formulação de enunciados diagnósticos, intervenções e resultados de Enfermagem. Considerando essa taxonomia de Enfermagem, é correto afirmar que:",
    alts: [
      "a estrutura da CIPE é organizada por sistemas corporais e patologias, similar ao modelo da Classificação Internacional de Doenças (CID).",
      "os eixos da CIPE se restringem à descrição de doenças e agravos clínicos, sem incluir fatores relacionados ao ambiente e ao cliente.",
      "a CIPE utiliza eixos voltados apenas para registro de procedimentos técnicos e aspectos operacionais do cuidado de Enfermagem.",
      "os eixos da CIPE correspondem às dimensões do processo administrativo de Enfermagem: planejamento, execução e avaliação.",
      "os eixos da CIPE incluem foco, julgamento, ação, cliente, localização, tempo e meio, compondo a base combinatória para expressar fenômenos e ações de Enfermagem.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. Os SETE EIXOS da CIPE: Foco, Julgamento, Ação, Cliente, Localização, Tempo e Meio.\n\n💡 A LÓGICA DA CIPE: é uma taxonomia COMBINATÓRIA. Você monta o diagnóstico juntando eixos: FOCO (dor) + JULGAMENTO (aguda) = \"Dor aguda\". Por isso ela é flexível — permite construir enunciados que nenhuma lista pronta previu.\n\n💡 MNEMÔNICO DOS 7 EIXOS: \"Foco Julgado por Ação do Cliente no Local, Tempo e Meio\".\n\n⚠️ POR QUE AS OUTRAS ERRAM — e a lógica é a mesma nas quatro: a CIPE é sobre ENFERMAGEM, não sobre doença nem sobre administração.\n• A → CIPE ≠ CID. A CID classifica DOENÇA; a CIPE classifica a PRÁTICA de enfermagem.\n• B → inclui SIM ambiente e cliente (são eixos!).\n• C → não é registro de procedimento; é linguagem do cuidado.\n• D → confunde com processo administrativo.\n\n💡 NANDA × CIPE: as duas são taxonomias de diagnóstico aceitas. NANDA tem enunciados PRONTOS; CIPE é COMBINATÓRIA (você monta).",
  },

  // ─────────── SAÚDE MENTAL ───────────
  {
    id: "fgv25-53", eixo: "mental", sub: "Saúde mental",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "facil",
    enunciado: "Durante uma visita domiciliar, um homem de 28 anos diz ouvir vozes que o insultam, demonstra fala desorganizada, comportamento retraído e pouca expressão emocional. Segundo familiares, o quadro vem se mantendo há cerca de oito meses, com dificuldade para manter autocuidado e vínculos sociais. Considerando o caso descrito, os sinais apresentados são característicos de",
    alts: [
      "transtorno dissociativo, caracterizado por perda temporária da identidade e lacunas de memória episódica.",
      "transtorno de pânico, caracterizado por episódios agudos de medo intenso e sintomas físicos transitórios.",
      "transtorno afetivo bipolar, caracterizado por alternância entre fases de euforia e períodos de humor deprimido.",
      "transtorno obsessivo-compulsivo, caracterizado por pensamentos intrusivos e comportamentos repetitivos de verificação.",
      "esquizofrenia, caracterizada por delírios, alucinações, discurso desorganizado e prejuízo funcional persistente.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. O enunciado entrega o quadro completo da esquizofrenia:\n\n📌 SINTOMAS POSITIVOS (acréscimos à experiência): alucinação auditiva (\"ouvir vozes que o insultam\") e discurso desorganizado.\n📌 SINTOMAS NEGATIVOS (perdas): comportamento retraído, pouca expressão emocional (embotamento afetivo), abandono do autocuidado.\n📌 CRITÉRIO TEMPORAL: 8 meses — acima dos 6 meses exigidos.\n📌 PREJUÍZO FUNCIONAL: perda de vínculos sociais.\n\n💡 BIZU DO TEMPO: esquizofrenia exige ≥ 6 MESES de duração. Se o enunciado disser \"há 2 semanas\", pense em surto psicótico breve. O tempo NUNCA está no enunciado por acaso.\n\n💡 POSITIVO × NEGATIVO: positivo é o que APARECE que não deveria (voz, delírio). Negativo é o que SOME (afeto, vontade, fala). Os negativos respondem pior ao tratamento e explicam a incapacidade a longo prazo.\n\n⚠️ Na conduta: NÃO confrontar a alucinação nem reforçá-la. Acolhe-se o SENTIMENTO (\"percebo que essas vozes te angustiam\"), sem discutir a veracidade.",
  },

  // ─────────── DOENÇAS E AGRAVOS ───────────
  {
    id: "fgv25-54", eixo: "doencas", sub: "Doenças neoplásicas",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante a administração de quimioterapia intravenosa com um antineoplásico pertencente ao grupo alcaloides da vinca, a paciente referiu ardência e dor intensa no local da punção, além de edema e eritema ao redor da veia. Diante dessa situação, a conduta imediata mais adequada é",
    alts: [
      "massagear vigorosamente o local do extravasamento, para dispersar o quimioterápico e acelerar absorção pelos tecidos.",
      "reduzir a velocidade da infusão, aplicar compressa fria e continuar a administração do quimioterápico até o término.",
      "suspender o tratamento e encaminhar a paciente para observação, mantendo o acesso venoso com soro fisiológico.",
      "interromper imediatamente a infusão, aspirar o extravasado, e aplicar compressa morna.",
      "retirar imediatamente o acesso venoso sem aspirar o extravasado e manter o membro elevado.",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. Sequência do extravasamento: (1) INTERROMPER a infusão; (2) NÃO retirar o cateter — usá-lo para ASPIRAR o resíduo; (3) aplicar compressa conforme a droga; (4) comunicar e registrar.\n\n💡 A SACADA DESTA QUESTÃO — por que compressa MORNA e não fria: os ALCALOIDES DA VINCA (vincristina, vimblastina) são a EXCEÇÃO. Neles se aplica calor, que promove VASODILATAÇÃO e dispersa a droga, reduzindo a concentração local. Para a maioria dos outros vesicantes (antraciclinas, como a doxorrubicina), aplica-se FRIO, para vasoconstringir e LOCALIZAR a lesão.\n\n⚠️ Repare que o enunciado NOMEIA o grupo da droga (\"alcaloides da vinca\"). Quando a banca especifica o fármaco, ela está cobrando a exceção. Se fosse antraciclina, a resposta seria compressa FRIA.\n\n💡 BIZU: \"vinCA = Calor\". Antraciclina = frio.\n\n⚠️ A alternativa A é grave: massagear vigorosamente ESPALHA o vesicante e AUMENTA a área de necrose. Nunca massagear. E a E erra ao retirar o acesso sem aspirar — perde-se a chance de remover o resíduo e aplicar antídoto.",
  },
  {
    id: "fgv25-55", eixo: "sistemas", sub: "Sistema cardiovascular",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Um paciente chega à emergência com palpitações. O ECG apresenta ritmo regular, ondas P visíveis antes de cada QRS e intervalo R-R, medindo aproximadamente 4 quadradinhos grandes. Utilizando a regra dos 300, a frequência cardíaca estimada é",
    alts: ["60 bpm.", "75 bpm.", "90 bpm.", "100 bpm.", "120 bpm."],
    correta: 1,
    coment: "Gabarito oficial: B. REGRA DOS 300: FC = 300 ÷ nº de quadrados GRANDES entre dois R.\n\n📐 CÁLCULO: 300 ÷ 4 = 75 bpm.\n\n💡 A SEQUÊNCIA QUE VOCÊ DEVE DECORAR — é o bizu mais rentável de ECG:\n1 quadrado → 300 bpm\n2 quadrados → 150 bpm\n3 quadrados → 100 bpm\n4 quadrados → 75 bpm\n5 quadrados → 60 bpm\n6 quadrados → 50 bpm\n\nMnemônico: \"300, 150, 100, 75, 60, 50\". Decorou a sequência, resolve em 3 segundos sem calculadora.\n\n💡 POR QUE 300: o papel corre a 25 mm/s. Cada quadrado grande = 5 mm = 0,20 s. Em 1 minuto cabem 300 quadrados grandes (60 ÷ 0,20 = 300). Daí a divisão.\n\n⚠️ A regra dos 300 só vale para ritmo REGULAR — e o enunciado avisa isso (\"ritmo regular\"). Em ritmo irregular (ex.: fibrilação atrial), conta-se o número de QRS em 6 segundos e multiplica por 10.\n\n💡 O enunciado ainda descreve RITMO SINUSAL: onda P antes de cada QRS + regular. FC 75 = normal.",
  },
  {
    id: "fgv25-56", eixo: "sistemas", sub: "Sistema digestório",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Uma paciente de 32 anos deu entrada na unidade de saúde apresentando dor abdominal intensa no quadrante inferior direito, associada a náuseas e febre de 38°C. Durante o exame físico, ao realizar palpação profunda na fossa ilíaca direita, a paciente relatou dor acentuada à descompressão súbita. A manifestação clínica descrita corresponde ao sinal de",
    alts: ["Cullen.", "Rovsing.", "Murphy.", "Blumberg.", "McBurney."],
    correta: 3,
    coment: "Gabarito oficial: D. SINAL DE BLUMBERG = dor à DESCOMPRESSÃO SÚBITA (descompressão brusca dolorosa). É o sinal de irritação peritoneal — clássico da apendicite aguda.\n\n💡 A COLINHA DOS SINAIS ABDOMINAIS — cai muito:\n• BLUMBERG → dor à DESCOMPRESSÃO brusca (irritação peritoneal). Apendicite.\n• ROVSING → palpa a fossa ilíaca ESQUERDA e dói na DIREITA. Apendicite.\n• McBURNEY → é o PONTO (local anatômico), não a manobra: 1/3 lateral da linha entre a espinha ilíaca ântero-superior e o umbigo. Dor à palpação DESSE ponto.\n• MURPHY → parada da inspiração à palpação do hipocôndrio direito. COLECISTITE.\n• CULLEN → equimose PERIUMBILICAL. Hemorragia retroperitoneal / pancreatite grave.\n• GREY-TURNER → equimose nos FLANCOS. Mesma causa.\n\n⚠️ A PEGADINHA DESTA QUESTÃO: McBurney (E) também é apendicite e está na fossa ilíaca direita! Mas o enunciado descreve especificamente a DESCOMPRESSÃO SÚBITA — e isso é Blumberg. McBurney seria dor à COMPRESSÃO do ponto.\n\n💡 BIZU: \"BLUMberg = BRUsca\". Se o enunciado disser \"descompressão\", é Blumberg.",
  },
  {
    id: "fgv25-57", eixo: "urg", sub: "Urgência e emergência",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante a assistência a um paciente em ventilação mecânica, o enfermeiro utilizou a Escala de Sedação de Ramsay para avaliar o nível de sedação. Considerando a aplicação e interpretação dessa escala, é correto afirmar que a Escala de Ramsay",
    alts: [
      "classifica seis níveis de sedação (1 a 6), em que 1 é alerta e 6 sem resposta.",
      "classifica seis níveis de sedação (0 a 5), sendo 0 o mais leve e 5 o mais profundo.",
      "classifica a intensidade da dor, sendo utilizada para avaliação analgésica em pacientes críticos.",
      "inclui avaliação do tamanho pupilar e da reatividade fotomotora, somando pontos ao escore total.",
      "considera que escore mais alto corresponde à maior vigilância e melhor resposta verbal do paciente.",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. ESCALA DE RAMSAY: 6 níveis, de 1 a 6. Nível 1 = ansioso/agitado. Nível 6 = SEM RESPOSTA a estímulo.\n\n💡 A LÓGICA: quanto MAIOR o número, MAIS PROFUNDA a sedação. Ramsay 1 é o paciente acordado e agitado; Ramsay 6 é o paciente que não responde a nada.\n\n📌 OS 6 NÍVEIS:\n1 → ansioso, agitado\n2 → cooperativo, orientado, tranquilo\n3 → sonolento, atende a comandos\n4 → dormindo, resposta RÁPIDA a estímulo\n5 → dormindo, resposta LENTA a estímulo\n6 → SEM resposta\n\n⚠️ O ALVO usual em UTI é Ramsay 2 a 3 — sedação leve, paciente cooperativo. Sedação profunda desnecessária prolonga a ventilação mecânica e o tempo de internação.\n\n💡 POR QUE AS OUTRAS ERRAM:\n• B → começa em 1, não em 0 (quem vai de -5 a +4 é a escala RASS).\n• C → Ramsay avalia SEDAÇÃO, não dor (dor = EVA, BPS, CPOT).\n• D → não avalia pupila (isso é Glasgow com resposta pupilar).\n• E → INVERTE: escore alto = MENOS vigilância, mais sedação.",
  },

// ─────────── CICLOS DE VIDA ───────────
  {
    id: "fgv25-58", eixo: "ciclos", sub: "Saúde da mulher",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Com base nas Diretrizes Nacionais de Assistência ao Parto Normal e das boas práticas recomendadas pelo Ministério da Saúde, é correto afirmar, segundo a assistência ao parto de baixo risco, que",
    alts: [
      "a realização de manobras uterinas, como a pressão de fundo (manobra de Kristeller), é indicada rotineiramente para acelerar a saída do feto e prevenir hemorragias.",
      "a episiotomia rotineira é recomendada para todas as parturientes como medida preventiva de lacerações perineais.",
      "a ocitocina deve ser administrada na parturiente logo após o nascimento do bebê, por via intramuscular, para favorecer a contração uterina e reduzir o risco de hemorragia pós-parto.",
      "entre as técnicas recomendadas para prevenir a demora no trabalho de parto estão a amniotomia precoce e o uso de agentes antiespasmódicos.",
      "tricotomia e enema, antes do trabalho de parto são práticas recomendadas de rotina para reduzir infecções e facilitar o nascimento.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. A ocitocina IM logo após o nascimento é o MANEJO ATIVO DO 3º PERÍODO — reduz comprovadamente a hemorragia pós-parto. É a única prática RECOMENDADA entre as cinco.\n\n💡 A CHAVE DESTA QUESTÃO: quatro alternativas descrevem práticas que a OMS e o MS classificam como CLARAMENTE PREJUDICIAIS ou DESNECESSÁRIAS — o núcleo das Diretrizes de Parto Normal é justamente ABANDONAR o intervencionismo de rotina.\n\n⚠️ AS QUATRO PRÁTICAS ABOLIDAS:\n• KRISTELLER (pressão no fundo uterino) → PROIBIDA. Risco de rotura uterina, lesão fetal, trauma materno.\n• EPISIOTOMIA de rotina → NÃO. Uso seletivo apenas. Não previne laceração grave — muitas vezes causa.\n• AMNIOTOMIA precoce de rotina → NÃO recomendada.\n• TRICOTOMIA e ENEMA de rotina → NÃO. Não reduzem infecção e são desconfortáveis/constrangedores.\n\n💡 BIZU DE OURO: em questão de parto normal, a palavra \"ROTINEIRAMENTE\" ou \"DE ROTINA\" quase sempre marca a alternativa ERRADA. A filosofia das diretrizes é: menos intervenção, mais fisiologia.\n\n💡 Hemorragia pós-parto: causa nº 1 é ATONIA uterina. Os 4 T: Tônus, Trauma, Tecido, Trombina.",
  },
  {
    id: "fgv25-59", eixo: "ciclos", sub: "Saúde da criança",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Considerando o Programa de Humanização no Pré-natal e Nascimento (PHPN) e as recomendações do Ministério da Saúde sobre a assistência ao recém-nascido, é correto afirmar que",
    alts: [
      "o clampeamento imediato do cordão umbilical é recomendado para prevenir icterícia neonatal e melhorar a oxigenação cerebral do recém-nascido.",
      "a aspiração das vias aéreas do recém-nascido deve ser realizada de forma rotineira, mesmo sem sinais de obstrução, para prevenir broncoaspiração.",
      "o banho do recém-nascido deve ser realizado logo após o parto, com o objetivo de remover vérnix caseoso e prevenir infecções cutâneas.",
      "a administração de vitamina K é indicada apenas para prematuros com baixo peso, sendo desnecessária em recém-nascidos a termo e saudáveis.",
      "a profilaxia da oftalmia neonatal deve ser realizada rotineiramente com pomada de eritromicina a 0,5% e, como alternativa, tetraciclina a 1%.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. A profilaxia da oftalmia neonatal (credeização) é rotina em TODO recém-nascido, com eritromicina 0,5% ou tetraciclina 1%. Previne a conjuntivite gonocócica, que pode levar à CEGUEIRA.\n\n⚠️ AS QUATRO ARMADILHAS — todas invertem a recomendação atual:\n• A → o clampeamento hoje é TARDIO (1 a 3 minutos), não imediato. O sangue placentário que continua chegando previne ANEMIA no lactente. O clampeamento imediato é que era a prática antiga.\n• B → aspiração de rotina NÃO se faz. Só se houver obstrução. Aspirar sem necessidade causa bradicardia por reflexo vagal e lesa a mucosa.\n• C → banho é POSTERGADO. O vérnix PROTEGE (barreira, termorregulação, antimicrobiano) — não se remove! E o banho precoce causa hipotermia.\n• D → vitamina K é para TODO recém-nascido (previne a doença hemorrágica), não só prematuro.\n\n💡 O FIO CONDUTOR: as \"boas práticas\" do MS revisaram tudo que se fazia por rotina. Clampeamento tardio, contato pele a pele, aleitamento na 1ª hora, banho postergado, sem aspiração desnecessária. Se a alternativa manda intervir de rotina, desconfie.",
  },
  {
    id: "fgv25-60", eixo: "ciclos", sub: "Saúde da mulher",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Com base nas diretrizes para a Terapia de Reposição Hormonal (TRH), durante Climatério e Menopausa, analise as afirmativas a seguir e assinale V para a verdadeira e F para a falsa.\n\n( ) A TRH deve ser iniciada nos primeiros 10 anos após o início da menopausa, ou antes dos 60 anos, para que os benefícios cardiovasculares superem os riscos.\n( ) A TRH é contraindicada em mulheres com hipertensão arterial controlada, mesmo quando os riscos cardiovasculares estão avaliados e monitorados.\n( ) Mulheres com histórico de câncer de mama podem realizar TRH, desde que tenha se passado mais de 5 anos do fim do tratamento.\n\nAs afirmativas são, respectivamente,",
    alts: ["F – F – F.", "V – F – F.", "F – V – V.", "V – V – V.", "F – V - F."],
    correta: 1,
    coment: "Gabarito oficial: B (V – F – F).\n\n1ª VERDADEIRA — é a chamada \"JANELA DE OPORTUNIDADE\": TRH iniciada até 10 anos da menopausa OU antes dos 60 anos tem relação risco-benefício favorável. Fora dessa janela, o risco cardiovascular e trombótico supera o benefício.\n\n2ª FALSA: hipertensão CONTROLADA não contraindica. O que contraindica é a HAS grave/descontrolada.\n\n3ª FALSA — e essa é grave: câncer de mama é CONTRAINDICAÇÃO ABSOLUTA à TRH. Não existe \"prazo de carência\" de 5 anos. Muitos tumores de mama são hormônio-dependentes; repor hormônio pode estimular recidiva.\n\n💡 CONTRAINDICAÇÕES ABSOLUTAS DA TRH:\n• Câncer de mama (atual OU prévio)\n• Câncer de endométrio\n• Sangramento vaginal de causa não esclarecida\n• Doença tromboembólica ativa/prévia\n• Doença hepática grave\n• Doença coronariana/AVC prévio\n• Porfiria\n\n💡 BIZU: a TRH é sobre TEMPO (janela) e sobre CÂNCER HORMONAL (barreira absoluta). Alternativa que \"libera\" TRH pós-câncer de mama está sempre errada.",
  },

  // ─────────── SEMIOLOGIA / MEDICAÇÃO ───────────
  {
    id: "fgv25-61", eixo: "semio", sub: "Plano de trabalho",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Após receber a administração de metoclopramida (plasil) por via intravenosa, um paciente adulto começou a apresentar tremores nas extremidades dos membros superiores, rigidez muscular, inquietação intensa, movimentos involuntários da língua e face, além de dificuldade para manter-se imóvel. Esse quadro é característico de",
    alts: [
      "reação anafilática causada por hipersensibilidade medicamentosa.",
      "crise colinérgica decorrente da estimulação parassimpática excessiva.",
      "efeito extrapiramidal induzido por antagonismo dopaminérgico central.",
      "reação serotoninérgica relacionada ao excesso de neurotransmissores.",
      "síndrome neuroléptica maligna provocada por disfunção autonômica grave.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. A metoclopramida é ANTAGONISTA DOPAMINÉRGICO (bloqueia receptores D2). Ao bloquear a dopamina no sistema extrapiramidal — que controla o movimento — surgem os EFEITOS EXTRAPIRAMIDAIS: tremor, rigidez, distonia (movimentos da língua e face) e acatisia (inquietação, não conseguir ficar parado).\n\n💡 A LÓGICA QUE VOCÊ NUNCA MAIS ESQUECE: falta de dopamina no extrapiramidal = sintomas PARKINSONIANOS. É literalmente um \"Parkinson farmacológico\", agudo e reversível. Por isso tremor + rigidez.\n\n💡 OS 4 EFEITOS EXTRAPIRAMIDAIS:\n• DISTONIA aguda → contração muscular sustentada (língua, face, pescoço — torcicolo, crise oculógira)\n• ACATISIA → inquietação motora, não consegue ficar parado\n• PARKINSONISMO → tremor, rigidez, bradicinesia\n• DISCINESIA TARDIA → movimentos involuntários (uso crônico)\n\n⚠️ POR QUE NÃO É SÍNDROME NEUROLÉPTICA MALIGNA (E)? A SNM é a irmã GRAVE: exige FEBRE ALTA, rigidez em \"cano de chumbo\", instabilidade autonômica e rabdomiólise. O enunciado NÃO cita febre nem alteração de consciência — é extrapiramidal simples.\n\n💡 A metoclopramida é campeã disso em jovens. Conduta: suspender e comunicar; o antídoto clássico é biperideno.",
  },

  // ─────────── BIOÉTICA ───────────
  {
    id: "fgv25-62", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante a prestação de cuidados a um paciente hospitalizado, o profissional de Enfermagem administrou uma medicação incorreta, ocasionando uma reação adversa que provocou perigo de morte, embora o paciente tenha se recuperado após atendimento emergencial. De acordo com o Código de Ética dos Profissionais de Enfermagem, essa conduta configura uma infração",
    alts: ["leve.", "grave.", "severa.", "moderada.", "gravíssima."],
    correta: 1,
    coment: "Gabarito oficial: B (GRAVE).\n\n💡 A CLASSIFICAÇÃO DO CÓDIGO DE ÉTICA (Res. COFEN 564/2017) tem apenas TRÊS graus:\n• LEVE → ofende a integridade FÍSICA, MORAL, PSÍQUICA OU ESPIRITUAL de forma que NÃO ponha em risco a vida ou a dignidade.\n• GRAVE → infringe integridade física, moral, psíquica ou espiritual de forma GRAVE, colocando em RISCO a vida ou a dignidade.\n• GRAVÍSSIMA → infringe de modo a provocar DANO IRREPARÁVEL ou MORTE.\n\n📌 APLICANDO AO CASO: houve PERIGO de morte (risco à vida) → GRAVE. Mas o paciente SE RECUPEROU, ou seja, NÃO houve dano irreparável nem óbito → não chega a gravíssima.\n\n⚠️ AS PEGADINHAS: \"severa\" (C) e \"moderada\" (D) NÃO EXISTEM no Código de Ética. São categorias inventadas pela banca. Se a alternativa traz um grau que não existe, ela é descartável de imediato.\n\n💡 BIZU DEFINITIVO: são só TRÊS — LEVE, GRAVE, GRAVÍSSIMA. E a régua é o DANO: sem risco = leve · com RISCO de vida = grave · com dano IRREPARÁVEL ou MORTE = gravíssima.\n\n💡 Penalidades (outra coisa, não confunda): advertência verbal, multa, censura, suspensão e cassação.",
  },

  // ─────────── TRAUMA ───────────
  {
    id: "fgv25-63", eixo: "urg", sub: "Politraumatizado",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Um paciente de 40 anos sofreu acidente automobilístico e chegou à unidade de saúde apresentando equimoses periorbitais em \"olhos de guaxinim\", hemotímpano, rinorreia e otorreia com líquido claro, além de diplopia leve e confusão mental. Os sinais e sintomas apresentados são característicos de",
    alts: [
      "hematoma epidural.",
      "hematoma subdural.",
      "fratura de base de crânio.",
      "ratura linear de calvária.",
      "contusão cerebral difusa.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. O enunciado entrega a TÉTRADE CLÁSSICA da fratura de base de crânio:\n\n📌 \"OLHOS DE GUAXINIM\" (equimose periorbital bilateral) = sinal do GUAXINIM\n📌 HEMOTÍMPANO (sangue atrás da membrana timpânica)\n📌 RINORREIA e OTORREIA com LÍQUIDO CLARO = saída de LÍQUOR pelo nariz e ouvido\n📌 Pode haver também o SINAL DE BATTLE (equimose retroauricular, atrás da orelha)\n\n💡 POR QUE SAI LÍQUOR: a fratura na base do crânio rompe a dura-máter, criando comunicação entre o espaço subaracnóideo e as cavidades nasal/auditiva. O líquor VAZA. É por isso que esse líquido é CLARO — não é secreção, é o líquido que banha o cérebro.\n\n⚠️ CUIDADO DE ENFERMAGEM CRÍTICO — cai muito: diante de suspeita de fratura de base de crânio, é CONTRAINDICADA a passagem de SONDA NASOGÁSTRICA e a aspiração NASAL! O risco é a sonda atravessar a fratura e entrar no CRÂNIO. Se necessário, usa-se a via OROGÁSTRICA.\n\n💡 E jamais tamponar o ouvido/nariz que drena líquor — deixa-se drenar livremente (tamponar aumenta a PIC e o risco de meningite).\n\n💡 BIZU: guaxinim + Battle + líquor = base de crânio. Sonda pelo NARIZ, NUNCA.",
  },

  // ─────────── SISTEMAS ───────────
  {
    id: "fgv25-64", eixo: "sistemas", sub: "Sistema urinário",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Um paciente de 68 anos, com história de insuficiência cardíaca congestiva, é admitido em uma unidade de saúde apresentando confusão mental, fraqueza muscular e náuseas. Está em uso de furosemida 40 mg duas vezes ao dia. Ao exame físico, apresenta pressão arterial de 95/60 mmHg, turgor diminuído e mucosas secas. Os sinais apresentados são característicos do seguinte distúrbio hidroeletrolítico:",
    alts: ["hipocalemia.", "hipercalemia.", "hipocalcemia.", "hiponatremia.", "hipernatremia."],
    correta: 3,
    coment: "Gabarito oficial: D (HIPONATREMIA).\n\n💡 O RACIOCÍNIO — e essa questão é excelente:\nA FUROSEMIDA é diurético de ALÇA: inibe a reabsorção de sódio, potássio e cloro. Ela faz perder ÁGUA e SÓDIO. O quadro do paciente mostra:\n• CONFUSÃO MENTAL → sintoma NEUROLÓGICO, marca registrada da hiponatremia (o sódio baixo faz a água entrar na célula cerebral = EDEMA CEREBRAL)\n• Fraqueza, náuseas → inespecíficos, compatíveis\n• PA 95/60, turgor diminuído, mucosas secas → HIPOVOLEMIA (perdeu água E sódio)\n\n⚠️ POR QUE NÃO HIPOCALEMIA (A)? A furosemida também espolia potássio — a hipocalemia É uma complicação clássica dela! MAS: a hipocalemia daria arritmia, cãibra, íleo paralítico, fraqueza. O que CRAVA a resposta é a CONFUSÃO MENTAL + os sinais de desidratação, que apontam para o SÓDIO.\n\n💡 A REGRA DE OURO: SÓDIO = NEURO. Alteração de sódio se manifesta no CÉREBRO (confusão, convulsão, coma). POTÁSSIO = CORAÇÃO E MÚSCULO (arritmia, fraqueza, cãibra).\n\nSe o enunciado destaca CONFUSÃO MENTAL → pense em sódio. Se destaca ARRITMIA → pense em potássio.\n\n💡 Valores: Sódio 135–145 mEq/L · Potássio 3,5–5,0 mEq/L.",
  },
  {
    id: "fgv25-65", eixo: "sistemas", sub: "Sistema respiratório",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Um homem de 54 anos, com história de DPOC grave e uso irregular de broncodilatadores, é admitido na emergência por dispneia intensa, sonolência e confusão mental. Ao exame, está cianótico, com frequência respiratória de 10 irpm e uso de musculatura acessória.\n\nGasometria arterial em ar ambiente:\npH: 7,26 · PaCO₂: 68 mmHg · HCO₃⁻: 30 mEq/L · PaO₂: 52 mmHg\n\nCom base nesses achados, assinale o distúrbio ácido-básico predominante e seu mecanismo compensatório.",
    alts: [
      "Acidose respiratória parcialmente compensada por retenção renal de bicarbonato.",
      "Alcalose respiratória parcialmente compensada por eliminação de bicarbonato.",
      "Acidose metabólica compensada por hiperventilação e eliminação de CO₂.",
      "Alcalose metabólica compensada por hipoventilação e retenção de CO₂.",
      "Acidose respiratória totalmente compensada por mecanismos renais imediatos.",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. Vamos ler a gasometria PASSO A PASSO — este é o método que resolve QUALQUER questão de gasometria:\n\n📌 PASSO 1 — Olhe o pH: 7,26. Normal é 7,35–7,45. Está BAIXO → é ACIDOSE.\n\n📌 PASSO 2 — Quem é o culpado? Olhe CO₂ e HCO₃:\n• PaCO₂: 68 (normal 35–45) → ALTO. CO₂ é ácido; alto = acidose. ✅ CULPADO!\n• HCO₃: 30 (normal 22–26) → ALTO. Bicarbonato é base; alto = alcalose. ❌ Não é o culpado.\n\n👉 Quem \"anda junto\" com o pH é o CULPADO. pH ácido + CO₂ alto (ácido) = mesma direção → ACIDOSE RESPIRATÓRIA.\n\n📌 PASSO 3 — Quem compensa? O HCO₃ está alto tentando puxar o pH de volta para cima. É o RIM retendo bicarbonato.\n\n📌 PASSO 4 — Compensação total ou parcial? O pH ainda está FORA da faixa (7,26) → PARCIALMENTE compensada. Se o pH tivesse voltado para 7,35–7,45, seria totalmente compensada.\n\n✅ RESPOSTA: acidose respiratória parcialmente compensada por retenção renal de bicarbonato.\n\n💡 A CLÍNICA CONFIRMA: DPOC + FR de 10 (hipoventilando!) + sonolência = retenção de CO₂. O CO₂ alto é NARCÓTICO — causa a sonolência e a confusão (carbonarcose).\n\n💡 BIZU DA COMPENSAÇÃO: pulmão compensa RÁPIDO (minutos), rim compensa LENTO (dias). Por isso a alternativa E erra ao dizer \"mecanismos renais IMEDIATOS\" — o rim nunca é imediato.\n\n💡 REGRA: CO₂ = pulmão (respiratório) · HCO₃ = rim (metabólico).",
  },
  {
    id: "fgv25-66", eixo: "seg", sub: "Controle de infecção hospitalar",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante a assistência a um paciente adulto em ventilação mecânica invasiva por insuficiência respiratória aguda, a equipe de Enfermagem deve adotar cuidados para prevenir complicações e promover segurança do paciente. Nesse sentido, assinale a conduta correta.",
    alts: [
      "Manter o paciente em decúbito dorsal plano para otimizar o retorno venoso e evitar instabilidade hemodinâmica.",
      "Realizar aspiração traqueal rotineiramente em horários fixos, independentemente da necessidade clínica observada.",
      "Garantir pressão do cuff entre 50 e 60 cmH₂O, para evitar escape de ar e reduzir o risco de pneumonia associada à ventilação.",
      "Elevar a cabeceira do leito entre 30° e 45°, realizar higiene oral com antisséptico e manter sistema fechado de aspiração.",
      "Suspender a higiene oral durante períodos de instabilidade respiratória, para evitar aumento do esforço ventilatório e risco de dessaturação.",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. A alternativa reúne os TRÊS pilares do BUNDLE DE PREVENÇÃO DA PAV (Pneumonia Associada à Ventilação):\n\n📌 CABECEIRA 30–45° → impede o refluxo gástrico e a microaspiração de conteúdo para as vias aéreas. É a medida mais simples e mais eficaz.\n📌 HIGIENE ORAL com antisséptico (clorexidina) → reduz a carga bacteriana da orofaringe, que é justamente o reservatório que coloniza o pulmão.\n📌 SISTEMA FECHADO de aspiração → evita a desconexão do circuito e a contaminação.\n\n💡 O BUNDLE COMPLETO da PAV inclui ainda: avaliação diária de extubação (despertar diário), pressão de cuff adequada, higiene das mãos e evitar troca desnecessária de circuito.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• A → decúbito PLANO é o oposto do recomendado. Favorece a broncoaspiração.\n• B → aspiração de ROTINA em horário fixo NÃO se faz. Aspira-se por NECESSIDADE (secreção visível, roncos, queda de saturação, aumento da pressão de pico). Aspirar sem precisar lesa a mucosa, causa hipoxemia e arritmia.\n• C → 50–60 cmH₂O é MUITO ALTO! A pressão do cuff correta é 20 a 30 cmH₂O (ou 25–35 conforme referência). Acima disso, comprime a mucosa traqueal e causa ISQUEMIA e necrose.\n• E → suspender higiene oral é o contrário do bundle.\n\n💡 BIZU DO CUFF: 20–30 cmH₂O. Baixo demais = microaspiração (PAV). Alto demais = isquemia de traqueia. É um equilíbrio.",
  },
  {
    id: "fgv25-67", eixo: "sistemas", sub: "Sistema nervoso",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Durante o atendimento de um paciente masculino, 45 anos, vítima de acidente de trânsito com trauma craniano fechado, foram verificadas:\n• abertura ocular: abre apenas ao estímulo doloroso;\n• resposta verbal: sons incompreensíveis;\n• resposta motora: retira o membro ao estímulo doloroso;\n• reatividade pupilar: uma pupila não reage à luz.\n\nCom base nos parâmetros da Escala de Coma de Glasgow com Resposta Pupilar (ECG-P), as respostas apresentadas na avaliação correspondem à seguinte pontuação:",
    alts: ["6 pontos.", "7 pontos.", "8 pontos.", "9 pontos.", "10 pontos."],
    correta: 1,
    coment: "Gabarito oficial: B (7 pontos). Esta questão cobra a versão ATUALIZADA da escala — vamos calcular:\n\n📌 PASSO 1 — Glasgow tradicional:\n• Abertura ocular ao estímulo DOLOROSO = 2\n• Resposta verbal: sons INCOMPREENSÍVEIS = 2\n• Resposta motora: RETIRADA à dor = 4\n👉 Total = 2 + 2 + 4 = 8 pontos\n\n📌 PASSO 2 — Aplicar a REATIVIDADE PUPILAR (ECG-P):\nA escala de Glasgow com Resposta Pupilar SUBTRAI pontos conforme as pupilas:\n• Ambas as pupilas REAGEM → subtrai 0\n• UMA pupila não reage → subtrai 1\n• NENHUMA pupila reage → subtrai 2\n\n👉 Uma pupila não reage = 8 − 1 = 7 PONTOS ✅\n\n💡 POR QUE ESSA ESCALA EXISTE: o Glasgow tradicional vai de 3 a 15, mas não capturava a gravidade do paciente com lesão de tronco. Com a resposta pupilar, o escore vai de 1 a 15 — permite diferenciar melhor os casos mais graves.\n\n⚠️ ATENÇÃO: se a questão pedir só \"Escala de Coma de Glasgow\", a resposta seria 8. Ao dizer \"ECG-P\" ou \"com Resposta Pupilar\", ela cobra a subtração. LEIA O NOME DA ESCALA.\n\n💡 REVISÃO DOS PARÂMETROS:\n• OCULAR (1–4): 4 espontânea · 3 ao chamado · 2 à dor · 1 ausente\n• VERBAL (1–5): 5 orientado · 4 confuso · 3 palavras inapropriadas · 2 sons incompreensíveis · 1 ausente\n• MOTORA (1–6): 6 obedece · 5 localiza · 4 retirada · 3 flexão anormal · 2 extensão · 1 ausente\n\n💡 Glasgow ≤ 8 = coma → considerar via aérea definitiva.",
  },

  // ─────────── ADMINISTRAÇÃO ───────────
  {
    id: "fgv25-68", eixo: "admin", sub: "Dimensionamento de pessoal",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Um Centro de Atenção Psicossocial (CAPS II) funciona 8 horas por dia, atendendo, em média, 40 usuários por turno, com predominância de cuidados de média complexidade e atendimentos em grupo. De acordo com as recomendações do COFEN, assinale a opção que representa a quantidade adequada mínima de profissionais de Enfermagem por turno.",
    alts: [
      "1 enfermeiro e 1 técnico de Enfermagem.",
      "1 enfermeiro e 2 técnicos de Enfermagem.",
      "1 enfermeiro e 3 técnicos de Enfermagem.",
      "2 enfermeiros e 2 técnicos de Enfermagem.",
      "2 enfermeiros e 3 técnicos de Enfermagem.",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. Para o CAPS II, a referência do COFEN é de 1 enfermeiro e 2 técnicos de enfermagem por turno.\n\n💡 A LÓGICA DOS CAPS — o que define o porte é POPULAÇÃO:\n• CAPS I → municípios acima de 15 mil habitantes\n• CAPS II → acima de 70 mil · funciona em horário comercial\n• CAPS III → acima de 150 mil · funciona 24 HORAS, com acolhimento noturno (até 5 leitos)\n• CAPS i → infantojuvenil · acima de 70 mil\n• CAPS AD → álcool e drogas · acima de 70 mil\n• CAPS AD III → 24 horas · acima de 150 mil\n\n💡 A pista do enunciado: \"8 horas por dia\" e \"média complexidade\" confirmam o CAPS II (o III seria 24h). Quanto maior a complexidade e o funcionamento, maior a equipe.\n\n⚠️ ATENÇÃO — CONTEXTO IMPORTANTE: o COFEN REVOGOU a Resolução 543/2017 (que trazia os parâmetros de dimensionamento) por meio da Resolução 743/2024, após decisão judicial. Hoje orienta o PARECER NORMATIVO Nº 1/2024. Os parâmetros seguem como REFERÊNCIA TÉCNICA de planejamento, mas não como obrigação imposta às instituições.\n\n💡 REGRA PARA A PROVA: se a questão citar a 543/2017, responda por ela. Se disser \"norma vigente\", lembre que a 543 está revogada.",
  },

  // ─────────── URGÊNCIA ───────────
  {
    id: "fgv25-69", eixo: "urg", sub: "Suporte básico de vida",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante o atendimento de um homem de 60 anos, encontrado inconsciente e sem pulso em ambiente hospitalar, a equipe inicia o protocolo de ressuscitação. Após 2 minutos de RCP, o monitor mostra assistolia persistente. Com base nas Diretrizes de Ressuscitação Cardiopulmonar, a conduta recomendada é",
    alts: [
      "interromper a RCP por 10 segundos para checar o ritmo, realizar desfibrilação e administrar 300 mg de amiodarona EV.",
      "suspender a RCP e iniciar ventilação isolada com ambu, pois a assistolia não responde à compressão torácica.",
      "continuar a RCP por mais 2 minutos, administrar 1 mg de epinefrina a cada 3–5 minutos e reavaliar o ritmo após o ciclo.",
      "aplicar desfibrilação imediata e iniciar amiodarona EV, pois a ausência de pulso indica ritmo chocável.",
      "realizar pausa prolongada para verificar pulso e respiração, iniciando RCP apenas após nova confirmação da parada.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. ASSISTOLIA é ritmo NÃO CHOCÁVEL. A conduta é: RCP de alta qualidade + EPINEFRINA (adrenalina) 1 mg a cada 3–5 minutos + buscar causas reversíveis, reavaliando o ritmo a cada 2 minutos.\n\n⚠️ A PEGADINHA MAIS FAMOSA DA URGÊNCIA — e ela aparece DUAS VEZES aqui (alternativas A e D): CHOCAR ASSISTOLIA. Não se choca! Desfibrilar exige atividade elétrica caótica para ser \"reorganizada\" — na assistolia NÃO HÁ atividade elétrica nenhuma. Não há o que reorganizar. Chocar linha reta não faz nada além de atrasar a RCP.\n\n💡 OS 4 RITMOS DE PCR:\n📌 CHOCÁVEIS: FV (fibrilação ventricular) e TVSP (taquicardia ventricular sem pulso) → DESFIBRILA\n📌 NÃO CHOCÁVEIS: AESP (atividade elétrica sem pulso) e ASSISTOLIA → RCP + ADRENALINA\n\n💡 NOS NÃO CHOCÁVEIS, a adrenalina é PRECOCE — o mais rápido possível. Nos chocáveis, ela vem após o 2º choque.\n\n💡 AMIODARONA (300 mg) é só para FV/TVSP REFRATÁRIA — nunca na assistolia.\n\n💡 PROTOCOLO DA LINHA RETA (CAGADA / CAGADA): antes de confirmar assistolia, checar Cabos, Ganho e Derivação — para não tratar como assistolia uma FV fina mal captada.\n\n⚠️ A alternativa B é gravíssima: \"suspender a RCP\" em uma parada. Nunca.",
  },
  {
    id: "fgv25-70", eixo: "urg", sub: "Urgência e emergência",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Um agricultor de 40 anos foi conduzido à Unidade de Pronto Atendimento, com quadro de salivação intensa, sudorese, miose acentuada, bradicardia e dificuldade respiratória, após aplicar inseticida em sua plantação sem o uso adequado de EPIs. O quadro clínico é compatível com intoxicação por organofosforados. Nesse caso, o antídoto adequado é",
    alts: ["naloxona.", "atropina.", "flumazenil.", "hidroxocobalamina.", "bicarbonato de sódio."],
    correta: 1,
    coment: "Gabarito oficial: B (ATROPINA).\n\n💡 A LÓGICA FARMACOLÓGICA — entenda e nunca mais erre:\nOs ORGANOFOSFORADOS inibem a enzima ACETILCOLINESTERASE. Sem ela, a acetilcolina se ACUMULA nas sinapses → estimulação COLINÉRGICA (parassimpática) excessiva. A ATROPINA é ANTICOLINÉRGICA — ela BLOQUEIA os receptores muscarínicos e reverte o quadro. Veneno colinérgico → antídoto anticolinérgico. É pura oposição.\n\n💡 A SÍNDROME COLINÉRGICA — mnemônico SLUDGE + BBB:\nS – Salivação\nL – Lacrimejamento\nU – Urinação (incontinência)\nD – Diarreia\nG – Gastrointestinal (cólicas, vômitos)\nE – Emese\n+ BBB: Broncorreia · Broncoespasmo · Bradicardia\n+ MIOSE (pupila puntiforme) — o sinal mais característico!\n\n📌 O enunciado entrega tudo: salivação, sudorese, MIOSE, bradicardia, dificuldade respiratória (broncorreia). Fechado.\n\n💡 A COLINHA DOS ANTÍDOTOS — decore essa tabela, cai sempre:\n• Organofosforado/carbamato → ATROPINA (+ pralidoxima)\n• Opioide (morfina, heroína) → NALOXONA\n• Benzodiazepínico (diazepam) → FLUMAZENIL\n• Cianeto → HIDROXOCOBALAMINA\n• Paracetamol → N-acetilcisteína\n• Heparina → protamina\n• Varfarina → vitamina K\n• Metanol/etilenoglicol → etanol/fomepizol\n• Antidepressivo tricíclico → bicarbonato de sódio\n\n💡 BIZU: MIOSE + agricultor + inseticida = organofosforado = ATROPINA.",
  },
  {
    id: "fgv25-71", eixo: "admin", sub: "Avaliação de desempenho",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "facil",
    enunciado: "Durante o processo anual de avaliação de desempenho de um coordenador, a organização aplicou o seguinte procedimento: o avaliado respondeu um formulário de autoavaliação; o gestor direto aplicou uma escala por competências; três colegas do mesmo nível e dois subordinados preencheram formulários padronizados; e o resultado consolidado foi devolvido ao avaliado em feedback individual, com plano de desenvolvimento. A descrição apresentada corresponde à seguinte ferramenta de avaliação",
    alts: ["matriz 9 box.", "avaliação 90°.", "avaliação 180°.", "avaliação 360°.", "avaliação por competência."],
    correta: 3,
    coment: "Gabarito oficial: D. AVALIAÇÃO 360° — porque o avaliado é olhado de TODAS as direções.\n\n💡 A LÓGICA DOS GRAUS — pense num círculo em volta do avaliado:\n📌 90° → só o CHEFE avalia (uma direção)\n📌 180° → chefe + AUTOAVALIAÇÃO (duas direções)\n📌 360° → chefe + autoavaliação + PARES + SUBORDINADOS (o círculo completo)\n📌 720° → o 360° feito DUAS vezes, com plano de ação entre elas\n\n📌 CONTANDO NO ENUNCIADO:\n✅ autoavaliação (o próprio)\n✅ gestor direto (de cima)\n✅ três colegas do mesmo nível (pares — dos lados)\n✅ dois subordinados (de baixo)\n👉 Círculo fechado = 360°\n\n💡 A DICA INFALÍVEL: procure a palavra SUBORDINADOS. Se quem está ABAIXO avalia quem está ACIMA, é 360°. Nenhuma outra modalidade inclui essa \"avaliação de baixo para cima\".\n\n⚠️ A MATRIZ 9 BOX (A) é outra coisa: cruza DESEMPENHO × POTENCIAL numa grade 3×3, para mapear talentos e sucessão. Não é fonte de avaliação, é ferramenta de posicionamento.\n\n💡 O enunciado ainda descreve a boa prática: feedback individual + plano de desenvolvimento. Avaliação sem devolutiva não desenvolve ninguém.",
  },
  {
    id: "fgv25-72", eixo: "admin", sub: "Gestão da qualidade e indicadores",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Uma unidade de saúde decidiu realizar uma auditoria interna para verificar a conformidade dos processos assistenciais. O trabalho foi realizado in loco, durante o atendimento, com foco em alguns aspectos específicos. Essa forma de auditoria é denominada",
    alts: ["analítica.", "preventiva.", "concorrente.", "prospectiva.", "retrospectiva."],
    correta: 2,
    coment: "Gabarito oficial: C (CONCORRENTE).\n\n💡 A CLASSIFICAÇÃO DA AUDITORIA PELO MOMENTO — é só uma linha do tempo:\n📌 PROSPECTIVA (ou prévia) → ANTES do atendimento. Analisa a autorização, a pertinência do procedimento.\n📌 CONCORRENTE (ou operativa) → DURANTE o atendimento, IN LOCO. O auditor está lá, no momento em que o cuidado acontece.\n📌 RETROSPECTIVA (ou analítica) → DEPOIS. Analisa prontuários e contas de pacientes já atendidos.\n\n📌 O enunciado crava dois marcadores: \"IN LOCO\" e \"DURANTE o atendimento\" = CONCORRENTE.\n\n💡 A ETIMOLOGIA AJUDA: \"CONCORRENTE\" vem de \"concorrer\" = correr JUNTO. A auditoria corre junto com o atendimento, ao mesmo tempo.\n\n💡 VANTAGEM DA CONCORRENTE: permite CORRIGIR o problema na hora, enquanto o paciente ainda está internado — a retrospectiva só constata o erro depois que já aconteceu.\n\n⚠️ A alternativa A (\"analítica\") é sinônimo de retrospectiva em várias referências — é a armadilha para quem não leu \"in loco\".\n\n💡 Quanto ao CAMPO: auditoria pode ser INTERNA (feita pela própria instituição, como no enunciado) ou EXTERNA (por auditores de fora, ex.: operadora, SUS).",
  },
  {
    id: "fgv25-73", eixo: "seg", sub: "Limpeza, desinfecção e esterilização",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Com base nas disposições quanto ao gerenciamento de resíduos de serviços de saúde – RSS, analise as afirmativas a seguir e assinale V para a verdadeira e F para a falsa.\n\n( ) Os resíduos perfurocortantes são considerados categoria A, pois apresentam risco biológico, podendo causar perfuração ou contaminação.\n( ) A identificação dos sacos para acondicionamento dos RSS do grupo D deve estar impressa, sendo vedado o uso de adesivo.\n( ) Os RSS, gerados pelos serviços de atenção domiciliar, devem ser acondicionados e recolhidos pelos próprios agentes de atendimento, além de encaminhados à destinação final ambientalmente adequada.\n\nAs afirmativas são, respectivamente,",
    alts: ["F – V – V.", "V – F – F.", "F – F – V.", "V – V – V.", "F – V – F."],
    correta: 0,
    coment: "Gabarito oficial: A (F – V – V).\n\n📌 1ª FALSA — a pegadinha campeã dos resíduos: PERFUROCORTANTE é GRUPO E, não A!\n\n💡 A LÓGICA DOS GRUPOS (RDC ANVISA 222/2018) — cada letra é um TIPO DE RISCO:\n• A → risco BIOLÓGICO (saco branco leitoso, símbolo de infectante)\n• B → risco QUÍMICO (medicamentos, reagentes)\n• C → risco RADIOLÓGICO (rejeitos radioativos)\n• D → SEM risco (comum, equipara-se ao lixo doméstico)\n• E → PERFUROCORTANTE (caixa RÍGIDA)\n\n👉 Por que a agulha é E e não A, mesmo com sangue? Porque o que a define é o PERIGO PREDOMINANTE: ela FURA — e é furando que transmite. Um saco com sangue não fura ninguém; a agulha, sim. Classifica-se pelo risco que precisa ser contido PRIMEIRO.\n\n📌 2ª VERDADEIRA: a identificação do grupo D deve ser IMPRESSA no saco, sendo vedado o uso de adesivo (que descola, borra, cai).\n\n📌 3ª VERDADEIRA: na atenção domiciliar, os próprios agentes recolhem os RSS e encaminham à destinação adequada — não se deixa resíduo de saúde na casa do paciente.\n\n💡 BIZU DA CAIXA DE PERFUROCORTANTE: rígida, preenchida até o LIMITE do fabricante (nunca até a borda!), NUNCA reencapar agulha, e a caixa fica próxima ao local de uso.\n\n⚠️ A RDC 222/2018 REVOGOU a antiga RDC 306/2004 — material que cita a 306 está velho.",
  },
  {
    id: "fgv25-74", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "facil",
    enunciado: "Uma pesquisadora deseja investigar se a prática regular de atividade física está associada à redução dos níveis de estresse em estudantes universitários. Para garantir clareza metodológica, ela precisa definir adequadamente as variáveis do estudo. Nesse caso, é correto afirmar que",
    alts: [
      "nenhuma das variáveis deve ser definida antes da coleta, para não interferir nos resultados.",
      "o nível de estresse é uma variável independente, e a prática de atividade física é a variável dependente.",
      "ambas as variáveis são dependentes, pois podem variar conforme o humor dos participantes.",
      "as duas variáveis são independentes, já que uma não influencia a outra diretamente.",
      "a prática regular de atividade física é uma variável independente, e o nível de estresse é a variável dependente.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. A variável INDEPENDENTE é a CAUSA (o que se manipula/investiga); a DEPENDENTE é o EFEITO (o que se mede, que \"depende\" da outra).\n\n📌 No enunciado: a atividade física é o que se investiga como CAUSA → INDEPENDENTE. O nível de estresse é o RESULTADO que se mede → DEPENDENTE.\n\n💡 O TRUQUE INFALÍVEL — monte a frase: \"O nível de estresse DEPENDE da atividade física\". Quem vem depois de \"depende de\" é a INDEPENDENTE; quem vem antes é a DEPENDENTE. Nunca mais erre.\n\n💡 OUTRO JEITO DE VER: procure a seta de causa no enunciado. \"Atividade física → reduz → estresse\". Quem está na ORIGEM da seta é independente; quem está na PONTA é dependente.\n\n⚠️ A alternativa B é o espelho invertido — a armadilha clássica. Sempre confira a direção da causalidade.\n\n💡 Há ainda a variável de CONFUSÃO (confundidora): uma terceira variável que afeta as duas e pode falsear a associação. No exemplo, o \"apoio social\" poderia ser: quem se exercita em grupo tem mais apoio, e o apoio é que reduziria o estresse.",
  },
  {
    id: "fgv25-75", eixo: "etica", sub: "Bioética",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Ao orientar uma família acerca da doação de órgão, o profissional de saúde explicou que, de acordo com a legislação brasileira vigente, a retirada de órgãos para fins de transplante só pode ocorrer após",
    alts: [
      "autorização verbal do familiar de primeiro grau do paciente.",
      "confirmação clínica do óbito por parada cardiorrespiratória.",
      "solicitação formal do médico responsável pelo atendimento.",
      "consentimento familiar por escrito e confirmação da morte encefálica.",
      "autorização judicial emitida por perito do tribunal competente.",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. São DOIS requisitos, e os dois são obrigatórios:\n📌 CONFIRMAÇÃO DA MORTE ENCEFÁLICA (diagnóstico segundo protocolo do CFM)\n📌 CONSENTIMENTO FAMILIAR POR ESCRITO (cônjuge ou parente até 2º grau, em documento assinado por duas testemunhas)\n\n💡 O PONTO QUE MUITA GENTE ERRA: no Brasil, a doação é CONSENTIDA — vale a decisão da FAMÍLIA, não a do falecido. Mesmo que a pessoa tenha declarado em vida que queria doar (ou tenha \"doador\" na carteira), se a família recusar, não se retira. É por isso que se orienta CONVERSAR COM A FAMÍLIA em vida.\n\n⚠️ Chegou a existir a doação PRESUMIDA no Brasil (Lei 9.434/1997 original), mas foi revogada — hoje é consentimento informado da família.\n\n💡 POR QUE NÃO A ALTERNATIVA B: morte por PCR não permite doação de órgãos sólidos (coração, fígado, rim) — sem circulação, os órgãos sofrem isquemia e inviabilizam. A doação de órgãos sólidos exige MORTE ENCEFÁLICA, em que o coração ainda bate e perfunde os órgãos. TECIDOS (córnea, pele, ossos) esses sim podem ser doados após parada cardíaca.\n\n💡 MORTE ENCEFÁLICA: dois exames clínicos por médicos diferentes (nenhum da equipe de transplante), teste de apneia e exame complementar comprobatório.",
  },
  {
    id: "fgv25-76", eixo: "seg", sub: "Limpeza, desinfecção e esterilização",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "O monitoramento é etapa essencial para garantir eficácia, qualidade e segurança do processo de esterilização de produtos para a saúde. Considerando as disposições normativas a esse respeito é correto afirmar que",
    alts: [
      "o monitoramento do processo de esterilização com indicador biológico deve ser feito diariamente, em todas as cargas, em pacote teste desafio.",
      "é possível substituir o uso rotineiro de indicadores biológicos por integradores químicos classe 5, já que ambos avaliam simultaneamente os parâmetros críticos do processo.",
      "o teste para avaliar o desempenho do sistema de remoção de ar (Bowie & Dick) da autoclave assistida por bomba de vácuo é recomendado apenas em situações de urgência e emergência.",
      "o monitoramento com integradores químicos classe 5 ou 6 só deve ser realizado em situações críticas, quando houver falhas nos testes rotineiros.",
      "no monitoramento do processo de esterilização dos produtos implantáveis para saúde, deve ser adicionado um indicador biológico, a cada carga.",
    ],
    correta: 4,
    coment: "Gabarito oficial: E. Produtos IMPLANTÁVEIS exigem indicador BIOLÓGICO em CADA CARGA — sem exceção.\n\n💡 POR QUE O IMPLANTÁVEL É DIFERENTE: uma prótese, um parafuso ortopédico, uma válvula — vai ficar DENTRO do corpo, permanentemente. Se estiver contaminado, a infecção é catastrófica e o tratamento exige nova cirurgia para remover. O risco é tão alto que se exige a prova máxima (biológico) a cada carga, e o ideal é aguardar o resultado antes de liberar.\n\n💡 OS TRÊS TIPOS DE INDICADOR — e o que cada um PROVA:\n📌 FÍSICO → registra tempo, temperatura, pressão. Diz que a MÁQUINA registrou os parâmetros.\n📌 QUÍMICO → muda de cor. Diz que o pacote FOI EXPOSTO ao agente. A fita zebrada (classe 1) só diz \"passou pela autoclave\".\n📌 BIOLÓGICO → esporos de Geobacillus stearothermophilus. É o ÚNICO que responde à pergunta que importa: MORREU?\n\n👉 Por isso o biológico NÃO PODE ser substituído por integrador químico (alternativa B errada) — o químico não prova morte microbiana. Ele é o padrão-ouro.\n\n⚠️ TESTE DE BOWIE & DICK: avalia a REMOÇÃO DE AR da autoclave pré-vácuo e deve ser feito DIARIAMENTE, na PRIMEIRA carga do dia, com a câmara vazia — não \"em situações de urgência\" (alternativa C errada). Se sobra ar na câmara, o vapor não penetra e a esterilização falha.\n\n💡 Rotina do biológico: diária ou conforme protocolo — e SEMPRE em carga com implantável.",
  },
  {
    id: "fgv25-77", eixo: "seg", sub: "Segurança do paciente",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "facil",
    enunciado: "Durante a assistência a um paciente hospitalizado com suspeita de meningite meningocócica, o profissional de saúde deve adotar medidas de prevenção compatíveis com a forma de transmissão da doença, de modo a evitar a disseminação do agente infeccioso. Nessa situação, considerando a forma de transmissão, a precaução indicada é",
    alts: [
      "padrão, pois a transmissão ocorre apenas pelo contato com superfícies contaminadas, sem necessidade de máscara.",
      "contato, pois o agente etiológico é transmitido por meio do toque direto com secreções ou pele não íntegra do paciente.",
      "gotícula, pois o agente é transmitido por secreções respiratórias expelidas ao falar, tossir ou espirrar a curta distância.",
      "aerossol, pois o agente permanece suspenso no ar por longos períodos, exigindo isolamento com pressão negativa.",
      "reforçada, pois a doença requer a combinação obrigatória de precauções padrão, de contato e por aerossóis simultaneamente.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. Meningite MENINGOCÓCICA (Neisseria meningitidis) = precaução por GOTÍCULAS. Máscara CIRÚRGICA, quarto privativo ou coorte, distância de ~1 metro.\n\n💡 A FÍSICA EXPLICA TUDO — por que gotícula e não aerossol:\n📌 GOTÍCULA (> 5 micra) → partícula PESADA. Cai por gravidade em 1 a 2 metros. Você se protege com DISTÂNCIA + máscara cirúrgica. Quarto comum resolve.\n📌 AEROSSOL (≤ 5 micra) → partícula LEVE. Fica horas SUSPENSA no ar e viaja com a corrente — atravessa o quarto, sai pela porta. Distância não protege: precisa FILTRAR (N95/PFF2) e CONTROLAR O AR (pressão negativa).\n\n👉 Sabendo o TAMANHO, você deduz a precaução. Não precisa decorar lista.\n\n💡 A LISTA DOS AEROSSÓIS — mnemônico \"TÔ SABENDO VOAR\":\n• Tuberculose\n• SArampo\n• VARicela\n(+ COVID-19 em procedimentos geradores de aerossol)\n👉 Se voa longe e fica no ar, é aerossol e pede N95.\n\n💡 GOTÍCULAS: meningite, coqueluche, caxumba, rubéola, influenza, difteria.\n\n⚠️ DETALHE QUE CAI: a precaução para meningite meningocócica é mantida até 24 HORAS após o início do antibiótico eficaz — depois disso, o paciente não transmite mais.\n\n💡 E lembre: precaução ESPECÍFICA nunca substitui a PADRÃO — elas se SOMAM.",
  },
  {
    id: "fgv25-78", eixo: "urg", sub: "Suporte básico de vida",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante a abordagem de um paciente em parada cardiorrespiratória, o enfermeiro precisou utilizar um dispositivo extraglótico (DEG) do tipo supraglótico para manutenção da via aérea avançada. Um exemplo desse tipo de dispositivo é:",
    alts: [
      "tubo laríngeo.",
      "cânula faríngea.",
      "máscara laríngea.",
      "cateter orofaríngeo.",
      "tubo traqueo-esofágico.",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. A MÁSCARA LARÍNGEA é o exemplo clássico de dispositivo SUPRAGLÓTICO — ela se aloja ACIMA da glote (daí \"supra\"), vedando a entrada da laringe sem atravessar as cordas vocais.\n\n💡 A ANATOMIA EXPLICA O NOME: a GLOTE é a abertura entre as cordas vocais. \"SUPRAglótico\" = fica ACIMA dela. Por isso a inserção é ÀS CEGAS, rápida e NÃO exige laringoscópio — vantagem enorme numa PCR, porque não interrompe as compressões.\n\n💡 TIPOS DE VIA AÉREA:\n📌 BÁSICA (não avançada): cânula orofaríngea (GUEDEL) e nasofaríngea. Só desobstruem, não protegem contra aspiração.\n📌 EXTRAGLÓTICA/SUPRAGLÓTICA: máscara laríngea, tubo laríngeo, combitubo. Via aérea AVANÇADA, inserção às cegas.\n📌 DEFINITIVA: tubo endotraqueal com cuff insuflado NA TRAQUEIA. É o padrão-ouro — só ela protege plenamente contra broncoaspiração.\n\n⚠️ A pegadinha das alternativas B e D: cânula faríngea e cateter orofaríngeo são vias aéreas BÁSICAS, não avançadas.\n\n⚠️ O tubo laríngeo (A) e o tubo traqueo-esofágico/combitubo (E) também são extraglóticos — mas o exemplo mais consagrado e pedido é a MÁSCARA LARÍNGEA.\n\n💡 COM VIA AÉREA AVANÇADA na RCP: compressões CONTÍNUAS + 1 ventilação a cada 6 segundos (10/min), sem sincronizar. Sem via aérea avançada: 30:2.",
  },
  {
    id: "fgv25-79", eixo: "seg", sub: "Controle de infecção hospitalar",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "dificil",
    enunciado: "Após a realização de um procedimento cirúrgico, um paciente adulto foi diagnosticado com infecção de sítio cirúrgico incisional superficial. Entre os critérios que caracterizam esse tipo de infecção, está a",
    alts: [
      "presença de eritema, calor, dor local ao redor da incisão, ocorrendo até 30 dias após a cirurgia, com ou sem drenagem purulenta.",
      "inflamação envolvendo músculo ou fáscia, com abscesso profundo, ocorrendo em até 30 dias após a cirurgia.",
      "infecção limitada ao órgão ou espaço interno, sem envolvimento da incisão cirúrgica, ocorrendo até 90 dias após a cirurgia.",
      "presença de febre isolada, sem eritema, dor ou secreção na incisão, ocorrendo até 45 dias após a cirurgia.",
      "presença de febre, abcesso ou deiscência espontânea, ocorrendo até 20 dias após a cirurgia, com drenagem purulenta.",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. ISC INCISIONAL SUPERFICIAL: acomete apenas PELE e TECIDO SUBCUTÂNEO, ocorre em até 30 DIAS da cirurgia, com sinais flogísticos locais (eritema, calor, dor) — com ou sem drenagem purulenta.\n\n💡 A ANATOMIA ORGANIZA A CLASSIFICAÇÃO — é só descer camada por camada:\n📌 INCISIONAL SUPERFICIAL → pele + subcutâneo · até 30 dias\n📌 INCISIONAL PROFUNDA → fáscia + músculo · até 30 dias (ou 90 dias se houver IMPLANTE)\n📌 ÓRGÃO/CAVIDADE → qualquer parte manipulada que não a incisão · até 30 dias (ou 90 com implante)\n\n👉 A profundidade define o tipo; o tempo define a janela de vigilância.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• B → descreve a INCISIONAL PROFUNDA (músculo/fáscia).\n• C → descreve a de ÓRGÃO/CAVIDADE.\n• D → febre ISOLADA, sem sinal local, NÃO caracteriza ISC — e \"45 dias\" não existe na classificação.\n• E → \"20 dias\" não é critério; o prazo é 30.\n\n💡 O PRAZO DE 90 DIAS existe para cirurgias com IMPLANTE (prótese, tela, parafuso) — porque o material estranho permite que a infecção se manifeste tardiamente.\n\n💡 A ISC é o evento adverso cirúrgico mais comum e é indicador de qualidade assistencial. Prevenção: antibiótico profilático no tempo certo, tricotomia SÓ se necessária e com tricotomizador, normotermia, controle glicêmico e técnica asséptica.",
  },
  {
    id: "fgv25-80", eixo: "seg", sub: "Segurança do paciente",
    banca: "FGV", ano: 2025, orgao: "ALE-AM", nivel: "media",
    enunciado: "Durante um procedimento cirúrgico, o profissional responsável inicia a aplicação da Lista de Verificação de Segurança Cirúrgica (checklist de cirurgia segura). De acordo com o Protocolo de Cirurgia Segura do Ministério da Saúde, assinale a afirmativa que corresponde às ações que devem ser obrigatoriamente realizadas, antes da indução anestésica, na etapa denominada \"Sign In\".",
    alts: [
      "Realizar contagem de compressas e instrumentais e checar antibiótico profilático.",
      "Revisar o nome completo do paciente, o consentimento informado e o local da cirurgia.",
      "Validar o registro do horário de início da cirurgia e assegurar a presença de exames complementares.",
      "Confirmar o funcionamento do aspirador cirúrgico, a disponibilidade de drenos e o preparo dos campos estéreis.",
      "Realizar o registro da equipe no prontuário e validar a conferência do material.",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. O SIGN IN acontece ANTES DA INDUÇÃO ANESTÉSICA e confirma o essencial: IDENTIDADE do paciente, PROCEDIMENTO, LOCAL/SÍTIO cirúrgico e CONSENTIMENTO informado. Também: demarcação do sítio, checagem de alergias, via aérea difícil e risco de sangramento.\n\n💡 OS TRÊS MOMENTOS — decore pelos VERBOS:\n📌 SIGN IN → antes de ANESTESIAR (com o paciente ainda ACORDADO)\n📌 TIME OUT → antes de CORTAR (a pausa cirúrgica, toda a equipe para e confirma em voz alta)\n📌 SIGN OUT → antes de SAIR da sala (contagem de compressas e instrumentais, identificação de amostras)\n\n👉 \"Entra (in), para (out do tempo), sai (out)\".\n\n⚠️ POR QUE A ALTERNATIVA A ESTÁ ERRADA: contagem de compressas é do SIGN OUT (você conta o que sai, não o que entra). E o antibiótico profilático é confirmado no TIME OUT.\n\n💡 A RAZÃO PROFUNDA DO SIGN IN SER COM O PACIENTE ACORDADO: a demarcação do sítio cirúrgico precisa da PARTICIPAÇÃO do paciente — de nada adianta confirmar \"perna direita\" com alguém já sedado. Ele é a última barreira contra a cirurgia no lado errado.\n\n💡 O TIME OUT é a etapa mais poderosa: cirurgia em lado errado não acontece por incompetência — acontece por HIERARQUIA e PRESSA. O time out institucionaliza a pausa e dá a qualquer membro da equipe permissão formal para dizer \"espera\". Por isso todos se apresentam pelo nome: quem tem nome, fala.\n\n💡 Cirurgia Segura = META 4 das metas internacionais de segurança do paciente (PNSP, Portaria 529/2013).",
  },

// ─────────── SEMIOLOGIA E SAE ───────────
  {
    id: "sel24-31", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "A Sistematização da Assistência de Enfermagem (SAE) é regulamentada por normativas que orientam a atuação do profissional enfermeiro no planejamento e na execução do cuidado. Considerando os fundamentos legais da SAE e a prática assistencial segura, o principal documento que sustenta legalmente essa prática, bem como suas implicações ético-profissionais, é:",
    alts: [
      "Lei nº 7.498/1986, que regulamenta o exercício da enfermagem, enfatizando que o planejamento e a implementação da assistência são de responsabilidade exclusiva do técnico de enfermagem, liberando o enfermeiro para atividades administrativas",
      "Resolução Cofen nº 358/2009, que define a SAE como obrigatória em instituições públicas e privadas e orienta que o Processo de Enfermagem deve privilegiar a autonomia do enfermeiro no diagnóstico e no planejamento do cuidado",
      "Código de Ética dos Profissionais de Enfermagem, que solicita a implementação da SAE como responsabilidade moral dos enfermeiros, porém não impõe nenhuma exigência ou regulamentação sobre os aspectos técnicos da assistência",
      "Resolução Cofen nº 564/2017, que detalha os princípios éticos da profissão e regula diretamente a atuação da equipe de enfermagem no gerenciamento de conflitos no ambiente hospitalar sem priorizar a SAE",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. A Resolução COFEN 358/2009 era, à época da prova, a norma que regulamentava a SAE e o Processo de Enfermagem, tornando-o obrigatório em toda instituição de saúde, pública ou privada. A alternativa A inverte tudo (planejamento é privativo do ENFERMEIRO, não do técnico); a C erra ao dizer que o Código de Ética não impõe exigência técnica; a D confunde a 564/2017 (Código de Ética) com a norma da SAE.\n\n⚠️ ATENÇÃO — ATUALIZAÇÃO: a Resolução COFEN nº 736/2024 REVOGOU a 358/2009. Hoje o termo \"SAE\" foi retirado e a norma fala em Processo de Enfermagem, cuja 1ª etapa passou a chamar-se \"Avaliação de Enfermagem\" (antiga coleta de dados). Esta prova é de 2024 e ainda cobrava a 358. REGRA DE OURO: se a questão CITA a resolução, responda pela citada; se disser \"norma vigente\", é a 736/2024.",
  },
  {
    id: "sel24-34", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "facil",
    enunciado: "Refletir sobre o processo de enfermagem exige compreender de que maneira as etapas se conectam para fornecer um cuidado sistemático e planejado. Há uma etapa desse processo que é responsável por indicar as intervenções a serem realizadas frente aos diagnósticos estabelecidos. Estamos falando da(do):",
    alts: ["coleta de dados", "planejamento", "implementação", "avaliação"],
    correta: 1,
    coment: "Gabarito oficial: B. O PLANEJAMENTO é a etapa que determina os resultados esperados e as ações/intervenções a serem realizadas para alcançá-los, a partir dos diagnósticos já estabelecidos. Cuidado para não confundir com a IMPLEMENTAÇÃO, que é a EXECUÇÃO dessas ações — o planejamento DEFINE, a implementação FAZ.\n\n💡 BIZU: guarde a lógica do encadeamento — a etapa que vem logo DEPOIS do diagnóstico é a que decide o que fazer com ele. Diagnosticou o problema → planeja a solução → implementa → avalia.",
  },
  {
    id: "sel24-35", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "O processo de enfermagem, enquanto instrumento norteador da prática assistencial, organiza-se em cinco etapas interdependentes que garantem a integralidade do cuidado prestado ao indivíduo. Sobre esse instrumento, pode-se afirmar corretamente que:",
    alts: [
      "a etapa de planejamento consiste na identificação dos problemas de saúde baseados nos dados coletados",
      "o diagnóstico de enfermagem é dispensável quando se conhece previamente o histórico do paciente",
      "a avaliação finaliza o processo sem necessidade de revisão das intervenções já executadas",
      "a coleta de dados permite reunir informações objetivas e subjetivas que subsidiam as etapas seguintes",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. A coleta de dados (hoje \"Avaliação de Enfermagem\", pela Res. 736/2024) reúne dados SUBJETIVOS (entrevista — o que o paciente relata) e OBJETIVOS (exame físico — o que você constata), servindo de base para todas as etapas seguintes. A alternativa A descreve o DIAGNÓSTICO, não o planejamento; a B é absurda (diagnóstico nunca é dispensável); a C erra porque o processo é CÍCLICO — a avaliação realimenta e pode exigir revisão.\n\n⚠️ PEGADINHA CLÁSSICA: dizer que a avaliação \"finaliza o processo\". Não finaliza — o Processo de Enfermagem é cíclico, recorrente e contínuo. Alternativa que trata as etapas como lineares e definitivas está errada.",
  },
  {
    id: "sel24-41", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "facil",
    enunciado: "O processo de enfermagem é uma metodologia científica que orienta o cuidado de enfermagem. A representação correta da sequência das etapas do processo de enfermagem consiste em:",
    alts: [
      "avaliação, diagnóstico, planejamento, implementação, coleta de dados",
      "coleta de dados, diagnóstico, planejamento, implementação, avaliação",
      "planejamento, coleta de dados, diagnóstico, implementação, avaliação",
      "diagnóstico, coleta de dados, planejamento, implementação, avaliação",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. A ordem é: coleta de dados → diagnóstico → planejamento → implementação → avaliação. A banca embaralha justamente porque muita gente decora as cinco palavras sem entender a lógica: você só diagnostica DEPOIS de coletar, só planeja DEPOIS de diagnosticar.\n\n💡 BIZU: \"Coletei, Diagnostiquei, Planejei, Implementei, Avaliei\".\n\n⚠️ ATUALIZAÇÃO (Res. COFEN 736/2024): hoje a 1ª etapa chama-se AVALIAÇÃO DE ENFERMAGEM e a última, AVALIAÇÃO DE RESULTADOS — ou seja, a avaliação abre E fecha o ciclo. O novo mnemônico: \"Avaliei, Diagnostiquei, Planejei, Implementei, Avaliei o resultado\". Repare que a alternativa A desta prova ficaria parecida com a redação nova — mas em 2024 o gabarito seguia a 358/2009.",
  },
  {
    id: "sel24-47", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "A Sistematização da Assistência de Enfermagem (SAE) é regulamentada pela Resolução COFEN nº 358/2009 e considera um processo dinâmico em etapas interconectadas, que visam à organização coerente da prática de enfermagem. Sobre a aplicação da SAE, é correto afirmar que:",
    alts: [
      "a SAE é aplicada exclusivamente a pacientes hospitalizados, dado que a complexidade do processo impede sua utilização em serviços de atenção primária ou domiciliar",
      "a SAE tem como finalidade estabelecer a autonomia do enfermeiro em sua prática assistencial, excluindo profissionais de nível técnico ou auxiliar de sua implementação",
      "a SAE compreende cinco etapas distintas: coleta de dados, diagnóstico de enfermagem, planejamento, implementação e avaliação, sendo o diagnóstico uma etapa privativa do enfermeiro",
      "o planejamento da assistência dentro da SAE deve restringir-se unicamente a cuidados prescritos, não incluindo ações educativas ou de prevenção realizadas pelo enfermeiro",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. Traz as cinco etapas na ordem correta e acerta o ponto de ouro: o DIAGNÓSTICO DE ENFERMAGEM é PRIVATIVO DO ENFERMEIRO. A alternativa A erra ao restringir ao hospital (a SAE se aplica em TODO local onde ocorre o cuidado); a B erra ao excluir técnicos e auxiliares da implementação (eles participam, conforme sua competência); a D erra ao excluir ações educativas e preventivas.\n\n💡 BIZU: duas etapas são privativas do enfermeiro — DIAGNÓSTICO e PRESCRIÇÃO/planejamento. Sempre que a alternativa der o diagnóstico ao técnico, está errada.\n\n⚠️ Lembre: hoje vale a Res. 736/2024, que retirou o termo SAE. Mas como a questão CITA a 358/2009, responde-se pela redação dela.",
  },
  {
    id: "sel24-48", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "Ao trabalhar com a Sistematização da Assistência de Enfermagem (SAE), o enfermeiro tem uma série de responsabilidades e competências específicas. Uma premissa da SAE está representada em:",
    alts: [
      "a SAE é exclusiva para os enfermeiros, enquanto os técnicos e auxiliares de enfermagem têm um papel restrito à coleta de dados e execução de tarefas operacionais",
      "a SAE é um processo linear cujo principal foco está na resolução imediata do problema do paciente, sem a necessidade de avaliações regulares após a implementação inicial do plano de cuidado",
      "a aplicação da SAE no ambiente hospitalar é obrigatória por lei e contribui para a melhoria da qualidade do cuidado, unificando o raciocínio clínico e garantindo continuidade nas ações de enfermagem",
      "a Resolução COFEN nº 358/2009 permite que o enfermeiro formule o diagnóstico de enfermagem usando apenas critérios subjetivos, desde que validados diretamente com o paciente",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. A SAE é obrigatória e sua finalidade é justamente qualificar o cuidado, unificar o raciocínio clínico e dar continuidade à assistência. A alternativa A erra ao restringir demais o papel do técnico; a B erra em dois pontos (o processo NÃO é linear e a reavaliação é obrigatória); a D erra porque o diagnóstico exige dados objetivos E subjetivos — nunca só subjetivos.\n\n⚠️ PEGADINHA: \"processo linear\" e \"sem necessidade de reavaliação\" são marcadores de alternativa errada. O Processo de Enfermagem é CÍCLICO e RECORRENTE (redação literal da Res. 736/2024).",
  },

  // ─────────── BIOÉTICA E LEGISLAÇÃO ───────────
  {
    id: "sel24-45", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "De acordo com a Lei do Exercício Profissional da Enfermagem (Lei nº 7.498/1986) e a regulamentação do Decreto nº 94.406/1987, algumas atividades são privativas do enfermeiro. Dentre as alternativas abaixo, o exemplo de uma atividade privativa corretamente identificada é:",
    alts: [
      "a administração de medicamentos por vias de acesso periféricas em pacientes críticos internados em unidades de terapia intensiva (UTI)",
      "o ensino, a orientação e a supervisão de profissionais auxiliares e técnicos de enfermagem em instituições de saúde públicas ou privadas",
      "a realização de banho no leito em pacientes com mobilidade restrita em ambiente hospitalar",
      "o preparo e a administração de dietas enterais sob supervisão de um nutricionista em serviços ambulatoriais",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. O ensino, a orientação e a SUPERVISÃO do pessoal auxiliar e técnico são privativos do enfermeiro (art. 11, Lei 7.498/86) — afinal, quem supervisiona precisa ter competência superior à de quem é supervisionado. As alternativas A, C e D descrevem atividades que a equipe de enfermagem (técnicos/auxiliares) executa sob supervisão.\n\n💡 BIZU: o critério que unifica as privativas é MAIOR COMPLEXIDADE + DECISÃO. Direção/chefia, consulta de enfermagem, prescrição da assistência, cuidado a paciente grave com risco de vida e SUPERVISÃO da equipe = enfermeiro. Leia sempre o SUJEITO da frase antes do verbo.",
  },

  // ─────────── SEGURANÇA DO PACIENTE E BIOSSEGURANÇA ───────────
  {
    id: "sel24-32", eixo: "seg", sub: "Controle de infecção hospitalar",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "Em um hospital de alta complexidade, a profilaxia de infecções do sítio cirúrgico demanda adesão irrestrita a protocolos bem definidos. Das seguintes medidas profiláticas, a que se configura como a mais proeminente para a redução da incidência dessas infecções está na alternativa:",
    alts: [
      "administração seletiva de antibióticos de amplo espectro no pré-operatório imediato",
      "tricotomia capilar com lâmina de barbear em todas as áreas a serem incisadas",
      "antissepsia das mãos da equipe cirúrgica, com técnica padronizada e solução alcoólica",
      "utilização de vestimentas cirúrgicas reutilizáveis, previamente esterilizadas em autoclave",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. A antissepsia cirúrgica das mãos com técnica padronizada e solução alcoólica é a medida isolada mais eficaz na prevenção de infecção de sítio cirúrgico. A alternativa B é um erro grave e frequente: tricotomia COM LÂMINA é contraindicada — produz microlesões que viram porta de entrada. Quando necessária, usa-se TRICOTOMIZADOR ELÉTRICO, o mais próximo possível da cirurgia.\n\n⚠️ PEGADINHA CLÁSSICA: \"tricotomia com lâmina na véspera\" está DUPLAMENTE errada — lâmina não, véspera não. O ideal é NÃO tricotomizar, salvo se o pelo atrapalhar o procedimento.",
  },
  {
    id: "sel24-33", eixo: "seg", sub: "Controle de infecção hospitalar",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "facil",
    enunciado: "A resistência bacteriana aos antimicrobianos representa um grave problema de saúde pública. Das seguintes estratégias, a que se mostra mais relevante para o uso racional de antibióticos em ambientes hospitalares é:",
    alts: [
      "prescrição de antibióticos de amplo espectro em todas as infecções suspeitas",
      "utilização de antibióticos de última geração em todas as infecções",
      "realização de culturas e testes de sensibilidade aos antibióticos antes do início da terapia",
      "administração profilática de antibióticos em todos os pacientes internados",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. Cultura + antibiograma ANTES de iniciar a terapia permite o descalonamento — trocar o amplo espectro pelo antibiótico específico assim que o resultado sai. É a base do uso racional. As demais alternativas descrevem exatamente o que GERA resistência.\n\n💡 BIZU: nesta questão, três alternativas contêm a palavra \"TODAS/TODOS\" — e todas as três estão erradas. Generalização absoluta em conduta clínica é quase sempre marcador de erro. O Manual de Higiene das Mãos da ANVISA (2026) liga explicitamente a higiene das mãos ao combate à resistência antimicrobiana.",
  },
  {
    id: "sel24-42", eixo: "seg", sub: "Segurança do paciente",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "A lavagem das mãos é uma medida essencial no controle de infecções hospitalares. A respeito da ação, é correto afirmar que:",
    alts: [
      "a higienização das mãos com álcool em gel substitui completamente a lavagem com água e sabão em todas as situações",
      "a lavagem das mãos deve ser feita, obrigatoriamente, antes e após o contato com o paciente, mas não é necessária ao manusear dispositivos médicos esterilizados",
      "a utilização de dispositivos médicos descartáveis elimina a necessidade de higienizar as mãos antes do uso",
      "a higienização das mãos deve ser realizada antes de procedimentos invasivos, como punções venosas, e após o contato com material biológico",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. Corresponde ao 2º momento (antes de procedimento limpo/asséptico) e ao 3º momento (após risco de exposição a fluidos corporais) dos 5 Momentos da OMS. A alternativa A erra: quando as mãos estão VISIVELMENTE SUJAS ou com matéria orgânica, é ÁGUA E SABÃO — o álcool não substitui. As alternativas B e C dispensam a higienização, o que nunca se faz.\n\n💡 BIZU — os 5 MOMENTOS: (1) antes de tocar o paciente; (2) antes de procedimento asséptico; (3) após risco de exposição a fluidos; (4) após tocar o paciente; (5) após tocar superfícies próximas. Os momentos 1 e 2 protegem o PACIENTE; os 3, 4 e 5 protegem VOCÊ e o ambiente.",
  },
  {
    id: "sel24-43", eixo: "seg", sub: "Segurança do paciente",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "facil",
    enunciado: "O controle de infecções relacionado à assistência à saúde (IRAS) é um fundamento essencial da prática de enfermagem. Sobre as técnicas de precauções padrão, pode-se afirmar que:",
    alts: [
      "o uso de luvas pode ser dispensado ao realizar procedimentos com risco de contato com fluidos corporais, desde que as mãos estejam devidamente higienizadas",
      "a higienização das mãos deve ser realizada apenas antes do atendimento ao paciente em precauções padrão",
      "o uso de equipamentos de proteção individual (EPIs) é obrigatório apenas em precauções de contato, e não se aplica às precauções padrão",
      "as precauções padrão devem ser aplicadas a todos os pacientes, independentemente do diagnóstico ou da presunção de infecção",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. Esta é a definição literal de precaução PADRÃO: aplica-se a TODOS os pacientes, independentemente do diagnóstico — parte-se do princípio de que qualquer pessoa pode carregar um agente infeccioso, inclusive sem saber. As demais alternativas dispensam ou restringem medidas de proteção.\n\n💡 BIZU: precaução PADRÃO = todo mundo, sempre. As precauções ESPECÍFICAS (contato, gotícula, aerossol) são ADICIONAIS, conforme o modo de transmissão — nunca substituem a padrão.",
  },

  // ─────────── ASSISTÊNCIA POR SISTEMAS ───────────
  {
    id: "sel24-44", eixo: "sistemas", sub: "Sistema nervoso",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "A avaliação adequada do estado de consciência do paciente é um elemento básico nos cuidados de enfermagem. Acerca da Escala de Coma de Glasgow (ECG), é possível afirmar que:",
    alts: [
      "a ECG avalia a profundidade do coma considerando três parâmetros: resposta visual, resposta auditiva e resposta motora",
      "a pontuação máxima na ECG é 15, indicando um paciente em coma profundo",
      "a ECG avalia três parâmetros: abertura ocular, resposta verbal e resposta motora, com a pontuação mínima sendo 3",
      "em caso de paciente intubado, a avaliação da ECG deve ser suspensa, pois não é possível aplicar os critérios da escala",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. Os três parâmetros são abertura OCULAR (1-4), resposta VERBAL (1-5) e resposta MOTORA (1-6). A pontuação vai de 3 (mínima) a 15 (máxima). A alternativa A inventa \"resposta auditiva\"; a B inverte (15 é o MELHOR, não coma profundo); a D erra — no intubado registra-se a verbal como não testável, mas a escala continua sendo aplicada.\n\n⚠️ PEGADINHA CAMPEÃ: dizer que a escala vai de 0 a 15. NÃO VAI. O mínimo é 3, porque cada um dos três parâmetros vale no mínimo 1 ponto, mesmo sem resposta alguma. Não existe Glasgow zero.\n\n💡 BIZU: Glasgow ≤ 8 = coma, gatilho clássico para considerar via aérea definitiva. \"Glasgow 8, intuba\".",
  },
  {
    id: "sel24-51", eixo: "sistemas", sub: "Sistema endócrino",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "Na assistência de enfermagem a pacientes com doenças crônicas, a abordagem deve ser abrangente e contínua. Considerando os cuidados de enfermagem em pacientes com diabetes mellitus, é certo dizer que:",
    alts: [
      "a monitorização da glicemia capilar deve ser realizada apenas uma vez ao dia, preferencialmente em jejum, para avaliar o controle glicêmico do paciente",
      "a orientação para o autocuidado inclui instruções sobre a administração correta de insulina, cuidados com os pés, alimentação adequada e reconhecimento de sinais de hipoglicemia e hiperglicemia",
      "a administração de insulina pode ser realizada em qualquer local do corpo, desde que a rotação dos locais de aplicação não seja uma preocupação principal",
      "a educação em saúde para pacientes diabéticos deve focar exclusivamente no controle alimentar, sendo desnecessário abordar a importância da atividade física regular",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. O autocuidado no diabetes é multidimensional: técnica de insulina, cuidado com os pés (prevenção do pé diabético), alimentação e — fundamental — reconhecer hipo e hiperglicemia. As demais alternativas restringem indevidamente o cuidado.\n\n⚠️ Sobre a alternativa C: o RODÍZIO dos locais de aplicação É preocupação central — sem ele, forma-se LIPOHIPERTROFIA, que altera erraticamente a absorção da insulina e descontrola a glicemia.\n\n💡 BIZU: hipoglicemia é < 70 mg/dL e mata mais rápido que a hiper. Paciente inconsciente = NADA por via oral (risco de broncoaspiração) — glicose EV.",
  },
  {
    id: "sel24-52", eixo: "sistemas", sub: "Sistema cardiovascular",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "A assistência de enfermagem a pacientes com doenças cardiovasculares exige um conhecimento detalhado das condições clínicas e das intervenções apropriadas. Sobre os cuidados de enfermagem a pacientes com insuficiência cardíaca, pode-se dizer que:",
    alts: [
      "a monitorização do balanço hídrico é irrelevante em pacientes com insuficiência cardíaca, pois a retenção de líquidos não afeta significativamente a condição clínica",
      "a administração de diuréticos deve ser feita sem considerar a monitorização dos eletrólitos, uma vez que as alterações eletrolíticas não são comuns nesses pacientes",
      "a orientação ao paciente sobre a importância do controle da ingestão de sódio e a adesão ao tratamento medicamentoso é fundamental para a prevenção de exacerbações da insuficiência cardíaca",
      "a prática de exercícios físicos intensos é recomendada para todos os pacientes com insuficiência cardíaca, independentemente do estágio da doença, para melhorar a função cardíaca",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. Restrição de sódio e adesão medicamentosa são pilares da prevenção de descompensação na IC. As demais alternativas negam cuidados essenciais: balanço hídrico é CENTRAL na IC (retenção = congestão), diurético SEMPRE exige controle de eletrólitos (risco de hipocalemia) e exercício intenso indiscriminado é perigoso.\n\n💡 BIZU: na IC, PESAR O PACIENTE DIARIAMENTE, no mesmo horário e balança — o ganho rápido de peso denuncia retenção hídrica ANTES do edema aparecer. É o sinal precoce que a enfermagem capta.\n\n💡 Lógica hidráulica: IC ESQUERDA = congestão PULMONAR (dispneia, ortopneia, estertores). IC DIREITA = congestão SISTÊMICA (edema de MMII, turgência jugular, hepatomegalia).",
  },
  {
    id: "sel24-58", eixo: "sistemas", sub: "Sistema digestório",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "dificil",
    enunciado: "A assistência de enfermagem a pacientes com doenças hepáticas crônicas, como a cirrose, envolve uma série de cuidados específicos para prevenir complicações e promover a qualidade de vida. A respeito desses cuidados de enfermagem, é coerente dizer que:",
    alts: [
      "a administração de diuréticos deve ser evitada em pacientes com ascite, pois pode agravar a retenção de líquidos e aumentar o risco de peritonite bacteriana espontânea",
      "a monitorização dos níveis de amônia sanguínea é irrelevante, uma vez que a encefalopatia hepática não está diretamente relacionada à concentração de amônia no sangue",
      "a orientação ao paciente sobre a restrição de sódio na dieta é fundamental para controlar a ascite e prevenir a retenção hídrica",
      "a realização de paracentese terapêutica é indicada apenas em casos de ascite refratária e deve ser evitada em pacientes com coagulopatia, independentemente do grau de severidade",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. A restrição de sódio é pilar do manejo da ascite — sódio retém água. As demais alternativas invertem a fisiopatologia: diuréticos são TRATAMENTO da ascite (não a agravam); a amônia É central na encefalopatia hepática; e a paracentese não é proibida de forma absoluta na coagulopatia.\n\n💡 APROFUNDAMENTO: o fígado doente não converte amônia em ureia → a amônia atinge o SNC → encefalopatia. Daí o uso de LACTULOSE, que acidifica o cólon e aprisiona a amônia. O sinal clássico é o FLAPPING (asterix).\n\n💡 BIZU: na cirrose, monitorar peso e circunferência abdominal diariamente — como na IC, é o jeito de flagrar retenção antes que ela seja visível.",
  },
  {
    id: "sel24-59", eixo: "sistemas", sub: "Sistema respiratório",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "Os cuidados de enfermagem a pacientes com doenças respiratórias crônicas, como a asma, envolvem o manejo adequado dos sintomas e a educação para o autocuidado. Estando atento a essas informações, podemos indicar que a orientação correta é:",
    alts: [
      "a orientação sobre o uso correto dos dispositivos inalatórios é crucial para garantir a eficácia do tratamento e prevenir exacerbações",
      "a monitorização do pico de fluxo expiratório é desnecessária na avaliação do controle da asma, sendo suficiente a avaliação clínica dos sintomas",
      "a administração de corticosteroides inalatórios deve ser evitada, pois seu uso prolongado pode levar ao desenvolvimento de dependência e efeitos colaterais sistêmicos graves",
      "a exposição a alérgenos deve ser minimizada apenas durante as crises asmáticas, sendo desnecessário adotar medidas preventivas em períodos de controle da doença",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. A técnica inalatória correta é determinante — a maior parte das falhas de tratamento na asma decorre de uso incorreto do dispositivo, não de falha do medicamento. Ensinar a técnica é intervenção de enfermagem de altíssimo impacto. As demais alternativas negam condutas corretas: pico de fluxo É útil, corticoide inalatório é a BASE do tratamento de manutenção, e o controle ambiental deve ser CONTÍNUO.\n\n⚠️ PEGADINHA CLÁSSICA DA ASMA (não está nesta questão, mas cai muito): o SILÊNCIO AUSCULTATÓRIO não é melhora — é GRAVIDADE EXTREMA. Significa que o fluxo aéreo está tão reduzido que nem sibilo se produz.",
  },

  // ─────────── CICLOS DE VIDA ───────────
  {
    id: "sel24-54", eixo: "ciclos", sub: "Pré-natal",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "dificil",
    enunciado: "No contexto da gestação, a compatibilidade entre o tipo de sangue materno e o fetal é fundamental para a prevenção de condições que comprometam o recém-nascido, como a eritroblastose fetal. Com base nesse tema, afirma-se que:",
    alts: [
      "a eritroblastose fetal ocorre apenas quando a mãe tem sangue ABO incompatível com o do feto, independentemente do fator Rh",
      "mulheres Rh negativo podem desenvolver anticorpos anti-D contra o sangue do feto Rh positivo, colocando gestações subsequentes em risco",
      "o uso de imunoglobulina anti-D durante a gestação é contra-indicado, pois favorece a formação de anticorpos maternos contra o fator Rh",
      "o fator Rh não apresenta relevância na gestação e não pode interferir na saúde do feto e da mãe",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. A doença hemolítica perinatal por incompatibilidade Rh: mãe Rh NEGATIVO + feto Rh POSITIVO → no parto (ou em sangramentos), hemácias fetais entram na circulação materna → a mãe produz anticorpos anti-D → em gestação SUBSEQUENTE, esses anticorpos atravessam a placenta e destroem as hemácias do feto.\n\n💡 POR QUE A PRIMEIRA GESTAÇÃO COSTUMA SER POUPADA: a sensibilização ocorre no parto, quando o sangue fetal se mistura ao materno. Por isso o risco é para as gestações SEGUINTES — e por isso a imunoglobulina anti-D é dada preventivamente (a alternativa C inverte isso completamente: ela PREVINE a sensibilização, não a favorece).\n\n💡 BIZU: mãe Rh negativo é sempre bandeira vermelha no pré-natal — solicita-se tipagem e Coombs indireto.",
  },

  // ─────────── ADMINISTRAÇÃO EM ENFERMAGEM ───────────
  {
    id: "sel24-38", eixo: "admin", sub: "Organização dos serviços de enfermagem",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "facil",
    enunciado: "A organização dos serviços de enfermagem em diferentes níveis de atenção à saúde é fundamental para garantir o cuidado integral, equitativo e eficiente à população. Sobre essa temática, é certo dizer que:",
    alts: [
      "o cuidado primário concentra-se exclusivamente em intervenções curativas voltadas às emergências",
      "os serviços de enfermagem em atenção primária buscam a promoção da saúde, prevenção de agravos e acompanhamento longitudinal",
      "a enfermagem em atenção terciária não participa do gerenciamento das condições clínicas, atuando apenas na reabilitação",
      "a organização dos serviços de enfermagem limita-se à execução de tarefas operacionais, sem envolvimento no planejamento estratégico",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. Promoção, prevenção e ACOMPANHAMENTO LONGITUDINAL são a essência da atenção primária. A palavra-chave é \"longitudinal\" — o vínculo ao longo do tempo, que distingue a APS de um atendimento pontual. As demais alternativas restringem indevidamente o papel da enfermagem.\n\n💡 BIZU: alternativas com \"exclusivamente\", \"apenas\", \"limita-se\" são marcadores fortes de erro em questões de organização de serviços. Aqui, TRÊS das quatro alternativas usam esse recurso — e todas as três estão erradas.",
  },
  {
    id: "sel24-39", eixo: "admin", sub: "Liderança e trabalho em equipe",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "facil",
    enunciado: "A liderança exercida nos serviços de enfermagem é essencial para promover a qualidade e garantir a continuidade do cuidado. Sobre o papel da enfermagem na organização das equipes, afirma-se corretamente que:",
    alts: [
      "o enfermeiro atua como líder técnico, delegando atividades sem a necessidade de supervisão sistemática",
      "a organização dos serviços reduz o papel do enfermeiro a ações operacionais, restringindo sua atuação no processo de planejamento",
      "o trabalho em equipe em enfermagem ocorre exclusivamente em ambientes hospitalares, sem importância nos serviços comunitários",
      "a liderança em enfermagem envolve o estímulo ao trabalho em equipe, a tomada de decisão compartilhada e a gestão eficaz dos conflitos",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. Liderança contemporânea em enfermagem = trabalho em equipe + decisão compartilhada + gestão de conflitos. A alternativa A contém um erro grave: delegar SEM supervisão sistemática contraria a Lei 7.498/86 (art. 15) — técnicos e auxiliares atuam SOB ORIENTAÇÃO E SUPERVISÃO do enfermeiro.\n\n💡 BIZU: sempre que uma alternativa \"libertar\" o técnico da supervisão do enfermeiro, ela está errada. É o erro nº 1 do eixo de ética/gestão.",
  },
  {
    id: "sel24-53", eixo: "admin", sub: "Avaliação de desempenho",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "media",
    enunciado: "A gerência em enfermagem envolve a coordenação e a supervisão de equipes, além da gestão de recursos e processos de trabalho. Evidenciando as responsabilidades do enfermeiro gerente, é coerente afirmar que:",
    alts: [
      "a avaliação de desempenho da equipe de enfermagem é uma responsabilidade do enfermeiro gerente, que deve utilizar critérios objetivos e subjetivos para promover o desenvolvimento profissional e a qualidade da assistência",
      "o enfermeiro gerente é responsável exclusivamente pela supervisão direta da assistência prestada, não se envolvendo na gestão de recursos materiais e financeiros da unidade",
      "a elaboração de escalas de trabalho é uma atribuição que deve ser realizada de maneira fixa e imutável, sem considerar as necessidades individuais dos profissionais e as demandas da unidade",
      "a comunicação eficaz é irrelevante para a gerência em enfermagem, uma vez que as decisões gerenciais são tomadas exclusivamente pelo enfermeiro gerente sem a necessidade de interação com a equipe",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. A avaliação de desempenho é atribuição do enfermeiro gerente e deve combinar critérios objetivos (indicadores, metas) e subjetivos (postura, relacionamento). As demais alternativas negam competências gerenciais básicas: gestão de recursos, flexibilidade das escalas e comunicação.\n\n💡 BIZU: nesta questão, as três alternativas erradas se denunciam pelas palavras \"exclusivamente\", \"imutável\" e \"irrelevante\". Gestão é o oposto de rigidez e isolamento — desconfie sempre de absolutos.",
  },
  {
    id: "sel24-55", eixo: "admin", sub: "Teorias da administração",
    banca: "SELECON", ano: 2024, orgao: "HEMOMINAS", nivel: "dificil",
    enunciado: "A gerência em enfermagem envolve a aplicação de teorias e modelos de gestão para otimizar os processos de trabalho e melhorar a qualidade da assistência. De acordo com as teorias de gestão aplicadas à enfermagem, é certo dizer que:",
    alts: [
      "a Teoria Clássica da Administração, proposta por Henri Fayol, enfatiza a importância da flexibilidade e da adaptação às mudanças, priorizando a descentralização das decisões e a autonomia dos trabalhadores",
      "a Teoria das Relações Humanas, desenvolvida por Elton Mayo, destaca a importância dos aspectos emocionais e das relações interpessoais no ambiente de trabalho, promovendo a satisfação e o bem-estar dos profissionais",
      "a Teoria da Contingência, de Fiedler, defende que não existe uma única maneira ideal de organizar e gerenciar uma equipe, sendo necessário adotar um estilo de liderança rígido e autocrático para garantir a eficiência",
      "a Teoria X e Y, de Douglas McGregor, sugere que os trabalhadores são naturalmente desmotivados e necessitam de controle rigoroso e de supervisão constante para desempenhar suas funções adequadamente",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. Elton Mayo e a Teoria das Relações Humanas (experiência de Hawthorne) marcaram a virada: o trabalhador não é só um par de mãos — fatores emocionais e relações interpessoais afetam diretamente a produtividade.\n\n💡 POR QUE AS OUTRAS ERRAM:\n• FAYOL (Clássica) é o OPOSTO de flexível — enfatiza estrutura formal, hierarquia e centralização.\n• CONTINGÊNCIA acerta ao dizer que \"não existe uma maneira ideal\", mas erra ao concluir por estilo rígido e autocrático — a essência da teoria é justamente ADAPTAR o estilo à situação.\n• McGREGOR propôs DUAS visões: a Teoria X (trabalhador desmotivado, precisa de controle) e a Teoria Y (trabalhador motivado, busca responsabilidade). A alternativa descreve só a X como se fosse a teoria toda.\n\n💡 BIZU: Fayol = estrutura. Mayo = pessoas. McGregor = X (pessimista) e Y (otimista). Fiedler = depende da situação.",
  },

// ─────────── BIOÉTICA E LEGISLAÇÃO ───────────
  {
    id: "ecsp23-11", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "media",
    enunciado: "As atividades do/a enfermeiro/a, como integrante da equipe de saúde, são de natureza privativa desse profissional e têm base na regulamentação do exercício profissional. Um exemplo dessas atividades privativas é:",
    alts: [
      "participação no planejamento, na execução e na avaliação da programação de saúde",
      "prescrição de medicamentos previamente estabelecidos em programas de saúde pública",
      "prestação de assistência de enfermagem à gestante, à parturiente, à puérpera e ao recém-nascido",
      "realização de cuidados de maior complexidade técnica e que exijam conhecimentos científicos adequados e capacidade de tomar decisões imediatas",
    ],
    correta: 3,
    coment: "Gabarito oficial: D. Esta é a redação LITERAL do art. 11, inciso I, alínea 'm' da Lei 7.498/86 — e ela contém o CRITÉRIO que unifica todas as privativas: MAIOR COMPLEXIDADE TÉCNICA + CONHECIMENTO CIENTÍFICO + DECISÃO IMEDIATA.\n\n⚠️ ATENÇÃO — QUESTÃO DE ALTA DIFICULDADE DISFARÇADA: as alternativas A, B e C também estão na Lei 7.498/86! A diferença é que elas estão no inciso II (atividades que o enfermeiro exerce COMO INTEGRANTE DA EQUIPE DE SAÚDE), enquanto a D está no inciso I (PRIVATIVAS).\n\n💡 A LÓGICA QUE SALVA: o inciso I são as privativas — ninguém mais faz. O inciso II são atividades que o enfermeiro faz, mas OUTROS profissionais também podem fazer (planejar programa de saúde, por exemplo, é multiprofissional).\n\n💡 BIZU: pergunte 'SÓ o enfermeiro faz isso?'. Planejar programação de saúde → não, a equipe toda participa. Assistir gestante → o médico também assiste. Cuidado de maior complexidade com decisão imediata → SÓ o enfermeiro.\n\n💡 O QUE É PRIVATIVO (art. 11, I): direção/chefia do serviço de enfermagem · consulta de enfermagem · prescrição da assistência · cuidados diretos a paciente GRAVE com risco de vida · cuidados de MAIOR COMPLEXIDADE com decisão imediata.",
  },

  // ─────────── ADMINISTRAÇÃO EM ENFERMAGEM ───────────
  {
    id: "ecsp23-12", eixo: "admin", sub: "Liderança e trabalho em equipe",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "dificil",
    enunciado: "O enfermeiro, líder nato da equipe de enfermagem, deve trabalhar suas potencialidades de forma a desenvolver as habilidades necessárias relacionadas com liderança. Segundo Guirardello (1998), existem quatro competências inseparáveis dos grandes líderes, que são:",
    alts: [
      "visão, autoconfiança, autoestima e consciência",
      "consciência, confiança, autoestima e comunicação",
      "visão, confiança, autoestima positiva e comunicação",
      "consciência, autoconfiança, autoestima positiva e comunicação",
    ],
    correta: 2,
    coment: "Gabarito oficial: C. As quatro competências segundo Guirardello: VISÃO, CONFIANÇA, AUTOESTIMA POSITIVA e COMUNICAÇÃO.\n\n⚠️ SEJA HONESTA COM ESSE TIPO DE QUESTÃO: é decoreba pura de autor específico. Não há lógica clínica para deduzir — ou você viu esse autor, ou não viu. Numa prova de 10 questões específicas, essa é a que você chuta com boa consciência e investe o tempo nas outras.\n\n💡 MAS DÁ PARA MELHORAR O CHUTE: repare que as quatro alternativas embaralham praticamente as MESMAS palavras (visão, consciência, confiança, autoconfiança, autoestima, autoestima positiva, comunicação). Quando a banca faz isso, ela testa a memorização literal.\n\n💡 O QUE VALE A PENA GUARDAR — o conceito por trás:\n• VISÃO → o líder enxerga onde a equipe precisa chegar\n• CONFIANÇA → a equipe precisa acreditar nele\n• AUTOESTIMA POSITIVA → quem não se respeita não conduz ninguém\n• COMUNICAÇÃO → sem ela, visão não vira ação\n\n💡 Guardando 'VCAC' (Visão, Confiança, Autoestima, Comunicação) você mata a questão.",
  },

  // ─────────── URGÊNCIA ───────────
  {
    id: "ecsp23-13", eixo: "urg", sub: "Urgência e emergência",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "media",
    enunciado: "A Política Nacional de Atenção às Urgências, composta pelos sistemas de atenção às urgências estaduais, regionais e municipais, deve ser organizada de forma que permita atender aos princípios de:",
    alts: [
      "universalidade, equidade e integralidade",
      "universalidade, acesso e integralidade",
      "equidade, acesso e universalidade",
      "equidade, acesso e integralidade",
    ],
    correta: 0,
    coment: "Gabarito oficial: A. A Política Nacional de Atenção às Urgências (Portaria GM/MS nº 1.863/2003) deve atender aos princípios de UNIVERSALIDADE, EQUIDADE e INTEGRALIDADE.\n\n💡 A LÓGICA: são os TRÊS PRINCÍPIOS DOUTRINÁRIOS DO SUS. A Política de Urgências não inventa princípio novo — ela é parte do SUS e segue os mesmos pilares.\n\n⚠️ A PEGADINHA: 'acesso' aparece em TRÊS das quatro alternativas, e soa muito plausível numa política de urgência (afinal, urgência é sobre acesso rápido!). Mas acesso NÃO é um dos três princípios doutrinários — ele é uma CONSEQUÊNCIA da universalidade.\n\n💡 BIZU DE OURO — os 3 princípios DOUTRINÁRIOS do SUS: UNIVERSALIDADE (todos têm direito) · EQUIDADE (mais a quem precisa mais) · INTEGRALIDADE (o todo, não a doença). Sempre que uma alternativa trocar um deles por 'acesso', 'gratuidade' ou 'hierarquização', está errada.\n\n💡 NÃO CONFUNDA com as DIRETRIZES ORGANIZATIVAS (art. 198 da CF): descentralização, atendimento integral e participação da comunidade.",
  },

  // ─────────── IMUNIZAÇÃO ───────────
  {
    id: "ecsp23-14", eixo: "seg", sub: "Programa Nacional de Imunização",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "facil",
    enunciado: "As vacinas são seguras e estimulam o sistema imunológico a proteger a pessoa contra doenças transmissíveis. Quando adotada como estratégia de saúde pública, elas são consideradas um dos melhores investimentos em saúde, considerando o custo-benefício. A vacina adsorvida difteria, tétano, pertussis, hepatite B (recombinante) e Haemophilus influenzae B (conjugada) — Vacina Penta — tem o esquema de:",
    alts: ["2 doses e 2 reforços", "2 doses e 1 reforço", "3 doses e 2 reforços", "3 doses e 1 reforço"],
    correta: 2,
    coment: "Gabarito oficial: C (3 doses e 2 reforços).\n\n💡 O RACIOCÍNIO: a PENTAVALENTE protege contra 5 doenças — difteria, tétano, coqueluche (pertussis), hepatite B e Haemophilus influenzae B.\n\n📌 AS 3 DOSES: aos 2, 4 e 6 MESES (a própria pentavalente).\n📌 OS 2 REFORÇOS: aos 15 MESES e aos 4 ANOS — feitos com a DTP (tríplice bacteriana), que reforça difteria, tétano e coqueluche.\n\n👉 Por que o reforço é com DTP e não com penta? Porque a proteção contra hepatite B e Hib não precisa de reforço nessa idade — só os componentes D, T e P precisam. Daí o esquema: 3 doses de penta + 2 reforços de DTP.\n\n💡 BIZU: o bloco 2-4-6 meses é o mais cobrado do calendário — Penta + VIP + Pneumo 10 (e Rotavírus só aos 2 e 4).\n\n⚠️ ATUALIZAÇÃO IMPORTANTE: a PENTAVALENTE substituiu a antiga TETRAVALENTE. Se seu material diz 'tetra aos 2-4-6 meses', está desatualizado. E cuidado: a penta do calendário INFANTIL é diferente da 'pentavalente' de adulto.",
  },

  // ─────────── BÔNUS: SAÚDE COLETIVA ───────────
  {
    id: "ecsp23-15", eixo: "bonus", sub: "Educação em saúde",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "media",
    enunciado: "Três grandes objetivos norteiam as diretrizes e as estratégias dos componentes que constituem o Programa Nacional de DST/AIDS, que, por sua vez, servirão de base para as ações em todos os níveis de atenção à saúde da população, sendo eles: reduzir a incidência da infecção, ampliar o acesso à assistência e:",
    alts: [
      "capacitar os profissionais de saúde",
      "fortalecer as instituições de saúde",
      "priorizar a prevenção",
      "ampliar o diagnóstico",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. Os três objetivos do Programa Nacional de DST/AIDS: (1) reduzir a incidência da infecção; (2) ampliar o acesso ao diagnóstico e à assistência; (3) FORTALECER AS INSTITUIÇÕES de saúde responsáveis pelo controle.\n\n💡 A LÓGICA que ajuda a deduzir: repare que os dois primeiros objetivos já dados no enunciado tratam do PACIENTE (reduzir infecção, ampliar assistência). O terceiro precisa tratar de algo DIFERENTE — e é justamente a estrutura, a instituição que sustenta tudo.\n\n⚠️ POR QUE AS OUTRAS SEDUZEM: 'capacitar profissionais', 'priorizar prevenção' e 'ampliar diagnóstico' são todas ações CORRETAS e desejáveis — mas são MEIOS, não os três grandes OBJETIVOS estruturantes. A prevenção, inclusive, já está contemplada em 'reduzir a incidência'.\n\n💡 TÉCNICA DE PROVA: quando o enunciado dá dois itens de uma tríade e pede o terceiro, procure a alternativa que está num NÍVEL DIFERENTE dos dois primeiros. Repetir o mesmo nível é o erro que a banca planta.",
  },

  // ─────────── ADMINISTRAÇÃO / SAÚDE DO TRABALHADOR ───────────
  {
    id: "ecsp23-16", eixo: "admin", sub: "Organização dos serviços de enfermagem",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "dificil",
    enunciado: "A penosidade, como risco no ambiente de trabalho, decorre dos elementos envolvidos na carga de trabalho, correspondendo esta ao dispêndio físico e ao conjunto de capacidades (físicas, sensoriais, psicomotoras, psicológicas e cognitivas) que a pessoa investe na execução da tarefa. A falta de lugar para reuniões, a ausência de meios de comunicação, a inexistência de programa de trabalho, o diálogo social insuficiente, a insuficiência de informação e a inexistência de regimento interno do serviço de saúde representam cargas de origem:",
    alts: ["física", "psíquica", "estrutural", "institucional"],
    correta: 1,
    coment: "Gabarito oficial: B (PSÍQUICA).\n\n💡 O RACIOCÍNIO — e essa questão engana muita gente: à primeira vista, 'falta de lugar para reuniões' e 'inexistência de regimento interno' parecem cargas ESTRUTURAIS ou INSTITUCIONAIS. Mas a classificação das cargas de trabalho olha para o EFEITO NO TRABALHADOR, não para a natureza do item.\n\n👉 O que a falta de comunicação, de diálogo social e de informação PRODUZ no profissional? Angústia, insegurança, sensação de desamparo, sofrimento. Isso é DESGASTE PSÍQUICO.\n\n💡 AS CARGAS DE TRABALHO (Laurell e Noriega):\n📌 FÍSICAS → ruído, temperatura, iluminação, radiação\n📌 QUÍMICAS → poeiras, gases, líquidos\n📌 BIOLÓGICAS → vírus, bactérias, fungos\n📌 MECÂNICAS → cortes, quedas, choques\n📌 FISIOLÓGICAS → esforço físico, posturas, levantamento de peso\n📌 PSÍQUICAS → atenção permanente, supervisão rígida, comunicação falha, falta de autonomia, ritmo acelerado\n\n⚠️ ATENÇÃO: 'estrutural' e 'institucional' NÃO são categorias dessa classificação — são distratores inventados. Quando duas alternativas não existem na taxonomia, a chance cai para 50%.\n\n💡 BIZU: carga que gera SOFRIMENTO MENTAL = psíquica, mesmo que a causa pareça material.",
  },

  // ─────────── BÔNUS: EDUCAÇÃO EM SAÚDE ───────────
  {
    id: "ecsp23-17", eixo: "bonus", sub: "Educação em saúde",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "facil",
    enunciado: "A Carta de Ottawa define \"promoção da saúde\" como o processo de qualificação da comunidade para desempenhar uma melhoria da sua qualidade de vida e saúde, incluindo uma maior ação no controle desse processo. Dessa forma, o/a profissional de enfermagem desenvolve ações estratégicas na equipe de saúde, a fim de atender a promoção da saúde e a prevenção de doenças da população atendida. Como ferramenta dessas ações, pode-se destacar o/a:",
    alts: ["prescrição de enfermagem", "educação em saúde", "anamnese dirigida", "exame físico"],
    correta: 1,
    coment: "Gabarito oficial: B. A EDUCAÇÃO EM SAÚDE é a ferramenta por excelência da promoção da saúde.\n\n💡 A LÓGICA QUE RESOLVE: leia a palavra-chave da definição da Carta de Ottawa — 'processo de QUALIFICAÇÃO DA COMUNIDADE para desempenhar uma melhoria da sua qualidade de vida'. Qualificar a comunidade para que ELA controle o processo = EDUCAR, empoderar, dar autonomia.\n\n👉 As outras três alternativas (prescrição, anamnese, exame físico) são ferramentas do CUIDADO INDIVIDUAL e da assistência — não da promoção coletiva.\n\n💡 A CARTA DE OTTAWA (1986) é o marco da promoção da saúde. Seus 5 campos de ação:\n1. Políticas públicas saudáveis\n2. Ambientes favoráveis\n3. Reforço da ação comunitária\n4. Desenvolvimento de habilidades pessoais\n5. Reorientação dos serviços de saúde\n\n💡 PROMOÇÃO × PREVENÇÃO — a distinção que cai:\n• PREVENÇÃO mira uma DOENÇA específica (vacinar contra sarampo evita sarampo)\n• PROMOÇÃO mira os DETERMINANTES (saneamento, renda, educação) e melhora a saúde em geral\n👉 Promoção é mais AMPLA que prevenção.\n\n⚠️ E o modelo de educação em saúde que a banca considera correto é o DIALÓGICO (construir COM o usuário), não o bancário (depositar informação).",
  },

  // ─────────── SEGURANÇA DO PACIENTE ───────────
  {
    id: "ecsp23-18", eixo: "seg", sub: "Segurança do paciente",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "dificil",
    enunciado: "Os serviços de saúde dos mais variados níveis de complexidade estão, constantemente, buscando estratégias científicas que contribuam com a segurança do cuidado prestado aos usuários, como a utilização de protocolos e checklists, para realizar intervenções que possibilitem a assistência livre de danos aos pacientes, mais segura e com maior qualidade. O profissional de enfermagem, para atingir tal objetivo, utiliza como recurso de enfermagem o/a:",
    alts: ["cuidado", "consulta", "gerência", "processo"],
    correta: 3,
    coment: "Gabarito oficial: D (PROCESSO).\n\n💡 O RACIOCÍNIO: a questão fala em 'protocolos e checklists' — instrumentos SISTEMATIZADOS, com etapas, sequência e método. Isso é PROCESSO. O Processo de Enfermagem é justamente o método científico que organiza o cuidado em etapas e garante que nada se perca.\n\n👉 Repare no encadeamento do enunciado: 'estratégias CIENTÍFICAS' + 'protocolos e checklists' + 'assistência livre de danos' = método sistematizado = PROCESSO.\n\n⚠️ POR QUE 'CUIDADO' (A) NÃO É A RESPOSTA — e essa é a armadilha: o cuidado é a ESSÊNCIA da enfermagem, mas não é um 'recurso' sistematizado. A questão pede o INSTRUMENTO que operacionaliza a segurança, e isso é o processo.\n\n💡 O PROCESSO DE ENFERMAGEM hoje é regido pela Resolução COFEN nº 736/2024 (que REVOGOU a 358/2009 e retirou o termo 'SAE'). Suas 5 etapas: Avaliação de Enfermagem → Diagnóstico → Planejamento → Implementação → Avaliação de Resultados.\n\n💡 A LIGAÇÃO COM SEGURANÇA: o checklist de cirurgia segura (Sign In / Time Out / Sign Out) é exatamente um processo — e existe porque erro cirúrgico não acontece por incompetência, mas por pressa e hierarquia. O processo institucionaliza a pausa.",
  },

  // ─────────── BIOÉTICA ───────────
  {
    id: "ecsp23-19", eixo: "etica", sub: "Bioética",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "facil",
    enunciado: "O agir profissional deve prevenir prejuízos ao paciente devido à falta de atenção, à negligência ou mesmo à imperícia. Para tanto, faz-se necessário, prioritariamente, um conjunto de princípios que norteiem o exercício profissional da enfermagem no campo:",
    alts: ["ético", "técnico", "científico", "assistencial"],
    correta: 0,
    coment: "Gabarito oficial: A (ÉTICO).\n\n💡 A PALAVRA-CHAVE está no enunciado: 'conjunto de PRINCÍPIOS que NORTEIEM o exercício profissional'. Princípios que norteiam conduta = ÉTICA. É exatamente o que o Código de Ética dos Profissionais de Enfermagem (Res. COFEN 564/2017) faz.\n\n👉 E os três termos citados — NEGLIGÊNCIA, IMPRUDÊNCIA e IMPERÍCIA — são as três formas de CULPA, conceitos jurídico-éticos por excelência.\n\n💡 AS TRÊS FORMAS DE CULPA — cai muito, decore:\n📌 NEGLIGÊNCIA → deixou de fazer o que devia (omissão). Ex.: não elevar a grade do leito.\n📌 IMPRUDÊNCIA → fez o que não devia (ação precipitada). Ex.: administrar medicação sem checar.\n📌 IMPERÍCIA → fez sem ter competência técnica. Ex.: executar procedimento para o qual não foi capacitado.\n\n💡 BIZU: NEGLIGÊNCIA = não fez · IMPRUDÊNCIA = fez errado por pressa · IMPERÍCIA = não sabia fazer.\n\n💡 As penalidades do Código de Ética: Advertência verbal → Multa → Censura → Suspensão → Cassação. Mnemônico: 'A Multa Cansa, Suspende, Cassa'.",
  },

  // ─────────── BÔNUS: EPIDEMIOLOGIA ───────────
  {
    id: "ecsp23-20", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "SELECON", ano: 2023, orgao: "ECSP", nivel: "media",
    enunciado: "O propósito fundamental do processo é permitir a definição de prioridades em termos de problemas e grupos, o mais aproximadamente possível, o que se refletirá na definição das ações mais adequadas, de acordo com a natureza dos problemas identificados, bem como na concentração de intervenções sobre grupos priorizados e, consequentemente, em um maior impacto positivo sobre os níveis de saúde e as condições de vida. Trata-se do uso inteligente da epidemiologia, por meio da \"microlocalização dos problemas de saúde, a intervenção no âmbito populacional pautada no saber epidemiológico e a apropriação de informações acerca do território-processo, visando à integralidade, à intersetorialidade, à efetividade e à equidade\". Tal afirmativa refere-se ao processo de:",
    alts: ["equidade", "normatização", "integralização", "territorialização"],
    correta: 3,
    coment: "Gabarito oficial: D (TERRITORIALIZAÇÃO).\n\n💡 A PISTA ESTÁ NO PRÓPRIO ENUNCIADO — ele entrega duas vezes: 'MICROLOCALIZAÇÃO dos problemas de saúde' e 'apropriação de informações acerca do TERRITÓRIO-PROCESSO'. Localização + território = TERRITORIALIZAÇÃO.\n\n💡 O QUE É TERRITORIALIZAÇÃO: é conhecer o território para além do mapa. Não é só saber onde ficam as ruas — é saber QUEM mora ali, quais os problemas de saúde daquela microárea, onde estão os grupos mais vulneráveis. É o que permite deixar de tratar a população como massa homogênea e passar a intervir onde a necessidade é maior.\n\n👉 Por isso o enunciado cita EQUIDADE ao final: territorializar É o instrumento que viabiliza a equidade. Sem saber onde está a maior necessidade, não há como dar mais a quem precisa mais.\n\n⚠️ A PEGADINHA: 'equidade' (A) e 'integralização' (C) aparecem no próprio texto do enunciado — a banca planta essas palavras para atrair. Mas elas são os OBJETIVOS/PRINCÍPIOS, não o PROCESSO que a questão pede.\n\n💡 TÉCNICA DE PROVA: quando a alternativa repete uma palavra que já apareceu no enunciado como FINALIDADE, desconfie. A resposta costuma ser o MEIO, não o fim.\n\n💡 A territorialização é a base da Estratégia Saúde da Família e da Atenção Primária — cada equipe tem seu território adscrito.",
  },

// ─────────── SEMIOLOGIA E SAE ───────────
  {
    id: "fund24-31", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "FUNDATEC", ano: 2024, orgao: "Pref. Coqueiral/MG", nivel: "facil",
    enunciado: "Qual das alternativas abaixo apresenta um dos objetivos da Sistematização da Assistência de Enfermagem (SAE)?",
    alts: [
      "Reduzir o tempo gasto com a documentação de enfermagem.",
      "Padronizar os cuidados de enfermagem para garantir qualidade e segurança ao paciente.",
      "Minimizar a comunicação entre os membros da equipe de saúde.",
      "Eliminar a necessidade de avaliação contínua do paciente.",
      "Aumentar a carga de trabalho dos profissionais de enfermagem.",
    ],
    correta: 1,
    coment: "Gabarito oficial: B. A SAE/Processo de Enfermagem existe para PADRONIZAR e SISTEMATIZAR o cuidado, garantindo qualidade, segurança e continuidade da assistência.\n\n💡 A TÉCNICA QUE RESOLVE ESTA QUESTÃO EM 10 SEGUNDOS — elimine o absurdo. Leia as quatro erradas:\n• A → \"reduzir a documentação\" — a SAE AUMENTA o registro (ele é etapa do processo!)\n• C → \"minimizar a comunicação\" — a SAE existe justamente para MELHORAR a comunicação da equipe\n• D → \"eliminar a avaliação contínua\" — a avaliação é ETAPA da SAE, e o processo é CÍCLICO\n• E → \"aumentar a carga de trabalho\" — nenhum método existe para piorar a vida de quem trabalha\n\n👉 Todas as quatro propõem algo que a SAE combate. Sobra a B.\n\n💡 BIZU DE OURO: quando as alternativas erradas descrevem PREJUÍZOS ou o OPOSTO da finalidade do instrumento, a questão é de eliminação — nem precisa saber o conteúdo a fundo. Alternativa que \"piora\" alguma coisa raramente é gabarito.\n\n⚠️ ATENÇÃO — ATUALIZAÇÃO IMPORTANTE: a Resolução COFEN nº 736/2024 REVOGOU a 358/2009 e RETIROU o termo \"SAE\". Hoje a norma fala apenas em PROCESSO DE ENFERMAGEM, e a 1ª etapa passou a chamar-se \"Avaliação de Enfermagem\" (antiga coleta de dados).\n\n💡 REGRA DE NAVEGAÇÃO: se a questão CITA \"SAE\" ou a Resolução 358/2009 → responda pela redação antiga (a banca está cobrando aquele texto). Se disser \"norma vigente\" ou citar a 736/2024 → o termo SAE não existe mais. Leia sempre o comando.",
  },

{
    id: "aut-mental-01", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um homem de 34 anos é levado por familiares à emergência de um hospital geral. Está agitado, agressivo, refere que \"vozes\" mandam que ele se defenda e recusa qualquer medicação. A família solicita a internação, alegando não conseguir mais manejá-lo em casa. O paciente, questionado, nega a necessidade de tratamento. Diante desse cenário, à luz da Lei nº 10.216/2001, a internação caracteriza-se como",
    alts: [
      "voluntária, pois a família consentiu em nome do paciente, que se encontra incapaz de decidir.",
      "compulsória, uma vez que o paciente apresenta risco a terceiros e recusa o tratamento.",
      "involuntária, devendo ser comunicada ao Ministério Público em até 72 horas.",
      "involuntária, devendo ser comunicada ao juiz competente em até 24 horas.",
      "voluntária, desde que o paciente assine o termo após a estabilização do quadro.",
    ],
    correta: 2,
    coment: "Gabarito: C. Internação SEM o consentimento do paciente e A PEDIDO DE TERCEIRO (a família) = INVOLUNTÁRIA. Deve ser comunicada ao MINISTÉRIO PÚBLICO em até 72 HORAS — e a alta também.\n\n💡 GUARDE PELA ORIGEM DO PEDIDO:\n📌 VOLUNTÁRIA → o paciente CONSENTE e assina declaração na admissão\n📌 INVOLUNTÁRIA → pedido de TERCEIRO, sem consentimento → MP em 72h\n📌 COMPULSÓRIA → determinada pela JUSTIÇA (ordem judicial)\n\n👉 Mnemônico: Vo = Vontade · In = pedido de terceiro · C = Court (juiz).\n\n⚠️ AS DUAS ARMADILHAS DESTA QUESTÃO:\n• Alternativa B (compulsória): o enunciado NÃO menciona ordem judicial. Quem pediu foi a FAMÍLIA. Risco a terceiros pode justificar a internação, mas não a torna compulsória — compulsória é só por decisão do juiz.\n• Alternativa D: troca o MP pelo JUIZ e as 72h por 24h. É a pegadinha mais comum do tema — decore: MINISTÉRIO PÚBLICO, 72 HORAS.\n\n💡 POR QUE O MP E NÃO O JUIZ: é uma salvaguarda histórica contra o abuso. Internar \"a pedido da família\" já foi instrumento de exclusão social — bastava um parente incômodo. Ao exigir que o MP saiba de toda internação sem consentimento, a lei coloca um fiscal externo entre a vontade de terceiros e a liberdade da pessoa.\n\n💡 E lembre do princípio: a internação só é indicada quando os recursos EXTRA-HOSPITALARES se mostrarem insuficientes. É o ÚLTIMO recurso, não o primeiro.",
  },

  {
    id: "aut-mental-02", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre os Centros de Atenção Psicossocial (CAPS), assinale a alternativa correta.",
    alts: [
      "O CAPS I atende municípios com população acima de 70 mil habitantes e funciona 24 horas.",
      "O CAPS III funciona 24 horas e dispõe de acolhimento noturno, sendo indicado para municípios com população acima de 150 mil habitantes.",
      "O CAPS AD destina-se exclusivamente a crianças e adolescentes usuários de álcool e outras drogas.",
      "O acolhimento noturno realizado no CAPS III configura internação psiquiátrica de curta duração.",
      "O acesso ao CAPS ocorre exclusivamente por encaminhamento médico da atenção básica.",
    ],
    correta: 1,
    coment: "Gabarito: B. O CAPS III funciona 24 HORAS, com acolhimento noturno (até 5 leitos), para municípios acima de 150 MIL habitantes.\n\n💡 A TABELA QUE RESOLVE — o que define é POPULAÇÃO e PÚBLICO:\n📌 CAPS I → acima de 15 mil hab. · todas as idades\n📌 CAPS II → acima de 70 mil hab. · todas as idades\n📌 CAPS III → acima de 150 mil hab. · 24 HORAS, acolhimento noturno\n📌 CAPS i → acima de 70 mil hab. · INFANTOJUVENIL\n📌 CAPS AD → acima de 70 mil hab. · Álcool e Drogas\n📌 CAPS AD III → acima de 150 mil hab. · AD, 24 horas\n\n👉 A escada dos números: 15 mil → 70 mil → 150 mil.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• A → confunde CAPS I (15 mil, horário comercial) com II e III\n• C → CAPS AD é para TODAS as idades; quem é infantojuvenil é o CAPS i\n• D → **PEGADINHA DE OURO**: acolhimento noturno NÃO é internação! É permanência de curta duração DENTRO do serviço aberto, comunitário. O CAPS é SUBSTITUTIVO ao manicômio — se fosse internação, ele reproduziria o que veio abolir.\n• E → o acesso é por ACOLHIMENTO, inclusive por DEMANDA ESPONTÂNEA. Não exige encaminhamento.\n\n💡 O instrumento central do cuidado no CAPS é o PTS (Projeto Terapêutico Singular), construído COM o usuário.\n\n⚠️ NOTA DE ATUALIZAÇÃO: em janeiro/2026 o MS criou grupo de trabalho (Portaria nº 10) para revisar as diretrizes e o custeio da RAPS. Os fundamentos da Lei 10.216 permanecem, mas acompanhe eventuais mudanças nas portarias.",
  },

  {
    id: "aut-mental-03", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Durante a assistência a uma paciente internada em unidade de saúde mental, a enfermeira observa que ela relata, com angústia evidente, que \"há câmeras escondidas no teto que transmitem tudo o que faço\". A conduta de enfermagem mais adequada é",
    alts: [
      "confrontar a paciente com evidências concretas, demonstrando que não existem câmeras no local.",
      "concordar com o relato da paciente, a fim de estabelecer vínculo terapêutico e reduzir a agitação.",
      "ignorar o conteúdo do relato e redirecionar imediatamente a conversa para outro assunto.",
      "acolher o sentimento expresso pela paciente, sem afirmar nem negar o conteúdo do delírio.",
      "solicitar contenção mecânica preventiva, considerando o risco iminente de agitação psicomotora.",
    ],
    correta: 3,
    coment: "Gabarito: D. Diante de delírio ou alucinação: NÃO CONFRONTAR e NÃO REFORÇAR. Acolhe-se o SENTIMENTO (\"percebo que isso te assusta\") sem entrar no mérito do conteúdo.\n\n💡 POR QUE NÃO SE CONFRONTA — e essa é a lógica que você nunca mais esquece: para a pessoa, o delírio é experiência REAL. Argumentar \"isso não existe\" não convence — e ainda ROMPE O VÍNCULO, porque ela sente que você não acredita nela. Você perde a única ferramenta que tinha: a confiança.\n\n💡 POR QUE NÃO SE CONCORDA (alternativa B): concordar REFORÇA o delírio e valida uma percepção distorcida. Além de antiético, cria dependência de uma mentira.\n\n👉 A saída é o CAMINHO DO MEIO: você não discute o conteúdo, você trata a ANGÚSTIA. \"Percebo que você está se sentindo vigiada e que isso te deixa aflita. Estou aqui com você.\" Trata-se o sentimento, que é real, não o fato, que não é.\n\n⚠️ SOBRE A ALTERNATIVA E — contenção: pela Resolução COFEN nº 746/2024, ela só se aplica quando for o ÚNICO MEIO disponível para prevenir dano imediato ou iminente ao paciente ou a terceiros. NUNCA preventiva, nunca punição. O enunciado não descreve agressividade nem risco iminente — descreve ANGÚSTIA. Conter alguém angustiado é violência.\n\n💡 BIZU DA PROVA: em saúde mental, a resposta certa quase sempre é a que RESPEITA A AUTONOMIA e ACOLHE. As erradas confrontam, mentem, ignoram ou contêm.",
  },

  {
    id: "aut-mental-04", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Uma enfermeira da atenção básica realiza visita domiciliar e a usuária, de 45 anos, relata que \"às vezes pensa que seria melhor não acordar mais\". A enfermeira percebe que a mulher está em sofrimento, mas hesita em aprofundar o assunto por receio de \"colocar a ideia na cabeça dela\". Sobre a conduta adequada, assinale a afirmativa correta.",
    alts: [
      "O receio da enfermeira é procedente: abordar diretamente a ideação suicida pode induzir o comportamento em pessoas vulneráveis.",
      "A enfermeira deve perguntar de forma direta e acolhedora sobre a ideação suicida, pois a abordagem reduz a angústia e permite intervir.",
      "A conduta correta é encaminhar imediatamente ao CAPS sem abordar o tema, evitando exposição desnecessária da usuária.",
      "A abordagem só deve ocorrer na presença de um profissional médico ou psicólogo, por se tratar de competência exclusiva desses profissionais.",
      "A enfermeira deve orientar a família a vigiar a usuária, sem comunicar a ela essa observação, para não gerar constrangimento.",
    ],
    correta: 1,
    coment: "Gabarito: B. Perguntar de forma direta e acolhedora sobre ideação suicida REDUZ a angústia e abre espaço para o cuidado. É a conduta recomendada — e é competência da enfermagem.\n\n⚠️ O MITO QUE A BANCA EXPLORA: \"perguntar sobre suicídio planta a ideia\". É FALSO. A evidência mostra o OPOSTO: quem tem ideação já pensa nisso o tempo todo — o que falta é alguém com quem falar. A pergunta direta ALIVIA, porque quebra o isolamento.\n\n👉 O silêncio é que mata. A pessoa interpreta o desvio de assunto como \"nem ela quer ouvir isso\" — e se fecha.\n\n💡 COMO PERGUNTAR: de forma direta, calma, sem julgamento. \"Você tem pensado em tirar a própria vida?\" Não use eufemismo — eufemismo comunica desconforto, e desconforto fecha a porta.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• A → reproduz o mito. Marcador de alternativa errada.\n• C → encaminhar SEM abordar é abandonar. O acolhimento vem antes do encaminhamento.\n• D → NÃO é competência exclusiva de médico ou psicólogo. Todo profissional de saúde pode e deve acolher.\n• E → vigiar sem comunicar quebra a autonomia e a confiança. Além disso, envolve a família SEM a usuária — isso é infantilizá-la.\n\n💡 IMPORTANTE — NOTIFICAÇÃO: a tentativa de suicídio é de notificação IMEDIATA (até 24h) no SINAN. A ideação, quando identificada em atendimento, também demanda registro e seguimento pela rede.",
  },

  {
    id: "aut-mental-05", eixo: "mental", sub: "Pessoa com deficiência",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "De acordo com a Lei nº 13.146/2015 — Lei Brasileira de Inclusão da Pessoa com Deficiência (LBI), o conceito de deficiência",
    alts: [
      "restringe-se ao impedimento de natureza física, sensorial ou intelectual, considerado isoladamente.",
      "resulta da interação entre impedimentos de longo prazo e as barreiras que obstruem a participação plena na sociedade.",
      "é definido exclusivamente por avaliação médica que ateste a limitação funcional do indivíduo.",
      "implica, necessariamente, restrição da capacidade civil da pessoa para os atos da vida.",
      "abrange apenas os impedimentos congênitos, excluindo os adquiridos ao longo da vida.",
    ],
    correta: 1,
    coment: "Gabarito: B. A LBI adotou o modelo BIOPSICOSSOCIAL: deficiência = impedimento de longo prazo + BARREIRAS. Não está só na pessoa — está na INTERAÇÃO com o ambiente.\n\n💡 A MUDANÇA DE PARADIGMA — e é o coração da questão:\n📌 Modelo MÉDICO (antigo): a deficiência é um ATRIBUTO DO CORPO. A pessoa \"é deficiente\" porque falta algo nela. A intervenção recai sobre o corpo (curar, corrigir, reabilitar).\n📌 Modelo BIOPSICOSSOCIAL (LBI): a deficiência resulta da INTERAÇÃO entre o impedimento e as barreiras. A intervenção recai sobre a BARREIRA.\n\n👉 O EXEMPLO QUE PROVA: um cadeirante numa cidade com rampas, transporte acessível e elevadores participa PLENAMENTE. O MESMO cadeirante numa cidade de escadas está impedido. O impedimento é idêntico — a deficiência, não. Logo, a deficiência não está (só) na pessoa.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• A e C → reproduzem o modelo MÉDICO, superado pela LBI\n• D → **ERRO GRAVE**: a deficiência NÃO afeta a plena capacidade civil! A LBI é explícita — a pessoa com deficiência pode casar, ter filhos, decidir sobre o próprio corpo e exercer direitos sexuais e reprodutivos.\n• E → inclui impedimentos congênitos E adquiridos\n\n💡 OS TIPOS DE BARREIRA: urbanísticas · arquitetônicas · nos transportes · nas comunicações · ATITUDINAIS (as do comportamento — preconceito, presumir incapacidade) · tecnológicas.\n\n💡 A atitudinal é a favorita da banca: falar com o acompanhante em vez de falar com a pessoa é barreira atitudinal.",
  },

  {
    id: "aut-mental-06", eixo: "mental", sub: "Situação de risco e violência",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Uma mulher de 29 anos comparece à unidade de saúde com equimoses em face e membros superiores. Ao ser acolhida pela enfermeira, relata agressão praticada pelo companheiro, mas pede que \"nada seja registrado\", pois teme represálias e afirma que não pretende denunciar. Sobre a conduta do serviço de saúde, é correto afirmar que",
    alts: [
      "a notificação depende da autorização expressa da usuária, devendo ser respeitada sua recusa.",
      "a notificação é compulsória e independe da vontade da usuária, sendo ainda obrigatória a comunicação à autoridade policial em até 24 horas.",
      "a notificação só é obrigatória em serviços públicos, não se aplicando à rede privada.",
      "a notificação deve aguardar a confirmação da agressão por exame de corpo de delito.",
      "por se tratar de recusa da usuária, cabe ao serviço apenas registrar o atendimento clínico em prontuário.",
    ],
    correta: 1,
    coment: "Gabarito: B. A notificação de violência é COMPULSÓRIA e INDEPENDE da vontade da vítima. E a Lei nº 13.931/2019 (que alterou a Lei 10.778/2003) acrescentou: nos casos de violência CONTRA A MULHER, é obrigatória a comunicação à AUTORIDADE POLICIAL em até 24 HORAS.\n\n💡 A DISTINÇÃO QUE RESOLVE O TEMA — e cai sempre:\n📌 NOTIFICAR ≠ DENUNCIAR\n• NOTIFICAÇÃO → ato de VIGILÂNCIA EM SAÚDE. Alimenta o SINAN, dimensiona o problema, aciona a rede de proteção. É SIGILOSA. É OBRIGAÇÃO do profissional.\n• DENÚNCIA → ato policial/judicial. Em regra, é decisão da vítima adulta.\n\n👉 O profissional NOTIFICA SEMPRE. A decisão de denunciar é dela.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• A e E → a notificação NÃO se condiciona à autorização da vítima. É dever legal, não escolha.\n• C → serviços PÚBLICOS **E PRIVADOS** notificam. Sem exceção.\n• D → notifica-se a SUSPEITA. Não se espera laudo, exame de corpo de delito ou boletim de ocorrência.\n\n💡 NOTIFICAR NÃO FERE O SIGILO PROFISSIONAL — é dever previsto em lei. O sigilo cai por determinação legal.\n\n💡 PRAZOS QUE CAEM:\n• Violência SEXUAL e TENTATIVA DE SUICÍDIO → notificação IMEDIATA (≤ 24h)\n• Violência contra a MULHER → + comunicação à POLÍCIA em 24h (Lei 13.931/2019)\n• Criança e adolescente → Conselho Tutelar (ECA)\n• Pessoa idosa → autoridade policial, MP e Conselhos do Idoso\n\n💡 E o acolhimento vem antes de tudo: ambiente reservado, sem julgamento, sem revitimização.",
  },

  {
    id: "aut-mental-07", eixo: "mental", sub: "Assistência domiciliar",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um paciente de 72 anos, em uso de ventilação mecânica domiciliar e traqueostomia, é acompanhado pelo programa Melhor em Casa. A família reside em domicílio com condições adequadas e há cuidador identificado e capacitado. Considerando as modalidades de Atenção Domiciliar (AD), esse paciente enquadra-se em",
    alts: [
      "AD 1, sob responsabilidade da equipe de atenção básica, por apresentar quadro estável.",
      "AD 2, sob responsabilidade da EMAD, por necessitar de cuidados de maior frequência.",
      "AD 3, sob responsabilidade da EMAD, por demandar equipamento de maior complexidade.",
      "AD 3, sob responsabilidade da atenção básica, desde que haja apoio da EMAP.",
      "não é elegível à atenção domiciliar, devendo permanecer internado em unidade hospitalar.",
    ],
    correta: 2,
    coment: "Gabarito: C. VENTILAÇÃO MECÂNICA domiciliar = equipamento de MAIOR complexidade = AD 3, sob responsabilidade da EMAD.\n\n💡 A RÉGUA DAS MODALIDADES — é complexidade e frequência:\n📌 AD 1 → menor complexidade · ATENÇÃO BÁSICA (equipe de Saúde da Família) · paciente estável, cuidado de menor frequência\n📌 AD 2 → maior complexidade · EMAD · cuidado mais frequente, curativos complexos, sondas\n📌 AD 3 → como a AD 2, PORÉM com EQUIPAMENTO DE MAIOR COMPLEXIDADE · EMAD · ex.: ventilação mecânica, diálise peritoneal, paracentese de repetição\n\n👉 Mnemônico: quanto MAIOR o número, MAIOR a tecnologia dentro de casa.\n\n💡 EMAD × EMAP: a EMAD (Equipe Multiprofissional de Atenção Domiciliar) é a responsável; a EMAP (Equipe Multiprofissional de APOIO) dá suporte — ela apoia, não assume.\n\n⚠️ POR QUE A ALTERNATIVA E ERRA: o enunciado entrega TODOS os requisitos de elegibilidade — estabilidade clínica, CUIDADOR IDENTIFICADO e capacitado, domicílio com condições adequadas. Ele É elegível.\n\n💡 OS REQUISITOS DA AD — decore, porque a banca inverte:\n✅ estabilidade clínica\n✅ CUIDADOR identificado (sem cuidador, NÃO há AD)\n✅ concordância da família\n✅ domicílio com condições mínimas\n\n💡 A RAZÃO CLÍNICA da AD: em casa, o paciente tem MENOS risco de infecção relacionada à assistência, mantém vínculo familiar e autonomia. Não é só economia — é desfecho melhor.",
  },

  {
    id: "aut-mental-08", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "facil",
    enunciado: "A Rede de Atenção Psicossocial (RAPS) organiza-se em componentes que substituem o modelo asilar por um cuidado comunitário. Sobre os pontos de atenção da RAPS, assinale a alternativa INCORRETA.",
    alts: [
      "Os Serviços Residenciais Terapêuticos (SRT) integram as estratégias de desinstitucionalização.",
      "Os leitos de saúde mental em hospital geral integram o componente de atenção hospitalar.",
      "As Unidades de Acolhimento compõem a atenção residencial de caráter transitório.",
      "O hospital psiquiátrico especializado constitui o principal ponto de atenção da rede.",
      "Os Centros de Convivência integram o componente da atenção básica em saúde.",
    ],
    correta: 3,
    coment: "Gabarito: D — é a INCORRETA (leia o comando!). O hospital psiquiátrico NÃO é o principal ponto da RAPS. A rede foi criada justamente para SUBSTITUIR o modelo asilar.\n\n💡 A LÓGICA DA RAPS EM UMA FRASE: substituir UM lugar (o manicômio, que concentrava tudo — moradia, tratamento, contenção) por uma REDE de serviços com funções distintas. A pessoa CIRCULA, em vez de ficar depositada.\n\n👉 É por isso que os leitos de saúde mental ficam em HOSPITAL GERAL, e não em hospital psiquiátrico: para que a crise psíquica seja tratada como qualquer outra crise de saúde, sem segregação.\n\n💡 OS COMPONENTES DA RAPS:\n📌 Atenção básica → UBS, ESF, Consultório na Rua, CENTROS DE CONVIVÊNCIA\n📌 Atenção psicossocial especializada → CAPS\n📌 Urgência e emergência → SAMU, UPA, portas hospitalares\n📌 Atenção residencial transitória → Unidades de Acolhimento\n📌 Atenção hospitalar → leitos em HOSPITAL GERAL\n📌 Desinstitucionalização → SRT + Programa DE VOLTA PARA CASA\n📌 Reabilitação psicossocial → geração de trabalho e renda, cooperativas\n\n⚠️ DICA DE PROVA: em questão com \"INCORRETA\", \"EXCETO\" ou \"NÃO\", sublinhe o comando antes de ler as alternativas. Errar por não ler a negativa é o erro mais burro e mais comum da prova.\n\n💡 A Lei 10.216/2001 é explícita: é VEDADA a internação em instituições com características asilares.",
  },

  {
    id: "aut-mental-09", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Durante um plantão em unidade de emergência, um paciente em surto psicótico torna-se agressivo, desfere golpes contra a equipe e não responde a nenhuma tentativa de manejo verbal ou ambiental. A equipe decide pela contenção mecânica. Considerando a Resolução COFEN nº 746/2024, assinale a afirmativa correta.",
    alts: [
      "A contenção pode ser realizada por qualquer profissional da equipe, desde que registrada em prontuário.",
      "A aplicação da contenção mecânica se dará sob supervisão direta do enfermeiro, devendo ser o único meio disponível para prevenir dano imediato ou iminente.",
      "A contenção mecânica é indicada preventivamente em pacientes com histórico de agitação, independentemente do quadro atual.",
      "A duração da contenção deve ser de no mínimo 24 horas, para garantir a estabilização do quadro.",
      "A contenção mecânica pode ser empregada por conveniência da equipe quando houver déficit de pessoal no plantão.",
    ],
    correta: 1,
    coment: "Gabarito: B. Pela Resolução COFEN nº 746/2024, a contenção se dá sob SUPERVISÃO DIRETA DO ENFERMEIRO e só quando for o ÚNICO MEIO disponível para prevenir dano imediato ou iminente ao paciente ou aos demais.\n\n⚠️ ATUALIZAÇÃO IMPORTANTE: a Resolução 746/2024 REVOGOU a antiga 427/2012 e está em vigor desde 03/04/2024. Se seu material cita a 427 como vigente, está desatualizado.\n\n💡 O QUE MUDOU na 746/2024:\n• Estendeu a norma ao SERVIÇO PRÉ-HOSPITALAR MÓVEL (ambulâncias, motolâncias, ambulanchas)\n• Na EXCEPCIONALIDADE do pré-hospitalar, profissionais capacitados podem realizar com no mínimo 5 PESSOAS\n• Reforçou o registro em prontuário: razões, duração, avaliações e eventos adversos\n\n💡 O QUE PERMANECE — e é o coração da norma:\n📌 ÚNICO MEIO disponível (último recurso)\n📌 Supervisão DIRETA do enfermeiro\n📌 Monitoramento contínuo pela equipe\n📌 VEDADO para disciplina, punição, coerção ou CONVENIÊNCIA da instituição/equipe\n📌 Nunca prolongada além do estritamente necessário\n\n⚠️ AS ARMADILHAS: a alternativa C propõe contenção PREVENTIVA (proibida — exige risco atual), a D crava 24h (não existe tempo mínimo; existe o menor tempo possível) e a E fala em CONVENIÊNCIA da equipe (expressamente vedada).\n\n💡 A base constitucional está no art. 5º, III: 'ninguém será submetido a tortura nem a tratamento desumano ou degradante'.",
  },

  {
    id: "aut-mental-10", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A Lei nº 10.216/2001 assegura direitos às pessoas com transtornos mentais. Sobre esses direitos, assinale a alternativa que NÃO corresponde ao previsto na referida lei.",
    alts: [
      "Ter acesso ao melhor tratamento do sistema de saúde, consentâneo às suas necessidades.",
      "Ser tratada com humanidade e respeito, no interesse exclusivo de beneficiar sua saúde.",
      "Ter livre acesso aos meios de comunicação disponíveis.",
      "Ser tratada, preferencialmente, em instituição hospitalar especializada de longa permanência.",
      "Receber o maior número de informações a respeito de sua doença e de seu tratamento.",
    ],
    correta: 3,
    coment: "Gabarito: D — é a que NÃO corresponde (leia o comando!). A lei garante tratamento preferencialmente em SERVIÇOS COMUNITÁRIOS de saúde mental — exatamente o OPOSTO de instituição de longa permanência.\n\n💡 A LÓGICA DA LEI 10.216: ela redireciona o modelo assistencial do ASILAR para o COMUNITÁRIO. Toda alternativa que empurre o paciente para o hospital psiquiátrico de longa permanência contraria o espírito da norma.\n\n👉 A lei é explícita: é VEDADA a internação em instituições com características asilares.\n\n💡 OS DIREITOS GARANTIDOS (art. 2º, parágrafo único) — todos os outros da questão estão lá:\n📌 Acesso ao MELHOR tratamento do sistema de saúde\n📌 Tratamento com HUMANIDADE e RESPEITO, no interesse EXCLUSIVO de beneficiar sua saúde\n📌 Proteção contra qualquer forma de ABUSO e EXPLORAÇÃO\n📌 Garantia de SIGILO nas informações prestadas\n📌 Direito à presença médica para esclarecer a necessidade da internação\n📌 LIVRE ACESSO aos meios de COMUNICAÇÃO\n📌 Receber o MAIOR NÚMERO de informações sobre sua doença e tratamento\n📌 Ser tratada em ambiente terapêutico pelos meios MENOS INVASIVOS possíveis\n📌 Ser tratada, PREFERENCIALMENTE, em SERVIÇOS COMUNITÁRIOS\n\n💡 E a finalidade permanente do tratamento, segundo a lei: a REINSERÇÃO SOCIAL do paciente em seu meio.\n\n⚠️ DICA: em questão com 'NÃO', 'INCORRETA' ou 'EXCETO', marque o comando antes de ler. É o erro mais evitável da prova.",
  },

  {
    id: "aut-mental-11", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um paciente de 40 anos, em acompanhamento no CAPS, apresenta há três semanas humor eufórico, aceleração do pensamento, redução da necessidade de sono, gastos excessivos e sensação de grandiosidade. Há registro de episódio depressivo grave há dois anos. O quadro descrito é compatível com",
    alts: [
      "episódio depressivo maior com sintomas atípicos.",
      "transtorno de ansiedade generalizada em fase aguda.",
      "episódio maníaco no contexto de transtorno afetivo bipolar.",
      "transtorno de personalidade histriônica descompensado.",
      "esquizofrenia em fase produtiva com sintomas positivos.",
    ],
    correta: 2,
    coment: "Gabarito: C. O enunciado descreve um EPISÓDIO MANÍACO clássico: humor eufórico, taquipsiquismo (aceleração do pensamento), REDUÇÃO DA NECESSIDADE DE SONO, gastos excessivos (comportamento de risco) e grandiosidade. Somado ao episódio DEPRESSIVO prévio → TRANSTORNO AFETIVO BIPOLAR.\n\n💡 A CHAVE DO DIAGNÓSTICO: bipolar exige a ALTERNÂNCIA entre polos. O enunciado entrega os dois — mania agora + depressão há dois anos. Sem o episódio prévio, seria só um episódio maníaco.\n\n💡 O SINAL MAIS ESPECÍFICO DA MANIA: 'REDUÇÃO DA NECESSIDADE de sono' — repare que não é insônia! Na insônia, a pessoa quer dormir e não consegue, e acorda exausta. Na mania, ela dorme 3 horas e acorda DISPOSTA. Essa diferença é o que separa mania de ansiedade — e a banca sabe disso.\n\n⚠️ POR QUE NÃO ESQUIZOFRENIA (E): faltam os sintomas cardinais — delírio, alucinação, discurso desorganizado. Euforia e grandiosidade não são sintomas positivos de esquizofrenia; são de mania. (Existe grandiosidade delirante na mania grave, mas o quadro central aqui é o humor.)\n\n💡 CUIDADOS DE ENFERMAGEM NA MANIA:\n• Ambiente com POUCA estimulação (luz, ruído, movimento)\n• Vigiar risco de exaustão física — o paciente não para e não percebe cansaço\n• Proteger de decisões de risco (gastos, exposição, dirigir)\n• Oferecer alimentos práticos, de fácil consumo — ele não senta para comer\n• Atenção à adesão medicamentosa: na euforia, ele se sente ÓTIMO e abandona o remédio\n\n💡 O paradoxo do bipolar: a fase que ele mais gosta é a que mais o destrói.",
  },

  {
    id: "aut-mental-12", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "facil",
    enunciado: "A comunicação terapêutica é ferramenta essencial da enfermagem em saúde mental. Sobre as técnicas de comunicação terapêutica, assinale a alternativa correta.",
    alts: [
      "Oferecer conselhos e soluções prontas demonstra acolhimento e reduz a angústia do paciente.",
      "O uso do silêncio deve ser evitado, pois transmite desinteresse e desconforto ao paciente.",
      "Perguntas abertas favorecem a expressão do paciente e ampliam a compreensão do seu sofrimento.",
      "Frases como 'não se preocupe, vai dar tudo certo' validam os sentimentos e fortalecem o vínculo.",
      "Mudar de assunto diante de temas difíceis protege o paciente de sofrimento adicional.",
    ],
    correta: 2,
    coment: "Gabarito: C. Perguntas ABERTAS ('como você tem se sentido?') permitem que a pessoa conduza e se expresse. Perguntas fechadas ('você está bem?') só rendem sim ou não — e fecham a conversa.\n\n💡 POR QUE AS OUTRAS SÃO BLOQUEIOS DE COMUNICAÇÃO — e todas têm nome:\n📌 A — ACONSELHAR: dar solução pronta tira a autonomia e passa a mensagem 'seu problema é simples, é só fazer isso'. Quem aconselha fala; quem escuta, ajuda.\n📌 B — o SILÊNCIO é técnica terapêutica, não falha! Ele dá tempo para a pessoa organizar o pensamento e sinaliza que você não tem pressa. Quem preenche todo silêncio está confortando a si mesmo, não ao outro.\n📌 D — TRANQUILIZAÇÃO FALSA: 'vai dar tudo certo' é a frase que mais encerra conversa em saúde mental. Ela INVALIDA o sentimento ('você não deveria estar sofrendo') e ainda promete algo que você não pode garantir.\n📌 E — MUDAR DE ASSUNTO: comunica 'não quero ouvir isso'. Protege o profissional, não o paciente.\n\n💡 AS TÉCNICAS TERAPÊUTICAS DE VERDADE:\n• Escuta ativa · Perguntas abertas · Silêncio · Validação ('faz sentido você se sentir assim')\n• Reflexão ('você disse que se sente sozinha...') · Clarificação ('me ajuda a entender melhor')\n• Verbalizar a aceitação e demonstrar presença\n\n💡 BIZU DA PROVA: a alternativa correta em comunicação terapêutica quase sempre ESCUTA. As erradas FALAM — aconselham, tranquilizam, julgam, mudam de assunto.",
  },

  {
    id: "aut-mental-13", eixo: "mental", sub: "Situação de risco e violência",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Uma adolescente de 15 anos chega à unidade de saúde acompanhada da mãe, relatando violência sexual ocorrida há 20 horas. Sobre as condutas iniciais do serviço, assinale a alternativa correta.",
    alts: [
      "O atendimento deve ser condicionado à apresentação de boletim de ocorrência e laudo do IML.",
      "A profilaxia pós-exposição (PEP) para o HIV deve ser iniciada, pois o atendimento ocorre dentro da janela de 72 horas, com duração de 28 dias.",
      "A contracepção de emergência é contraindicada em adolescentes menores de 18 anos.",
      "A notificação ao SINAN deve ser realizada em até 7 dias, conforme prazo geral da lista de notificação compulsória.",
      "A profilaxia para sífilis só deve ser realizada após resultado reagente do teste rápido.",
    ],
    correta: 1,
    coment: "Gabarito: B. A PEP tem limite de 72 HORAS e duração de 28 DIAS. O atendimento ocorreu em 20 horas — dentro da janela. Esquema preferencial: TDF/3TC + DTG.\n\n💡 POR QUE 72 HORAS É LIMITE RÍGIDO: a PEP funciona bloqueando a replicação viral ANTES que o vírus se estabeleça nos reservatórios do organismo. Passada a janela, a infecção já se ancorou — e o antirretroviral profilático perde a razão de ser. Por isso o atendimento é URGÊNCIA: cada hora conta.\n\n⚠️ POR QUE AS OUTRAS ERRAM — e a alternativa A é a mais grave:\n📌 A → **BARREIRA ILEGAL**. NÃO se exige boletim de ocorrência, laudo do IML nem autorização judicial para atendimento à vítima de violência sexual no SUS. Nem para as profilaxias, nem para o aborto legal. Exigir isso é revitimizar.\n📌 C → contracepção de emergência NÃO é contraindicada por idade. Levonorgestrel, o mais precoce possível.\n📌 D → violência SEXUAL é notificação **IMEDIATA (≤ 24h)**, não semanal. E, sendo adolescente, comunica-se também o CONSELHO TUTELAR (ECA).\n📌 E → a profilaxia da sífilis (penicilina benzatina 2,4 milhões UI, IM, dose única) é feita INDEPENDENTEMENTE do teste rápido. Não se espera resultado.\n\n💡 O PACOTE DAS PRIMEIRAS HORAS:\n✅ Acolhimento humanizado, ambiente reservado, sem julgamento\n✅ Contracepção de emergência (até 72h, quanto antes melhor)\n✅ PEP para HIV (até 72h, por 28 dias)\n✅ Profilaxia de IST: penicilina benzatina + demais conforme protocolo\n✅ Profilaxia de hepatite B (vacina + imunoglobulina em suscetíveis)\n✅ Notificação IMEDIATA no SINAN + Conselho Tutelar (menor de 18)\n✅ Informar sobre o direito ao aborto legal, se houver gravidez",
  },

  {
    id: "aut-mental-14", eixo: "mental", sub: "Pessoa com deficiência",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "facil",
    enunciado: "Um homem cadeirante comparece à unidade de saúde acompanhado de sua esposa. Durante a consulta, a enfermeira dirige todas as perguntas à acompanhante, referindo-se ao usuário em terceira pessoa. Essa conduta configura",
    alts: [
      "barreira urbanística, por dificultar o acesso ao serviço de saúde.",
      "barreira arquitetônica, relacionada à estrutura do estabelecimento.",
      "barreira atitudinal, por presumir a incapacidade do usuário e desrespeitar sua autonomia.",
      "barreira tecnológica, por não utilizar recursos de comunicação alternativa.",
      "conduta adequada, uma vez que o acompanhante pode fornecer informações mais precisas.",
    ],
    correta: 2,
    coment: "Gabarito: C. Falar com o acompanhante em vez de falar com a pessoa é o exemplo clássico de BARREIRA ATITUDINAL — a barreira do COMPORTAMENTO, do preconceito, de presumir incapacidade.\n\n💡 A LÓGICA: o homem é cadeirante — tem impedimento de LOCOMOÇÃO, não de comunicação nem de cognição. A enfermeira transferiu para a esposa uma autonomia que é dele. Isso o infantiliza.\n\n👉 A barreira atitudinal é a mais cruel justamente porque é INVISÍVEL. Rampa a gente vê que falta. Já o olhar que presume incapacidade não aparece em relatório nenhum — mas humilha todo dia.\n\n💡 OS TIPOS DE BARREIRA (LBI, Lei 13.146/2015):\n📌 URBANÍSTICAS → vias, praças, mobiliário urbano\n📌 ARQUITETÔNICAS → edifícios\n📌 NOS TRANSPORTES → veículos e sistemas\n📌 NAS COMUNICAÇÕES → ausência de Libras, material sem acessibilidade\n📌 **ATITUDINAIS** → comportamentos e atitudes que prejudicam a participação (a favorita da banca)\n📌 TECNOLÓGICAS → acesso à tecnologia\n\n💡 CONDUTAS CORRETAS que caem em prova:\n✅ Fale DIRETAMENTE com a pessoa, olhando para ela — mesmo que haja intérprete\n✅ PERGUNTE antes de ajudar. Empurrar a cadeira sem pedir licença é desrespeito à autonomia\n✅ Ao conversar com cadeirante por mais tempo, sente-se para ficar na mesma altura\n✅ A cadeira de rodas é EXTENSÃO DO CORPO — não se apoie nela\n✅ A pessoa tem direito a acompanhante ou atendente pessoal nos serviços de saúde\n\n⚠️ E lembre: a deficiência NÃO afeta a plena capacidade civil.",
  },

  {
    id: "aut-mental-15", eixo: "mental", sub: "Assistência domiciliar",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a Atenção Domiciliar (AD) no âmbito do SUS, no contexto do programa Melhor em Casa, assinale a afirmativa correta.",
    alts: [
      "A elegibilidade do paciente independe da existência de cuidador, cabendo à equipe suprir integralmente essa função.",
      "A modalidade AD 1 é de responsabilidade da Equipe Multiprofissional de Atenção Domiciliar (EMAD).",
      "São requisitos para a AD a estabilidade clínica, a presença de cuidador identificado e a concordância da família.",
      "Pacientes em estado crítico e instabilidade hemodinâmica são elegíveis, desde que haja suporte da EMAP.",
      "A Equipe Multiprofissional de Apoio (EMAP) é a responsável direta pelas modalidades AD 2 e AD 3.",
    ],
    correta: 2,
    coment: "Gabarito: C. Os requisitos da AD: ESTABILIDADE CLÍNICA + CUIDADOR IDENTIFICADO + CONCORDÂNCIA DA FAMÍLIA + domicílio com condições mínimas.\n\n💡 POR QUE O CUIDADOR É INEGOCIÁVEL: a equipe VISITA, não mora. Entre uma visita e outra, alguém precisa administrar medicação, trocar decúbito, observar sinais de alarme e chamar ajuda. SEM CUIDADOR, NÃO HÁ AD — a alternativa A inverte isso completamente.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 B → AD 1 é da ATENÇÃO BÁSICA (equipe de Saúde da Família), não da EMAD\n📌 D → paciente CRÍTICO e INSTÁVEL **NÃO** é elegível. AD exige estabilidade. É a pegadinha mais comum do tema.\n📌 E → a EMAP **APOIA**; quem é responsável pelas AD 2 e AD 3 é a **EMAD**\n\n💡 A ESCADA DAS MODALIDADES:\n📌 AD 1 → atenção básica · paciente estável, menor frequência\n📌 AD 2 → EMAD · maior frequência, curativos complexos, sondas\n📌 AD 3 → EMAD · equipamento de MAIOR complexidade (ventilação mecânica, diálise peritoneal)\n\n💡 A RAZÃO CLÍNICA DA AD — e não é só economia: em casa, o paciente tem MENOS risco de infecção relacionada à assistência, mantém vínculo familiar e autonomia, e a família é incorporada ao cuidado. O desfecho costuma ser melhor.\n\n💡 BIZU: EMAD = D de Direta (responsável). EMAP = P de aPoio.",
  },

  {
    id: "aut-mental-16", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "A Reforma Psiquiátrica Brasileira consolidou-se com a Lei nº 10.216/2001, resultado de um movimento social iniciado décadas antes. Sobre esse processo, assinale a alternativa correta.",
    alts: [
      "A Lei nº 10.216/2001 determinou o fechamento imediato de todos os hospitais psiquiátricos do país.",
      "A lei redireciona o modelo assistencial em saúde mental e prevê a substituição progressiva dos leitos em hospitais psiquiátricos por uma rede de serviços comunitários.",
      "O movimento da Reforma Psiquiátrica teve origem exclusivamente na iniciativa do Poder Executivo federal, sem participação da sociedade civil.",
      "A internação psiquiátrica foi proibida em qualquer circunstância pela referida lei.",
      "A lei estabelece que o tratamento tem como finalidade permanente a contenção dos sintomas, sem previsão de reinserção social.",
    ],
    correta: 1,
    coment: "Gabarito: B. A lei REDIRECIONA o modelo assistencial e prevê a substituição PROGRESSIVA dos leitos psiquiátricos por uma rede de serviços comunitários.\n\n💡 A PALAVRA-CHAVE É **PROGRESSIVA** — e é aí que a banca separa quem entendeu de quem decorou. A lei NÃO fechou manicômio da noite para o dia. Fechar sem construir a rede seria abandonar pessoas na rua. A substituição é gradual: à medida que os CAPS, os SRT e o De Volta Para Casa se estruturam, os leitos asilares vão sendo desativados.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 A → 'fechamento IMEDIATO de TODOS' — falso. É progressiva.\n📌 C → **erro histórico grave**: a Reforma nasceu do MOVIMENTO DOS TRABALHADORES EM SAÚDE MENTAL e da sociedade civil, no fim dos anos 1970. O projeto de lei é de 1989 (Paulo Delgado) e levou 12 ANOS até virar lei em 2001. Foi luta social, não iniciativa de gabinete.\n📌 D → a internação NÃO foi proibida! Ela é o ÚLTIMO recurso — indicada quando os meios extra-hospitalares se mostrarem insuficientes. O que é VEDADO é a internação em instituição com características ASILARES.\n📌 E → inverte a finalidade: a lei diz que o tratamento visará, como FINALIDADE PERMANENTE, a REINSERÇÃO SOCIAL do paciente em seu meio.\n\n💡 MARCOS QUE CAEM: Movimento dos Trabalhadores em Saúde Mental (1978) · Conferência de Caracas (1990) · PL Paulo Delgado (1989) · Lei 10.216 (2001) · Portaria RAPS 3.088 (2011).\n\n💡 BIZU: em questão de Reforma Psiquiátrica, alternativa com 'imediato', 'todos' ou 'proibido em qualquer circunstância' costuma ser a errada. A reforma é gradual e a internação existe — só mudou de lugar (hospital geral) e de lógica.",
  },

  {
    id: "aut-mental-17", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um usuário do CAPS AD, em tratamento por dependência de álcool, comparece ao serviço tremendo, sudoreico, taquicárdico, referindo náuseas e ansiedade intensa. Relata ter interrompido o consumo há aproximadamente 24 horas. O quadro descrito sugere",
    alts: [
      "intoxicação alcoólica aguda, devendo-se aguardar a metabolização espontânea.",
      "síndrome de abstinência alcoólica, quadro que pode evoluir para convulsões e delirium tremens.",
      "reação adversa a medicamento, devendo-se suspender toda a terapêutica em curso.",
      "transtorno de ansiedade generalizada, sem relação com a interrupção do consumo.",
      "simulação de sintomas com o objetivo de obter benefício secundário no serviço.",
    ],
    correta: 1,
    coment: "Gabarito: B. Tremor, sudorese, taquicardia, náusea e ansiedade após INTERRUPÇÃO do consumo = SÍNDROME DE ABSTINÊNCIA ALCOÓLICA (SAA).\n\n💡 A LINHA DO TEMPO — e o enunciado entrega (24 horas):\n📌 6–12h → sintomas leves: tremor, sudorese, ansiedade, náusea, taquicardia\n📌 12–24h → pode surgir alucinose alcoólica\n📌 **24–48h → risco de CONVULSÕES**\n📌 48–72h → **DELIRIUM TREMENS** — a forma mais grave, com confusão, alucinações, agitação intensa e instabilidade autonômica. Tem MORTALIDADE significativa.\n\n👉 O paciente está em 24h. Ele está entrando na janela de RISCO — não é quadro para 'observar e ver no que dá'.\n\n⚠️ POR QUE A ALTERNATIVA A É PERIGOSA: 'intoxicação' é o oposto — é ter álcool no corpo. Aqui o problema é a AUSÊNCIA dele. E 'aguardar metabolização espontânea' num paciente em abstinência é aguardar a convulsão.\n\n⚠️ E A ALTERNATIVA E é a mais violenta: presumir SIMULAÇÃO em usuário de álcool é estigma puro. É exatamente o preconceito que a RAPS combate — e a banca coloca isso justamente para ver quem morde.\n\n💡 O TRATAMENTO — e a lógica é elegante: usa-se BENZODIAZEPÍNICO (diazepam), porque ele age no MESMO receptor GABA que o álcool ocupava. Ele 'substitui' o álcool de forma controlada e permite a retirada gradual, sem o cérebro entrar em colapso.\n\n💡 E a TIAMINA (vitamina B1) é obrigatória — e ANTES da glicose! Administrar glicose sem tiamina em etilista crônico pode precipitar a ENCEFALOPATIA DE WERNICKE. Guarde: tiamina primeiro, glicose depois.",
  },

  {
    id: "aut-mental-18", eixo: "mental", sub: "Situação de risco e violência",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "facil",
    enunciado: "A Lei nº 11.340/2006 (Lei Maria da Penha) tipifica as formas de violência doméstica e familiar contra a mulher. São elas:",
    alts: [
      "física, psicológica, sexual, patrimonial e moral.",
      "física, psicológica, sexual, institucional e simbólica.",
      "física, sexual, moral, estrutural e patrimonial.",
      "física, psicológica, sexual, moral e obstétrica.",
      "física, psicológica, patrimonial, moral e digital.",
    ],
    correta: 0,
    coment: "Gabarito: A. As CINCO formas: FÍSICA, PSICOLÓGICA, SEXUAL, PATRIMONIAL e MORAL.\n\n💡 MNEMÔNICO: **'FÍSICA PSICO SEXO PATRI MORAL'** — ou pense que a violência atinge o CORPO (física), a MENTE (psicológica), a INTIMIDADE (sexual), o BOLSO (patrimonial) e o NOME (moral).\n\n💡 A MAIS ESQUECIDA É A PATRIMONIAL — e por isso é a que a banca mais tira da lista. Ela é reter, subtrair ou destruir bens, documentos, instrumentos de trabalho ou recursos econômicos. Na prática: esconder o cartão, rasgar o diploma, quebrar o celular, controlar todo o dinheiro. É violência, e muita mulher não sabe.\n\n⚠️ AS ARMADILHAS DESTA QUESTÃO: 'institucional', 'simbólica', 'estrutural', 'obstétrica' e 'digital' são conceitos que EXISTEM e são discutidos — mas NÃO estão entre as cinco formas tipificadas na Maria da Penha. A banca mistura o que é real com o que é da lei.\n\n💡 DEFINIÇÕES QUE CAEM:\n📌 FÍSICA → ofende a integridade ou saúde corporal\n📌 PSICOLÓGICA → dano emocional, humilhação, ameaça, isolamento, vigilância constante\n📌 SEXUAL → constranger a presenciar, manter ou participar de relação sexual não desejada\n📌 PATRIMONIAL → reter, subtrair, destruir bens e recursos\n📌 MORAL → calúnia, difamação ou injúria\n\n💡 E lembre da conduta: notificação COMPULSÓRIA (independe da vontade dela) + comunicação à autoridade policial em 24h (Lei 13.931/2019).",
  },

  {
    id: "aut-mental-19", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "O Projeto Terapêutico Singular (PTS) é instrumento central do cuidado em saúde mental. Sobre o PTS, assinale a alternativa correta.",
    alts: [
      "É elaborado exclusivamente pelo profissional de nível superior de referência, sem participação da equipe.",
      "Constitui documento padronizado, aplicável de forma idêntica a usuários com o mesmo diagnóstico.",
      "É construído de forma compartilhada com o usuário e sua rede de apoio, considerando sua singularidade.",
      "Sua finalidade é estabelecer prescrições médicas de longo prazo, dispensando reavaliações.",
      "Deve ser mantido em sigilo do usuário, para não interferir na sua adesão ao tratamento.",
    ],
    correta: 2,
    coment: "Gabarito: C. O PTS é construído COM o usuário e sua rede de apoio, respeitando sua SINGULARIDADE. A palavra está no nome: SINGULAR.\n\n💡 A LÓGICA DO NOME resolve a questão inteira:\n📌 **PROJETO** → tem objetivo, é construído, olha para frente\n📌 **TERAPÊUTICO** → visa o cuidado\n📌 **SINGULAR** → é ÚNICO para aquela pessoa. Duas pessoas com o mesmo diagnóstico têm PTS DIFERENTES, porque têm histórias, redes, desejos e possibilidades diferentes.\n\n👉 Isso mata a alternativa B: se fosse padronizado por diagnóstico, seria 'plural', não 'singular'.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 A → o PTS é construção da EQUIPE MULTIPROFISSIONAL, não de um profissional isolado\n📌 D → não é prescrição médica; e exige REAVALIAÇÃO periódica (as necessidades mudam)\n📌 E → **absurdo ético**: manter em sigilo DO PRÓPRIO usuário o projeto que é DELE? O PTS é construído COM ele, discutido COM ele. Ele é protagonista, não objeto.\n\n💡 OS 4 MOMENTOS DO PTS:\n1. **Diagnóstico** → avaliação orgânica, psicológica e social; entender o sujeito no contexto\n2. **Definição de metas** → propostas de curto, médio e longo prazo, negociadas COM o usuário\n3. **Divisão de responsabilidades** → quem faz o quê, incluindo o profissional de REFERÊNCIA\n4. **Reavaliação** → discutir a evolução e corrigir o rumo\n\n💡 O PROFISSIONAL DE REFERÊNCIA é quem acompanha mais de perto aquele usuário — e pode ser de QUALQUER categoria, não necessariamente o médico. É quem tem melhor vínculo.\n\n💡 BIZU: em questão de PTS, a correta sempre tem 'com o usuário', 'singular', 'equipe', 'reavaliação'. As erradas trazem 'padronizado', 'exclusivamente', 'sem participação'.",
  },

  {
    id: "aut-mental-20", eixo: "mental", sub: "Saúde mental",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre as estratégias de desinstitucionalização previstas na Rede de Atenção Psicossocial (RAPS), assinale a alternativa correta.",
    alts: [
      "Os Serviços Residenciais Terapêuticos (SRT) são unidades hospitalares de longa permanência destinadas a pacientes crônicos.",
      "O Programa De Volta Para Casa institui auxílio-reabilitação psicossocial para pessoas egressas de longas internações psiquiátricas.",
      "As Unidades de Acolhimento destinam-se à internação compulsória de usuários de álcool e outras drogas.",
      "A desinstitucionalização consiste na simples desativação dos leitos psiquiátricos, sem necessidade de serviços substitutivos.",
      "Os SRT devem ser localizados dentro do perímetro de hospitais psiquiátricos, para facilitar o acompanhamento clínico.",
    ],
    correta: 1,
    coment: "Gabarito: B. O Programa De Volta Para Casa (Lei nº 10.708/2003) institui o AUXÍLIO-REABILITAÇÃO PSICOSSOCIAL para pessoas egressas de LONGAS internações psiquiátricas.\n\n💡 A LÓGICA DO PROGRAMA — e é comovente: pessoas que passaram 20, 30 anos internadas perderam tudo — vínculos, documentos, casa, capacidade de se sustentar. Devolver a liberdade sem devolver a CONDIÇÃO MATERIAL de viver é jogar na rua. O auxílio é a ponte entre o manicômio e a vida.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 A → **SRT NÃO é hospital**! É MORADIA — casa, no meio da cidade, na comunidade. Se fosse unidade hospitalar de longa permanência, seria... o manicômio de novo, com outro nome.\n📌 C → Unidades de Acolhimento são de caráter TRANSITÓRIO e VOLUNTÁRIO. 'Internação compulsória' contraria toda a lógica da RAPS.\n📌 D → **este é o erro conceitual mais grave**: desinstitucionalizar NÃO é simplesmente fechar leito. É construir a rede que substitui. Fechar sem substituir não é reforma — é abandono. Foi o que aconteceu em países que erraram a mão.\n📌 E → SRT dentro de hospital psiquiátrico é uma contradição em termos. A casa tem que estar na CIDADE, no bairro, entre vizinhos.\n\n💡 AS ESTRATÉGIAS DE DESINSTITUCIONALIZAÇÃO:\n📌 **SRT** → moradias na comunidade para egressos de longa internação sem suporte familiar\n📌 **Programa De Volta Para Casa** → auxílio-reabilitação psicossocial\n\n💡 O CONCEITO QUE A BANCA COBRA: desinstitucionalização ≠ desospitalização. Desospitalizar é tirar do hospital. DESINSTITUCIONALIZAR é desmontar a LÓGICA manicomial — a tutela, a anulação do sujeito, a vida governada por outros. Dá para estar fora do hospital e ainda institucionalizado.",
  },

{
    id: "aut-doencas-01", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Uma paciente de 28 anos é diagnosticada com hanseníase e classificada como paucibacilar (3 lesões, 1 tronco nervoso acometido). Considerando o esquema terapêutico atualmente preconizado pelo Ministério da Saúde, é correto afirmar que o tratamento",
    alts: [
      "será feito com rifampicina e dapsona por 6 meses, sem uso de clofazimina, por se tratar de forma paucibacilar.",
      "será feito com poliquimioterapia única (PQT-U) — rifampicina, dapsona e clofazimina — em 6 doses supervisionadas.",
      "será feito com poliquimioterapia única (PQT-U) em 12 doses supervisionadas, independentemente da classificação operacional.",
      "deve ser iniciado somente após confirmação por baciloscopia positiva.",
      "exige isolamento respiratório da paciente durante todo o período de tratamento.",
    ],
    correta: 1,
    coment: "Gabarito: B. Desde julho de 2021, o Brasil adota a POLIQUIMIOTERAPIA ÚNICA (PQT-U): rifampicina + dapsona + CLOFAZIMINA para TODOS os pacientes, PB e MB. A ÚNICA diferença é a duração — PB: 6 doses; MB: 12 doses.\n\n⚠️ ATUALIZAÇÃO QUE DERRUBA MATERIAL ANTIGO: a alternativa A é o esquema ANTIGO (PB sem clofazimina, só rifampicina + dapsona). Se seu material ensina isso, está desatualizado.\n\n💡 POR QUE UNIFICARAM — e o motivo é elegante: erros de classificação faziam pacientes MULTIBACILARES (com mais bacilos) serem tratados como PAUCIBACILARES, ou seja, com esquema mais fraco. Dando as três drogas para todos, esse erro deixa de custar caro. Padroniza e protege.\n\n💡 A CLASSIFICAÇÃO OPERACIONAL:\n📌 PAUCIBACILAR (PB) → até 5 lesões e/ou 1 tronco nervoso → 6 doses (podendo estender a 9 meses)\n📌 MULTIBACILAR (MB) → mais de 5 lesões e/ou 2 ou mais troncos → 12 doses (podendo estender a 18 meses)\n\n👉 A cada 28 dias o paciente comparece à unidade para a dose supervisionada e nova cartela.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n• C → 12 doses é MB; a paciente é PB (3 lesões, 1 tronco)\n• D → **erro grave**: o diagnóstico da hanseníase é essencialmente CLÍNICO. Não se espera baciloscopia — ela pode ser negativa em PB e isso não exclui a doença!\n• E → hanseníase NÃO exige isolamento. E, a partir da PRIMEIRA DOSE, o paciente deixa de transmitir.\n\n💡 OS SINAIS CARDINAIS (basta UM): lesão de pele com ALTERAÇÃO DE SENSIBILIDADE · espessamento de nervo periférico com alteração sensitiva/motora/autonômica · baciloscopia positiva.\n\n💡 A sensibilidade se perde nesta ordem: TÉRMICA → DOLOROSA → TÁTIL.",
  },

  {
    id: "aut-doencas-02", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a Infecção Latente pelo Mycobacterium tuberculosis (ILTB) e seu tratamento preventivo (TPT), assinale a alternativa correta.",
    alts: [
      "A pessoa com ILTB transmite o bacilo e deve ser mantida em precaução por aerossóis.",
      "O tratamento da ILTB é realizado com o esquema RIPE por seis meses.",
      "O esquema 3HP consiste em rifapentina associada à isoniazida, administradas semanalmente por 12 semanas.",
      "O tratamento preventivo pode ser iniciado sem a necessidade de excluir tuberculose ativa.",
      "A prova tuberculínica é o único método aceito para o diagnóstico da ILTB no SUS.",
    ],
    correta: 2,
    coment: "Gabarito: C. O 3HP é rifapentina + isoniazida, 1 VEZ POR SEMANA, por 12 SEMANAS (3 meses). É hoje o esquema PREFERENCIAL de tratamento preventivo, disponível no SUS desde 2021.\n\n💡 TRADUZA A SIGLA E NUNCA MAIS ERRE: **3HP** = **3** meses · **H** de isoniazida (hidrazida) · **P** de rifapentina. Uma dose SEMANAL.\n\n💡 POR QUE O 3HP VIROU PREFERENCIAL: o problema do TPT nunca foi eficácia — foi ADESÃO. Ninguém termina 6 a 9 meses de comprimido diário estando ASSINTOMÁTICO. O 3HP resolve pela logística: 12 doses, uma por semana, três meses. Menos tempo, menos dose, mais gente curada.\n\n⚠️ POR QUE AS OUTRAS ERRAM — e a A é a mais importante:\n📌 A → **ILTB NÃO TRANSMITE!** A pessoa está infectada, mas sem doença ativa: sem sintoma, sem bacilo eliminado. Não precisa de precaução nem isolamento. Confundir ILTB com TB ativa é o erro nº 1 do tema.\n📌 B → RIPE é para TB **ATIVA**. ILTB usa TPT (3HP, 4R ou isoniazida).\n📌 D → **é OBRIGATÓRIO excluir TB ativa antes**! Tratar doença ativa com esquema de latente (que tem menos drogas) gera RESISTÊNCIA.\n📌 E → além da prova tuberculínica (PT), o **IGRA** foi incorporado ao SUS — especialmente para imunocomprometidos.\n\n💡 OS ESQUEMAS DE TPT:\n📌 **3HP** (preferencial) → rifapentina + isoniazida · 1x/semana · 12 semanas\n📌 **4R** → rifampicina diária · 4 meses\n📌 **Isoniazida (TPI)** → diária · 6 a 9 meses (o clássico)\n\n💡 PONTO DE OURO PARA O ENFERMEIRO: a **Nota Informativa nº 4/2024 do MS** traz recomendações técnicas AOS ENFERMEIROS para indicar o TPT e conduzir o rastreio da ILTB. É atribuição da enfermagem.",
  },

  {
    id: "aut-doencas-03", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um homem de 45 anos comparece à unidade de saúde no 5º dia de doença, com febre em remissão, referindo dor abdominal intensa e contínua e vômitos persistentes. Ao exame, apresenta hepatomegalia a 3 cm do rebordo costal. Considerando o manual de manejo clínico da dengue do Ministério da Saúde, o paciente deve ser classificado no grupo",
    alts: [
      "A, devendo receber hidratação oral em domicílio.",
      "B, devendo permanecer na unidade até o resultado do hemograma.",
      "C, devendo receber hidratação venosa imediata e ser internado.",
      "D, devendo ser encaminhado à unidade de terapia intensiva.",
      "B, uma vez que a remissão da febre indica melhora do quadro.",
    ],
    correta: 2,
    coment: "Gabarito: C. O enunciado entrega TRÊS sinais de alarme: dor abdominal intensa e contínua, vômitos persistentes e hepatomegalia > 2 cm. Com sinal de alarme e sem gravidade → GRUPO C → hidratação VENOSA imediata + internação.\n\n💡 O DETALHE QUE SALVA VIDA — e a banca adora: os sinais de alarme surgem **NA REMISSÃO DA FEBRE**, tipicamente entre o 3º e o 7º dia. O paciente está no 5º dia com febre cedendo. **Melhorar a febre NÃO é sinal de cura — é o momento de vigiar.**\n\n👉 A explicação: é justamente quando a febre cai que se instala o EXTRAVASAMENTO PLASMÁTICO. O plasma sai do vaso, o hematócrito sobe, a pressão cai. Por isso a alternativa E é uma armadilha cruel — ela verbaliza exatamente o erro que mata.\n\n💡 A ESCADA DOS GRUPOS:\n📌 **A** → sem sinal de alarme, sem comorbidade, sem risco social → hidratação **ORAL** em domicílio\n📌 **B** → sem sinal de alarme, MAS com sangramento espontâneo/prova do laço + ou condição especial (lactente, gestante, idoso >65a, comorbidade, risco social) → hidratação **ORAL** + hemograma, aguardando na unidade\n📌 **C** → **COM SINAL DE ALARME**, sem gravidade → hidratação **VENOSA** + internação\n📌 **D** → **GRAVE**: choque, sangramento grave, disfunção orgânica → expansão rápida + UTI\n\n👉 **A e B = ORAL · C e D = VENOSA.** O que separa B de C é o SINAL DE ALARME. O que separa C de D é a GRAVIDADE.\n\n💡 OS SINAIS DE ALARME: dor abdominal intensa/contínua · vômitos persistentes · acúmulo de líquidos (ascite, derrame) · hipotensão postural/lipotimia · hepatomegalia > 2 cm · sangramento de mucosa · letargia/irritabilidade · aumento progressivo do hematócrito.\n\n⚠️ E lembre: **AAS e anti-inflamatórios são CONTRAINDICADOS** na dengue (risco de sangramento). Antitérmico de escolha: paracetamol ou dipirona.",
  },

  {
    id: "aut-doencas-04", eixo: "doencas", sub: "IST e infecção pelo HIV",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Uma gestante de 24 semanas apresenta teste rápido reagente para sífilis e VDRL 1:16. Relata alergia à penicilina, com histórico de reação anafilática prévia. Sobre a conduta, é correto afirmar que",
    alts: [
      "deve-se substituir a penicilina por doxiciclina, mantendo a eficácia do tratamento para o feto.",
      "a gestante deve ser submetida à dessensibilização à penicilina, pois esta é o único tratamento que trata adequadamente o feto.",
      "o tratamento deve ser adiado até o terceiro trimestre, quando o risco de reação é menor.",
      "a azitromicina é a alternativa de escolha em gestantes alérgicas à penicilina.",
      "o tratamento é dispensável, uma vez que o VDRL 1:16 indica cicatriz sorológica.",
    ],
    correta: 1,
    coment: "Gabarito: B. Em GESTANTE, a penicilina benzatina é o ÚNICO tratamento que trata ADEQUADAMENTE O FETO. Diante de alergia, procede-se à DESSENSIBILIZAÇÃO em ambiente hospitalar — não se troca a droga.\n\n💡 POR QUE SÓ A PENICILINA — e essa é a lógica que resolve: os outros antibióticos (doxiciclina, azitromicina, ceftriaxona) até tratam a MÃE, mas NÃO atravessam a placenta em concentração suficiente para tratar o FETO. Ou seja: a mãe melhora e o bebê nasce com sífilis congênita. Na gestante, tratar a mãe sem tratar o feto é falhar.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 A → **DOXICICLINA é CONTRAINDICADA na gestação!** Tetraciclinas causam alteração na formação óssea e manchamento dentário do feto. Erro duplo.\n📌 C → adiar tratamento de sífilis na gestação é permitir a transmissão vertical. Trata-se JÁ.\n📌 D → azitromicina não trata o feto e há relatos de resistência.\n📌 E → VDRL 1:16 é titulação ALTA — indica infecção ativa, não cicatriz. Cicatriz sorológica seriam títulos baixos e estáveis após tratamento documentado.\n\n💡 O ESQUEMA DA SÍFILIS:\n📌 **Recente** (primária, secundária, latente recente <1 ano) → 2,4 milhões UI, IM, **dose única**\n📌 **Tardia** (latente tardia, terciária ou duração ignorada) → 2,4 milhões UI/semana, **3 semanas** (total 7,2 milhões UI)\n\n💡 CONTROLE DE CURA: pelo **VDRL** (não treponêmico, quantitativo). Espera-se queda de 2 diluições (ex.: 1:16 → 1:4) em 3 meses. O teste TREPONÊMICO permanece reagente a vida toda — **nunca serve para controle de cura**.\n\n💡 A sífilis em gestante é de notificação COMPULSÓRIA.",
  },

  {
    id: "aut-doencas-05", eixo: "doencas", sub: "Cuidados paliativos",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre os cuidados paliativos, assinale a alternativa correta.",
    alts: [
      "Devem ser iniciados apenas quando esgotadas todas as possibilidades de tratamento modificador da doença.",
      "Consistem na antecipação da morte para abreviar o sofrimento do paciente em fase terminal.",
      "Devem ser iniciados precocemente, podendo ser conduzidos concomitantemente ao tratamento modificador da doença.",
      "Restringem-se ao controle da dor física, não abrangendo aspectos psicossociais e espirituais.",
      "Excluem o suporte à família, cujo acompanhamento cabe exclusivamente ao serviço social.",
    ],
    correta: 2,
    coment: "Gabarito: C. O cuidado paliativo deve ser iniciado PRECOCEMENTE, JUNTO com o tratamento modificador da doença — não depois que ele falha.\n\n⚠️ O MITO QUE A BANCA EXPLORA: 'paliativo é quando não há mais nada a fazer'. **FALSO** — e essa frase é a mais nociva da área. Paliativo NÃO é fazer nada: é fazer o que ALIVIA, deixando de fazer o que só PROLONGA O SOFRIMENTO.\n\n👉 Há evidência de que o paliativo precoce melhora qualidade de vida E, em alguns cenários, aumenta a sobrevida. Cuidar do sofrimento não é desistir do paciente.\n\n💡 A TRÍADE QUE A PROVA COBRA — decore a diferença:\n📌 **EUTANÁSIA** → abreviar deliberadamente a vida. **VEDADA no Brasil.**\n📌 **DISTANÁSIA** → prolongar o MORRER com medidas fúteis, às custas de sofrimento (obstinação terapêutica)\n📌 **ORTOTANÁSIA** → permitir que a morte siga seu curso NATURAL, sem antecipar nem prolongar → **é o que o paliativo pratica**\n\n👉 Mnemônico: EU-tanásia = EU antecipo · DIS-tanásia = DIStancia a morte (prolonga) · ORTO = certo, natural.\n\n⚠️ A alternativa B descreve EUTANÁSIA e a atribui ao paliativo — inversão grave.\n\n💡 OS PRINCÍPIOS (OMS):\n✅ NÃO antecipa nem adia a morte\n✅ Afirma a vida e considera a morte processo NATURAL\n✅ Alivia dor e outros sintomas — físicos, PSICOSSOCIAIS e ESPIRITUAIS (mata a alternativa D)\n✅ Oferece suporte à FAMÍLIA, inclusive no LUTO (mata a alternativa E)\n✅ Abordagem MULTIPROFISSIONAL\n\n💡 Na dor oncológica: escada analgésica da OMS, em HORÁRIOS FIXOS (não 'se necessário'), com doses de resgate. Medo de dependência NÃO justifica subtratar a dor.",
  },

  {
    id: "aut-doencas-06", eixo: "doencas", sub: "Doenças neoplásicas",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "De acordo com as diretrizes do Ministério da Saúde e do INCA para o rastreamento do câncer do colo do útero, o exame citopatológico está indicado",
    alts: [
      "anualmente, para todas as mulheres a partir da menarca, independentemente de atividade sexual.",
      "em mulheres de 25 a 64 anos que já tiveram atividade sexual, a cada três anos após dois exames anuais consecutivos negativos.",
      "em mulheres de 20 a 59 anos, com periodicidade bienal, independentemente dos resultados anteriores.",
      "semestralmente, em todas as mulheres com vida sexual ativa, para detecção precoce de lesões.",
      "apenas em mulheres com sintomas ginecológicos ou histórico familiar de neoplasia.",
    ],
    correta: 1,
    coment: "Gabarito: B. Rastreamento do câncer do colo do útero: **25 a 64 anos**, em mulheres que **já tiveram atividade sexual**. Após **DOIS exames anuais consecutivos negativos**, passa a ser **TRIENAL**.\n\n💡 POR QUE COMEÇA AOS 25 — e não na menarca: o câncer de colo é raro antes dos 25 anos, e a infecção por HPV nessa faixa costuma REGREDIR ESPONTANEAMENTE. Rastrear antes gera achados que assustam, levam a procedimentos desnecessários (que podem prejudicar gestações futuras) — sem reduzir mortalidade. Rastrear demais também causa dano.\n\n💡 POR QUE 'JÁ TIVERAM ATIVIDADE SEXUAL': o HPV é de transmissão sexual. Sem exposição, não há a via principal de risco.\n\n💡 POR QUE TRIENAL APÓS DOIS NEGATIVOS: a evolução de lesão precursora até câncer invasivo leva ANOS. Dois negativos seguidos dão segurança para espaçar sem perder o tempo de detecção.\n\n⚠️ AS ARMADILHAS: 'anualmente para sempre' (A), 'semestralmente' (D) e 'só com sintomas' (E). Rastreamento é para ASSINTOMÁTICAS — se tem sintoma, é investigação diagnóstica, não rastreio.\n\n💡 A COLINHA DOS DOIS RASTREAMENTOS:\n📌 **COLO DO ÚTERO** → citopatológico · **25 a 64 anos** · **trienal** após 2 negativos anuais\n📌 **MAMA** → mamografia · **50 a 69 anos** · **bienal** (a cada 2 anos)\n\n👉 Repare que cada um tem faixa E intervalo próprios — e a banca troca um pelo outro.\n\n💡 E o HPV no calendário vacinal hoje: **dose única, de 9 a 14 anos** (antes eram 2 doses).",
  },

  {
    id: "aut-doencas-07", eixo: "doencas", sub: "Doenças neoplásicas",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente em quimioterapia apresenta, no 10º dia após o ciclo, temperatura axilar de 38,5 °C e contagem de neutrófilos de 480/mm³. Sobre essa situação, é correto afirmar que",
    alts: [
      "trata-se de neutropenia febril, considerada emergência oncológica, devendo-se iniciar antibioticoterapia precocemente.",
      "a conduta adequada é observar por 24 horas, uma vez que a febre isolada não indica gravidade em pacientes oncológicos.",
      "deve-se aguardar o resultado da hemocultura antes de iniciar qualquer antimicrobiano, para não mascarar o agente.",
      "a antibioticoterapia está contraindicada, pois a neutropenia impede a resposta ao tratamento.",
      "o quadro é esperado e não requer intervenção, tratando-se de efeito adverso benigno da quimioterapia.",
    ],
    correta: 0,
    coment: "Gabarito: A. NEUTROPENIA FEBRIL é **EMERGÊNCIA ONCOLÓGICA**. Antibioticoterapia empírica de amplo espectro deve ser iniciada PRECOCEMENTE — idealmente na primeira hora.\n\n💡 OS CRITÉRIOS: febre (≥ 38,3 °C isolada, ou ≥ 38,0 °C por mais de 1 hora) + neutrófilos < 500/mm³ (ou < 1.000 com previsão de queda). O paciente tem 38,5 °C e 480/mm³ — fechado.\n\n💡 **POR QUE É EMERGÊNCIA** — e essa é a lógica que assusta e ensina: o NEUTRÓFILO é a primeira linha de defesa contra bactéria. Sem ele, o paciente **não consegue montar resposta inflamatória**. Isso significa que ele não vai ter pus, não vai ter sinal flogístico, não vai ter o quadro clássico de infecção. **A FEBRE PODE SER O ÚNICO SINAL** — e, quando aparece, a bactéria já está circulando livre.\n\n👉 Um paciente com neutropenia grave pode evoluir de febre a choque séptico em HORAS. Não há tempo para observar.\n\n⚠️ POR QUE A ALTERNATIVA C É A MAIS PERIGOSA — e é a que mais atrai: em qualquer outro contexto, colher cultura antes do antibiótico é boa prática. Aqui, **colhe-se a hemocultura E inicia-se o antibiótico imediatamente**, sem esperar resultado. Esperar 48h por uma cultura pode custar a vida. Colhe e trata.\n\n💡 A LÓGICA DOS EFEITOS DA QUIMIO — deduza, não decore: ela atinge células de DIVISÃO RÁPIDA. Logo:\n📌 **Medula óssea** → neutropenia, anemia, plaquetopenia\n📌 **Mucosa do TGI** → mucosite, náusea, diarreia\n📌 **Folículo piloso** → alopecia\n\n💡 CUIDADOS NA NEUTROPENIA: higiene das mãos rigorosa, evitar procedimentos invasivos desnecessários, **não usar termômetro retal nem supositório** (risco de bacteremia por trauma de mucosa), atenção a qualquer alteração — porque os sinais clássicos NÃO virão.",
  },

  {
    id: "aut-doencas-08", eixo: "doencas", sub: "Nutrição e dietética",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um paciente de 70 anos, com sequela de AVC e disfagia grave, mantém trato gastrointestinal íntegro e funcionante. Sobre a via de nutrição indicada, é correto afirmar que",
    alts: [
      "a nutrição parenteral é a escolha, por evitar o risco de broncoaspiração.",
      "a nutrição enteral é a escolha, pois o trato gastrointestinal está funcionante.",
      "a via oral deve ser mantida com espessantes, independentemente do grau de disfagia.",
      "a nutrição parenteral periférica é preferível à enteral em pacientes neurológicos.",
      "deve-se aguardar a recuperação neurológica antes de definir a via de nutrição.",
    ],
    correta: 1,
    coment: "Gabarito: B. Trato gastrointestinal FUNCIONANTE + via oral inviável = NUTRIÇÃO ENTERAL.\n\n💡 **A REGRA DE OURO DA NUTRIÇÃO — e o porquê:** 'SE O INTESTINO FUNCIONA, USE-O.'\n\n👉 Não é preferência: é fisiologia. A nutrição enteral mantém o **TROFISMO DA MUCOSA** intestinal. Sem estímulo alimentar, a mucosa ATROFIA, a barreira intestinal se fragiliza e ocorre **TRANSLOCAÇÃO BACTERIANA** — bactérias do intestino atravessam para a corrente sanguínea e causam sepse. O intestino em jejum prolongado vira porta de infecção.\n\n👉 Além disso, a parenteral tem mais complicações infecciosas (cateter central) e metabólicas (hiperglicemia, distúrbios eletrolíticos, disfunção hepática).\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 A e D → parenteral só quando o TGI **NÃO pode ser usado** (obstrução, íleo, fístula de alto débito, isquemia mesentérica). Aqui ele funciona.\n📌 C → 'independentemente do grau de disfagia' — na disfagia GRAVE, espessante não protege. Insistir na via oral é convidar a broncoaspiração.\n📌 E → aguardar é deixar o paciente desnutrir. A desnutrição piora a cicatrização, a imunidade e a própria reabilitação neurológica.\n\n💡 CUIDADOS NA ENTERAL — o que cai:\n✅ **Cabeceira 30–45°** durante e após a infusão (previne broncoaspiração)\n✅ Confirmar posicionamento — **radiografia é o padrão-ouro** na primeira instalação. Ausculta epigástrica isolada NÃO é confiável.\n✅ **Lavar a sonda** com água antes e depois de dieta e medicamentos (previne obstrução)\n✅ NÃO triturar medicamento de liberação prolongada nem misturar à dieta\n\n💡 SNG × SNE: nasogástrica = ponta no ESTÔMAGO (curto prazo, drenagem). Nasoenteral = ponta no INTESTINO, pós-pilórica (nutrição, menor risco de aspiração).\n\n💡 Medida de inserção da SNG — **NEX**: Nariz → lóbulo da Orelha → apêndice Xifoide.",
  },

  {
    id: "aut-doencas-09", eixo: "doencas", sub: "IST e infecção pelo HIV",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a Profilaxia Pré-Exposição (PrEP) ao HIV, assinale a alternativa correta.",
    alts: [
      "É indicada após exposição de risco, devendo ser iniciada em até 72 horas.",
      "Consiste no uso contínuo de antirretrovirais por pessoas sob risco aumentado de infecção, antes da exposição.",
      "Substitui integralmente o uso do preservativo, protegendo contra todas as IST.",
      "É indicada exclusivamente para pessoas vivendo com HIV, como forma de reduzir a carga viral.",
      "Tem duração fixa de 28 dias, independentemente da manutenção do risco.",
    ],
    correta: 1,
    coment: "Gabarito: B. **PrEP = PRÉ-Exposição**: uso CONTÍNUO de antirretroviral, ANTES da exposição, por pessoas sob risco aumentado.\n\n💡 **NÃO CONFUNDA — a sigla entrega:**\n📌 **PrEP** = **Pr**é-Exposição → **ANTES** · uso contínuo · para quem tem risco recorrente\n📌 **PEP** = **P**ós-Exposição → **DEPOIS** · **72 horas** de limite · **28 dias** de duração · é URGÊNCIA\n\n👉 A alternativa A e a E descrevem a **PEP**, não a PrEP. É a troca mais cobrada do tema.\n\n⚠️ POR QUE A ALTERNATIVA C É PERIGOSA: a PrEP protege contra **HIV**, mas **NÃO** protege contra sífilis, gonorreia, clamídia, HPV, hepatites. Só o **preservativo** previne o conjunto das IST. Por isso a estratégia se chama **PREVENÇÃO COMBINADA** — nenhum método sozinho dá conta.\n\n⚠️ E a D inverte tudo: PrEP é para quem **NÃO TEM** HIV. Quem vive com HIV faz **TARV** (tratamento), não profilaxia.\n\n💡 A PREVENÇÃO COMBINADA reúne:\n📌 **PrEP** (antes) · **PEP** (depois) · preservativo · testagem regular\n📌 **TARV** para quem vive com HIV\n📌 **I = I (Indetectável = Intransmissível)** → pessoa com carga viral indetectável e sustentada **NÃO transmite** o HIV por via sexual. É um dos avanços mais importantes da área — e cai em prova.\n📌 Redução de danos · imunização (hepatite B, HPV) · prevenção da transmissão vertical",
  },

  {
    id: "aut-doencas-10", eixo: "doencas", sub: "Crônicas não transmissíveis",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "As doenças crônicas não transmissíveis (DCNT) respondem pela maior parte da mortalidade no Brasil. Sobre os fatores de risco e a organização do cuidado às DCNT, assinale a afirmativa correta.",
    alts: [
      "Os principais fatores de risco modificáveis são idade, sexo e hereditariedade.",
      "O cuidado às DCNT caracteriza-se por intervenções pontuais e episódicas, centradas na crise.",
      "Tabagismo, álcool, inatividade física e alimentação inadequada são fatores de risco modificáveis comuns aos principais grupos de DCNT.",
      "A adesão ao tratamento depende exclusivamente da vontade individual do usuário, cabendo à equipe apenas informar.",
      "O rastreamento populacional é contraindicado nas DCNT, por gerar sobrediagnóstico.",
    ],
    correta: 2,
    coment: "Gabarito: C. Tabagismo, álcool, inatividade física e alimentação inadequada são os quatro fatores de risco MODIFICÁVEIS comuns aos principais grupos de DCNT.\n\n💡 **POR QUE OS MESMOS QUATRO SERVEM PARA TUDO** — e essa é a sacada: todas as DCNT passam por vias comuns de **inflamação crônica, disfunção endotelial e resistência insulínica**. Por isso uma única intervenção — parar de fumar, por exemplo — reduz SIMULTANEAMENTE o risco cardiovascular, oncológico e respiratório.\n\n👉 A enfermagem não trata quatro doenças. Trata **quatro comportamentos**.\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 A → idade, sexo e hereditariedade são fatores **NÃO modificáveis**. A alternativa troca as categorias.\n📌 B → o cuidado às DCNT é **LONGITUDINAL** — acompanhamento contínuo, vínculo, não episódico. Conduta pontual em DCNT é marcador de alternativa errada.\n📌 D → **culpabilizar o usuário** é o erro central do tema. A não adesão quase sempre tem uma RAZÃO — falta de dinheiro para o remédio, efeito colateral, não entender a prescrição, não ter com quem deixar o filho para ir à consulta. Descobrir essa razão é trabalho da enfermagem.\n📌 E → rastreamento não é contraindicado; é indicado com critério (faixa etária e periodicidade definidas).\n\n💡 OS 4 GRUPOS DE DCNT: cardiovasculares · diabetes · câncer · respiratórias crônicas.\n\n💡 A palavra-chave do cuidado: **AUTOCUIDADO APOIADO**. O paciente crônico não é curado — é acompanhado. E ele é protagonista, não receptor passivo.",
  },

  {
    id: "aut-doencas-11", eixo: "doencas", sub: "Dermatológicas",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "facil",
    enunciado: "Na avaliação dermatológica, a enfermeira identifica uma lesão elevada, sólida, circunscrita, com diâmetro inferior a 1 cm. Essa lesão elementar é denominada",
    alts: ["mácula.", "pápula.", "vesícula.", "pústula.", "nódulo."],
    correta: 1,
    coment: "Gabarito: B. **PÁPULA** = elevação SÓLIDA, circunscrita, **menor que 1 cm**.\n\n💡 **O CRITÉRIO QUE ORGANIZA TUDO — é só cruzar CONTEÚDO × TAMANHO:**\n\n📌 **SÓLIDA** (sem líquido):\n  • < 1 cm → **PÁPULA**\n  • > 1 cm → **NÓDULO** (mais profunda)\n\n📌 **COM LÍQUIDO CLARO**:\n  • < 1 cm → **VESÍCULA** (varicela, herpes)\n  • > 1 cm → **BOLHA**\n\n📌 **COM PUS** → **PÚSTULA**\n\n📌 **PLANA, só alteração de COR** → **MÁCULA** (ex.: a mancha da hanseníase)\n\n👉 Guardando o divisor de **1 cm** e a pergunta 'tem líquido? qual?', você resolve praticamente toda questão de lesão elementar.\n\n💡 PERDA DE CONTINUIDADE — a outra dupla que cai:\n📌 **EROSÃO** → superficial, restrita à epiderme → cicatriza **SEM** cicatriz\n📌 **ÚLCERA** → atinge a derme → cicatriza **COM** cicatriz\n\n💡 **A LIGAÇÃO COM A HANSENÍASE**: a lesão típica é uma **MÁCULA** (mancha plana) — mas o que faz o diagnóstico não é a aparência, é a **ALTERAÇÃO DE SENSIBILIDADE**. Qualquer dermatose faz mancha; só a hanseníase faz mancha que não sente.",
  },

  {
    id: "aut-doencas-12", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente em tratamento de tuberculose pulmonar com esquema básico retorna à unidade referindo que sua urina está com coloração alaranjada e, por isso, interrompeu a medicação por conta própria. A conduta da enfermeira deve ser",
    alts: [
      "suspender definitivamente a rifampicina e comunicar a equipe médica para substituição do esquema.",
      "orientar que a coloração alaranjada da urina é efeito esperado da rifampicina, reforçando a importância de não interromper o tratamento.",
      "encaminhar imediatamente o paciente para avaliação de função renal, por suspeita de nefrotoxicidade.",
      "reduzir a dose da rifampicina pela metade até a normalização da coloração urinária.",
      "manter a suspensão até avaliação médica, uma vez que a alteração indica reação adversa maior.",
    ],
    correta: 1,
    coment: "Gabarito: B. A coloração **alaranjada/avermelhada** de urina, suor e lágrimas é efeito **ESPERADO e INOFENSIVO** da RIFAMPICINA. **NÃO se suspende** — orienta-se.\n\n💡 **POR QUE ISSO É QUESTÃO DE VIDA OU MORTE** — e não é exagero: o abandono do tratamento é o principal motor da **TUBERCULOSE RESISTENTE**. E um dos motivos mais banais de abandono é exatamente este: o paciente vê a urina laranja, se assusta, acha que está sendo envenenado, e para.\n\n👉 Uma orientação de 30 segundos na primeira consulta evita meses de tratamento perdido. **Orientar é intervenção clínica**, não gentileza.\n\n💡 A COLINHA DOS EFEITOS DO **RIPE**:\n📌 **R**ifampicina → urina/suor/lágrima **LARANJA** (esperado!) · rash · hepatotoxicidade\n📌 **I**soniazida → **NEUROPATIA periférica** (previne com piridoxina/vitamina B6) · rash · prurido · hepatotoxicidade\n📌 **P**irazinamida → aumenta **ÁCIDO ÚRICO** (artralgia, gota) · hepatotoxicidade\n📌 **E**tambutol → **OLHO** (neurite óptica, altera visão de cores)\n\n👉 Mnemônicos: 'Etambutol = **E**nxerga mal' · 'Isoniazida = formIga no pé (neuropatia)' · 'Pirazinamida = ácido úrico'.\n\n💡 O ESQUEMA: **2RIPE/4RI** — 2 meses com as quatro drogas + 4 meses com rifampicina e isoniazida. Total: **6 meses**. TB **óssea e meníngea**: **12 meses**.\n\n💡 A estratégia que garante adesão é o **TDO — Tratamento Diretamente Observado**: o profissional observa a tomada. Não é desconfiança — é o que segura o paciente até o fim.\n\n💡 E lembre: **sintomático respiratório** = tosse por **3 semanas ou mais**. A busca ativa desse paciente é atribuição central da enfermagem.",
  },

  {
    id: "aut-doencas-13", eixo: "doencas", sub: "Infectoparasitárias",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Considerando a Lista Nacional de Notificação Compulsória atualizada pela Portaria GM/MS nº 11.211/2026, assinale a afirmativa correta.",
    alts: [
      "A parotidite (caxumba) foi incluída na lista, com notificação semanal.",
      "A febre do Oropouche foi incluída, com notificação semanal para os casos e imediata em óbitos e gestantes.",
      "A covid-19 permanece como item isolado da lista, com notificação imediata.",
      "A difteria passou a ter notificação semanal, dado o controle vacinal alcançado no país.",
      "O tétano acidental foi excluído da lista nacional de notificação compulsória.",
    ],
    correta: 1,
    coment: "Gabarito: B. A **febre do Oropouche** foi incluída pela Portaria GM/MS nº 11.211/2026: notificação **SEMANAL** para os casos, e **IMEDIATA** em óbitos, óbitos fetais, gestantes e anomalias congênitas.\n\n💡 **POR QUE A GRADUAÇÃO** — e a lógica é boa: o caso comum de Oropouche não muda a resposta se você notificar em 7 dias. Mas óbito e gestante mudam TUDO — indicam gravidade inesperada ou risco de transmissão vertical, e exigem investigação imediata. A norma calibra a urgência pelo que está em jogo.\n\n⚠️ POR QUE AS OUTRAS ERRAM — e todas tratam de mudanças reais de 2026:\n📌 A → caxumba entrou SIM, mas com notificação **IMEDIATA** (não semanal)\n📌 C → a covid-19 **DEIXOU de ser item isolado** — passou a integrar 'Síndrome Gripal por covid-19 confirmada'\n📌 D → a difteria passou a exigir notificação **IMEDIATA ao Ministério da Saúde** (não semanal)\n📌 E → o tétano **não foi excluído**; ao contrário, passou a exigir notificação **IMEDIATA às SES**\n\n💡 **A LÓGICA IMEDIATA × SEMANAL**: notifica-se em 24h o que é **grave, raro, altamente transmissível ou já eliminado do país**. A pergunta que resolve: *'se eu esperar uma semana, o estrago cresce muito?'*\n\n👉 Sarampo (quase eliminado + altamente transmissível) = imediata. Tuberculose (comum, crônica) = semanal.\n\n💡 A lista muda TODO ANO — 2023 (doença falciforme), 2024 (HTLV), 2025 (esporotricose), jan/2026 (anomalias congênitas), mai/2026 (caxumba e Oropouche). Material que não menciona caxumba e Oropouche é anterior a maio de 2026.\n\n💡 E o termo mudou: 'eventos adversos pós-vacinação' virou **ESAVI** (Evento Supostamente Atribuível à Vacinação ou Imunização).",
  },

  {
    id: "aut-doencas-14", eixo: "doencas", sub: "Cuidados paliativos",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre o manejo da dor oncológica, segundo a escada analgésica da Organização Mundial da Saúde, é correto afirmar que",
    alts: [
      "os opioides devem ser reservados exclusivamente para os últimos dias de vida, pelo risco de dependência.",
      "a analgesia deve ser administrada em horários fixos, com doses de resgate disponíveis para a dor irruptiva.",
      "o degrau inicial contempla opioides fortes, reservando-se os anti-inflamatórios para a dor refratária.",
      "a via intramuscular é a preferencial para o controle da dor crônica oncológica.",
      "a dor deve ser avaliada exclusivamente por parâmetros objetivos, como frequência cardíaca e pressão arterial.",
    ],
    correta: 1,
    coment: "Gabarito: B. A analgesia se faz em **HORÁRIOS FIXOS** ('pelo relógio'), com **doses de resgate** para a dor irruptiva.\n\n💡 **POR QUE HORÁRIO FIXO E NÃO 'SE NECESSÁRIO'** — e essa lógica é linda: no esquema 'se necessário', o paciente só recebe analgésico DEPOIS que a dor voltou. Ou seja, ele passa o dia inteiro num ciclo de **dor → pede → espera → alivia → dor**. Ele vive esperando doer.\n\n👉 Com horário fixo, você mantém o nível sérico estável e a dor **nunca chega**. É prevenir em vez de apagar incêndio. E a dose de resgate cobre os picos (dor irruptiva).\n\n⚠️ POR QUE A ALTERNATIVA A É CRUEL — e é a mais comum na vida real: o medo da dependência faz **subtratar a dor**. Em dor oncológica, esse medo é infundado — o risco de dependência é baixíssimo quando há dor real, e **deixar o paciente sofrer não é 'prudência', é falha assistencial**.\n\n💡 A ESCADA DA OMS:\n📌 **Degrau 1** → dor leve → não opioides (AINE, dipirona, paracetamol) ± adjuvantes\n📌 **Degrau 2** → dor moderada → opioides FRACOS (codeína, tramadol) ± não opioides ± adjuvantes\n📌 **Degrau 3** → dor intensa → opioides FORTES (morfina) ± não opioides ± adjuvantes\n\n👉 A alternativa C inverte a escada (começar por opioide forte).\n\n💡 A **VIA ORAL** é a preferencial — é a mais simples, autônoma e permite ao paciente estar em casa. A alternativa D (intramuscular) é o oposto: dolorosa, de absorção errática e inviável para uso crônico.\n\n⚠️ E a alternativa E ignora o princípio básico: **a dor é o que o paciente DIZ que é**. Ela é subjetiva. Frequência cardíaca e PA não medem dor crônica — o corpo se adapta. Usa-se **escala** (EVA, faces, FLACC).",
  },

  {
    id: "aut-doencas-15", eixo: "doencas", sub: "Crônicas não transmissíveis",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre a hepatite A, considerando as características epidemiológicas e as medidas de prevenção, assinale a alternativa correta.",
    alts: [
      "É transmitida principalmente por via parenteral e sexual, apresentando elevada taxa de cronificação.",
      "É de transmissão fecal-oral, geralmente autolimitada, e prevenível por vacinação disponível no SUS.",
      "Evolui para cirrose e carcinoma hepatocelular na maioria dos casos não tratados.",
      "A vacinação está indicada apenas para profissionais de saúde e manipuladores de alimentos.",
      "O diagnóstico é firmado exclusivamente por biópsia hepática.",
    ],
    correta: 1,
    coment: "Gabarito: B. Hepatite A: transmissão **FECAL-ORAL**, curso **AUTOLIMITADO**, prevenível por **VACINA** — disponível no SUS aos **15 meses**.\n\n💡 **O MNEMÔNICO QUE ORGANIZA TODAS AS HEPATITES:**\n📌 **A** e **E** → **A** de Á**gua** · **E** de **E**sgoto → **FECAL-ORAL** → **NÃO cronificam**\n📌 **B**, **C** e **D** → sangue, sexo, vertical → **PODEM cronificar**\n\n👉 Só isso já mata as alternativas A e C: hepatite A **não cronifica**, logo não evolui para cirrose nem hepatocarcinoma como regra.\n\n⚠️ POR QUE A ALTERNATIVA D ERRA: a vacina da hepatite A está no **calendário infantil de rotina (15 meses)** — não é restrita a grupos profissionais.\n\n⚠️ E a E é absurda: o diagnóstico é **SOROLÓGICO** (anti-HAV IgM = infecção aguda; anti-HAV IgG = infecção passada ou vacinação). Biópsia hepática para hepatite A seria violência desnecessária.\n\n💡 O DETALHE QUE CAI — e é contraintuitivo: a hepatite A é **mais benigna na criança** e pode ser **MAIS GRAVE no adulto**, com icterícia intensa, e raramente evolui para hepatite fulminante. É por isso que o MS registrou preocupação com o aumento de casos em maiores de 20 anos.\n\n👉 A explicação: a criança faz forma frequentemente **assintomática ou oligossintomática** e se imuniza. Quem não teve na infância chega ao adulto suscetível — e faz quadro mais expressivo.\n\n💡 PREVENÇÃO: saneamento básico, higiene das mãos, água tratada, vacina. É doença de condição de vida — a queda de casos no Brasil acompanhou a melhora do saneamento.",
  },

  {
    id: "aut-doencas-16", eixo: "doencas", sub: "Doenças neoplásicas",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Durante a administração de quimioterápico vesicante do grupo das antraciclinas, a paciente refere dor e ardência no local da punção, observando-se edema e ausência de retorno venoso. A conduta imediata inclui",
    alts: [
      "retirar imediatamente o cateter e massagear o local para dispersar o extravasado.",
      "interromper a infusão, manter o cateter, aspirar o resíduo e aplicar compressa fria.",
      "interromper a infusão, manter o cateter, aspirar o resíduo e aplicar compressa morna.",
      "reduzir o gotejamento e completar a infusão, mantendo observação do local.",
      "elevar o membro e manter a infusão em velocidade menor até o término da dose.",
    ],
    correta: 1,
    coment: "Gabarito: B. **ANTRACICLINAS** (doxorrubicina, daunorrubicina) → compressa **FRIA**.\n\n💡 **A LÓGICA DAS COMPRESSAS — e é pura fisiologia vascular:**\n📌 **FRIO** → **vasoCONSTRIÇÃO** → **LOCALIZA** o extravasado, impede que se espalhe e reduz a área de necrose → usado nas **ANTRACICLINAS** e na maioria dos vesicantes\n📌 **CALOR** → **vasoDILATAÇÃO** → **DISPERSA** e dilui a droga → usado nos **ALCALOIDES DA VINCA** (vincristina, vimblastina)\n\n👉 Mnemônico: **'vinCA = Calor'** · antraciclina = frio.\n\n⚠️ **É POR ISSO QUE O ENUNCIADO NOMEIA A DROGA.** Quando a banca especifica o grupo do quimioterápico, ela está cobrando exatamente essa distinção. Se você não ler o nome da droga, tem 50% de chance de errar — e as alternativas B e C são idênticas exceto pela temperatura.\n\n💡 A SEQUÊNCIA DO EXTRAVASAMENTO:\n1️⃣ **INTERROMPER** a infusão imediatamente\n2️⃣ **NÃO RETIRAR** o cateter — usá-lo para **ASPIRAR** o resíduo (e administrar antídoto, se houver)\n3️⃣ Aplicar compressa conforme a droga\n4️⃣ **Comunicar e REGISTRAR** (é evento adverso)\n\n⚠️ POR QUE A ALTERNATIVA A É GRAVÍSSIMA — dois erros: **retirar o cateter** perde a via de aspiração e do antídoto; e **MASSAGEAR** espalha o vesicante pelos tecidos, **AUMENTANDO** a área de necrose. Nunca massagear.\n\n⚠️ E as alternativas D e E propõem **CONTINUAR A INFUSÃO** com extravasamento confirmado. É continuar injetando necrose no braço da paciente.\n\n💡 VESICANTE × IRRITANTE: o **vesicante** causa necrose e destruição tecidual (pode exigir enxerto!). O **irritante** causa dor e flebite, sem necrose. Antraciclinas e alcaloides da vinca são vesicantes clássicos.",
  },

{
    id: "aut-urg-01", eixo: "urg", sub: "Suporte básico de vida",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Durante o atendimento a uma vítima de parada cardiorrespiratória em ambiente extra-hospitalar, a equipe realiza RCP de alta qualidade. Sobre os parâmetros das compressões torácicas no adulto, segundo as diretrizes vigentes, é correto afirmar que",
    alts: [
      "a profundidade deve ser de pelo menos 5 cm, sem limite máximo estabelecido.",
      "a frequência deve ser de 100 a 120 compressões por minuto, com profundidade de 5 a 6 cm e retorno completo do tórax.",
      "as interrupções para checagem de pulso devem ocorrer a cada 1 minuto, com duração máxima de 30 segundos.",
      "a fração de compressão torácica ideal é de, no máximo, 40% do tempo total do atendimento.",
      "em pacientes obesos, a profundidade deve ser aumentada para 7 a 8 cm.",
    ],
    correta: 1,
    coment: "Gabarito: B. **5 a 6 cm · 100 a 120/min · retorno completo do tórax.**\n\n💡 **POR QUE ESSES NÚMEROS E NÃO OUTROS** — cada um tem razão fisiológica:\n\n📌 **PROFUNDIDADE 5–6 cm**: abaixo de 5 não gera fluxo suficiente. **Acima de 6 aumenta lesão sem ganho** de débito. Por isso hoje há TETO — a alternativa A usa a redação ANTIGA ('pelo menos 5 cm', sem limite).\n\n📌 **FREQUÊNCIA 100–120/min**: acima de 120 **não há tempo de enchimento** entre as compressões. Você comprime um coração vazio.\n\n📌 **RETORNO COMPLETO (recoil)**: se você não deixa o tórax voltar, o coração não enche. Comprimir sem recoil = bombear o nada.\n\n📌 **FRAÇÃO DE COMPRESSÃO ≥ 60%**: o paciente deve estar recebendo compressão na MAIOR parte do tempo. A alternativa D inverte isso (máximo 40%).\n\n👉 As **pausas** são o vilão silencioso: a pressão de perfusão coronariana cai a cada interrupção e leva **vários segundos** para se recuperar. Por isso as pausas devem ser **< 10 segundos** — e não 30, como diz a alternativa C.\n\n⚠️ **PACIENTE OBESO (alternativa E)**: a AHA 2025 é explícita — **MESMA técnica, SEM ajuste** de profundidade ou frequência.\n\n💡 Cadência: a música *Stayin' Alive* (~103 bpm) está dentro da faixa.\n\n💡 **AHA 2025 — o que há de novo**: cadeia de sobrevivência **unificada** (intra e extra-hospitalar) · protocolo **No-No-Go** (Não responde? Não respira? Inicie a RCP!) · **debriefing** quente (imediato) e frio (tardio) após cada evento.",
  },

  {
    id: "aut-urg-02", eixo: "urg", sub: "Suporte básico de vida",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Considerando as atualizações das Diretrizes da American Heart Association de 2025 para RCP e Atendimento Cardiovascular de Emergência, assinale a alternativa correta.",
    alts: [
      "A via endotraqueal é a preferencial para administração de fármacos durante a PCR, na indisponibilidade de acesso intravenoso.",
      "A vasopressina, isolada ou associada à adrenalina, demonstrou benefício adicional e deve ser incorporada ao protocolo.",
      "A via intravenosa é a de escolha para fármacos; na indisponibilidade, utiliza-se a via intraóssea.",
      "A desfibrilação sequencial dupla é recomendada de rotina na FV refratária após três choques.",
      "A RCP com elevação da cabeça é recomendada rotineiramente por melhorar a perfusão cerebral.",
    ],
    correta: 2,
    coment: "Gabarito: C. **Via IV é a de escolha; sem acesso IV → INTRAÓSSEA.** A via **ENDOTRAQUEAL NÃO é recomendada**.\n\n⚠️ **ATUALIZAÇÃO QUE DERRUBA MATERIAL ANTIGO**: por décadas se ensinou 'sem acesso venoso, faz pelo tubo'. A AHA 2025 **desrecomenda** a via endotraqueal — a absorção é errática e imprevisível. Hoje: **IV → IO**. A alternativa A é a pegadinha do material velho.\n\n💡 **AS DESRECOMENDAÇÕES DA AHA 2025** — e todas viram alternativa errada:\n📌 **VASOPRESSINA** → **sem benefício** adicional, isolada ou com adrenalina. A droga da PCR é a **ADRENALINA**.\n📌 **DESFIBRILAÇÃO SEQUENCIAL DUPLA** e **mudança de vetor** → utilidade **NÃO estabelecida** na FV refratária. Não é rotina.\n📌 **RCP com cabeça elevada** → **não recomendada** rotineiramente fora de protocolos de pesquisa.\n📌 **Betabloqueador** na FV/TV refratária → benefício **incerto**.\n\n💡 **O QUE ENTROU DE NOVO EM 2025:**\n✅ **NALOXONA de acesso público** — recomendada junto com o acesso público à desfibrilação (ambos salvam vidas). Reflete a epidemia de opioides.\n✅ **Instruções distintas para leigos**: RCP **só com as mãos** em ADULTO · RCP **convencional (com ventilações)** em CRIANÇA\n✅ **Debriefing quente e frio** após eventos de RCP\n✅ Compressões, ventilação com bolsa-máscara, desfibrilação, aspiração e intubação são **procedimentos geradores de aerossol** — risco para a equipe\n✅ Regra universal de **término da ressuscitação** reafirmada\n\n💡 **POR QUE CRIANÇA LEVA VENTILAÇÃO**: a PCR pediátrica é majoritariamente de origem **RESPIRATÓRIA** (hipóxia), não cardíaca. Sem ventilar, você não corrige a causa. No adulto, a causa costuma ser arrítmica — e o sangue ainda tem oxigênio nos primeiros minutos.",
  },

  {
    id: "aut-urg-03", eixo: "urg", sub: "Politraumatizado",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Uma vítima de acidente com motosserra chega ao pronto-socorro com amputação traumática de antebraço e sangramento arterial em jato. Está consciente, taquipneica, com pulso filiforme. Considerando a 11ª edição do ATLS, a primeira medida da avaliação primária é",
    alts: [
      "garantir a permeabilidade da via aérea com proteção da coluna cervical.",
      "controlar a hemorragia externa exsanguinante por compressão direta ou torniquete.",
      "obter dois acessos venosos calibrosos e iniciar infusão de cristaloide aquecido.",
      "avaliar a expansibilidade torácica e auscultar os campos pulmonares.",
      "determinar o escore da Escala de Coma de Glasgow e avaliar as pupilas.",
    ],
    correta: 1,
    coment: "Gabarito: B. A **11ª edição do ATLS (2025)** trocou o ABCDE pelo **XABCDE**. O **X** é a **EXANGUINAÇÃO** — controle de hemorragia externa grave **ANTES** da via aérea.\n\n💡 **POR QUE MUDOU** — e a lógica é impecável: a ordem do ABCDE **nunca foi arbitrária**. Ela segue a **velocidade com que cada problema mata**. Obstrução de via aérea mata em minutos — por isso vinha primeiro.\n\n👉 Mas anos de trauma de guerra e urbano mostraram uma lição dura: **a hemorragia exsanguinante mata mais rápido que a via aérea**. Um paciente com amputação de membro jorrando sangue tem via aérea PÉRVIA (ele está consciente e falando!) — e morre em **segundos** se você for cuidar do 'A' primeiro.\n\n👉 A lógica se manteve. Só se reconheceu que existe algo **mais rápido** que a via aérea.\n\n💡 **O SEGUNDO MOTIVO** — padronização: o pré-hospitalar (**PHTLS**) já usava XABCDE há anos, enquanto o hospitalar usava ABCDE. A diferença gerava confusão na passagem do caso. A 11ª edição **unificou**.\n\n💡 **A SEQUÊNCIA VIGENTE:**\n📌 **X** → eXanguinação (hemorragia externa compressível)\n📌 **A** → Airway + proteção cervical\n📌 **B** → Breathing\n📌 **C** → Circulation (hemorragias **internas**, perfusão, acesso, reposição)\n📌 **D** → Disability (Glasgow, pupilas)\n📌 **E** → Exposure + prevenir **HIPOTERMIA**\n\n⚠️ **O RECORTE DO X**: é só hemorragia **EXTERNA, VISÍVEL e COMPRESSÍVEL** — amputação, jato arterial, couro cabeludo profuso. Hemorragia **INTERNA** (pelve, hemotórax, fígado) **NÃO é X** — continua no **C**, porque não se resolve com compressão.\n\n💡 **A ASSINATURA DA QUESTÃO DE XABCDE**: amputação + sangramento em jato no enunciado. Se ler isso, a resposta é controlar a hemorragia.",
  },

  {
    id: "aut-urg-04", eixo: "urg", sub: "Politraumatizado",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre o uso do torniquete no controle de hemorragia externa em extremidade, assinale a afirmativa correta.",
    alts: [
      "Deve ser afrouxado a cada 15 minutos, para permitir a perfusão do membro e evitar isquemia.",
      "Deve ser aplicado 5 a 8 cm acima da lesão, apertado até a cessação do pulso distal, com registro do horário de aplicação.",
      "É contraindicado em amputações traumáticas, devendo-se optar exclusivamente pela compressão direta.",
      "Deve ser aplicado sobre a roupa da vítima, para reduzir o desconforto causado pela compressão.",
      "Constitui medida de último recurso, somente após falha de duas tentativas de compressão direta e packing.",
    ],
    correta: 1,
    coment: "Gabarito: B. **5 a 8 cm acima (proximal) da lesão · diretamente sobre a pele · apertar até SUMIR o pulso distal · MARCAR A HORA.**\n\n⚠️ **O ERRO MAIS PERIGOSO É A ALTERNATIVA A** — e é o que mais se ensinou errado por décadas: **NÃO se afrouxa o torniquete** 'para circular'. Afrouxar libera na circulação os metabólitos tóxicos acumulados no membro isquêmico E reinicia o sangramento. Mantém-se até o controle definitivo.\n\n💡 **O TORNIQUETE FOI REABILITADO** — e essa história vale ouro: por décadas ele foi tratado como último recurso, sob o medo de causar isquemia e amputação. A experiência **militar** mostrou que esse risco era **MUITO menor do que se acreditava** — e que **o medo do torniquete matava mais gente do que o torniquete**.\n\n👉 Hoje ele é **método seguro e recomendado**. E em **amputação traumática** pode ser a **PRIMEIRA escolha**, sem tentativa prévia de compressão (o que mata a alternativa E e a C).\n\n💡 **UM TORNIQUETE FROUXO É PIOR QUE NENHUM** — e esta é a sacada fisiológica: ele comprime o **retorno VENOSO** (baixa pressão) mas **não oclui a ARTÉRIA** (alta pressão). Resultado: o sangue **entra** e não **sai**. O membro sangra **MAIS**. Por isso o critério é objetivo: aperta até o **pulso distal desaparecer**.\n\n💡 **SOBRE A PELE, NÃO SOBRE A ROUPA** (alternativa D): tecido dobrado distribui mal a pressão e escorrega.\n\n💡 Se não controlar → **segundo torniquete**, 3 a 5 cm acima do primeiro.\n\n💡 O ESCALONAMENTO: compressão direta → packing (pacotamento) → torniquete. Mas em amputação/jato arterial, vai direto.",
  },

  {
    id: "aut-urg-05", eixo: "urg", sub: "Urgência e emergência",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "facil",
    enunciado: "Sobre o acolhimento com classificação de risco em serviços de urgência, segundo o Protocolo de Manchester, assinale a alternativa correta.",
    alts: [
      "O atendimento é organizado por ordem de chegada, garantindo a equidade entre os usuários.",
      "A cor vermelha indica atendimento imediato, e a azul, menor prioridade.",
      "A classificação de risco é atribuição privativa do profissional médico.",
      "A cor verde indica risco iminente de morte, exigindo atendimento em até 10 minutos.",
      "O paciente classificado como azul deve ser mantido em observação contínua na sala vermelha.",
    ],
    correta: 1,
    coment: "Gabarito: B. **VERMELHO = imediato · AZUL = menor prioridade.**\n\n💡 **A ORDEM DAS CORES** (do mais grave ao mais leve):\n📌 **VERMELHO** → emergência · atendimento **IMEDIATO** · risco iminente à vida\n📌 **LARANJA** → muito urgente · ~10 minutos\n📌 **AMARELO** → urgente · ~60 minutos\n📌 **VERDE** → pouco urgente · pode aguardar (~120 min)\n📌 **AZUL** → não urgente · menor prioridade · pode ser reencaminhado\n\n👉 Mnemônico: **'Vermelho Late Alto, Verde Azula'** — Vermelho, Laranja, Amarelo, Verde, Azul.\n\n⚠️ **OS TEMPOS VARIAM entre instituições** (amarelo pode ser 50 ou 60 min; verde 90 ou 120). O que **NÃO muda** é a **ORDEM**. Foque na ordem, não decore o minuto isolado.\n\n💡 **POR QUE NÃO É POR ORDEM DE CHEGADA** (alternativa A) — e a lógica é dura: o pronto-socorro tem recurso finito e demanda infinita. Se fosse por chegada, um **infarto** que chegou às 10h esperaria atrás de **vinte resfriados** que chegaram às 9h — e morreria na fila.\n\n👉 A classificação **INVERTE a lógica**: atende primeiro quem **não pode esperar**, não quem chegou antes. **Isso É equidade** — dar mais a quem precisa mais. A alternativa A usa a palavra 'equidade' justamente para confundir.\n\n💡 **A TRIAGEM É ATRIBUIÇÃO DO ENFERMEIRO** (mata a alternativa C). Ela não diagnostica — ela **ORDENA**. É feita em minutos.\n\n💡 E o paciente **AZUL** pode e deve ser **reencaminhado à atenção básica** — ele não precisa de emergência (mata a alternativa E).",
  },

  {
    id: "aut-urg-06", eixo: "urg", sub: "Atendimento pré-hospitalar",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "De acordo com a Resolução COFEN nº 713/2022, que dispõe sobre a atuação da equipe de enfermagem no atendimento pré-hospitalar móvel, é correto afirmar que",
    alts: [
      "a assistência de enfermagem no Suporte Avançado de Vida (SAV) é privativa do enfermeiro.",
      "o auxiliar de enfermagem compõe a tripulação mínima da unidade de Suporte Básico de Vida (SBV).",
      "o técnico de enfermagem pode prestar assistência no SAV, desde que sob supervisão à distância do enfermeiro.",
      "a remoção simples de paciente sem risco de morte exige a presença obrigatória do enfermeiro.",
      "o Suporte Intermediário de Vida (SIV) pode ser executado exclusivamente pelo técnico de enfermagem.",
    ],
    correta: 0,
    coment: "Gabarito: A. Pela **Resolução COFEN nº 713/2022**, a assistência de enfermagem no **SAV é PRIVATIVA DO ENFERMEIRO**.\n\n💡 **POR QUE — e não é regra nova**: é a **Lei 7.498/86** aplicada à rua. O art. 11 diz que é privativo do enfermeiro o *'cuidado direto a paciente GRAVE com RISCO DE VIDA'* e os *'cuidados de MAIOR COMPLEXIDADE que exijam conhecimento científico e capacidade de DECISÃO IMEDIATA'*.\n\n👉 O SAV é exatamente isso: paciente grave, alta complexidade, decisão imediata, ambiente instável. Não é uma regra do COFEN inventando privatividade — é a lei sendo coerente.\n\n💡 **A TABELA DA 713/2022:**\n📌 **Remoção simples/eletiva** (Tipo A, sem risco de morte) → **técnico e/ou auxiliar**\n📌 **SBV** → tripulação mínima: **técnico de enfermagem + condutor**\n📌 **SIV** → executado pelo **ENFERMEIRO**, com atuação conjunta obrigatória de técnico ou outro enfermeiro + condutor\n📌 **SAV** → **privativo do enfermeiro** · composição: **médico + enfermeiro + condutor**\n\n⚠️ POR QUE AS OUTRAS ERRAM:\n📌 B → a 713/2022 prevê **TÉCNICO** + condutor no SBV. O auxiliar aparece nas remoções simples (Tipo A).\n📌 C → **'supervisão à distância' não existe** para o SAV. É privativo — o enfermeiro EXECUTA.\n📌 D → remoção simples SEM risco de morte é do técnico/auxiliar. Exigir enfermeiro é desperdiçar recurso.\n📌 E → SIV é do **ENFERMEIRO**, não exclusivo do técnico.\n\n⚠️ **ATUALIZAÇÃO**: a 713/2022 **REVOGOU** as Resoluções 655/2020, 679/2011 e 675/2011. Material que cita a 655 está velho.",
  },

  {
    id: "aut-urg-07", eixo: "urg", sub: "Atendimento pré-hospitalar",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A Portaria GM/MS nº 2.048/2002 classifica os veículos de atendimento pré-hospitalar. A ambulância destinada ao atendimento e transporte de pacientes de alto risco, com necessidade de cuidados intensivos, é do tipo",
    alts: ["A.", "B.", "C.", "D.", "E."],
    correta: 3,
    coment: "Gabarito: D. **Tipo D = Suporte Avançado (UTI móvel)** — pacientes de alto risco, cuidados intensivos.\n\n💡 **GUARDE PELA LETRA — o mnemônico que resolve:**\n📌 **A** → **A**penas transporte · remoção simples/eletiva · paciente **SEM risco de vida**\n📌 **B** → **B**ásico · paciente **COM risco de vida conhecido**, sem necessidade de intervenção médica no local\n📌 **C** → resgate/salvamento · **C**orpo de Bombeiros · equipamentos de resgate (terrestre, aquático, altura)\n📌 **D** → a**D**vanced · **UTI MÓVEL** · alto risco, cuidados intensivos\n📌 **E** → a**E**ronave · transporte aeromédico\n📌 **F** → embarcação · **F**luvial/aquaviário\n\n💡 **A DIFERENÇA ENTRE A E B — e cai muito**: as duas transportam. Mas a **A** é para quem **NÃO tem risco de vida** (remoção eletiva, exame, alta). A **B** é para quem **TEM risco conhecido**, mas não precisa de médico no local.\n\n💡 **O QUE DEFINE O VEÍCULO** é o **quadro clínico e o risco** — não a distância nem a vontade da família. E quem determina veículo e tripulação é o **MÉDICO REGULADOR**.\n\n💡 **A REGULAÇÃO MÉDICA** é o coração do sistema: o recurso é escasso e a demanda infinita. Se cada chamada mandasse uma UTI móvel, o sistema quebrava em uma semana. O regulador julga e define a resposta proporcional.\n\n💡 **VAGA ZERO**: em caso de risco iminente, o médico regulador determina e o hospital **É OBRIGADO a receber**, mesmo sem leito vago. Existe porque nenhuma vida pode esperar por gestão de leito.\n\n💡 Números: **192** SAMU · **193** Bombeiros · **190** Polícia. Chamado que entra pelo 190/193 deve ser **retransmitido** à Central de Regulação.",
  },

  {
    id: "aut-urg-08", eixo: "urg", sub: "Transporte do paciente de risco",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre o transporte intra-hospitalar do paciente crítico, à luz da Resolução COFEN nº 588/2018, assinale a alternativa correta.",
    alts: [
      "O transporte é atribuição exclusiva do serviço de maqueiros, cabendo à enfermagem apenas a liberação do paciente.",
      "O transporte de pacientes hospitalizados é competência da equipe de enfermagem, cabendo ao enfermeiro o planejamento, a coordenação e a supervisão.",
      "A avaliação do risco-benefício é dispensável quando o exame solicitado é de caráter diagnóstico.",
      "O paciente instável deve ser transportado imediatamente, priorizando-se a realização do exame sobre a estabilização.",
      "As intercorrências ocorridas durante o transporte devem ser comunicadas verbalmente, sendo dispensável o registro.",
    ],
    correta: 1,
    coment: "Gabarito: B. Pela **Resolução COFEN nº 588/2018**, o transporte de pacientes hospitalizados é **competência da equipe de enfermagem**, cabendo ao **enfermeiro** o planejamento, a coordenação e a supervisão.\n\n💡 **POR QUE O TRANSPORTE É PERIGOSO** — e a maioria subestima: no momento em que o paciente sai da unidade, ele **perde tudo**: monitorização plena, oxigênio de rede, equipe completa, acesso imediato a material e a carrinho de parada. Cada deslocamento é uma **janela de vulnerabilidade**.\n\n👉 Por isso a regra é: **ESTABILIZAR ANTES DE TRANSPORTAR** (mata a alternativa D).\n\n💡 **A PERGUNTA QUE ABRE TODO TRANSPORTE**: *o benefício supera o risco?* Transportar paciente instável para 'fazer uma tomografia' cujo resultado **não muda a conduta imediata** é expor a risco sem ganho. A avaliação de risco-benefício **nunca é dispensável** (mata a C).\n\n💡 **AS TRÊS FASES:**\n📌 **PREPARO** → avaliação risco-benefício · estabilização prévia · checagem de equipamentos e materiais · comunicação com o destino · definição da equipe\n📌 **TRANSFERÊNCIA** → monitorização contínua · manutenção de acessos e dispositivos\n📌 **CHEGADA/RETORNO** → passagem estruturada do caso · reavaliação · **REGISTRO** das intercorrências\n\n⚠️ A alternativa E dispensa o registro — e registro de intercorrência é **documento legal**. Não se dispensa.\n\n⚠️ A alternativa A trata o transporte como 'tarefa de maqueiro'. Errado: é competência da enfermagem, com coordenação do enfermeiro.\n\n💡 **Portaria 2.048/2002**: todo paciente grave deve ser transportado com acompanhamento contínuo de, no mínimo, **um médico e um enfermeiro**, ambos com habilidade comprovada em urgência.\n\n💡 **PONTO ÉTICO QUE CAI**: se as condições clínicas não correspondem ao informado e o veículo/equipe não garantem transporte seguro, a equipe **deve comunicar o regulador** e registrar. Aceitar calado um transporte inseguro é assumir a responsabilidade.",
  },

  {
    id: "aut-urg-09", eixo: "urg", sub: "Urgência e emergência",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um homem de 62 anos chega à emergência com dor torácica retroesternal em aperto, iniciada há 40 minutos, irradiada para o membro superior esquerdo, associada a sudorese fria e náuseas. Sobre a conduta inicial da enfermagem, é correto afirmar que",
    alts: [
      "a prioridade é obter acesso venoso e administrar morfina para alívio imediato da dor.",
      "o eletrocardiograma de 12 derivações deve ser realizado em até 10 minutos da chegada.",
      "a oxigenoterapia deve ser instituída rotineiramente a todos os pacientes com suspeita de infarto.",
      "deve-se aguardar o resultado da troponina antes de qualquer intervenção terapêutica.",
      "a deambulação assistida está indicada para avaliar a tolerância ao esforço.",
    ],
    correta: 1,
    coment: "Gabarito: B. **ECG de 12 derivações em até 10 MINUTOS** da chegada — é a ação mais cobrada e a mais decisiva.\n\n💡 **POR QUE 10 MINUTOS**: o ECG é o que diferencia o **IAM com supra de ST** (que precisa de reperfusão IMEDIATA — angioplastia ou trombolítico) do **sem supra**. Sem ECG, você não sabe o que tratar. E no infarto, **tempo é músculo**: cada minuto de artéria ocluída é miocárdio que morre e não volta.\n\n⚠️ **A ALTERNATIVA C É A PEGADINHA CLÁSSICA — 'oxigênio para todos'**: **NÃO**. O O₂ suplementar só se **SatO₂ < 90%**. Ofertar oxigênio a quem já está bem saturado causa **HIPERÓXIA**, que provoca **vasoconstrição coronariana** e pode AUMENTAR a área de infarto. Era rotina há anos — hoje é erro.\n\n👉 Essa mudança é ouro de prova: a banca adora quem ainda acha que 'oxigênio não faz mal a ninguém'.\n\n⚠️ A alternativa D é grave: **não se espera troponina** para agir. A troponina leva horas para subir — se você esperar, o paciente infarta enquanto o exame processa. O ECG é imediato; a troponina confirma depois.\n\n⚠️ E a E é absurda: **deambular** paciente com suspeita de IAM é aumentar o consumo de oxigênio do miocárdio isquêmico. Repouso absoluto.\n\n💡 **A CONDUTA INICIAL**: ECG em 10 min · repouso · monitorização · acesso venoso · O₂ **se** SatO₂ < 90% · coleta de marcadores · preparar para reperfusão.\n\n💡 **A TROPONINA** é o marcador de escolha — alta sensibilidade e especificidade. A CK-MB é mais antiga e menos específica.\n\n💡 **APRESENTAÇÃO ATÍPICA — o que salva vida**: mulheres, idosos e **DIABÉTICOS** podem infartar **SEM DOR**. A neuropatia autonômica do diabético compromete as fibras que conduzem a dor visceral — é o **infarto silencioso**. Diante de diabético com dispneia súbita e sudorese, pense em IAM mesmo sem dor torácica.",
  },

  {
    id: "aut-urg-10", eixo: "urg", sub: "Urgência e emergência",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Uma paciente de 25 anos é admitida na emergência após picada de abelha, apresentando urticária generalizada, edema de lábios e língua, estridor laríngeo, dispneia e pressão arterial de 80/50 mmHg. O medicamento de primeira escolha e a via de administração são, respectivamente,",
    alts: [
      "hidrocortisona, por via intravenosa.",
      "difenidramina, por via intramuscular.",
      "adrenalina, por via intramuscular na face anterolateral da coxa.",
      "adrenalina, por via subcutânea no braço.",
      "salbutamol, por via inalatória.",
    ],
    correta: 2,
    coment: "Gabarito: C. **ANAFILAXIA → ADRENALINA IM na face anterolateral da coxa (vasto lateral).** Primeira escolha, sem discussão.\n\n💡 **POR QUE ADRENALINA — e por que nada mais serve no primeiro momento:** ela é a única droga que faz **as três coisas ao mesmo tempo**:\n📌 **Vasoconstrição** (α1) → sobe a pressão, reduz o edema\n📌 **Broncodilatação** (β2) → abre a via aérea\n📌 **Inotropismo** (β1) → melhora o débito cardíaco\n\n👉 Corticoide e anti-histamínico são **adjuvantes** — demoram **horas** para agir. O paciente com edema de glote não tem horas. Dar hidrocortisona na anafilaxia e achar que tratou é deixar morrer com o remédio certo pela metade.\n\n💡 **POR QUE IM NA COXA E NÃO SC NO BRAÇO** (mata a alternativa D) — e isso é fisiologia pura: o **vasto lateral** é músculo grande, muito vascularizado, com **absorção rápida e previsível**. A via **subcutânea** tem absorção **lenta e errática** — e na anafilaxia o paciente já está **vasoconstrito por choque**, o que piora ainda mais a absorção subcutânea.\n\n👉 Estudos mostram pico sérico mais rápido e mais alto com IM em coxa do que SC em braço. Não é preferência — é a diferença entre chegar e não chegar.\n\n💡 **A DOSE**: adrenalina 1:1000 · 0,3 a 0,5 mg IM no adulto · pode repetir a cada 5–15 minutos.\n\n💡 **RECONHECER A ANAFILAXIA**: início súbito + **acometimento de dois ou mais sistemas** (pele + respiratório + cardiovascular + GI). Aqui: urticária (pele) + estridor/dispneia (respiratório) + hipotensão (cardiovascular). Três sistemas.\n\n⚠️ **NUNCA** atrase a adrenalina para 'tentar' anti-histamínico primeiro. É o erro que mata em anafilaxia.",
  },

  {
    id: "aut-urg-11", eixo: "urg", sub: "Urgência e emergência",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre os tipos de choque circulatório e suas manifestações, assinale a alternativa correta.",
    alts: [
      "O choque hipovolêmico é o mais comum e sua conduta inicial é a administração de drogas vasoativas.",
      "No choque cardiogênico, a causa é a perda de volume intravascular, sendo a reposição volêmica vigorosa a conduta prioritária.",
      "No choque distributivo em fase inicial, a pele pode apresentar-se quente e corada, apesar do quadro de choque.",
      "O choque obstrutivo decorre de vasodilatação sistêmica intensa, como na sepse e na anafilaxia.",
      "A presença de pele fria e pegajosa exclui o diagnóstico de choque séptico.",
    ],
    correta: 2,
    coment: "Gabarito: C. No choque **DISTRIBUTIVO** inicial (séptico, neurogênico, anafilático), a pele pode estar **QUENTE e CORADA** — é o chamado **'choque quente'**.\n\n💡 **POR QUE A PELE É FRIA NA MAIORIA DOS CHOQUES** — e por que aqui não é: normalmente, o organismo detecta a queda de perfusão e responde com **VASOCONSTRIÇÃO periférica**: fecha a circulação da pele e das extremidades para **CENTRALIZAR** o sangue no cérebro e no coração. Daí a pele fria, pálida, pegajosa, e a oligúria (o rim também é sacrificado).\n\n👉 No **distributivo**, o problema **É a vasodilatação** — os vasos **não conseguem fechar**. Por isso a pele fica quente na fase inicial.\n\n⚠️ **E é exatamente aí que se perde tempo**: o paciente está chocando, mas 'parece bem' — quentinho, corado. Quem procura pele fria como sinal de choque **deixa passar o séptico**. Por isso a alternativa E é gravíssima: pele fria **NÃO exclui** choque séptico (na fase tardia, o séptico também esfria).\n\n💡 **OS QUATRO TIPOS:**\n📌 **HIPOVOLÊMICO** → perda de volume (hemorragia, desidratação) · **o mais comum** · conduta: **REPOR VOLUME**\n📌 **CARDIOGÊNICO** → falha de bomba (IAM extenso, arritmia) · o coração não ejeta\n📌 **DISTRIBUTIVO** → vasodilatação intensa · séptico, anafilático, neurogênico\n📌 **OBSTRUTIVO** → obstrução mecânica ao fluxo (tamponamento, pneumotórax hipertensivo, TEP)\n\n⚠️ **AS INVERSÕES DA QUESTÃO**: a alternativa A dá vasopressor antes de volume no hipovolêmico (**errado** — primeiro repõe o que falta; droga vasoativa não substitui sangue). A B descreve o hipovolêmico e chama de cardiogênico. A D descreve o distributivo e chama de obstrutivo.\n\n💡 **SINAIS GERAIS**: taquicardia · hipotensão · pele fria e pegajosa · palidez · oligúria · alteração do nível de consciência.",
  },

  {
    id: "aut-urg-12", eixo: "urg", sub: "Politraumatizado",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Uma vítima de queimadura por líquido superaquecido apresenta lesões em todo o membro superior direito, tórax anterior e face anterior da coxa direita. As lesões apresentam flictenas, são dolorosas e há áreas de aspecto branco-nacarado e indolor. Sobre esse caso, é correto afirmar que",
    alts: [
      "as áreas indolores indicam menor gravidade, por preservação das terminações nervosas.",
      "as áreas de aspecto branco-nacarado e indolor correspondem a queimadura de terceiro grau.",
      "a superfície corporal queimada deve incluir as lesões de primeiro grau no cálculo.",
      "a presença de flictenas caracteriza queimadura de primeiro grau.",
      "a queimadura de segundo grau é indolor por acometer a derme profunda.",
    ],
    correta: 1,
    coment: "Gabarito: B. Aspecto **branco-nacarado e INDOLOR** = **TERCEIRO GRAU** (espessura total).\n\n💡 **O PARADOXO CRUEL QUE A BANCA ADORA**: a queimadura de **3º grau NÃO DÓI** — porque **destruiu as terminações nervosas** da derme. Quanto **mais profunda, MENOS dói**.\n\n👉 Por isso a alternativa A é uma armadilha perversa: ela usa a ausência de dor como sinal de **menor** gravidade, quando é o oposto. **A área que não dói é a mais grave.** O paciente que grita está com 2º grau; o que não sente naquele ponto tem 3º.\n\n💡 **A CLASSIFICAÇÃO:**\n📌 **1º GRAU** → só **epiderme** · eritema, dor, **SEM flictena** (ex.: queimadura solar) · **NÃO entra no cálculo** da superfície corporal queimada\n📌 **2º GRAU** → epiderme + derme · **FLICTENAS (bolhas)** · **MUITO dolorosa** (as terminações estão expostas!)\n📌 **3º GRAU** → espessura total · branco-nacarado ou carbonizado · **INDOLOR**\n\n👉 Isso mata as alternativas D (flictena é 2º, não 1º) e E (2º grau é o que MAIS dói).\n\n⚠️ **A ALTERNATIVA C — o erro de cálculo**: a queimadura de **1º grau NÃO ENTRA** na superfície corporal queimada. Se entrasse, todo mundo que tomou sol teria 20% de SCQ.\n\n💡 **REGRA DOS 9** (adulto): cabeça **9%** · cada membro superior **9%** · tórax anterior **18%** · dorso **18%** · cada membro inferior **18%** · genitália **1%**.\n\n💡 **A URGÊNCIA DO QUEIMADO DE FACE**: o **edema de via aérea** por lesão inalatória evolui em **horas** e fecha a passagem. Sinais de alerta: rouquidão, estridor, escarro carbonáceo, queimadura de vibrissas nasais. **Intuba ANTES de fechar** — depois não entra mais tubo.",
  },

  {
    id: "aut-urg-13", eixo: "urg", sub: "Suporte básico de vida",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Durante um almoço em família, um homem de 50 anos leva as mãos ao pescoço, não consegue falar nem tossir e apresenta cianose progressiva. Considerando as diretrizes vigentes para obstrução de via aérea por corpo estranho (OVACE), a conduta é",
    alts: [
      "encorajar a tosse e observar, pois a obstrução é leve.",
      "realizar cinco golpes nas costas seguidos de cinco compressões abdominais, alternando até a desobstrução.",
      "iniciar imediatamente a manobra de Heimlich, sem medidas prévias.",
      "realizar varredura digital da cavidade oral para localizar e remover o corpo estranho.",
      "posicionar a vítima em decúbito dorsal e iniciar compressões torácicas.",
    ],
    correta: 1,
    coment: "Gabarito: B. **5 golpes nas costas + 5 compressões abdominais, ALTERNANDO** — até desobstruir ou a vítima perder a consciência.\n\n⚠️ **ESTA É A MUDANÇA MAIS CONCRETA DA AHA 2025** — e a alternativa C é o protocolo ANTIGO. Antes, adulto e criança começavam **direto pelo Heimlich** (compressões abdominais), e os golpes nas costas eram só para bebês.\n\n💡 **POR QUE MUDOU**: estudos observacionais mostraram **maior taxa de desobstrução e menos lesões** quando se começa pelos golpes nas costas. E há um ganho de ensino: agora o algoritmo é **o mesmo para todas as idades** (mudando só o tipo de compressão), o que **reduz erro sob estresse** — que é justamente quando o engasgo acontece.\n\n💡 **RECONHECER A OBSTRUÇÃO GRAVE**: o enunciado entrega o **sinal universal** (mãos ao pescoço) + **não fala, não tosse** + cianose. Se ele **não consegue tossir**, a obstrução é **GRAVE** — mata a alternativa A.\n\n👉 Na obstrução **LEVE** (tosse eficaz), **NÃO se intervém**: encoraja-se a tosse e observa. A tosse é o mecanismo mais eficaz que existe. Bater nas costas de quem tosse bem pode piorar.\n\n💡 **AS ADAPTAÇÕES:**\n📌 **Gestante 3º trimestre e obeso** → compressões **TORÁCICAS** (não abdominais)\n📌 **Bebê < 1 ano** → 5 golpes nas costas + 5 compressões **TORÁCICAS**. Compressão abdominal é **CONTRAINDICADA** (risco de lesão de órgãos).\n📌 **Perda de consciência** → iniciar **RCP**. Inspecionar a boca **apenas antes das ventilações**.\n\n⚠️ **A VARREDURA CEGA É PROIBIDA** (mata a alternativa D): só se remove o corpo estranho **se ele estiver VISÍVEL**. A varredura às cegas **empurra o objeto mais fundo**.",
  },

  {
    id: "aut-urg-14", eixo: "urg", sub: "Urgência e emergência",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre os ritmos de parada cardiorrespiratória e suas condutas, assinale a alternativa correta.",
    alts: [
      "A assistolia e a atividade elétrica sem pulso (AESP) são ritmos chocáveis, devendo-se realizar desfibrilação imediata.",
      "Na fibrilação ventricular, a adrenalina deve ser administrada antes do primeiro choque.",
      "Após a desfibrilação, deve-se checar imediatamente o pulso antes de retomar as compressões.",
      "Na assistolia, a conduta é RCP de alta qualidade associada à adrenalina precoce e à busca de causas reversíveis.",
      "A atividade elétrica sem pulso caracteriza-se pela ausência total de atividade elétrica no monitor.",
    ],
    correta: 3,
    coment: "Gabarito: D. **Assistolia** = ritmo **NÃO chocável** → **RCP de alta qualidade + ADRENALINA PRECOCE + buscar causas reversíveis (5H e 5T)**.\n\n⚠️ **A PEGADINHA MAIS FAMOSA DE TODA A URGÊNCIA — chocar assistolia (alternativa A)**: **NÃO SE CHOCA!** Desfibrilar exige atividade elétrica **caótica** para ser reorganizada. Na assistolia **NÃO HÁ atividade elétrica nenhuma** — não há o que reorganizar. Chocar linha reta não faz nada além de **atrasar a RCP**.\n\n💡 **OS 4 RITMOS:**\n📌 **CHOCÁVEIS**: **FV** (fibrilação ventricular) e **TVSP** (taquicardia ventricular sem pulso) → **DESFIBRILA**\n📌 **NÃO CHOCÁVEIS**: **AESP** e **ASSISTOLIA** → **RCP + ADRENALINA**\n\n💡 **ASSISTOLIA × AESP — a diferença que cai:**\n📌 **ASSISTOLIA** → ausência **TOTAL** de atividade elétrica (linha reta)\n📌 **AESP** → **HÁ ritmo elétrico organizado** no monitor, mas **SEM PULSO**. O coração 'pensa' que está batendo, mas não ejeta.\n👉 A alternativa E troca as definições.\n\n💡 **QUANDO ENTRA A ADRENALINA:**\n📌 Ritmo **NÃO chocável** → **o mais PRECOCE possível** (idealmente nos primeiros 3 minutos)\n📌 Ritmo **chocável** → **após o 2º choque**\n👉 A alternativa B inverte (adrenalina antes do 1º choque na FV).\n\n⚠️ **APÓS O CHOQUE, NÃO SE CHECA PULSO** (mata a alternativa C): retoma-se a **RCP imediatamente** por 2 minutos e só então se reavalia. Querer conferir o pulso logo após o choque é erro de sequência clássico — e desperdiça segundos preciosos.\n\n💡 **PROTOCOLO DA LINHA RETA (CAGADA)**: antes de confirmar assistolia, cheque **CA**bos, **GA**nho e **D**erivação — para não tratar como assistolia uma FV fina mal captada.\n\n💡 **5H**: Hipóxia · Hipovolemia · Hidrogênio (acidose) · Hipo/hipercalemia · Hipotermia. **5T**: Tensão no tórax (pneumotórax) · Tamponamento · Tóxicos · Trombose pulmonar · Trombose coronariana.",
  },

  // ═══════════ AUTORAIS: SEGURANÇA DO PACIENTE ═══════════
{
    id: "aut-seg-01", eixo: "seg", sub: "Assepsia e antissepsia",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Uma enfermeira supervisiona a montagem de um campo estéril para um procedimento à beira-leito e orienta a equipe sobre os princípios da técnica asséptica. Considerando as normas de assepsia cirúrgica, é correto afirmar que",
    alts: [
      "a borda do campo estéril, em toda a sua extensão, é considerada área estéril e pode receber material.",
      "objetos estéreis mantidos abaixo do nível da cintura do profissional permanecem estéreis se cobertos.",
      "uma vez aberto, o campo estéril só é considerado contaminado se houver contato visível com fluidos.",
      "a área compreendida na faixa de 2,5 cm da borda do campo é considerada não estéril (zona de contaminação).",
      "o profissional pode virar as costas para o campo estéril desde que mantenha as mãos enluvadas elevadas.",
    ],
    correta: 3,
    coment: "Gabarito: D. Por convenção da técnica asséptica, uma faixa de 2,5 cm (1 polegada) na borda do campo estéril é considerada NÃO estéril — material não pode ser colocado ali. As bordas são sempre a zona de risco.\n\n💡 PRINCÍPIOS DA ASSEPSIA (memorize os campeões de prova):\n• Estéril só toca estéril.\n• O que está ABAIXO da cintura ou fora do campo de visão é considerado CONTAMINADO — por isso não se vira as costas para o campo (alternativa E erra).\n• Campo estéril molhado = contaminado (strike-through), independentemente de haver contato visível (C erra).\n• Nunca alcançar por cima do campo estéril.\n\n⚠️ PEGADINHA: a alternativa A parece correta ('borda é estéril'), mas é exatamente o inverso — a borda é a zona de contaminação. A banca adora inverter esse detalhe dos 2,5 cm.",
  },

  {
    id: "aut-seg-02", eixo: "seg", sub: "Assepsia e antissepsia",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a higiene das mãos na assistência à saúde, segundo os '5 momentos' preconizados pela Organização Mundial da Saúde e adotados pela ANVISA, assinale a alternativa que apresenta corretamente uma dessas indicações.",
    alts: [
      "Após tocar superfícies próximas ao paciente, mesmo sem ter tocado o paciente.",
      "Somente antes de procedimentos invasivos, dispensada nos demais contatos.",
      "Apenas após a retirada das luvas, já que a luva substitui a higienização prévia.",
      "Exclusivamente ao entrar e ao sair da unidade de internação, uma vez por turno.",
      "A cada duas horas, independentemente do contato com pacientes ou superfícies.",
    ],
    correta: 0,
    coment: "Gabarito: A. 'Após contato com as áreas próximas ao paciente' é o 5º momento da OMS — mesmo que você não tenha tocado o paciente, tocar a mesa de cabeceira, grades ou bomba de infusão exige higienizar as mãos ao se afastar.\n\n💡 OS 5 MOMENTOS DA OMS:\n1. ANTES de tocar o paciente\n2. ANTES de procedimento limpo/asséptico\n3. APÓS risco de exposição a fluidos corporais\n4. APÓS tocar o paciente\n5. APÓS tocar superfícies próximas ao paciente\n\n💡 BIZU: momentos 1 e 2 protegem o PACIENTE; momentos 3, 4 e 5 protegem o PROFISSIONAL e o ambiente.\n\n⚠️ A luva NÃO substitui a higiene das mãos (C erra) — higieniza-se antes de calçar e depois de retirar. E não existe higiene 'por relógio' (D e E erram): é por INDICAÇÃO, não por tempo fixo.",
  },

  {
    id: "aut-seg-03", eixo: "seg", sub: "Biossegurança",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um técnico de enfermagem sofre acidente com material perfurocortante durante o descarte de uma agulha após punção venosa em paciente com sorologia desconhecida. Considerando as normas de biossegurança e a conduta pós-exposição, é correto afirmar que",
    alts: [
      "o profissional deve espremer vigorosamente o local para expelir o máximo de sangue possível.",
      "a agulha deve ser reencapada com as duas mãos antes do descarte para evitar novo acidente.",
      "a conduta inclui lavar o local com água e sabão e notificar imediatamente, avaliando profilaxia pós-exposição.",
      "não há necessidade de investigação sorológica do paciente-fonte quando a fonte é desconhecida.",
      "o descarte de perfurocortantes pode ser feito em saco branco leitoso identificado como infectante.",
    ],
    correta: 2,
    coment: "Gabarito: C. A conduta correta após acidente perfurocortante: lavar com água e sabão (mucosa: soro fisiológico/água), NÃO espremer, notificar imediatamente (CAT + registro), avaliar o paciente-fonte e indicar profilaxia pós-exposição (PEP) conforme o risco.\n\n💡 O QUE NUNCA FAZER (as pegadinhas clássicas):\n• NÃO espremer o local (A erra) — não reduz risco e pode aumentar a lesão tecidual.\n• NÃO reencapar agulha (B erra) — reencape é a principal causa de acidentes; descarte direto na caixa rígida.\n• Perfurocortante vai em CAIXA RÍGIDA (Grupo E), não em saco (E erra).\n\n💡 NR-32 é a norma-mãe da biossegurança em serviços de saúde. Fonte desconhecida NÃO dispensa investigação (D erra) — avalia-se o risco epidemiológico.",
  },

  {
    id: "aut-seg-04", eixo: "seg", sub: "Biossegurança",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "De acordo com a RDC ANVISA nº 222/2018, que regulamenta o gerenciamento de resíduos de serviços de saúde (RSS), a correta segregação dos resíduos é etapa fundamental da biossegurança. Sobre os grupos de resíduos, é correto afirmar que",
    alts: [
      "resíduos do Grupo A (biológicos/infectantes) devem ser descartados em saco branco leitoso.",
      "peças anatômicas e bolsas de sangue vencidas pertencem ao Grupo D (resíduos comuns).",
      "medicamentos vencidos e resíduos químicos perigosos pertencem ao Grupo A.",
      "agulhas, lâminas e ampolas de vidro pertencem ao Grupo A e vão em saco vermelho.",
      "resíduos comuns, como papel de escritório, pertencem ao Grupo E e vão em caixa rígida.",
    ],
    correta: 0,
    coment: "Gabarito: A. Resíduos do Grupo A (potencialmente infectantes/biológicos) são acondicionados em SACO BRANCO LEITOSO com o símbolo de substância infectante.\n\n💡 GRUPOS DA RDC 222/2018 (decoreba de ouro):\n• A – Biológicos/infectantes → saco branco leitoso\n• B – Químicos (medicamentos, quimioterápicos) → recipiente conforme risco\n• C – Radioativos → rejeitos radioativos\n• D – Comuns (papel, resto de comida) → saco preto/comum, reciclável\n• E – Perfurocortantes (agulha, lâmina, vidro) → CAIXA RÍGIDA amarela\n\n⚠️ As armadilhas: peças anatômicas/bolsas de sangue = Grupo A, não D (B erra). Medicamentos vencidos = Grupo B, não A (C erra). Perfurocortante = Grupo E em caixa rígida, não saco vermelho (D erra — 'saco vermelho' nem existe nessa classificação).",
  },

  {
    id: "aut-seg-05", eixo: "seg", sub: "Programa Nacional de Imunização",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Durante a organização da sala de vacinação, a enfermeira orienta a equipe sobre a conservação de imunobiológicos na rede de frio. Considerando as normas do Programa Nacional de Imunizações, é correto afirmar que",
    alts: [
      "a temperatura ideal de conservação dos imunobiológicos na instância local é de 0 °C a +4 °C.",
      "os imunobiológicos devem ser conservados entre +2 °C e +8 °C na sala de vacinação.",
      "as vacinas podem ser mantidas na porta do refrigerador para facilitar o acesso da equipe.",
      "o descongelamento acidental de vacinas de vírus atenuado não compromete sua eficácia.",
      "a leitura da temperatura do refrigerador deve ser feita e registrada apenas uma vez ao dia.",
    ],
    correta: 1,
    coment: "Gabarito: B. Na instância local (sala de vacinação), os imunobiológicos são conservados entre +2 °C e +8 °C, com temperatura ideal em torno de +5 °C.\n\n💡 REDE DE FRIO — os números que caem:\n• Sala de vacinação (local): +2 °C a +8 °C.\n• A leitura da temperatura (máxima e mínima) é registrada no início e no fim da jornada — ao menos 2x ao dia (E erra).\n• NUNCA guardar vacina na porta do refrigerador (C erra) — a porta oscila muito de temperatura. Use as prateleiras; a inferior recebe garrafas com água/gelo para estabilizar.\n\n⚠️ A alternativa A (0 a +4 °C) é a pegadinha número um: vacina não pode chegar perto de 0 °C — risco de congelar. Vacinas de bactérias/toxoides (ex.: dT, DTP, hepatite B) são as mais sensíveis ao CONGELAMENTO e perdem potência se congeladas (D erra).",
  },

  {
    id: "aut-seg-06", eixo: "seg", sub: "Limpeza, desinfecção e esterilização",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Ao classificar os artigos hospitalares segundo Spaulding para definir o processamento adequado, a enfermeira do CME avalia diferentes materiais. Sobre essa classificação, é correto afirmar que",
    alts: [
      "artigos semicríticos, que entram em contato com pele íntegra, exigem apenas limpeza.",
      "artigos críticos, que penetram tecidos estéreis ou o sistema vascular, exigem esterilização.",
      "artigos não críticos, que tocam mucosas íntegras, exigem desinfecção de alto nível.",
      "um endoscópio digestivo é classificado como artigo crítico e deve ser esterilizado por vapor.",
      "a classificação de Spaulding baseia-se no material de composição do artigo, não em seu uso.",
    ],
    correta: 1,
    coment: "Gabarito: B. Artigos CRÍTICOS penetram pele/mucosa, tecidos estéreis ou o sistema vascular (ex.: instrumental cirúrgico, cateteres, agulhas) — exigem ESTERILIZAÇÃO.\n\n💡 CLASSIFICAÇÃO DE SPAULDING (a mais cobrada do CME):\n• CRÍTICO → penetra tecido estéril/vascular → ESTERILIZAÇÃO\n• SEMICRÍTICO → contato com mucosa ou pele não íntegra → desinfecção de ALTO nível (mínimo)\n• NÃO CRÍTICO → contato com pele íntegra → limpeza ou desinfecção de baixo/médio nível\n\n⚠️ As trocas que a banca faz: semicrítico NÃO é 'pele íntegra' (A troca a definição). Não crítico NÃO toca mucosa (C troca). Endoscópio digestivo é SEMICRÍTICO (toca mucosa), não crítico — desinfecção de alto nível, e não vapor, pois é termossensível (D erra). E a classificação se baseia no USO/RISCO, não no material (E erra).",
  },


  // ═══════════ AUTORAIS: ADMINISTRAÇÃO ═══════════
{
    id: "aut-admin-01", eixo: "admin", sub: "Dimensionamento de pessoal",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "A enfermeira responsável técnica realiza o dimensionamento do quadro de enfermagem de uma unidade de internação. De acordo com a Resolução COFEN nº 543/2017, sobre os parâmetros do dimensionamento, é correto afirmar que",
    alts: [
      "o dimensionamento independe do Sistema de Classificação de Pacientes (SCP), bastando o número de leitos.",
      "para cuidados intensivos, considera-se a proporção de 17,9 horas de enfermagem por leito nas 24 horas.",
      "a distribuição percentual de profissionais é fixa em 50% enfermeiros e 50% técnicos em qualquer unidade.",
      "o Índice de Segurança Técnica (IST) recomendado não deve ser inferior a 15%.",
      "as horas de assistência para cuidado mínimo são superiores às de cuidado semi-intensivo.",
    ],
    correta: 3,
    coment: "Gabarito: D. A COFEN 543/2017 estabelece o Índice de Segurança Técnica (IST) de no mínimo 15% — é o acréscimo sobre o quadro para cobrir ausências (férias, folgas, licenças, absenteísmo).\n\n💡 HORAS DE ENFERMAGEM / 24h por tipo de cuidado (COFEN 543/2017):\n• Mínimo: 4h · Intermediário: 6h · Alta dependência: 10h · Semi-intensivo: 10h · Intensivo: 18h\n\n💡 O dimensionamento DEPENDE do SCP (A erra) — é ele que define o tipo de cuidado. A proporção de profissionais VARIA conforme a complexidade (C erra): quanto mais complexo, maior o percentual de enfermeiros.\n\n⚠️ A alternativa E inverte a lógica: cuidado mínimo tem MENOS horas (4h) que o semi-intensivo (10h). B troca o número do intensivo (é 18h, não 17,9). Cuidado intensivo é o que mais consome horas.",
  },

  {
    id: "aut-admin-02", eixo: "admin", sub: "Dimensionamento de pessoal",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre o Sistema de Classificação de Pacientes (SCP), instrumento fundamental para o dimensionamento de pessoal de enfermagem, assinale a alternativa correta.",
    alts: [
      "Classifica os pacientes segundo o grau de dependência da equipe de enfermagem em relação ao cuidado.",
      "É aplicado uma única vez, na admissão, e não se altera durante a internação.",
      "Serve apenas para fins estatísticos, sem relação com a alocação de profissionais.",
      "Substitui a avaliação clínica individual do paciente pela equipe de enfermagem.",
      "É de responsabilidade exclusiva do médico assistente da unidade.",
    ],
    correta: 0,
    coment: "Gabarito: A. O SCP classifica os pacientes conforme o grau de dependência da equipe de enfermagem, orientando quantos e quais profissionais são necessários.\n\n💡 O SCP é DINÂMICO: reavaliado periodicamente (idealmente a cada 24h ou a cada mudança de estado), pois a dependência muda ao longo da internação (B erra).\n\n💡 É atribuição do ENFERMEIRO (E erra) e tem impacto direto na alocação de pessoal (C erra) — não é mero dado estatístico.\n\n⚠️ O SCP não substitui a avaliação clínica (D erra); é uma ferramenta que a COMPLEMENTA para fins de gestão.",
  },

  {
    id: "aut-admin-03", eixo: "admin", sub: "Liderança e trabalho em equipe",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Uma enfermeira coordena uma equipe multiprofissional e adapta seu estilo de liderança conforme a maturidade e a competência dos liderados para cada tarefa. Esse modelo, em que o líder ajusta seu comportamento à situação, é característico da",
    alts: [
      "liderança autocrática, centralizadora das decisões.",
      "liderança laissez-faire, com ausência de direcionamento.",
      "liderança situacional, que varia conforme o contexto e o grupo.",
      "liderança liberal, em que a equipe decide sem interferência.",
      "liderança carismática, baseada apenas em traços de personalidade.",
    ],
    correta: 2,
    coment: "Gabarito: C. A liderança SITUACIONAL (Hersey e Blanchard) parte do princípio de que não existe um único estilo ideal — o líder ajusta seu comportamento (mais diretivo ou mais apoiador) ao nível de maturidade/prontidão do liderado para cada tarefa.\n\n💡 ESTILOS CLÁSSICOS (Lewin) — não confundir:\n• Autocrático: líder centraliza, decide sozinho.\n• Democrático/participativo: decisões compartilhadas.\n• Liberal (laissez-faire): mínima interferência, equipe decide.\n\n⚠️ A pegadinha é misturar 'liberal' e 'situacional'. Situacional NÃO é ausência de direção — é ADAPTAÇÃO da direção conforme o grupo. A palavra-chave do enunciado ('adapta conforme a maturidade') entrega a resposta.",
  },

  {
    id: "aut-admin-04", eixo: "admin", sub: "Teorias da administração",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "As teorias da administração influenciaram historicamente a organização do trabalho em enfermagem. Sobre essas teorias, é correto associar",
    alts: [
      "a Administração Científica de Taylor à ênfase nas relações humanas e na motivação do trabalhador.",
      "a Teoria Clássica de Fayol às funções administrativas de planejar, organizar, dirigir e controlar.",
      "a Teoria das Relações Humanas de Mayo ao estudo de tempos e movimentos na linha de produção.",
      "a Teoria Burocrática de Weber à informalidade e à ausência de normas escritas.",
      "a Teoria de Sistemas ao foco exclusivo no ambiente interno da organização.",
    ],
    correta: 1,
    coment: "Gabarito: B. Fayol (Teoria Clássica) definiu as funções administrativas — no formato moderno, PLANEJAR, ORGANIZAR, DIRIGIR e CONTROLAR (o clássico PODC). Muito cobrado na gestão em enfermagem.\n\n💡 QUEM É QUEM (a decoreba que a banca adora trocar):\n• Taylor → Administração Científica → tempos e movimentos, eficiência da tarefa (não relações humanas — A erra).\n• Fayol → Teoria Clássica → funções administrativas, estrutura.\n• Mayo → Relações Humanas → experiência de Hawthorne, motivação, grupo informal (não tempos e movimentos — C erra).\n• Weber → Burocracia → normas escritas, impessoalidade, hierarquia (não informalidade — D erra).\n\n⚠️ A Teoria de Sistemas vê a organização como um sistema ABERTO, em troca com o ambiente (E erra ao dizer 'exclusivo interno').",
  },

  {
    id: "aut-admin-05", eixo: "admin", sub: "Gestão da qualidade e indicadores",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Na gestão da qualidade em enfermagem, os indicadores permitem monitorar a assistência. Sobre a classificação de indicadores segundo o modelo de Donabedian, é correto afirmar que a taxa de úlcera por pressão adquirida na internação é um indicador de",
    alts: [
      "estrutura, pois avalia os recursos físicos e materiais disponíveis.",
      "processo, pois mede como o cuidado foi executado.",
      "resultado, pois reflete o efeito da assistência sobre o paciente.",
      "estrutura, pois depende do número de profissionais da unidade.",
      "processo, pois avalia a adesão a protocolos de prevenção.",
    ],
    correta: 2,
    coment: "Gabarito: C. A taxa de lesão por pressão (LPP) adquirida é um indicador de RESULTADO — reflete o efeito final do cuidado sobre o paciente (um desfecho, um dano evitável).\n\n💡 TRÍADE DE DONABEDIAN (campeã de prova):\n• ESTRUTURA → recursos: nº de leitos, equipamentos, profissionais, materiais.\n• PROCESSO → como o cuidado é feito: adesão a protocolos, higiene das mãos, mudança de decúbito registrada.\n• RESULTADO → o desfecho no paciente: taxa de LPP, taxa de infecção, mortalidade, satisfação.\n\n⚠️ A pegadinha fina: a MUDANÇA DE DECÚBITO (a ação preventiva) é PROCESSO; a LPP que apareceu (o desfecho) é RESULTADO. A banca aposta que você confunde a ação com o efeito. Pergunte-se: 'isso é um recurso, uma ação ou um desfecho no paciente?'",
  },

  {
    id: "aut-admin-06", eixo: "admin", sub: "Gestão de pessoas e escalas",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A enfermeira elabora a escala mensal de trabalho da equipe de enfermagem. Sobre os tipos de escala e a organização do serviço, é correto afirmar que",
    alts: [
      "a escala diária substitui a escala mensal e dispensa o planejamento antecipado.",
      "a escala de férias deve ser elaborada de modo a não comprometer a cobertura assistencial da unidade.",
      "a distribuição de folgas pode desconsiderar a legislação trabalhista, a critério da chefia.",
      "a escala de horário é de responsabilidade do setor de recursos humanos, não da enfermagem.",
      "o remanejamento de pessoal entre unidades é vedado em qualquer circunstância.",
    ],
    correta: 1,
    coment: "Gabarito: B. A escala de férias precisa garantir que a unidade não fique descoberta — planeja-se a distribuição ao longo do ano para manter a assistência segura.\n\n💡 TIPOS DE ESCALA que a banca cobra:\n• Mensal: planejamento do mês (turnos, folgas).\n• Diária: distribuição dos profissionais presentes por paciente/tarefa naquele dia — COMPLEMENTA a mensal, não substitui (A erra).\n• De férias: anual, escalonada.\n\n💡 A elaboração da escala é atribuição do ENFERMEIRO/chefia de enfermagem (D erra), sempre respeitando a legislação trabalhista e os direitos de descanso (C erra).\n\n⚠️ Remanejamento é possível conforme necessidade do serviço, com critérios (E erra ao dizer 'vedado em qualquer circunstância').",
  },

  {
    id: "aut-admin-07", eixo: "admin", sub: "Avaliação de desempenho",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a avaliação de desempenho da equipe de enfermagem como ferramenta de gestão de pessoas, assinale a alternativa correta.",
    alts: [
      "Deve ser usada exclusivamente como instrumento punitivo diante de erros.",
      "É um processo contínuo que visa ao desenvolvimento profissional e à melhoria da assistência.",
      "Deve basear-se apenas na percepção pessoal do avaliador, sem critérios definidos.",
      "Dispensa qualquer retorno (feedback) ao profissional avaliado.",
      "Aplica-se somente a profissionais recém-admitidos em período de experiência.",
    ],
    correta: 1,
    coment: "Gabarito: B. A avaliação de desempenho é um processo CONTÍNUO e formativo — busca desenvolver o profissional, identificar necessidades de capacitação e melhorar a assistência.\n\n💡 PRINCÍPIOS de uma boa avaliação:\n• Critérios claros e conhecidos previamente (não percepção solta — C erra).\n• Feedback estruturado ao avaliado (é o coração do processo — D erra).\n• Foco no DESENVOLVIMENTO, não na punição (A erra).\n• Aplica-se a toda a equipe, não só aos novatos (E erra).\n\n⚠️ Pegadinha de concurso: associar avaliação a 'punição'. A lógica moderna de gestão é DESENVOLVIMENTISTA — avaliar para crescer, não para castigar.",
  },

  {
    id: "aut-admin-08", eixo: "admin", sub: "Organização dos serviços de enfermagem",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre os métodos de organização/distribuição do trabalho da equipe de enfermagem na assistência, é correto afirmar que o método no qual um enfermeiro se responsabiliza integralmente pelo cuidado de um grupo de pacientes, do planejamento à avaliação, é o método",
    alts: [
      "funcional, centrado na divisão de tarefas por procedimento.",
      "integral (ou de cuidado integral/primary nursing), centrado no paciente.",
      "de casos por tarefa, em que cada técnico executa um procedimento único.",
      "em cadeia, com fragmentação máxima do cuidado.",
      "por produção, focado no número de procedimentos realizados.",
    ],
    correta: 1,
    coment: "Gabarito: B. No método INTEGRAL (cuidado integral / primary nursing), o enfermeiro assume a responsabilidade completa por um grupo de pacientes — planeja, executa e avalia o cuidado de forma centrada no paciente.\n\n💡 MÉTODOS DE TRABALHO (comparação que a banca cobra):\n• FUNCIONAL: divide por TAREFAS (um faz sinais vitais, outro faz medicação) — foco na tarefa, cuidado fragmentado.\n• INTEGRAL/primary nursing: um profissional responsável pelo cuidado global do paciente — foco no paciente.\n• Por EQUIPE: um enfermeiro lidera uma equipe que cuida de um conjunto de pacientes.\n\n⚠️ A pegadinha é o método FUNCIONAL: eficiente para tarefas, mas fragmenta o cuidado e reduz a visão global do paciente. O enunciado ('responsabiliza integralmente', 'do planejamento à avaliação') aponta para o integral.",
  },

  {
    id: "aut-admin-09", eixo: "admin", sub: "Gestão da qualidade e indicadores",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "O ciclo PDCA é amplamente utilizado na gestão da qualidade em serviços de saúde para a melhoria contínua dos processos. Sobre suas etapas, assinale a associação correta.",
    alts: [
      "P (Plan) corresponde à execução das ações planejadas.",
      "D (Do) corresponde ao planejamento e à definição de metas.",
      "C (Check) corresponde à verificação e à avaliação dos resultados obtidos.",
      "A (Act) corresponde exclusivamente ao registro documental do processo.",
      "o ciclo é linear e se encerra após a primeira aplicação, sem repetição.",
    ],
    correta: 2,
    coment: "Gabarito: C. No ciclo PDCA, o C (Check) é a etapa de VERIFICAR/checar — avaliar se os resultados obtidos correspondem ao que foi planejado.\n\n💡 CICLO PDCA (memorize a ordem):\n• P (Plan) → PLANEJAR: identificar o problema, definir metas e o plano.\n• D (Do) → EXECUTAR: implementar o plano.\n• C (Check) → VERIFICAR: medir e comparar resultados com as metas.\n• A (Act) → AGIR: padronizar o que deu certo ou corrigir o que falhou, reiniciando o ciclo.\n\n⚠️ O PDCA é CÍCLICO e contínuo — não se encerra na primeira volta (E erra). As alternativas A e B trocam as etapas P e D (o erro clássico). A não é 'só registrar' — é agir para melhorar (D erra).",
  },


  // ═══════════ AUTORAIS: ASSISTÊNCIA POR SISTEMAS ═══════════
{
    id: "aut-sist-01", eixo: "sistemas", sub: "Sistema nervoso",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente de 62 anos chega ao pronto-socorro com início súbito de hemiparesia à direita, desvio de rima labial e afasia, com tempo de início dos sintomas de 1 hora. Considerando a assistência de enfermagem no AVC agudo, a prioridade inicial é",
    alts: [
      "aguardar a estabilização espontânea antes de qualquer conduta, evitando manipulação.",
      "acionar o protocolo de AVC e priorizar a realização de neuroimagem, pois o tempo é determinante.",
      "administrar anti-hipertensivo imediatamente para normalizar a pressão a qualquer custo.",
      "posicionar o paciente em Trendelenburg para aumentar a perfusão cerebral.",
      "oferecer dieta via oral precocemente para prevenir hipoglicemia.",
    ],
    correta: 1,
    coment: "Gabarito: B. No AVC agudo, 'tempo é cérebro'. A prioridade é acionar o protocolo de AVC e levar rápido à neuroimagem (TC de crânio) para diferenciar isquêmico de hemorrágico e avaliar trombólise dentro da janela.\n\n💡 JANELA TERAPÊUTICA: trombólise EV geralmente até 4,5h do início dos sintomas — por isso o horário de início é a informação mais valiosa (o paciente está em 1h, dentro da janela).\n\n⚠️ As armadilhas: NÃO se baixa a PA agressivamente no AVC isquêmico (C erra) — permite-se hipertensão permissiva, pois a queda brusca reduz a perfusão da penumbra. NÃO oferecer dieta VO antes de avaliar disfagia (E erra) — risco altíssimo de broncoaspiração. A cabeceira costuma ficar neutra/elevada, não Trendelenburg (D erra).",
  },

  {
    id: "aut-sist-02", eixo: "sistemas", sub: "Sistema respiratório",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente com DPOC descompensada apresenta dispneia, hipoxemia e retenção de CO2. Ao administrar oxigenoterapia, a enfermeira deve considerar que",
    alts: [
      "quanto maior o fluxo de oxigênio, melhor, devendo-se ofertar sempre a 100%.",
      "no retentor crônico de CO2, a oxigenoterapia deve ser controlada e titulada por alvos de saturação.",
      "a oxigenoterapia é contraindicada na DPOC por agravar sempre a insuficiência respiratória.",
      "a saturação-alvo ideal para todo paciente com DPOC é manter SpO2 acima de 99%.",
      "o uso de máscara de Venturi impede o controle preciso da fração de oxigênio ofertada.",
    ],
    correta: 1,
    coment: "Gabarito: B. No paciente com DPOC retentor crônico de CO2, a oxigenoterapia deve ser CONTROLADA e titulada — alvo de SpO2 geralmente entre 88% e 92%, evitando hiperóxia.\n\n💡 O PORQUÊ (raciocínio que a banca cobra): parte desses pacientes tem o drive respiratório dependente da hipoxemia. Ofertar O2 em excesso pode reduzir o estímulo ventilatório e agravar a retenção de CO2 (narcose por CO2). Por isso NÃO se dá 100% indiscriminadamente (A e D erram).\n\n💡 A MÁSCARA DE VENTURI é justamente a que permite fração de O2 PRECISA e controlada (E inverte) — é a preferida nesse cenário.\n\n⚠️ Cuidado: oxigenoterapia NÃO é contraindicada (C erra) — hipoxemia grave mata; o que se faz é CONTROLAR, não suspender.",
  },

  {
    id: "aut-sist-03", eixo: "sistemas", sub: "Sistema cardiovascular",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Paciente de 58 anos chega ao PS com dor torácica retroesternal intensa, em aperto, irradiando para o membro superior esquerdo, associada a sudorese e náuseas, há 40 minutos. Diante da suspeita de infarto agudo do miocárdio, a conduta inicial de enfermagem prioritária inclui",
    alts: [
      "liberar o paciente para deambular a fim de avaliar a tolerância ao esforço.",
      "realizar ECG de 12 derivações o mais rápido possível e manter monitorização.",
      "aguardar o resultado dos marcadores de necrose antes de qualquer intervenção.",
      "administrar dieta hipercalórica para reposição energética imediata.",
      "posicionar o paciente em decúbito ventral para alívio da dor.",
    ],
    correta: 1,
    coment: "Gabarito: B. Na suspeita de IAM, a prioridade é o ECG de 12 derivações em até 10 minutos da chegada — é ele que define IAM com supra de ST (que corre para reperfusão) e guia toda a conduta. Monitorização e acesso venoso acompanham.\n\n💡 MNEMÔNICO MONABCH / condutas iniciais: Monitorização, Oxigênio (se hipoxêmico), Nitrato, AAS, e avaliação para reperfusão. O ECG precoce é o gatilho de tudo.\n\n⚠️ NÃO se espera marcador de necrose (troponina) para agir no supra de ST (C erra) — a decisão de reperfusão é clínica + ECG. NUNCA liberar para deambular/esforço na dor isquêmica aguda (A erra) — repouso é regra. Decúbito ventral e dieta (D, E) não têm lugar aqui.",
  },

  {
    id: "aut-sist-04", eixo: "sistemas", sub: "Sistema urinário",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente com doença renal crônica em estágio avançado, em preparo para hemodiálise, apresenta fístula arteriovenosa (FAV) no membro superior esquerdo. Sobre os cuidados de enfermagem com a FAV, é correto afirmar que",
    alts: [
      "deve-se aferir a pressão arterial e puncionar veias preferencialmente no membro da fístula.",
      "a presença de frêmito (thrill) à palpação indica obstrução e deve ser comunicada como emergência.",
      "o membro da fístula deve ser protegido: sem punções, sem aferição de PA e sem garrote nesse braço.",
      "a fístula pode ser utilizada para infusão de soro e medicações de rotina, além da diálise.",
      "recomenda-se manter o membro da fístula imóvel e elevado permanentemente para evitar trombose.",
    ],
    correta: 2,
    coment: "Gabarito: C. O braço da FAV é 'sagrado': NÃO puncionar, NÃO aferir PA, NÃO usar garrote, NÃO deitar sobre ele nem usar acessórios apertados. Qualquer compressão pode trombosar a fístula — o acesso vital do paciente para a diálise.\n\n💡 AVALIAÇÃO DA FAV: presença de FRÊMITO (thrill) à palpação e SOPRO à ausculta = fístula PÉRVIA e funcionante (o oposto do que diz B — a AUSÊNCIA de frêmito é que sinaliza trombose/emergência).\n\n⚠️ A fístula é de uso EXCLUSIVO para hemodiálise (D erra) — não se usa para soro/medicação de rotina. As alternativas A e D são as pegadinhas que 'usam' o braço proibido; a C é a única que o protege corretamente.",
  },

  {
    id: "aut-sist-05", eixo: "sistemas", sub: "Sistema digestório",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente com cirrose hepática avançada evolui com alteração do nível de consciência, flapping (asterixis) e sonolência. Diante da suspeita de encefalopatia hepática, a assistência de enfermagem deve priorizar",
    alts: [
      "oferta de dieta hiperproteica para recuperar a massa muscular perdida.",
      "monitorização neurológica e atenção ao uso de lactulose para reduzir a amônia intestinal.",
      "restrição hídrica absoluta e suspensão de toda medicação via oral.",
      "estímulo à deambulação intensa para melhorar o nível de consciência.",
      "administração de sedativos para controlar a agitação do paciente.",
    ],
    correta: 1,
    coment: "Gabarito: B. Na encefalopatia hepática, o alvo é reduzir a amônia (NH3). A LACTULOSE é o pilar do tratamento — acidifica o cólon e aumenta a eliminação de amônia pelas fezes (meta de 2 a 3 evacuações pastosas/dia). A enfermagem monitoriza o nível de consciência e o padrão de evacuações.\n\n⚠️ AS ARMADILHAS PERIGOSAS:\n• Dieta HIPERproteica (A) é o erro clássico — o excesso de proteína aumenta a produção de amônia. Controla-se a proteína (sem restrição extrema, mas sem excesso).\n• SEDATIVOS (E) são muito perigosos no hepatopata — o fígado não metaboliza bem, podem precipitar/agravar o coma. Evitar benzodiazepínicos.\n\n💡 Flapping (asterixis) + rebaixamento no cirrótico = pense em encefalopatia hepática e amônia elevada.",
  },

  {
    id: "aut-sist-06", eixo: "sistemas", sub: "Sistema músculo-esquelético",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um paciente idoso no pós-operatório de artroplastia de quadril, acamado, apresenta dor, edema e empastamento em panturrilha unilateral. Diante da suspeita de trombose venosa profunda (TVP), a conduta de enfermagem inclui",
    alts: [
      "massagear vigorosamente a panturrilha para melhorar o retorno venoso.",
      "comunicar imediatamente, manter repouso e evitar manipular/massagear o membro afetado.",
      "estimular exercícios ativos intensos do membro para dispersar o coágulo.",
      "aplicar calor local intenso e realizar deambulação forçada.",
      "elevar a cabeceira a 90° e restringir totalmente a hidratação.",
    ],
    correta: 1,
    coment: "Gabarito: B. Na suspeita de TVP, a regra de ouro da enfermagem é: NÃO massagear e NÃO manipular o membro. Massagear pode deslocar o trombo e causar TROMBOEMBOLISMO PULMONAR (TEP) — uma emergência fatal. Comunica-se de imediato, mantém repouso e aguarda avaliação/anticoagulação.\n\n💡 SINAIS DE TVP: dor, edema unilateral, empastamento/rigidez da panturrilha, calor e rubor locais. Fatores de risco no enunciado: idoso, pós-operatório ortopédico, imobilização.\n\n⚠️ As alternativas A, C e D (massagear, exercício intenso, deambulação forçada) são todas ARMADILHAS PERIGOSAS — todas podem soltar o trombo. Essa é uma das pegadinhas mais cobradas: no cenário de TVP, a ação errada mata.",
  },

  {
    id: "aut-sist-07", eixo: "sistemas", sub: "Sistema endócrino",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Um paciente diabético em uso de insulina apresenta subitamente sudorese fria, tremores, taquicardia, confusão mental e fome intensa. Diante desse quadro, a conduta de enfermagem prioritária, se o paciente estiver consciente e capaz de deglutir, é",
    alts: [
      "administrar insulina rápida adicional para corrigir a suposta hiperglicemia.",
      "oferecer carboidrato de absorção rápida por via oral e reavaliar a glicemia.",
      "manter o paciente em jejum absoluto até a próxima refeição programada.",
      "oferecer alimentos ricos em gordura e proteína para saciedade prolongada.",
      "restringir líquidos e aguardar a resolução espontânea dos sintomas.",
    ],
    correta: 1,
    coment: "Gabarito: B. O quadro é de HIPOGLICEMIA (sudorese fria, tremor, taquicardia, confusão, fome — sintomas adrenérgicos e neuroglicopênicos). Se o paciente está consciente e consegue deglutir, ofertar CARBOIDRATO DE ABSORÇÃO RÁPIDA por via oral (ex.: 15 g — a 'regra dos 15': 15 g de carboidrato, reavalia em 15 min).\n\n⚠️ A ARMADILHA MORTAL é a alternativa A: dar insulina. O paciente já está HIPO — insulina o mataria. Essa é a pegadinha clássica: o enunciado tem 'diabético + insulina', e o desavisado pensa 'glicemia alta'. Leia os SINTOMAS: são de hipoglicemia.\n\n💡 Se INCONSCIENTE (não é o caso aqui): nada VO (risco de aspiração) → glicose EV ou glucagon. A frase-chave do enunciado ('consciente e capaz de deglutir') libera a via oral.",
  },

  {
    id: "aut-sist-08", eixo: "sistemas", sub: "Sistema cardiovascular",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um paciente com insuficiência cardíaca congestiva descompensada apresenta dispneia aos mínimos esforços, ortopneia, edema de membros inferiores e ganho de peso recente. Entre os cuidados de enfermagem, é correto",
    alts: [
      "manter o paciente em decúbito dorsal horizontal (0°) para reduzir o esforço cardíaco.",
      "controlar o balanço hídrico, restringir sódio e manter cabeceira elevada (posição de Fowler).",
      "liberar a ingestão de líquidos e sódio à vontade para evitar desidratação.",
      "suspender o controle diário de peso, por ser irrelevante na ICC.",
      "estimular grandes esforços físicos para fortalecer o miocárdio na fase aguda.",
    ],
    correta: 1,
    coment: "Gabarito: B. Na ICC descompensada, os cuidados-chave: controlar o BALANÇO HÍDRICO, restringir SÓDIO (e muitas vezes líquidos), manter a cabeceira elevada (Fowler) para aliviar a dispneia/ortopneia, e pesar o paciente DIARIAMENTE — o peso é o melhor marcador precoce de retenção hídrica.\n\n💡 POR QUE FOWLER: elevar a cabeceira reduz o retorno venoso e melhora a expansão pulmonar — alivia a ortopneia. Decúbito horizontal a 0° (A) PIORA a dispneia (aumenta o retorno venoso ao coração congesto).\n\n⚠️ Liberar sódio e líquido 'à vontade' (C) agrava a congestão. Suspender o peso diário (D) é erro grave — o ganho de peso é sinal de descompensação. Esforço intenso na fase aguda (E) sobrecarrega o coração já falido.",
  },

  {
    id: "aut-sist-09", eixo: "sistemas", sub: "Sistema respiratório",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre os cuidados de enfermagem com o paciente em uso de dreno de tórax (drenagem pleural em selo d'água), é correto afirmar que",
    alts: [
      "o frasco coletor deve ser mantido sempre acima do nível do tórax do paciente.",
      "o borbulhamento contínuo e intenso no selo d'água é sempre sinal esperado e normal.",
      "em caso de desconexão acidental do dreno, o frasco deve ser mantido abaixo do tórax e o sistema, hermético.",
      "clampar o dreno rotineiramente durante o transporte é a conduta padrão recomendada.",
      "a oscilação da coluna líquida com a respiração indica obstrução do sistema.",
    ],
    correta: 2,
    coment: "Gabarito: C. O frasco de drenagem torácica fica SEMPRE ABAIXO do nível do tórax (para o conteúdo não refluir para a cavidade pleural, gravidade a favor) e o sistema deve permanecer hermético/fechado.\n\n💡 AVALIAÇÃO CORRETA DO SELO D'ÁGUA:\n• OSCILAÇÃO da coluna líquida com a respiração = sistema PÉRVIO e funcionante (o normal) — logo E inverte (oscilação NÃO é obstrução).\n• Borbulhamento INTENSO e contínuo pode indicar ESCAPE DE AR/fístula ou vazamento no sistema — não é 'sempre normal' (B erra).\n\n⚠️ NÃO clampar o dreno de rotina (D erra) — clampar pode causar pneumotórax hipertensivo. Manter o frasco acima do tórax (A) causa refluxo. A conduta na desconexão (C) protege o paciente: frasco abaixo + sistema hermético.",
  },


  // ═══════════ AUTORAIS: SEMIOLOGIA E SAE ═══════════
{
    id: "aut-semio-01", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "A Resolução COFEN nº 736/2024 reorganizou o Processo de Enfermagem (PE). Sobre as etapas do PE segundo essa norma vigente, é correto afirmar que o processo é composto por",
    alts: [
      "três etapas: coleta de dados, diagnóstico e evolução.",
      "cinco etapas inter-relacionadas, iniciando pela avaliação/coleta de dados e culminando na avaliação de enfermagem.",
      "duas etapas apenas: prescrição e evolução de enfermagem.",
      "seis etapas independentes, executadas sem qualquer inter-relação.",
      "quatro etapas, excluindo-se o diagnóstico de enfermagem do processo.",
    ],
    correta: 1,
    coment: "Gabarito: B. A Resolução COFEN 736/2024 mantém o Processo de Enfermagem em CINCO etapas inter-relacionadas e deliberadas: (1) coleta de dados/avaliação inicial, (2) diagnóstico de enfermagem, (3) planejamento, (4) implementação e (5) avaliação de enfermagem.\n\n💡 O QUE MUDOU com a 736/2024 (muito cobrado agora): a norma passou a tratar 'Processo de Enfermagem' como o termo central e reorganizou/atualizou a nomenclatura das etapas, reforçando o raciocínio clínico. O diagnóstico de enfermagem CONTINUA sendo etapa essencial (E erra ao excluí-lo).\n\n⚠️ As etapas são INTER-RELACIONADAS e dinâmicas, não estanques (D erra). Reduzir o PE a 2 ou 3 etapas (A e C) ignora o ciclo completo. Guarde: são 5 etapas, e a avaliação encerra e realimenta o ciclo.",
  },

  {
    id: "aut-semio-02", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a distinção entre 'Processo de Enfermagem' e 'Sistematização da Assistência de Enfermagem' à luz da normatização do COFEN, é correto afirmar que",
    alts: [
      "são exatamente sinônimos e podem ser usados de forma intercambiável sem distinção.",
      "o Processo de Enfermagem é o método/instrumento que operacionaliza o cuidado em etapas.",
      "a SAE substitui completamente o raciocínio clínico do enfermeiro.",
      "o Processo de Enfermagem aplica-se apenas em unidades de terapia intensiva.",
      "o diagnóstico de enfermagem é etapa exclusiva do técnico de enfermagem.",
    ],
    correta: 1,
    coment: "Gabarito: B. O Processo de Enfermagem é o MÉTODO/instrumento que operacionaliza o cuidado, organizando-o em etapas sistemáticas e baseadas em raciocínio clínico.\n\n💡 A DISTINÇÃO (foco das provas recentes): historicamente 'SAE' e 'PE' eram usados como sinônimos. A tendência normativa (reforçada pela 736/2024) é tratar o PROCESSO DE ENFERMAGEM como o método científico do cuidado. A SAE, em sentido amplo, refere-se à organização do trabalho/serviço que viabiliza o PE.\n\n⚠️ O PE aplica-se em TODOS os ambientes de cuidado (D erra), não só UTI. O diagnóstico e a prescrição de enfermagem são atividades PRIVATIVAS DO ENFERMEIRO (E erra). O PE não substitui, mas ESTRUTURA o raciocínio clínico (C erra).",
  },

  {
    id: "aut-semio-03", eixo: "semio", sub: "Diagnóstico e prognóstico",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Segundo a taxonomia da NANDA-I, um diagnóstico de enfermagem com foco no problema é estruturado, no formato PES, por três componentes. Assinale a alternativa que os apresenta corretamente.",
    alts: [
      "Prescrição, Evolução e Sinais vitais.",
      "Problema (título), Etiologia (fatores relacionados) e Sinais e sintomas (características definidoras).",
      "Prognóstico, Exame físico e Semiologia.",
      "Planejamento, Execução e Supervisão.",
      "Paciente, Enfermeiro e Serviço.",
    ],
    correta: 1,
    coment: "Gabarito: B. No formato PES de um diagnóstico com foco no problema: P = Problema (o título diagnóstico), E = Etiologia (os fatores relacionados, o 'relacionado a...'), S = Sinais e sintomas (as características definidoras, o 'evidenciado por...').\n\n💡 EXEMPLO PRÁTICO: 'Integridade da pele prejudicada (P) relacionada à imobilidade física (E) evidenciada por lesão em região sacral (S)'.\n\n💡 TIPOS DE DIAGNÓSTICO NANDA-I: com foco no problema, de risco (não tem 'S' de sinais — o risco ainda não se manifestou, tem fatores de risco), de promoção da saúde e de síndrome.\n\n⚠️ A pegadinha é confundir as siglas: PES não é 'prescrição/evolução' nem 'planejamento/execução'. É a anatomia do enunciado diagnóstico. Decore: Problema + Etiologia + Sinais/sintomas.",
  },

  {
    id: "aut-semio-04", eixo: "semio", sub: "Exame clínico",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Durante o exame físico do abdome, a enfermeira segue a sequência semiotécnica adequada. Diferentemente dos demais segmentos corporais, o exame do abdome exige uma ordem específica das técnicas propedêuticas, que é",
    alts: [
      "inspeção, palpação, percussão e ausculta, como em qualquer segmento.",
      "inspeção, ausculta, percussão e palpação, para não alterar os ruídos hidroaéreos.",
      "palpação, inspeção, ausculta e percussão.",
      "percussão, palpação, ausculta e inspeção.",
      "ausculta, inspeção, palpação e percussão.",
    ],
    correta: 1,
    coment: "Gabarito: B. No ABDOME, a sequência correta é INSPEÇÃO → AUSCULTA → PERCUSSÃO → PALPAÇÃO. A ausculta vem ANTES da palpação e percussão.\n\n💡 O PORQUÊ (raciocínio que a banca adora): palpar ou percutir o abdome primeiro pode ESTIMULAR ou ALTERAR os ruídos hidroaéreos (peristalse), falseando a ausculta. Por isso o abdome é a EXCEÇÃO à regra geral.\n\n💡 REGRA GERAL (demais segmentos, ex.: tórax): Inspeção → Palpação → Percussão → Ausculta (IPPA).\n\n⚠️ A alternativa A é a pegadinha: aplica a sequência geral (IPPA) ao abdome, o que está errado. Memorize: 'no abdome, a ausculta fura a fila e vem logo depois da inspeção'.",
  },

  {
    id: "aut-semio-05", eixo: "semio", sub: "Anamnese",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Durante a anamnese de enfermagem, a enfermeira registra a 'queixa principal' do paciente. Sobre esse componente da entrevista, é correto afirmar que corresponde",
    alts: [
      "ao conjunto de todas as doenças pregressas relatadas pelo paciente.",
      "ao motivo que levou o paciente a procurar o serviço, preferencialmente em suas próprias palavras.",
      "ao histórico familiar de doenças hereditárias.",
      "à lista de medicamentos em uso contínuo pelo paciente.",
      "aos dados de identificação, como nome, idade e procedência.",
    ],
    correta: 1,
    coment: "Gabarito: B. A QUEIXA PRINCIPAL (QP) é o motivo que trouxe o paciente ao serviço, registrado preferencialmente com as PALAVRAS DELE (ex.: 'dor na barriga há 2 dias'), entre aspas.\n\n💡 ESTRUTURA DA ANAMNESE (não confundir os componentes):\n• Identificação: nome, idade, procedência (E é isso, não a QP).\n• Queixa principal (QP): o motivo da procura, nas palavras do paciente.\n• História da doença atual (HDA): o detalhamento da queixa (início, duração, evolução).\n• História patológica pregressa (HPP): doenças anteriores (A confunde com isso).\n• História familiar: doenças na família (C confunde com isso).\n\n⚠️ A banca troca os componentes de lugar. A QP é curta, subjetiva e no idioma do paciente — não é a lista de comorbidades nem os medicamentos.",
  },

  {
    id: "aut-semio-06", eixo: "semio", sub: "Exame clínico",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Ao verificar os sinais vitais de um paciente adulto em repouso, a enfermeira encontra: FC 110 bpm, FR 24 irpm, PA 100x60 mmHg e T 38,5 °C. Sobre esses achados, é correto afirmar que o paciente apresenta",
    alts: [
      "bradicardia, bradipneia e hipertensão.",
      "taquicardia, taquipneia e febre.",
      "frequência cardíaca e respiratória dentro dos parâmetros normais.",
      "hipotermia e bradicardia.",
      "eupneia e normocardia com hipertermia isolada.",
    ],
    correta: 1,
    coment: "Gabarito: B. Analisando os parâmetros do adulto: FC 110 = TAQUICARDIA (normal 60–100 bpm); FR 24 = TAQUIPNEIA (normal 12–20 irpm); T 38,5 °C = FEBRE/hipertermia (normal ~36–37,5 °C). A PA 100x60 está no limite inferior, mas os três achados que caracterizam o quadro são taquicardia + taquipneia + febre.\n\n💡 PARÂMETROS NORMAIS DO ADULTO (decore de cor — cai sempre):\n• FC: 60–100 bpm · FR: 12–20 irpm · T axilar: 36–37,5 °C · PA: ~120x80 mmHg\n• Bradi = abaixo · Taqui = acima.\n\n⚠️ Essa questão testa se você sabe LER os números e nomear. FC 110 não é bradicardia (A erra); FR 24 não é normal (C erra); 38,5 °C não é hipotermia (D erra). A febre não está 'isolada' — há taquicardia e taquipneia associadas (E erra), o que é esperado, pois a febre eleva FC e FR.",
  },

  {
    id: "aut-semio-07", eixo: "semio", sub: "Sistematização da assistência (SAE)",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre as atividades privativas do enfermeiro no âmbito do Processo de Enfermagem, conforme a legislação profissional, é correto afirmar que",
    alts: [
      "o diagnóstico e a prescrição de enfermagem podem ser realizados por qualquer membro da equipe.",
      "a coleta de dados, o diagnóstico e a prescrição de enfermagem são privativos do enfermeiro.",
      "a implementação dos cuidados é atividade exclusiva do enfermeiro, vedada aos técnicos.",
      "o técnico de enfermagem é responsável por elaborar o plano de cuidados e os diagnósticos.",
      "a evolução de enfermagem é atribuição exclusiva do médico da unidade.",
    ],
    correta: 1,
    coment: "Gabarito: B. O DIAGNÓSTICO e a PRESCRIÇÃO de enfermagem, bem como a liderança do Processo de Enfermagem, são atividades PRIVATIVAS DO ENFERMEIRO (Lei 7.498/86 e resoluções do COFEN).\n\n💡 DIVISÃO DE ATRIBUIÇÕES:\n• ENFERMEIRO: coordena o PE — coleta de dados (avaliação), diagnóstico, planejamento/prescrição e evolução.\n• TÉCNICO/AUXILIAR: PARTICIPA da execução/implementação dos cuidados prescritos e da coleta de dados, sob supervisão do enfermeiro — mas NÃO diagnostica nem prescreve (D erra).\n\n⚠️ A implementação NÃO é exclusiva do enfermeiro (C erra) — a equipe executa. A evolução é do enfermeiro, não do médico (E erra). A pegadinha central é 'quem pode diagnosticar e prescrever': só o enfermeiro.",
  },

  {
    id: "aut-semio-08", eixo: "semio", sub: "Exames complementares",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Ao avaliar os resultados laboratoriais de um paciente, a enfermeira identifica um valor de potássio sérico de 6,8 mEq/L. Diante desse achado, é correto afirmar que",
    alts: [
      "trata-se de hipocalemia, sem repercussão clínica relevante.",
      "trata-se de hipercalemia, condição que exige atenção pelo risco de arritmias cardíacas graves.",
      "o valor está dentro da faixa de normalidade e não requer conduta.",
      "trata-se de hiponatremia, devendo-se repor sódio imediatamente.",
      "trata-se de hipercalcemia, sem relação com o ritmo cardíaco.",
    ],
    correta: 1,
    coment: "Gabarito: B. Potássio de 6,8 mEq/L é HIPERCALEMIA (normal ~3,5–5,0 mEq/L). É uma condição grave porque o potássio elevado altera a excitabilidade cardíaca e pode causar ARRITMIAS FATAIS (fibrilação ventricular, assistolia). Exige comunicação imediata e monitorização (ECG com ondas T apiculadas é um sinal clássico).\n\n💡 VALORES DE REFERÊNCIA que a banca cobra:\n• Potássio (K+): 3,5–5,0 mEq/L\n• Sódio (Na+): 135–145 mEq/L\n• Cálcio total: ~8,5–10,5 mg/dL\n\n⚠️ A pegadinha é confundir os prefixos: potássio ALTO = hiperCALEMIA (ou hipercalIEMIA), não hipo (A erra), e não é sódio nem cálcio (D e E confundem o eletrólito). 6,8 NÃO é normal (C erra) — é francamente elevado e perigoso.",
  },

  {
    id: "aut-semio-09", eixo: "semio", sub: "Plano de trabalho",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "No planejamento da assistência de enfermagem, após o diagnóstico, o enfermeiro estabelece resultados esperados e prescreve intervenções. Sobre a etapa de planejamento do Processo de Enfermagem, é correto afirmar que",
    alts: [
      "as intervenções devem ser genéricas, sem individualização para o paciente.",
      "os resultados esperados (metas) devem ser mensuráveis e definir prioridades de cuidado.",
      "o planejamento independe dos diagnósticos identificados na etapa anterior.",
      "a prescrição de enfermagem não precisa ser registrada no prontuário.",
      "as prioridades são definidas aleatoriamente, sem hierarquização das necessidades.",
    ],
    correta: 1,
    coment: "Gabarito: B. No PLANEJAMENTO, o enfermeiro define resultados esperados (metas) MENSURÁVEIS e ESTABELECE PRIORIDADES — hierarquizando os diagnósticos conforme a gravidade e a necessidade do paciente (ex.: necessidades que ameaçam a vida vêm primeiro, lógica das necessidades humanas básicas / Maslow).\n\n💡 CARACTERÍSTICAS de um bom planejamento:\n• Baseado nos DIAGNÓSTICOS da etapa anterior (C erra — depende deles).\n• Intervenções INDIVIDUALIZADAS ao paciente (A erra).\n• Metas mensuráveis, com prazo, para permitir avaliação depois.\n• Registro obrigatório no prontuário (D erra — tudo se registra).\n\n⚠️ As prioridades NÃO são aleatórias (E erra) — hierarquizam-se as necessidades. A palavra-chave é 'mensurável e priorizado': é o que diferencia um plano real de uma lista solta.",
  },

  {
    id: "aut-semio-10", eixo: "semio", sub: "Protocolos de acolhimento",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "No acolhimento com classificação de risco (ACR) em unidades de urgência, utiliza-se um sistema de cores para priorizar o atendimento conforme a gravidade. Segundo o Protocolo de Manchester, a cor que indica o paciente que deve ser atendido IMEDIATAMENTE (emergência) é",
    alts: [
      "azul, correspondente a casos não urgentes.",
      "vermelha, correspondente à emergência, com atendimento imediato.",
      "verde, correspondente a atendimento em até 120 minutos.",
      "amarela, correspondente a atendimento imediato.",
      "branca, correspondente à prioridade máxima.",
    ],
    correta: 1,
    coment: "Gabarito: B. No Protocolo de Manchester, a cor VERMELHA = EMERGÊNCIA, atendimento IMEDIATO (0 minuto) — risco iminente de morte.\n\n💡 CORES DO MANCHESTER (decore a escala completa):\n• VERMELHO – emergência – imediato (0 min)\n• LARANJA – muito urgente – ~10 min\n• AMARELO – urgente – ~60 min\n• VERDE – pouco urgente – ~120 min\n• AZUL – não urgente – ~240 min\n\n⚠️ As pegadinhas: amarelo NÃO é imediato (D erra) — é urgente, ~60 min. 'Branco' não faz parte do Manchester clássico (E erra). Vermelho é sempre o topo da prioridade. Guarde a ordem do mais grave ao menos grave: vermelho → laranja → amarelo → verde → azul.",
  },

  {
    id: "aut-semio-11", eixo: "semio", sub: "Exame clínico",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Ao avaliar o nível de consciência de um paciente vítima de trauma cranioencefálico, a enfermeira utiliza a Escala de Coma de Glasgow. Sobre essa escala, é correto afirmar que",
    alts: [
      "avalia três parâmetros: abertura ocular, resposta verbal e resposta motora, com escore de 3 a 15.",
      "o menor escore possível é 0, indicando paciente desperto e orientado.",
      "avalia exclusivamente o diâmetro e a reatividade pupilar.",
      "um escore de 15 indica coma profundo e ausência de resposta.",
      "a melhor resposta motora possível é a resposta em flexão anormal (decorticação).",
    ],
    correta: 0,
    coment: "Gabarito: A. A Escala de Coma de Glasgow avalia TRÊS parâmetros — Abertura Ocular (1–4), Resposta Verbal (1–5) e Resposta Motora (1–6) — somando de 3 (mínimo) a 15 (máximo).\n\n💡 INTERPRETAÇÃO:\n• 15 = paciente desperto, orientado (melhor escore).\n• 3 = menor possível (não existe 0 — cada item começa em 1, então B erra).\n• TCE: leve 13–15 · moderado 9–12 · grave ≤8 (indica intubação/via aérea).\n\n⚠️ As inversões clássicas: escore 15 NÃO é coma (D inverte — 15 é o melhor). A MELHOR resposta motora é 'obedece a comandos' (6), não a decorticação (E erra — flexão anormal é resposta RUIM). A escala não avalia só pupila (C erra) — a pupila é avaliação complementar. Hoje a versão atual acrescenta a avaliação da reatividade pupilar (ECG-P), mas os 3 parâmetros somam de 3 a 15.",
  },


  // ═══════════ AUTORAIS: BIOÉTICA E LEGISLAÇÃO ═══════════
{
    id: "aut-etica-01", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A Lei nº 7.498/1986 dispõe sobre a regulamentação do exercício da enfermagem. Segundo essa lei, é atividade PRIVATIVA do enfermeiro",
    alts: [
      "a prestação de cuidados de enfermagem a pacientes graves com risco de vida.",
      "a execução de cuidados de higiene e conforto de menor complexidade.",
      "a participação em programas de higiene e segurança do trabalho.",
      "a participação na orientação e supervisão do trabalho de enfermagem em grau auxiliar.",
      "a coleta rotineira de material para exames laboratoriais.",
    ],
    correta: 0,
    coment: "Gabarito: A. A Lei 7.498/86 estabelece como PRIVATIVOS do enfermeiro, entre outros, os cuidados diretos a pacientes GRAVES com risco de vida e os cuidados de enfermagem de MAIOR COMPLEXIDADE técnica que exijam conhecimentos científicos e capacidade de tomar decisões imediatas.\n\n💡 PRIVATIVO DO ENFERMEIRO (campeões de prova): consulta de enfermagem, prescrição da assistência de enfermagem, cuidados a graves com risco de vida, cuidados de maior complexidade, e a direção/chefia do serviço de enfermagem.\n\n⚠️ As demais alternativas descrevem atividades que a equipe (técnico/auxiliar) também realiza ou que são compartilhadas — cuidados de menor complexidade (B), higiene e conforto simples, coleta rotineira (E). A palavra-chave do privativo é COMPLEXIDADE / GRAVIDADE / DECISÃO.",
  },

  {
    id: "aut-etica-02", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A bioética principialista de Beauchamp e Childress fundamenta-se em quatro princípios. O princípio segundo o qual o profissional deve respeitar a capacidade de o paciente decidir sobre si mesmo, inclusive recusando tratamentos, é o da",
    alts: [
      "beneficência.",
      "não maleficência.",
      "autonomia.",
      "justiça.",
      "vulnerabilidade.",
    ],
    correta: 2,
    coment: "Gabarito: C. O princípio da AUTONOMIA refere-se ao respeito à capacidade de autodeterminação do paciente — decidir sobre seu próprio corpo e tratamento, o que inclui o direito de RECUSAR condutas (base do consentimento livre e esclarecido).\n\n💡 OS 4 PRINCÍPIOS (Beauchamp e Childress):\n• AUTONOMIA – respeitar a decisão do paciente.\n• BENEFICÊNCIA – fazer o bem, agir em benefício do paciente.\n• NÃO MALEFICÊNCIA – não causar dano ('primum non nocere').\n• JUSTIÇA – equidade, distribuição justa de recursos e cuidados.\n\n⚠️ A pegadinha típica troca autonomia por beneficência ('o profissional sabe o que é melhor'). Cuidado: impor um tratamento 'para o bem' do paciente que o recusa VIOLA a autonomia. 'Vulnerabilidade' (E) não é um dos quatro princípios clássicos.",
  },

  {
    id: "aut-etica-03", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "O Código de Ética dos Profissionais de Enfermagem (Resolução COFEN nº 564/2017) trata do sigilo profissional. Sobre esse dever, é correto afirmar que",
    alts: [
      "o sigilo pode ser quebrado livremente sempre que o profissional julgar conveniente.",
      "o profissional deve manter segredo sobre fato sigiloso de que tenha conhecimento em razão da atividade, salvo casos previstos em lei ou por justa causa.",
      "o dever de sigilo cessa imediatamente após a alta do paciente.",
      "o sigilo não se aplica a informações registradas no prontuário.",
      "o sigilo é dispensável quando o paciente é menor de idade.",
    ],
    correta: 1,
    coment: "Gabarito: B. Pelo Código de Ética (COFEN 564/2017), é dever manter SEGREDO sobre fato sigiloso conhecido em razão da atividade profissional — salvo as exceções previstas em LEI, por JUSTA CAUSA ou por dever legal, ou com o consentimento do paciente.\n\n💡 O sigilo é um DEVER e um direito do paciente. Ele NÃO cessa com a alta nem com a morte (C erra) — persiste. Aplica-se também às informações do prontuário (D erra).\n\n⚠️ As armadilhas: o sigilo NÃO é quebrável 'quando o profissional achar' (A erra) — só nas hipóteses legais. Ser menor de idade NÃO dispensa o sigilo (E erra), embora envolva os responsáveis conforme a situação. A frase-chave que valida a alternativa correta é 'salvo casos previstos em lei ou justa causa'.",
  },

  {
    id: "aut-etica-04", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "O consentimento livre e esclarecido é um instrumento fundamental na relação profissional-paciente. Sobre ele, é correto afirmar que",
    alts: [
      "dispensa a prestação de informações ao paciente quando o procedimento é de rotina.",
      "é a manifestação de vontade do paciente após receber informações claras sobre o procedimento, seus riscos e alternativas.",
      "uma vez assinado, impede o paciente de desistir ou revogar sua decisão.",
      "pode ser obtido de qualquer acompanhante, independentemente da vontade do paciente capaz.",
      "é exigível apenas em pesquisas, não na assistência clínica.",
    ],
    correta: 1,
    coment: "Gabarito: B. O consentimento livre e esclarecido é a decisão VOLUNTÁRIA do paciente, tomada APÓS receber informações compreensíveis sobre o procedimento, seus riscos, benefícios e alternativas. É expressão direta do princípio da autonomia.\n\n💡 CARACTERÍSTICAS ESSENCIAIS:\n• INFORMADO: o paciente precisa entender o que vai acontecer (A erra ao 'dispensar informação').\n• LIVRE: sem coerção.\n• REVOGÁVEL: o paciente pode mudar de ideia a QUALQUER momento (C erra).\n\n⚠️ Deve ser obtido do próprio paciente capaz — não de um acompanhante à revelia (D erra). Aplica-se tanto à ASSISTÊNCIA quanto à pesquisa (E erra). É um processo de comunicação, não só uma assinatura de papel.",
  },

  {
    id: "aut-etica-05", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre as infrações e penalidades disciplinares previstas no Código de Ética dos Profissionais de Enfermagem, aplicadas pelos Conselhos (COFEN/CORENs), assinale a alternativa que apresenta uma das penalidades cabíveis.",
    alts: [
      "prisão administrativa do profissional infrator.",
      "advertência verbal, multa, censura, suspensão do exercício profissional e cassação do direito ao exercício profissional.",
      "apreensão dos bens pessoais do profissional.",
      "obrigação de prestar serviço comunitário compulsório.",
      "deportação do profissional para outro estado.",
    ],
    correta: 1,
    coment: "Gabarito: B. As penalidades disciplinares do Código de Ética (aplicadas pelo sistema COFEN/CORENs) são: ADVERTÊNCIA verbal, MULTA, CENSURA, SUSPENSÃO do exercício profissional e CASSAÇÃO do direito ao exercício profissional.\n\n💡 GRADAÇÃO (da mais leve à mais grave): advertência verbal → multa → censura → suspensão → cassação. A aplicação considera a gravidade da infração, os antecedentes e as circunstâncias (atenuantes/agravantes).\n\n⚠️ As demais alternativas descrevem sanções que NÃO são competência do Conselho profissional: prisão, apreensão de bens, serviço comunitário e 'deportação' são penas de outras esferas (penal, judicial) — o Conselho atua na esfera ÉTICO-DISCIPLINAR. Cuidado para não misturar responsabilidade ética com responsabilidade penal ou civil.",
  },

  {
    id: "aut-etica-06", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "No contexto do cuidado ao paciente em fase terminal, discute-se a distinção entre eutanásia, distanásia e ortotanásia. A conduta que consiste em EVITAR o prolongamento artificial e fútil do processo de morrer, permitindo a morte natural com cuidados paliativos, denomina-se",
    alts: [
      "eutanásia.",
      "distanásia.",
      "ortotanásia.",
      "mistanásia.",
      "iatrogenia.",
    ],
    correta: 2,
    coment: "Gabarito: C. A ORTOTANÁSIA é a 'morte no tempo certo' — evita o prolongamento artificial e fútil do morrer, permitindo a evolução natural da morte com foco em conforto e cuidados paliativos, sem obstinação terapêutica.\n\n💡 DISTINÇÕES (decoreba de ouro):\n• EUTANÁSIA: abreviar ativamente a vida para aliviar sofrimento (vedada no Brasil).\n• DISTANÁSIA: prolongar o morrer com meios fúteis/desproporcionais — 'obstinação terapêutica', encarniçamento (o oposto do desejável).\n• ORTOTANÁSIA: deixar a morte seguir seu curso natural, com paliação — a conduta eticamente defendida.\n• MISTANÁSIA: 'morte social/miserável', por falta de acesso ao cuidado.\n\n⚠️ A banca troca ortotanásia com eutanásia. Diferença-chave: na ortotanásia NÃO se antecipa a morte — apenas não se PROLONGA artificialmente. Iatrogenia (E) é dano causado pelo próprio ato de cuidar, conceito distinto.",
  },

  {
    id: "aut-etica-07", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Segundo o Código de Ética dos Profissionais de Enfermagem, sobre os direitos do profissional de enfermagem, é correto afirmar que o profissional tem o direito de",
    alts: [
      "recusar-se a exercer atividades que não sejam de sua competência técnica, científica, ética e legal.",
      "abandonar o plantão sem comunicação, desde que por motivo pessoal.",
      "delegar aos acompanhantes a execução de cuidados de enfermagem de alta complexidade.",
      "prestar assistência sem qualquer registro no prontuário para agilizar o serviço.",
      "recusar atendimento a paciente por motivo de raça, credo ou condição social.",
    ],
    correta: 0,
    coment: "Gabarito: A. É DIREITO do profissional recusar-se a executar atividades que não sejam de sua competência técnica, científica, ética e legal, ou que ofereçam risco à sua segurança e à do paciente/coletividade.\n\n💡 Esse direito protege o profissional e o paciente: ninguém deve executar o que não domina ou o que a lei não permite.\n\n⚠️ As demais são INFRAÇÕES ÉTICAS graves, não direitos:\n• Abandonar o plantão/paciente sem substituição ou comunicação (B) é vedado.\n• Delegar cuidado de alta complexidade a leigos/acompanhantes (C) é proibido.\n• Não registrar no prontuário (D) fere o dever de documentar.\n• Recusar atendimento por raça/credo/condição social (E) é discriminação — expressamente vedada. O Código proíbe qualquer discriminação.",
  },

  {
    id: "aut-etica-08", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Um paciente testemunha de Jeová, adulto, consciente e capaz, recusa formalmente a transfusão de sangue por convicção religiosa. Diante do conflito entre a autonomia do paciente e a beneficência, a conduta ética recomendada ao profissional é",
    alts: [
      "ignorar a recusa e transfundir imediatamente, pois a vida se sobrepõe a tudo.",
      "reconhecer a complexidade do conflito ético, respeitando a autonomia do paciente capaz e buscando alternativas terapêuticas e diálogo com a equipe.",
      "abandonar o cuidado do paciente por discordar de sua decisão.",
      "coagir o paciente a mudar de opinião usando informações amedrontadoras.",
      "solicitar que o paciente assine termo isentando o profissional e negar qualquer outro cuidado.",
    ],
    correta: 1,
    coment: "Gabarito: B. O cenário é um clássico conflito entre AUTONOMIA (recusa do paciente capaz) e BENEFICÊNCIA (dever de cuidar). A conduta ética reconhece a complexidade, respeita a decisão do paciente adulto e capaz, busca ALTERNATIVAS terapêuticas (ex.: hemostáticos, alternativas à transfusão) e envolve equipe, comitê de bioética e diálogo.\n\n💡 PONTOS DE ATENÇÃO REAIS: a decisão de um adulto capaz e informado tem forte peso ético e jurídico. Situações de emergência com risco iminente de morte e casos de menores/incapazes têm nuances próprias e frequentemente exigem apoio jurídico/institucional.\n\n⚠️ As alternativas erradas mostram condutas ANTIÉTICAS: transfundir à força ignorando a autonomia (A), abandonar o paciente (C), coagir (D) ou negar todo cuidado (E). Respeitar a autonomia NÃO significa abandonar — o cuidado (conforto, alternativas, escuta) continua.",
  },

  {
    id: "aut-etica-09", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre a responsabilidade profissional em enfermagem, a doutrina distingue as esferas de responsabilização. A situação em que o profissional responde por dano causado ao paciente, gerando dever de indenizar, caracteriza responsabilidade",
    alts: [
      "exclusivamente penal, com pena privativa de liberdade.",
      "civil, relacionada à reparação/indenização do dano causado.",
      "apenas ética, restrita ao âmbito do Conselho profissional.",
      "administrativa, restrita à relação de emprego.",
      "inexistente, pois o profissional nunca responde por danos.",
    ],
    correta: 1,
    coment: "Gabarito: B. A responsabilidade CIVIL relaciona-se ao dever de REPARAR/INDENIZAR um dano causado a outrem (dano material ou moral). Baseia-se em ato ilícito, culpa (imprudência, negligência, imperícia) ou dolo, nexo causal e dano.\n\n💡 AS TRÊS ESFERAS (podem coexistir sobre o mesmo fato):\n• CIVIL → indenizar o dano (reparação).\n• PENAL → crime, punição do Estado (ex.: pena).\n• ÉTICO-DISCIPLINAR → Conselho profissional (advertência a cassação).\n• (E há também a administrativa/trabalhista, na relação de emprego.)\n\n⚠️ O ponto que a banca cobra: um mesmo erro pode gerar responsabilização nas TRÊS esferas ao mesmo tempo, independentemente entre si. 'Indenização/reparação' é a palavra que aponta para a esfera CIVIL. Imprudência, negligência e imperícia são as três formas de culpa — decore.",
  },

  {
    id: "aut-etica-10", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre os conceitos de culpa na responsabilidade profissional de enfermagem, a conduta de um profissional que executa um procedimento sem possuir a habilidade técnica ou o conhecimento necessário caracteriza",
    alts: [
      "negligência.",
      "imprudência.",
      "imperícia.",
      "dolo.",
      "caso fortuito.",
    ],
    correta: 2,
    coment: "Gabarito: C. A IMPERÍCIA é a falta de habilidade técnica, aptidão ou conhecimento para executar determinado ato — o profissional faz algo para o qual não está capacitado.\n\n💡 AS TRÊS FORMAS DE CULPA (a tríade mais cobrada em ética):\n• NEGLIGÊNCIA → OMISSÃO, descuido, deixar de fazer o que deveria (ex.: não elevar as grades da cama e o paciente cai).\n• IMPRUDÊNCIA → AÇÃO precipitada, fazer sem a cautela devida (ex.: administrar medicação em velocidade perigosa).\n• IMPERÍCIA → falta de APTIDÃO/conhecimento técnico (ex.: executar procedimento que não domina).\n\n⚠️ Não confundir com DOLO (D) — no dolo há INTENÇÃO de causar o dano; na culpa, não há intenção. 'Caso fortuito' (E) é evento imprevisível, que afasta a responsabilidade. Mnemônico: Negligência = não fez; Imprudência = fez demais/sem cuidado; Imperícia = não sabia fazer.",
  },

  {
    id: "aut-etica-11", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a estrutura e as competências do Sistema COFEN/Conselhos Regionais de Enfermagem (CORENs), é correto afirmar que",
    alts: [
      "o COFEN e os CORENs são sindicatos responsáveis por negociar salários da categoria.",
      "compete aos Conselhos a fiscalização do exercício profissional e o julgamento ético-disciplinar.",
      "o registro profissional no COREN é facultativo para o exercício da enfermagem.",
      "os CORENs são responsáveis pela formação e diplomação dos profissionais.",
      "o COFEN atua apenas em âmbito municipal, sem abrangência nacional.",
    ],
    correta: 1,
    coment: "Gabarito: B. Compete ao Sistema COFEN/CORENs FISCALIZAR o exercício profissional da enfermagem e realizar o JULGAMENTO ÉTICO-DISCIPLINAR das infrações, além de disciplinar e registrar os profissionais.\n\n💡 CONSELHO ≠ SINDICATO (a distinção mais cobrada):\n• CONSELHO (COFEN/COREN): autarquia que FISCALIZA e regula o exercício, defende a sociedade. Registro é OBRIGATÓRIO para exercer (C erra).\n• SINDICATO: defende interesses trabalhistas/salariais da categoria (A confunde os dois).\n\n⚠️ Os Conselhos NÃO formam nem diplomam (D erra) — isso é papel das instituições de ensino. O COFEN tem abrangência NACIONAL; os CORENs atuam nos estados (E erra). Sem inscrição no COREN, o exercício é ilegal.",
  },

  {
    id: "aut-etica-12", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "O princípio bioético segundo o qual os recursos de saúde devem ser distribuídos de forma equitativa, e pacientes em condições semelhantes devem ser tratados de maneira semelhante, corresponde ao princípio da",
    alts: [
      "autonomia.",
      "beneficência.",
      "justiça.",
      "não maleficência.",
      "confidencialidade.",
    ],
    correta: 2,
    coment: "Gabarito: C. O princípio da JUSTIÇA trata da EQUIDADE na distribuição de recursos, riscos e benefícios em saúde — tratar igualmente os iguais e desigualmente os desiguais, na medida de suas necessidades.\n\n💡 APLICAÇÃO PRÁTICA: a justiça aparece na priorização de leitos, na fila de transplantes, na alocação de recursos escassos (muito discutida em cenários de pandemia). Conecta-se aos princípios do SUS (universalidade, EQUIDADE, integralidade).\n\n⚠️ Não confundir com os outros princípios: autonomia (decisão do paciente), beneficência (fazer o bem), não maleficência (não causar dano). 'Equidade / distribuição justa' é a assinatura do princípio da JUSTIÇA. Confidencialidade (E) é um dever, não um dos quatro princípios principialistas.",
  },

  {
    id: "aut-etica-13", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "De acordo com a legislação do exercício profissional, sobre a supervisão e a delegação de atividades na equipe de enfermagem, é correto afirmar que",
    alts: [
      "o técnico e o auxiliar de enfermagem exercem suas atividades com total autonomia, sem supervisão do enfermeiro.",
      "as atividades do técnico e do auxiliar de enfermagem são exercidas sob supervisão e orientação do enfermeiro.",
      "o enfermeiro pode delegar a prescrição de enfermagem ao técnico em unidades de menor porte.",
      "o auxiliar de enfermagem pode assumir a chefia do serviço de enfermagem na ausência do enfermeiro.",
      "a consulta de enfermagem pode ser realizada pelo técnico devidamente inscrito no COREN.",
    ],
    correta: 1,
    coment: "Gabarito: B. Pela Lei 7.498/86, o técnico e o auxiliar de enfermagem exercem suas atividades de nível MÉDIO sob SUPERVISÃO e ORIENTAÇÃO do ENFERMEIRO. A equipe atua de forma integrada, mas com o enfermeiro na coordenação.\n\n💡 O QUE É PRIVATIVO DO ENFERMEIRO e NÃO se delega:\n• Consulta de enfermagem (E erra).\n• Prescrição da assistência de enfermagem (C erra).\n• Diagnóstico de enfermagem.\n• Chefia/direção do serviço de enfermagem (D erra — auxiliar não assume).\n\n⚠️ A autonomia 'total' do técnico/auxiliar (A) é falsa — há hierarquia técnica e supervisão. A pegadinha central é sempre tentar 'delegar' ao nível médio uma atribuição privativa do enfermeiro. Guarde: consulta, diagnóstico e prescrição de enfermagem NÃO se delegam.",
  },

  {
    id: "aut-etica-14", eixo: "etica", sub: "Bioética",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A Resolução COFEN nº 564/2017 estabelece os princípios fundamentais do Código de Ética. Sobre a natureza desse Código, é correto afirmar que",
    alts: [
      "aplica-se apenas aos enfermeiros, excluindo técnicos e auxiliares de enfermagem.",
      "estabelece direitos, deveres, proibições e responsabilidades dos profissionais de enfermagem.",
      "tem caráter meramente sugestivo, sem gerar sanções em caso de descumprimento.",
      "sobrepõe-se à legislação penal e civil em qualquer circunstância.",
      "aplica-se somente ao serviço público, não ao setor privado.",
    ],
    correta: 1,
    coment: "Gabarito: B. O Código de Ética (COFEN 564/2017) estabelece os DIREITOS, DEVERES, PROIBIÇÕES e RESPONSABILIDADES dos profissionais de enfermagem, orientando a conduta ética no exercício profissional.\n\n💡 ABRANGÊNCIA: aplica-se a TODOS os profissionais de enfermagem — enfermeiros, técnicos, auxiliares e obstetrizes (A erra) — em QUALQUER ambiente, público ou privado (E erra).\n\n⚠️ O Código NÃO é 'sugestivo' (C erra): seu descumprimento gera penalidades ético-disciplinares (advertência a cassação). E ele NÃO se sobrepõe às leis penal e civil (D erra) — atua na esfera ética, que coexiste com as demais. Um mesmo fato pode ter repercussão ética, civil e penal simultaneamente.",
  },

  {
    id: "aut-etica-15", eixo: "etica", sub: "Legislação em enfermagem",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre o registro de enfermagem no prontuário do paciente, à luz dos deveres éticos e legais, é correto afirmar que",
    alts: [
      "rasuras e o uso de corretivo são permitidos para manter a estética do documento.",
      "as anotações devem ser claras, legíveis, completas, datadas, assinadas e identificadas com o registro profissional (COREN).",
      "o registro é dispensável quando o cuidado é considerado de rotina.",
      "é permitido registrar cuidados que não foram efetivamente realizados, para completar o prontuário.",
      "as anotações podem ser feitas a lápis para facilitar eventuais correções.",
    ],
    correta: 1,
    coment: "Gabarito: B. O registro de enfermagem deve ser CLARO, LEGÍVEL, COMPLETO, cronológico, DATADO, ASSINADO e identificado com a categoria e o número do COREN. É um dever ético-legal e a principal prova documental da assistência prestada.\n\n💡 REGRAS DO REGISTRO (campeãs de prova):\n• SEM rasuras ou corretivo (A e E erram) — em caso de erro, risca-se com um traço, escreve-se 'digo' ou 'sem efeito' e mantém-se legível.\n• Feito a CANETA, nunca a lápis (E erra).\n• TODO cuidado se registra — 'o que não foi registrado, não foi feito' (C erra).\n\n⚠️ A infração ÉTICA E CRIMINAL mais grave está na alternativa D: registrar o que NÃO foi feito é FALSIDADE — falso registro, vedado e punível. O prontuário é documento legal: fidedignidade é obrigatória.",
  },


  // ═══════════ AUTORAIS: CICLOS DE VIDA ═══════════
{
    id: "aut-ciclos-01", eixo: "ciclos", sub: "Aleitamento materno",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Segundo as recomendações do Ministério da Saúde e da OMS sobre aleitamento materno, é correto afirmar que o aleitamento materno",
    alts: [
      "exclusivo é recomendado até os 4 meses de idade, com introdução de água a partir de então.",
      "exclusivo é recomendado até os 6 meses e o complementado, até os 2 anos ou mais.",
      "deve ser complementado com chás e água desde o primeiro mês para hidratação.",
      "exclusivo deve ser mantido até os 2 anos, sem introdução de outros alimentos.",
      "é contraindicado nas primeiras 24 horas de vida do recém-nascido.",
    ],
    correta: 1,
    coment: "Gabarito: B. A recomendação é: aleitamento materno EXCLUSIVO até os 6 MESES (só leite materno, sem água, chá ou outro alimento) e aleitamento CONTINUADO/complementado até os 2 ANOS ou mais, com introdução alimentar adequada a partir dos 6 meses.\n\n💡 DEFINIÇÕES (a banca adora cobrar):\n• EXCLUSIVO: só leite materno (nem água).\n• PREDOMINANTE: leite materno + água/chás.\n• COMPLEMENTADO: leite materno + outros alimentos (após 6 meses).\n\n⚠️ Oferecer água/chá antes dos 6 meses (A e C) está errado — o leite materno supre toda a necessidade hídrica. A amamentação deve começar já na 1ª hora de vida ('hora de ouro'), não é contraindicada (E erra). Exclusivo é até 6 meses, não 2 anos (D confunde exclusivo com continuado).",
  },

  {
    id: "aut-ciclos-02", eixo: "ciclos", sub: "Saúde da criança",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre o Calendário Nacional de Vacinação da criança, as vacinas administradas ao RECÉM-NASCIDO, idealmente ainda na maternidade, são",
    alts: [
      "tríplice viral e febre amarela.",
      "BCG e hepatite B.",
      "pentavalente e VIP (poliomielite inativada).",
      "rotavírus e pneumocócica 10-valente.",
      "meningocócica C e tríplice bacteriana (DTP).",
    ],
    correta: 1,
    coment: "Gabarito: B. Ao nascer, o RN recebe BCG (dose única, contra formas graves de tuberculose) e HEPATITE B (preferencialmente nas primeiras 12–24 horas de vida). São as vacinas 'da maternidade'.\n\n💡 SEQUÊNCIA INICIAL DO CALENDÁRIO (marcos que caem):\n• Ao nascer: BCG + Hepatite B\n• 2 meses: Penta, VIP, Rotavírus, Pneumo 10\n• 3 meses: Meningo C\n• 9 meses: Febre amarela\n• 12 meses: Tríplice viral (1ª dose), Meningo C reforço, Pneumo reforço\n\n⚠️ As armadilhas colocam vacinas de meses posteriores como se fossem do nascimento: tríplice viral é aos 12 meses (A), penta/VIP aos 2 meses (C), rotavírus aos 2 meses (D). Decore o par do nascimento: BCG + Hep B.",
  },

  {
    id: "aut-ciclos-03", eixo: "ciclos", sub: "Pré-natal",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a assistência de enfermagem no pré-natal de baixo risco, segundo o Ministério da Saúde, é correto afirmar que",
    alts: [
      "o número mínimo de consultas de pré-natal recomendado é de uma consulta ao longo da gestação.",
      "recomenda-se o mínimo de 6 consultas, com início precoce no primeiro trimestre.",
      "o pré-natal deve iniciar apenas no terceiro trimestre da gestação.",
      "a enfermeira não pode realizar consultas de pré-natal de baixo risco.",
      "a aferição da pressão arterial é dispensável nas consultas de pré-natal.",
    ],
    correta: 1,
    coment: "Gabarito: B. O Ministério da Saúde recomenda o MÍNIMO de 6 CONSULTAS de pré-natal, com INÍCIO PRECOCE (idealmente no 1º trimestre) e captação até a 12ª semana. Distribuição usual: 1 no 1º trimestre, 2 no 2º e 3 no 3º.\n\n💡 A ENFERMEIRA PODE e DEVE realizar a consulta de pré-natal de BAIXO RISCO (D erra) — é atribuição respaldada em lei e protocolos, alternando com o médico.\n\n⚠️ Início 'só no 3º trimestre' (C) é grave — quanto mais precoce, melhor o desfecho. A aferição da PA é ESSENCIAL (E erra) — rastreia pré-eclâmpsia, uma das principais causas de morte materna. 'Uma consulta' (A) está muito abaixo do mínimo. Guarde: mínimo 6 consultas, começando cedo.",
  },

  {
    id: "aut-ciclos-04", eixo: "ciclos", sub: "Saúde do idoso",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Na avaliação da pessoa idosa, a identificação de síndromes geriátricas é fundamental. O conceito de FRAGILIDADE no idoso refere-se a",
    alts: [
      "uma condição normal e inevitável do envelhecimento, sem possibilidade de intervenção.",
      "uma síndrome de vulnerabilidade fisiológica com redução da reserva funcional e maior risco de desfechos adversos.",
      "sinônimo exclusivo de idade cronológica avançada, independentemente do estado de saúde.",
      "a presença isolada de uma única doença crônica no idoso.",
      "uma condição exclusivamente psicológica, sem componente físico.",
    ],
    correta: 1,
    coment: "Gabarito: B. A FRAGILIDADE é uma síndrome de vulnerabilidade fisiológica multissistêmica, com redução da reserva funcional e da capacidade de resposta a estresses, aumentando o risco de quedas, hospitalização, incapacidade e morte.\n\n💡 FENÓTIPO DE FRIED (5 critérios): perda de peso não intencional, fadiga/exaustão, fraqueza (força de preensão reduzida), lentidão da marcha e baixa atividade física. 3+ = frágil; 1–2 = pré-frágil.\n\n⚠️ Fragilidade NÃO é sinônimo de idade avançada (C erra) nem é 'normal e inevitável' (A erra) — é identificável e passível de INTERVENÇÃO (exercício, nutrição, revisão de medicamentos). Não é uma única doença (D) nem só psicológica (E). Envelhecer ≠ ser frágil: há idosos robustos.",
  },

  {
    id: "aut-ciclos-05", eixo: "ciclos", sub: "Saúde da mulher",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre o rastreamento do câncer do colo do útero no Brasil, segundo as diretrizes do Ministério da Saúde e do INCA, é correto afirmar que o exame citopatológico (Papanicolaou) é recomendado",
    alts: [
      "para todas as mulheres a partir da primeira menstruação, anualmente por toda a vida.",
      "para mulheres de 25 a 64 anos que já tiveram atividade sexual, a cada 3 anos após dois exames anuais normais.",
      "apenas para mulheres acima de 65 anos, independentemente do histórico.",
      "somente para mulheres com sintomas de sangramento vaginal.",
      "uma única vez na vida, sem necessidade de repetição.",
    ],
    correta: 1,
    coment: "Gabarito: B. O rastreamento citopatológico do colo do útero é recomendado para mulheres de 25 a 64 ANOS que já tiveram atividade sexual. Faz-se um exame por ano e, após DOIS exames anuais consecutivos NORMAIS, passa-se a repetir a cada 3 ANOS.\n\n💡 A LÓGICA (2 normais anuais → depois trienal) é uma das mais cobradas em saúde da mulher. A faixa é 25–64 anos — não começa na menarca (A erra) nem é 'só acima de 65' (C erra).\n\n⚠️ O rastreamento é para mulheres ASSINTOMÁTICAS (prevenção), não só para quem tem sintomas (D erra). Não é exame único (E erra) — é periódico. Guarde os números: 25 a 64 anos, 2 anuais normais e depois a cada 3 anos.",
  },

  {
    id: "aut-ciclos-06", eixo: "ciclos", sub: "Saúde da criança",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Na avaliação do crescimento e desenvolvimento infantil, a enfermeira utiliza a Caderneta de Saúde da Criança. Sobre o acompanhamento do crescimento por meio das curvas antropométricas, é correto afirmar que",
    alts: [
      "uma única medida de peso é suficiente para avaliar o crescimento, dispensando o acompanhamento.",
      "o traçado da curva ao longo do tempo (tendência) é mais importante do que um ponto isolado.",
      "o desvio da curva para baixo é sempre esperado e não requer investigação.",
      "o perímetro cefálico não tem relevância no acompanhamento do lactente.",
      "a caderneta destina-se apenas ao registro de vacinas, não do crescimento.",
    ],
    correta: 1,
    coment: "Gabarito: B. No acompanhamento do crescimento, o que mais importa é a TENDÊNCIA da curva ao longo do tempo (a inclinação/traçado), e não um ponto isolado. Uma criança pode estar em um percentil baixo, mas crescendo de forma ascendente e constante — o padrão evolutivo é o que se avalia.\n\n💡 SINAIS DE ALERTA: achatamento da curva, queda de percentil (mudança de faixa para baixo) ou perda de peso exigem INVESTIGAÇÃO (C erra ao dizer que desvio para baixo é 'sempre esperado').\n\n⚠️ Uma medida isolada não avalia crescimento (A erra) — precisa de seguimento. O PERÍMETRO CEFÁLICO é fundamental no lactente (D erra) — avalia o crescimento cerebral e rastreia micro/macrocefalia. A Caderneta registra crescimento, desenvolvimento E vacinas (E erra).",
  },

  {
    id: "aut-ciclos-07", eixo: "ciclos", sub: "Planejamento familiar",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "No âmbito do planejamento reprodutivo/familiar, sobre os métodos contraceptivos e a atuação da enfermagem, é correto afirmar que",
    alts: [
      "o preservativo (masculino ou feminino) é o único método que também previne infecções sexualmente transmissíveis.",
      "os métodos hormonais orais protegem contra as infecções sexualmente transmissíveis.",
      "a laqueadura e a vasectomia são métodos reversíveis de curto prazo.",
      "o planejamento familiar deve ser imposto pelo profissional, sem escolha do casal.",
      "o dispositivo intrauterino (DIU) é contraindicado para todas as mulheres que ainda não tiveram filhos.",
    ],
    correta: 0,
    coment: "Gabarito: A. O PRESERVATIVO (camisinha masculina ou feminina) é o único método que oferece DUPLA PROTEÇÃO: previne a gravidez E as infecções sexualmente transmissíveis (IST/HIV). Por isso a orientação da 'dupla proteção' é tão cobrada.\n\n💡 Métodos hormonais (pílula, injetável, implante) previnem gravidez, mas NÃO protegem contra IST (B erra) — daí a recomendação de associar o preservativo.\n\n⚠️ Laqueadura e vasectomia são métodos DEFINITIVOS/cirúrgicos (irreversíveis na prática), não reversíveis de curto prazo (C erra). O planejamento é um DIREITO baseado na livre escolha informada do casal — nunca imposto (D erra). O DIU pode ser usado por mulheres nulíparas (E erra — a antiga contraindicação foi superada).",
  },

  {
    id: "aut-ciclos-08", eixo: "ciclos", sub: "Pré-natal",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Durante uma consulta de pré-natal, uma gestante de 32 semanas apresenta PA de 150x100 mmHg, edema e proteinúria. Diante desse quadro sugestivo de pré-eclâmpsia, a conduta de enfermagem inclui",
    alts: [
      "orientar repouso domiciliar e reagendar retorno para dali a 30 dias, sem outras medidas.",
      "reconhecer o sinal de gravidade, comunicar imediatamente e encaminhar para avaliação, monitorizando PA e sinais de iminência de eclâmpsia.",
      "liberar a gestante com orientação de aumentar a ingestão de sal.",
      "considerar a pressão normal para a idade gestacional e não intervir.",
      "administrar diurético por conta própria para reduzir o edema.",
    ],
    correta: 1,
    coment: "Gabarito: B. PA ≥140x90, proteinúria e edema após 20 semanas = PRÉ-ECLÂMPSIA, uma emergência obstétrica. A enfermagem reconhece a gravidade, comunica de imediato, encaminha para avaliação e monitoriza a PA e os SINAIS DE IMINÊNCIA DE ECLÂMPSIA.\n\n💡 SINAIS DE IMINÊNCIA DE ECLÂMPSIA (decore — salvam vida): cefaleia intensa, distúrbios visuais (escotomas, visão turva), dor epigástrica/em barra, hiper-reflexia. A eclâmpsia é a evolução com CONVULSÕES.\n\n⚠️ Todas as outras condutas são perigosas: mandar para casa por 30 dias (A), aumentar sal (C), considerar 'normal' (D) ou medicar por conta própria (E). Pré-eclâmpsia é uma das principais causas de morte materna — a conduta é reconhecer e encaminhar RÁPIDO, nunca subestimar.",
  },

  {
    id: "aut-ciclos-09", eixo: "ciclos", sub: "Saúde do adulto",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Nas ações de prevenção e controle das doenças crônicas não transmissíveis (DCNT) no adulto, como hipertensão e diabetes, a atuação da enfermagem na Atenção Primária inclui",
    alts: [
      "restringir o cuidado apenas à consulta médica, sem participação da enfermagem.",
      "realizar consulta de enfermagem, educação em saúde, estratificação de risco e apoio ao autocuidado.",
      "orientar o abandono das mudanças no estilo de vida em favor exclusivo de medicamentos.",
      "desencorajar a adesão ao tratamento para reduzir a demanda no serviço.",
      "limitar-se a aferir a pressão arterial, sem qualquer orientação ao paciente.",
    ],
    correta: 1,
    coment: "Gabarito: B. Na Atenção Primária, a enfermagem tem papel central nas DCNT: realiza CONSULTA DE ENFERMAGEM, EDUCAÇÃO EM SAÚDE, estratificação de risco cardiovascular, apoio ao AUTOCUIDADO, acompanhamento e adesão ao tratamento (grupos de hipertensos e diabéticos).\n\n💡 As MUDANÇAS NO ESTILO DE VIDA (alimentação, atividade física, cessação do tabagismo) são a BASE do tratamento das DCNT, associadas — e não substituídas — pela medicação (C erra).\n\n⚠️ As alternativas erradas negam o papel da enfermagem (A, E) ou propõem condutas absurdas e antiéticas (desencorajar adesão — D). O foco moderno das DCNT é o cuidado LONGITUDINAL e a promoção do autocuidado, com a enfermagem como protagonista na APS.",
  },

  {
    id: "aut-ciclos-10", eixo: "ciclos", sub: "Saúde do adolescente",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a atenção à saúde do adolescente e o princípio da confidencialidade no atendimento, é correto afirmar que",
    alts: [
      "o adolescente jamais pode ser atendido sem a presença dos pais ou responsáveis.",
      "o adolescente tem direito à privacidade e ao sigilo no atendimento, com exceções em situações de risco à vida.",
      "toda informação do adolescente deve ser obrigatoriamente repassada aos pais em qualquer situação.",
      "o adolescente não tem direito a receber orientação sobre métodos contraceptivos.",
      "a confidencialidade é vedada no atendimento a menores de 18 anos em qualquer circunstância.",
    ],
    correta: 1,
    coment: "Gabarito: B. O adolescente tem DIREITO à privacidade, à confidencialidade e ao atendimento sem a presença dos pais, se assim desejar — princípio reconhecido pelo ECA e pelas diretrizes de saúde do adolescente. As EXCEÇÕES ocorrem em situações de risco à vida ou à saúde (ex.: ideação suicida, abuso, risco grave), quando se envolve a família/rede de proteção.\n\n💡 A confidencialidade FAVORECE o vínculo e a busca por cuidado — o adolescente que confia procura ajuda. Ele pode e deve receber orientação sobre saúde sexual e contracepção (D erra).\n\n⚠️ 'Sempre com os pais' (A), 'sempre repassar aos pais' (C) e 'confidencialidade vedada' (E) contrariam o direito do adolescente. A regra é sigilo, com quebra apenas justificada por proteção à vida — e, mesmo assim, buscando o consentimento e a corresponsabilização sempre que possível.",
  },

  {
    id: "aut-ciclos-11", eixo: "ciclos", sub: "Saúde da mulher",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "No puerpério, a enfermeira acompanha a mulher no período pós-parto. Sobre a avaliação puerperal, a involução uterina e a loquiação, é correto afirmar que",
    alts: [
      "o útero deve permanecer no nível da cicatriz umbilical por todo o puerpério, sem involução.",
      "espera-se a involução uterina progressiva e a evolução dos lóquios de rubros para serosos e depois alba.",
      "os lóquios com odor fétido e febre são achados normais e esperados no puerpério.",
      "a involução uterina não precisa ser avaliada pela enfermagem.",
      "a presença de lóquios vermelho-vivos abundantes com coágulos após semanas é sinal de recuperação ideal.",
    ],
    correta: 1,
    coment: "Gabarito: B. No puerpério, espera-se a INVOLUÇÃO UTERINA progressiva (o útero desce ~1 cm/dia e retorna à pelve) e a evolução dos LÓQUIOS: rubros/vermelhos (lochia rubra, primeiros dias) → serosos/rosados (lochia serosa) → esbranquiçados (lochia alba). É a cicatrização fisiológica normal.\n\n💡 A enfermagem AVALIA a involução (altura e tônus do fundo uterino) e o aspecto dos lóquios (D erra ao dispensar).\n\n⚠️ SINAIS DE ALERTA (não são normais — C e E erram): lóquios FÉTIDOS + FEBRE sugerem infecção puerperal (endometrite); sangramento vermelho-vivo abundante com coágulos, especialmente tardio, sugere hemorragia/subinvolução. O útero NÃO fica parado na cicatriz umbilical (A erra) — ele involui. Odor fétido e febre = investigar, nunca 'esperado'.",
  },

  {
    id: "aut-ciclos-12", eixo: "ciclos", sub: "Saúde da criança",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "O Teste do Pezinho (triagem neonatal) faz parte das ações de proteção à saúde do recém-nascido. Sobre esse exame, é correto afirmar que",
    alts: [
      "deve ser realizado idealmente entre o 3º e o 5º dia de vida do recém-nascido.",
      "deve ser coletado obrigatoriamente na primeira hora de vida, ainda na sala de parto.",
      "destina-se exclusivamente ao diagnóstico de cardiopatias congênitas.",
      "só deve ser realizado se a criança apresentar sintomas de alguma doença.",
      "pode ser feito a qualquer momento até o primeiro ano de vida, sem prejuízo.",
    ],
    correta: 0,
    coment: "Gabarito: A. O Teste do Pezinho deve ser coletado idealmente entre o 3º e o 5º DIA de vida — tempo suficiente para o RN ter ingerido proteína (leite) e permitir a detecção de erros metabólicos, e cedo o bastante para intervir antes de danos.\n\n💡 O QUE RASTREIA (triagem neonatal biológica): hipotireoidismo congênito, fenilcetonúria, doença falciforme e outras hemoglobinopatias, fibrose cística, hiperplasia adrenal congênita, deficiência de biotinidase (o rol vem sendo ampliado). NÃO é para cardiopatia (C confunde com o Teste do Coraçãozinho).\n\n⚠️ É um exame de TRIAGEM UNIVERSAL — feito em TODOS os RN, sintomáticos ou não (D erra). Não é 'primeira hora' (B confunde com outras condutas) nem 'a qualquer momento no 1º ano' (E erra) — a janela ideal é 3º–5º dia. Atraso reduz a eficácia da prevenção.",
  },

  {
    id: "aut-ciclos-13", eixo: "ciclos", sub: "Saúde do idoso",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "A prevenção de quedas é uma prioridade no cuidado à pessoa idosa. Sobre os fatores de risco e as medidas preventivas, é correto afirmar que",
    alts: [
      "as quedas em idosos têm causa única e são sempre inevitáveis.",
      "fatores intrínsecos (como alterações de equilíbrio e polifarmácia) e extrínsecos (ambientais) contribuem, e ambos são passíveis de intervenção.",
      "a revisão de medicamentos não influencia o risco de quedas no idoso.",
      "a atividade física deve ser desencorajada no idoso para evitar quedas.",
      "tapetes soltos e má iluminação não têm relação com o risco de quedas.",
    ],
    correta: 1,
    coment: "Gabarito: B. As quedas no idoso são MULTIFATORIAIS. Fatores INTRÍNSECOS (do próprio idoso): alterações de equilíbrio e marcha, redução visual, hipotensão postural, POLIFARMÁCIA (uso de muitos medicamentos, especialmente sedativos/psicotrópicos). Fatores EXTRÍNSECOS (ambientais): tapetes soltos, má iluminação, pisos escorregadios, ausência de barras de apoio. Ambos são PREVENÍVEIS.\n\n💡 MEDIDAS PREVENTIVAS: revisar medicamentos (a polifarmácia importa muito — C erra), adequar o ambiente (E erra ao negar tapetes/iluminação), corrigir déficit visual, e INCENTIVAR exercício de força e equilíbrio (D inverte — atividade física PREVINE quedas, não deve ser desencorajada).\n\n⚠️ Quedas não são 'inevitáveis' nem de causa única (A erra) — são um evento sentinela prevenível. A avaliação multifatorial do risco é o padrão de cuidado geriátrico.",
  },

  {
    id: "aut-ciclos-14", eixo: "ciclos", sub: "Aborto legal",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre as situações em que a interrupção da gestação é amparada pela legislação brasileira (aborto legal/previsto em lei), é correto afirmar que se inclui a gestação",
    alts: [
      "em qualquer situação, a pedido da gestante, sem restrições legais.",
      "resultante de estupro, risco de vida para a gestante e feto anencéfalo (este por decisão do STF).",
      "apenas quando há risco de vida para o feto, e não para a gestante.",
      "somente mediante autorização judicial prévia em todos os casos, inclusive risco de vida.",
      "em nenhuma hipótese, sendo o aborto sempre criminalizado no Brasil.",
    ],
    correta: 1,
    coment: "Gabarito: B. A legislação brasileira ampara a interrupção da gestação em três situações: (1) gestação resultante de ESTUPRO; (2) RISCO DE VIDA para a gestante; e (3) feto ANENCÉFALO (reconhecido pelo STF na ADPF 54, 2012).\n\n💡 PONTOS QUE A BANCA COBRA:\n• Nos casos de estupro e risco de vida, NÃO se exige autorização/decisão judicial prévia (D erra) — no risco de vida, inclusive, prevalece a urgência.\n• O papel da equipe é acolher SEM julgamento e sem revitimização, respeitando o direito da mulher.\n\n⚠️ Não é 'a pedido em qualquer situação' (A erra — fora dessas hipóteses, permanece tipificado) nem 'sempre criminalizado sem exceção' (E erra). O foco do profissional de saúde é o ACOLHIMENTO humanizado nas situações legalmente amparadas.",
  },

  {
    id: "aut-ciclos-15", eixo: "ciclos", sub: "Saúde do adulto",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a técnica correta de verificação da pressão arterial no adulto, medida frequentemente realizada na atenção à saúde, é correto afirmar que",
    alts: [
      "o manguito deve ter largura equivalente a cerca de 40% da circunferência do braço e ser posicionado adequadamente.",
      "o paciente pode estar com as pernas cruzadas e a bexiga cheia sem interferência no resultado.",
      "a medida deve ser feita logo após esforço físico intenso para obter valor mais fidedigno.",
      "o braço deve permanecer pendente, abaixo do nível do coração, durante a aferição.",
      "recomenda-se conversar com o paciente durante a medida para mantê-lo relaxado.",
    ],
    correta: 0,
    coment: "Gabarito: A. O MANGUITO adequado é fundamental: sua largura (bolsa inflável) deve corresponder a cerca de 40% da circunferência do braço, e o comprimento envolver ~80–100%. Manguito pequeno demais SUPERESTIMA a PA; grande demais subestima.\n\n💡 TÉCNICA CORRETA (erros que a banca explora):\n• Paciente em repouso (5 min), sentado, pernas descruzadas, pés no chão, bexiga vazia (B erra ao dizer que 'não interfere').\n• Braço apoiado no NÍVEL DO CORAÇÃO (D erra — braço pendente falseia).\n• SEM conversar durante a medida (E erra — falar eleva a PA).\n• NÃO medir logo após esforço, café ou cigarro (C erra).\n\n⚠️ Esses detalhes de técnica são campeões de prova porque um erro de método gera diagnóstico errado de hipertensão. Manguito correto + paciente em repouso + braço na altura do coração = medida fidedigna.",
  },


  // ═══════════ AUTORAIS: EPIDEMIOLOGIA E EDUCAÇÃO EM SAÚDE ═══════════
{
    id: "aut-bonus-01", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Em epidemiologia, os conceitos de endemia, epidemia e pandemia descrevem padrões de ocorrência de doenças. Assinale a alternativa correta.",
    alts: [
      "Endemia é a ocorrência de uma doença em vários países ou continentes simultaneamente.",
      "Epidemia é a ocorrência de casos de uma doença em número claramente superior ao esperado para uma região e período.",
      "Pandemia é a ocorrência habitual e esperada de uma doença em determinada área geográfica.",
      "Endemia refere-se ao surgimento súbito e inesperado de uma nova doença.",
      "Surto e pandemia são termos idênticos e intercambiáveis.",
    ],
    correta: 1,
    coment: "Gabarito: B. EPIDEMIA é a ocorrência de casos em número claramente ACIMA do esperado para aquela população, região e período.\n\n💡 OS CONCEITOS (decore a escala):\n• ENDEMIA: presença HABITUAL/esperada da doença numa área (ex.: dengue endêmica em certas regiões).\n• SURTO: epidemia restrita a um espaço delimitado e pequeno (uma creche, um bairro).\n• EPIDEMIA: casos acima do esperado, atingindo uma região mais ampla.\n• PANDEMIA: epidemia disseminada por vários países/continentes (ex.: COVID-19).\n\n⚠️ As alternativas trocam as definições: A descreve pandemia chamando de endemia; C descreve endemia chamando de pandemia; D confunde endemia com evento súbito. Surto ≠ pandemia (E erra) — diferem na abrangência. Escala de abrangência: surto < epidemia < pandemia.",
  },

  {
    id: "aut-bonus-02", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre os indicadores de morbimortalidade utilizados em saúde coletiva, o coeficiente que expressa o número de óbitos de crianças menores de 1 ano por 1.000 nascidos vivos, em determinado local e período, é o",
    alts: [
      "coeficiente de mortalidade materna.",
      "coeficiente (taxa) de mortalidade infantil.",
      "coeficiente de mortalidade geral.",
      "coeficiente de letalidade.",
      "coeficiente de prevalência.",
    ],
    correta: 1,
    coment: "Gabarito: B. O coeficiente de MORTALIDADE INFANTIL mede os óbitos de menores de 1 ANO por 1.000 NASCIDOS VIVOS. É um dos indicadores mais sensíveis das condições de vida e saúde de uma população.\n\n💡 OUTROS INDICADORES (não confundir):\n• Mortalidade MATERNA: óbitos maternos por 100.000 nascidos vivos.\n• LETALIDADE: proporção de óbitos ENTRE OS DOENTES de uma doença (mede a gravidade da doença).\n• PREVALÊNCIA: casos existentes (novos + antigos) num momento.\n• INCIDÊNCIA: casos NOVOS num período.\n\n⚠️ A pegadinha clássica é confundir MORTALIDADE (óbitos na população) com LETALIDADE (óbitos entre os doentes). E não confundir INCIDÊNCIA (casos novos) com PREVALÊNCIA (casos existentes). A mortalidade infantil desdobra-se em neonatal (<28 dias) e pós-neonatal (28 dias a 1 ano).",
  },

  {
    id: "aut-bonus-03", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre a diferença entre os indicadores de incidência e prevalência, é correto afirmar que",
    alts: [
      "a incidência mede o total de casos existentes em um dado momento.",
      "a incidência mede os casos NOVOS de uma doença em um período; a prevalência, os casos existentes.",
      "prevalência e incidência são sinônimos e medem a mesma coisa.",
      "a prevalência mede apenas os óbitos por uma doença.",
      "a incidência só se aplica a doenças crônicas de longa duração.",
    ],
    correta: 1,
    coment: "Gabarito: B. INCIDÊNCIA = casos NOVOS surgidos em um período (mede o risco/velocidade de surgimento). PREVALÊNCIA = casos EXISTENTES (novos + antigos) em um momento ou período (mede a 'carga' da doença na população).\n\n💡 A RELAÇÃO ENTRE ELAS: Prevalência ≈ Incidência × Duração da doença.\n• Doenças CRÔNICAS e de longa duração (ex.: diabetes) tendem a ter prevalência ALTA (os casos se acumulam).\n• Doenças AGUDAS e de curta duração (ex.: gripe, que cura ou mata rápido) têm prevalência menor em relação à incidência.\n\n⚠️ As trocas clássicas: A e D atribuem à incidência/prevalência definições erradas. A incidência NÃO é só para crônicas (E erra) — aplica-se a qualquer doença. Mnemônico: INcidência = casos que 'INgressam' (novos); prevalência = o que 'prevalece'/permanece (todos os existentes).",
  },

  {
    id: "aut-bonus-04", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Os níveis de prevenção propostos por Leavell e Clark orientam as ações em saúde. A vacinação de uma população suscetível, antes do adoecimento, é uma ação de prevenção",
    alts: [
      "primária, voltada à promoção da saúde e à proteção específica.",
      "secundária, voltada ao diagnóstico precoce.",
      "terciária, voltada à reabilitação.",
      "quaternária, voltada a evitar iatrogenia.",
      "nenhuma, pois a vacinação não é considerada ação preventiva.",
    ],
    correta: 0,
    coment: "Gabarito: A. A VACINAÇÃO é uma ação de PREVENÇÃO PRIMÁRIA — mais especificamente de PROTEÇÃO ESPECÍFICA — pois atua ANTES do adoecimento, na fase de suscetibilidade, para evitar que a doença ocorra.\n\n💡 NÍVEIS DE PREVENÇÃO (Leavell e Clark) — campeões de prova:\n• PRIMÁRIA: antes da doença → promoção da saúde (educação, alimentação) + proteção específica (vacina, uso de EPI).\n• SECUNDÁRIA: doença já iniciada → diagnóstico precoce e tratamento oportuno (ex.: Papanicolaou, rastreamentos) + limitação do dano.\n• TERCIÁRIA: doença instalada → REABILITAÇÃO (fisioterapia, reinserção).\n• (QUATERNÁRIA: evitar intervenções desnecessárias/iatrogenia.)\n\n⚠️ A pegadinha frequente é colocar vacina como prevenção secundária. Vacina = ANTES de adoecer = PRIMÁRIA (proteção específica). Diagnóstico precoce = secundária; reabilitação = terciária.",
  },

  {
    id: "aut-bonus-05", eixo: "bonus", sub: "Indicadores de saúde coletiva",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre a vigilância em saúde e a notificação compulsória de doenças e agravos, é correto afirmar que",
    alts: [
      "a notificação compulsória é facultativa e depende exclusivamente da vontade do profissional.",
      "a notificação de doenças de notificação compulsória é obrigatória e deve seguir os prazos estabelecidos, alimentando o SINAN.",
      "apenas o médico pode notificar; os demais profissionais estão dispensados.",
      "doenças de notificação imediata podem ser comunicadas em até 30 dias.",
      "a notificação só é exigida após a confirmação laboratorial do caso.",
    ],
    correta: 1,
    coment: "Gabarito: B. A notificação das doenças/agravos da Lista Nacional de Notificação Compulsória é OBRIGATÓRIA, segue prazos definidos (imediata — até 24h — ou semanal) e alimenta o SINAN (Sistema de Informação de Agravos de Notificação).\n\n💡 QUEM NOTIFICA: é dever de TODO profissional de saúde e responsável por serviços — não só o médico (C erra). O enfermeiro notifica.\n\n⚠️ Pontos que a banca cobra:\n• Notificação NÃO é facultativa (A erra) — é compulsória, com respaldo legal.\n• Notificação IMEDIATA é em até 24 HORAS, não 30 dias (D erra).\n• Notifica-se a SUSPEITA — não se espera confirmação laboratorial (E erra), justamente para permitir resposta rápida. Guarde: notificar a suspeita, dentro do prazo, é obrigação de todos.",
  },

  {
    id: "aut-bonus-06", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "A cadeia epidemiológica (ou cadeia de transmissão) descreve os elos envolvidos na ocorrência de uma doença transmissível. Sobre seus componentes, é correto afirmar que",
    alts: [
      "o reservatório é o indivíduo ou animal sadio que nunca abriga o agente.",
      "a porta de saída, o modo de transmissão e a porta de entrada são elos da cadeia de transmissão.",
      "o agente etiológico é sempre uma bactéria, nunca vírus ou fungo.",
      "o hospedeiro suscetível é aquele totalmente imune ao agente.",
      "a interrupção de um único elo jamais impede a transmissão da doença.",
    ],
    correta: 1,
    coment: "Gabarito: B. A cadeia epidemiológica é composta por elos: AGENTE etiológico → RESERVATÓRIO/fonte → PORTA DE SAÍDA → MODO DE TRANSMISSÃO → PORTA DE ENTRADA → HOSPEDEIRO SUSCETÍVEL.\n\n💡 CONCEITOS CORRETOS (as alternativas erradas os invertem):\n• RESERVATÓRIO: onde o agente vive e se multiplica (homem, animal, ambiente) — não é 'sadio que nunca abriga' (A erra).\n• AGENTE: pode ser vírus, bactéria, fungo, protozoário, helminto (C erra ao limitar a bactéria).\n• HOSPEDEIRO SUSCETÍVEL: quem PODE adoecer (sem imunidade), não o imune (D inverte).\n\n⚠️ A base do CONTROLE de doenças é justamente ROMPER um elo da cadeia (vacinar = proteger o hospedeiro; saneamento = bloquear a transmissão; isolamento = bloquear a porta de saída). Por isso E está errada: interromper elos É a estratégia que impede a transmissão.",
  },

  {
    id: "aut-bonus-07", eixo: "bonus", sub: "Educação em saúde",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A educação em saúde é uma ferramenta essencial da atuação da enfermagem. Sobre a educação popular em saúde, na perspectiva dialógica (inspirada em Paulo Freire), é correto afirmar que",
    alts: [
      "baseia-se na transmissão vertical de conhecimento, do profissional 'que sabe' para o usuário 'que não sabe'.",
      "valoriza o saber prévio do usuário e constrói o conhecimento de forma dialógica e participativa.",
      "considera o usuário um receptor passivo, sem contribuição ao processo.",
      "dispensa a escuta da comunidade, priorizando apenas as normas técnicas.",
      "deve impor mudanças de comportamento sem considerar o contexto sociocultural.",
    ],
    correta: 1,
    coment: "Gabarito: B. A educação popular em saúde, na perspectiva DIALÓGICA (freireana), VALORIZA o saber prévio do usuário e constrói o conhecimento de forma horizontal, PARTICIPATIVA e contextualizada — o usuário é sujeito ativo, não recipiente vazio.\n\n💡 O CONTRASTE (muito cobrado):\n• Modelo TRADICIONAL/bancário: transmissão VERTICAL, o profissional 'deposita' informação no usuário passivo (A, C descrevem isso — o oposto do desejável).\n• Modelo DIALÓGICO/problematizador: troca horizontal, escuta, respeito ao contexto sociocultural, corresponsabilização.\n\n⚠️ Impor comportamentos (E) ou ignorar a comunidade (D) contraria a educação popular. A palavra-chave é DIÁLOGO e valorização do saber do outro. A PNEPS (Política Nacional de Educação Popular em Saúde) institucionaliza essa abordagem no SUS.",
  },

  {
    id: "aut-bonus-08", eixo: "bonus", sub: "Indicadores de saúde coletiva",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Os Sistemas de Informação em Saúde subsidiam a gestão e a vigilância no SUS. Sobre esses sistemas, assinale a associação correta.",
    alts: [
      "O SINASC registra os óbitos ocorridos no país.",
      "O SIM (Sistema de Informações sobre Mortalidade) registra os dados de óbitos.",
      "O SINAN registra exclusivamente os nascidos vivos.",
      "O SINASC (Sistema de Informações sobre Nascidos Vivos) registra os agravos de notificação.",
      "Nenhum sistema de informação é utilizado na vigilância em saúde.",
    ],
    correta: 1,
    coment: "Gabarito: B. O SIM (Sistema de Informações sobre Mortalidade) registra os dados de ÓBITOS, tendo a Declaração de Óbito (DO) como documento-base.\n\n💡 OS PRINCIPAIS SISTEMAS (decore a sigla e o que registra):\n• SIM → óbitos (Mortalidade) — base: Declaração de Óbito.\n• SINASC → Nascidos Vivos — base: Declaração de Nascido Vivo (DNV).\n• SINAN → Agravos de Notificação (doenças notificáveis).\n• SIH → internações hospitalares · SIA → produção ambulatorial.\n\n⚠️ As alternativas TROCAM os sistemas: SINASC não registra óbitos (A erra) nem agravos (D erra) — registra nascimentos. SINAN não é nascidos vivos (C erra) — é agravos. Mnemônico: SIM = morte; SINASC = nascimento; SINAN = notificação.",
  },

  {
    id: "aut-bonus-09", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Sobre as medidas de precaução e isolamento para o controle da transmissão de doenças infecciosas nos serviços de saúde, é correto afirmar que",
    alts: [
      "as precauções-padrão aplicam-se apenas a pacientes com diagnóstico infeccioso confirmado.",
      "as precauções-padrão devem ser aplicadas a TODOS os pacientes, independentemente do diagnóstico.",
      "a precaução para aerossóis dispensa o uso de máscara pelo profissional.",
      "a precaução de contato dispensa a higiene das mãos.",
      "não há diferença entre precauções por gotículas e por aerossóis.",
    ],
    correta: 1,
    coment: "Gabarito: B. As PRECAUÇÕES-PADRÃO aplicam-se a TODOS os pacientes, SEMPRE, independentemente do diagnóstico — partem do princípio de que qualquer paciente pode ser fonte de infecção (higiene das mãos, uso de EPI conforme o risco de exposição a fluidos).\n\n💡 PRECAUÇÕES ESPECÍFICAS (por tipo de transmissão):\n• CONTATO: luvas e avental; higiene das mãos SEMPRE mantida (D erra).\n• GOTÍCULAS (ex.: influenza, meningite): máscara cirúrgica, quarto/distância ~1 m.\n• AEROSSÓIS (ex.: tuberculose, sarampo, varicela): quarto com pressão NEGATIVA e máscara N95/PFF2 pelo profissional (C erra ao 'dispensar máscara').\n\n⚠️ Gotícula ≠ aerossol (E erra): gotículas são partículas maiores, caem perto; aerossóis são partículas menores que ficam suspensas no ar e exigem N95. As precauções-padrão são a BASE, aplicada a todos; as específicas se SOMAM conforme a doença.",
  },

  {
    id: "aut-bonus-10", eixo: "bonus", sub: "Indicadores de saúde coletiva",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A Constituição Federal e a Lei nº 8.080/1990 estabelecem os princípios do Sistema Único de Saúde (SUS). O princípio segundo o qual todas as pessoas têm direito ao acesso às ações e serviços de saúde, sem qualquer discriminação, é o da",
    alts: [
      "universalidade.",
      "hierarquização.",
      "descentralização.",
      "regionalização.",
      "resolutividade.",
    ],
    correta: 0,
    coment: "Gabarito: A. A UNIVERSALIDADE garante que TODAS as pessoas têm direito ao acesso às ações e serviços de saúde, sem discriminação — 'saúde é direito de todos e dever do Estado' (CF, art. 196).\n\n💡 PRINCÍPIOS DOUTRINÁRIOS do SUS (os que mais caem):\n• UNIVERSALIDADE: acesso para todos.\n• EQUIDADE: tratar desigualmente os desiguais, priorizando quem mais precisa.\n• INTEGRALIDADE: atenção completa — promoção, prevenção, cura e reabilitação.\n\n💡 PRINCÍPIOS ORGANIZATIVOS: descentralização, regionalização, hierarquização e participação social (controle social).\n\n⚠️ A banca mistura os dois grupos. 'Acesso para todos sem discriminação' = UNIVERSALIDADE. Não confunda com equidade (priorizar quem precisa mais) nem com os princípios organizativos (hierarquização, descentralização), que tratam de COMO o sistema se organiza, não do direito de acesso.",
  },

  {
    id: "aut-bonus-11", eixo: "bonus", sub: "Indicadores de saúde coletiva",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre o princípio da EQUIDADE no SUS, é correto afirmar que",
    alts: [
      "significa oferecer exatamente o mesmo atendimento a todos, sem distinção de necessidades.",
      "significa tratar de forma desigual os desiguais, investindo mais recursos onde há maior necessidade, para reduzir iniquidades.",
      "é sinônimo perfeito de universalidade, sem qualquer diferença conceitual.",
      "restringe o acesso à saúde apenas às pessoas que contribuem financeiramente.",
      "prioriza sempre quem chega primeiro, por ordem de chegada, sem avaliar a gravidade.",
    ],
    correta: 1,
    coment: "Gabarito: B. A EQUIDADE consiste em tratar DESIGUALMENTE os desiguais — reconhecer que pessoas e grupos têm necessidades diferentes e alocar mais recursos/atenção onde há maior necessidade, reduzindo as iniquidades em saúde. É a 'justiça' aplicada ao SUS.\n\n💡 UNIVERSALIDADE × EQUIDADE (a distinção que a banca ADORA):\n• UNIVERSALIDADE: TODOS têm acesso (a porta é para todos).\n• EQUIDADE: dentro desse acesso, prioriza-se quem mais precisa (nem todos recebem o mesmo — recebem conforme a necessidade).\n\n⚠️ Equidade NÃO é 'tratar todos igual' (A confunde com igualdade formal) nem sinônimo de universalidade (C erra). O SUS é gratuito e não vincula acesso a contribuição (D erra — isso seria um modelo previdenciário, superado com o SUS). Ordem de chegada sem avaliar gravidade (E) contraria a lógica de priorizar necessidade (é o oposto da classificação de risco).",
  },

  {
    id: "aut-bonus-12", eixo: "bonus", sub: "Educação em saúde",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A Estratégia Saúde da Família (ESF) é a principal porta de entrada e reorganizadora da Atenção Primária no SUS. Sobre a ESF e a atuação da enfermagem, é correto afirmar que",
    alts: [
      "atua de forma centrada exclusivamente na doença e no atendimento hospitalar.",
      "trabalha com território definido, população adscrita e enfoque na promoção da saúde e prevenção, com equipe multiprofissional.",
      "dispensa a figura do agente comunitário de saúde na composição da equipe.",
      "restringe as ações ao consultório, sem visitas domiciliares.",
      "o enfermeiro não integra a equipe mínima da Estratégia Saúde da Família.",
    ],
    correta: 1,
    coment: "Gabarito: B. A ESF trabalha com TERRITÓRIO definido e POPULAÇÃO ADSCRITA (vinculada), com enfoque em PROMOÇÃO da saúde, PREVENÇÃO e cuidado longitudinal, por meio de uma EQUIPE MULTIPROFISSIONAL e do vínculo com a comunidade.\n\n💡 EQUIPE MÍNIMA DA ESF: médico, ENFERMEIRO, técnico/auxiliar de enfermagem e agentes comunitários de saúde (ACS) — frequentemente com equipe de saúde bucal. O enfermeiro é peça central (E erra) e o ACS é essencial (C erra).\n\n⚠️ A ESF NÃO é centrada em hospital nem só na doença (A erra) — é a base da Atenção Primária, com foco na saúde e no território. A VISITA DOMICILIAR é ferramenta-chave (D erra). Palavras que entregam a resposta: território, população adscrita, promoção/prevenção, equipe multiprofissional.",
  },

  {
    id: "aut-bonus-13", eixo: "bonus", sub: "Indicadores de saúde coletiva",
    banca: "Autoral Resifriends", estilo: "AOCP", ano: 2026, autoral: true, nivel: "dificil",
    enunciado: "Sobre a participação e o controle social no SUS, regulamentados pela Lei nº 8.142/1990, é correto afirmar que",
    alts: [
      "os Conselhos de Saúde têm caráter apenas consultivo, sem poder deliberativo.",
      "os Conselhos de Saúde são permanentes e deliberativos, com participação paritária dos usuários em relação ao conjunto dos demais segmentos.",
      "a participação da comunidade na gestão do SUS não é prevista em lei.",
      "as Conferências de Saúde ocorrem mensalmente para fiscalizar contas.",
      "apenas gestores e profissionais de saúde podem compor os Conselhos de Saúde.",
    ],
    correta: 1,
    coment: "Gabarito: B. Pela Lei 8.142/90, os CONSELHOS DE SAÚDE são órgãos PERMANENTES e DELIBERATIVOS, com composição PARITÁRIA: os USUÁRIOS ocupam 50% das vagas, e os outros 50% se dividem entre trabalhadores de saúde, gestores e prestadores de serviço.\n\n💡 AS DUAS INSTÂNCIAS DE CONTROLE SOCIAL (Lei 8.142/90):\n• CONSELHO DE SAÚDE: permanente, deliberativo, paritário — atua na formulação e no controle da execução da política de saúde.\n• CONFERÊNCIA DE SAÚDE: reúne-se a cada 4 ANOS (não mensalmente — D erra) para avaliar e propor diretrizes.\n\n⚠️ O Conselho é DELIBERATIVO, não apenas consultivo (A erra). A participação da comunidade é garantida em lei (C erra) e inclui os USUÁRIOS — não só gestores e profissionais (E erra). A palavra-chave é PARIDADE dos usuários (50%): é o coração do controle social.",
  },

  {
    id: "aut-bonus-14", eixo: "bonus", sub: "Noções de epidemiologia",
    banca: "Autoral Resifriends", estilo: "FGV", ano: 2026, autoral: true, nivel: "media",
    enunciado: "A vigilância em saúde organiza-se em áreas de atuação integradas. A área responsável por ações voltadas ao conhecimento, à detecção e à prevenção de fatores de risco do ambiente que interferem na saúde humana (água, ar, solo, contaminantes) é a vigilância",
    alts: [
      "epidemiológica.",
      "ambiental (em saúde ambiental).",
      "sanitária.",
      "da situação de saúde do trabalhador, apenas.",
      "laboratorial, exclusivamente.",
    ],
    correta: 1,
    coment: "Gabarito: B. A VIGILÂNCIA AMBIENTAL (em saúde ambiental) atua sobre os fatores do MEIO AMBIENTE que interferem na saúde humana: qualidade da água para consumo, ar, solo, contaminantes químicos, desastres, vetores relacionados ao ambiente.\n\n💡 AS ÁREAS DA VIGILÂNCIA EM SAÚDE (não confundir):\n• EPIDEMIOLÓGICA: monitora doenças e agravos (notificação, surtos, indicadores).\n• SANITÁRIA: controla riscos de produtos, serviços e estabelecimentos (alimentos, medicamentos, serviços de saúde) — é a área da ANVISA.\n• AMBIENTAL: fatores do ambiente (água, ar, solo).\n• SAÚDE DO TRABALHADOR: riscos relacionados ao trabalho.\n\n⚠️ A banca troca as áreas. 'Água, ar, solo, contaminantes ambientais' = vigilância AMBIENTAL. Não confundir com a SANITÁRIA (produtos e serviços) nem com a EPIDEMIOLÓGICA (doenças). As áreas são integradas, mas com focos distintos.",
  },

  {
    id: "aut-bonus-15", eixo: "bonus", sub: "Educação em saúde",
    banca: "Autoral Resifriends", estilo: "IAUPE", ano: 2026, autoral: true, nivel: "media",
    enunciado: "Ao planejar uma ação de educação em saúde para um grupo de gestantes na Atenção Primária, a enfermeira deve considerar que uma prática educativa eficaz",
    alts: [
      "consiste em uma palestra expositiva longa, sem espaço para dúvidas ou troca.",
      "parte das necessidades e do contexto do grupo, estimula a participação e utiliza linguagem acessível.",
      "deve utilizar linguagem técnica complexa para demonstrar autoridade do profissional.",
      "ignora as experiências prévias das gestantes por serem irrelevantes.",
      "tem como único objetivo o cumprimento de metas quantitativas do serviço.",
    ],
    correta: 1,
    coment: "Gabarito: B. Uma prática educativa eficaz PARTE das necessidades e do CONTEXTO do grupo, ESTIMULA a participação ativa, usa LINGUAGEM ACESSÍVEL e valoriza as experiências dos participantes — construindo conhecimento de forma dialógica.\n\n💡 PRINCÍPIOS DA EDUCAÇÃO EM SAÚDE EFICAZ:\n• Diálogo e troca (não monólogo — A erra).\n• Linguagem clara e acessível, adaptada ao público (não jargão técnico para 'impor autoridade' — C erra).\n• Valorização do saber prévio do grupo (D erra ao ignorá-lo).\n• Foco na autonomia e no cuidado, não em números (E erra ao reduzir a 'metas quantitativas').\n\n⚠️ A pegadinha recorrente idealiza a 'palestra expositiva' como método principal. A educação em saúde moderna é PARTICIPATIVA e problematizadora — o grupo é sujeito ativo. Roda de conversa > palestra vertical.",
  },

];

// ============ MATERIAL DO CURSO ============
const MATERIAL_CURSO = [
  { arq: "Resifriends_Manual_do_Aluno.pdf", titulo: "Manual do Aluno", pag: 24,
    desc: "Como o curso funciona, seu portal e sua biblioteca, o método de estudo, sua rotina semanal, os macetes da banca e a estratégia para o dia da prova." },
];

// ============ AULAS GRAVADAS (exemplo) ============
// videoId = ID do YouTube (não listado). Troque pelos seus vídeos reais.
const AULAS_GRAVADAS = [
  { id: "a1", eixo: "Ética", titulo: "Lei 7.498/86 — atribuições privativas", dur: "48 min", videoId: "dQw4w9WgXcQ", data: "05/07" },
  { id: "a2", eixo: "Segurança", titulo: "As 6 metas internacionais de segurança", dur: "52 min", videoId: "dQw4w9WgXcQ", data: "08/07" },
  { id: "a3", eixo: "Imunização", titulo: "Calendário do PNI e rede de frio", dur: "45 min", videoId: "dQw4w9WgXcQ", data: "12/07" },
];

// ============ STORAGE HELPERS (FIREBASE) ============
// O progresso das alunas é salvo no Firebase Firestore, na nuvem.
// Assim o progresso segue a aluna em qualquer aparelho, e a professora
// enxerga o desempenho de todas de um lugar só.
//
// A conexão usa window.firebase, carregado pelas tags <script> no HTML
// (ver o index.html de publicação). Se o Firebase não estiver disponível
// (ex.: preview no chat), cai numa memória local de reserva (_mem),
// para o portal nunca quebrar.

const CHAVE_COLECAO = "portal"; // documento raiz no Firestore
const _mem = {};

function _db() {
  try {
    if (typeof window !== "undefined" && window.firebase && window.firebase.firestore) {
      return window.firebase.firestore();
    }
  } catch { /* sem firebase */ }
  return null;
}

async function sGet(key) {
  const db = _db();
  if (db) {
    try {
      const snap = await db.collection(CHAVE_COLECAO).doc(key).get();
      if (snap.exists) {
        const d = snap.data();
        return d && "valor" in d ? d.valor : null;
      }
      return null;
    } catch (e) { /* cai no _mem abaixo */ }
  }
  return key in _mem ? _mem[key] : null;
}

async function sSet(key, val) {
  _mem[key] = val;
  const db = _db();
  if (db) {
    try {
      await db.collection(CHAVE_COLECAO).doc(key).set({ valor: val, atualizadoEm: Date.now() });
    } catch (e) { /* mantém no _mem */ }
  }
  return true;
}

// ============ ENGAJAMENTO ============
function hoje() { return new Date().toISOString().slice(0, 10); }

function diasAtras(iso) {
  if (!iso) return null;
  const d = Math.floor((new Date(hoje()) - new Date(iso)) / 86400000);
  return d < 0 ? 0 : d;
}
function rotuloUltimaAtiv(iso) {
  const d = diasAtras(iso);
  if (d === null) return "sem atividade";
  if (d === 0) return "hoje";
  if (d === 1) return "ontem";
  return `há ${d} dias`;
}
// Sequência de dias consecutivos com atividade, terminando hoje ou ontem
function sequencia(atividade) {
  const dias = Object.keys(atividade || {}).sort().reverse();
  if (!dias.length) return 0;
  const d0 = diasAtras(dias[0]);
  if (d0 > 1) return 0; // quebrou a sequência
  let seq = 1;
  for (let i = 1; i < dias.length; i++) {
    const dif = Math.round((new Date(dias[i - 1]) - new Date(dias[i])) / 86400000);
    if (dif === 1) seq++; else break;
  }
  return seq;
}
// Soma de horas do diário nos últimos N dias
function horasPeriodo(diario, dias = 7) {
  const limite = new Date(hoje());
  limite.setDate(limite.getDate() - (dias - 1));
  return Object.entries(diario || {})
    .filter(([d]) => new Date(d) >= limite)
    .reduce((a, [, h]) => a + Number(h || 0), 0);
}
function semanaAtual() {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(hoje());
    d.setDate(d.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
function diaSemana(iso) {
  return ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"][new Date(iso + "T12:00:00").getDay()];
}

// ============ UI HELPERS ============
function Ring({ pct, size = 132, stroke = 11, label, sub }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c - (pct / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#5a3d26" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#g)" strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)" }} />
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.douradoClaro} /><stop offset="100%" stopColor={C.marrom} />
        </linearGradient></defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 800, color: C.creme, lineHeight: 1 }}>{label}</span>
        {sub && <span style={{ fontSize: 10.5, color: C.cinza, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 4 }}>{sub}</span>}
      </div>
    </div>
  );
}
function pesoTag(peso) {
  const map = {
    alto: [C.vermelho, "#fff", "Peso alto"],
    medio: [C.marromClaro, "#fff", "Peso médio"],
    baixo: [C.cinza, "#fff", "Peso baixo"],
    bonus: [C.dourado, C.preto, "★ Bônus"],
  };
  const [bg, fg, txt] = map[peso] || map.baixo;
  return <span style={{ background: bg, color: fg, fontSize: 9.5, fontWeight: 800, padding: "2px 8px", borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase" }}>{txt}</span>;
}
const card = { background: C.cardBg, border: "1px solid #5a3d26", borderRadius: 14, padding: 22 };
const container = { maxWidth: 1080, margin: "0 auto", padding: "0 20px" };
const inputStyle = { background: "#3A2517", border: "1.5px solid #5a3d26", borderRadius: 9, padding: "12px 14px", color: C.creme, fontSize: 15, fontFamily: "Lato, sans-serif", width: "100%", boxSizing: "border-box" };
const btnOuro = { background: `linear-gradient(135deg, ${C.dourado}, ${C.marromClaro})`, color: C.preto, border: "none", borderRadius: 9, padding: "12px 22px", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "Lato, sans-serif" };

// ============ APP PRINCIPAL ============
export default function App() {
  const [sessao, setSessao] = useState(null); // {tipo:'aluno'|'prof', ...}
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Lato:wght@400;700;900&display=swap";
    document.head.appendChild(l);
  }, []);

  const recarregar = useCallback(async () => {
    let lista = await sGet("alunos") || [];
    // Turma 2026 — pré-cadastro das alunas (nome + código + senha individual).
    // Só insere quem ainda não existe; não apaga progresso já salvo.
    let mudou = false;
    for (const t of TURMA_2026) {
      if (!lista.some((a) => a.codigo === t.codigo)) {
        lista = [...lista, { nome: t.nome, codigo: t.codigo, senha: t.senha, criadoEm: Date.now() }];
        mudou = true;
      } else {
        // Garante que a senha esteja atualizada mesmo se a aluna já existia
        lista = lista.map((a) => a.codigo === t.codigo ? { ...a, senha: a.senha || t.senha } : a);
      }
    }
    if (mudou) await sSet("alunos", lista);
    setAlunos(lista);
    setCarregando(false);
  }, []);

  useEffect(() => { recarregar(); }, [recarregar]);

  if (carregando) return <TelaCarregando />;
  if (!sessao) return <TelaLogin alunos={alunos} onEntrar={setSessao} onRecarregar={recarregar} />;
  if (sessao.tipo === "prof") return <PainelProfessor alunos={alunos} onSair={() => setSessao(null)} onRecarregar={recarregar} />;
  return <PortalAluno aluno={sessao.aluno} onSair={() => setSessao(null)} onRecarregar={recarregar} />;
}

function TelaCarregando() {
  return <div style={{ fontFamily: "Lato, sans-serif", background: C.preto, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.dourado }}>
    <div style={{ textAlign: "center" }}>
      <img src={LOGO} alt="Resifriends" style={{ width: 150, height: "auto", margin: "0 auto 14px", display: "block" }} />
      Carregando…
    </div>
  </div>;
}

// ============ LOGIN ============
function TelaLogin({ alunos, onEntrar, onRecarregar }) {
  const [modo, setModo] = useState("aluno");
  const [codigoSel, setCodigoSel] = useState(""); // aluna escolhida na lista
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState(""); // usado no modo professora
  const [erro, setErro] = useState("");

  async function entrarAluno() {
    setErro("");
    if (!codigoSel) { setErro("Escolha o seu nome na lista."); return; }
    if (!senha.trim()) { setErro("Digite a sua senha."); return; }
    // Junta a lista salva com a que já está em memória, para não falhar
    const salvos = await sGet("alunos") || [];
    const todos = [...alunos, ...salvos];
    const a = todos.find((x) => x.codigo === codigoSel);
    if (!a) { setErro("Aluna não encontrada. Fale com a professora."); return; }
    if ((a.senha || "").trim() !== senha.trim()) { setErro("Senha incorreta. Confira com a professora."); return; }
    onEntrar({ tipo: "aluno", aluno: a });
  }
  function entrarProf() {
    setErro("");
    if (codigo.trim().toUpperCase() !== SENHA_PROFESSORA) { setErro("Senha da professora incorreta."); return; }
    onEntrar({ tipo: "prof" });
  }

  return (
    <div style={{ fontFamily: "Lato, sans-serif", background: C.preto, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${C.dourado}, ${C.marrom})` }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <img src={LOGO} alt="Resifriends" style={{ width: 180, height: "auto", display: "block", margin: "0 auto 10px" }} />
            <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".24em", textTransform: "uppercase", marginTop: 3 }}>Missão Aprovação</div>
          </div>

          <div style={card}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["aluno", "Sou aluno"], ["prof", "Sou professora"]].map(([k, v]) => (
                <button key={k} onClick={() => { setModo(k); setErro(""); }} style={{ flex: 1, background: modo === k ? C.dourado : "transparent", color: modo === k ? C.preto : C.cinza, border: `1px solid ${modo === k ? C.dourado : "#5a3d26"}`, borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Lato, sans-serif" }}>{v}</button>
              ))}
            </div>

            {modo === "aluno" ? (
              <>
                <label style={{ fontSize: 12, color: C.cinza, letterSpacing: ".05em", display: "block", marginBottom: 6 }}>SEU NOME</label>
                <select style={{ ...inputStyle, marginBottom: 14, cursor: "pointer" }} value={codigoSel} onChange={(e) => { setCodigoSel(e.target.value); setErro(""); }}>
                  <option value="">Selecione o seu nome…</option>
                  {[...alunos].sort((a, b) => a.nome.localeCompare(b.nome)).map((a) => (
                    <option key={a.codigo} value={a.codigo}>{a.nome}</option>
                  ))}
                </select>
                <label style={{ fontSize: 12, color: C.cinza, letterSpacing: ".05em", display: "block", marginBottom: 6 }}>SUA SENHA</label>
                <input type="password" style={{ ...inputStyle, marginBottom: 14 }} placeholder="Digite a sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} onKeyDown={(e) => e.key === "Enter" && entrarAluno()} />
                <button style={{ ...btnOuro, width: "100%" }} onClick={entrarAluno}>Entrar na minha área</button>
                <p style={{ fontSize: 12, color: C.cinza, textAlign: "center", marginTop: 14, marginBottom: 0, lineHeight: 1.5 }}>
                  Escolha o seu nome e digite a senha que a professora te enviou.<br />Esqueceu a senha? Fale com a coordenação.
                </p>
              </>
            ) : (
              <>
                <label style={{ fontSize: 12, color: C.cinza, letterSpacing: ".05em", display: "block", marginBottom: 6 }}>SENHA DA PROFESSORA</label>
                <input type="password" style={{ ...inputStyle, marginBottom: 14 }} placeholder="Senha administrativa" value={codigo} onChange={(e) => setCodigo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && entrarProf()} />
                <button style={{ ...btnOuro, width: "100%" }} onClick={entrarProf}>Acessar painel</button>
              </>
            )}

            {erro && <div style={{ marginTop: 14, padding: "10px 12px", background: "#321413", border: `1px solid ${C.vermelho}`, borderRadius: 8, color: "#f0a09c", fontSize: 13 }}>{erro}</div>}
          </div>

          <div style={{ textAlign: "center", marginTop: 20, fontFamily: "Playfair Display, serif", fontStyle: "italic", color: C.dourado, fontSize: 13 }}>Planeje. Estude. Execute. Alcance.</div>
        </div>
      </div>
    </div>
  );
}

// ============ PAINEL DO PROFESSOR ============
function PainelProfessor({ alunos, onSair, onRecarregar }) {
  const [aba, setAba] = useState("visao");
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [msg, setMsg] = useState("");
  const [progressos, setProgressos] = useState({});
  const [alunaAberta, setAlunaAberta] = useState(null); // código da aluna com detalhamento aberto

  const carregarProgressos = useCallback(async () => {
    const obj = {};
    for (const a of alunos) obj[a.codigo] = await sGet(`prog_${a.codigo}`) || { respostas: {}, aulasFeitas: {}, diario: {}, atividade: {} };
    setProgressos(obj);
  }, [alunos]);

  useEffect(() => { carregarProgressos(); }, [carregarProgressos]);

  async function cadastrar() {
    setMsg("");
    if (!nome.trim() || !codigo.trim() || !senhaNova.trim()) { setMsg("Preencha nome, código e senha."); return; }
    const cod = codigo.trim().toUpperCase();
    if (alunos.some((a) => a.codigo.toUpperCase() === cod)) { setMsg("Já existe aluna com esse código."); return; }
    if (alunos.length >= 15) { setMsg("Turma cheia (teto de 15)."); return; }
    const novo = { nome: nome.trim(), codigo: cod, senha: senhaNova.trim(), criadoEm: Date.now() };
    const lista = [...alunos, novo];
    await sSet("alunos", lista);
    setNome(""); setCodigo(""); setSenhaNova(""); setMsg(`✓ ${novo.nome} cadastrada (senha: ${novo.senha})`);
    await onRecarregar();
  }
  async function remover(cod) {
    const lista = alunos.filter((a) => a.codigo !== cod);
    await sSet("alunos", lista);
    await onRecarregar();
  }

  // Detalhamento por eixo de uma aluna específica — mostra o avanço
  // em cada módulo (ex.: Fundamentos 50%, Urgência 20%).
  function statsPorEixo(cod) {
    const p = progressos[cod] || { respostas: {}, aulasFeitas: {} };
    return EIXOS.map((e) => {
      const qs = BANCO.filter((q) => q.eixo === e.id);
      const feitas = qs.filter((q) => p.respostas?.[q.id] !== undefined);
      const acertos = feitas.filter((q) => p.respostas[q.id]);
      const aulasFeitas = Object.keys(p.aulasFeitas || {}).filter((k) => k.startsWith(e.id + "_")).length;
      return {
        id: e.id,
        nome: e.nome,
        peso: e.peso,
        qTotal: qs.length,
        qFeitas: feitas.length,
        qAcertos: acertos.length,
        // % de execução: quanto do banco daquele eixo ela já resolveu
        pctFeito: qs.length ? Math.round((feitas.length / qs.length) * 100) : 0,
        // % de acerto entre as que fez
        pctAcerto: feitas.length ? Math.round((acertos.length / feitas.length) * 100) : 0,
        aulasTotal: e.aulas,
        aulasFeitas,
      };
    });
  }

  function statsAluno(cod) {
    const p = progressos[cod] || { respostas: {}, aulasFeitas: {}, diario: {}, atividade: {} };
    const resp = Object.values(p.respostas || {});
    const feitas = resp.length;
    const acertos = resp.filter(Boolean).length;
    const pct = feitas ? Math.round((acertos / feitas) * 100) : 0;
    const aulas = Object.keys(p.aulasFeitas || {}).length;
    // engajamento
    const dias = Object.keys(p.atividade || {}).sort();
    const ultima = dias.length ? dias[dias.length - 1] : null;
    const inativoHa = diasAtras(ultima);
    const seq = sequencia(p.atividade);
    const hSemana = horasPeriodo(p.diario, 7);
    const hMes = horasPeriodo(p.diario, 30);
    return { feitas, acertos, pct, aulas, ultima, inativoHa, seq, hSemana, hMes };
  }

  const totalAulas = EIXOS.reduce((s, e) => s + e.aulas, 0);
  const ranking = [...alunos].map((a) => ({ ...a, ...statsAluno(a.codigo) })).sort((x, y) => y.pct - x.pct);

  return (
    <div style={{ fontFamily: "Lato, sans-serif", background: C.preto, minHeight: "100vh", color: C.creme }}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${C.dourado}, ${C.marrom})` }} />
      <header style={{ ...container, paddingTop: 22, paddingBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO} alt="Resifriends" style={{ height: 46, width: "auto" }} />
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: 19, fontWeight: 800 }}>Painel da Professora</div>
            <div style={{ fontSize: 10.5, color: C.cinza, letterSpacing: ".2em", textTransform: "uppercase" }}>Resifriends · Turma Premium</div>
          </div>
        </div>
        <button onClick={onSair} style={{ background: "transparent", color: C.cinza, border: "1px solid #5a3d26", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "Lato, sans-serif" }}>Sair</button>
      </header>

      <nav style={{ borderBottom: "1px solid #5a3d26", marginBottom: 26 }}>
        <div style={{ ...container, display: "flex", gap: 26 }}>
          {[["visao", "Visão da turma"], ["alunos", "Gerenciar alunos"]].map(([k, v]) => (
            <button key={k} onClick={() => setAba(k)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 2px", fontSize: 14, fontWeight: 700, color: aba === k ? C.douradoClaro : C.cinza, borderBottom: aba === k ? `2px solid ${C.dourado}` : "2px solid transparent", fontFamily: "Lato, sans-serif" }}>{v}</button>
          ))}
        </div>
      </nav>

      <main style={{ ...container, paddingBottom: 60 }}>
        {aba === "visao" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 24 }}>
              {[
                ["Alunos ativos", alunos.length, "de 12 vagas"],
                ["Questões resolvidas", ranking.reduce((s, a) => s + a.feitas, 0), "pela turma toda"],
                ["Média da turma", ranking.length ? Math.round(ranking.reduce((s, a) => s + a.pct, 0) / ranking.length) + "%" : "—", "de aproveitamento"],
                ["Horas nesta semana", ranking.reduce((s, a) => s + a.hSemana, 0).toFixed(1).replace(".0", "") + "h", "declaradas pela turma"],
                ["Sumiram (5+ dias)", ranking.filter((a) => a.inativoHa !== null && a.inativoHa >= 5).length + ranking.filter((a) => a.inativoHa === null).length, "precisam de contato"],
              ].map(([t, v, s]) => (
                <div key={t} style={card}>
                  <div style={{ fontSize: 11, color: C.cinza, letterSpacing: ".1em", textTransform: "uppercase" }}>{t}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 27, fontWeight: 800, color: C.douradoClaro, margin: "6px 0 2px" }}>{v}</div>
                  <div style={{ fontSize: 11.5, color: C.cinza }}>{s}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Ranking e acompanhamento</h2>
            <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 18px" }}>Cada aluno, com nome e desempenho em tempo real. <b style={{ color: C.douradoClaro }}>Toque no nome</b> para ver o detalhamento por módulo.</p>

            {ranking.length === 0 ? (
              <div style={{ ...card, textAlign: "center", color: C.cinza }}>
                Nenhum aluno cadastrado ainda. Vá em <b style={{ color: C.dourado }}>Gerenciar alunos</b> para começar.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {ranking.map((a, i) => (
                  <div key={a.codigo} style={{ ...card, padding: 0, overflow: "hidden" }}>
                  <div
                    onClick={() => setAlunaAberta(alunaAberta === a.codigo ? null : a.codigo)}
                    style={{ padding: 15, display: "flex", alignItems: "center", gap: 15, flexWrap: "wrap", cursor: "pointer" }}
                  >
                    <div style={{ width: 30, textAlign: "center", fontFamily: "Playfair Display, serif", fontSize: 19, fontWeight: 800, color: i === 0 ? C.dourado : C.cinza }}>{i + 1}º</div>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: C.preto, fontSize: 14 }}>
                      {a.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div style={{ flex: "1 1 200px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{a.nome}</span>
                        {a.inativoHa !== null && a.inativoHa >= 5 && (
                          <span style={{ background: C.vermelho, color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 7px",
                            borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase" }}>sumiu</span>
                        )}
                        {a.seq >= 5 && (
                          <span style={{ background: C.verde, color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 7px",
                            borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase" }}>🔥 {a.seq} dias</span>
                        )}
                      </div>
                      <div style={{ fontSize: 11.5, color: C.cinza, marginTop: 2 }}>{a.codigo} · {a.feitas} questões · {a.aulas}/{totalAulas} aulas</div>
                      <div style={{ fontSize: 11.5, marginTop: 3, display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <span style={{ color: a.inativoHa === null ? C.cinza : a.inativoHa >= 5 ? "#f0a09c" : a.inativoHa <= 1 ? "#7fe0a6" : C.cinza }}>
                          Ativa {rotuloUltimaAtiv(a.ultima)}
                        </span>
                        <span style={{ color: C.douradoClaro }}>
                          {a.hSemana ? `${a.hSemana.toFixed(1).replace(".0", "")}h esta semana` : "sem horas registradas"}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 20, color: a.pct >= 80 ? C.verde : a.pct >= 65 ? C.dourado : a.feitas ? C.vermelho : C.cinza }}>
                        {a.feitas ? a.pct + "%" : "—"}
                      </div>
                      <div style={{ fontSize: 10.5, color: C.cinza }}>{a.feitas ? `${a.acertos} acertos` : "sem atividade"}</div>
                    </div>
                    <div style={{ fontSize: 15, color: C.dourado, width: 18, textAlign: "center",
                      transform: alunaAberta === a.codigo ? "rotate(90deg)" : "none", transition: "transform .18s" }}>›</div>
                  </div>

                  {/* ── Detalhamento por eixo (expansível) ── */}
                  {alunaAberta === a.codigo && (
                    <div style={{ borderTop: `1px solid ${C.marrom}`, background: C.preto2, padding: "16px 18px 18px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700 }}>
                          Execução por módulo
                        </div>
                        <div style={{ fontSize: 11.5, color: C.cinza }}>
                          Barra = quanto do banco já resolveu · % ao lado = aproveitamento
                        </div>
                      </div>

                      {statsPorEixo(a.codigo).map((e) => {
                        const corAcerto = e.qFeitas === 0 ? C.cinza : e.pctAcerto >= 80 ? C.verde : e.pctAcerto >= 65 ? C.dourado : C.vermelho;
                        return (
                          <div key={e.id} style={{ marginBottom: 11 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.creme }}>
                                {e.nome}
                                {e.peso === "alto" && <span style={{ marginLeft: 7, fontSize: 8.5, fontWeight: 800, background: C.vermelho, color: "#fff", padding: "1px 5px", borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase" }}>peso alto</span>}
                              </span>
                              <span style={{ fontSize: 11.5, color: C.cinza, whiteSpace: "nowrap" }}>
                                {e.qFeitas}/{e.qTotal} questões
                                {e.aulasTotal > 0 && ` · ${e.aulasFeitas}/${e.aulasTotal} aulas`}
                                {"  "}
                                <b style={{ color: corAcerto }}>{e.qFeitas ? `${e.pctAcerto}% acerto` : "—"}</b>
                              </span>
                            </div>
                            <div style={{ height: 8, background: C.marrom, borderRadius: 4, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${e.pctFeito}%`,
                                background: e.pctFeito === 0 ? "transparent" : `linear-gradient(90deg, ${C.dourado}, ${C.douradoClaro})`,
                                borderRadius: 4, transition: "width .3s" }} />
                            </div>
                            <div style={{ fontSize: 10.5, color: C.cinza, marginTop: 2 }}>{e.pctFeito}% do módulo concluído</div>
                          </div>
                        );
                      })}

                      {/* Resumo automático para orientar a conversa com a aluna */}
                      {(() => {
                        const eixos = statsPorEixo(a.codigo);
                        const comQuestoes = eixos.filter((e) => e.qFeitas > 0);
                        const naoIniciados = eixos.filter((e) => e.qFeitas === 0 && e.peso === "alto");
                        const fraco = comQuestoes.length ? comQuestoes.reduce((m, e) => (e.pctAcerto < m.pctAcerto ? e : m)) : null;
                        const forte = comQuestoes.length ? comQuestoes.reduce((m, e) => (e.pctAcerto > m.pctAcerto ? e : m)) : null;
                        if (!comQuestoes.length && !naoIniciados.length) return null;
                        return (
                          <div style={{ marginTop: 14, padding: "11px 13px", background: C.preto, border: `1px solid ${C.marrom}`, borderRadius: 8 }}>
                            <div style={{ fontSize: 10, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                              Leitura rápida
                            </div>
                            <div style={{ fontSize: 12, color: C.creme, lineHeight: 1.6 }}>
                              {forte && <div>• Melhor desempenho: <b style={{ color: C.verde }}>{forte.nome}</b> ({forte.pctAcerto}% de acerto)</div>}
                              {fraco && comQuestoes.length > 1 && <div>• Precisa de atenção: <b style={{ color: "#f0a09c" }}>{fraco.nome}</b> ({fraco.pctAcerto}% de acerto)</div>}
                              {naoIniciados.length > 0 && (
                                <div>• Ainda não iniciou (peso alto): <b style={{ color: C.douradoClaro }}>{naoIniciados.map((e) => e.nome).join(", ")}</b></div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {aba === "alunos" && (
          <div>
            <div style={{ ...card, marginBottom: 22 }}>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 800, margin: "0 0 14px" }}>Cadastrar novo aluno</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end", flexWrap: "wrap" }}>
                <div>
                  <label style={{ fontSize: 12, color: C.cinza, display: "block", marginBottom: 6 }}>Nome da aluna</label>
                  <input style={inputStyle} placeholder="Ex.: Maria da Silva" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: C.cinza, display: "block", marginBottom: 6 }}>Código de acesso</label>
                  <input style={{ ...inputStyle, textTransform: "uppercase" }} placeholder="Ex.: MARIA-SILVA" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: C.cinza, display: "block", marginBottom: 6 }}>Senha da aluna</label>
                  <input style={inputStyle} placeholder="Ex.: Maria1234" value={senhaNova} onChange={(e) => setSenhaNova(e.target.value)} />
                </div>
                <button style={btnOuro} onClick={cadastrar}>+ Cadastrar</button>
              </div>
              {msg && <div style={{ marginTop: 14, padding: "10px 12px", background: msg.startsWith("✓") ? "#12321f" : "#321413", border: `1px solid ${msg.startsWith("✓") ? C.verde : C.vermelho}`, borderRadius: 8, color: msg.startsWith("✓") ? "#7fe0a6" : "#f0a09c", fontSize: 13 }}>{msg}</div>}
              <p style={{ fontSize: 12, color: C.cinza, marginTop: 12, marginBottom: 0 }}>A aluna entra escolhendo o nome na lista e digitando a senha. Turma: {alunos.length}/12 (teto 15).</p>
            </div>

            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700, margin: "0 0 12px" }}>Alunos cadastrados</h3>
            {alunos.length === 0 ? (
              <div style={{ ...card, textAlign: "center", color: C.cinza }}>Nenhum aluno ainda. Cadastre o primeiro acima.</div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {alunos.map((a) => (
                  <div key={a.codigo} style={{ ...card, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: C.preto, fontSize: 13 }}>
                        {a.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{a.nome}</div>
                        <div style={{ fontSize: 12, color: C.cinza, letterSpacing: ".03em" }}>Senha: <span style={{ color: C.dourado, fontWeight: 700 }}>{a.senha || "—"}</span></div>
                      </div>
                    </div>
                    <button onClick={() => remover(a.codigo)} style={{ background: "transparent", border: `1px solid ${C.vermelho}`, color: "#f0a09c", borderRadius: 7, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "Lato, sans-serif" }}>Remover</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ============ PORTAL DO ALUNO ============
function PortalAluno({ aluno, onSair, onRecarregar }) {
  const [aba, setAba] = useState("inicio");
  const [prog, setProg] = useState({ respostas: {}, aulasFeitas: {}, diario: {}, atividade: {} });
  const [qIdx, setQIdx] = useState(0);
  const [escolha, setEscolha] = useState(null);
  const [filtroEixo, setFiltroEixo] = useState("todos");
  const [dIdx, setDIdx] = useState(0);
  const [dRevelar, setDRevelar] = useState(false);
  const [dRascunho, setDRascunho] = useState("");
  const chave = `prog_${aluno.codigo}`;

  const carregar = useCallback(async () => {
    const p = await sGet(chave) || { respostas: {}, aulasFeitas: {}, diario: {}, atividade: {} };
    setProg({ diario: {}, atividade: {}, ...p });
  }, [chave]);
  useEffect(() => { carregar(); }, [carregar]);

  async function salvar(novo, marcaAtividade = true) {
    const n = marcaAtividade
      ? { ...novo, atividade: { ...(novo.atividade || {}), [hoje()]: true } }
      : novo;
    setProg(n); await sSet(chave, n);
  }

  const bancoFiltrado = useMemo(() => filtroEixo === "todos" ? BANCO : BANCO.filter((q) => q.eixo === filtroEixo), [filtroEixo]);
  const qAtual = bancoFiltrado[qIdx] || bancoFiltrado[0];
  const jaResp = qAtual && prog.respostas[qAtual.id] !== undefined;

  async function responder(i) {
    if (jaResp || !qAtual) return;
    setEscolha(i);
    const novo = { ...prog, respostas: { ...prog.respostas, [qAtual.id]: i === qAtual.correta } };
    await salvar(novo);
  }
  function proxima() { setEscolha(null); setQIdx((i) => (i + 1) % bancoFiltrado.length); }

  async function registrarHoras(dia, horas) {
    const h = Number(horas);
    const novoDiario = { ...(prog.diario || {}) };
    if (!h || h <= 0) delete novoDiario[dia];
    else novoDiario[dia] = Math.min(h, 24);
    await salvar({ ...prog, diario: novoDiario });
  }

  async function marcarAula(eixoId, n) {
    const key = `${eixoId}_${n}`;
    const novo = { ...prog, aulasFeitas: { ...prog.aulasFeitas, [key]: true } };
    await salvar(novo);
  }

  // métricas
  const resp = Object.values(prog.respostas);
  const totFeitas = resp.length;
  const totAcertos = resp.filter(Boolean).length;
  const pctGeral = totFeitas ? Math.round((totAcertos / totFeitas) * 100) : 0;
  const totalAulas = EIXOS.reduce((s, e) => s + e.aulas, 0);
  const aulasFeitas = Object.keys(prog.aulasFeitas).length;
  const pctAulas = Math.round((aulasFeitas / totalAulas) * 100);

  function statsEixo(eixoId) {
    const qs = BANCO.filter((q) => q.eixo === eixoId);
    const feitas = qs.filter((q) => prog.respostas[q.id] !== undefined);
    const acertos = feitas.filter((q) => prog.respostas[q.id]);
    const aulasE = EIXOS.find((e) => e.id === eixoId).aulas;
    const feitasAulas = Object.keys(prog.aulasFeitas).filter((k) => k.startsWith(eixoId + "_")).length;
    return { qTotal: qs.length, qFeitas: feitas.length, qAcertos: acertos.length,
      pct: feitas.length ? Math.round((acertos.length / feitas.length) * 100) : 0, aulasE, feitasAulas };
  }

  const abaBtn = (a) => ({ background: "none", border: "none", cursor: "pointer", padding: "8px 2px", fontSize: 14, fontWeight: 700, color: aba === a ? C.douradoClaro : C.cinza, borderBottom: aba === a ? `2px solid ${C.dourado}` : "2px solid transparent", fontFamily: "Lato, sans-serif" });
  const primeiroNome = aluno.nome.split(" ")[0];
  const iniciais = aluno.nome.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div style={{ fontFamily: "Lato, sans-serif", background: C.preto, minHeight: "100vh", color: C.creme }}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${C.dourado}, ${C.marrom})` }} />
      <header style={{ ...container, paddingTop: 22, paddingBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO} alt="Resifriends" style={{ height: 50, width: "auto" }} />
          <div>
            <div style={{ fontSize: 10.5, color: C.cinza, letterSpacing: ".22em", textTransform: "uppercase" }}>Missão Aprovação</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Olá, {primeiroNome}</div>
            <div style={{ fontSize: 11, color: C.cinza }}>Turma Premium · 2026</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: C.preto, fontSize: 15 }}>{iniciais}</div>
          <button onClick={onSair} style={{ background: "transparent", color: C.cinza, border: "1px solid #5a3d26", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "Lato, sans-serif" }}>Sair</button>
        </div>
      </header>

      <nav style={{ borderBottom: "1px solid #5a3d26", marginBottom: 26 }}>
        <div style={{ ...container, display: "flex", gap: 24, overflowX: "auto" }}>
          {[["inicio", "Início"], ["aulas", "Aulas Gravadas"], ["modulos", "Módulos"], ["biblioteca", "Biblioteca"], ["questoes", "Questões"], ["discursivas", "Discursivas"], ["diario", "Meu Diário"], ["desempenho", "Desempenho"]].map(([k, v]) => (
            <button key={k} style={abaBtn(k)} onClick={() => setAba(k)}>{v}</button>
          ))}
        </div>
      </nav>

      <main style={{ ...container, paddingBottom: 60 }}>
        {aba === "inicio" && (
          <div>
            {/* PROTAGONISMO: nome grandão do aluno como abertura */}
            <div style={{ textAlign: "center", padding: "18px 0 30px" }}>
              <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 16 }}>Preparado exclusivamente para você,</div>
              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(38px, 8vw, 68px)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.05, color: C.creme }}>{aluno.nome}</h1>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{ width: 44, height: 1, background: `linear-gradient(90deg, transparent, ${C.dourado})` }} />
                <div style={{ width: 5, height: 5, background: C.dourado, transform: "rotate(45deg)" }} />
                <div style={{ width: 44, height: 1, background: `linear-gradient(90deg, ${C.dourado}, transparent)` }} />
              </div>
            </div>

            {/* faixa de progresso com anel */}
            <div style={{ ...card, background: `linear-gradient(120deg, ${C.preto2} 60%, ${C.marrom}55)`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 22 }}>
              <div style={{ flex: "1 1 340px" }}>
                <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 8 }}>Sua jornada</div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 27, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.15 }}>
                  {aulasFeitas === 0 ? <>Bem-vinda, {primeiroNome}. <span style={{ color: C.douradoClaro }}>Vamos começar?</span></> : <>Você já venceu <span style={{ color: C.douradoClaro }}>{pctAulas}%</span> do caminho</>}
                </h2>
                <p style={{ color: "#cfc7bd", fontSize: 14.5, lineHeight: 1.55, margin: 0, maxWidth: 460 }}>
                  {aulasFeitas === 0 ? "Sua preparação começa agora. Comece pelos módulos de peso alto e resolva suas primeiras questões." : "Continue firme. Cada aula e cada questão te aproximam da aprovação."}
                </p>
              </div>
              <Ring pct={pctAulas} label={`${pctAulas}%`} sub="Concluído" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 14, marginBottom: 22 }}>
              {[["Aproveitamento", totFeitas ? `${pctGeral}%` : "—", totFeitas ? `${totAcertos} de ${totFeitas}` : "resolva questões"], ["Aulas", `${aulasFeitas}/${totalAulas}`, "concluídas"], ["Questões", totFeitas, "resolvidas"]].map(([t, v, s]) => (
                <div key={t} style={card}>
                  <div style={{ fontSize: 11, color: C.cinza, letterSpacing: ".1em", textTransform: "uppercase" }}>{t}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 800, color: C.douradoClaro, margin: "6px 0 2px" }}>{v}</div>
                  <div style={{ fontSize: 11.5, color: C.cinza }}>{s}</div>
                </div>
              ))}
            </div>

            {/* MENSAGEM PESSOAL DA PROFESSORA */}
            <div style={{ ...card, background: `linear-gradient(135deg, ${C.cardBg}, ${C.preto2})`, position: "relative", padding: "28px 30px", marginBottom: 22 }}>
              <div style={{ position: "absolute", top: 14, left: 20, fontFamily: "Playfair Display, serif", fontSize: 64, color: `${C.marrom}`, lineHeight: 1, opacity: 0.6 }}>"</div>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 18.5, lineHeight: 1.6, color: C.creme, margin: "0 0 16px", position: "relative", paddingLeft: 18 }}>
                {primeiroNome}, eu escolhi trabalhar com pouquíssimos alunos por um motivo: quero acompanhar cada passo da sua caminhada. Aqui você não é um número. Você é a próxima aprovação.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 18 }}>
                <div style={{ width: 26, height: 1, background: C.dourado }} />
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: C.dourado }}>Profa. Fátima Barbosa</span>
              </div>
            </div>

            {/* atalho do Manual — some depois que a aluna já engajou */}
            {aulasFeitas < 3 && (
              <a href="Resifriends_Manual_do_Aluno.pdf" target="_blank" rel="noreferrer"
                style={{ ...card, display: "flex", alignItems: "center", gap: 14, marginBottom: 22,
                  textDecoration: "none", border: `1px solid ${C.dourado}66`, transition: "all .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.dourado; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${C.dourado}66`; }}>
                <div style={{ width: 38, height: 48, borderRadius: 3, background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, color: C.preto }}>▤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 3 }}>Comece por aqui</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700, color: C.creme }}>Manual do Aluno</div>
                  <div style={{ fontSize: 12, color: C.cinza, marginTop: 2 }}>Como o curso funciona, o método e sua rotina · 24 páginas</div>
                </div>
                <span style={{ color: C.douradoClaro, fontSize: 13, flexShrink: 0 }}>abrir ↗</span>
              </a>
            )}

            <div style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 5 }}>Sugestão de hoje</div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700 }}>Resolva 5 questões dos eixos de peso alto</div>
                <div style={{ fontSize: 12.5, color: C.cinza, marginTop: 3 }}>É o hábito que mais aproxima da aprovação</div>
              </div>
              <button onClick={() => setAba("questoes")} style={btnOuro}>Ir para questões →</button>
            </div>
          </div>
        )}

        {aba === "aulas" && (
          <AulasGravadas nomeAluno={aluno.nome} />
        )}

        {aba === "biblioteca" && (
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Biblioteca de Estudo</h2>
            <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 6px" }}>
              Material autoral da turma, conferido nas fontes oficiais. Cada e-book traz teoria, o raciocínio clínico por trás dela, os bizus e as pegadinhas da banca.
            </p>
            <p style={{ color: C.douradoClaro, fontSize: 12.5, margin: "0 0 22px" }}>
              {(() => { const t = EIXOS.flatMap((e) => e.ebooks || []); return `${t.length} e-books · ${t.reduce((a, b) => a + b.pag, 0)} páginas`; })()}
            </p>

            {/* Material do curso — sempre no topo */}
            <div style={{ ...card, border: `1px solid ${C.dourado}66`, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700 }}>Material do curso</span>
                <span style={{ background: C.dourado, color: C.preto, fontSize: 9.5, fontWeight: 800, padding: "2px 8px",
                  borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase" }}>Leia primeiro</span>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {MATERIAL_CURSO.map((m) => (
                  <a key={m.arq} href={m.arq} target="_blank" rel="noreferrer"
                    style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#3A2517",
                      border: `1px solid ${C.marrom}`, borderRadius: 8, padding: "12px 14px",
                      textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={(ev) => { ev.currentTarget.style.borderColor = C.dourado; }}
                    onMouseLeave={(ev) => { ev.currentTarget.style.borderColor = C.marrom; }}>
                    <div style={{ width: 34, height: 44, borderRadius: 3, background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, color: C.preto }}>▤</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: 15, fontWeight: 700, color: C.creme }}>{m.titulo}</div>
                      <div style={{ fontSize: 11.5, color: C.cinza, lineHeight: 1.45, marginTop: 3 }}>{m.desc}</div>
                      <div style={{ fontSize: 10.5, color: C.douradoClaro, marginTop: 4, letterSpacing: ".04em" }}>{m.pag} páginas · PDF · abrir ↗</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {EIXOS.filter((e) => e.ebooks && e.ebooks.length).map((e) => (
                <div key={e.id} style={{ ...card, border: e.bonus ? `1px solid ${C.dourado}66` : card.border }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700 }}>{e.nome}</span>
                    {pesoTag(e.peso)}
                  </div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {e.ebooks.map((eb) => (
                      <a key={eb.arq} href={eb.arq} target="_blank" rel="noreferrer"
                        style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#3A2517",
                          border: `1px solid ${C.marrom}`, borderRadius: 8, padding: "12px 14px",
                          textDecoration: "none", transition: "all .2s" }}
                        onMouseEnter={(ev) => { ev.currentTarget.style.borderColor = C.dourado; }}
                        onMouseLeave={(ev) => { ev.currentTarget.style.borderColor = C.marrom; }}>
                        <div style={{ width: 34, height: 44, borderRadius: 3, background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, color: C.preto }}>▤</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "Playfair Display, serif", fontSize: 15, fontWeight: 700, color: C.creme }}>{eb.titulo}</div>
                          <div style={{ fontSize: 11.5, color: C.cinza, lineHeight: 1.45, marginTop: 3 }}>{eb.desc}</div>
                          <div style={{ fontSize: 10.5, color: C.douradoClaro, marginTop: 4, letterSpacing: ".04em" }}>{eb.pag} páginas · PDF · abrir ↗</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...card, marginTop: 18, background: `linear-gradient(135deg, ${C.cardBg}, ${C.preto2})` }}>
              <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 6 }}>Como usar</div>
              <div style={{ fontSize: 13, color: "#cfc7bd", lineHeight: 1.55 }}>
                Leia o e-book <strong style={{ color: C.creme }}>antes</strong> da aula ao vivo. Na aula, a gente aprofunda e ataca as questões.
                Depois, volte à síntese final do e-book — ela foi feita para ser sua revisão de véspera.
              </div>
            </div>
          </div>
        )}

        {aba === "modulos" && (
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Seus módulos</h2>
            <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 22px" }}>Organizados por peso na prova. Comece pelos de peso alto.</p>
            <div style={{ display: "grid", gap: 14 }}>
              {EIXOS.map((e) => {
                const st = statsEixo(e.id);
                const pct = e.aulas ? Math.round((st.feitasAulas / e.aulas) * 100) : 0;
                return (
                  <div key={e.id} style={{ ...card, border: e.bonus ? `1px solid ${C.dourado}66` : card.border }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700 }}>{e.nome}</span>
                      {pesoTag(e.peso)}
                      <span style={{ marginLeft: "auto", fontSize: 12, color: C.cinza }}>
                        {e.bonus ? "questões comentadas" : `${st.feitasAulas}/${e.aulas} aulas`}
                      </span>
                    </div>

                    {/* sub-eixos */}
                    {e.subs && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                        {e.subs.map((s) => (
                          <span key={s} style={{ fontSize: 11.5, color: C.cinza, background: "#3A2517", border: "1px solid #5a3d26", borderRadius: 20, padding: "3px 10px" }}>{s}</span>
                        ))}
                      </div>
                    )}

                    {/* ebooks do eixo */}
                    {e.ebooks && e.ebooks.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10.5, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, marginBottom: 8 }}>
                          {e.ebooks.length === 1 ? "E-book deste módulo" : `E-books deste módulo (${e.ebooks.length})`}
                        </div>
                        <div style={{ display: "grid", gap: 8 }}>
                          {e.ebooks.map((eb) => (
                            <a key={eb.arq} href={eb.arq} target="_blank" rel="noreferrer"
                              style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#3A2517",
                                border: `1px solid ${C.marrom}`, borderRadius: 8, padding: "11px 13px",
                                textDecoration: "none", transition: "all .2s" }}
                              onMouseEnter={(ev) => { ev.currentTarget.style.borderColor = C.dourado; }}
                              onMouseLeave={(ev) => { ev.currentTarget.style.borderColor = C.marrom; }}>
                              <div style={{ width: 32, height: 40, borderRadius: 3, background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`,
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                fontSize: 15, color: C.preto }}>▤</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 14.5, fontWeight: 700, color: C.creme }}>
                                  {eb.titulo}
                                </div>
                                <div style={{ fontSize: 11.5, color: C.cinza, lineHeight: 1.45, marginTop: 3 }}>{eb.desc}</div>
                                <div style={{ fontSize: 10.5, color: C.douradoClaro, marginTop: 4, letterSpacing: ".04em" }}>
                                  {eb.pag} páginas · PDF · abrir ↗
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {e.bonus ? (
                      <div style={{ fontSize: 12.5, color: C.douradoClaro, lineHeight: 1.5 }}>
                        Conteúdo bônus da turma: sem aula ao vivo, mas com questões comentadas para você não deixar nada de fora.
                      </div>
                    ) : (
                      <>
                        <div style={{ height: 8, background: "#5a3d26", borderRadius: 5, overflow: "hidden", marginBottom: 12 }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.dourado}, ${C.douradoClaro})`, transition: "width 1s ease" }} />
                        </div>
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                          {Array.from({ length: e.aulas }).map((_, idx) => {
                            const n = idx + 1;
                            const feita = prog.aulasFeitas[`${e.id}_${n}`];
                            return (
                              <button key={n} onClick={() => marcarAula(e.id, n)} title={feita ? "Aula concluída" : "Marcar como assistida"}
                                style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${feita ? C.verde : "#5a3d26"}`, background: feita ? "#153d2a" : "#3A2517", color: feita ? "#7fe0a6" : C.cinza, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "Lato, sans-serif" }}>
                                {feita ? "✓" : n}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {aba === "questoes" && qAtual && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
              <div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Banco de Questões</h2>
                <p style={{ color: C.cinza, fontSize: 13.5, margin: 0 }}>Responda e veja o comentário na hora. Seu progresso é salvo automaticamente.</p>
              </div>
              <div style={{ textAlign: "right", fontSize: 12.5, color: C.cinza }}>
                <div>Resolvidas: <b style={{ color: C.creme }}>{totFeitas}</b></div>
                <div>Acertos: <b style={{ color: C.verde }}>{totAcertos}</b> · Erros: <b style={{ color: C.vermelho }}>{totFeitas - totAcertos}</b></div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {[["todos", "Todos"], ...EIXOS.map((e) => [e.id, e.curto || e.nome])].map(([k, v]) => (
                <button key={k} onClick={() => { setFiltroEixo(k); setQIdx(0); setEscolha(null); }} style={{ background: filtroEixo === k ? C.dourado : "transparent", color: filtroEixo === k ? C.preto : C.cinza, border: `1px solid ${filtroEixo === k ? C.dourado : "#5a3d26"}`, borderRadius: 20, padding: "6px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "Lato, sans-serif" }}>{v}</button>
              ))}
            </div>

            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: C.dourado, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>{qAtual.sub || qAtual.tema}</span>
                <span style={{ fontSize: 12, color: C.cinza }}>Questão {qIdx + 1} de {bancoFiltrado.length}</span>
              </div>
              <p style={{ fontSize: 16.5, lineHeight: 1.5, fontWeight: 700, margin: "0 0 18px", color: C.creme }}>{qAtual.enunciado}</p>
              <div style={{ display: "grid", gap: 10 }}>
                {qAtual.alts.map((a, i) => {
                  const letra = String.fromCharCode(65 + i);
                  let bg = "#3A2517", bd = "#5a3d26", cor = C.creme;
                  const escolhaFeita = prog.respostas[qAtual.id] !== undefined ? (prog.respostas[qAtual.id] ? qAtual.correta : escolha) : escolha;
                  if (jaResp) {
                    if (i === qAtual.correta) { bg = "#153d2a"; bd = C.verde; cor = "#c8f0d8"; }
                    else if (i === escolha) { bg = "#3d1817"; bd = C.vermelho; cor = "#f0cfcc"; }
                  }
                  return (
                    <button key={i} onClick={() => responder(i)} disabled={jaResp} style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left", background: bg, border: `1.5px solid ${bd}`, borderRadius: 10, padding: "13px 15px", cursor: jaResp ? "default" : "pointer", color: cor, fontSize: 14.5, lineHeight: 1.45, fontFamily: "Lato, sans-serif", transition: "all .2s" }}>
                      <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, color: jaResp && i === qAtual.correta ? C.verde : C.dourado }}>{letra}</span>
                      <span>{a}</span>
                    </button>
                  );
                })}
              </div>
              {jaResp && (
                <div style={{ marginTop: 18, padding: "15px 16px", background: prog.respostas[qAtual.id] ? "#12321f" : "#321413", border: `1px solid ${prog.respostas[qAtual.id] ? C.verde : C.vermelho}`, borderRadius: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 6, color: prog.respostas[qAtual.id] ? "#7fe0a6" : "#f0a09c", letterSpacing: ".04em", textTransform: "uppercase" }}>
                    {prog.respostas[qAtual.id] ? "✓ Você acertou!" : "✗ Resposta incorreta"}
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "#e8e0d6" }}><b style={{ color: C.douradoClaro }}>Comentário:</b> {qAtual.coment}</div>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
                <button onClick={proxima} disabled={!jaResp} style={{ ...btnOuro, background: jaResp ? btnOuro.background : "#5a3d26", color: jaResp ? C.preto : C.cinza, cursor: jaResp ? "pointer" : "default" }}>Próxima questão →</button>
              </div>
            </div>
          </div>
        )}

        {aba === "discursivas" && (() => {
          const d = DISCURSIVAS[dIdx];
          return (
            <div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Questões Discursivas</h2>
              <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 6px", lineHeight: 1.5 }}>
                Aqui não se marca alternativa — <strong style={{ color: C.creme }}>se explica o porquê</strong>. É o raciocínio clínico que sustenta o acerto na objetiva.
              </p>
              <p style={{ color: C.douradoClaro, fontSize: 12.5, margin: "0 0 22px" }}>
                Escreva sua resposta ANTES de abrir o espelho. Sem isso, o exercício não funciona.
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: C.dourado, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>{d.sub}</span>
                  <span style={{ fontSize: 11.5, color: C.cinza }}>{d.tempoEstimado} · cerca de {d.linhas} linhas</span>
                </div>
                <span style={{ fontSize: 12, color: C.cinza }}>Discursiva {dIdx + 1} de {DISCURSIVAS.length}</span>
              </div>

              <div style={{ ...card, marginBottom: 16 }}>
                <div style={{ fontSize: 15.5, lineHeight: 1.65, color: C.creme, whiteSpace: "pre-line" }}>{d.enunciado}</div>
              </div>

              <div style={{ ...card, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 10 }}>Sua resposta</div>
                <textarea value={dRascunho} onChange={(e) => setDRascunho(e.target.value)}
                  placeholder="Escreva aqui antes de abrir o espelho..."
                  style={{ width: "100%", minHeight: 160, background: "#3A2517", border: "1px solid #5a3d26", borderRadius: 8,
                    padding: "12px 14px", color: C.creme, fontSize: 14.5, fontFamily: "Lato, sans-serif", lineHeight: 1.6,
                    resize: "vertical", boxSizing: "border-box" }} />
                <div style={{ fontSize: 11, color: C.cinza, marginTop: 6 }}>
                  {dRascunho.trim() ? dRascunho.trim().split(/\s+/).length + " palavras" : "rascunho nao e salvo - copie se quiser guardar"}
                </div>
              </div>

              {!dRevelar ? (
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <button onClick={() => setDRevelar(true)} style={btnOuro}>Abrir roteiro e espelho</button>
                  <div style={{ fontSize: 11.5, color: C.cinza, marginTop: 10 }}>Escreveu? Entao pode abrir.</div>
                </div>
              ) : (
                <>
                  <div style={{ ...card, marginBottom: 16, border: "1px solid " + C.marrom }}>
                    <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 10 }}>
                      Roteiro - o que sua resposta precisa conter
                    </div>
                    <div style={{ display: "grid", gap: 7 }}>
                      {d.roteiro.map((r, i) => (
                        <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13.5, color: "#cfc7bd", lineHeight: 1.5 }}>
                          <span style={{ color: C.dourado, flexShrink: 0 }}>&#9670;</span><span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...card, marginBottom: 16, background: "linear-gradient(135deg, " + C.cardBg + ", " + C.preto2 + ")" }}>
                    <div style={{ fontSize: 11, color: C.verde, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 10, fontWeight: 800 }}>
                      Espelho comentado
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: "#e8e0d6", whiteSpace: "pre-line" }}>{d.espelho}</div>
                  </div>

                  <div style={{ ...card, marginBottom: 16, border: "1px solid " + C.vermelho + "66", background: "#241a19" }}>
                    <div style={{ fontSize: 11, color: "#f0a09c", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 10, fontWeight: 800 }}>
                      Como a banca arma a pegadinha
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: "#e8e0d6", whiteSpace: "pre-line" }}>{d.pegadinha}</div>
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <button onClick={() => { setDIdx((i) => (i - 1 + DISCURSIVAS.length) % DISCURSIVAS.length); setDRevelar(false); setDRascunho(""); }}
                  style={{ background: "transparent", border: "1px solid " + C.marrom, color: C.cinza, borderRadius: 9, padding: "11px 20px",
                    fontSize: 13, cursor: "pointer", fontFamily: "Lato, sans-serif" }}>Anterior</button>
                <button onClick={() => { setDIdx((i) => (i + 1) % DISCURSIVAS.length); setDRevelar(false); setDRascunho(""); }}
                  style={btnOuro}>Proxima discursiva</button>
              </div>
            </div>
          );
        })()}

        {aba === "diario" && (
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Meu Diário de Estudo</h2>
            <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 6px", lineHeight: 1.5 }}>
              Registre quantas horas você estudou por dia — <strong style={{ color: C.creme }}>tudo conta</strong>: e-book, caderno, questões, aula, revisão.
            </p>
            <p style={{ color: C.douradoClaro, fontSize: 12.5, margin: "0 0 22px" }}>
              Este registro é seu. Serve para você enxergar sua constância — e para eu te ajudar melhor na mentoria.
            </p>

            {/* métricas do diário */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 22 }}>
              {[
                ["Esta semana", `${horasPeriodo(prog.diario, 7).toFixed(1).replace(".0", "")}h`, "registradas"],
                ["Últimos 30 dias", `${horasPeriodo(prog.diario, 30).toFixed(1).replace(".0", "")}h`, "no total"],
                ["Sequência", `${sequencia(prog.atividade)} ${sequencia(prog.atividade) === 1 ? "dia" : "dias"}`, "sem falhar"],
              ].map(([t, v, sub]) => (
                <div key={t} style={card}>
                  <div style={{ fontSize: 11, color: C.cinza, letterSpacing: ".1em", textTransform: "uppercase" }}>{t}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 800, color: C.douradoClaro, margin: "6px 0 2px" }}>{v}</div>
                  <div style={{ fontSize: 11.5, color: C.cinza }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* registro dos 7 dias */}
            <div style={card}>
              <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 14 }}>Esta semana</div>
              <div style={{ display: "grid", gap: 10 }}>
                {semanaAtual().map((dia) => {
                  const h = (prog.diario || {})[dia] || "";
                  const eHoje = dia === hoje();
                  const [d, m] = [dia.slice(8, 10), dia.slice(5, 7)];
                  return (
                    <div key={dia} style={{ display: "flex", alignItems: "center", gap: 12, background: eHoje ? "#241f17" : "#3A2517",
                      border: `1px solid ${eHoje ? C.dourado : "#5a3d26"}`, borderRadius: 8, padding: "10px 14px" }}>
                      <div style={{ width: 78, flexShrink: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: eHoje ? C.douradoClaro : C.creme }}>
                          {diaSemana(dia)}{eHoje ? " · hoje" : ""}
                        </div>
                        <div style={{ fontSize: 11, color: C.cinza }}>{d}/{m}</div>
                      </div>
                      <input type="number" min="0" max="24" step="0.5" value={h} placeholder="0"
                        onChange={(e) => registrarHoras(dia, e.target.value)}
                        style={{ width: 74, background: "#191715", border: `1px solid ${h ? C.marrom : "#5a3d26"}`, borderRadius: 6,
                          padding: "8px 10px", color: C.creme, fontSize: 14, fontFamily: "Lato, sans-serif", textAlign: "center" }} />
                      <span style={{ fontSize: 12.5, color: C.cinza, flexShrink: 0 }}>horas</span>
                      {/* barra proporcional */}
                      <div style={{ flex: 1, height: 6, background: "#5a3d26", borderRadius: 4, overflow: "hidden", minWidth: 40 }}>
                        <div style={{ width: `${Math.min((Number(h) || 0) / 6 * 100, 100)}%`, height: "100%",
                          background: `linear-gradient(90deg, ${C.marrom}, ${C.douradoClaro})`, transition: "width .4s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 11.5, color: C.cinza, marginTop: 14, marginBottom: 0, lineHeight: 1.5 }}>
                Registre com sinceridade — inclusive os dias de zero. O valor deste diário está em mostrar a verdade, não o ideal.
              </p>
            </div>

            <div style={{ ...card, marginTop: 18, background: `linear-gradient(135deg, ${C.cardBg}, ${C.preto2})` }}>
              <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 6 }}>Por que registrar</div>
              <div style={{ fontSize: 13, color: "#cfc7bd", lineHeight: 1.55 }}>
                Quem mede, enxerga. Quem enxerga, ajusta. Não existe número certo de horas — existe <strong style={{ color: C.creme }}>constância</strong>.
                Uma hora todo dia vence seis horas só no domingo.
              </div>
            </div>
          </div>
        )}

        {aba === "desempenho" && (
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Meu desempenho</h2>
            <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 22px" }}>Seu aproveitamento por eixo. Priorize os de menor acerto e maior peso.</p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 26 }}>
              <div style={{ ...card, flex: "1 1 200px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <Ring pct={pctGeral} label={totFeitas ? `${pctGeral}%` : "—"} sub="Geral" />
                <div style={{ fontSize: 12.5, color: C.cinza, textAlign: "center" }}>{totFeitas ? "Aproveitamento geral" : "Resolva questões para ver"}</div>
              </div>
              <div style={{ flex: "2 1 400px", display: "grid", gap: 12 }}>
                {EIXOS.map((e) => {
                  const st = statsEixo(e.id);
                  const cor = st.pct >= 80 ? C.verde : st.pct >= 65 ? C.dourado : st.qFeitas ? C.vermelho : C.cinza;
                  return (
                    <div key={e.id} style={{ ...card, padding: 15 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{e.nome}</span>
                        <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, color: cor, fontSize: 16 }}>{st.qFeitas ? st.pct + "%" : "—"}</span>
                      </div>
                      <div style={{ height: 8, background: "#5a3d26", borderRadius: 5, overflow: "hidden" }}>
                        <div style={{ width: `${st.pct}%`, height: "100%", background: cor, transition: "width 1s ease" }} />
                      </div>
                      <div style={{ fontSize: 11, color: C.cinza, marginTop: 6 }}>{st.qFeitas}/{st.qTotal} questões respondidas · {pesoLabel(e.peso)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ borderTop: "1px solid #5a3d26", padding: "18px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", color: C.dourado, fontSize: 14 }}>Planeje. Estude. Execute. Alcance.</div>
        <div style={{ fontSize: 10.5, color: C.cinza, letterSpacing: ".1em", marginTop: 4 }}>RESIFRIENDS · Profa. Fátima Barbosa</div>
      </footer>
    </div>
  );
}

function AulasGravadas({ nomeAluno }) {
  const [aulaAtiva, setAulaAtiva] = useState(null);
  return (
    <div>
      <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Aulas Gravadas</h2>
      <p style={{ color: C.cinza, fontSize: 13.5, margin: "0 0 20px" }}>Reveja as aulas quando quiser. Conteúdo exclusivo da turma — não compartilhe.</p>

      {aulaAtiva ? (
        <div>
          <button onClick={() => setAulaAtiva(null)} style={{ background: "transparent", border: `1px solid ${C.dourado}`, color: C.dourado, borderRadius: 8, padding: "7px 14px", fontSize: 13, cursor: "pointer", fontFamily: "Lato, sans-serif", marginBottom: 16 }}>← Voltar às aulas</button>
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            {/* Player com marca d'água do nome do aluno sobreposta */}
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#000" }}>
              <iframe
                title={aulaAtiva.titulo}
                src={`https://www.youtube-nocookie.com/embed/${aulaAtiva.videoId}?rel=0&modestbranding=1&iv_load_policy=3`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* MARCA D'ÁGUA — nome do aluno, discreta mas visível, identifica quem vazar */}
              <div style={{ position: "absolute", top: 14, right: 16, background: "rgba(0,0,0,.35)", color: "rgba(255,255,255,.55)",
                fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 5, pointerEvents: "none", letterSpacing: ".03em", fontFamily: "Lato, sans-serif" }}>
                {nomeAluno} · Resifriends
              </div>
              <div style={{ position: "absolute", bottom: "22%", left: "8%", color: "rgba(255,255,255,.14)", fontSize: 15, fontWeight: 800,
                pointerEvents: "none", transform: "rotate(-8deg)", fontFamily: "Lato, sans-serif" }}>
                {nomeAluno}
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 11, color: C.dourado, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>{aulaAtiva.eixo}</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 19, fontWeight: 700 }}>{aulaAtiva.titulo}</div>
              <div style={{ fontSize: 12.5, color: C.cinza, marginTop: 4 }}>{aulaAtiva.dur} · aula de {aulaAtiva.data}</div>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: "12px 15px", background: "#3A2517", border: "1px solid #5a3d26", borderRadius: 10, fontSize: 12.5, color: C.cinza, lineHeight: 1.5 }}>
            🔒 Este vídeo é exclusivo da turma e está identificado com o seu nome. O compartilhamento é rastreável e proibido.
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {AULAS_GRAVADAS.map((a) => (
            <div key={a.id} onClick={() => setAulaAtiva(a)} style={{ ...card, padding: 15, display: "flex", alignItems: "center", gap: 15, cursor: "pointer" }}>
              <div style={{ width: 54, height: 54, borderRadius: 10, background: `linear-gradient(135deg, ${C.dourado}, ${C.marrom})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: C.preto, fontSize: 20 }}>▶</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10.5, color: C.dourado, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 3 }}>{a.eixo}</div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700 }}>{a.titulo}</div>
                <div style={{ fontSize: 12, color: C.cinza, marginTop: 2 }}>{a.dur} · {a.data}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function pesoLabel(p) { return { alto: "Peso alto", medio: "Peso médio", baixo: "Peso baixo", bonus: "Conteúdo bônus" }[p] || "Peso baixo"; }
