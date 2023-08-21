import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity()
class Mailers extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  text: string;

  @Column({nullable:true})
  template: string;

  @Column({nullable:true})
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  

}

export default Mailers;
