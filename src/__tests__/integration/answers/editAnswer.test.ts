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
  let answerId: string;

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

    answerId = await request(app)
      .post("/answers")
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({
        description: "The best test of Answers",
        questionId,
        userId: admUserId,
      })
      .then((res) => res.body.id);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("PATCH /answers - Should be able to edit answers", async () => {
    const newDescription = "The best test of Answers for ever";
    const answers = await request(app)
      .patch(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({ description: newDescription, questionId, userId: admUserId });

    expect(answers.status).toBe(200);
    expect(answers.body).toHaveProperty("id");
    expect(answers.body).toHaveProperty("description");
    expect(answers.body.description).toEqual(newDescription);
    expect(answers.body).toHaveProperty("createdAt");
    expect(answers.body).toHaveProperty("updatedAt");
    expect(answers.body).not.toHaveProperty("deletedAt");
  });

  it("PATCH /answers - Should not be able to edit answers without body", async () => {
    const answers = await request(app)
      .patch(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${admUserToken}`);

    expect(answers.status).toBe(400);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });

  it("PATCH /answers - Should not be able to edit answers with answer id malformed", async () => {
    const answers = await request(app)
      .patch(`/answers/12345678abc`)
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({ description: "Not possible", questionId, userId: "user id test" });

    expect(answers.status).toBe(406);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });

  it("PATCH /answers - Should not be able to edit answers with invalid user id", async () => {
    const answers = await request(app)
      .patch(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({ description: "Not possible", questionId, userId: "user id test" });

    expect(answers.status).toBe(404);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });

  it("PATCH /answers - Should not be able to edit answers with invalid question id", async () => {
    const answers = await request(app)
      .patch(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({ description: "Not possible", questionId: "question id", userId: admUserId });

    expect(answers.status).toBe(404);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });

  it("PATCH /answers - Should not be able to edit answers without authorization token", async () => {
    const answers = await request(app)
      .patch(`/answers/${answerId}`)
      .send({ description: "new Description", questionId, userId: admUserId });

    expect(answers.status).toBe(401);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });

  it("PATCH /answers - Should not be able to edit answers without admin permission", async () => {
    const answers = await request(app)
      .patch(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${commonUserToken}`)
      .send({ description: "new Description", questionId, userId: admUserId });

    expect(answers.status).toBe(403);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });
});
