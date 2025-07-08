exports.create = async (req, res) => {
  try {
    res.send("Hello create Product");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    res.send("Hello list Product");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    res.send("Hello remove Product");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listby = async (req, res) => {
  try {
    res.send("Hello listby Product");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    res.send("Hello searchFilters Product");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
