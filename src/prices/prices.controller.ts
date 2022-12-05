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
import { CreatePriceDto } from './dto/create-price.dto';
import { FindByTypesDto } from './dto/find-by-types.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PricesService } from './prices.service';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly priceServ: PricesService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiOperation({ description: 'Getting all prices | Required roles: Guest' })
  @Get()
  async findAll() {
    return this.priceServ.findAll();
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
  @ApiOperation({
    description: 'Getting price by types | Required roles: Guest',
  })
  @Get('by-types')
  async getByTypes(@Query() dto: FindByTypesDto) {
    return this.priceServ.getByTypes(dto);
  }

  @ApiOkResponse({
    description: 'Returns exact price',
  })
  @ApiForbiddenResponse({
    description: 'User is not allowed to access this resource',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiOperation({ description: 'Getting all prices | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.priceServ.findOneById(id);
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
  @ApiOperation({ description: 'Creating price | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreatePriceDto) {
    return this.priceServ.create(dto);
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
  @ApiOperation({ description: 'Updating price | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePriceDto,
  ) {
    return this.priceServ.update(id, dto);
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
  @ApiOperation({ description: 'Deleting price | Required roles: Manager' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.priceServ.delete(id);
  }
}
