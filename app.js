import express from "express";
import mongoose from "mongoose";
import router from "./router.js"
import cors from "cors"
import RoleSchema from "./models/Role.js"

const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())
app.use('/auth', router)


//ФУНКЦИЯ СОЗДАНИЯ НОВОЙ РОЛИ, раскомментировать при необходимости создания новой роли, в аргумент вписать строковое значение новой роли
/* 
const newRole = async (name) => {

   const newRole = new RoleSchema({ value: `${name.toUpperCase()}` })
   newRole.save()

}
newRole('petuh')
*/


const start = async () => {

   try {
      await mongoose.connect('mongodb://localhost:27017/users-list')
      app.listen(PORT, () => console.log(`MakeAuth has been launched on ${PORT} port....`))
   } catch (e) {
      console.log(e);
   }

}
start()