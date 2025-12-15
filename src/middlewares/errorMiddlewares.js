export function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Erro interno do servidor'
  });
}
