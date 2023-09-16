import express, { Request, Response } from "express";
import cors from "cors"
import bodyParser from "body-parser"
import transactionsRoutes from "./routes/transactions"
import merchantsRoutes from "./routes/merchants"
import connectDB from "../config/db"

const app: express.Application = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

connectDB()

app.get("/", (_req: Request, res: Response) => {
    res.send("App Started...")
})

transactionsRoutes(app)
merchantsRoutes(app)

app.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);

})