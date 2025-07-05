exports.create = async (req, res) => {
  try {
    res.send("Hello create Category");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    res.send("Hello list Category");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
