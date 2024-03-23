

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the user document
const userSchema: Schema<UserDocument> = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the model for the user document
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;

