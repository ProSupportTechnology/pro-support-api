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

  it("DELETE /answers - Should be able to delete answers", async () => {
    const answers = await request(app)
      .delete(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${admUserToken}`);

    const findAnswers = await request(app).get("/answers").set("Authorization", `Bearer ${admUserToken}`);

    expect(answers.status).toBe(204);
    expect(answers.body).toEqual({});
    expect(findAnswers.body).toHaveLength(0);
  });

  it("DELETE /answers - Should not be able to delete answers with answer id malformed", async () => {
    const answers = await request(app)
      .delete(`/answers/12345678abc`)
      .set("Authorization", `Bearer ${admUserToken}`);

    expect(answers.status).toBe(406);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
  });

  it("DELETE /answers - Should not be able to delete answers without authorization token", async () => {
    answerId = await request(app)
      .post("/answers")
      .set("Authorization", `Bearer ${admUserToken}`)
      .send({
        description: "The best test of Answers",
        questionId,
        userId: admUserId,
      })
      .then((res) => res.body.id);

    const answers = await request(app).delete(`/answers/${answerId}`);

    const findAnswers = await request(app).get("/answers").set("Authorization", `Bearer ${admUserToken}`);

    expect(answers.status).toBe(401);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
    expect(findAnswers.body).toHaveLength(1);
  });

  it("DELETE /answers - Should not be able to delete answers without admin permission", async () => {
    const answers = await request(app)
      .delete(`/answers/${answerId}`)
      .set("Authorization", `Bearer ${commonUserToken}`);

    const findAnswers = await request(app).get("/answers").set("Authorization", `Bearer ${admUserToken}`);

    expect(answers.status).toBe(403);
    expect(answers.body).toHaveProperty("message");
    expect(answers.body).not.toHaveProperty("id");
    expect(findAnswers.body).toHaveLength(1);
  });
});
