const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res
        .status(401)
        .json({ message: "Not found token, Authorization" });
    }
    // split select position index token from header
    const token = headerToken.split(" ")[1];

    // jwt , options env secret
    const decode = jwt.verify(token, process.env.SECRET, { complete: true });

    console.log(decode);
    console.log("Hello middleware");
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Token Invalid" });
  }
};
