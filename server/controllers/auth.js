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

    console.log(email, password);
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
