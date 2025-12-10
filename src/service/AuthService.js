import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService{
    
    async register(name, email, passWord){
        const userExiste = await prisma.user.findUnique({where:{email}});

        if(userExiste){
            throw new Error ("Email já existe!")
        }

        const hashedSenha = await bcrypt.hash(passWord, 12);

        const novoUsuario = await prisma.user.create({
            data:{
                name,
                email,
                passWord: hashedSenha
            },
            select: {
                id: true,
                name: true,
                email:true
            }
        });

       return novoUsuario;
    }


    async login (email, passWord){

        const usuario = await prisma.user.findUnique({
            where: {email}
        });

        if(!usuario){
            throw new Error ("Credenciais inválidas")
        }
        
        const senhaCompativel = await bcrypt.compare(passWord, usuario.passWord);

        if(!senhaCompativel){
            throw new Error ("Credenciais inválidas")
        }

        const token = jwt.sign(

            {id: usuario.id},
            process.env.JWT_SECRET, 
            {expiresIn: "7h"}
        )

        return token;
    };


}

export default AuthService;