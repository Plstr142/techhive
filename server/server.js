// Step 1 import ....
const express = require("express");
const morgan = require("morgan");
const app = express();
const { readdirSync } = require("fs");
// const authRouter = require("./routes/auth.js");
// const categoryRouter = require("./routes/category.js");

// middleware
app.use(morgan("combined"));

// parse body json
app.use(express.json());

// readdirSync("./routes").map((c) => console.log(c));
readdirSync("./routes").map((c) => app.use("/api", require("./routes/" + c)));

// Step 3 Router
// app.use("/api", authRouter);
// app.use("/api", categoryRouter);

// Step 2 start server
app.listen(5000, () => console.log("Server is running on port 5000"));
