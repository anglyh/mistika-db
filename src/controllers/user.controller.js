require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Para encriptar la contraseña

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validar si faltan campos en la solicitud
    if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });
    if (!email) return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    if (!password) return res.status(400).json({ message: 'La contraseña es obligatoria' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'El correo electrónico ya está registrado' });

    // Validar longitud mínima de la contraseña
    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const payload = { userId: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token al cliente
    res.status(201).json({ message: 'Usuario creado', token });
  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar si faltan campos en la solicitud
    if (!email) return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    if (!password) return res.status(400).json({ message: 'La contraseña es obligatoria' });

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no registrado' });

    // Comparar la contraseña encriptada con la ingresada por el usuario
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Crear el token y enviarlo en la respuesta
    const payload = { userId: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Usuario logeado', token });
  } catch (error) {
    console.error(error); // Añadir logging para depuración
    res.status(500).send({ message: error.message });
  }
};
