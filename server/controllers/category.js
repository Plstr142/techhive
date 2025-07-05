exports.create = async (req, res) => {
  try {
    res.send("Hello Category");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
