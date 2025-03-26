import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entitie/Author';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private Author: Repository<Author>) {}
  async create(CreateAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.Author.create(CreateAuthorDto);
    return this.Author.save(author);
  }

  async findOne(id: number): Promise<Author> {
    let One = await this.Author.findOne({
      where: { id },
      relations: ['profiles'],
    });

    if (!One) {
      throw new NotFoundException("Not Found Author")
    }
    return One
  }

  async findAll(): Promise<Author[]> {
    return this.Author.find();
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.Author.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.Author.delete(id);
  }
}
