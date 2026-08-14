import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  title: string;

  @Prop({ default: 'To Do' })
  status: string;

  @Prop({ default: 'Medium' })
  priority: string;

  @Prop()
  dueDate: string;

  @Prop()
  reporter: string;

  @Prop({ type: Object, default: {} })
  members: any;

  @Prop({ type: Object, default: {} })
  labels: any;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
