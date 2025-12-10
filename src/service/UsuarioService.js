import Service from "./Service.js";
import prisma from "../config/prisma.js";


class UsuarioService extends Service {
    constructor(){
        super(prisma.user)
    }
}

export default UsuarioService;