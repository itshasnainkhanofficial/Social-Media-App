import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
import helmet from "helmet"; // helps you secure your Node.js application by setting several HTTP headers. It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards
import morgan from "morgan"; // morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan("common"))
app.use(cors())
app.use("/assets", express.static(path.join(dirname, "public/assets"))) // storing image on localstorage, in real app it should be stored on clould like s3

// disabled for checking purpose
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// storing file on disk, the following code is from github readme https://github.com/expressjs/multer#readme
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage })
