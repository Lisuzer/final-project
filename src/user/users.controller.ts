import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { LinkEmployeeAdnUserDto } from './dto/link-employee-and-user.dto';
import { UpdateUserStatusDto } from './dto/update-status.dto';
import { UserRole } from './schemas/user-role.enum';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({
    description: 'Entities successfully linked',
  })
  @ApiNotFoundResponse({
    description: 'Entities not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while linking entities',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description:
      'Linking existing user entity to employee entity | Required roles: **ADMIN**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/link-employee-user')
  async linkEmployeeAndUser(@Body() dto: LinkEmployeeAdnUserDto) {
    return await this.userService.linkEmployeeAndUser(dto);
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Getting all system users | Required roles: **ADMIN**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/all')
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Getting user by email | Required roles: **ADMIN**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/by-email')
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @ApiOkResponse({
    description: 'Successfully deleted entity',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while deleting entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Deleting user | Required roles: ADMIN' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
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
    description: 'Changing user status | Required roles: **ADMIN**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/status')
  async updateStatus(@Body() dto: UpdateUserStatusDto) {
    return await this.userService.updateStatus(dto);
  }
}
