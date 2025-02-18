const express = require('express')
const books = require('../controllers/books.js')
const login = require('../controllers/login.js')
const auth = require('../mw/auth.js')

// Instanciación del servidor
const router = express.Router()

// Configuración de las rutas
router.post('/api/login', login.generateToken)
router.get('/api/books', books.getBooks)

router.post('/api/books', auth.jwtAuth, books.createBook)
router.put('/api/books', auth.jwtAuth, books.updateBook)
router.delete('/api/books', auth.jwtAuth, books.deleteBook)

module.exports = router