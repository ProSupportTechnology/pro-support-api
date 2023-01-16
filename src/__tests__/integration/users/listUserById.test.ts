import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
} from "../../mocks/login.mocks";

describe("List users tests", () => {
  let conn: DataSource;
  let userId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app)
      .post("/users")
      .send(mockedAdmin)
      .then((res) => {
        userId = res.body.id;
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET/users/:id - Must be able to list user", async () => {
    const tokenAdmin = await request(app)
      .post("/login")
      .send(mockedAdminLogin)
      .then((res) => res.body.token);

    const response = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("deletedAt");
  });

  it("GET/users/:id - Should not be able to list users without authentication", async () => {
    const response = await request(app).get(`/users/${userId}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET/users/:id - Should not be able to list non-existent user", async () => {
    const userNonExistent = "f71a2eb2-e641-4936-9b56-e364a9dba7a3";

    const tokenAdmin = await request(app)
      .post("/login")
      .send(mockedAdminLogin)
      .then((res) => res.body.token);

    const response = await request(app)
      .get(`/users/${userNonExistent}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not found");
  });

  it("GET/users/:id - Should not be able to list user with id malformed", async () => {
    const malformedId = "dfdsdgfh2343";

    const tokenAdmin = await request(app)
      .post("/login")
      .send(mockedAdminLogin)
      .then((res) => res.body.token);

    const response = await request(app)
      .get(`/users/${malformedId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(406);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("invalid input syntax for type uuid");
  });
});
