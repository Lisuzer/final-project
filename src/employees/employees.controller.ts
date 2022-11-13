import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeeServ: EmployeesService) { }

    @Get()
    async index() {
        return await this.employeeServ.findAll();
    }

    @Get(':id')
    async find(@Param('id', ParseUUIDPipe) id: string) {
        return await this.employeeServ.findOneById(id);
    }

    @Post()
    async create(@Body() dto: CreateEmployeeDto) {
        return await this.employeeServ.create(dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateEmployeeDto,
    ) {
        return await this.employeeServ.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.employeeServ.delete(id);
    }
}
