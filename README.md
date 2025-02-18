# PF-M08UF2

## Cambios para la autenticación JWT:
### Backend:
- **controller/login.js:** Se encarga de verificar que el usuario/contraseña sean correctos, y genera un token.
- **mw/auth.js:** Comprueba que el usuario tenga un token valido para realizar una operación.
- **.env:** Contiene la clave secreta.

