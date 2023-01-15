import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedAdmLogin,
  mockedUserAdmRequest,
  mockedUserLogin,
  mockedUserRequest,
} from "../../mocks/users.mocks";

describe("List users tests", () => {
  let conn: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserAdmRequest);

    await request(app).post("/users").send(mockedUserRequest);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET/users - Must be able to list users", async () => {
    const tokenAdmin = await request(app)
      .post("/login")
      .send(mockedAdmLogin)
      .then((res) => res.body.token);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).not.toHaveProperty("password");
    expect(response.body[0]).not.toHaveProperty("deletedAt");
  });

  it("GET/users -  Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET/users -  Should not be able to list users not being admin", async () => {
    const tokenUser = await request(app)
      .post("/login")
      .send(mockedUserLogin)
      .then((res) => res.body.token);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
