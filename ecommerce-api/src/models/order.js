import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  status: { type: String, enum: ["pending","paid","shipped","canceled"], default: "pending" },
  total: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;