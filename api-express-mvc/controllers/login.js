const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const db = require('./db');

// Clave secreta (guárdala en .env)
const SECRET_KEY = process.env.JWT_SECRET || '1234';

// Función para autenticar usuario y generar JWT
const generateToken = async (req, res) => {
    try {
        if (req.body.username != "admin") {
            return res.json({ error: 'Usuario no encontrado' });
        }

        if (req.body.password != "1234") {
            return res.json({ error: 'Contraseña incorrecta' });
        }

        // Generar JWT con datos del usuario
        const payload = { username: req.body.username };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        
        return res.json({ 'token': token });
    } catch (err) {
        console.error('Error en autenticación:', err);
        return { error: 'Error interno del servidor' };
    }
};

module.exports = {
    generateToken: generateToken
}