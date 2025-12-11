import prisma from "../config/prisma.js";
import Service from "./Service.js";

class HabitoService extends Service{
    constructor(){
        super(prisma.habit)
    }

    async listarDoUsuario(usuarioId){
        return await this.model.findMany({where:{ userId}})
    }

    async listarUmDoUsuario(habitId, userId){
        return await this.model.findFirst({where: {id: habitId, userId}})
    }

    async criarParaUsuario(userId, data){
        return await this.model.create({data: {...data, userId}})
    }

    async atualizarDoUsuario(habitId, userId, data){
        return await this.model.update({where:{
            id_userId: {
                id: habitId, userId
            },
            data
        }})
    }

    async deletarDoUsuario(habitoId, userId){
        return await this.model.delete({where:{
            id_userId:{
                id: habitoId, userId
            }
        }})
    }
}


export default HabitoService; 