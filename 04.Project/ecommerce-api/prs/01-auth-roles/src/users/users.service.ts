
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.userModel.create({ ...dto, password: hash });
  }

  async findAll(page=1, pageSize=10) {
    const [items, total] = await Promise.all([
      this.userModel.find({}, { password: 0 }).skip((page-1)*pageSize).limit(pageSize),
      this.userModel.countDocuments(),
    ]);
    return { items, total, page, pageSize };
  }

  async findByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id, { password: 0 });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const u = await this.userModel.findByIdAndUpdate(id, dto, { new: true, projection: { password: 0 } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async remove(id: string) {
    const r = await this.userModel.findByIdAndDelete(id);
    if (!r) throw new NotFoundException('User not found');
    return { deleted: true };
  }
}
