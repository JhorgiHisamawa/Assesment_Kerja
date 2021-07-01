const jwt = require("jsonwebtoken");
const { user } = require("../models");

class AuthController {
  async getToken(req, res) {
    try {
      //data user
      const body = {
        id: req.user._id,
        role: req.user.role,
        email: req.user.email,
      };
      const token = jwt.sign(
        {
          user: body,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        { algorithm: "RS256" }
      );
      return res.status(200).json({
        message: "Success",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server Error",
        error: error,
      });
    }
  };
};

module.exports = new AuthController();