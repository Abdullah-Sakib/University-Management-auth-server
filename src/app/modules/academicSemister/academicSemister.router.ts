import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidation } from './academicSemister.validation';
const router = express.Router();

router.post(
  '/create-academic-semister',
  validateRequest(
    AcademicSemisterValidation.createAcademicSemisterZodSchema
  ) /* Congroller */
);

export const AcademicSemisterRouter = router;
