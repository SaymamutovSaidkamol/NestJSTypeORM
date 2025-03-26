import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from 'src/entitie/profil';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private Profile: Repository<Profile>) {}
    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
      const profile = this.Profile.create(createProfileDto);
      return this.Profile.save(profile);
    }
  
    async findAll(): Promise<Profile[]> {
      const profiles = await this.Profile.find();
      if (!profiles.length) {
        throw new NotFoundException('No profiles found');
      }
      return profiles;
    }
  
    async findOne(id: number): Promise<Profile> {
      const profile = await this.Profile.findOne({ where: { id } });
  
      if (!profile) {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }
  
      return profile;
    }
  
    async update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
      const profile = await this.findOne(id);
  
      Object.assign(profile, updateProfileDto);
      await this.Profile.save(profile);
      
      return this.findOne(id);
    }
  
    async remove(id: number): Promise<void> {
      const result = await this.Profile.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }
    }
}
