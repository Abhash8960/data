import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import {ConnectDb} from "./connectdb/conn.js";
import {router }from "./routing/routing.js";
import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname)
export const imagepath = path.join(dirname, 'images');


const app = express()
dotenv.config()
const port = process.env.PORT


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/",router)
app.use("/",express.static("images"));
 ConnectDb()

app.listen(port,() => {
console.log(`server is running on port number ${port}`)
})