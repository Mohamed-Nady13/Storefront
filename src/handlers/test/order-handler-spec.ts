import supertest from "supertest";
import database from "../../database";
import app from "../../server";
import { Order, OrderProduct } from "../../models/order-model";
import { Product, ProductStore } from "../../models/product-model";
import { User, UserStore } from "../../models/user-model";

const request = supertest(app);

describe("Test orders endpoints", function () {
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

  let token: string | null = null;

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

    // get user token
    const tokenReq = {
      userName: userObject.firstname,
      password: userObject.password,
    };

    const result = await supertest(app)
      .post("/token")
      .set("Content-Type", "application/json")
      .send(tokenReq)
      .expect(200);

    token = result.body;
  });

  afterAll(async () => {
    const conn = await database.connect();
    await conn.query("delete from orders");
    await conn.query("delete from products");
    await conn.query("delete from users");
    conn.release();
  });

  let orderId = 0;
  it("test create item", async () => {
    const response = await request
      .post("/orders")
      .set("Accept", "application/json")
      .set("Authorization", "Beareer " + token)
      .set("Content-Type", "application/json")
      .send(orderObject)
      .expect(200);

    orderId = response.body.id;
  });

  it("test get all items", async () => {
    const response = await request
      .get("/orders")
      .set("Authorization", "Beareer " + token)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send()
      .expect(200);
  });

  it("test get item", async () => {
    const response = await request
      .get("/orders/" + orderId)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send()
      .expect(200);
  });

  it("test add order product", async () => {
    const orderProduct: OrderProduct = {
      order_id: orderObject.id,
      product_id: productObject.id,
      quantity: 5,
    };

    const response = await request
      .post("/orders/products")
      .set("Accept", "application/json")
      .set("Authorization", "Beareer " + token)
      .set("Content-Type", "application/json")
      .send(orderProduct)
      .expect(200);
  });
});
