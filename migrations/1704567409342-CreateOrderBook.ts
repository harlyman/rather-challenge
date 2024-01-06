import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderBook1704567409342 implements MigrationInterface {
    name = 'CreateOrderBook1704567409342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orderbook\` (\`guid\` varchar(36) NOT NULL, \`pair\` varchar(10) NOT NULL, \`bidAmount\` double NOT NULL, \`bidPrice\` double NOT NULL, \`askAmount\` double NOT NULL, \`askPrice\` double NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`orderbook_idx_pair\` (\`pair\`), PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`orderbook_idx_pair\` ON \`orderbook\``);
        await queryRunner.query(`DROP TABLE \`orderbook\``);
    }

}
