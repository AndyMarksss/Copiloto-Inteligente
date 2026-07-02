const CONFIG = {
  // Após publicar o Google Apps Script como Web App, cole a URL entre as aspas abaixo.
  // Exemplo: https://script.google.com/macros/s/SEU_ID/exec
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycby32Wigw737hwR4zxd8ccUwiBbVdXDqXy1zJQJTcY87szDAAE5y6kIe8k9evWW6yPxB/exec',

  // DEMO_MODE controla o modo de operação:
  //  - true  = força o modo demonstração local (não chama a API mesmo que a URL exista).
  //  - false = usa a API real se APPS_SCRIPT_URL estiver preenchida; senão, cai para o modo demo.
  DEMO_MODE: false,

  STORAGE_KEY: 'copiloto_corporativo_historico_v1'
};

// A IA real só é usada quando NÃO estamos em modo demo E existe uma URL configurada.
function isDemoMode() {
  return CONFIG.DEMO_MODE || !CONFIG.APPS_SCRIPT_URL;
}

const chatMessages = document.querySelector('#chatMessages');
const chatForm = document.querySelector('#chatForm');
const questionInput = document.querySelector('#questionInput');
const sendButton = document.querySelector('#sendButton');
const clearButton = document.querySelector('#clearButton');
const summaryButton = document.querySelector('#summaryButton');
const agentButtons = document.querySelectorAll('.agent');
const statusBadges = document.querySelectorAll('.js-status');
const statusTexts = document.querySelectorAll('.js-status-text');
const sendLabel = document.querySelector('#sendLabel');
const menuToggle = document.querySelector('#menuToggle');
const sidebar = document.querySelector('#sidebar');
const sidebarOverlay = document.querySelector('#sidebarOverlay');
const themeToggles = document.querySelectorAll('.js-theme-toggle');

let selectedAgent = 'auto';
let history = loadHistory();

// Perguntas sugeridas (fonte única para o painel e o estado inicial do chat).
const SUGGESTIONS = [
  { q: 'Como abrir um chamado de TI?', cat: 'TI', area: 'TI', icon: 'fa-headset' },
  { q: 'O que fazer quando o computador não liga?', cat: 'TI', area: 'TI', icon: 'fa-power-off' },
  { q: 'Como solicitar atualização de cadastro no RH?', cat: 'RH', area: 'RH', icon: 'fa-id-card' },
  { q: 'Posso compartilhar minha senha?', cat: 'Segurança', area: 'Segurança', icon: 'fa-key' },
  { q: 'Quais são as regras de segurança da informação?', cat: 'Segurança', area: 'Segurança', icon: 'fa-shield-halved' },
  { q: 'Posso enviar dados sensíveis para uma IA?', cat: 'Governança de IA', area: 'Governança', icon: 'fa-robot' }
];

// Cria um card de sugestão (botão) reutilizável.
function buildSuggestionCard(s) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'quick-question suggestion-card';
  btn.dataset.area = s.area;
  btn.dataset.question = s.q;
  btn.setAttribute('aria-label', 'Perguntar: ' + s.q);

  const iconWrap = document.createElement('span');
  iconWrap.className = 'suggestion-icon';
  const icon = document.createElement('i');
  icon.className = 'fa-solid ' + s.icon;
  icon.setAttribute('aria-hidden', 'true');
  iconWrap.appendChild(icon);

  const content = document.createElement('span');
  content.className = 'suggestion-content';
  const cat = document.createElement('span');
  cat.className = 'suggestion-category';
  cat.textContent = s.cat;
  const text = document.createElement('span');
  text.className = 'suggestion-text';
  text.textContent = s.q;
  content.append(cat, text);

  btn.append(iconWrap, content);
  return btn;
}

function loadHistory() {
  try {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Não foi possível carregar o histórico.', error);
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history.slice(-20)));
}

