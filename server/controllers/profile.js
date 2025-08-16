const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

exports.createProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const userId = req.user.id;

    if (!username || !bio) {
      return res
        .status(400)
        .json({ message: "Username and Bio are required!" });
    }

    const countProfiles = await prisma.profile.count({
      where: {
        userId,
      },
    });

    if (countProfiles >= 2) {
      return res
        .status(400)
        .json({ message: "You can only have up to 2 profiles" });
    }

    const newProfile = await prisma.profile.create({
      data: {
        username,
        bio,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.readProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileId = Number(req.params.id);

    const profile = await prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: userId,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Read profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileId = Number(req.params.id);

    const profile = await prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: userId,
      },
    });

    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found or unauthorized" });
    }

    await prisma.profile.delete({
      where: {
        id: profileId,
      },
    });

    res.json({ message: "Profile deleted successfully!" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
