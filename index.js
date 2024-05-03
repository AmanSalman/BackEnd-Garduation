import express from 'express'
import 'dotenv/config'
import { connectDB } from './DB/connection.js';
import { Appinit } from './src/Appinit.js';

const app = express();
const PORT = process.env.PORT || 3000;

 Appinit(app,express);

 connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})
 }).catch(err =>{
   console.log("fail while connecting to server"+ err);
 })




