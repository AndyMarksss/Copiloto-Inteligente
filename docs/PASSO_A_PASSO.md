# Passo a passo de implantação

## Etapa 1 - Testar localmente

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão Live Server, se ainda não tiver.
3. Clique com o botão direito no arquivo `index.html`.
4. Clique em `Open with Live Server`.
5. Faça perguntas rápidas para testar o modo demonstração.

## Etapa 2 - Criar chave Gemini

1. Acesse o Google AI Studio.
2. Entre com sua conta Google.
3. Acesse a área de API Keys.
4. Crie uma nova chave.
5. Copie a chave e guarde temporariamente em local seguro.
6. Não cole a chave no `script.js`, no `index.html` ou no GitHub.

## Etapa 3 - Criar backend no Apps Script

1. Acesse https://script.google.com.
2. Clique em `Novo projeto`.
3. Renomeie para `Backend - Copiloto Corporativo`.
4. Apague o conteúdo inicial de `Code.gs`.
5. Cole o conteúdo do arquivo `appsscript/Code.gs`.
6. Salve o projeto.

## Etapa 4 - Adicionar propriedade da chave

1. No Apps Script, clique em `Configurações do projeto`.
2. Encontre a seção `Propriedades do script`.
3. Adicione uma propriedade:
   - Nome: `GEMINI_API_KEY`
   - Valor: sua chave Gemini
4. Salve.

## Etapa 5 - Publicar Apps Script como Web App

1. Clique em `Implantar`.
2. Clique em `Nova implantação`.
3. Escolha o tipo `App da Web`.
4. Em `Executar como`, selecione `Eu`.
5. Em `Quem pode acessar`, escolha `Qualquer pessoa`.
6. Clique em `Implantar`.
7. Autorize as permissões solicitadas.
8. Copie a URL do Web App.

## Etapa 6 - Conectar frontend ao backend

1. Abra o arquivo `script.js`.
2. Encontre esta linha:

```js
APPS_SCRIPT_URL: '',
```

3. Cole a URL do Web App entre as aspas:

```js
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/SEU_ID/exec',
```

4. Salve o arquivo.
5. Teste novamente pelo Live Server.

## Etapa 7 - Publicar no GitHub Pages

1. Crie um repositório público no GitHub.
2. Envie os arquivos do projeto.
3. Acesse `Settings` do repositório.
4. Clique em `Pages`.
5. Em `Build and deployment`, selecione publicar pela branch principal.
6. Aguarde o GitHub gerar o link.
7. Teste o link final em uma janela anônima.

## Etapa 8 - Prints obrigatórios

Tire prints de:

- Tela inicial;
- Pergunta sobre TI;
- Pergunta sobre RH;
- Pergunta sobre governança de IA;
- Resumo da conversa;
- Código no VS Code;
- Apps Script publicado;
- Repositório GitHub;
- GitHub Pages ativo.
