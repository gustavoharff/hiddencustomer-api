import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { Company } from '@modules/companies/infra/typeorm/entities/Company';

@Entity('releases')
export class Release {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  annotations: string;

  @Column()
  paid: boolean;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  company_id: string;

  @ManyToOne(() => Company, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
