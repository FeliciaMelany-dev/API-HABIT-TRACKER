import Controller from "./Controller.js";
import UsuarioService from "../service/UsuarioService.js";

const usuarioService = new UsuarioService();

class UsuarioController extends Controller {
    constructor() {
        super(usuarioService);
    }
}

export default UsuarioController;