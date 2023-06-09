import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemisterModel,
} from './academicSemister.interface';
import {
  AcademicSemisterCodes,
  AcademicSemisterMonths,
  AcademicSemisterTitles,
} from './academicSemister.constants';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemisterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemisterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemisterMonths,
    },
  },
  {
    timestamps: true,
  }
);

// Handling same year and same semister conflict issue using mongoose ( pre ) middleware or hook.
academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Semister already exists!!!');
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
