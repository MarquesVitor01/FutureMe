# Front-end

# Projeto de Gestão de Projetos
Este projeto é uma aplicação web para gerenciar projetos, incluindo autenticação de usuários, criação, edição e exclusão de projetos. A aplicação é integrada com o Firebase para autenticação e armazenamento de dados.

# Link para acesso web/ deploy realizado no vercel: https://future-me-5nhg.vercel.app
# Login de test: email: test@test.com / senha: test123. Já possui algumas tarefas criadas, realize os tipos de tests necessários.  
# Link da Planilha do Google Sheets: https://docs.google.com/spreadsheets/d/1eNtfLLqweCQJNV6-E3JspPCgRn1HIV1YZVWIhItBxTc/edit?gid=0#gid=0 

# Sobre o Projeto 
Autenticação: A aplicação permite login de usuários utilizando email e senha, com verificação de erros durante o login (ex: usuário não encontrado, senha incorreta).
Gerenciamento de Projetos: A aplicação permite criar, editar, excluir e listar projetos. Os dados dos projetos são armazenados no Firebase Firestore.
Animações e UI: Utiliza Framer Motion para adicionar animações suaves nas transições e no carregamento da página.

## Instruções de Execução

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js** (versão 14 ou superior)
- **Yarn** (opcional, mas recomendado)
  
