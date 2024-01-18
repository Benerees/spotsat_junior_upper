import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { HashearSenhaPipe } from 'src/common/pipes/hashear-senha.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    async create(
        @Body() { password, ...createUserDto }: CreateUserDto,
        @Body('password', HashearSenhaPipe) passwordHashed: string
    ) {
        return this.userService.create({
            ...createUserDto,
            password: passwordHashed
        });
    }
    
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
