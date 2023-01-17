import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedAdmin, mockedAdminLogin } from "../../mocks/login.mocks";
import { mockedQuestionRequest } from "../../mocks/questions.mocks";

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

  it("POST /questions - Must be able to create a question", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/questions")
      .send(mockedQuestionRequest)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("tech");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("user");
    expect(response.status).toBe(201);
  });

  it("POST /questions - it should not be possible to create a question with incorrect body", async () => {
    const questionIncorrect = {
      title: "Nu Kenzie",
      description: "Como tipar a resposta do axios corretamente?",
    };

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/questions")
      .send(questionIncorrect)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("POST /questions - should not be able to create a question without authentication", async () => {
    const response = await request(app)
      .post("/questions")
      .send(mockedQuestionRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
