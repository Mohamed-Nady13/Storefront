import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order-model";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(parseInt(req.params.id));
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: 0,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      quantity: req.body.quantity,
      status: req.body.status,
    };

    const newItem = await store.create(order);
    res.json(newItem);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordertRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
};

export default ordertRoutes;
