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
        res.status(500).json({ error: "Erro ao buscar produtos" })
    }
    
}) 

app.post("/produtos", async (req, res) => {
    try {
        const {nome, categoria, quantidade} = req.body
        const novoItem = await prisma.produto.create({
            data: {
                nome,
                categoria,
                quantidade: Number (quantidade)
            }
        })
        res.status(201).json(novoItem)
    }
    catch(error) {
        res.status(400).json({ error: "Erro ao criar produto" })
    }
})

app.put("/produtos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const { nome, categoria, quantidade } = req.body
        const produtoAtualizado = await prisma.produto.update({
            where: { id: Number(id) },
            data: { nome, categoria, quantidade: Number(quantidade) }
        })
        res.json(produtoAtualizado)
    }
    catch(error) {
        res.status(404).json({ error: "Produto não encontrado" })
    }
}) 

app.delete("/produtos/:id", async (req, res) => {
    try {
        const{id} = req.params
        await prisma.produto.delete({
            where: { id: Number(id) }
        })
        res.status(204).send()
    }
    catch(error) {

    }
})

app.listen(PORT, () => {
    console.log("server rodando na porta " + PORT)
})