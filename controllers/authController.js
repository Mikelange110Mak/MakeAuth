import UserSchema from "../models/User.js"
import RoleSchema from "../models/Role.js"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js";

const generateToken = (id, username, roles) => {
   const payload = { id, username, roles }
   return jwt.sign(payload, SECRET_KEY, { expiresIn: "2 days" })
}

const registration = async (req, res) => {

   try {


      /////////----ОБРАБОТЧИК ОШИБОК------///////////
      //Получаю ошибки
      const errors = validationResult(req)
      if (!errors.isEmpty()) {

         //Пустой массив куда буду складывать сообщения ошибок
         let errorList = []

         //Перебор ошибок, вытаскиваю сообщения из них и помещаю в массив
         for (let i in errors.errors) errorList.push(errors.errors[i].msg);

         //Возвращаю на клиент сообщение ошибки
         return res.status(400).send(errorList)
      }


      const { username, password } = req.body
      const candidate = await UserSchema.findOne({ username })
      if (candidate) return res.status(400).json({ message: "Пользователь с таким именем уже существует" })

      const hashPassword = bcrypt.hashSync(password, 6)
      const userRole = await RoleSchema.findOne({ value: "USER" })

      const user = new UserSchema({ username, password: hashPassword, roles: [userRole.value] })
      await user.save()

      res.send(`Пользователь ${username} успешно зарегистрирован!`)

   } catch (e) {

      console.log(e);
      res.status(400).json({ message: "Registration error" })

   }

}

const login = async (req, res) => {

   const { username, password } = req.body
   const user = await UserSchema.findOne({ username })

   if (!user) return res.status(400).json({ message: `Пользователя с именем ${username} не существует` })

   const isValidPassword = bcrypt.compareSync(password, user.password)
   if (!isValidPassword) return res.status(400).json({ message: `Неправильный пароль для ${username}` })

   const token = generateToken(user._id, user.username, user.roles)
   res.json({ token })

}

const getUser = async (req, res) => {

   const users = await UserSchema.find()
   res.json({ users })

}

export { registration, login, getUser }