import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  
  @Column()
  last_name: string;

  @Column()
  fullname: string;

  @Column({
  unique: true,
})
  email: string;

  @Column()
  password: string;

  @Column({
  default: "nigerian"
})
  nationality: string;

  @Column({
    default: ""
  })
  home_address: string;

  @Column({
    default: ""
  })
  state_of_residence: string;

  @Column({
  type: 'enum',
  enum: ['male', 'female'],
  default: 'male'
})
  gender: string;

  @Column({ 
    type: 'date',
 })
  date_of_birth: Date;

  @Column()
  age: number;

  @Column({
  default: ""
})
  phone_number: string;

  @Column({
  type: 'enum',
  enum: ['admin', 'user'],
  default: 'user' // Default role is 'User'
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Account, account => account.user)
  account: Account;

}
