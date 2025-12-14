import prisma from "../config/prisma.js";
import Service from "./Service.js";

class HabitoService extends Service {
    constructor() {
        super(prisma.habit)
    }

    async listarDoUsuario(userId) {

        if (!userId) {
            throw new Error("Usuário não autenticado")
        }
        return await this.model.findMany({ where: { userId } })
    }

    async listarUmDoUsuario(habitId, userId) {
        return await this.model.findFirst({ where: { id: habitId, userId } })
    }

    async criarParaUsuario(userId, data) {
        return await this.model.create({ data: { ...data, userId } })
    }

    async atualizarDoUsuario(id, userId, body) {

        const habit = await this.model.findFirst({ where: { id: Number(id), userId } })

        if (!habit) {
            throw new Error("Hábvito não encontrado ou não pertence ao usuário")
        }

        return await this.model.update({
            where: { id: habit.id },
            data: body
        })
    }

    async deletarDoUsuario(id, userId) {

        const habit = await this.model.findFirst({ where: { id: Number(id), userId, isDeleted: false } });

        if (!habit) {
            throw new Error("Hábito não encontrado ou não pertence ao usuário");
        }

        return await this.model.update({
            where: {
                id: habit.id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })
    }
}


export default HabitoService; 