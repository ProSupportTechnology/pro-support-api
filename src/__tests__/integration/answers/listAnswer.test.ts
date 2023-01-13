import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";

describe("/answers", () => {
  let conn: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    // await request(app).post("/users")
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET /answers | Should be able to list answers", () => {
    // const token = request(app).post("/login").send({
    //   email: "user@mail.com",
    //   password: "Teste1234%",
    // });
  });
});
