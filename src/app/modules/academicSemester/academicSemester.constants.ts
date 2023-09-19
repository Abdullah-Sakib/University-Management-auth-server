import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.interface';

export const AcademicSemesterMonths: academicSemesterMonths[] = [
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

export const AcademicSemesterTitles: academicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCodes: academicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const AcademicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
  'syncId',
];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester.updated';
export const EVENT_ACADEMIC_SEMESTER_DELETED = 'academic-semester.deleted';
