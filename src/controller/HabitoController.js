import habitoService from "../service/HabitoService.js";

class HabitoController {
    async listar(req, res) {
        try {
        const resp = await habitoService.listar(req.userId);
        res.json(resp);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async criar(req, res) {
        try {
        const resp = await habitoService.criar(req.userId, req.body);
        res.status(201).json(resp);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async listarUmId(req, res) {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        try {
            const umRegistro = await habitoService.listarUmId(
                Number(id),
                req.userId
            );

            if (!umRegistro) {
                return res.status(404).json({ mensagem: "Registro não encontrado" });
            }

            return res.status(200).json(umRegistro);
        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro ao buscar o registro" });
        }
    }

    async atualizar(req, res) {
        try {
        const resp = await habitoService.atualizar(
            Number(req.params.id),
            req.userId,
            req.body
        );
        res.json(resp);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deletar(req, res) {
        try {
        const resp = await habitoService.deletar(
            Number(req.params.id),
            req.userId
        );
        res.json(resp);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default HabitoController;