import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product-model";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
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
  app.post("/products", create);
};

export default productRoutes;
