import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.interface';

export const AcademicSemisterMonths: academicSemisterMonths[] = [
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

export const AcademicSemisterTitles: academicSemisterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemisterCodes: academicSemisterCodes[] = [
  '01',
  '02',
  '03',
];

export const AcademicSemisterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
