const validator = require("validator");
const mongoose = require("mongoose");

class UserValidator {
  async validate(req, res, next) {
    try {
      let act = req.route.path.substring(1).replace('/:id', '');
      let errors = [];
      if (act === "signup") {
        if (!validator.isAlpha(validator.blacklist(req.body.name, " "))) {
          errors.push("Nama harus alfabet");
        }

        if (
          !validator.isStrongPassword(req.body.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          })
        ) {
          errors.push(
            "Kata sandi harus mempunyai minimal 8 karakter, 1 lowercase karakter, 1 Uppercase karakter, 1 angka, and 1 simbol"
          );
        }

        if (req.body.confirmPassword !== req.body.password) {
          errors.push("Kata sandi tidak sesuai");
        }
      }

      if (!validator.isEmail(req.body.email)) {
        errors.push("Email anda tidak valid");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
}
module.exports = new UserValidator();