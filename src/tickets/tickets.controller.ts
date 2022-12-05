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
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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
import { BookTicketDto } from './dto/book-ticket.dto';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { GetFreeSeatsDto } from './dto/get-free-seats.dto';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TicketStatus } from './schemas/ticket-status.enum';
import { TicketsService } from './tickets.service';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Getting ticket statistics | Required roles: BOSS',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.BOSS)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('statistics')
  async getStatistics(@Query() dto: GetStatisticsDto) {
    return this.ticketsService.getStatistics(dto);
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiOperation({
    description: 'Getting unoccupied places | Required roles: Guest',
  })
  @Get('free-seats')
  async getFreeSeats(@Query() dto: GetFreeSeatsDto) {
    return this.ticketsService.getFreeSeats(dto);
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiOperation({
    description:
      'Getting ticket by buyer id | Required conditions: **Authorized**',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async getUserTickets(@Request() req) {
    return this.ticketsService.getUserTickets(req);
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
    description: 'Updating ticket status | Required roles: MANAGER',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ticketsService.updateStatus(id, dto);
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
    description: 'Getting all tickets | Required roles: MANAGER',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.ticketsService.findAll();
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
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
    description: 'Getting ticket by id | Required roles: MANAGER',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketsService.findOneById(id);
  }

  @ApiCreatedResponse({
    description: 'Entity created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while creating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Booking train ticket | Required conditions: Authorized',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('book')
  async book(@Body() dto: BookTicketDto, @Request() req) {
    return this.ticketsService.book(dto, req);
  }

  @ApiCreatedResponse({
    description: 'Entity created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while creating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Buying train ticket | Required conditions: Authorized',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('buy')
  async buy(@Body() dto: BuyTicketDto, @Request() req) {
    return this.ticketsService.buy(dto, req);
  }

  @ApiOkResponse({
    description: 'Entity deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while deleting entity',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Delete train ticket by id | Required roles: Manager',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketsService.delete(id);
  }
}
