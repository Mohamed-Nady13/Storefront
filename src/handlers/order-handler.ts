import express, { Request, Response } from "express";
import { UserHelper } from "../helpers/user-helper";
import { Order, OrderProduct, OrderStore } from "../models/order-model";

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

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderProduct: OrderProduct = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const newItem = await store.addProduct(orderProduct);
    res.json(newItem);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordertRoutes = (app: express.Application) => {
  app.get("/orders", UserHelper.verifyToken, index);
  app.get("/orders/:id", UserHelper.verifyToken, show);
  app.post("/orders", UserHelper.verifyToken, create);
  app.post("/orders/products", UserHelper.verifyToken, addProduct);
};

export default ordertRoutes;
