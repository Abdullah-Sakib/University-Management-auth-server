import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utility';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // Default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set user role
  user.role = 'student';

  // find academic semester
  const academicSemester = await AcademicSemester.findById(
    student?.academicSemester
  );

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);

    user.id = id as string;
    student.id = id as string;

    // newStudent will return an array
    const newStudent = await Student.create([student], { session });

    if (!newStudent?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    user.student = newStudent[0]._id;

    // newUser will return an array
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    // Populate user data with related student information
    newUserAllData = await User.findOne({ id: newUserAllData?.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
