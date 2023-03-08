import { Document } from 'mongoose';

export interface IChat extends Document {
  readonly message: string;
}
