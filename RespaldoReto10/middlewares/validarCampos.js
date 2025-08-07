import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    return res.status(400).json({
      success: false,
      errors: formatted
    });
  }
  next();
};
