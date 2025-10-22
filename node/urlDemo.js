import url from "url";

const urlString = "https://www.google.com/search?q=hello+world";

// URL object, pasing the string
const urlObj = new URL(urlString);
console.log(urlObj);
console.log(urlObj.pathname);

// format()
console.log(url.format(urlObj));

// import.meta.url - file url - some meta data
console.log(import.meta.url);

// fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));

// Query params, itll give an object with q and its value hellow world
console.log(urlObj.search);
const params = new URLSearchParams(urlObj.search);

// to get just the value
console.log(params.get("q"));

// to add onto the object/ key
params.append("limit", "5");
console.log(params);

// delete
params.delete("limit");
console.log(params);

console.log(url.parse(urlString));
