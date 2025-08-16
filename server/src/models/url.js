import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
    {
        code: { type: String, unique: true, index: true, required: true },
        longUrl: { type: String, required: true },
        shortUrl: { type: String, required: true },
        clicks: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model('Url', urlSchema);
