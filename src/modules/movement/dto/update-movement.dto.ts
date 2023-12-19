import { PartialType } from '@nestjs/mapped-types';
import { MovementDto } from './create-movement.dto';

export class UpdateMovementDto extends PartialType(MovementDto) {}
