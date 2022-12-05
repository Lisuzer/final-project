import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
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
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from '../user/schemas/user-role.enum';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationsService } from './stations.service';

@ApiTags('stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsServ: StationsService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiOperation({
    description: 'Getting all stations information | Required roles: Guest',
  })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async find(@Query('name') name?: string) {
    return this.stationsServ.find(name);
  }

  @ApiOkResponse({
    description: 'Returns exact price',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiOperation({
    description: 'Getting all stations information | Required roles: Guest',
  })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.stationsServ.findOneById(id);
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
  @ApiOperation({
    description: 'Creating station | Required roles: MANAGER',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateStationDto) {
    return this.stationsServ.create(dto);
  }

  @ApiOkResponse({
    description: 'Entity successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Updating station | Required roles: Manager',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStationDto,
  ) {
    return this.stationsServ.update(id, dto);
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
  @ApiOperation({
    description: 'Deleting station | Required roles: Manager',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.stationsServ.delete(id);
  }
}
