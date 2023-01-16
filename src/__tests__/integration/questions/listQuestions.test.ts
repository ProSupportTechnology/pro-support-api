import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";

describe("List Questions tests", () => {
  let conn: DataSource;
  let userId: string;
  let admId: string;
  let userToken: string;
  let admToken: string;
  let questionId: string;

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
      .send({
        email: "user@gmail.com",
        password: "Teste123!",
        name: "User",
        bio: "Dev Front-end",
      })
      .then((res) => res.body.id);

    admId = await request(app)
      .post("/users")
      .send({
        email: "admin@prodsupport.com",
        password: "Teste123!",
        name: "admin",
        bio: "Dev FullStack",
        isAdm: true,
      })
      .then((res) => res.body.id);

    admToken = await request(app)
      .post("/login")
      .send({
        email: "user@gmail.com",
        password: "Teste123!",
      })
      .then((res) => res.body.token);

    userToken = await request(app)
      .post("/login")
      .send({
        email: "user@gmail.com",
        password: "Teste123!",
      })
      .then((res) => res.body.token);

    questionId = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${admToken}`)
      .send({
        title: "Nu Kenzie",
        description: "Como tipar a resposta do axios corretamente?",
        tech: "React",
        userId: admId,
      })
      .then((res) => res.body.id);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET /questions - Should be able to list all questions", async () => {
    const questions = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${admToken}`);

    expect(questions.status).toBe(200);
    expect(questions.body[0]).toHaveProperty("id");
    expect(questions.body[0]).toHaveProperty("title");
    expect(questions.body[0]).toHaveProperty("description");
    expect(questions.body[0]).toHaveProperty("createdAt");
    expect(questions.body[0]).toHaveProperty("updatedAt");
    expect(questions.body[0]).toHaveProperty("tech");
    expect(questions.body).toHaveLength(1);
  });

  it("GET /questions - Should not be able to list answers without authorization token", async () => {
    const questions = await request(app).get("/questions");

    expect(questions.status).toBe(401);
    expect(questions.body).toHaveProperty("message");
    expect(questions.body).not.toHaveProperty("id");
  });
});
