import Controller from "./Controller.js";
import HabitoService from "../service/HabitoService.js";

const habitoService = new HabitoService();

class HabitoController extends Controller {
    constructor() {
        super(habitoService);
    }
}

export default HabitoController;