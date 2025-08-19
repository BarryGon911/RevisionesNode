import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

function randomElement(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function main() {
  await connectDB(process.env.MONGODB_URI);

  await Promise.all([User.deleteMany({}), Category.deleteMany({}), Product.deleteMany({}), Cart.deleteMany({}), Order.deleteMany({})]);

  // 10 categorías
  const categories = await Category.insertMany(
    Array.from({ length: 10 }).map((_, i) => ({
      name: `Categoria ${i+1}`,
      description: `Descripción de la categoría ${i+1}`
    }))
  );

  // 10 productos
  const products = await Product.insertMany(
    Array.from({ length: 10 }).map((_, i) => ({
      name: `Producto ${i+1}`,
      description: `Descripción del producto ${i+1}`,
      price: Math.round((Math.random()*100 + 10) * 100) / 100,
      stock: Math.floor(Math.random()*50) + 10,
      category: randomElement(categories)._id
    }))
  );

  // 10 usuarios (1 admin + 9 cliente)
  const passwordHash = await bcrypt.hash('Password123!', 10);
  const users = await User.insertMany([
    { name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' },
    ...Array.from({ length: 9 }).map((_, i) => ({ name: `Usuario ${i+1}`, email: `user${i+1}@example.com`, passwordHash, role: 'cliente' }))
  ]);

  console.log('✅ Datos sembrados:', { categories: categories.length, products: products.length, users: users.length });

  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});