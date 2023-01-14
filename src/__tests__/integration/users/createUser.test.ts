import { DataSource, Repository } from "typeorm";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";
import {
  mockedUserInvalidBodyRequest,
  mockedUserInvalidBodyResponse,
  mockedUserRequest,
  mockedUserResponse,
  mockedUserSuccessResponse,
  mockedUserUniqueEmailResponse,
} from "../../mocks/users.mocks";
import request from "supertest";
import { getRounds } from "bcryptjs";

describe("Create user route tests", () => {
  let connnection: DataSource;
  const baseUrl: string = "/users";
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connnection = res))
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const users = await userRepository.find();
    await userRepository.remove(users);
  });

  afterAll(async () => {
    await connnection.destroy();
  });
  it("POST /users - Should be able to create user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    const expectedResults = {
      status: 201,
      bodyToEqual: mockedUserSuccessResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("bio");

    expect(response.body).not.toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");

    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );

    const [user, amount] = await userRepository.findAndCountBy({
      id: response.body.id,
    });

    expect(amount).toBe(1);
    expect(getRounds(user[0].password)).toBeTruthy();
  });

  it("POST /users - Should not be able to create user | Invalid Body", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserInvalidBodyRequest);

    const expectedResults = {
      status: 400,
      bodyToEqual: mockedUserInvalidBodyResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.arrayContaining(expectedResults.bodyToEqual.error),
      })
    );

    const [users, amount] = await userRepository.findAndCount();
    expect(amount).toBe(0);
  });

  it("POSTS /users - Should not be able to create user | unique user", async () => {
    const user = userRepository.create(mockedUserRequest);
    await userRepository.save(user);

    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    const expectedResults = {
      status: 409,
      bodyToEqual: mockedUserUniqueEmailResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectedResults.bodyToEqual)
    );

    const [users, amount] = await userRepository.findAndCount();
    expect(amount).toBe(1);
  });
});
