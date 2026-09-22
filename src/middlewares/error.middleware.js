export default function errorMiddleWare(err, req, res, next) {
  if (err.isOperational) {
    return res.status(err.statusCode).send({
      success: false,
      message: err.message,
    });
  }
  console.log({
    message:err.message,
    stack:err.stack
  });
  return res.status(500).send({
    success: false,
    message: "Internal server error",
    
  });
}
