import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
    ) {}

    create(fullName: string, email: string) {
        const user = this.repo.create({ fullName, email });
        return this.repo.save(user);
    }

    findAll() {
        return this.repo.find({ order: { id: 'DESC' } });
    }
}
