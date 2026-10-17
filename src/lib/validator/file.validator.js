
import { fileTypeFromFile } from "file-type";
import fs from "node:fs/promises";
import AppError from "../../pkg/error/error.js";

export const fileValidation = (allowedTypes) => {
  return async (req, res, next) => {
    const filePath = req.file?.path;

    if (!filePath) {
      return next(new AppError("File is required", 400));
    }

    try {
      const type = await fileTypeFromFile(filePath);

      if (!type || !allowedTypes.includes(type.mime)) {
        await fs.unlink(filePath);
        return next(new AppError("Invalid file type", 400));
      }

      return next();
    } catch (error) {
      await fs.unlink(filePath);
      return next(error);
    }
  };
};
