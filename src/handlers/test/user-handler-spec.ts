import supertest from "supertest";
import database from "../../database";
import app from "../../server";
import { User, UserStore } from "../../models/user-model";

const request = supertest(app);

describe("Test users endpoints", () => {
  let userObject = {
    id: 0,
    firstname: "test111",
    lastname: "test222",
    password: "test33",
  } as User;

  let token: string | null = null;

  beforeAll(async () => {
    var userStore = new UserStore();
    const user = await userStore.create(userObject);
    userObject.id = user.id;
  });

  afterAll(async () => {
    const conn = await database.connect();
    await conn.query("delete from users");
    conn.release();
  });

  let userId = 0;
  it("test create item", async () => {
    let user = { firstName: "test", lastName: "test", password: "123abc" };
    const response = await request
      .post("/users")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(user)
      .expect(200);

    userId = response.body.id;
  });

  it("test get user token", async () => {
    const req = {
      userName: userObject.firstname,
      password: userObject.password,
    };

    const result = await supertest(app)
      .post("/token")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(req)
      .expect(200);

    token = result.body;
  });

  it("test get all items", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", "Beareer " + token)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send()
      .expect(200);
  });

  it("test get item", async () => {
    const response = await request
      .get("/users/" + userId)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send()
      .expect(200);
  });
});
