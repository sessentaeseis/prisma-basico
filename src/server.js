import express from 'express'
import { prisma } from './lib/prisma.ts'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/produtos", async (req, res) => {
    try {
        const itens = await prisma.produto.findMany()
        res.json(itens)   
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar" })
    }
    
}) 

app.listen(PORT, () => {
    console.log("server rodando na porta " + PORT)
})