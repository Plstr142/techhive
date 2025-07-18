const prisma = require("../config/prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // destructuring
    const { email, password } = req.body;

    // Step 1 Validate body
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required!" });
    }

    // Step 2 Check Email in DB already ?
    const user = await prisma.user.findFirst({
      // check field in table db
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Step 3 Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    // Step 4 Register
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });

    res.send("Register Success");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    // destructuring
    const { email, password } = req.body;

    // Step 1 Check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !user.enabled) {
      return res.status(400).json({ message: "User not found or not enabled" });
    }
    // Step 2 Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password Invalid!" });
    }
    // Step 3 Create Payload (body)
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // Step 4 Generate Token
    jwt.sign(
      payload,
      process.env.SECRET,
      // expires in ? day/hour/minutes
      { expiresIn: "120d" },
      (error, token) => {
        if (error) {
          return res.status(500).json({ message: "Server Error" });
        }

        // send to client
        res.json({ payload, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
