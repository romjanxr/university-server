import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: StudentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(StudentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      StudentData,
    );

    sendResponse(res, {
      success: true,
      message: 'Student is created successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
