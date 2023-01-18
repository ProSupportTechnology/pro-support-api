import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleError } from "./errors";
import { questionsRoutes } from "./routes/questions.routes";
import { answersRoutes } from "./routes/answers.routes";
import { usersRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/questions", questionsRoutes);
app.use("/answers", answersRoutes);
app.use("/login", loginRoutes);

app.use(handleError);
