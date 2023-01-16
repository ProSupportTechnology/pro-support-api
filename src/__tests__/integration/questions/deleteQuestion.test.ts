import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { Question } from "../../../entities/question.entity";

describe("Delete Questions tests", () => {
  const questionsRepository: Repository<Question> =
    AppDataSource.getRepository(Question);
  let conn: DataSource;
  let UserId: string;
  let admId: string;
  let tokenAdm: string;
  let userToken: string;
  let questionId: string;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    admId = await request(app)
      .post("/users")
      .send({
        email: "prosupport@admin.com",
        password: "Teste123!",
        name: "Usuário adm",
        bio: "Dev FullStack",
        isAdm: true,
      })
      .then((res) => res.body.id);
    UserId = await request(app)
      .post("/users")
      .send({
        email: "user@gmail.com",
        password: "Teste123!",
        name: "Usuário",
        bio: "Dev FullStack",
        isAdm: false,
      })
      .then((res) => res.body.id);
    userToken = await request(app)
      .post("/login")
      .send({
        email: "user@gmail.com",
        password: "Teste123!",
      })
      .then((res) => res.body.token);
    tokenAdm = await request(app)
      .post("/login")
      .send({
        email: "prosupport@admin.com",
        password: "Teste123!",
      })
      .then((res) => res.body.token);
    questionId = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        title: "Nu Kenzie",
        description: "como tipar a resposta do axios corretamente?",
        tech: "React",
        userId: admId,
      })
      .then((res) => res.body.id);
  });
  afterAll(async () => {
    await conn.destroy();
  });
  it("DELETE - questions/:id - should not be able to delete questions without authentication", async () => {
    const adminLoginResponse = await request(app).post("/login").send(tokenAdm);
    const questionTobeDeleted = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).delete(
      `/questions/${questionTobeDeleted.body.id}`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
  it("DELETE /questions/:id -  should be able to delete questions", async () => {
    const question = await request(app)
      .delete(`/questions/${questionId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(question.status).toBe(204);
    expect(question.body).toEqual({});
  });
  it("DELETE /questions/:id -  should not be able to delete questions with invalid id", async () => {
    await request(app).post("/users").send(admId);
    const adminLoginResponse = await request(app).post("/login").send(tokenAdm);
    const response = await request(app)
      .delete(`/questions/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
// yarn test src/__tests__/integration/questions/deleteQuestion.test.ts
