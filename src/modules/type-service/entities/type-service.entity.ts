import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('type_services')
class TypeService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type_service: string;

  @Column()
  delivery: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TypeService;
