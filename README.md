# Dashboard — Cadeia de Valor

Dashboard estático (HTML/CSS/JS puro) com persistência de dados no **Firebase Firestore**, pronto para publicar gratuitamente no **GitHub Pages**.

## Estrutura do projeto

```
dashboard-cadeia-valor/
├── index.html          # O dashboard (não precisa editar)
├── config.js            # Suas credenciais do Firebase (você vai criar)
├── config.example.js    # Modelo do config.js
├── firestore.rules      # Regras de segurança do banco (cole no console do Firebase)
└── .gitignore
```

O `index.html` já está preparado para carregar `./config.js` antes do SDK do Firebase (veja a tag `<script src="./config.js">` perto do fim do arquivo). Sem esse arquivo, o dashboard funciona salvando só no navegador (localStorage); com ele, passa a salvar/ler do Firestore.

---

## Parte 1 — Criar o projeto no Firebase

1. Acesse **https://console.firebase.google.com/** e faça login com sua conta Google.
2. Clique em **"Adicionar projeto"**, dê um nome (ex.: `cadeia-valor-dashboard`) e siga o assistente (pode desativar o Google Analytics, não é necessário).
3. Dentro do projeto, no menu lateral, clique em **Build > Firestore Database**.
4. Clique em **"Criar banco de dados"**.
   - Escolha o modo **produção** (as regras de segurança serão definidas manualmente no Passo 3).
   - Escolha a localização (ex.: `southamerica-east1` para servidores no Brasil).
5. Ainda no menu lateral, vá em **Configurações do projeto** (ícone de engrenagem) > **Geral**.
6. Role até **"Seus apps"** e clique no ícone **`</>`** (Web) para registrar um novo app.
   - Dê um apelido (ex.: `dashboard-web`) e clique em **Registrar app**.
   - **Não** marque a opção de Firebase Hosting (vamos usar o GitHub Pages).
7. O Firebase vai mostrar um bloco de código parecido com este — **copie-o**, você vai precisar dele no Passo 2:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "cadeia-valor-dashboard.firebaseapp.com",
  projectId: "cadeia-valor-dashboard",
  storageBucket: "cadeia-valor-dashboard.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

> **Essas chaves não são secretas.** É normal e esperado que o `apiKey` de um app Firebase web fique visível no código-fonte do site. Quem protege seus dados de verdade são as **Regras do Firestore** (Parte 3), não o sigilo dessas chaves.

---

## Parte 2 — Criar o arquivo `config.js`

1. Nesta pasta do projeto, faça uma cópia de `config.example.js` e renomeie para `config.js`.
2. Abra `config.js` e cole os valores que você copiou no Passo 1.7 dentro de `FIREBASE_CONFIG`:

```js
window.DASHBOARD_CONFIG = {
  FIREBASE_CONFIG: {
    apiKey: "AIzaSy...",
    authDomain: "cadeia-valor-dashboard.firebaseapp.com",
    projectId: "cadeia-valor-dashboard",
    storageBucket: "cadeia-valor-dashboard.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  },
  DASHBOARD_KEY: "cadeia_valor_principal",
  FIRESTORE_COLLECTION_CURRENT: "cadeia_valor_current",
  FIRESTORE_COLLECTION_HISTORY: "cadeia_valor_history"
};
```

3. Salve o arquivo. **Não delete os placeholders `COLE_AQUI` sem substituí-los** — o dashboard verifica isso para saber se o Firestore está configurado.

---

## Parte 3 — Configurar as regras de segurança do Firestore

1. No Firebase Console, vá em **Firestore Database > Regras** (aba "Rules").
2. Apague o conteúdo padrão e cole o conteúdo do arquivo `firestore.rules` deste projeto.
3. Clique em **Publicar**.

Isso libera leitura/gravação nas duas coleções usadas pelo dashboard (`cadeia_valor_current` e `cadeia_valor_history`) e bloqueia qualquer outra coleção.

> ⚠️ Essas regras liberam acesso para **qualquer pessoa com o link do site**. É adequado para uso interno, piloto ou dashboard sem dado sensível. Se quiser restringir por senha/login, veja a seção **"Deixar mais seguro (opcional)"** no fim deste documento.

---

## Parte 4 — Publicar no GitHub

1. Crie uma conta em **https://github.com** (se ainda não tiver) e crie um **novo repositório** (ex.: `cadeia-valor-dashboard`), público, sem README/gitignore automáticos (vamos usar os desta pasta).

2. No seu computador, abra o terminal dentro desta pasta (`dashboard-cadeia-valor`) e rode:

```bash
git init
git add .
git commit -m "Primeira versão do dashboard"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/cadeia-valor-dashboard.git
git push -u origin main
```

Troque `SEU-USUARIO` e o nome do repositório pelos seus dados reais.

3. Confirme que o arquivo `config.js` (com suas credenciais reais) subiu junto — ele **precisa** estar no repositório para o site publicado conseguir se conectar ao Firestore.

---

## Parte 5 — Ativar o GitHub Pages

1. No GitHub, entre no repositório > **Settings** > **Pages** (menu lateral).
2. Em **"Build and deployment" > Source**, escolha **"Deploy from a branch"**.
3. Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.
4. Aguarde 1–2 minutos. O GitHub vai mostrar a URL pública, algo como:

```
https://SEU-USUARIO.github.io/cadeia-valor-dashboard/
```

5. Abra essa URL. O dashboard deve carregar e, se tudo estiver certo, o indicador de status não vai mostrar "Configurar Firestore no config.js".

---

## Parte 6 — Testar a integração com o Firestore

1. No dashboard publicado, preencha algum campo e clique em **Salvar**.
2. Volte ao Firebase Console > Firestore Database > **Dados**.
3. Você deve ver as coleções `cadeia_valor_current` e `cadeia_valor_history` com um documento contendo os dados salvos.
4. Use o botão de carregar/versões no dashboard para confirmar que os dados voltam corretamente.

---

## Atualizando o dashboard no futuro

Sempre que editar `index.html` (ou qualquer arquivo), rode:

```bash
git add .
git commit -m "Descreva o que mudou"
git push
```

O GitHub Pages atualiza o site publicado automaticamente em cerca de 1 minuto.

---

## Deixar mais seguro (opcional)

As regras da Parte 3 liberam leitura/escrita pública. Duas formas simples de reforçar isso mais tarde, sem reescrever o dashboard:

- **Restringir a chave de API por domínio**: no Google Cloud Console > APIs e Serviços > Credenciais, edite a chave do Firebase e restrinja "Referenciadores HTTP" ao domínio `SEU-USUARIO.github.io/*`. Isso impede que a chave seja usada fora do seu site.
- **Exigir login (Firebase Authentication)**: adicionar um login simples (ex.: e-mail/senha ou Google) e trocar as regras para `allow read, write: if request.auth != null;`. Isso exige uma tela de login extra, que não está implementada neste `index.html` — avise se quiser que eu adicione.

---

## Resolução de problemas

| Sintoma | Causa provável |
|---|---|
| "Configurar Firestore no config.js" aparece no site publicado | `config.js` não foi enviado ao GitHub, ou ainda tem `COLE_AQUI` |
| Erro "Falha no Firestore" ao salvar | Regras do Firestore não publicadas, ou `projectId` errado no `config.js` |
| Site em branco no GitHub Pages | Verifique se o Pages está apontando para a branch/pasta certa e aguarde alguns minutos |
| Dados somem ao trocar de navegador | Esperado se o Firestore não estiver configurado — sem ele, o salvamento é só local (localStorage) |
