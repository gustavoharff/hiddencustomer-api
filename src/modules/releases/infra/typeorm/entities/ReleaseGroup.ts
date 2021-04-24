import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Release } from './Release';
import { ReleaseDate } from './ReleaseDate';

@Entity('release_groups')
export class ReleaseGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @Column()
  type: 'whatsapp' | 'discord' | 'telegram';

  @Column()
  release_date_id: string;

  @ManyToOne(() => ReleaseDate, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'release_date_id' })
  release_date: ReleaseDate;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
