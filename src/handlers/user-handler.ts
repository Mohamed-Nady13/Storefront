import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user-model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, ENV } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};

const token = async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const password = req.body.password;
  try {
    const user = await store.getByUserName(userName);
    if (!bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
      console.log("Login attempt :> invalid username or password");

      res.statusCode = 400;
      res.json("invalid username or password");
    } else {
      var token = jwt.sign({ user: userName }, TOKEN_SECRET || "");
      res.json(token);
    }
  } catch (err) {
    res.statusCode = 400;
    res.json(err + userName);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: 0,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newItem = await store.create(user);
    res.json(newItem);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/token", token);
};

export default userRoutes;
