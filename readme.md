# Vibebox

Your inbox + vibes.

## System Overview

### Architecture

![Architecture](/images/architecture.png)

#### Backend stack

- Node.js
- Express
- TBD KV store (via express-session compatible API)

#### Frontend stack

- Next.js
- React
- Tailwind CSS

### User flow

![User flow](/images/user-flow.png)

### Client UI

![Client UI](/images/client.png)

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) v20+
- [npm](https://www.npmjs.com/get-npm) v10+
- [Nylas](https://dashboard-v3.nylas.com?utm_source=nylas-samples&utm_medium=devrel-surfaces&utm_campaign=&utm_content=apidays-austin-2024) account
- [OpenAI](https://openai.com) account
- [Hugging Face](https://huggingface.co) account
- [Ollama](https://ollama.com) installed and running locally

### Setup steps

1. Clone the repository

```bash
git clone git@github.com:nylas-samples/vibebox.git
```

2. Setup server

Install server dependencies:

```bash
cd backend
npm install
```

Write the following environment variables to a `.env` file in the `backend` directory:

```bash
# .env
NODE_ENV=dev
CORS_ORIGIN=http://localhost:3001
APP_DOMAIN_DEV=http://localhost:3001
APP_DOMAIN_PROD= # Not needed for local development
APP_NAME=Vibebox
NYLAS_CLIENT_ID= # Get from dashboard-v3.nylas.com
NYLAS_API_KEY= # Get from dashboard-v3.nylas.com
NYLAS_API_URI=https://api.us.nylas.com
OPENAI_API_KEY= # Get from OpenAI
HUGGINGFACE_API_KEY= # Get from Hugging Face
EXPRESS_SESSION_SECRET=
```

Start the server:

```bash
npm start
```

Serves on `http://localhost:3000`.

3. Setup client

Install client dependencies:

```bash
cd frontend
npm install
```

Start the client:

```bash
npm run dev
```

Serves on `http://localhost:3001`.

## Resources for further learning

- [Syntax FM: Local AI Models in JavaScript - Machine Learning Deep Dive with Xenova](https://syntax.fm/show/740/local-ai-models-in-javascript-machine-learning-deep-dive-with-xenova)  
  A podcast episode that delves into using local AI models with JavaScript, featuring a deep dive into machine learning with Xenova.

- [Nylas Fireside Chat with OpenAI](https://info.nylas.com/firesidechat-openai-registrationpage.html?utm_source=nylas-samples&utm_medium=devrel-surfaces&utm_campaign=&utm_content=apidays-austin-2024)  
  Insights and discussions on AI advancements and applications with Open AI's Evan Morikawa and Nylas Co-Founder & CTO Christine Spang.

- [Stack Overflow Blog: Building GenAI Features in Practice with Intuit Mailchimp](https://stackoverflow.blog/2024/03/06/building-genai-features-in-practice-with-intuit-mailchimp/)  
  A podcast discussing practical experiences in building generative AI features.

- [Nylas: Developer's Guide to Generative AI](https://www.nylas.com/developers-guide-to-generative-ai?utm_source=nylas-samples&utm_medium=devrel-surfaces&utm_campaign=&utm_content=apidays-austin-2024)  
  A guide for developers on the implementation and integration of generative AI.

- [Coding with Nylas: AI-related video](https://www.youtube.com/watch?v=KNJWMGExt18)  
  Nylas Developer Advocates Ram and Blag talk about how to use AI to generate email responses using open-source models from Hugging Face.

- [Ash Ryan: Experimenting with AI in DevRel](https://www.ashryan.io/experimenting-with-ai-in-devrel/)  
  A framework for exploring AI in Developer Relations.

- [Ash Ryan: DevRel & AI as Department Lead](https://www.ashryan.io/devrel-ai-as-department-lead/)  
  A DevRel lead's self report card on a year of using AI in Developer Relations.
