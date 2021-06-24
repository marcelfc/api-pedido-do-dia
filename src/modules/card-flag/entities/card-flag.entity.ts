import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('card_flags')
class CardFlag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_flag: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardFlag;
