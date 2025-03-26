import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './Author';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  age: number;

  @Column()
  location: string;

  @ManyToOne(() => Author, (author) => author.profiles, { onDelete: 'CASCADE' })
  author: Author;
}
