import jwt from "jsonwebtoken";

export function autenticacao(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: "Token não enviado"});
    }

    const [, token] = authHeader.split(" ");

    try{
        const decodifica = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodifica.id;

        next();

    }catch(error){
        return res.status(401).json({error: "Token inválido"})
    }
}

export default autenticacao;