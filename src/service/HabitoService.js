// import 

// class Service {
//     constructor(modelName) { //Precisa do modelo que ele vai acessar no banco de dados
//         this.model = modelName;
//     }

//     async getAll() {
//         try {
            
//             const ReturnAll = await database[this.model].findAll({})

//             return ReturnAll;
//         } catch (erro) {
            
//         }
//     }

//     async getById(id){
//         try{
//             const date = await database[this.model].findByPk(id);

//             return date;
//         }catch(error){

//         }
//     }

//     async creat(data){
//         try{
//         const newData = await database[this.model].create(data);
//             return newData;
//         }catch(error){

//         }
//     }

//     async update(id, data){

//         try{

//         const newUpdateData = await database[this.model].update(data, {where:{id:id}});
//          return newUpdateData
//         }catch(error){

//         }
//     }
//     async updateOne(id, data){
//         try{
//             const newUpdateOne = await database[this.model].update(data, {where:{id:id}});
//             return newUpdateOne;

//         }catch(error){

//         }
//     }

//     async deleted(id){

//         try{
//         await database[this.model].destroy({where:{id:id}});
//         }catch(error){

//         }
//     }


// }

// export default Service;

import Service from "./Service.js";
import prisma from "../config/prisma.js";


class HabitoService extends Service {
    constructor(){
        super(prisma.habit)
    }
}

export default HabitoService;