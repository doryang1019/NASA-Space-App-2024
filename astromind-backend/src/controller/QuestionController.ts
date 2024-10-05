import { QuestionService } from "../services/QuestionSerivices";
import { Request, Response, NextFunction } from 'express';

export const initialQuestion = async (req: Request, res: Response) => {
    const service = new QuestionService();
    try {
        await service.initialQuestion();
        res.json("OK");
    } catch (e) {
        console.error("Error for initializing");
    }

}


export const getAll = async (req: Request, res: Response) => {
    const service = new QuestionService();
    try {
        const result = await service.getAll();
        res.status(200).json(result);
    } catch (e) {
        console.error("Error for initializing");
    }

}
