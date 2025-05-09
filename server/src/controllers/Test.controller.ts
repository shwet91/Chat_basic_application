import { Request, Response } from "express";
import prisma from "../config/db.config.js";


const test = async(request: Request, response: Response) => {

    console.log("This is test")

    return response.json({message: "ok"})
}

export default test