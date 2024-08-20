import { TAcademicFaculty } from './faculty.interface';
import { AcademicFaculty } from './faculty.model';

const insertFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSpecificFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};

const updateFacultyInDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  insertFacultyIntoDB,
  getFacultiesFromDB,
  getSpecificFacultyFromDB,
  updateFacultyInDB,
};
