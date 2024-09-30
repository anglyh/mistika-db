require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Para encriptar la contraseña

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Usuario ya existe' });

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Crear el payload para el token
    const payload = { userId: user.id };

    // Firmar el token con la clave secreta (deberías guardarla en .env)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token al cliente
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no registrado' });

    // Comparar la contraseña encriptada con la ingresada por el usuario
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    // Crear el token y enviarlo en la respuesta
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error); // Añadir logging para depuración
    res.status(500).send('Error del servidor');
  }
};

exports.verifyToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).json({ msg: 'Token no proporcionado' });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si el token es válido, puedes buscar al usuario por su ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Si todo está bien, devolver una respuesta positiva
    return res.status(200).json({ msg: 'Token válido', user });
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};