import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";

describe("/answers", () => {
  let conn: DataSource;
  let commonUserId: string;
  let admUserId: string;
  let commonUserToken: string;
  let admUserToken: string;
  let questionId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    commonUserId = await request(app)
      .post("/users")
      .send({
        email: "user1@mail.com",
        password: "Teste1234%",
        name: "Usuário comum",
        bio: "Dev Front-end",
      })
      .then((res) => res.body.id);

    admUserId = await request(app)
      .post("/users")
      .send({
        email: "user@mail.com",
        password: "Teste1234%",
        name: "Usuário admin",
        bio: "Dev Back-end",
        isAdm: true,
      })
      .then((res) => res.body.id);

    admUserToken = await request(app)
      .post("/login")
      .send({
        email: "user@mail.com",
        password: "Teste1234%",
      })
      .then((res) => res.body.token);

    commonUserToken = await request(app)
      .post("/login")
      .send({
        email: "user1@mail.com",
        password: "Teste1234%",
      })
      .then((res) => res.body.token);

    questionId = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({
        title: "Question of test",
        description: "The best of tests of answers",
        tech: "Jest",
        userId: admUserId,
      })
      .then((res) => res.body.id);

    await request(app).post("/answers").set("Authorization", `Bearer ${admUserToken}`).send({
      description: "The best test of Answers",
      questionId,
      userId: admUserId,
    });
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET /answers - Should be able to list answers", async () => {
    const answers = await request(app).get("/answers").set("Authorization", `Bearer ${admUserToken}`);

    expect(answers.status).toBe(200);
    expect(answers.body[0]).toHaveProperty("id");
    expect(answers.body[0]).toHaveProperty("description");
    expect(answers.body[0]).toHaveProperty("createdAt");
    expect(answers.body[0]).toHaveProperty("updatedAt");
    expect(answers.body[0]).toHaveProperty("user");
    expect(answers.body[0]).toHaveProperty("question");
    expect(answers.body[0]).not.toHaveProperty("deletedAt");
    expect(answers.body[0].user).not.toHaveProperty("deletedAt");
    expect(answers.body[0].user).not.toHaveProperty("password");
    expect(answers.body[0].question).not.toHaveProperty("deletedAt");
    expect(answers.body).toHaveLength(1);
  });

  it("GET /answers - Should not be able to list answers without authorization token", async () => {
    const answers = await request(app).get("/answers");

    expect(answers.status).toBe(401);
    expect(answers.body).toHaveProperty("message");
  });

  it("GET /answers - Should not be able to list answers without admin permission", async () => {
    const answers = await request(app).get("/answers").set("Authorization", `Bearer ${commonUserToken}`);

    expect(answers.status).toBe(403);
    expect(answers.body).toHaveProperty("message");
  });
});
