import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

const checkRole = (acceptedRoles) => {

   return function (req, res, next) {

      if (req.method === "OPTIONS") next()

      try {

         const token = req.headers.authorization.split(' ')[1]
         if (!token) return res.status(403).json({ message: "Пользователь не авторизован" })

         const { roles } = jwt.verify(token, SECRET_KEY)
         let validRole = false

         roles.forEach(r => {
            if (acceptedRoles.includes(r)) validRole = true
         });

         if (!validRole) return res.status(403).json({ message: `Доступ только для ${acceptedRoles}` })
         next()

      } catch (e) {
         console.log(e);
         res.status(403).json({ message: "Пользователь не авторизован" })
      }

   }

}
export default checkRole