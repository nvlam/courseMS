import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>
    ) {}

    findAll() {
        return this.repo.find({ order: { id: "ASC" } });
    }

    async findOne(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User ${id} not found`);
        return user;
    }

    async create(dto: CreateUserDto) {
        // check duplicate email to avoid DB 500
        const existed = await this.repo.findOne({ where: { email: dto.email } });
        if (existed) throw new ConflictException("Email already exists");

        const user = this.repo.create(dto);
        return this.repo.save(user);
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findOne(id);

        if (dto.email && dto.email !== user.email) {
            const existed = await this.repo.findOne({ where: { email: dto.email } });
            if (existed) throw new ConflictException("Email already exists");
        }

        Object.assign(user, dto);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        await this.repo.remove(user);
        return { deleted: true };
    }
}
