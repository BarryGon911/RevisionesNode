// Simulamos una “base de datos” en memoria
const usuarios = [];

export const registrarUsuario = (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;
	// Simular ID auto-incremental
    const id = usuarios.length + 1;
	// Creamos el objeto usuario (sin la contraseña en el objeto público)
    const nuevoUsuario = { id, nombre, correo, edad };
	// Guardamos internamente, incluyendo la contraseña (en un caso real, aquí la hashearías)
	usuarios.push({ ...nuevoUsuario, contraseña });
	// Devolvemos sólo los datos seguros
    return res.status(201).json({
      success: true,
      mensaje: "Usuario registrado con éxito",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({
      success: false,
      error: "Error al registrar usuario",
    });
  }
};