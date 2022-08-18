import { Document } from 'mongoose';
export interface Universidade extends Document {
  name: string;
  webPage: string;
  country: string;
}
