
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: Product.name, required: true }) product: Types.ObjectId;
  @Prop({ required: true, min: 1 }) quantity: number;
}
export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: User.name, unique: true, required: true }) user: Types.ObjectId;
  @Prop({ type: [CartItemSchema], default: [] }) items: CartItem[];
}
export const CartSchema = SchemaFactory.createForClass(Cart);
