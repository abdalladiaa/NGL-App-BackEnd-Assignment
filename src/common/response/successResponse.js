export default function successResponse({
  res,
  status = 200,
  message = "Done",
  data,
}) {
  return res.status(status).send({
    success: true,
    message,
    data,
  });
}
