import Controller from "./Controller.js";
import AdminService from "../service/AdminService.js";
import prisma from "../config/prisma.js";

class AdminController extends Controller {
    constructor() {
        const adminService = new AdminService();
        super(adminService);

        this.adminService = adminService;
    }

    async listarHabitosUsuario(req, res) {
        try {
            const { id } = req.params;

            const habits = await this.adminService.listarHabitosPorUsuario(id);

            return res.status(200).json(habits);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async atualizarRole(req, res) {

        const { id } = req.params;
        const { role } = req.body;

        try{

            const usuario = await this.adminService.atualizarRole(id, role)

            return res.status(200).json(usuario);

        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }


    async restaurarUsuario(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.adminService.reativarUsuario(id);
            return res.json(usuario);

        } catch (error) {

            return res.status(400).json({ error: error.message });

        }
    }
}


export default AdminController;