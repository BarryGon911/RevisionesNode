import 'dotenv/config';
import connectDB from '#config/db.js';
import mongoose from 'mongoose';
import User from '#models/User.js';
import Category from '#models/Category.js';
import Product from '#models/Product.js';
import Cart from '#models/Cart.js';
import Order from '#models/Order.js';

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Cart.deleteMany({}),
    Order.deleteMany({})
  ]);

  const usersData = [
    { name: 'Admin', email: 'admin@example.com', password: 'password123', role: 'admin' },
    { name: 'Ana', email: 'ana@example.com', password: 'password123' },
    { name: 'Luis', email: 'luis@example.com', password: 'password123' },
    { name: 'María', email: 'maria@example.com', password: 'password123' },
    { name: 'Carlos', email: 'carlos@example.com', password: 'password123' },
    { name: 'Sofía', email: 'sofia@example.com', password: 'password123' },
    { name: 'Diego', email: 'diego@example.com', password: 'password123' },
    { name: 'Lucía', email: 'lucia@example.com', password: 'password123' },
    { name: 'Jorge', email: 'jorge@example.com', password: 'password123' },
    { name: 'Elena', email: 'elena@example.com', password: 'password123' }
  ];
  const users = await User.insertMany(usersData);

  const categories = await Category.insertMany(
    Array.from({ length: 10 }).map((_, i) => ({
      name: `Categoría ${(i+1).toString().padStart(2,'0')}`,
      description: `Descripción de la categoría ${(i+1).toString().padStart(2,'0')}`
    }))
  );

  const products = await Product.insertMany(
    Array.from({ length: 12 }).map((_, i) => ({
      name: `Producto ${(i+1).toString().padStart(2,'0')}`,
      description: `Descripción del producto ${(i+1).toString().padStart(2,'0')}`,
      price: Math.round(100 + Math.random() * 900),
      stock: 10 + Math.floor(Math.random() * 40),
      category: pick(categories)._id
    }))
  );

  const exampleOrders = [];
  for (let i = 0; i < 5; i++) {
    const user = pick(users.filter(u => u.role !== 'admin'));
    const itemCount = 1 + Math.floor(Math.random() * 3);
    const items = [];
    let total = 0;
    for (let j = 0; j < itemCount; j++) {
      const p = pick(products);
      const quantity = 1 + Math.floor(Math.random() * 2);
      items.push({ product: p._id, quantity, price: p.price });
      total += p.price * quantity;
    }
    exampleOrders.push({ user: user._id, items, total });
  }
  await Order.insertMany(exampleOrders);

  console.log('Seed completo');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((e) => {
  console.error('Seed falló', e);
  process.exit(1);
});
