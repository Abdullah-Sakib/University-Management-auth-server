import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemisterModel,
} from './academicSemister.interface';

const userSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  userSchema
);
