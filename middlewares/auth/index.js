const passport = require("passport"); // Import passport
const localStrategy = require("passport-local").Strategy; // Import Strategy
const { user } = require("../../models");

const bcrypt = require("bcrypt"); // Import bcrypt
const JWTstrategy = require("passport-jwt").Strategy; // Import JWT Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt; // Import ExtractJWT
const validator = require("validator");

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "email", // field for username from req.body.email
            passwordField: "password", // field for password from req.body.password
            passReqToCallback: true, // read other requests
        },
        async (req, email, password, done) => {
            try {
                let userSignUp = await user.create(req.body);
                // If success
                return done(null, userSignUp, {
                    message: "Pengguna tidak dapat dibuat",
                });
            } catch (e) {
                console.log(e);
                // If error, it will return not authorization
                if (e.code == 11000 && e.keyPattern.email == 1) {
                    return done(null, false, {
                        message: "Tolong gunakan email lain",
                    });
                } else {
                    return done(null, false, {
                        message: "Pengguna tidak dapat dibuat",
                    });
                }
            }
        }
    )
);

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email", // field for username from req.body.email
            passwordField: "password", // field for password from req.body.password
            passReqToCallback: true, // read other requests
        },
        async (req, email, password, done) => {
            try {
                const userSignin = await user.findOne({
                    email,
                });

                if (!userSignin) {
                    return done(null, false, {
                        message: "Pengguna tidak ditemukan",
                    });
                }

                const validate = await bcrypt.compare(password, userSignin.password);

                if (!validate) {
                    return done(null, false, {
                        message: "Kata Sandi salah !",
                    });
                }
                return done(null, userSignin, {
                    message: "Login berhasil !",
                });
            } catch (e) {
                console.log(e);
                // If error, it will return not authorization
                return done(e, false, {
                    message: "Tidak dapat mengautentikasi pengguna",
                });
            }
        }
    )
);

passport.use(
    "admin",
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            const userSignin = await user.findOne({
                _id: token.user.id,
            }, "role");

            if (userSignin.role.includes("admin")) {
                return done(null, token.user);
            }

            return done(null, false, { message: "Anda tidak punya wewenang" });
        }
    )
);
passport.use(
    "guru",
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            const userSignin = await user.findOne({
                _id: token.user.id,
            }, "role");

            if (userSignin.role.includes("guru")) {
                return done(null, token.user);
            }

            return done(null, false, { message: "Anda tidak punya wewenang" });
        }
    )
);

passport.use(
    "siswa",
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            const userSignin = await user.findOne({
                _id: token.user.id,
            }, "role");

            if (userSignin.role.includes("siswa")) {
                return done(null, token.user);
            }

            return done(null, false, { message: "Anda tidak punya wewenang" });
        }
    )
);

let doAuth = async (req, res, next) => {
    try {
      //get the user act (login or signup)
      let act = req.route.path.substring(1);
      passport.authenticate(act, (err, user, info) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Internal server Error",
            error: err,
          });
        }
  
        // If user is not exist
        if (!user) {
          return res.status(401).json({
            status: "Error",
            message: info.message,
          });
        }
        req.user = user;
        next();
      })(req, res, next);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
};

let isAdmin = async (req, res, next) => {
    try {
        passport.authorize("admin", { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Internal server Error",
                    error: err,
                });
            }

            // If user is not exist
            if (!user) {
                return res.status(401).json({
                    status: "Error",
                    message: info.message,
                });
            }
            req.user = user;
            next();

        })(req, res, next);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "internal server error",
            error: err,
        });
    }
};

let isGuru = async (req, res, next) => {
    try {
        passport.authorize("guru", { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Internal server Error",
                    error: err,
                });
            }

            // If user is not exist
            if (!user) {
                return res.status(401).json({
                    status: "Error",
                    message: info.message,
                });
            }
            req.user = user;
            next();

        })(req, res, next);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "internal server error",
            error: err,
        });
    }
};

let isSiswa = async (req, res, next) => {
    try {
        passport.authorize("siswa", { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Internal server Error",
                    error: err,
                });
            }

            // If user is not exist, still next as guest
            if (user) {
                req.user = user;
            }
            next();

        })(req, res, next);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "internal server error",
            error: err,
        });
    }
};

module.exports = { doAuth, isAdmin, isSiswa, isGuru };