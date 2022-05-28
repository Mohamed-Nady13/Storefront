import database from "../database";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  constructor() {
    dotenv.config();
  }
  BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
  SALT_ROUNDS = process.env.SALT_ROUNDS;
  TOKEN_SECRET = process.env.TOKEN_SECRET;

  async index(): Promise<User[]> {
    try {
      const conn = await database.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";

      const conn = await database.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async getByUserName(userName: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE firstname=($1)";

      const conn = await database.connect();

      const result = await conn.query(sql, [userName]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${userName}. Error: ${err}`);
    }
  }

  async create(x: User): Promise<User> {
    const hash = bcrypt.hashSync(
      x.password + this.BCRYPT_PASSWORD,
      parseInt(this.SALT_ROUNDS || "")
    );

    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";

      const conn = await database.connect();

      const result = await conn.query(sql, [x.firstname, x.lastname, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${x.firstname}. Error: ${err}`);
    }
  }
}
