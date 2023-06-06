import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';

const createSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemisterData
    );
    return res.status(200).json({
      success: true,
      message: 'academic semister created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemisterController = {
  createSemister,
};
