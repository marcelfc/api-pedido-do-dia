import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('form_payments')
class FormPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  form_payment: string;

  @Column()
  credit: boolean;

  @Column()
  debit: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FormPayment;
