/**
 * Copiloto Corporativo Inteligente - Backend Google Apps Script
 *
 * Como configurar:
 * 1. Abra https://script.google.com
 * 2. Crie um novo projeto.
 * 3. Cole este código no arquivo Code.gs.
 * 4. Em Configurações do projeto > Propriedades do script, crie:
 *    Nome: GEMINI_API_KEY
 *    Valor: sua chave da API Gemini
 * 5. Publique como Web App.
 */

// Modelo Gemini. 'gemini-2.5-flash' é rápido e econômico.
// Você pode trocar por 'gemini-2.5-pro' se quiser respostas mais elaboradas.
const MODEL_NAME = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

// Limites de segurança para evitar abuso e requisições muito grandes.
const MAX_QUESTION_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 4000;
const MAX_KNOWLEDGE_LENGTH = 6000;

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Requisição sem dados. Envie a pergunta no corpo (POST).');
    }

    const requestBody = JSON.parse(e.postData.contents);
    const answer = callGemini(requestBody);

    return jsonResponse({
      success: true,
      answer: answer,
      source: 'gemini',
      model: MODEL_NAME
    });
  } catch (error) {
    // Não registramos o conteúdo da pergunta em log para não expor dados.
    return jsonResponse({
      success: false,
      error: error.message || 'Erro inesperado no servidor.'
    });
  }
}

function doGet() {
  return jsonResponse({
    status: 'online',
    app: 'Copiloto Corporativo Inteligente'
  });
}

function callGemini(data) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

  if (!apiKey) {
    throw new Error('O serviço de IA ainda não foi configurado (chave ausente). Tente novamente mais tarde.');
  }

  const question = String(data.question || '').trim();
  if (!question) {
    throw new Error('A pergunta está vazia. Digite uma pergunta para continuar.');
  }

  const prompt = buildPrompt(data);

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.25,
      topP: 0.9,
      // Orçamento de saída ampliado para evitar respostas cortadas no meio.
      maxOutputTokens: 1500,
      // Desliga o "pensamento" do modelo (gemini-2.5-flash) para que todo o
      // orçamento de tokens seja usado na resposta visível, evitando truncamento.
      // As respostas continuam curtas por causa das instruções do prompt.
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-goog-api-key': apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(GEMINI_ENDPOINT, options);
  const status = response.getResponseCode();
  const text = response.getContentText();

  if (status < 200 || status >= 300) {
    // Mensagem amigável ao usuário; o detalhe técnico fica só no log do Apps Script.
    console.warn('Falha na chamada ao Gemini. Status: ' + status);
    throw new Error('O serviço de IA está indisponível no momento (código ' + status + '). Tente novamente em instantes.');
  }

  const json = JSON.parse(text);
  const candidate = json.candidates && json.candidates[0];
  const part = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0];
  const answer = part && part.text;

  if (!answer) {
    throw new Error('A resposta da IA veio vazia ou em formato inesperado.');
  }

  return answer;
}

function buildPrompt(data) {
  // Corta o texto para respeitar os limites de tamanho antes de montar o prompt.
  const question = sanitizeText(data.question || '').slice(0, MAX_QUESTION_LENGTH);
  const agent = sanitizeText(data.agent || 'geral').slice(0, 60);
  const knowledgeBase = sanitizeText(data.knowledgeBase || 'Base não informada.').slice(0, MAX_KNOWLEDGE_LENGTH);
  const historySummary = sanitizeText(data.historySummary || 'Sem histórico.').slice(0, MAX_HISTORY_LENGTH);
  const isSummary = Boolean(data.isSummary);

  if (isSummary) {
    return `
Você é um copiloto corporativo especializado em resumir atendimentos internos.

Tarefa:
Gere um resumo executivo da conversa abaixo em português do Brasil.

Regras:
- Liste os principais assuntos tratados.
- Destaque decisões ou orientações fornecidas.
- Informe próximos passos recomendados.
- Não invente informações.
- Não inclua dados sensíveis.

Histórico da conversa:
${historySummary}
`;
  }

  return `
Você é um Copiloto Corporativo Inteligente que apoia colaboradores.
Responda em português do Brasil, de forma clara, objetiva e profissional.
Entregue sempre uma resposta completa e curta: não encerre frases pela metade e conclua o raciocínio antes de terminar.

Regras de conteúdo:
- Baseie-se na base de conhecimento fornecida.
- Se não houver base suficiente, dê uma resposta curta de limitação e encaminhe ao setor responsável, sem inventar procedimentos.
- Se a pergunta estiver relacionada a um tema coberto pela base, responda com uma orientação geral segura, seguindo as regras e cuidados daquele tema (mesmo que a pergunta use palavras diferentes das da base).
- Se não houver informação suficiente na base, diga que não encontrou um procedimento específico e oriente procurar o setor responsável. Para temas de TI, oriente abrir um chamado informando equipamento, local e descrição do problema.
- Não invente políticas, prazos, nomes, normas ou procedimentos técnicos específicos.
- Para temas sensíveis (formatar, restaurar HD, recuperar dados, reinstalar sistema, mexer no disco/partição), NÃO forneça passo a passo técnico; alerte sobre o risco de perda de dados e oriente abrir chamado de TI.
- Nunca solicite senhas ou dados sensíveis (CPF, dados bancários, dados pessoais) e oriente o usuário a não enviar esse tipo de dado no chat.
- Recuse, de forma breve e firme, pedidos ofensivos, discriminatórios, ilegais ou que comprometam a segurança (invadir sistema, descobrir/roubar senha de terceiros, criar malware, fraudar, etc.), sem repetir o conteúdo e sem ensinar a ação.
- As respostas são orientativas e devem ser validadas pelo setor responsável.

Perfil do agente selecionado: ${agent}

Base de conhecimento disponível:
${knowledgeBase}

Histórico resumido da conversa:
${historySummary}

Pergunta do colaborador:
${question}

Formato recomendado da resposta:
Categoria: [categoria]
Resposta: [orientação objetiva e útil]
Orientação final: [próximo passo ou cuidado]
`;
}

function sanitizeText(value) {
  return String(value)
    .replace(/<script/gi, '&lt;script')
    .replace(/<\/script>/gi, '&lt;/script&gt;')
    .trim();
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
