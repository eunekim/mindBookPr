//joinController.js
const { User } = require("../models/User");


const joinSuccess = async (req, res, next) => {

  try {
    const { userid, userage, nickname, gender, password, favoriteBooks, createdAt } = req.body;

    if (!gender || !userage) {
      return res.status(400).json({ error: "모든 필드를 입력하세요." });
    }

    const user = new User({ userid, userage, nickname, gender, password, favoriteBooks, createdAt });
    await user.save();

    res.status(200).json({ message: "성공적으로 저장되었습니다." });
  } catch (err) {
    console.error("DB 저장 오류:", err);
    res.status(500).json({ error: "서버 오류" });
  }
};
exports.joinSuccess = joinSuccess;