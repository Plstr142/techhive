const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

// exports.createProfile = async (req, res) => {
//   try {
//     const { username, bio, userId } = req.body;

//     if (!username || !bio) {
//       return res
//         .status(400)
//         .json({ message: "Username and Bio are required!" });
//     }

//     const profile = await prisma.profile.create({
//       data: {
//         username,
//         bio,
//         user: {
//           connect: { id: userId },
//         },
//       },
//     });

//     res.status(200).json(profile);
//     // const countProfiles = await prisma.profile.count({
//     //   where: {
//     //     userId,
//     //   },
//     // });

//     // if (countProfiles >= 2) {
//     //   return res
//     //     .status(400)
//     //     .json({ message: "You can only have up to 2 profiles" });
//     // }

//     // const newProfile = await prisma.profile.create({
//     //   data: {
//     //     username,
//     //     bio,
//     //     user: {
//     //       connect: { id: userId },
//     //     },
//     //   },
//     // });

//     // res.status(201).json(newProfile);
//   } catch (error) {
//     console.error("Create profile error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.createProfile = async (req, res) => {
  try {
    const { username, bio, userId } = req.body;

    if (!username || !bio || !userId) {
      return res
        .status(400)
        .json({ message: "Username, Bio and userId are required!" });
    }

    const existingProfile = await prisma.profile.findFirst({
      where: { userId: Number(userId) },
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user!" });
    }

    const newProfile = await prisma.profile.create({
      data: {
        username,
        bio,
        user: { connect: { id: Number(userId) } },
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
    const { id } = req.params;
    const profile = await prisma.profile.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("read profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.listProfile = async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : undefined;

    const profiles = await prisma.profile.findMany({
      where: { userId: req.user.id },
      take: count,
      orderBy: { createdAt: "desc" },
    });

    res.json(profiles);
  } catch (error) {
    console.error("listProfile error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// await prisma.username.Many({
//   where: {
//     profile: Number(req.params.id),
//   },
// });

exports.updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const profileId = Number(req.params.id);

    const existingProfile = await prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: req.user.id,
      },
    });

    if (!existingProfile) {
      return res
        .status(404)
        .json({ message: "Profile not found or unauthorized" });
    }

    const profile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        username,
        bio,
      },
    });

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
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
