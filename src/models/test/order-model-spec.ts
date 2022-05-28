import database from "../../database";
import { Order, OrderStore } from "../order-model";
import { Product, ProductStore } from "../product-model";
import { User, UserStore } from "../user-model";

const store = new OrderStore();

describe("Test order database actions", () => {
  let userObject = {
    id: 0,
    firstname: "test111",
    lastname: "test222",
    password: "test33",
  } as User;

  let productObject = {
    id: 0,
    name: "product 1",
    price: 100,
    category: "cat one",
  } as Product;

  let orderObject = {
    id: 0,
    product_id: 1,
    user_id: 1,
    quantity: 3,
    status: true,
  } as Order;

  beforeAll(async () => {
    // create test user
    let userStore = new UserStore();
    const user = await userStore.create(userObject);
    userObject.id = user.id;
    orderObject.user_id = user.id;

    // create test product
    let productStore = new ProductStore();
    let product = await productStore.create(productObject);
    productObject.id = product.id;
    orderObject.product_id = product.id;
  });

  afterAll(async () => {
    const conn = await database.connect();
    await conn.query("delete from orders");
    await conn.query("delete from products");
    await conn.query("delete from users");
    conn.release();
  });

  it("create item", async () => {
    const result = await store.create(orderObject);
    expect(result.id).not.toBe(0);
  });

  it("get item", async () => {
    const result = await store.show(userObject.id);
    expect(result.id).not.toBe(0);
  });
});
