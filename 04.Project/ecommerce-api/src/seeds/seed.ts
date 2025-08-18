
import { connect, model } from 'mongoose';
import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new Schema({ email: {type:String, unique:true}, name: String, password: String, role: {type:String, default:'customer'} }, { timestamps: true });
const CategorySchema = new Schema({ name: {type:String, unique:true} }, { timestamps: true });
const ProductSchema = new Schema({ name: String, price: Number, stock: Number, category: { type: Schema.Types.ObjectId, ref: 'Category' } }, { timestamps: true });

async function run() {
  await connect(process.env.MONGODB_URI!);
  const User = model('User', UserSchema);
  const Category = model('Category', CategorySchema);
  const Product = model('Product', ProductSchema);

  // Admin
  const adminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'AdminPassw0rd!', 10);
  await User.updateOne({ email: process.env.ADMIN_EMAIL || 'admin@mail.com' }, { $set: { name: 'Admin', password: adminPass, role: 'admin' } }, { upsert: true });

  // Customers
  const custPass = await bcrypt.hash('Passw0rd!', 10);
  await User.updateOne({ email: 'user1@mail.com' }, { $set: { name: 'User One', password: custPass, role: 'customer' } }, { upsert: true });
  await User.updateOne({ email: 'user2@mail.com' }, { $set: { name: 'User Two', password: custPass, role: 'customer' } }, { upsert: true });

  // Categories
  const catNames = ['Mugs','T-Shirts','Stickers','Books','Hats','Bags','Posters','Keychains','Notebooks','Pens'];
  const cats = [];
  for (const name of catNames) {
    const up = await Category.findOneAndUpdate({ name }, { name }, { upsert: true, new: true });
    cats.push(up);
  }

  // Products (20)
  for (let i=0;i<20;i++) {
    const c = cats[i % cats.length];
    const name = `Product ${i+1}`;
    const price = 50 + i * 5;
    const stock = 10 + (i % 5) * 10;
    await Product.findOneAndUpdate({ name }, { name, price, stock, category: c._id }, { upsert: true });
  }

  console.log('Seed complete');
  process.exit(0);
}
run();
