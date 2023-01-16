import { Console } from "console";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedAdmin, mockedAdminLogin } from "../../mocks/login.mocks";
import { mockedQuestion } from "../../mocks/questions.mocks";

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
    await request(app).post("/questions").send(mockedQuestion);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("PATCH /questions/:id - Must be able to edit a question", async () => {
    const newValues = { title: "CSS", description: "Testando descrição" };

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const token = `Bearer ${adminLoginResponse.body.token}`;

    const question = await request(app)
      .post("/questions")
      .send(mockedQuestion)
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
    expect(questionUpdated.body[0].title).toEqual("CSS");
    expect(questionUpdated.body[0].description).toEqual("Testando descrição");
  });
});
