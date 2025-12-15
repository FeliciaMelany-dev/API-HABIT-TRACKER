import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";


export async function autenticacao(req, res, next){
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Token não enviado"});
    }

    const [, token] = authHeader.split(" ");

    try{
        const decodifica = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await prisma.user.findUnique({
            where: { id: decodifica.id,
                email: decodifica.email,
                role: decodifica.role
             },
            select: { id: true, email: true, name: true, role: true }
        });

        if (!usuario) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        req.user = usuario;
        next()

    }catch(error){
        

        return res.status(401).json({error: "Token inválido"})
    }
}

export default autenticacao;