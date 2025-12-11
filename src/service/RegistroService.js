import Service from "./Service.js";
import prisma from "../config/prisma.js";


class RegistroService extends Service{
    constructor(){
        super(prisma.habitCompletion)
    }

    async logar(habitId, userId){
        const habito = await prisma.habitCompletion.findFirst({where:{id: habitId, userId}});

        if(!habito){
            throw new Error("Você não tem permissão para regiistrar este hábito.")
        }

        return await this.model.create({
            data: {
                habitId,
                dataRegistro: new Date()
            }
        })
    }

    async listarLogsDoHabito(userId, habitoId){
        const habito = await prisma.habitCompletion.findFirst({where: {id: habitoId, userId}});

        if(!habito){
            throw new Error("Você não tem acesso a esse hábito");
        }

        return await this.listaTodosOsRegistros({habitoId})
    }
}

export default RegistroService;