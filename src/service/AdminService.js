import Service from "./Service.js";
import prisma from "../config/prisma.js";

class AdminService extends Service {
    constructor() {
        super(prisma.user); 
    }

    
    async listarTodosUsuarios(comTodos = false) {
        const where = comTodos ? {} : { isDeleted: false };
        return await this.model.findMany({ where });
    }

   
     async listarHabitosPorUsuario(userId) {
        const usuario = await prisma.user.findFirst({
            where: {
                id: Number(userId),
                isDeleted: false
            },
            include: {
                habits: {
                    where: { isDeleted: false },
                    orderBy: { createdAt: "desc" }
                }
            }
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario.habits;
    }

    async atualizarRole(userId, role) {

        if(!["USER", "ADMIN"].includes(role)){

            throw new Error("Papel inválido")
        }
        
        return await this.model.update({
            where: { id: Number(userId) },
            data: { role }
        });
    }

    
    async desativarUsuario(userId) {
        return await this.model.update({
            where: { id: Number(userId) },
            data: { isDeleted: true, deletedAt: new Date() }
        });
    }

    
    async reativarUsuario(userId) {
        return await this.model.update({
            where: { id: Number(userId) },
            data: { isDeleted: false, deletedAt: null }
        });
    }
}

export default AdminService;