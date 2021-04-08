import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCompanyIdToReleaseGroups1617901423327
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'release_groups',
      new TableColumn({
        name: 'company_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'release_groups',
      new TableForeignKey({
        name: 'ReleaseGroupCompany',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('release_groups', 'ReleaseGroupCompany');

    await queryRunner.dropColumn('release_groups', 'company_id');
  }
}
