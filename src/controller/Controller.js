class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async listarTodos(req, res) {
        try {

        const listaDeRegistro = await this.entidadeService.listaTodosOsRegistros();
        res.json(listaDeRegistro);

        } catch (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar registros' });
        }
    }

    async listarUmId(req, res) {
        const { id } = req.params;
        
        const idNumber = Number(id);
        

        if (isNaN(Number(idNumber))) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        try {
            const umRegistro = await this.entidadeService.listarUmId(
                idNumber );

                console.log(umRegistro)

            if (!umRegistro) {
                return res.status(404).json({ mensagem: "Registro não encontrado" });
            }

            return res.status(200).json(umRegistro);
        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro ao buscar o registro" });
        }
    }

    async criarNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {

            const novoRegistroCriado = await this.entidadeService.criarRegistro(dadosParaCriacao);
            return res.status(200).json(novoRegistroCriado);

        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao criar o registro' });
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            
            const foiAtualizado = await this.entidadeService.atualizarRegistro(
                Number(id), dadosAtualizados
            );
            console.log(foiAtualizado);

            if (!foiAtualizado) {
                return res.status(400).json({ mensagem: 'registro não foi atualizado' });
            }

        return res.status(200).json({ mensagem: 'Atualizado com sucesso' });

        } catch (erro) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar o registro' });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        try {
            await this.entidadeService.deletarRegistro(
            Number(id)
            );
        return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (err) {
            res.status(500).json({ mensagem: 'Erro ao excluir o registro' });
        }
    }
}

export default Controller;