import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Answer } from "./answer.entity";
import { User } from "./user.entity";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 20 })
  tech: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.question)
  user: User;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
