import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { Question } from "../../../entities/question.entity";
import { questionRequest } from "../../mocks/questions.mocks";
import { mockedUserLogin, mockedUserRequest } from "../../mocks/users.mocks";

describe("Delete Questions tests", () => {
  const questionsRepository: Repository<Question> =
    AppDataSource.getRepository(Question);
  let conn: DataSource;
  let userId: string;
  let userToken: string;
  let question: string;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    userId = await request(app)
      .post("/users")
      .send(mockedUserRequest)
      .then((res) => res.body.id);

    userToken = await request(app)
      .post("/login")
      .send(mockedUserLogin)
      .then((res) => res.body.token);

    question = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ ...questionRequest, userId: userId })
      .then((res) => res.body.id);
  });
  afterAll(async () => {
    await conn.destroy();
  });
  it("DELETE - questions/:id - should not be able to delete questions without authentication", async () => {
    const questionTobeDeleted = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${userToken}`);
    const response = await request(app).delete(
      `/questions/${questionTobeDeleted.body.id}`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
  it("DELETE /questions/:id -  should be able to delete questions", async () => {
    const questionToBeDeleted = await request(app)
      .delete(`/questions/${question}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(questionToBeDeleted.status).toBe(204);
    expect(questionToBeDeleted.body).toEqual({});
  });
  it("DELETE /questions/:id -  should not be able to delete questions with invalid id", async () => {
    await request(app).post("/users").send(userId);
    const response = await request(app)
      .delete(`/questions/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /questions/:id -  should not be able to delete questions with id other than type uuid", async () => {
    await request(app).post("/users").send(userId);
    const response = await request(app)
      .delete(`/questions/13146286`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(406);
    expect(response.body).toHaveProperty("message");
  });
});
