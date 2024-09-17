import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;