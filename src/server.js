import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./config/prisma.js";

dotenv.config();

const PORT = process.env.PORT || 3000;



async function iniciandoServer() {
    try {

        await prisma.$connect();
        console.log("Conectado ao banco Postgres com sucesso!")

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)});

    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados!")
        
        process.exit(1);
    }
}

iniciandoServer();
