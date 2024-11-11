require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });
    if (!email) return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    if (!password) return res.status(400).json({ message: 'La contraseña es obligatoria' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'El correo electrónico no es válido' });

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'El correo electrónico ya está registrado' });

    if (password.length < 6) return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const payload = { userId: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario creado', token });
  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    if (!password) return res.status(400).json({ message: 'La contraseña es obligatoria' });

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no registrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const payload = { userId: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(req.headers);
    res.status(200).json({ message: 'Usuario logeado', token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Token no proporcionado" });

  try {
      jwt.verify(token, process.env.JWT_SECRET);
      res.json({ message: "Token válido" });
  } catch (error) {
      res.status(401).json({ message: "Token inválido o expirado" });
  }
}
