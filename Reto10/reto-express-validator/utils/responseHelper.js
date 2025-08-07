export const successResponse = (res, data, mensaje = "") => {
  return res.status(200).json({
    success: true,
    mensaje,
    data
  });
};

export const errorResponse = (res, errors, status = 400) => {
  return res.status(status).json({
    success: false,
    errors
  });
};