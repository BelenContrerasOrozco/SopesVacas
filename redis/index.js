const express = require("express")
const resTime = require("response-time")
const app = express()
const port = 3000

app.use(resTime())
app.use(express.json())

const routes = require("./Routes/index")

app.get("/", (req, res) => {
    res.json({response: "ProyectoF1"})
})
app.use("/api", routes)

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})