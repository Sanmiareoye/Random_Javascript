import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notfound.js";

const app = express();

const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body paser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//logger middleware
// middleware
app.use(logger);

//middle wareee - runs betweenthe incoming request and outgoing response.
//setup static folder to run static html
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/posts", posts);

// routes error
app.use(notFound);

// errror handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
