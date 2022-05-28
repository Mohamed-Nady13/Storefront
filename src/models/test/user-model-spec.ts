import database from "../../database";
import { User, UserStore } from "../user-model";
const store = new UserStore();

describe("Test user database actions", () => {
  let userObject = {
    id: 0,
    firstname: "test111",
    lastname: "test222",
    password: "test33",
  } as User;

  beforeAll(async () => {});

  afterAll(async () => {
    const conn = await database.connect();
    await conn.query("delete from users");
    conn.release();
  });

  it("create item", async () => {
    const result = await store.create(userObject);
    expect(result.id).not.toBe(0);
    userObject.id = result.id;
  });

  it("get item", async () => {
    const result = await store.show(userObject.id);
    expect(result.id).not.toBe(0);
  });

  it("get all items", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });
});
