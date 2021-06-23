import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('units_measure')
class UnitMeasure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unit: string;

  @Column()
  abbreviation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UnitMeasure;
