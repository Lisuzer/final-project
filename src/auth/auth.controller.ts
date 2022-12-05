import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserRole } from '../user/schemas/user-role.enum';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Successfully created entity',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while creating entity',
  })
  @ApiOperation({
    description: 'Lets user register in system | Required roles: **Guest**',
  })
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials',
  })
  @ApiOperation({
    description: 'Lets user login in system | Required roles: **Guest**',
  })
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }

  @ApiOkResponse({
    description: 'Entity updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiOperation({
    description: 'Change user role | Required roles: **ADMIN**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('change-role')
  async changeRole(@Body() dto: ChangeUserRoleDto) {
    return await this.authService.changeUserRole(dto);
  }

  @ApiOkResponse({
    description: 'Getting user entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiOperation({
    description: 'Getting user entity | Required conditions: **Authorized**',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async getUser(@Request() req) {
    return await this.authService.getUser(req);
  }

  @ApiOkResponse({
    description: 'Entity updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while updating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiOperation({
    description: 'Updating user | Required conditions: **Authorized**',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update-profile')
  async updateProfile(@Body() dto: UpdateUserDto, @Request() req) {
    return await this.authService.updateProfile(dto, req);
  }
}
