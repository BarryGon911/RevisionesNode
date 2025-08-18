
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GetUser } from '../common/get-user.decorator';
import { AddItemDto, UpdateItemDto } from './dto/cart-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get() view(@GetUser() user: any) { return this.service.view(user.userId); }

  @Post('items') add(@GetUser() user: any, @Body() dto: AddItemDto) {
    return this.service.addItem(user.userId, dto);
  }

  @Patch('items/:id') update(@GetUser() user: any, @Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.service.updateItem(user.userId, id, dto);
  }

  @Delete('items/:id') remove(@GetUser() user: any, @Param('id') id: string) {
    return this.service.removeItem(user.userId, id);
  }
}
