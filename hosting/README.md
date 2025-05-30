
Para importar o projeto do Git hub primeiro é necessário garantir ele está instalado
No VS Code abre o terminal, acess uma e digite git --version, senão reconhecer o comando é necessário instalar o Git hub
Acesse o link e realize a instalação https://git-scm.com/downloads/win
Após a instalação digite novamente o comando git --version, se a instalação foi realizada com sucesso então ele exibirá a versão do Git hub

Importando o projeto do Github
No seu computador selecione uma pasta onde clonar o projeto, de preferência crie uma nova pasta
Dentro da pasta clique com o botão direito do mouse e selecione a opção Open Git Bash here e digite o comando abaixo
git clone https://github.com/kurdt51/hackathon_sub.git
Se você já está mais familiarizado com os comandos pode executar este processo direto pelo VS Code.

O comando git clone irá copiar o projeto do Git hub para a pasta, feito isso acesso o VS code para configurar o projeto, instalar as dependências e executar o projeto.

Para configurar o projeto é necessário criar um novo projeto no Firebase

Após configurar seu projeto no Firebase você já tem os dados para inserir no firebaseConfig.js

Para encontrar essas informações no Firebase você pode acessar o menu de Configurações -> Configurações do projeto e na aba Geral você terá as configurações para inserir como o exemplo abaixo

Configurando o Firebase no projeto

1 – hosting -> src -> services -> firebaseConfig.js
Inserir as informações abaixo
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""

Salve a configuração

Para configurar o SDK siga os passos abaixo
Configurações -> Configurações do projeto
Acesse a aba Contas de serviço
Clique na opção Gerar nova chave privada

Selecione a pasta onde você salvou o projeto, dentro da estrutura
hackathon_sub\hosting\src\services

Após salvar a chave gerada volte para o VS Code e acesse
hosting -> src -> services
aqui a sua nova chave já deve estar visível, agora é necessário configurar ela no projeto

Dentro do hosting -> src -> services abra o arquivo firebaseAdmin.js
Copie o nome arquivo com a sua extensão e cole no caminho dentro das ‘’
const serviceAccount = JSON.parse(
  await readFile(new URL(‘’, import.meta.url))
);

Para instalar as dependências vá na pasta hosting, abra um novo terminal e digite o comando
npm install
o comando irá ler o arquivo package.json e instalar todas as dependências

Após instalar as dependências necessárias já podemos iniciar o projeto
Primeiro precisamos iniciar o servidor, para isso vá para a pasta services e abra um novo terminal nela
Digite o comando node server.js
Se tudo funcionou corretamente será exibida a mensagem “Servidor rodando na porta 3001”
Segundo passo é retornar para a pasta src, abrir outro terminal e digitar o comando
npm run dev
Se tudo foi instalado corretamente será exibido o link para acesso local da aplicação web, algo como http://localhost:5173/

Na tela inicial você criar um novo cadastro ou utilizar os usuários fornecidos abaixo:

Médico
medicoteste@teste.com
Teste@123

Paciente
testepaciente@teste.com
Teste@123

Usuário Admin para realizar o cadastro de hospitais
admin@healthtrack.com
Admin@2025

Para poder testar o link “Esqueceu sua senha?” é necessário cadastrar um usuário com um e-mail válido para que você possa receber o link.


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
  
