# Lowfound OpenAI API Chat Project

This project uses Nest.js as the backend and React as the frontend to create a chat application powered by the OpenAI API. Users can engage in natural language conversations with the AI model.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v14 or later)
- npm (Node Package Manager)
- Git

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Backend (Nest.js)

1. Clone the repository:

```bash
git clone https://github.com/your-username/Lowfound-OpenAI-API-Chat.git
cd Lowfound-OpenAI-API-Chat/backend

2. Install dependencies:

```bash
npm install

3. Create a .env file in the backend directory and add the following environment variables:

```bash
DB_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=token_expiration_time
PORT=backend_server_port
OPENAI_API_KEY=your_openai_api_key

Replace the placeholders with your actual values.

4. Run the backend server:

```bash
npm run start:dev

The backend server should now be running at the specified port.

