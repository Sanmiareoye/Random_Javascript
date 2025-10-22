// Path module. utilities to work with file path.
import path from "path";
import url from "url";

const filePath = "./dir1/dir2/test.txt";

// basename() - returns the last portion of the path
console.log(path.basename(filePath));

// dirname() - returns the directory to the file
console.log(path.dirname(filePath));

// extname() - type of file, the extension name
console.log(path.extname(filePath));

// parse() - object with all the information
console.log(path.parse(filePath));

// if youre using common js,
// you have access to __dirname and __filename automatically.
// but in ES you have to create them.

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

// join() - create a file path based on the arguments passed in.
const filePath2 = path.join(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath2);

// resolve()
const filePath3 = path.resolve(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath3);
