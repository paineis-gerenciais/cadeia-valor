// ============================================================
// CONFIG DE EXEMPLO — Cadeia de Valor
// ============================================================
// 1) Copie este arquivo e renomeie a cópia para "config.js"
// 2) Preencha os valores abaixo com as credenciais do SEU
//    projeto Firebase (Console Firebase > Configurações do
//    projeto > Seus apps > SDK setup and configuration).
// 3) NUNCA apague o arquivo "config.js" do .gitignore se o seu
//    repositório for público e você quiser esconder as chaves
//    (embora, no Firebase, essas chaves não sejam secretas —
//    a segurança real é feita pelas Regras do Firestore).
// ============================================================

window.DASHBOARD_CONFIG = {
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyAgm1l4RAr9SvE-AUjG_kKsEKajvm2qTKQ",
    authDomain: "cadeia-valor.firebaseapp.com",
    projectId: "cadeia-valor",
    storageBucket: "cadeia-valor.firebasestorage.app",
    messagingSenderId: "261554487757",
    appId: "1:261554487757:web:14db40017cfd5c8f848484"
  },

  // Identificador único deste dashboard dentro do Firestore.
  // Se um dia você quiser publicar VÁRIOS dashboards usando o
  // mesmo projeto Firebase, basta usar uma chave diferente em
  // cada config.js (ex.: "cadeia_valor_secretaria_x").
  DASHBOARD_KEY: "cadeia_valor_principal",

  // Nomes das coleções no Firestore (pode deixar como está).
  FIRESTORE_COLLECTION_CURRENT: "cadeia_valor_current",
  FIRESTORE_COLLECTION_HISTORY: "cadeia_valor_history"
};
