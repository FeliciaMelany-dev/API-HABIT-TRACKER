import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService{
    
    async register(name, email, password){
        const userExiste = await prisma.user.findUnique({where:{email}});

        if(userExiste){
            throw new Error ("Email já existe!")
        }

        const hashedSenha = await bcrypt.hash(password, 12);

        const novoUsuario = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedSenha,
                
            },
            select: {
                id: true,
                name: true,
                email:true,
                role:true
            }
        });

       return novoUsuario;
    }


    async login (email, password){
        
        const usuario = await prisma.user.findUnique({
            where: {email}
        });

        if(!usuario){
            throw new Error ("Credenciais inválidas")
        }
        
        const senhaCompativel = await bcrypt.compare(password, usuario.password);

        if(!senhaCompativel){
            throw new Error ("Credenciais inválidas")
        }

        const token = jwt.sign(

            {id: usuario.id,
                email: usuario.email,
                role: usuario.role
            },
            process.env.JWT_SECRET, 
            {expiresIn: "7h"}
        )
        

        return token;
    };


}

export default AuthService;