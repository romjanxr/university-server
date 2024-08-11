import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;

    // Data validation using Joi

    const zodParsedData = studentValidationSchema.parse(StudentData);

    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // Send request
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message as string | 'Something went wrong',
        error: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students is retrived successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message as string | 'Something went wrong',
        error: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message as string | 'Something went wrong',
        error: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student Deleted successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;
    console.log(updatedData);
    const result = await StudentServices.updateStudentOnDB(
      studentId,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message as string | 'Data is not okay',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
