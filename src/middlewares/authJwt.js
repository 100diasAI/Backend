const jwt = require('jsonwebtoken');
const { Usuario } = require('../db');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token recibido:', token);

  if (!token) {
    console.log('No se proporcionó token, permitiendo acceso sin autenticación.');
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.userId = decoded.id;
    console.log('Usuario autenticado:', req.userId);
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Requiere rol de administrador" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};