import express from 'express';
import { AcademicSemesterController } from './semester.controller';
import { AcademicSemesterValidation } from './semester.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAcademicSemesters);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSpecificAcademicSemester,
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
