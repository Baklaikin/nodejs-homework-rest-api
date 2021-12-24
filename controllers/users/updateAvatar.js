const fs = require("fs/promises");
const { User } = require("../../schemas/users");
const path = require("path");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  const avatarUrl = path.join(__dirname, "../../", "public", "avatars");

  try {
    const resultOfUpload = path.join(avatarUrl, imageName);

    await fs.rename(tempUpload, resultOfUpload);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarUrl });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
