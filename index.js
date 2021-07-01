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
app.use("/guru", guruRoutes);

const nilaiRoutes = require("./routes/nilaiRoutes.js");
app.use("/nilai", nilaiRoutes);

const siswaRoutes = require("./routes/siswaRoutes.js");
app.use("/siswa", siswaRoutes);

// Server running
app.listen(3000, () => console.log("server running on port 3000"));