function renderChat() {
  chatMessages.innerHTML = '';

  if (history.length === 0) {
    renderEmptyState();
    return;
  }

  history.forEach((item) => addMessageToScreen(item, false));
  scrollToBottom();
}

// Estado inicial do chat: saudação + 3 sugestões principais.
function renderEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  empty.innerHTML =
    '<div class="empty-avatar"><i class="fa-solid fa-robot" aria-hidden="true"></i></div>' +
    '<h3>Olá! Sou o Copiloto Corporativo</h3>' +
    '<p>Escolha uma sugestão ou digite sua pergunta.</p>';

  const grid = document.createElement('div');
  grid.className = 'empty-suggestions';
  SUGGESTIONS.slice(0, 3).forEach((s) => grid.appendChild(buildSuggestionCard(s)));
  empty.appendChild(grid);

  chatMessages.appendChild(empty);
}

function addMessageToScreen(message, shouldScroll = true) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${message.role}`;

  // Avatar (ícone) do lado da mensagem.
  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  const icon = document.createElement('i');
  icon.className = message.role === 'user' ? 'fa-solid fa-user' : 'fa-solid fa-robot';
  icon.setAttribute('aria-hidden', 'true');
  avatar.appendChild(icon);

  const body = document.createElement('div');
  body.className = 'msg-body';

  const meta = document.createElement('div');
  meta.className = 'message-meta';

  if (message.role === 'user') {
    meta.textContent = 'Você';
    body.appendChild(meta);
    body.appendChild(buildTextBubble(message.content));
  } else {
    const nome = document.createElement('span');
    nome.textContent = 'Copiloto';
    const badge = document.createElement('span');
    badge.className = 'agent-badge';
    badge.textContent = message.agent || 'Geral';
    meta.append(nome, badge);
    body.appendChild(meta);
    // Mensagem de resumo tem renderização própria (card).
    body.appendChild(message.type === 'summary' ? buildSummaryCard(message.summary) : buildAssistantBubble(message));
  }

  wrapper.append(avatar, body);
  chatMessages.appendChild(wrapper);
  if (shouldScroll) scrollToBottom();
}

// Bolha simples de texto (usada pelo usuário).
function buildTextBubble(text) {
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;
  return bubble;
}

// Bolha estruturada do assistente: categoria, resposta, extras e orientação final.
function buildAssistantBubble(message) {
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';

  // Mensagens "plain" (resumo, boas-vindas) são exibidas como texto direto.
  if (message.plain) {
    const texto = document.createElement('p');
    texto.className = 'bubble-answer';
    texto.textContent = message.content;
    bubble.appendChild(texto);
    if (message.demo) bubble.appendChild(buildDemoTag());
    return bubble;
  }

  const parsed = parseAssistantContent(message.content);

  if (parsed.categoria) {
    const chip = document.createElement('span');
    chip.className = 'category-chip';
    chip.textContent = parsed.categoria;
    bubble.appendChild(chip);
  }

  if (parsed.resposta) {
    const resposta = document.createElement('p');
    resposta.className = 'bubble-answer';
    resposta.textContent = parsed.resposta;
    bubble.appendChild(resposta);
  }

  if (parsed.extras.length > 0) {
    const titulo = document.createElement('p');
    titulo.className = 'bubble-extra-title';
    titulo.textContent = 'Você também pode se interessar por:';
    bubble.appendChild(titulo);

    const lista = document.createElement('ul');
    lista.className = 'bubble-extra-list';
    parsed.extras.forEach((linha) => {
      const li = document.createElement('li');
      li.textContent = linha;
      lista.appendChild(li);
    });
    bubble.appendChild(lista);
  }

  if (parsed.orientacao) {
    const orientacao = document.createElement('p');
    orientacao.className = 'bubble-guidance';
    orientacao.textContent = parsed.orientacao;
    bubble.appendChild(orientacao);
  }

  if (message.demo) {
    bubble.appendChild(buildDemoTag());
  }

  return bubble;
}

// Chip discreto indicando que a resposta veio da base local simulada.
function buildDemoTag() {
  const tag = document.createElement('span');
  tag.className = 'demo-tag';
  const i = document.createElement('i');
  i.className = 'fa-solid fa-database';
  i.setAttribute('aria-hidden', 'true');
  tag.append(i, document.createTextNode(' Base local simulada'));
  return tag;
}

// Monta o card visual do resumo a partir de dados estruturados.
function buildSummaryCard(data) {
  const s = data || {};
  const card = document.createElement('div');
  card.className = 'summary-card';

  // Cabeçalho
  const head = document.createElement('div');
  head.className = 'summary-head';
  head.innerHTML = '<i class="fa-solid fa-list-check" aria-hidden="true"></i><h3>Resumo da conversa</h3>';
  const source = document.createElement('span');
  source.className = 'summary-source';
  source.textContent = s.generatedBy === 'ia' ? 'Gerado com IA' : 'Gerado localmente';
  head.appendChild(source);
  card.appendChild(head);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'summary-body';

  // Estatísticas
  const stats = document.createElement('div');
  stats.className = 'summary-stats';
  stats.appendChild(buildStat(String(s.totalPerguntas || 0), 'Perguntas feitas'));
  stats.appendChild(buildStat(String((s.temas || []).length), 'Temas tratados'));
  stats.appendChild(buildStat(String((s.agentes || []).length), 'Agentes acionados'));
  bodyEl.appendChild(stats);

  // Temas
  if ((s.temas || []).length > 0) {
    bodyEl.appendChild(buildBadgeSection('fa-tags', 'Temas tratados', s.temas));
  }
  // Agentes
  if ((s.agentes || []).length > 0) {
    bodyEl.appendChild(buildBadgeSection('fa-user-gear', 'Agentes acionados', s.agentes));
  }

  // Últimas perguntas
  if ((s.ultimas || []).length > 0) {
    const sec = document.createElement('div');
    sec.className = 'summary-section';
    sec.innerHTML = '<h4><i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> Últimas perguntas</h4>';
    const ol = document.createElement('ol');
    ol.className = 'summary-list';
    s.ultimas.forEach((q) => {
      const li = document.createElement('li');
      li.textContent = q;
      ol.appendChild(li);
    });
    sec.appendChild(ol);
    bodyEl.appendChild(sec);
  }

  // Orientação geral
  const guidance = document.createElement('div');
  guidance.className = 'summary-guidance';
  guidance.innerHTML = '<i class="fa-solid fa-circle-info" aria-hidden="true"></i>';
  const p = document.createElement('span');
  p.textContent = s.orientacao || 'As respostas são orientativas e devem ser validadas com o setor responsável.';
  guidance.appendChild(p);
  bodyEl.appendChild(guidance);

  card.appendChild(bodyEl);
  return card;
}

function buildStat(value, label) {
  const div = document.createElement('div');
  div.className = 'stat';
  const v = document.createElement('span');
  v.className = 'stat-value';
  v.textContent = value;
  const l = document.createElement('span');
  l.className = 'stat-label';
  l.textContent = label;
  div.append(v, l);
  return div;
}

function buildBadgeSection(iconClass, title, itens) {
  const sec = document.createElement('div');
  sec.className = 'summary-section';
  sec.innerHTML = `<h4><i class="fa-solid ${iconClass}" aria-hidden="true"></i> ${title}</h4>`;
  const row = document.createElement('div');
  row.className = 'badge-row';
  itens.forEach((t) => {
    const b = document.createElement('span');
    b.className = 'tag-badge';
    b.textContent = t;
    row.appendChild(b);
  });
  sec.appendChild(row);
  return sec;
}

// Interpreta o texto da resposta (demo ou IA real seguem o mesmo formato de rótulos).
function parseAssistantContent(content) {
  const result = { categoria: '', resposta: '', extras: [], orientacao: '' };
  const text = String(content || '');

  const categoriaMatch = text.match(/Categoria:\s*(.+)/i);
  if (categoriaMatch) result.categoria = categoriaMatch[1].trim();

  const orientacaoMatch = text.match(/Orienta[cç][aã]o final:\s*([\s\S]+)/i);
  if (orientacaoMatch) result.orientacao = orientacaoMatch[1].trim();

  // Itens complementares (linhas iniciadas por "•")
  result.extras = text
    .split('\n')
    .map((linha) => linha.trim())
    .filter((linha) => linha.startsWith('•'))
    .map((linha) => linha.replace(/^•\s*/, ''));

  // Corpo da resposta: entre "Resposta:" e o próximo bloco conhecido.
  const respostaMatch = text.match(/Resposta:\s*([\s\S]+?)(?=\n\s*(?:Você também pode|Orienta[cç][aã]o final:)|$)/i);
  if (respostaMatch) {
    result.resposta = respostaMatch[1].trim();
  } else if (!result.categoria && !result.orientacao) {
    // Texto livre (ex.: boas-vindas ou resposta fora do formato padrão).
    result.resposta = text.trim();
  }

  return result;
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setLoading(isLoading) {
  sendButton.disabled = isLoading;
  // Atualiza só o rótulo (mantém o ícone do botão intacto).
  if (sendLabel) sendLabel.textContent = isLoading ? 'Enviando...' : 'Enviar';
  questionInput.disabled = isLoading;
}

function classifyAgent(question) {
  const normalized = removeAccents(question.toLowerCase());

  // A ordem importa: categorias mais específicas primeiro.
  // Governança e Segurança vêm antes de TI porque "dados sensíveis" e
  // "senha compartilhada" devem cair na área correta mesmo citando "senha".
  const categories = [
    { agent: 'governanca', keywords: ['ia', 'inteligencia artificial', 'ia generativa', 'prompt', 'chatgpt', 'gemini', 'governanca', 'resposta inventada'] },
    { agent: 'seguranca', keywords: ['dados sensiveis', 'lgpd', 'privacidade', 'compartilhar senha', 'senha compartilhada', 'compartilhar', 'phishing', 'vazamento', 'confidencial', 'seguranca'] },
    { agent: 'rh', keywords: ['rh', 'beneficio', 'ferias', 'holerite', 'ponto', 'colaborador', 'cadastro', 'convenio'] },
    { agent: 'ti', keywords: ['senha', 'login', 'computador', 'notebook', 'impressora', 'internet', 'wifi', 'sistema', 'chamado', 'suporte', 'equipamento'] },
    { agent: 'procedimentos', keywords: ['procedimento', 'politica', 'manual', 'treinamento', 'processo', 'fluxo'] }
  ];

  const found = categories.find((category) => category.keywords.some((keyword) => normalized.includes(removeAccents(keyword))));
  return found ? found.agent : 'geral';
}

function removeAccents(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getRelevantKnowledge(question, agent) {
  const normalizedQuestion = removeAccents(question.toLowerCase());
  const agentFilter = agent === 'auto' ? classifyAgent(question) : agent;

  const scored = KNOWLEDGE_BASE.map((item) => {
    const keywordScore = item.palavrasChave.reduce((score, keyword) => {
      const kw = removeAccents(keyword.toLowerCase());
      // Frases (palavras-chave com mais de uma palavra) são mais específicas
      // e valem mais pontos, evitando que itens genéricos "roubem" a resposta.
      const peso = kw.split(/\s+/).length * 2;
      return normalizedQuestion.includes(kw) ? score + peso : score;
    }, 0);

    const categoryScore = removeAccents(item.categoria.toLowerCase()).includes(agentFilter) ? 2 : 0;
    return { ...item, score: keywordScore + categoryScore };
  });

  const selected = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return selected.length > 0 ? selected : KNOWLEDGE_BASE.slice(0, 4);
}

function formatKnowledgeForPrompt(items) {
  return items.map((item, index) => {
    return `${index + 1}. Categoria: ${item.categoria}\nTítulo: ${item.titulo}\nConteúdo: ${item.conteudo}`;
  }).join('\n\n');
}

function getHistorySummary() {
  if (history.length === 0) return 'Sem histórico anterior.';

  return history.slice(-8).map((item) => {
    const author = item.role === 'user' ? 'Usuário' : 'Copiloto';
    return `${author}: ${item.content}`;
  }).join('\n');
}

async function askCopilot(question, isSummary = false) {
  const agent = selectedAgent === 'auto' ? classifyAgent(question) : selectedAgent;
  const relevantKnowledge = getRelevantKnowledge(question, selectedAgent);

  const payload = {
    question,
    agent,
    isSummary,
    knowledgeBase: formatKnowledgeForPrompt(relevantKnowledge),
    historySummary: getHistorySummary()
  };

  // Sem API configurada (ou DEMO_MODE ligado): responde localmente pela base.
  if (isDemoMode()) {
    return localFallbackResponse(question, agent, relevantKnowledge);
  }

  // Chamada ao Google Apps Script (Web App).
  // text/plain evita o preflight de CORS; o backend faz o JSON.parse do corpo.
  const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  // Protege contra resposta vazia ou que não seja JSON válido.
  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error('A resposta do servidor veio vazia ou em formato inválido.');
  }

  if (!data || data.success !== true) {
    throw new Error((data && data.error) || 'A API retornou um erro sem detalhes.');
  }

  if (!data.answer) {
    throw new Error('A IA não retornou nenhum texto de resposta.');
  }

  return {
    agent,
    content: data.answer
  };
}

// Resposta do modo demonstração: monta um texto organizado a partir dos
// itens mais relevantes da base de conhecimento, sem inventar informações.
function localFallbackResponse(question, agent, relevantKnowledge) {
  const hasMatch = relevantKnowledge.some((item) => item.score > 0);

  if (!hasMatch) {
    return {
      agent,
      demo: true,
      content: [
        'Categoria: Atendimento',
        '',
        'Resposta: Não encontrei orientação oficial suficiente na base de conhecimento para responder a essa pergunta com segurança. Para não correr o risco de passar uma informação incorreta, prefiro não inventar uma resposta.',
        '',
        'Orientação final: procure o setor responsável pelo assunto (TI, RH ou Segurança da Informação) pelos canais oficiais.'
      ].join('\n')
    };
  }

  const principal = relevantKnowledge[0];
  const complementares = relevantKnowledge.slice(1, 3).filter((item) => item.score > 0);

  const linhas = [
    `Categoria: ${principal.categoria}`,
    '',
    `Resposta: ${principal.conteudo}`
  ];

  if (complementares.length > 0) {
    linhas.push('', 'Você também pode se interessar por:');
    complementares.forEach((item) => linhas.push(`• ${item.titulo}: ${item.conteudo}`));
  }

  linhas.push(
    '',
    'Orientação final: esta é uma resposta simulada da base de conhecimento. Valide as informações com o setor responsável antes de decisões importantes.'
  );

  return { agent, demo: true, content: linhas.join('\n') };
}

// Monta os dados estruturados do resumo (sempre local, para garantir um card
// bonito e previsível, sem markdown cru — mesmo com a IA conectada).
function buildSummaryData() {
  const perguntas = history.filter((item) => item.role === 'user');
  const temas = Array.from(new Set(perguntas.map((item) => getAgentLabel(classifyAgent(item.content)))));

  // Agentes acionados = agentes das respostas do assistente (ignora avisos e o resumo).
  const agentes = Array.from(new Set(
    history
      .filter((item) => item.role === 'assistant')
      .map((item) => item.agent)
      .filter((label) => label && !['Erro', 'Resumo', 'Boas-vindas'].includes(label))
  ));

  return {
    generatedBy: 'local',
    totalPerguntas: perguntas.length,
    temas: temas,
    agentes: agentes,
    ultimas: perguntas.slice(-3).map((item) => item.content),
    orientacao: 'As respostas são orientativas e devem ser validadas com o setor responsável antes de decisões importantes.'
  };
}

async function handleSubmit(event) {
  event.preventDefault();

  const question = questionInput.value.trim();
  if (!question) return;

  const userMessage = { role: 'user', content: question };
  history.push(userMessage);
  addMessageToScreen(userMessage);
  questionInput.value = '';
  questionInput.style.height = 'auto'; // volta o campo à altura padrão
  saveHistory();

  try {
    setLoading(true);
    const response = await askCopilot(question);
    pushAssistant(response);
    // Chamada real bem-sucedida: reforça o status de IA conectada.
    if (!isDemoMode()) setConnectionState('online');
  } catch (error) {
    // A IA real falhou: avisa de forma amigável e cai para a resposta local simulada.
    console.warn('Falha ao consultar a IA. Usando resposta local.', error);
    if (!isDemoMode()) setConnectionState('fallback');
    const agent = selectedAgent === 'auto' ? classifyAgent(question) : selectedAgent;
    const local = localFallbackResponse(question, agent, getRelevantKnowledge(question, selectedAgent));
    // Insere um aviso amigável no início do corpo da resposta.
    local.content = local.content.replace(
      /Resposta:\s*/i,
      'Resposta: A IA online não respondeu agora, então usei a base de conhecimento local para te ajudar. '
    );
    pushAssistant(local);
  } finally {
    setLoading(false);
    questionInput.focus();
  }
}

// Adiciona uma resposta do assistente ao histórico e à tela.
function pushAssistant(response) {
  const assistantMessage = {
    role: 'assistant',
    agent: getAgentLabel(response.agent),
    content: response.content,
    demo: Boolean(response.demo),
    plain: Boolean(response.plain)
  };
  history.push(assistantMessage);
  addMessageToScreen(assistantMessage);
  saveHistory();
}

// Opção A: o resumo é sempre gerado localmente e renderizado como card,
// garantindo um resultado bonito e previsível (sem markdown cru), mesmo com a IA conectada.
function generateSummary() {
  const temPerguntas = history.some((item) => item.role === 'user');
  if (!temPerguntas) {
    addMessageToScreen({
      role: 'assistant',
      agent: 'Resumo',
      plain: true,
      content: 'Ainda não há conversa suficiente para resumir. Faça ao menos uma pergunta e tente novamente.'
    });
    return;
  }

  const summaryMessage = {
    role: 'assistant',
    agent: 'Resumo',
    type: 'summary',
    summary: buildSummaryData()
  };
  history.push(summaryMessage);
  addMessageToScreen(summaryMessage);
  saveHistory();
}

function getAgentLabel(agent) {
  const labels = {
    auto: 'Automático',
    geral: 'Geral',
    ti: 'TI',
    rh: 'RH',
    seguranca: 'Segurança da Informação',
    governanca: 'Governança de IA',
    procedimentos: 'Procedimentos'
  };
  return labels[agent] || 'Geral';
}

agentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    agentButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    selectedAgent = button.dataset.agent;
    closeSidebar(); // fecha o menu no mobile após escolher o agente
  });
});

// Clique em qualquer card de sugestão (painel ou estado inicial) — via delegação,
// para funcionar também com os cards criados dinamicamente.
document.addEventListener('click', (event) => {
  const button = event.target.closest('.quick-question');
  if (!button) return;
  const full = button.dataset.question;
  const textEl = button.querySelector('.suggestion-text');
  questionInput.value = (full || (textEl ? textEl.textContent : button.textContent) || '').trim();
  chatForm.requestSubmit();
  closeSuggestions();
});

// --- Painel de sugestões (popover no desktop / bottom sheet no mobile) ---
const suggestionsBtn = document.querySelector('#suggestionsBtn');
const suggestionsPanel = document.querySelector('#suggestionsPanel');
const suggestionsClose = document.querySelector('#suggestionsClose');
const suggestionsOverlay = document.querySelector('#suggestionsOverlay');
const suggestionsList = document.querySelector('#suggestionsList');

function openSuggestions() {
  if (!suggestionsPanel) return;
  suggestionsPanel.classList.add('open');
  suggestionsPanel.setAttribute('aria-hidden', 'false');
  if (suggestionsOverlay) suggestionsOverlay.hidden = false;
  if (suggestionsBtn) suggestionsBtn.setAttribute('aria-expanded', 'true');
}
function closeSuggestions() {
  if (!suggestionsPanel) return;
  suggestionsPanel.classList.remove('open');
  suggestionsPanel.setAttribute('aria-hidden', 'true');
  if (suggestionsOverlay) suggestionsOverlay.hidden = true;
  if (suggestionsBtn) suggestionsBtn.setAttribute('aria-expanded', 'false');
}
if (suggestionsBtn) {
  suggestionsBtn.addEventListener('click', () => {
    suggestionsPanel.classList.contains('open') ? closeSuggestions() : openSuggestions();
  });
}
if (suggestionsClose) suggestionsClose.addEventListener('click', closeSuggestions);
if (suggestionsOverlay) suggestionsOverlay.addEventListener('click', closeSuggestions);

// Preenche o painel com todas as sugestões.
if (suggestionsList) {
  SUGGESTIONS.forEach((s) => suggestionsList.appendChild(buildSuggestionCard(s)));
}

// --- Menu lateral (drawer) no mobile ---
function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('open');
  if (sidebarOverlay) sidebarOverlay.hidden = false;
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
}
function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('open');
  if (sidebarOverlay) sidebarOverlay.hidden = true;
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
}
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeSidebar(); closeSuggestions(); }
});

chatForm.addEventListener('submit', handleSubmit);

// Enter envia a mensagem; Shift + Enter quebra a linha.
questionInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

// Ajusta a altura do campo conforme o texto digitado.
function autoResizeInput() {
  questionInput.style.height = 'auto';
  questionInput.style.height = Math.min(questionInput.scrollHeight, 150) + 'px';
}
questionInput.addEventListener('input', autoResizeInput);

// Define o estado visual do status: 'demo', 'online' ou 'fallback'.
// Atualiza todos os indicadores (sidebar + faixa mobile).
function setConnectionState(state) {
  const labels = {
    demo: 'Modo demonstração',
    online: 'IA conectada',
    fallback: 'Usando fallback local'
  };
  statusBadges.forEach((badge) => {
    badge.classList.remove('demo', 'online', 'fallback');
    badge.classList.add(state);
  });
  statusTexts.forEach((el) => { el.textContent = labels[state] || 'Verificando...'; });
}

// Estado inicial conforme a configuração (demo x IA conectada).
function updateConnectionStatus() {
  setConnectionState(isDemoMode() ? 'demo' : 'online');
}

clearButton.addEventListener('click', () => {
  const confirmed = confirm('Deseja apagar o histórico desta conversa?');
  if (!confirmed) return;
  history = [];
  saveHistory();
  renderChat();
});

summaryButton.addEventListener('click', generateSummary);

// =========================================================
// Tema claro / escuro
// =========================================================
const THEME_KEY = 'copiloto_corporativo_theme';

// Aplica o tema no <html> e ajusta os ícones/aria dos botões de alternância.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggles.forEach((btn) => {
    const icon = btn.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  });
}

// Descobre o tema inicial: preferência salva ou preferência do sistema.
function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
}

themeToggles.forEach((btn) => btn.addEventListener('click', toggleTheme));

// Inicialização
initTheme();
updateConnectionStatus();
renderChat();
