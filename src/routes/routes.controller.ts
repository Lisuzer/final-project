import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
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
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiOkResponse({
    description: 'Successful request returns suitable routes',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiNotFoundResponse({
    description: 'Routes, provided in request, does not exist',
  })
  @ApiOperation({
    description: 'Finding suitable routes by stations | Required roles: Guest',
  })
  @Get('find-by-stations')
  async findByStations(
    @Query('startStation') startStation: string,
    @Query('endStation') endStation: string,
  ) {
    return await this.routesService.findByStations({
      startStation,
      endStation,
    });
  }

  @ApiOkResponse({
    description: 'Returns all routes',
  })
  @ApiOperation({ description: 'Getting all routes | Required roles: Guest' })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async find(@Query('name') name?: string) {
    return await this.routesService.find(name);
  }

  @ApiOkResponse({
    description: 'Returns exact route by id',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiOperation({ description: 'Getting route by id | Required roles: Guest' })
  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.routesService.findOneById(id);
  }

  @ApiCreatedResponse({
    description: 'Successfully created entity',
  })
  @ApiBadRequestResponse({
    description: 'Error occurred while creating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Creating route | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateRouteDto) {
    return await this.routesService.create(dto);
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
  @ApiOperation({ description: 'Deleting route | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.routesService.delete(id);
  }
}
