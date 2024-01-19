import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ValidationPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { HashearSenhaPipe } from 'src/common/pipes/hashear-senha.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { FiltersDto } from './dto/filters.dto';
import { ParseIntPipe } from '@nestjs/common';

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
    async findAll(@Query()  filtersDto: FiltersDto) {
        //A conversão automática do tipo de dado não estava funcionando, por isso fiz essa implementação
        if(filtersDto.page){
            if(filtersDto.page < 1 )
                throw new BadRequestException('page must not be less than 1');
        }else
            filtersDto.page = 1;

        return await this.userService.findAll(filtersDto);
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
