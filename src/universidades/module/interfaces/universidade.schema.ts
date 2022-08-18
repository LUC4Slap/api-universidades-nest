import * as mongoose from 'mongoose';

export const UniversidadeSchema = new mongoose.Schema(
  {
    name: String,
    webPage: String,
    country: String,
  },
  {
    timestamps: true,
    collection: 'universities',
  },
);
