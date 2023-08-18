# Lowfound OpenAI API Chat Project

This project uses Nest.js as the backend and React as the frontend to create a chat application powered by the OpenAI API. Users can engage in natural language conversations with the AI model.

## Preview

Chat Page


!["ChatPage"](https://res.cloudinary.com/dhbejijc4/image/upload/v1692365842/2_fbddh5.png "Chat Page")

Sigin Page
!["Sigin Page"](https://res.cloudinary.com/dhbejijc4/image/upload/v1692365846/1_wouupf.png "Sigin Page")




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
cd Lowfound-OpenAI-API-Chat/server
```

2. Install dependencies:


```bash
npm install
```

3. Create a .env file in the backend directory and add the following environment variables:

```bash
DB_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=token_expiration_time
PORT=backend_server_port
OPENAI_API_KEY=your_openai_api_key

```

Replace the placeholders with your actual values.

4. Run the backend server:

```bash
npm run start:dev
```

The backend server should now be running at the specified port.

### Frontend (React)

1. Open a new terminal window/tab and navigate to the frontend directory:

```bash
cd ../client
```

2. Install dependencies:


```bash
yarn
npm install
```

3. Run the frontend development server:

```bash
npm run dev 
```


The frontend should now be accessible at http://127.0.0.1:5173


### Usage

Open your web browser and navigate to http://127.0.0.1:5173 to access the chat application. Engage in natural language conversations with the AI model using the provided interface.


### Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

### License

This project is licensed under the MIT License - see the LICENSE file for details.




