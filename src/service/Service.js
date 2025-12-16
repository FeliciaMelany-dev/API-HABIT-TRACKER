
class Service {
    constructor(modelName) {
        this.model = modelName;
    }

    async listaTodosOsRegistros() {

        const ReturnTodos = await this.model.findMany()

        return ReturnTodos;
    }

    async listarUmId(idNumber) {

        const registro = await this.model.findUnique({
            where: { id: idNumber }
        });

        if (!registro || registro.isDeleted) {
            const error = new Error("Registro não encontrado");
            error.status = 404;
            throw error;
        }

        return registro;
    }

    async criarNovo(data) {
        const newData = await this.model.create(data);
        return newData;
    }

    async atualizarRegistro(id, dadosAtualizados) {

        const registro = await this.model.findUnique({
            where: { id: id }
        })
            ;

        if (!registro || registro.isDeleted) {
            const error = new Error("Registro não encontrado");
            error.status = 404;
            throw error;
        }

        return this.model.update({
            where: { id:id},
            data: dadosAtualizados
        });
    }

    async deletarRegistro(id) {
        const registro = await this.model.findUnique({ 
            where: { id: id } 
        });

        if (!registro || registro.isDeleted) {
            const error = new Error("Registro não encontrado")
            error.status = 404;
            throw error;
        }

        return await this.model.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }

        })

    }
}

export default Service;