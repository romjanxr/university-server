import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './semester.interface';
import { Months } from './semester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Spring', 'Summer', 'Fall'],
      required: true,
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/* Middleware to prevent duplicate entry */
AcademicSemesterSchema.pre('save', async function (next) {
  const semesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  console.log(semesterExists);

  if (semesterExists) {
    throw new AppError(httpStatus.CONFLICT, 'This semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
