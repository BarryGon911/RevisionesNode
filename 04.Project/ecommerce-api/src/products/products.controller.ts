
import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}
  @Get() list(@Query('page') page=1, @Query('pageSize') pageSize=10) { return this.service.list(+page, +pageSize); }
  @Get(':id') get(@Param('id') id: string) { return this.service.get(id); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('admin')
  @Post() create(@Body() dto: CreateProductDto) { return this.service.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('admin')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateProductDto) { return this.service.update(id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('admin')
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
