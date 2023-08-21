import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import Funnels from './Funnel';

@Entity()
class Pipelines extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => Funnels)
  @JoinColumn()
  funnel: Funnels;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
  @Column({nullable:true})
  description: string;

}

export default Pipelines;
