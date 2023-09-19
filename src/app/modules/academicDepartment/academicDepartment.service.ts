import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentUpdatedEvent,
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );

  return result;
};

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereConditons =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereConditons)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true, // returns the document after updateting
    }
  ).populate('academicFaculty');
  return result;
};

const insertIntoDBFromEvent = async (
  e: AcademicDepartmentCreatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });

  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };
  await AcademicDepartment.create(payload);
};

const updateOneInDBFromEvent = async (
  e: AcademicDepartmentUpdatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };

  await AcademicDepartment.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: payload,
    }
  );
};

const deleteOneFromDBFromEvent = async (syncId: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId });
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  deleteDepartment,
  updateDepartment,
  insertIntoDBFromEvent,
  updateOneInDBFromEvent,
  deleteOneFromDBFromEvent,
};
