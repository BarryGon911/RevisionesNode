
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: Product.name, required: true }) product: Types.ObjectId;
  @Prop({ required: true, min: 1 }) quantity: number;
  @Prop({ required: true, min: 0 }) price: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true }) user: Types.ObjectId;
  @Prop({ type: [OrderItemSchema], required: true }) items: OrderItem[];
  @Prop({ required: true, min: 0 }) total: number;
  @Prop({ enum: ['created','paid','shipped','completed','canceled'], default: 'created' }) status: string;
  @Prop() shippingAddress?: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
