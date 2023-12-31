import Router from "express";
import { registration, login, getUser, content, deleteUser, editUser } from "./controllers/authController.js";
import { check } from "express-validator";

import checkRole from "./middleware/roleMiddleware.js";
import checkAuthorization from "./middleware/authMiddleware.js";



const router = new Router();

router.post('/login', [
   check("username", "Имя пользователя не может быть пустым").notEmpty(),
   check("username", "Пароль не может быть пустым").notEmpty(),
   check("username", "Имя пользователя не может содержать пробелов").not().contains(' '),
   check("username", "Имя пользователя должно быть на латиннице").not().matches(/[а-яА-Я]/)
], login)
router.post('/registration', [
   check("username", "Имя пользователя не может быть пустым").notEmpty(),
   check("username", "Имя пользователя должно быть больше 1 символа и меньше 20").isLength({ min: 2, max: 20 }),
   check("username", "Имя пользователя должно быть на латиннице").not().matches(/[а-яА-Я]/),
   check("username", "Имя пользователя не может содержать пробелов").not().contains(' '),
   check("password", "Пароль должен быть больше 3 и меньше 45 символов").isLength({ min: 4, max: 45 }),
   check("password", "Пароль пользователя не может содержать пробелов").not().contains(' '),
   check("password", "Пароль должен быть на латинице ЗАЕБАЛ!").not().matches(/[а-яА-Я]/)
], registration)
router.get('/users', checkRole(["ADMIN"]), getUser)
router.get('/content', checkAuthorization, content)
router.delete('/delete-user', deleteUser)
router.put('/edit',
   [
      check("newName", "Имя пользователя не может быть пустым").notEmpty(),
      check("newName", "Имя пользователя не может содержать пробелов").not().contains(' '),
      check("newName", "Имя пользователя должно быть больше 1 символа и меньше 20").isLength({ min: 2, max: 20 }),
      check("newName", "Имя пользователя должно быть на латиннице").not().matches(/[а-яА-Я]/)
   ],
   editUser)

export default router