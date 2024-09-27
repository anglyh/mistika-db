const User = require('../models/User');
// const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Usuario ya existe' });

    user = new User({ name, email, password });
    await user.save();

    // const payload = { userId: user.id };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.status(201).json({ token });
    res.status(201).json({ msg: 'Usuario creado' });
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no registrado' });

    if (user.password !== password) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    // const payload = { userId: user.id };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.status(200).json({ token });
    res.status(200).json({ msg: 'Usuario logueado' });
  } catch (error) {
    console.error(error); // Añadir logging para depuración
    res.status(500).send('Error del servidor');
  }
}
