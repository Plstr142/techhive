const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    // code
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    // console.log(title, description, price, quantity, images);
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    // findMany = get all but limit is not all
    const products = await prisma.product.findMany({
      // filtering limit product
      take: parseInt(count),
    });

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    res.send("Hello update Product");
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
