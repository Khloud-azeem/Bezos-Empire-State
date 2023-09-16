import express, { Request, Response } from "express";
import MerchantStore from "../models/merchant"

const merchantStore = new MerchantStore()
const get = async function (_req: Request, res: Response) {
    try {
        const merchants = await merchantStore.get()
        console.log("/get")
        return res.status(200).json(merchants)
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            message: err.message,
        })
    }
}

const create = async function (req: Request, res: Response) {
    try {
        const merchants = await merchantStore.create(req.body.merchant)
        console.log("/create")
        return res.status(200).json(merchants)
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            message: err.message,
        })
    }
}

const update = async function (req: Request, res: Response) {
    try {
        const merchant = await merchantStore.update(req.body.merchant)
        console.log("/update")
        return res.status(200).json(merchant)
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            message: err.message,
        })
    }
}

const deleteM = async function (req: Request, res: Response) {
    try {
        const merchants = await merchantStore.deleteM(req.body.merchant)
        console.log("/delete")
        return res.status(200).json(merchants)
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            message: err.message,
        })
    }
}

const merchantsRoutes = (app: express.Application) => {
    app.get("/merchantsGet", get)
    app.post("/merchantsUpdate", update)
    app.post("/merchantsCreate", create)
    app.post("/merchantsDelete", deleteM)
}

export default merchantsRoutes