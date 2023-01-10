import express from "express";
import "express-async-errors";
import { handleError } from "./errors";
import { questionsRoutes } from "./routes/questions.routes";
import { answersRoutes } from "./routes/answers.routes";
import { usersRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";

export const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/questions", questionsRoutes);
app.use("/responses", answersRoutes);
app.use("/login", loginRoutes);

app.use(handleError);
