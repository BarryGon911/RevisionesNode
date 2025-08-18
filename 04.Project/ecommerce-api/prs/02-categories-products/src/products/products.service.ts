
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  async list(page=1, pageSize=10) {
    const [items, total] = await Promise.all([
      this.model.find().populate('category').skip((page-1)*pageSize).limit(pageSize),
      this.model.countDocuments(),
    ]);
    return { items, total, page, pageSize };
  }
  async create(dto: CreateProductDto) {
    const doc = await this.model.create({ name: dto.name, price: dto.price, stock: dto.stock, category: new Types.ObjectId(dto.categoryId) });
    return doc;
  }
  async get(id: string) {
    const doc = await this.model.findById(id).populate('category');
    if (!doc) throw new NotFoundException('Product not found');
    return doc;
  }
  async update(id: string, dto: UpdateProductDto) {
    const update: any = { ...dto };
    if (dto.categoryId) { update.category = new Types.ObjectId(dto.categoryId); delete update.categoryId; }
    const doc = await this.model.findByIdAndUpdate(id, update, { new: true });
    if (!doc) throw new NotFoundException('Product not found');
    return doc;
  }
  async remove(id: string) {
    const r = await this.model.findByIdAndDelete(id);
    if (!r) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}
