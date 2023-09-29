import { Router } from "express"
import { ManageProducts, deleteProduct, getProducts, updateProduct, getProductById} from "../logics";
import { checkProductNameExistence, isProductIdValid } from "../middlewares";

export const productsRouter = Router();

productsRouter.get("/:productId", isProductIdValid, getProductById);
productsRouter.get("/", checkProductNameExistence, getProducts,);
productsRouter.post("/",checkProductNameExistence ,ManageProducts,);
productsRouter.patch("/",checkProductNameExistence ,isProductIdValid, updateProduct);
productsRouter.delete("/:productId", isProductIdValid, deleteProduct) 
productsRouter.patch("/:productId", checkProductNameExistence, isProductIdValid, updateProduct);
productsRouter.delete("/:productId", isProductIdValid, deleteProduct);
