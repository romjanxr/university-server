import { Schema, model } from 'mongoose';
import {
  Guardian,
  localGuardian,
  Student,
  Username,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<Username>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const gurdianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccuPation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardian = new Schema<localGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: String,
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: gurdianSchema,
  localGuardian: localGuardian,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema);
