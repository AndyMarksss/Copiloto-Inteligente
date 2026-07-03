const KNOWLEDGE_BASE = [
  {
    categoria: 'TI',
    titulo: 'Abertura de chamado de TI',
    palavrasChave: ['chamado', 'abrir chamado', 'ticket', 'suporte', 'ajuda da ti', 'suporte de ti', 'ajuda da equipe de ti', 'computador', 'notebook', 'internet', 'wifi', 'sistema'],
    conteudo: 'Para abrir um chamado de TI, acesse o canal interno de suporte, informe seu nome, setor, equipamento afetado, descrição objetiva do problema e anexe prints quando possível. Problemas críticos, como falta de internet em sala de aula ou indisponibilidade de sistema essencial, devem ser sinalizados como urgentes.'
  },
  {
    categoria: 'TI',
    titulo: 'Recuperação de senha',
    palavrasChave: ['recuperar senha', 'trocar senha', 'redefinir senha', 'esqueci senha', 'senha', 'login', 'acesso', 'bloqueado', 'conta', 'recuperar', 'esqueci'],
    conteudo: 'Caso esqueça a senha, solicite redefinição pelo canal oficial de suporte. Nunca compartilhe senhas por e-mail, mensagens ou grupos, e nunca digite ou envie sua senha neste chat. A equipe responsável pode confirmar dados mínimos para validar a solicitação, mas não deve pedir sua senha atual.'
  },
  {
    categoria: 'TI',
    titulo: 'Acesso e senha de e-mail, Gmail e Google Workspace',
    palavrasChave: ['gmail', 'senha do gmail', 'recuperar senha do gmail', 'esqueci senha do gmail', 'esqueci minha senha do gmail', 'redefinir senha do gmail', 'google', 'conta google', 'recuperar conta google', 'google workspace', 'workspace', 'recuperar acesso google', 'senha do google', 'redefinir senha do google', 'email', 'senha do email', 'senha do e-mail', 'email institucional', 'e-mail institucional', 'email corporativo', 'e-mail corporativo', 'esqueci senha do email', 'recuperar email', 'redefinir senha do email', 'nao consigo acessar email', 'nao consigo acessar meu email', 'nao consigo acessar gmail', 'nao consigo acessar meu gmail'],
    conteudo: 'Para recuperar o acesso ao e-mail, o caminho depende do tipo de conta. Se for a conta institucional/corporativa (Gmail do trabalho, Google Workspace ou e-mail da organização), solicite a redefinição pelo canal oficial de suporte, normalmente abrindo um chamado de TI. Informe apenas o necessário (nome, setor, e-mail institucional e a descrição do problema) e nunca envie sua senha por chat, e-mail ou mensagens; a equipe pode validar alguns dados, mas nunca pedirá sua senha atual. Se for uma conta pessoal do Google/Gmail, utilize o processo oficial de recuperação de conta do próprio Google; não é possível garantir a recuperação e você não deve informar sua senha a ninguém. Em ambiente corporativo ou escolar, prefira acionar a TI.'
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
    palavrasChave: ['suporte impressora', 'impressora', 'impressora nao imprime', 'impressora nao funciona', 'impressora offline', 'nao consigo imprimir', 'imprimir', 'impressao', 'toner', 'papel', 'atolamento', 'papel preso', 'suporte'],
    conteudo: 'Para suporte com impressoras, verifique se há papel, se o toner não acabou e se a impressora está ligada e conectada à rede. Persistindo o problema, abra um chamado de TI informando o modelo/localização da impressora e a mensagem de erro exibida. Não desmonte o equipamento nem substitua peças ou toner sem orientação da equipe responsável.'
  },
  {
    categoria: 'TI',
    titulo: 'Problemas de internet ou conexão',
    palavrasChave: ['sem internet', 'estou sem internet', 'conectar na internet', 'conectar internet', 'nao consigo acessar a internet', 'internet nao funciona', 'internet caiu', 'a internet caiu', 'caiu a internet', 'wifi nao funciona', 'wi-fi', 'cabo de rede', 'rede', 'conexao', 'internet', 'wifi'],
    conteudo: 'Se estiver sem acesso à internet, verifique primeiro se o Wi-Fi está ativado ou se o cabo de rede está firmemente conectado. Confirme se outros sites ou sistemas também estão sem acesso, o que ajuda a identificar se o problema é geral ou apenas no seu equipamento. Não altere configurações avançadas de rede por conta própria. Persistindo, abra um chamado de TI informando o local, o equipamento e uma descrição do problema, e valide a orientação com o setor responsável.'
  },
  {
    categoria: 'TI',
    titulo: 'Recuperação de dados, HD e formatação',
    palavrasChave: ['restaurar hd', 'restaurar o hd', 'restauro', 'recuperar arquivos', 'arquivos apagados', 'recuperar arquivos apagados', 'formatar', 'formatar o computador', 'formatacao', 'reinstalar', 'reinstalar o windows', 'reinstalar windows', 'mexer no disco', 'disco', 'recuperacao de dados', 'hd'],
    conteudo: 'A base de conhecimento não possui um procedimento seguro para restaurar HD, formatar o computador, reinstalar o sistema ou recuperar arquivos apagados. Essas ações são sensíveis e, se feitas de forma indevida, podem causar perda permanente de dados. Por isso, não tente formatar, restaurar ou mexer no disco por conta própria. Abra um chamado de TI descrevendo a situação, o equipamento e o local, para que a equipe responsável avalie o caso com segurança.'
  },
  {
    categoria: 'TI',
    titulo: 'Sistema não abre, tela travada ou computador lento',
    palavrasChave: ['sistema nao abre', 'nao consigo acessar um sistema', 'nao consigo acessar o sistema', 'erro no sistema', 'site interno', 'site interno nao abre', 'portal', 'portal nao entra', 'tela travada', 'tela congelada', 'travou', 'travando', 'sistema travando', 'computador lento', 'esta lento', 'muito lento', 'lento', 'sistema fora do ar', 'sistema indisponivel', 'sistema lento', 'sistema'],
    conteudo: 'Se um sistema não abre, a tela travou ou o computador está lento, registre evidências antes de acionar o suporte: salve seu trabalho se possível, feche programas desnecessários, tire um print da tela e anote o nome do sistema e o horário do problema. Verifique também a conexão de internet. Reinicie apenas se for seguro e autorizado. Em seguida, abra um chamado de TI com essas informações, o equipamento e o local. Não instale otimizadores ou programas por conta própria e nunca envie sua senha no chamado.'
  },
  {
    categoria: 'TI',
    titulo: 'Arquivos, PDF e programas que não abrem',
    palavrasChave: ['abrir pdf', 'abro um pdf', 'como abro pdf', 'nao consigo abrir pdf', 'pdf nao abre', 'pdf', 'arquivo nao abre', 'arquivo', 'abrir documento', 'abrir um documento', 'preciso abrir um documento', 'documento nao abre', 'programa nao abre', 'programa', 'software nao abre', 'acrobat', 'acrobat nao abre', 'navegador nao abre', 'aplicativo nao abre'],
    conteudo: 'Se um arquivo (como PDF) ou programa não abre, verifique se o arquivo não está corrompido e se há um aplicativo adequado instalado para abri-lo. Tente abrir novamente ou reiniciar o aplicativo. Não baixe nem instale programas por conta própria sem autorização da TI. Se o problema persistir, abra um chamado de TI informando o nome do arquivo ou do software, a mensagem de erro exibida e um print da tela.'
  },
  {
    categoria: 'TI',
    titulo: 'Projetor, som e recursos audiovisuais',
    palavrasChave: ['projetor', 'projetor nao liga', 'sem som', 'som nao funciona', 'caixa de som', 'audio', 'hdmi', 'hdmi nao funciona', 'tela nao aparece', 'nao aparece imagem', 'audiovisual'],
    conteudo: 'Para problemas com projetor, som ou HDMI, verifique os cabos básicos (energia e conexão) e se a fonte de entrada correta está selecionada. Não mexa em instalações fixas nem em fiação embutida. Se não resolver, acione a TI ou o suporte de audiovisual informando a sala, o equipamento e a descrição do problema.'
  },
  {
    categoria: 'TI',
    titulo: 'Solicitação ou troca de equipamento',
    palavrasChave: ['pc novo', 'quero um pc novo', 'um pc novo', 'pc', 'computador novo', 'novo computador', 'preciso de um computador novo', 'preciso de um computador', 'trocar computador', 'trocar de computador', 'trocar meu computador', 'troca de equipamento', 'trocar de equipamento', 'notebook novo', 'preciso de um notebook', 'solicitar equipamento', 'solicitacao de equipamento', 'solicitar um monitor', 'solicitar monitor', 'monitor novo', 'aquisicao de equipamento', 'equipamento novo', 'substituir computador', 'substituir o computador', 'computador precisa ser substituido', 'preciso de teclado', 'preciso de um teclado', 'preciso de mouse', 'preciso de um mouse'],
    conteudo: 'Não há aprovação automática para solicitar ou trocar equipamentos (computador, notebook, monitor, teclado, mouse, entre outros). Para esse tipo de solicitação, abra um chamado de TI ou procure o setor responsável, informando o seu setor, o equipamento atual, a necessidade e a justificativa. A troca ou aquisição depende de avaliação técnica da TI e da validação da liderança ou da área responsável, e não deve ser considerada garantida. Não informe dados sensíveis nesta solicitação.'
  },
  {
    categoria: 'RH',
    titulo: 'Atualização cadastral',
    palavrasChave: ['rh', 'cadastro', 'atualizar cadastro', 'atualizar dados', 'alteracao de dados', 'endereço', 'telefone', 'colaborador', 'ponto', 'comprovante', 'documento', 'falar com rh', 'contato rh'],
    conteudo: 'Atualizações de cadastro devem ser encaminhadas ao RH pelo canal oficial, com as informações corretas e documentos comprobatórios quando necessário. Não informe CPF, endereço, dados bancários ou documentos pessoais aqui no chat: esses dados devem ser tratados apenas no canal autorizado do RH. O copiloto orienta o caminho geral, mas prazos e validações são confirmados pelo setor.'
  },
  {
    categoria: 'RH',
    titulo: 'Dúvidas sobre benefícios',
    palavrasChave: ['benefício', 'benefícios', 'sobre benefícios', 'falar sobre benefícios', 'vale', 'vale refeição', 'convênio', 'férias', 'holerite'],
    conteudo: 'Dúvidas sobre benefícios, férias, holerite ou registros funcionais devem ser direcionadas ao RH. O copiloto pode orientar o caminho geral, mas decisões, prazos e validações oficiais devem ser confirmados pelo setor responsável.'
  },
  {
    categoria: 'Segurança da Informação',
    titulo: 'Boas práticas de segurança',
    palavrasChave: ['segurança', 'phishing', 'senha', 'dados', 'acesso', 'confidencial', 'bloquear tela', 'bloquear a tela', 'computador desbloqueado', 'tela desbloqueada', 'desbloqueado', 'deixei o computador desbloqueado'],
    conteudo: 'Boas práticas de segurança incluem: utilizar senhas fortes, não compartilhar credenciais, desconfiar de links suspeitos, bloquear a tela sempre que se afastar do computador (para não deixá-lo desbloqueado), não instalar softwares sem autorização e comunicar imediatamente incidentes ou suspeitas de vazamento.'
  },
  {
    categoria: 'Segurança da Informação',
    titulo: 'Compartilhamento de senha',
    palavrasChave: ['compartilhar senha', 'senha compartilhada', 'emprestar senha', 'passar senha', 'compartilhar', 'senha'],
    conteudo: 'Não é permitido compartilhar sua senha com ninguém, nem mesmo colegas ou supervisores. A senha é pessoal e intransferível, e você é responsável pelas ações realizadas com o seu acesso. Se alguém precisa de acesso a um sistema, o correto é solicitar um acesso próprio pelo canal oficial. Suspeite de qualquer pedido de senha, pois pode ser tentativa de golpe.'
  },
  {
    categoria: 'Segurança da Informação',
    titulo: 'Phishing, links suspeitos e golpes',
    palavrasChave: ['link suspeito', 'recebi um link', 'email suspeito', 'e-mail estranho', 'mensagem suspeita', 'phishing', 'golpe', 'cai em um golpe', 'fui hackeado', 'clique em um link', 'anexo suspeito', 'acesso indevido', 'incidente', 'vazamento'],
    conteudo: 'Se receber um link, e-mail ou mensagem suspeita, não clique em links, não baixe anexos e não informe dados ou senhas. Golpes de phishing tentam se passar por contatos ou sistemas oficiais. Se achar que caiu em um golpe ou que houve acesso indevido, comunique imediatamente o incidente ao setor de Segurança da Informação/TI pelos canais oficiais e, orientado por eles, troque a senha apenas pelo canal oficial. Nunca envie credenciais neste chat.'
  },
  {
    categoria: 'Governança de IA',
    titulo: 'Uso responsável de IA Generativa',
    palavrasChave: ['ia', 'inteligência artificial', 'generativa', 'lgpd', 'privacidade', 'governança', 'dados sensíveis', 'posso usar ia', 'usar ia', 'chatgpt', 'gemini', 'colar dados', 'cpf', 'dados de alunos', 'aluno', 'documento interno', 'ia inventou', 'inventou', 'alucinacao', 'resposta errada'],
    conteudo: 'Ferramentas de IA Generativa devem ser usadas com responsabilidade. Não insira dados pessoais, CPF, informações sensíveis, documentos sigilosos ou internos, senhas, dados de alunos ou de colaboradores sem autorização. A IA é apoio e não deve ser a única fonte: valide as respostas com uma pessoa responsável antes de decisões importantes. Se a IA fornecer uma resposta incorreta ou inventada (alucinação), não a utilize e procure o setor responsável para confirmar a informação oficial.'
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
