import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academic.interface';
import { Months } from './academic.constant';

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
    throw new Error('This semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
