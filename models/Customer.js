import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  age: { type: Number },
  purchaseDate: { type: Date },
  rating: { type: Number, min: 1, max: 5 },
  favoriteFlavor: { type: String },
  wouldRecommend: { type: Boolean, default: false },
  comments: { type: String },
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
