import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interface";

let nextProductId = 1;

export const getProductById = (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const product = market.find((ManageProducts) => ManageProducts.id === productId);

    if (product) {
        return res.status(200).json(product);
    } else {
        return res.status(404).json({ message: "Product not found." });
    }
}


export const getProducts = (req: Request, res: Response) => {
    return res.status(200).json(market);
}

export const ManageProducts = (req: Request, res: Response) => {
    
    const { name, price, weight, section, calories,} = req.body;

    const newProduct = {
        id: nextProductId, 
        name,
        price,
        weight,
        calories,
        section,
        expirationDate: new Date
            
    };

    market.push(newProduct);

    nextProductId++;

    return res.status(201).json({ "message": "Product already registered.", ManageProducts: newProduct });
}

export const updateProduct = (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const index = market.findIndex((product) => product.id === productId);

    if (index !== -1) {
        const existingProduct = market[index];
        const updatedProduct: IProduct = {
            id: productId,
            name: req.body.name || existingProduct.name,
            price: req.body.price || existingProduct.price,
            weight: req.body.weight || existingProduct.weight,
            section: req.body.section || existingProduct.section,
            calories: req.body.calories || existingProduct.calories,
            expirationDate: req.body.expirationDate || existingProduct.expirationDate,
        };

        if (
            updatedProduct.name === existingProduct.name &&
            updatedProduct.price === existingProduct.price &&
            updatedProduct.weight === existingProduct.weight &&
            updatedProduct.section === existingProduct.section &&
            updatedProduct.calories === existingProduct.calories &&
            updatedProduct.expirationDate === existingProduct.expirationDate
        ) {
            return res.status(400).json({ message: "Product already registered." });
        } else {
            market[index] = updatedProduct;
            return res.status(200).json(updatedProduct);
        }
    } else {
        return res.status(404).json({ message: "Product not found." });
    }
};

export const deleteProduct = (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const index = market.findIndex((product) => product.id === productId);

    if (index !== -1) {
        market.splice(index, 1);
        return res.status(204).send(); 
    } else {
        return res.status(404).json({ message: "Product not found." }); 
    }
};