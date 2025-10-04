/**
 * Seed script - creates an admin user and a dummy user
 * Usage: npm run seed
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please set MONGODB_URI in .env.local');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const User = mongoose.model('User', userSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);
  const admin = await User.findOne({ email: 'admin@example.com' });
  if (!admin) {
    const hashed = await bcrypt.hash('Admin123!', 10);
    await User.create({ email: 'admin@example.com', password: hashed, name: 'Admin' });
    console.log('Created admin user: admin@example.com / Admin123!');
  } else {
    console.log('Admin already exists');
  }

  const dummy = await User.findOne({ email: 'user@example.com' });
  if (!dummy) {
    const hashed2 = await bcrypt.hash('User123!', 10);
    await User.create({ email: 'user@example.com', password: hashed2, name: 'Dummy User' });
    console.log('Created dummy user: user@example.com / User123!');
  } else {
    console.log('Dummy user already exists');
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
