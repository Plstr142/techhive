exports.authCheck = (req, res, next) => {
  try {
    console.log("Hello middleware");
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
