# codemyAI

**codemyAI** é um chatbot inteligente feito com React, Tailwind CSS, Node.js e Express, que utiliza a API da OpenAI para gerar respostas automáticas e contextuais. O sistema mantém o histórico das conversas no navegador via `localStorage` e oferece uma interface com navegação por sidebar para facilitar o uso.

---

## Funcionalidades

- Chat em tempo real com respostas geradas por IA (OpenAI GPT)  
- Armazenamento local do histórico de conversas  
- Interface responsiva com React e Tailwind CSS  
- Backend em Node.js/Express para comunicação com a API da OpenAI  
- Navegação entre conversas anteriores via sidebar  
- Scrollbars personalizadas para melhor experiência visual  

---

## Tecnologias

- React  
- Tailwind CSS  
- Node.js  
- Express  
- Axios  
- OpenAI API  
- localStorage  

---

## Instalação

1. Clone o repositório  
```bash
git clone https://github.com/seu-usuario/codemyAI.git
Entre na pasta do projeto

bash
Copiar
Editar
cd codemyAI
Instale as dependências do front-end

bash
Copiar
Editar
cd frontend
npm install
Instale as dependências do back-end

bash
Copiar
Editar
cd ../backend
npm install
Configuração da chave da OpenAI
Para o chatbot funcionar, você precisa ter uma chave da API da OpenAI.

Crie um arquivo .env dentro da pasta backend/

Adicione a seguinte linha, substituindo pela sua chave real:

env
Copiar
Editar
OPENAI_API_KEY=sua_chave_aqui
Atenção
Nunca envie seu arquivo .env para o GitHub!

Adicione .env no arquivo .gitignore para proteger suas credenciais.

Seu código acessa a chave via process.env.OPENAI_API_KEY no backend.

Em ambientes de produção (Heroku, Vercel etc), configure as variáveis de ambiente pela plataforma, sem subir o .env.

Uso
Inicie o servidor back-end

bash
Copiar
Editar
npm start
Inicie o front-end

bash
Copiar
Editar
cd ../frontend
npm start
Abra o navegador em http://localhost:3000 para usar o chatbot.

Contribuição
Contribuições são bem-vindas! Abra uma issue ou envie um pull request para melhorias e correções.

Licença
Este projeto está licenciado sob a licença MIT.

Desenvolvido por Gerson Fernandes