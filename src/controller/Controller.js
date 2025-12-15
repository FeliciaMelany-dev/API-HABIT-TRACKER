class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async listarTodos(req, res, next) {
        try {

        const listaDeRegistro = await this.entidadeService.listaTodosOsRegistros();
        res.json(listaDeRegistro);

        } catch (erro) {
            erro.status = 500;

            next(erro);
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

                console.log(umRegistro)

            if (!umRegistro) {
                const erro = new Error('Registro não encontrado');
                erro.status = 404;
                return next(erro);
            }

            return res.status(200).json(umRegistro);
        } catch (erro) {
            erro.status = 500;
            next(erro);
        }
    }

    async criarNovo(req, res, next) {
        const dadosParaCriacao = req.body;
        try {

            const novoRegistroCriado = await this.entidadeService.criarRegistro(dadosParaCriacao);
            
            return res.status(201).json(novoRegistroCriado);

        } catch (erro) {
            erro.status = 400;
            next(erro);
        }
    }

    async atualizar(req, res, next) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            
            const foiAtualizado = await this.entidadeService.atualizarRegistro(
                Number(id), dadosAtualizados
            );
            console.log(foiAtualizado);

            if (!foiAtualizado) {
                const erro = new Error('Registro não foi atualizado');
                erro.status = 400;
                return next(erro);
            }

        return res.status(200).json({ mensagem: 'Atualizado com sucesso' });

        } catch (erro) {
            erro.status = 500;
            next(erro);
        }
    }

    async deletar(req, res, next) {
        const { id } = req.params;
        try {
            await this.entidadeService.deletarRegistro(
            Number(id)
            );
        return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (erro) {
            erro.status = 500;
            next(erro);
        }
    }
}

export default Controller;