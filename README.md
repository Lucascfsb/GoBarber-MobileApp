# GoBarber - Mobile App

O **GoBarber** é um aplicativo mobile para gerenciamento de agendamentos de serviços de barbearia. Esta versão mobile é voltada para **clientes** e **prestadores de serviço**, oferecendo uma experiência simples e prática para acompanhar e gerenciar suas agendas.

---

## 📝 Sobre o Projeto

A aplicação mobile do **GoBarber** permite:  

- **Clientes:**  
  - Realizar login e cadastro.  
  - Visualizar horários disponíveis para agendamentos.  
  - Agendar serviços com prestadores.  
  - Consultar agendamentos futuros e passados.  

- **Prestadores de Serviços:**  
  - Acompanhar agendamentos diários.  
  - Gerenciar sua agenda em tempo real.  
  - Receber notificações sobre novos agendamentos.  

---

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

- **[React Native](https://reactnative.dev/)** para construção da interface mobile.  
- **[TypeScript](https://www.typescriptlang.org/)** para tipagem estática no JavaScript.  
- **[Axios](https://axios-http.com/)** para comunicação com a API.  
- **[React Navigation](https://reactnavigation.org/)** para gerenciamento de rotas.  
- **[Styled-components](https://styled-components.com/)** para estilização da aplicação.  
- **[Unform](https://unform.dev/)** para manipulação de formulários.  
- **[Yup](https://github.com/jquense/yup)** para validação de formulários.  
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** para interações gestuais.  
- **[React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)** para uso de ícones.  
- **[Eslint](https://eslint.org/)** e **[Prettier](https://prettier.io/)** para garantir a qualidade e padronização do código.  

---

## 🛠️ Estrutura do Projeto

Abaixo está a estrutura principal do projeto:

```plaintext
src/
├── @types/         # Declarações de tipos personalizados.
├── assets/         # Arquivos estáticos, como imagens.
├── components/     # Componentes reutilizáveis.
├── hooks/          # Hooks personalizados para gerenciamento de estado.
├── pages/          # Páginas da aplicação:
│   ├── AppointmentCreated/    # Confirmação de agendamento.
│   ├── CreateAppointment/     # Tela para agendar um serviço.
│   ├── Dashboard/             # Tela inicial com agendamentos.
│   ├── Profile/               # Gerenciamento de perfil do usuário.
│   ├── SignIn/                # Tela de login.
│   ├── SignUp/                # Tela de cadastro.
├── routes/         # Configuração de rotas.
├── services/       # Configuração de API (ex.: Axios).
├── utils/          # Funções utilitárias.
````

## 🖼️ Imagens do Aplicativo

### 📱 Tela de Login
![image](https://github.com/user-attachments/assets/3e51ccd1-1e7d-457c-b469-f7d925bf9473)

### 🔧 Como Executar
Pré-requisitos:
Node.js (v16 ou superior)
Yarn (ou npm)
Expo CLI instalado globalmente:
bash
Copiar código
npm install -g expo-cli
Backend do GoBarber rodando (Instruções aqui)
Passo a passo:
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/mobile-GoBarber.git
cd mobile-GoBarber
Instale as dependências:

```bash
yarn install
```

Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com base no .env.example, configurando a URL da API do backend.

Inicie o servidor de desenvolvimento:

```bash
expo start
````

Escaneie o QR Code:
Use o aplicativo Expo Go (disponível na Play Store ou App Store) para rodar o projeto em seu dispositivo.

🧪 Testes
Este projeto inclui testes utilizando o Jest. Para executar os testes:

```bash
yarn jest
```

Se precisar de ajustes ou incluir novas seções, é só avisar! 😊
