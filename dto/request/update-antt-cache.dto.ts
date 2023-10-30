import { PartialType } from '@nestjs/mapped-types';
import { CreateAnttCacheDto } from './create-antt-cache.dto';

export class UpdateAnttCacheDto extends PartialType(CreateAnttCacheDto) {}