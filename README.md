# NOTIFICA-JAP
Projeto genérico de geração de PDF personalizado.

# Documentação do Projeto "NOTIFICA JAP - Versão Genérica"

## Visão Geral
O projeto "NOTIFICA JAP - Versão Genérica" é uma versão simplificada e não confidencial de um projeto original desenvolvido para fornecer um serviço de geração de notificações. Esta versão genérica é criada para ser incluída em um portfólio e demonstrar as habilidades e o conhecimento do desenvolvedor. A principal funcionalidade do projeto é gerar arquivos PDF personalizados com base em dados de formulário inseridos pelo usuário.

## Componentes Principais
O projeto consiste em vários componentes interconectados, incluindo:

### Frontend (HTML e JavaScript):
- O arquivo index.html é a página da web principal.
- O arquivo main.js contém o código JavaScript que interage com o HTML e realiza a validação dos dados do formulário, geração do PDF e comunicação com o servidor.

### Servidor (Node.js com Express.js):
- O arquivo server.routes.js define as rotas e endpoints do servidor para processar solicitações do cliente.
- O arquivo pdf.js é responsável pela geração de arquivos PDF com base nos dados do formulário.

### Comunicação Cliente-Servidor:
- O servidor lida com a definição e obtenção do valor do checkbox, bem como a geração de PDFs personalizados com base nos dados do formulário.

## Funcionamento
O funcionamento do projeto pode ser resumido nas seguintes etapas:

1. O usuário preenche o formulário com dados, incluindo um valor numérico, um nome, a seleção de uma opção de texto e a escolha de um único valor checkbox.

2. O código JavaScript no frontend, main.js, realiza a validação dos campos do formulário e envia os dados para o servidor por meio de solicitações HTTP.

3. O servidor, definido em server.routes.js, recebe as solicitações, processa os dados e gera um arquivo PDF personalizado com base nas informações do usuário. O valor do checkbox é usado para personalizar o conteúdo do PDF.

4. O arquivo PDF gerado é disponibilizado para download para o usuário.

## Funcionalidades
- Validação do formulário: O código JavaScript no frontend valida os campos do formulário, garantindo que o valor numérico seja um número, o nome não esteja em branco, uma opção de texto seja selecionada e apenas um valor checkbox seja escolhido.
- Geração de PDF: O servidor utiliza a biblioteca pdfkit para gerar arquivos PDF personalizados com base nos dados do formulário. O valor do checkbox influencia o conteúdo do PDF.
- Comunicação Cliente-Servidor: O servidor recebe solicitações do cliente para definir e obter o valor do checkbox. Isso permite que o servidor personalize o PDF com base nas escolhas do usuário.

## Pré-requisitos
Para executar o projeto em seu ambiente local, você precisa ter o Node.js instalado. Certifique-se de instalar todas as dependências do Node.js listadas no arquivo package.json antes de iniciar o servidor.

## Configuração
As configurações do servidor, como a porta em que o servidor irá escutar, estão definidas no arquivo server.routes.js.

## Uso
Para usar o projeto:

1. Clone o repositório em seu ambiente de desenvolvimento.
2. Execute `npm install` para instalar as dependências do Node.js.
3. Execute `npm start` para iniciar o servidor.
4. Acesse a página da web em [http://localhost:4000](http://localhost:4000) para usar o projeto.

## Avisos
Este projeto é uma versão genérica e não contém informações confidenciais. Ele foi criado para fins de portfólio e demonstração de habilidades de desenvolvimento. Qualquer referência ao servidor original com informações confidenciais é intencionalmente omitida.

## Autor
João Lucas Freitas - https://github.com/JLucasfn.

## Licença
Este projeto é licenciado sob a Licença CC BY-NC-ND.
