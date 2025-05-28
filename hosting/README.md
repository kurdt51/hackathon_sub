

Funcionalidades

Ao realizar o cadastro de novas contas você pode selecionar as opções médico ou paciente, cada uma exibe um formulário diferente.
No momento do cadastro você seleciona também um hospital, ele que faz a ligação entre médico e paciente.

Na tela de login é possível criar uma nova conta, recuperar sua senha via e-mail e realizar o acesso para a área de médico ou de paciente, de acordo com o que foi cadastrado.

As informações de usuário e senha ficam salvas no Fisebase Authentication e as demais informações no Firestore Database.

Existe uma tela que pode ser acessada apenas pelo administrador, nessa tela que podemos cadastrar novos hospitais.

Todas as informações sensíveis são protegidas na pasta routes no AppRoutes.jsx, onde estão protegidas pelo private routes.

Dependências
  "axios": "^1.9.0",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "firebase": "^11.7.3",
    "firebase-admin": "^13.4.0",
    "node": "^20.19.2",
    "node.js": "^0.0.1-security",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-firebase-hooks": "^5.1.1",
    "react-router-dom": "^7.6.0",
    "react-toastify": "^11.0.5",
    "sweetalert": "^2.1.2",
    "sweetalert2": "^11.21.2"
    
Para iniciar o projeto é necessário primeiro executar o servidor, na pasta services você precisa abrir um terminal no server.js e executar o comando node server.js

Quando exibir a mensagem de que o servidor está rodando você retorna para a pasta src, abre o terminal e executa o comando npm run dev

