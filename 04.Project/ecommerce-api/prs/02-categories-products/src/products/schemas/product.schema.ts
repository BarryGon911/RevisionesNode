
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, min: 0 }) price: number;
  @Prop({ required: true, min: 0 }) stock: number;
  @Prop({ type: Types.ObjectId, ref: Category.name, required: true }) category: Types.ObjectId;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
