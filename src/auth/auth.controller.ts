import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserRole } from 'src/user/schemas/user-role.enum';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { LinkEmployeeAdnUserDto } from './dto/link-employee-and-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() dto: RegisterUserDto) {
        return await this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        return await this.authService.login(dto);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('change-role')
    async changeRole(@Body() dto: ChangeUserRoleDto) {
        return await this.authService.changeUserRole(dto);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users')
    async getAllUsers() {
        return await this.authService.getAllUsers();
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('user')
    async getUser(@Request() req) {
        return await this.authService.getUser(req);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('link-employee-user')
    async linkEmployeeAndUser(@Body() dto: LinkEmployeeAdnUserDto) {
        return await this.authService.linkEmployeeAndUser(dto);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('update-profile')
    async updateProfile(@Body() dto: UpdateUserDto, @Request() req) {
        return await this.authService.updateProfile(dto, req);
    }
}
