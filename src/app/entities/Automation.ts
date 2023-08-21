import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity()
class Automations extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable:true})
  input: string;

  @Column({nullable:true})
  condition: string;
  
  @Column({nullable:true})
  action: string;
  
  @Column({nullable:true})
  output: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
}

export default Automations;
