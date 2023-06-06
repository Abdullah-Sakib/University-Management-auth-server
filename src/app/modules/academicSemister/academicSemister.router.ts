import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidation } from './academicSemister.validation';
import { AcademicSemisterController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemisterController.createSemister
);

export const AcademicSemisterRouter = router;
