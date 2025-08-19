// src/seeds/seed.ts
// Seed script for ecommerce-api (NestJS + MongoDB + Mongoose)
// Creates: 1 admin + 9 customers (total 10 users), 10 categories, 20 products.
// Idempotent: uses upserts; safe to run multiple times.

import 'dotenv/config';
import { connect, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

// Reuse app schemas to avoid duplication
import { User, UserSchema } from '../users/schemas/user.schema';
import { Category, CategorySchema } from '../categories/schemas/category.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_api';
  await connect(uri);

  const UserModel = model<User>(User.name, UserSchema);
  const CategoryModel = model<Category>(Category.name, CategorySchema);
  const ProductModel = model<Product>(Product.name, ProductSchema);

  // --- Users (1 admin + 9 customers) ---
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@mail.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassw0rd!';
  const adminHash = await bcrypt.hash(adminPassword, 10);

  await UserModel.findOneAndUpdate(
    { email: adminEmail },
    { email: adminEmail, name: 'Admin', password: adminHash, role: 'admin' as any },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const baseCustomerHash = await bcrypt.hash('Password123!', 10);
  const customers = Array.from({ length: 9 }).map((_, i) => ({
    email: `user${i + 1}@mail.com`,
    name: `User ${i + 1}`,
    password: baseCustomerHash,
    role: 'customer' as any,
  }));

  for (const u of customers) {
    await UserModel.findOneAndUpdate(
      { email: u.email.toLowerCase() },
      u,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  // --- Categories (10) ---
  const categoryNames = [
    'Electronics',
    'Books',
    'Clothing',
    'Home & Kitchen',
    'Sports',
    'Beauty',
    'Toys',
    'Automotive',
    'Garden',
    'Pets'
  ];

  const categories = [];
  for (const name of categoryNames) {
    const cat = await CategoryModel.findOneAndUpdate(
      { name },
      { name },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    categories.push(cat);
  }

  // --- Products (20) ---
  const products = Array.from({ length: 20 }).map((_, i) => {
    const idx = i + 1;
    const category = categories[i % categories.length];
    const price = 49.99 + i * 5;
    const stock = 10 + (i % 5) * 10;

    return {
      name: `Product ${idx}`,
      price: Number(price.toFixed(2)),
      stock,
      category: category._id as any,
    };
  });

  for (const p of products) {
    await ProductModel.findOneAndUpdate(
      { name: p.name },
      p,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log('✅ Seed complete: 1 admin, 9 customers, 10 categories, 20 products.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
