import Service from "./Service.js";
import prisma from "../config/prisma.js";
class HabitoService extends Service {
    constructor(){
        super(prisma.habit)
    }
}

export default HabitoService;