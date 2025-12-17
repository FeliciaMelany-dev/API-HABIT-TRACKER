class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async listarTodos(req, res, next) {
        try {

        const listaDeRegistro = await this.entidadeService.listaTodosOsRegistros();
         return res.json(listaDeRegistro);

        } catch (error) {
            next(error);
        }
    }

    async listarUmId(req, res, next) {
        const { id } = req.params;
        
        const idNumber = Number(id);
        

        if (isNaN(Number(idNumber))) {
            const erro = new Error('ID inválido');
            erro.status = 400;
            return next(erro);
        }

        try {
            const umRegistro = await this.entidadeService.listarUmId(
                idNumber );
            return res.status(200).json(umRegistro);

        } catch (erro) {
            next(erro);
        }
    }

    async criarNovo(req, res, next) {
        const dadosParaCriacao = req.body;
        try {

            const novoRegistroCriado = await this.entidadeService.criarRegistro(dadosParaCriacao);
            
            return res.status(201).json(novoRegistroCriado);

        } catch (erro) {
            next(erro);
        }
    }

    async atualizar(req, res, next) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        if (Number.isNaN(id)) {
            const error = new Error("ID inválido");
            error.status = 400;
            return next(error);
        }

        try {
            const foiAtualizado = await this.entidadeService.atualizarRegistro(
                Number(id), dadosAtualizados
            );
        return res.status(200).json({ mensagem: 'Atualizado com sucesso' });

        } catch (erro) {
            erro.status = 500;
            next(erro);
        }
    }

    async deletar(req, res, next) {
        const { id } = req.params;

        if (Number.isNaN(id)) {
            const error = new Error("ID inválido");
            error.status = 400;
            return next(error);
        }

        try {
            await this.entidadeService.deletarRegistro(
            Number(id)
            );
        return res.status(200).json({ mensagem: `id ${id} deletado` });

        } catch (erro) {
            next(erro);
        }
    }
}

export default Controller;