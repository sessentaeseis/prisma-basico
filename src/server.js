import express from 'express'
import { prisma } from './lib/prisma'
const app = express()
const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log("server rodando na porta " + PORT)
})