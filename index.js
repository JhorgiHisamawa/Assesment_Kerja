require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
// Express
const express = require("express");
const app = express();

//Set body parser for HTTP post operation
app.use(express.json()); // support json encoded bodies
app.use(
    express.urlencoded({
        extended: true,
    })
); // support encoded bodies

// ROUTES DECLARATION & IMPORT
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

const guruRoutes = require("./routes/guruRoutes.js");
app.use("/guru", movieRoutes);

const reviewRoutes = require("./routes/nilaiRoutes.js");
app.use("/nilai", reviewRoutes);

const userRoutes = require("./routes/siswaRoutes.js");
app.use("/siswa", userRoutes);

// Server running
app.listen(3000, () => console.log("server running on port 3000"));