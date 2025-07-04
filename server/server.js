// Step 1 import ....
const express = require("express");
const morgan = require("morgan");
const app = express();

// middleware
app.use(morgan("combined"));

// parse body json
app.use(express.json());

// Step 3 Router
app.get("/api", (req, res) => {
  const { email } = req.body;
  console.log(email);
  res.send("Hello from the server");
});

// Step 2 start server
app.listen(5000, () => console.log("Server is running on port 5000"));
