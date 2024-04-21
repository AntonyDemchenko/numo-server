# Numo Backend

## Project Info
Numo Backend is the server-side repository for the Numo project, a small social network aimed at connecting people. This repository provides the RESTful API for the frontend part of the project and connects to a PostgreSQL database. It contains all the main business logic of the project.

## Stack Info
The main stack used for development includes:
- Node.js
- TypeScript
- Nest.js
- PostgreSQL
- Prisma ORM
- Swagger
- JSON Web Tokens (JWT)

## Development Info
### Installation
To run this project locally, you need to follow these steps:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running the following command: `npm install`

### Database Setup
This project uses PostgreSQL as the database. Make sure you have PostgreSQL installed and running on your machine. Then, create a new PostgreSQL database for the project and configure the database connection in the `.env` file.

### Running the Server
After setting up the database, you can start the server by running the following command: `npm run start:dev`

### API Documentation
This project uses Swagger for API documentation. After starting the server, you can access the Swagger UI by navigating to `http://localhost:5000/api/docs` in your web browser.

### Running Prisma Studio
You can visualize and interact with your database using Prisma Studio. After installing the repository and setting up the database, run the following command to start Prisma Studio: `npx prisma studio`. It is running on 5555 port.

### Contributing
Contributions to this project are welcome! If you'd like to contribute, please follow the guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md).

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact
If you have any questions or suggestions, feel free to contact us at [demchenkoantony@gmail.com](mailto:demchenkoantony@gmail.com).

