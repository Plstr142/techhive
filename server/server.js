// Step 1 import ....
const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/auth.js");
const app = express();

// middleware
app.use(morgan("combined"));

// parse body json
app.use(express.json());

// Step 3 Router
app.use("/api", authRouter);

app.post("/api", authRouter);

app.put("/api/:id", authRouter);

app.delete("/api/:id", authRouter);

// Step 2 start server
app.listen(5000, () => console.log("Server is running on port 5000"));
