import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import {
  mockedAdmLogin,
  mockedUserAdmRequest,
  mockedUserLogin,
} from "../../mocks/users.mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserAdmRequest);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("DELETE /users/:id -  should not be able to delete user without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdmLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${UserTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id -  should not be able to delete user not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdmLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdmLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /users/:id -  should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(mockedUserAdmRequest);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdmLogin);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
