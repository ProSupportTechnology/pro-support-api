import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockedUserLogin, mockedUserRequest } from "../../mocks/users.mocks";
import { questionRequest } from "../../mocks/questions.mocks";

describe("List Questions tests", () => {
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

  it("GET /questions - Should be able to list all questions", async () => {
    const questions = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${userToken}`);

    console.log(questions);

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
