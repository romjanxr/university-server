import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: StudentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, StudentData);

  sendResponse(res, {
    success: true,
    message: 'Student is created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const UserController = {
  createStudent,
};
