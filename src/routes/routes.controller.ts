import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {}
