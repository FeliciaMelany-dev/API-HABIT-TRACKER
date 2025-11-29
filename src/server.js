import app from "./app.js"
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.get('/', (req, res) =>{
    res.status(200).send("BEM VINDO AO HABIT TRACKER!!")
});




app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})