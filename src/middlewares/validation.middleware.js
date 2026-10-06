import AppError from "../common/error/error.js";

export function validateBody(dto) {
  return (req, res, next) => {
    const result = dto.safeParse(req.body);
    if (result.success === false) {
      const errMsgs = result.error.issues
        .map((issue) => `${issue.path[0]} : ${issue.message}`)
        .join(", ");
      return next(new AppError(errMsgs, 400));
    }
    req.body = result.data;
    next();
  };
}
