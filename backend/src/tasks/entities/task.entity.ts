import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 'To Do' })
  status: string; // 'To Do', 'Doing', 'Completed', 'On Hold'

  @Column({ default: 'Medium' })
  priority: string; // 'Low', 'Medium', 'High'

  @Column({ nullable: true })
  dueDate: string;

  @Column({ nullable: true })
  reporter: string; // For Guest Login, maybe just guest name

  // Storing members and labels as simple JSON for this assignment
  @Column('simple-json', { nullable: true })
  members: any;

  @Column('simple-json', { nullable: true })
  labels: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
