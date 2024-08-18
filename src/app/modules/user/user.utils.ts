import { TAcademicSemester } from '../academicSemester/academic.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  // remove first 6 digit eg: 203002
  return lastStudent?.id ? lastStudent.id.substring(6) : 0;
};

// year semesterCode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  const currentId = await findLastStudentId();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
