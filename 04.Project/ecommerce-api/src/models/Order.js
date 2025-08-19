import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }, // snapshot del precio
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['creada', 'pagada', 'enviada', 'completada', 'cancelada'], default: 'creada' },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);