### Passos para execução
1. Clone o repositório:
   ```bash
   git clone <URL do seu repositório>
   cd <diretório do projeto>
2. Instale as dependências: Se estiver utilizando npm:
    npm install / yarn install
3. Crie um arquivo .env.local na raiz do projeto e adicione suas credenciais do Firebase (veja a seção Variáveis de Ambiente).
4. Execute a aplicação
    npm run dev / yarn dev
5. Abra o navegador e acesse http://localhost:3000 para ver a aplicação em funcionamento.

## Arquitetura do Projeto
O projeto segue uma arquitetura modular, com foco na separação de responsabilidades:
Front-End: A aplicação utiliza o Next.js para renderização lado cliente e servidor, com integração com Firebase.
Autenticação: A autenticação dos usuários é gerenciada pelo Firebase Authentication.
Banco de Dados: Utiliza-se o Firebase Firestore para armazenamento e consulta de dados.
Estilização: A interface foi construída com TailwindCSS para flexibilidade e responsividade.
Animações: A biblioteca Framer Motion foi utilizada para adicionar animações interativas.

## Tecnologias Utilizadas
Next.js: Framework React para a criação de aplicações com renderização do lado do servidor (SSR).
Firebase: Serviço de backend para autenticação e banco de dados em tempo real (Firestore).
TailwindCSS: Framework de CSS utilitário para criação de interfaces rápidas e responsivas.
Framer Motion: Biblioteca para animações e transições suaves nas interfaces.
React Hook Form: Para o gerenciamento de formulários.

## Bibliotecas Utilizadas
react: Biblioteca principal para a construção de interfaces.
firebase: SDK do Firebase para autenticação e banco de dados.
react-hook-form: Para controle de formulários.
tailwindcss: Framework para estilização rápida.
framer-motion: Para animações de UI.
next: Framework para desenvolvimento de aplicações React com SSR.

## Configuração do Firebase
Para que a aplicação funcione corretamente, você precisa configurar um projeto no Firebase.
Crie um projeto no Firebase Console.
Habilite o método de autenticação por Email/Senha em Authentication.
Crie uma coleção no Firestore chamada projetos para armazenar os dados dos projetos.
No painel de Configurações do Firebase, copie as credenciais do Firebase e adicione no arquivo .env.local da raiz do seu projeto.

# Exemplo de .env.local:
(test)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAxOtoflY3758coCKU3Zximu8Y4gvWL0Ec
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=desafio-futureme.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=desafio-futureme
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=desafio-futureme.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=247916946223
NEXT_PUBLIC_FIREBASE_APP_ID=1:247916946223:web:238f6225da24e7674577da

## Estrutura de Pastas
/components             # Componentes reutilizáveis
  /auth                 # Componentes de login e autenticação
  /layout               # Layouts e elementos compartilhados
  /project              # Componentes relacionados ao gerenciamento de projetos
/pages                  # Páginas da aplicação
  /home                 # Página inicial após login
  /login                # Página de login
/lib                    # Funções e integrações com Firebase
/context                # Contextos globais, como autenticação


# Backend para Sincronização de Dados com Google Sheets

Este projeto backend é responsável por sincronizar dados de projetos armazenados no Firestore com uma planilha no Google Sheets. Ele foi desenvolvido utilizando Node.js, Express, Firebase e Google Sheets API. A aplicação permite a verificação de dados modificados recentemente e a sincronização com a planilha, garantindo que apenas novos dados ou dados modificados sejam enviados.

## Arquitetura do Projeto

O projeto segue a seguinte estrutura:

- **Express.js**: Framework para a criação das rotas e manipulação das requisições HTTP.
- **Firebase**: Usado para interagir com o banco de dados Firestore e autenticação.
- **Google Sheets API**: Usada para ler e escrever dados na planilha do Google Sheets.
- **dotenv**: Para carregar variáveis de ambiente a partir de um arquivo `.env`.

### Estrutura do Backend

O backend é composto por vários arquivos e funções, conforme descrito abaixo:

1. **Rota `/api/sync`**:
   - **POST /api/sync**: Recebe dados e sincroniza com o Google Sheets. Ela verifica se há dados novos ou alterados e os adiciona à planilha.
   
2. **Serviços**:
   - **googleSheetsService.js**:
     - `getExistingIdsFromSheet`: Recupera os IDs existentes na planilha para evitar duplicações.
     - `writeToSheet`: Adiciona novos dados à planilha.
   - **marketingService.js**:
     - `fetchProjetoData`: Obtém os dados dos projetos do Firestore.
     - `checkForChanges`: Verifica alterações nos dados dos projetos e atualiza a planilha.
   - **firebaseService.js**: Inicializa a conexão com o Firebase e configura as credenciais.

3. **Variáveis de ambiente**:
   - O arquivo `.env` contém as credenciais para o Firebase, Google Sheets e outras configurações necessárias.

## Requisitos

- Node.js 14 ou superior
- Conta no Firebase com Firestore configurado
- Conta do Google com acesso à API do Google Sheets
- Acesso ao serviço de Planilhas Google através da API

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL-do-repositório>
   cd <diretório-do-projeto>

2. Instale as dependências:
   npm install
   
3.Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias:
  (test)
  TYPE_2=service_account
  PROJECT_ID_2=crm-maps-593d1
  PRIVATE_KEY_ID_2=19f474e3592872d8f9181ca8b6a7cf90e73d0f95
  PRIVATE_KEY_2="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuy543Vv7bi21V\nYJ8a3qyQ684u4WGl4xPekQIDKs7PE7Sk7AoJO1MdnfhkISanKp4+qbm3HMlgfde0\n10OONVKRhua2Htdkosr+IVceSJkkXfoLh5GiifS9Jv91XGTUIZjGOlKgoEEUvPaM\nZbPs7NSmf2pk+yELd2HwyqKDfBUI5Iy2xRoE5jbMEddtcunwx1G6s17UzGFkPBiE\nlPTv8iXe0jXW/C+DHAmD14JN2k7os+trC05uwyL5Yb+MAdXnFAQguo+PwPMNHjSq\n+cf8TWEU1ZqyTeCi7bKG1NWe2Cu9NU5/X/T/TOpx1lvHI1jUPPf792rFX+kLeWJm\nN9S3hEyPAgMBAAECggEAMLrOUHI92bnckK0/ne+PH1XF5NbrcKJGM0mszHI+Noex\nWDr/r0QtLzgPe+asDnV4qVKK1kw9rdtXa/CJQleGPdDkd8hQVxt1SPTFg0lM/FEA\nuP8h8DTSmHsLQ84uw97b5wNybppOmnf1qf1edEIwJHyoDh/evgIZuVXciZhpitEq\njDQGyMEMUZA8wATj2tWCzL4n1pzzSWo/7e0HVWfNFzzaHUT2UFSlIPTDsDz0YAUo\nyWBqg3u4g9uM5yhXyhd+/uF0sqBQIOqXQsfJdwmzbzE+wa0aLClmTpM/jWubHXlK\nNZ+c4sXajU0H1742k8awNHgvp5rR+6+EIb+mgsYelQKBgQDbj56f9vSMaZpXKSi/\nkniUDnw8AnG7dps0q89J63Zz1jgytiv2VIcplyfXkDkIV/jVyllF5f8zXxWtyvrv\nK2N626Id/G2eFxuSsBJKdLseRn8ZrAhMYxWIQPvhdNnHeIDKFe0zjoZwt0vOYusl\nCv/J/F7ZFF6+Wyv70MMhM3bmZQKBgQDLzhAp06hpXnVsRL49ZmwWIbtVurLIa3lC\nnoFX80gwSseLkKOsEQKxD6deujrrPNtFn8gm+6TH8tmTkbEvi7BL+kYe3Q/Mk0Yo\n0OrrdeLkNTHpzDsAnm3YWNbpzNBge+71ER0/1ZQtFS51a7Nzi9ml7Ae8YYC05kvZ\nFVfjvrlt4wKBgBGC6+jgPnLwfUHUY46b9QgB+8ChhUapWAmkZl0D7aehf0v0IZ98\n8GbNynyz4QicU5lhkSs1A9yqCcWZudfXgxCqccyodGm2eBmD94F+u+nXP43hnavR\n/0alwDEkK7ZwEv2LMCb7iBd3VxF37D9BGFOY0EvKByBxjxl/dgCw5RvNAoGBAI9C\nxnHgap3G3FvC5sdaW9gi1gCpQEtJ4O9HZDxisvffWO1uOt8VBgNYsZoQ5qG9IZWL\nf7KHaYlz2CW3YAm/86k0wF2pnxV64PKICNqC/37TNcbW3RLOSwCtUkT+x+tKsupp\noVnh1ErsfL/leTtbrx7HD5kIIOUIjYCHVESvKMFpAoGBAKkxhPnJwgqkDoSfOYzf\nYx1yk7PxCuly5t6lj4UDRxFvof37q7LI+GEAmuiegPDbyw6TR/sLlkXcCmVjI8EK\ns4vZ2G1XWY1kxFV6hBYQ9hdzgjfHNdk4IQpNnZBtTiwnfRzOKs79Zy9B7ZAc05aw\nflDKigMEGcAUj/wvy9ueT8oI\n-----END PRIVATE KEY-----\n"
  CLIENT_EMAIL_2="firebase-adminsdk-c3nwi@crm-maps-593d1.iam.gserviceaccount.com"
  CLIENT_ID_2=114667305570009171583
  AUTH_URI_2="https://accounts.google.com/o/oauth2/auth"
  TOKEN_URI_2="https://oauth2.googleapis.com/token"
  AUTH_PROVIDER_X509_CERT_URL_2="https://www.googleapis.com/oauth2/v1/certs"
  CLIENT_X509_CERT_URL_2="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-c3nwi%40crm-maps-593d1.iam.gserviceaccount.com"
  UNIVERSE_DOMAIN_2=googleapis.com
4. Execute o servidor:
   npm start

## Funcionamento
  Rota de Sincronização
A única rota de API disponível é:
POST /api/sync:
Descrição: Recebe um corpo JSON com um array de dados a ser sincronizado.
Body:
{
  "data": [
    {
      "id": "1",
      "name": "Projeto Exemplo",
      "description": "Descrição do projeto",
      "textColor": "#FF5733"
    }
  ]
}
Resposta:
200 OK: Se os dados forem sincronizados com sucesso.
400 Bad Request: Se nenhum dado for fornecido ou se o formato não for válido.
500 Internal Server Error: Se ocorrer algum erro durante a sincronização.


## Verificação de Alterações
O serviço checkForChanges verifica periodicamente se houve novas alterações nos dados dos projetos no Firestore e, se houver, atualiza a planilha do Google Sheets com esses dados. Essa verificação leva em consideração se o projeto foi recentemente alterado (última alteração dentro de uma hora).

## Como Funciona a Sincronização
### Sincronização de Dados:
A aplicação verifica quais dados da coleção de projetos no Firestore ainda não estão presentes na planilha do Google Sheets (com base no ID).
Se houver dados novos, a aplicação os adiciona à planilha.
### Prevenção de Duplicação:
A sincronização verifica se os dados já existem na planilha utilizando o ID do projeto, evitando duplicações.
### Alterações Recentes:
A sincronização também verifica se os dados foram alterados recentemente (última modificação dentro de 1 hora) para garantir que as alterações sejam refletidas na planilha.
### Bibliotecas Utilizadas
Express: Framework para construção de APIs.
Firebase: Plataforma para o gerenciamento de banco de dados e autenticação.
Google Sheets API: Biblioteca oficial para interagir com o Google Sheets.
dotenv: Carrega as variáveis de ambiente.
CORS: Middleware para habilitar CORS no servidor Express.
axios: (Se for necessário para consumir APIs externas, por exemplo)

## Considerações Finais
Este backend foi projetado para gerenciar dados de projetos, integrando-se ao Firebase e ao Google Sheets de forma simples e eficiente. Ele lida com a sincronização de dados, garantindo que a planilha seja atualizada apenas com dados novos ou modificados.
Caso haja necessidade de expandir ou modificar a integração com o Firebase ou o Google Sheets, basta ajustar os serviços e rotas conforme necessário.




