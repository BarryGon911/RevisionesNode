
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddItemDto, UpdateItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private model: Model<CartDocument>) {}

  async getOrCreate(userId: string) {
    const uid = new Types.ObjectId(userId);
    let cart = await this.model.findOne({ user: uid });
    if (!cart) cart = await this.model.create({ user: uid, items: [] });
    return cart;
  }

  async view(userId: string) {
    const cart = await this.getOrCreate(userId);
    return cart;
  }

  async addItem(userId: string, dto: AddItemDto) {
    const cart = await this.getOrCreate(userId);
    const pid = new Types.ObjectId(dto.productId);
    const idx = cart.items.findIndex(i=> i.product.equals(pid));
    if (idx >= 0) cart.items[idx].quantity += dto.quantity;
    else cart.items.push({ product: pid, quantity: dto.quantity } as any);
    await cart.save();
    return cart;
  }

  async updateItem(userId: string, itemId: string, dto: UpdateItemDto) {
    const cart = await this.getOrCreate(userId);
    const item = cart.items.id(itemId);
    if (!item) throw new NotFoundException('Cart item not found');
    item.quantity = dto.quantity;
    await cart.save();
    return cart;
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreate(userId);
    const item = cart.items.id(itemId);
    if (!item) throw new NotFoundException('Cart item not found');
    item.deleteOne();
    await cart.save();
    return cart;
  }

  async clear(userId: string) {
    const cart = await this.getOrCreate(userId);
    cart.items = [];
    await cart.save();
    return cart;
  }
}
