import Router from "express";
import { registration, login, getUser } from "./controllers/authController.js";
import { check } from "express-validator";

import checkRole from "./middleware/roleMiddleware.js";
import checkAuthorization from "./middleware/authMiddleware.js";



const router = new Router();

router.get('/check', checkAuthorization, (req, res) => res.json({ message: req.user }))
router.post('/login', login)
router.post('/registration', [
   check("username", "Имя пользователя не может быть пустым").notEmpty(),
   check("username", "Имя пользователя должно быть больше 1 символа и меньше 20").isLength({ min: 2, max: 20 }),
   check("username", "Имя пользователя должно быть на латиннице").matches(/[a-zA-Z]/),
   check("password", "Пароль должен быть больше 3 и меньше 14 символов").isLength({ min: 4, max: 14 }),
   check("password", "Пароль должен быть на латинице ЗАЕБАЛ!").matches(/[a-zA-Z]/)
], registration)
router.get('/users', checkRole(["ADMIN"]), getUser)

export default router