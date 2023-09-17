import { Model } from 'mongoose';

export type academicSemesterMonths =
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

export type academicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type academicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemester = {
  title: academicSemesterTitles;
  year: number;
  code: academicSemesterCodes;
  startMonth: academicSemesterMonths;
  endMonth: academicSemesterMonths;
  syncId: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemisterFilter = {
  searchTerm?: string;
};

export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
