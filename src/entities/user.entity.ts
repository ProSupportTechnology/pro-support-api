import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";
import { hashSync } from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 60 })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ nullable: true, length: 500 })
  bio: string;

  @Column({ length: 50 })
  name: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ nullable: true, length: 120 })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Answer, (answer) => answer.user)
  answer: Answer[];

  @OneToMany(() => Question, (question) => question.user)
  question: Question[];
}
