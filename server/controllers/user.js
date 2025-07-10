exports.listUsers = async (req, res) => {
  try {
    res.send("Hello users");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
