require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Asignar el id del usuario al objeto req

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};
