require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Acceso denegado. Token no proporcionado.' });

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) { 
    res.status(403).json({ msg: 'Token inválido o expirado.' });
  }
};
