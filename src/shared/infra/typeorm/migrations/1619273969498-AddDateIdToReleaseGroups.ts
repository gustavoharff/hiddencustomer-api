import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddDateIdToReleaseGroups1619273969498
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'release_groups',
      new TableColumn({
        name: 'release_date_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'release_groups',
      new TableForeignKey({
        name: 'ReleaseDateGroup',
        columnNames: ['release_date_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'release_dates',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('release_groups', 'ReleaseDateGroup');

    await queryRunner.dropColumn('release_groups', 'release_date_id');
  }
}
