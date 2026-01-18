import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    fullName: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;
}
