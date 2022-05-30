import express, { Request, Response } from "express";
import { UserHelper } from "../helpers/user-helper";
import { Product, ProductStore } from "../models/product-model";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: 0,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newItem = await store.create(product);
    res.json(newItem);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", UserHelper.verifyToken, create);
};

export default productRoutes;
