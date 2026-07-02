const KNOWLEDGE_BASE = [
  {
    categoria: 'TI',
    titulo: 'Abertura de chamado de TI',
    palavrasChave: ['chamado', 'abrir chamado', 'ticket', 'suporte', 'computador', 'notebook', 'internet', 'wifi', 'sistema'],
    conteudo: 'Para abrir um chamado de TI, acesse o canal interno de suporte, informe seu nome, setor, equipamento afetado, descrição objetiva do problema e anexe prints quando possível. Problemas críticos, como falta de internet em sala de aula ou indisponibilidade de sistema essencial, devem ser sinalizados como urgentes.'
  },
  {
    categoria: 'TI',
    titulo: 'Recuperação de senha',
    palavrasChave: ['recuperar senha', 'trocar senha', 'redefinir senha', 'esqueci senha', 'senha', 'login', 'acesso', 'bloqueado', 'conta', 'recuperar', 'esqueci'],
    conteudo: 'Caso esqueça a senha, solicite redefinição pelo canal oficial de suporte. Nunca compartilhe senhas por e-mail, mensagens ou grupos. A equipe responsável pode confirmar dados mínimos para validar a solicitação, mas não deve pedir sua senha atual.'
  },
  {
    categoria: 'TI',
    titulo: 'Computador não liga',
    palavrasChave: ['computador', 'nao liga', 'ligar', 'desligado', 'tela preta', 'energia'],
    conteudo: 'Se o computador não liga, verifique primeiro se o cabo de energia está conectado e se a tomada tem energia. Confira se o monitor está ligado. Se mesmo assim não funcionar, não abra o equipamento por conta própria: abra um chamado de TI descrevendo o problema, o número do equipamento e o local, para que a equipe possa fazer o atendimento presencial ou remoto.'
  },
  {
    categoria: 'TI',
    titulo: 'Suporte para impressora',
    palavrasChave: ['suporte impressora', 'impressora', 'imprimir', 'impressao', 'toner', 'papel', 'atolamento', 'suporte'],
    conteudo: 'Para suporte com impressoras, verifique se há papel, se o toner não acabou e se a impressora está ligada e conectada à rede. Persistindo o problema, abra um chamado de TI informando o modelo/localização da impressora e a mensagem de erro exibida. Não substitua peças ou toner sem orientação da equipe responsável.'
  },
  {
    categoria: 'RH',
    titulo: 'Atualização cadastral',
    palavrasChave: ['rh', 'cadastro', 'endereço', 'telefone', 'benefício', 'colaborador', 'ponto'],
    conteudo: 'Atualizações de cadastro devem ser encaminhadas ao RH com as informações corretas e documentos comprobatórios quando necessário. O colaborador deve evitar enviar dados pessoais em canais informais e priorizar os meios oficiais da organização.'
  },
  {
    categoria: 'RH',
    titulo: 'Dúvidas sobre benefícios',
    palavrasChave: ['benefício', 'vale', 'convênio', 'férias', 'holerite'],
    conteudo: 'Dúvidas sobre benefícios, férias, holerite ou registros funcionais devem ser direcionadas ao RH. O copiloto pode orientar o caminho geral, mas decisões, prazos e validações oficiais devem ser confirmados pelo setor responsável.'
  },
  {
    categoria: 'Segurança da Informação',
    titulo: 'Boas práticas de segurança',
    palavrasChave: ['segurança', 'phishing', 'senha', 'dados', 'acesso', 'confidencial'],
    conteudo: 'Boas práticas de segurança incluem: utilizar senhas fortes, não compartilhar credenciais, desconfiar de links suspeitos, bloquear a tela ao se afastar, não instalar softwares sem autorização e comunicar imediatamente incidentes ou suspeitas de vazamento.'
  },
  {
    categoria: 'Segurança da Informação',
    titulo: 'Compartilhamento de senha',
    palavrasChave: ['compartilhar senha', 'senha compartilhada', 'emprestar senha', 'passar senha', 'compartilhar', 'senha'],
    conteudo: 'Não é permitido compartilhar sua senha com ninguém, nem mesmo colegas ou supervisores. A senha é pessoal e intransferível, e você é responsável pelas ações realizadas com o seu acesso. Se alguém precisa de acesso a um sistema, o correto é solicitar um acesso próprio pelo canal oficial. Suspeite de qualquer pedido de senha, pois pode ser tentativa de golpe.'
  },
  {
    categoria: 'Governança de IA',
    titulo: 'Uso responsável de IA Generativa',
    palavrasChave: ['ia', 'inteligência artificial', 'generativa', 'lgpd', 'privacidade', 'governança', 'dados sensíveis'],
    conteudo: 'Ferramentas de IA Generativa devem ser usadas com responsabilidade. Não devem ser inseridos dados pessoais, informações sensíveis, documentos sigilosos, senhas, dados de alunos, dados de colaboradores ou estratégias internas sem autorização. As respostas da IA devem ser revisadas por uma pessoa antes de decisões importantes.'
  },
  {
    categoria: 'Procedimentos',
    titulo: 'Consulta a procedimentos internos',
    palavrasChave: ['procedimento', 'política', 'manual', 'treinamento', 'processo', 'orientação'],
    conteudo: 'Procedimentos internos devem estar documentados em local oficial e atualizado. Quando houver dúvida, o colaborador deve consultar a versão mais recente do documento ou acionar a área responsável. O copiloto ajuda a localizar e resumir orientações, mas não substitui documentos normativos.'
  },
  {
    categoria: 'Atendimento',
    titulo: 'Comunicação com áreas internas',
    palavrasChave: ['atendimento', 'solicitação', 'pedido', 'prazo', 'retorno', 'atendimento interno'],
    conteudo: 'O atendimento interno funciona por canais oficiais. Ao abrir uma solicitação, descreva a necessidade com clareza, informe o impacto da demanda, anexe evidências e acompanhe o retorno pelo canal oficial. Solicitações incompletas podem aumentar o tempo de atendimento.'
  },
  {
    categoria: 'Atendimento',
    titulo: 'Quando a IA não souber responder',
    palavrasChave: ['nao souber', 'nao sabe', 'quem procurar', 'quem devo procurar', 'procurar', 'nao encontrou', 'escalonamento', 'duvida', 'responsavel'],
    conteudo: 'Quando o copiloto não encontrar informação suficiente na base de conhecimento, ele deve avisar que não há orientação oficial e não inventar respostas. Nesse caso, procure o setor responsável pelo assunto: TI para equipamentos e sistemas, RH para questões de pessoal e benefícios, e a área de Segurança da Informação para dúvidas sobre dados e privacidade. Toda resposta importante deve ser validada por uma pessoa responsável.'
  }
];
