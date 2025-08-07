import { successResponse } from "../utils/responseHelper.js";

export const registrarUsuario = (req, res) => {
  const { nombre, correo, edad } = req.body;
  return successResponse(
    res,
    { nombre, correo, edad },
    "Usuario registrado con éxito"
  );
};
