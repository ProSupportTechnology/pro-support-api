import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Question } from "./question.entity";
import { User } from "./user.entity";

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 500 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.answer)
  user: User;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;
}
