import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Release } from '@modules/releases/infra/typeorm/entities/Release';
import { Company } from '@modules/companies/infra/typeorm/entities/Company';

@Entity('release_dates')
export class ReleaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  release_id: string;

  @ManyToOne(() => Release, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'release_id' })
  release: Release;

  @Column()
  company_id: string;

  @ManyToOne(() => Company, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
