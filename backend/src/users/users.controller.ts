import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Post()
    create(@Body() body: { fullName: string; email: string }) {
        return this.service.create(body.fullName, body.email);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
}
