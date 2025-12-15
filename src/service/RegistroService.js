import Service from "./Service.js";
import prisma from "../config/prisma.js";
import normalizeDate from "../utils/normalizaData.js";


class RegistroService extends Service {
    constructor() {
        super(prisma.habitCompletion)
    }

    async registrarConclusao(id, userId, date = new Date()) {

        const habitoid = Number(String(id).trim())

        if(Number.isNaN(habitoid)){
            throw new Error ('ID do hábito inválido')
        }
        
        const normalizedDate = normalizeDate(date)

        const habito = await prisma.habit.findFirst({
            where: {
                id: Number(id),
                userId,
                isDeleted: false
            }
        });

        if (!habito) {
            
            throw new Error("Hábito não encontrado ou não pertence ao usuário.")
        }

        const jaRegistrado = await prisma.habitCompletion.findFirst({
            where: {
                habitId: habito.id,
                date: normalizedDate
            }
        });

        if (jaRegistrado) {
            throw new Error('Hábito já registrado neste dia')
        }

        return await this.model.create({
            data: {
                habitId: habito.id,
                date
            }
        })
    }

    async listarPorHabito(habitoId, userId) {

        const habito = await prisma.habit.findFirst({
            where: {
                id: Number(habitoId),
                userId
            }
        });

        if (!habito) {
            throw new Error("Hábito não encontrado ou não pertence ao usuário");
        }

        return await prisma.habitCompletion.findMany({
            where: { habitId: habito.id ,
            isDeleted: false},
            orderBy: { date: "desc" }
        });
    }


    async deletarRegistro(registroId, userId) {

        const registro = await prisma.habitCompletion.findFirst({
            where: {
                id: Number(registroId),
                habit: {
                    userId
                }
            }
        })

        if (!registro) {
            throw new Error("Registro não encontrado ou não pertence ao usuário");
        }

        return await prisma.habitCompletion.delete({
            where: {
                id: registro.id
            }
        })

    }
}

export default RegistroService;