import multer, { diskStorage } from "multer";
import AppError from "../../pkg/error/error.js";

function fileUpload(allowedType) {
  return multer({
    fileFilter:(req ,file ,cb)=>{
        if(!allowedType.includes(file.mimetype)){
            return cb(new AppError(`Only ${allowedType.join(", ")} files are allowed` , 400) , false)
        }
        cb(null , true)
    },
    storage: diskStorage({
      destination: "uploads",
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  });
}

export function uploadSingleFile(fieldName , allowedType) {
  return fileUpload(allowedType).single(fieldName);
}

export function uploadMultipleFiles(fieldName, maxCount) {
  return fileUpload(allowedType).array(fieldName, maxCount);
}

export function uploadFields(fields) {
  return fileUpload(allowedType).fields(fields);
}
