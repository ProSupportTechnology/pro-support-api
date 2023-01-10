import { MigrationInterface, QueryRunner } from "typeorm";

export class insertAdmUser1673372953434 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(email, "password", bio, "name", "isAdm", image) VALUES ('admin@prosupport.com', 'admin', 'Desenvolvedor especializado nas tecnologias mais utilizadas, com o intuito de responder perguntas para programadores profissionais', 'Pro Support', TRUE, 'https://www.undb.edu.br/hubfs/administra%C3%A7%C3%A3o%20undb-1.jpg');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'admin@prosupport.com';`);
  }
}
