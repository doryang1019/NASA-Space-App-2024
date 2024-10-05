import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpoPlanetTable51728017769597 implements MigrationInterface {
    name = 'ExpoPlanetTable51728017769597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expo_planet_node" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_182a3d3615297acb954dc12c638" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expo_planet_node_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_69eabdf72667fc69123886225c4" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf9a20beab114c32f5699ec924" ON "expo_planet_node_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_4de90a9135f998ead2dcc30b1c" ON "expo_planet_node_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "expo_planet_node" ADD CONSTRAINT "FK_06e78124e562844997c647f5f78" FOREIGN KEY ("parentId") REFERENCES "expo_planet_node"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expo_planet_node_closure" ADD CONSTRAINT "FK_cf9a20beab114c32f5699ec9244" FOREIGN KEY ("id_ancestor") REFERENCES "expo_planet_node"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expo_planet_node_closure" ADD CONSTRAINT "FK_4de90a9135f998ead2dcc30b1c3" FOREIGN KEY ("id_descendant") REFERENCES "expo_planet_node"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expo_planet_node_closure" DROP CONSTRAINT "FK_4de90a9135f998ead2dcc30b1c3"`);
        await queryRunner.query(`ALTER TABLE "expo_planet_node_closure" DROP CONSTRAINT "FK_cf9a20beab114c32f5699ec9244"`);
        await queryRunner.query(`ALTER TABLE "expo_planet_node" DROP CONSTRAINT "FK_06e78124e562844997c647f5f78"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4de90a9135f998ead2dcc30b1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf9a20beab114c32f5699ec924"`);
        await queryRunner.query(`DROP TABLE "expo_planet_node_closure"`);
        await queryRunner.query(`DROP TABLE "expo_planet_node"`);
    }

}
