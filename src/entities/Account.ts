import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bank_name: string;
  
  @Column()
  account_name: string;

  @Column({
  unique: true
  })
  account_number: number;

  @Column()
  account_balance: number;

  @Column()
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, user => user.account)
  @JoinColumn({ name: 'user_id'}) // foreign key
  user: User;

}
