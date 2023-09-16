import axios from "axios"
import express, { Request, Response } from "express";

const getTransactions = async function (_req: Request, res: Response) {
    try {
        const response = await axios.get("https://hadiziady.github.io/bezos_mock_api/mock_api.json")
        const transactions = response.data
        console.log("/getTransactions")
        return res.status(200).json(transactions)
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            message: err.message,
        })
    }
}

const transactionsRoutes = (app: express.Application) => {
    app.get("/transactions", getTransactions)
}

export default transactionsRoutes