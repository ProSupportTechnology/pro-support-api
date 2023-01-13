import request from "supertest";
import { DataSource, Repository } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { Answer } from "../../../entities/answer.entity";

describe("Create Answers tests", () => {
  const answersRepository: Repository<Answer> =
    AppDataSource.getRepository(Answer);

  let conn: DataSource;
  let normalUserId: string;
  let admUserId: string;
  let tokenAdm: string;
  let token: string;
  let questionId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    admUserId = await request(app)
      .post("/users")
      .send({
        email: "useradm@mail.com",
        password: "Teste1234%",
        name: "Usuário adm",
        bio: "Dev Front-end",
        isAdm: true,
      })
      .then((res) => res.body.id);

    normalUserId = await request(app)
      .post("/users")
      .send({
        email: "user@mail.com",
        password: "Teste1234%",
        name: "Usuário",
        bio: "Dev Front-end",
        isAdm: false,
      })
      .then((res) => res.body.id);

    token = await request(app)
      .post("/login")
      .send({
        email: "user@mail.com",
        password: "Teste1234%",
      })
      .then((res) => res.body.token);

    tokenAdm = await request(app)
      .post("/login")
      .send({
        email: "useradm@mail.com",
        password: "Teste1234%",
      })
      .then((res) => res.body.token);

    questionId = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Question of test",
        description: "The best of tests of answers",
        tech: "Jest",
        userId: admUserId,
      })
      .then((res) => res.body.id);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("POST/answers - Should be able to create answer", async () => {
    const response = await request(app)
      .post("/answers")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send({
        description: "The best test of Answers",
        questionId,
        userId: admUserId,
      });

    const answers = await answersRepository.find();

    expect(answers.length).toBe(1);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("question");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("description");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user).not.toHaveProperty("deletedAt");
    expect(response.body.question).not.toHaveProperty("deletedAt");
  });

  it("POST/answers - Should not be able to create answer without authentication", async () => {
    const response = await request(app).post("/answers").send({
      description: "The best test of Answers",
      questionId,
      userId: admUserId,
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("POST/answers -  should not be able to list users not being admin", async () => {
    const response = await request(app)
      .post("/answers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "The best test of Answers",
        questionId,
        userId: normalUserId,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing admin authorization");
    expect(response.status).toBe(403);
  });
});
