
export function validacao(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!resultado.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        detalhes: resultado.error.issues.map(issue => ({
          campo: issue.path.slice(1).join("."),
          mensagem: issue.message
        }))
      });
    }

    next();
  };
}

