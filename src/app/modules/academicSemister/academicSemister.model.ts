import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemisterModel,
} from './academicSemister.interface';

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
