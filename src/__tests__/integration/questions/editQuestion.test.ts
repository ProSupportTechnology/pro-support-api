import { Console } from "console";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedAdmin, mockedAdminLogin } from "../../mocks/login.mocks";
import { questionRequest } from "../../mocks/questions.mocks";

describe("test", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("PATCH /questions/:id - Must be able to edit a question", async () => {
    const newValues = {
      tech: "CSS",
      description: "Como atribuir uma classe para as <li>?",
    };

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const token = `Bearer ${adminLoginResponse.body.token}`;

    const question = await request(app)
      .post("/questions")
      .send(questionRequest)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const questionTobeUpdateId = question.body.id;

    const response = await request(app)
      .patch(`/questions/${questionTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const questionUpdated = await request(app)
      .get("/questions")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(questionUpdated.body[0].tech).toEqual("CSS");
    expect(questionUpdated.body[0].description).toEqual(
      "Como atribuir uma classe para as <li>?"
    );
  });

  it("PATCH /questions/:id -  should not be able to edit questions with id other than type uuid", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const token = `Bearer ${adminLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/questions/13146286`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(406);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /questions/:id - Must not be able to edit a question without authentication", async () => {
    const response = await request(app)
      .post("/questions")
      .send(questionRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
