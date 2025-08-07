export const obtenerPerfil = (req, res) => {
  try {
    const usuario = req.usuario;
    res.json({
      success: true,
      message: "Perfil obtenido exitosamente",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        ultimoAcceso: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};