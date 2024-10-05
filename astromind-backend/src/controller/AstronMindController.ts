import { Request, Response, NextFunction } from 'express';
import { request } from 'http';
import { ExpoPlanetInitialService } from '../services/ExpoPlanetInitialService';


export const initialExpoPlanets = async (req: Request, res: Response) => {
    const service = new ExpoPlanetInitialService();
    try {
        await service.buildGasGiantTree();
        await service.buildNeptunian();
        await service.buildSuperEarthTree();
        await service.buildTerrestrialTree();
        res.json("OK");
    } catch (e) {
        console.error("Error for initializing");
    }

}

export const getChildNodes = async (req: Request, res: Response) => {
    try {
        const service = new ExpoPlanetInitialService();
        const parentId = req.params.id;
        console.log(parentId);
        const childNodes = await service.getAllChild(parentId);
        res.status(200).json(childNodes);
    } catch (error) {
        console.error("Error getting child nodes:", error);
        res.status(500).json({ error: "Failed to get child nodes" });
    }
}

export const getParentRoot = async (req: Request, res: Response) => {
    try {
        const service = new ExpoPlanetInitialService();
        const result = await service.getParent();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
    }
}

