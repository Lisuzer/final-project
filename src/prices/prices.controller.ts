import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('prices')
@Controller('prices')
export class PricesController {}
