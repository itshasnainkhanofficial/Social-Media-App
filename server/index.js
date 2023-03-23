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
import { register } from "./controllers/auth.js"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
dotenv.config()
const app = express()











// Middleware
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan("tiny"))
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







// Routes
app.post("/auth/register",  upload.single("picture"), register)
app.use("/auth", authRoutes)
app.use("/users", userRoutes);










//Connecting Mongodb
const PORT = process.env.PORT || 3001 || 6001;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( () => {

  app.listen(PORT, () => console.log(`Server Connect on Port: ${PORT}`));

}).catch((error) => console.log(`Mongodb Did not connect here is the message: ${error}`))


