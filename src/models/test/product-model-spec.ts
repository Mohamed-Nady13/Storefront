import database from "../../database";
import { Product, ProductStore } from "../product-model";
const store = new ProductStore();

describe("Test product database actions", () => {
  let productObject = {
    id: 0,
    name: "product 1",
    price: 100,
    category: "cat one",
  } as Product;

  beforeAll(async () => {});

  afterAll(async () => {
    const conn = await database.connect();
    await conn.query("delete from products");
    conn.release();
  });

  it("create item", async () => {
    const result = await store.create(productObject);
    expect(result.id).not.toBe(0);
    productObject.id = result.id;
  });

  it("get item", async () => {
    const result = await store.show(productObject.id);
    expect(result.id).not.toBe(0);
  });

  it("get all items", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });
});
