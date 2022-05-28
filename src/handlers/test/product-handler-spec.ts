import supertest from "supertest";
import database from "../../database";
import app from "../../server";
import { Product } from "../../models/product-model";
import { User, UserStore } from "../../models/user-model";

const request = supertest(app);

describe("Test products endpoints", function () {
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

  let token: string | null = null;

  beforeAll(async () => {
    // create test user
    let userStore = new UserStore();
    const user = await userStore.create(userObject);
    userObject.id = user.id;

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
    await conn.query("delete from products");
    await conn.query("delete from users");
    conn.release();
  });

  let productId = 0;
  it("test create item", async () => {
    const response = await request
      .post("/products")
      .set("Accept", "application/json")
      .set("Authorization", "Beareer " + token)
      .set("Content-Type", "application/json")
      .send(productObject)
      .expect(200);

    productId = response.body.id;
  });

  it("test get all items", async () => {
    const response = await request
      .get("/products")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send()
      .expect(200);
  });

  it("test get item", async () => {
    const response = await request
      .get("/products/" + productId)
      .set("Accept", "application/json")
      .send()
      .expect(200);
  });
});
