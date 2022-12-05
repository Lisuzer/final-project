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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeServ: EmployeesService) {}

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Getting all employees | Required roles: MANAGER, ADMIN',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.employeeServ.findAll();
  }

  @ApiOkResponse({
    description: 'Entity found',
  })
  @ApiNotFoundResponse({
    description: 'Entity not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({
    description: 'Getting employee by id | Required roles: MANAGER, ADMIN',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.employeeServ.findOneById(id);
  }

  @ApiCreatedResponse({
    description: 'Entity created',
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error while creating entity',
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Permission not granted',
  })
  @ApiOperation({ description: 'Creating employee | Required roles: MANAGER' })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    return await this.employeeServ.create(dto);
  }

  @ApiOkResponse({
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
    description: 'Update employee | Required roles: MANAGER',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return await this.employeeServ.update(id, dto);
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
    description: 'Delete employee by id | Required roles: MANAGER',
  })
  @ApiBearerAuth('JWT-auth')
  @Roles(UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeServ.delete(id);
  }
}
