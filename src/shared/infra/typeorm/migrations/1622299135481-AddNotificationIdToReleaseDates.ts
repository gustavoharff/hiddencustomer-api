import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNotificationIdToReleaseDates1622299135481
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'release_dates',
      new TableColumn({
        name: 'notification_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('release_dates', 'notification_id');
  }
}
