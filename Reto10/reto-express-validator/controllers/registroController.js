export const registrarUsuario = (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;

    // Aquí iría la lógica para guardar en base de datos
    // Por ahora solo simulamos el éxito

    res.status(201).json({
      success: true,
      mensaje: "Usuario registrado con éxito",
      data: {
        nombre,
        correo,
        edad,
        // No devolver la contraseña por seguridad
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al registrar usuario",
    });
  }
};