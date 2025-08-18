
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GetUser } from '../common/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@GetUser() user: any, @Body() dto: CreateOrderDto) {
    return this.service.fromCart(user.userId, dto);
  }

  @Get('me')
  my(@GetUser() user: any) {
    return this.service.myOrders(user.userId);
  }
}
