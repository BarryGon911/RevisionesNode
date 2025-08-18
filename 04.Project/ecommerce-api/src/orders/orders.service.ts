
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Cart, CartDocument } from '../cart/schemas/cart.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async fromCart(userId: string, dto: CreateOrderDto) {
    const uid = new Types.ObjectId(userId);
    const cart = await this.cartModel.findOne({ user: uid });
    if (!cart || cart.items.length === 0) throw new BadRequestException('Cart is empty');

    // Build order items + compute total and update stock
    const items = [];
    let total = 0;
    for (const ci of cart.items) {
      const p = await this.productModel.findById(ci.product);
      if (!p) throw new BadRequestException('Product not found');
      if (p.stock < ci.quantity) throw new BadRequestException('Insufficient stock');
      p.stock -= ci.quantity;
      await p.save();
      const price = p.price * ci.quantity;
      total += price;
      items.push({ product: p._id, quantity: ci.quantity, price: p.price });
    }
    const order = await this.orderModel.create({ user: uid, items, total, shippingAddress: dto.shippingAddress });
    cart.items = [];
    await cart.save();
    return order;
  }

  async myOrders(userId: string) {
    const uid = new Types.ObjectId(userId);
    return this.orderModel.find({ user: uid }).sort({ createdAt: -1 });
  }
}
