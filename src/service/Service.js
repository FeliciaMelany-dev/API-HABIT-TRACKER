
class Service {
    constructor(modelName) { 
        this.model = modelName;
    }

    async listaTodosOsRegistros() {
        try {
            
            const ReturnTodos = await this.model.findMany()

            return ReturnTodos;
        } catch (erro) {
            
        }
    }

    async listarUmId(idNumber){
        try{
            const date = await this.model.findUnique({where:{id: idNumber}});

            return date;
        }catch(error){

        }
    }

    async criarNovo(data){
        try{
        const newData = await this.model.create(data);
            return newData;
        }catch(error){

        }
    }

    async atualizarRegistro(id, dadosAtualizados){

        try{

            console.log(id, dadosAtualizados)

        const newUpdateData = await this.model.update({
            where: {id: (id)},
            data:dadosAtualizados
        });

        
         return newUpdateData;

        }catch(error){
            console.log(error)
        }
    }
    async atualizarUm(id, data){
        try{
            const newUpdateOne = await this.model.update(data, {where:{id:id}});
            return newUpdateOne;

        }catch(error){

        }
    }

    async deletarRegistro(id){

        try{
            const registro = await this.model.findUnique({where: {id:id}});

            if(!registro){
                throw new Error ("Registro não encontrado");
            }
        await this.model.delete({where:{id:id}});

        }catch(error){
            console.error(error)
        }
    }


}


export default Service;