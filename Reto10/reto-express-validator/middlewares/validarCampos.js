import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
	// Formatear errores para ajustarse al README
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

// Método proporcinado por Rodrigo

// import { validationResult } from "express-validator";

// export const validarCampos = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
    // return res.status(400).json({
      // success: false,
      // errors: errors.array().map((error) => ({
        // field: error.path,
        // message: error.msg,
        // value: error.value,
      // })),
    // });
  // }
  // next();
// };