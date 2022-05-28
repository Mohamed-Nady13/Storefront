import database from "../database";

export type Order = {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  status: boolean;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await database.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";

      const conn = await database.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(x: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (product_id, user_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *";

      const conn = await database.connect();

      const result = await conn.query(sql, [
        x.product_id,
        x.user_id,
        x.quantity,
        x.status ? 1 : 0,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
}
