import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './department.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

/* Pre middleware to prevent duplicate entry */
AcademicDepartmentSchema.pre('save', async function (next) {
  const alreadyExists = await AcademicDepartment.findOne({ name: this.name });

  if (alreadyExists) {
    throw new AppError(httpStatus.CONFLICT, 'Department already exists');
  }
  next();
});

/* Prevent update when wrong id provided */
AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExists = await AcademicDepartment.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exists');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
