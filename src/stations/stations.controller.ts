import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stations')
@Controller('stations')
export class StationsController {}
