import express from "express";
import mongoose from "mongoose";
import router from "./router.js"

const app = express()
const PORT = 5000
app.use(express.json())
app.use('/auth', router)

const start = async () => {

   try {
      await mongoose.connect('mongodb+srv://infinitycorpkz:XbimDUUJ5GBeUmak@auth.p3upvph.mongodb.net/')
      app.listen(PORT, () => console.log(`MakeAuth has been launched on ${PORT} port....`))
   } catch (e) {
      console.log(e);
   }

}
start()