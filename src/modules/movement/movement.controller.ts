import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementsDTO } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Auth, GuardRoute } from '../auth/auth.guard';
import { AuthPresenter } from '../auth/presenter/auth.presenter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('movement')
@ApiTags('movement')
@ApiBearerAuth()
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  @GuardRoute('movement.create')
  create(@Auth() auth:AuthPresenter, @Body() createMovementDto:CreateMovementsDTO ) {
    return this.movementService.create(auth, createMovementDto);
  }

  @Get()
  @GuardRoute('movement.read')
  findAll(@Auth() auth:AuthPresenter) {
    return this.movementService.findAll(auth);
  }

  @Patch(':id')
  @GuardRoute('movement.update')
  update(@Auth() auth:AuthPresenter, @Param('id') id: string, @Body() updateMovementDto: UpdateMovementDto) {
    return this.movementService.update(auth, +id, updateMovementDto);
  }

  @Delete(':id')
  @GuardRoute('movement.delete')
  remove(@Auth() auth: AuthPresenter, @Param('id') id: string) {
    return this.movementService.remove(auth, +id);
  }
}
