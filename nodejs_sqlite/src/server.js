import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// get the directiory name from file path
const __dirname = dirname(__filename);

// Middleware
// when clients send something you need to interpretate it and this configures json and pass/interpretes it.
app.use(express.json());
// Seerves the HTML file from the /pubic directory
// tells express to serve all files from the pubic folder as static assests /file.
// Any requests for the css files will be rsolved to the public directory.
app.use(express.static(path.join(__dirname, "../public")));
console.log(__dirname);
// Serving up the HTML file from the /public directory for the css files will be resolved
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//Routes

app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server had started on ${PORT}`);
});
