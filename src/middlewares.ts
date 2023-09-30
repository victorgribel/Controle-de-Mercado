import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const isProductIdValid = (req: Request, res: Response, next: NextFunction) => {
    const productId = Number(req.params.productId);
    const product = market.find((ManageProducts) => ManageProducts.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    }

    next();
}

export function checkProductNameExistence(req: Request, res: Response, next: NextFunction) {
    const productName = req.body.name;
    const productId = req.params.productId;

    if (market.some(product => product.name === productName && product.id !== Number(productId))) {
        return res.status(409).json({ message: "Product already registered." });
    }
    next();
}