// you dont have to import the process module, it is a global module.
// its helful for command line interfaces.

// argv
console.log(process);
console.log(process.argv);
console.log(process.argv[2]);

// process.env
console.log(process.env.LOGNAME);

// pid - node js process id
console.log(process.pid);

// title
console.log(process.title);

// cwd() -  current working directory
console.log(process.cwd());

// memoryUsage()
console.log(process.memoryUsage());

// uptime() - time of the process
console.log(process.uptime());

// process event listenenrs while were about to exit
process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

// exit() - exit the process, 0 means sucess and 1 failure/error.
process.exit(0);
console.log("hello, fom after the exit"); // not ran because its after exit.
