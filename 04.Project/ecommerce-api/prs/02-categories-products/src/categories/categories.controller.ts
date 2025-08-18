
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}
  @Get() list() { return this.service.findAll(); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post() create(@Body() dto: CreateCategoryDto) { return this.service.create(dto); }
}
