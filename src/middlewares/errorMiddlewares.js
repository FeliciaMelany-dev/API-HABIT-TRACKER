export function errorHandler(err, req, res, next) {

  if(err.type === "entity.parse.failded"){
    return res.status(400).json({
      error: "JSON inválido",
      mensagem: "Verifique se o body está em JSON válido"
    })
  }
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Erro interno do servidor'
  });
}
