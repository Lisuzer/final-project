import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
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
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from '../user/schemas/user-role.enum';
import { CarriagesService } from './carriages.service';
import { CreateCarriageDto } from './dto/create-carriage.dto';
import { UpdateCarriageDto } from './dto/update-carriage.dto';

@ApiTags('carriages')
@Controller('carriages')
export class CarriagesController {
  constructor(private readonly carriagesService: CarriagesService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
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
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Get all carriages | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async find() {
    return this.carriagesService.find();
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
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
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Get carriage by id | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carriagesService.findOneById(id);
  }

  @ApiCreatedResponse({
    description: 'Entity successfully created',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiBadRequestResponse({
    description: 'Error while creating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Creating carriage | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateCarriageDto) {
    return this.carriagesService.create(dto);
  }

  @ApiOkResponse({
    description: 'Entity successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiBadRequestResponse({
    description: 'Error updating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Updating carriage | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCarriageDto,
  ) {
    return this.carriagesService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Entity successfully deleted',
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
  @ApiOperation({ description: 'Deleting carriage | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.carriagesService.delete(id);
  }
}
