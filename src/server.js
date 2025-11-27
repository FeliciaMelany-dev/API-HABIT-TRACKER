import app from "./app.js"

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.status(200).send("BEM VINDO AO HABIT TRACKER!!")
});




app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})