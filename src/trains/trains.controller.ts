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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from '../user/schemas/user-role.enum';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainsService } from './trains.service';

@ApiTags('trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainServ: TrainsService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiOperation({
    description: 'Getting train schedule | Required role: **Guest**',
  })
  @Get('train-routes')
  async findSchedule(@Query('trainNumber') trainNumber: number) {
    return await this.trainServ.findSchedule(trainNumber);
  }
  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiOperation({
    description: 'Getting all trains | Required role: **Guest**',
  })
  @Get()
  async findAll() {
    return this.trainServ.findAll();
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Getting train by id | Required role: **MANAGER**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trainServ.findOneById(id);
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
    description: 'Creating train | Required role: **MANAGER**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateTrainDto) {
    return this.trainServ.create(dto);
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
    description: 'Updating train | Required role: **MANAGER**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrainDto,
  ) {
    return this.trainServ.update(id, dto);
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
    description: 'Deleting train | Required role: **MANAGER**',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.trainServ.delete(id);
  }
}
