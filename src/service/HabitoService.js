
import prisma from "../config/prisma.js";
import Service from "./Service.js";

class HabitoService extends Service {
    constructor() {
        super(prisma.habit)
    }
    async listarTodosOsHabitos() {
        return await this.model.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                userId: true,
                title: true,
                description: true,
                createdAt: true
            }
        })
    }

    async listarDoUsuario(userId) {

        if (!userId) {
            throw new Error("Usuário não autenticado")
        }
        return await this.model.findMany({ where: { userId },
        select:{
            id: true,
            title: true,
            description: true,
            createdAt: true
        } })
    }

    async listarUmDoUsuario(habitId, userId) {
        return await this.model.findFirst({ where: { id: habitId, userId },
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true
        } })
    }

    async criarParaUsuario(userId, data) {
        return await this.model.create({ data: { ...data, userId }, select: {
            id: true,
            userId: true,
            title: true,
            description: true,
            createdAt: true
        } })
    }

    async atualizarDoUsuario(id, userId, body) {

        const habit = await this.model.findFirst({ where: { id: Number(id), userId } })

        if (!habit) {
            throw new Error("Hábito não encontrado ou não pertence ao usuário")
        }

        return await this.model.update({
            where: { id: habit.id },
            data: body,
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true
            }
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
