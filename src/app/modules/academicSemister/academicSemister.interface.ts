import { Model } from 'mongoose';

export type academicSemisterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type academicSemisterTitles = 'Autumn' | 'Summer' | 'Fall';

export type academicSemisterCodes = '01' | '02' | '03';

export type IAcademicSemister = {
  title: academicSemisterTitles;
  year: number;
  code: academicSemisterCodes;
  startMonth: academicSemisterMonths;
  endMonth: academicSemisterMonths;
};

export type AcademicSemisterModel = Model<IAcademicSemister>;
