exports.register = async (req, res) => {
  try {
    //code
    res.send("Hello Register In Controller");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    //code
    res.send("Hello Login In Controller");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    // code
    res.send("Hello current user");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
