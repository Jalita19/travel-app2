const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./models/userModel');
const Destination = require('./models/destinationModel');
const Review = require('./models/reviewModel');

require('dotenv').config();

// Connect to MongoDB
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Review.deleteMany({});

    // Sample users
    const users = await User.insertMany([
      { username: 'john_doe', email: 'john@example.com', password: 'password123' },
      { username: 'jane_doe', email: 'jane@example.com', password: 'password123' },
      { username: 'sam_smith', email: 'sam@example.com', password: 'password123' },
      { username: 'emily_jones', email: 'emily@example.com', password: 'password123' },
      { username: 'mike_ross', email: 'mike@example.com', password: 'password123' }
    ]);

    // Sample destinations
    const destinations = await Destination.insertMany([
      { name: 'Paris', location: 'France', description: 'The city of light', imageUrl: 'https://example.com/paris.jpg' },
      { name: 'New York', location: 'USA', description: 'The city that never sleeps', imageUrl: 'https://example.com/newyork.jpg' },
      { name: 'Tokyo', location: 'Japan', description: 'A city that blends traditional and modern', imageUrl: 'https://example.com/tokyo.jpg' },
      { name: 'Sydney', location: 'Australia', description: 'Famous for its opera house', imageUrl: 'https://example.com/sydney.jpg' },
      { name: 'Rio de Janeiro', location: 'Brazil', description: 'Known for its carnival', imageUrl: 'https://example.com/rio.jpg' }
    ]);

    // Sample reviews
    await Review.insertMany([
      { destinationId: destinations[0]._id, authorId: users[0]._id, rating: 5, comment: 'Amazing city with beautiful landmarks!' },
      { destinationId: destinations[1]._id, authorId: users[1]._id, rating: 4, comment: 'Great city but very crowded.' },
      { destinationId: destinations[2]._id, authorId: users[2]._id, rating: 5, comment: 'A perfect mix of history and modernity.' },
      { destinationId: destinations[3]._id, authorId: users[3]._id, rating: 4, comment: 'Stunning views and great weather.' },
      { destinationId: destinations[4]._id, authorId: users[4]._id, rating: 5, comment: 'Incredible experience during carnival!' }
    ]);

    console.log('Database seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

seedData();