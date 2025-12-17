

export function apenasAdmin(req, res, next){
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({ error: "Acesso negado. Apenas administradores"})
    }
    next()
}