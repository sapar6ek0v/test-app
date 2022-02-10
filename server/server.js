import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from "path";
import testRoutes from "./routes/testRoutes.js";
import dbConnect from "./connect/mongoose.js";

dotenv.config()

const port = process.env.PORT || 8000
const server = express()


server.use(express.json())
dbConnect()
server.use(cors())
server.set('json spaces', 2)

server.use('/api', testRoutes)

server.use(express.static('client/build'))
server.use('*', (req, res) => {
    res.sendFile(path.resolve('client/build/index.html'))
})

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})